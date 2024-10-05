from typing import List, Optional
from openai import OpenAI

import logging

import moviepy.editor as mp
from io import BytesIO
import soundfile as sf
import numpy as np
import json
import base64
from PIL import Image
import cv2

from config import config

logger = logging.getLogger('article-logger')
logger.setLevel(logging.INFO)  # 로그 레벨 설정

# 콘솔 핸들러 추가 (로그를 터미널에 출력)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)  # 핸들러 레벨 설정

# 로그 포맷 설정
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# 핸들러를 로거에 추가
logger.addHandler(console_handler)

OPENAI_API_KEY = config['openai']['api_key']

client = OpenAI(api_key=OPENAI_API_KEY)

size = {"height": 1792, "width": 1024} # 숏폼의 크기

fps = 10

scene_count: int = 6

class Scene:
    def __init__(self, number: int, description: str, en_dialogue: str, ko_dialogue):
        self.number = number
        self.description = description
        self.en_dialogue = en_dialogue
        self.ko_dialogue = ko_dialogue
    
    def __str__(self):
        return f"Scene(number={self.number}, description={self.description}, en_dialogue={self.en_dialogue}, ko_dialogue={self.ko_dialogue})"

class Speech:
    def __init__(self, data: np.ndarray, sample_rate: int):
        self.data = data
        self.sample_rate = sample_rate

def create_article(article_content: str) -> Optional[tuple[mp.VideoClip, Image.Image, Optional[str]]]:
    """뉴스 기사로 숏츠를 생성하는 함수

    Args:
        article_content (str): 원본 뉴스 기사 내용
    
    Returns:
        Optional[tuple[mp.VideoClip, Image.Image, Optional[str]]]: 비디오 숏폼 파일, 썸네일 이미지, 종료 사유
    """

    scenes, finish_reason = generate_scenes(article_content)
    
    # 장면을 제대로 생성하지 못했을 경우 예외 처리
    if finish_reason != "stop" or finish_reason is None:
        return None, None, None
    
    images = []
    speeches = []

    for scene in scenes:
        image = generate_image(scene)
        speech = generate_text_to_speech(scene.ko_dialogue)
        
        if image is None or speech is None:
            return None, None, None
        
        images.append(base64_to_np(image))
        speeches.append(read_speech(speech))
    
    thumbnail = Image.fromarray(images[0], mode="RGB")

    audio_clip, durations = create_audio_clip_and_durations(speeches)
    
    image_clip = create_image_clip(images, durations)
    
    vdieo_clip = create_video_clip(image_clip, audio_clip)

    return vdieo_clip, thumbnail, finish_reason

def generate_scenes(article_content: str) -> tuple[Optional[List[Scene]], Optional[str]]:
    """기사 내용으로 8개의 그림 장면 묘사를 만드는 함수

    Args:
        article_content (str): 기사 내용

    Returns:
        List[Scene]: 만들어진 장면 리스트
    """
    
    prompt = f"""
You are a Storytelling Expert, specialized in creating compelling scripts for short-form videos. You are going to write a script based on a text-based article, transforming it into a short-form video script. The script should include descriptions of each scene and dialogues that explain the scenes. The script should be in a storytelling format, ensuring the video does not exceed 1 minute and is composed of exactly {scene_count} scenes.

Here is how you will develop the script: 

**Step 1: Article Analysis:**
 Read and understand the key points and messages of the article. Identify the main story elements that need to be conveyed. 

**Step 2: Scene Breakdown:**
 Divide the story into {scene_count} distinct scenes. Each scene should represent a key part of the story. 

**Step 3: Scene Description:**
 Write a brief description for each scene, detailing the visual elements and actions. 

**Step 4: Dialogue Creation:**
 Create engaging dialogues for each scene that effectively convey the story and message. Ensure the dialogues are concise and impactful. 

**Step 5: Timing and Flow:**
 Ensure the script flows smoothly from one scene to the next and that the total duration does not exceed 1 minute. 

Take a deep breath and lets work this out in a step by step way to be sure we have the right answer.

"Now, please generate a script with {scene_count} scenes JSON, each with a description and en dialogue and ko dialogue, based on the article to be provided."

Here is the article:
{article_content}

Sample answer:

  script: [{{
    "number": 1,
    "description(en)": "A young man dreams of becoming an artist in the bustling city.",
    "dialogue(en)": "At this moment, the key idea is: He is filled with hope, but knows the journey ahead will be challenging."
    "dialogue(ko)": "지금 이 순간 중요한 것은 그는 희망으로 가득 차 있지만, 앞길이 험난할 것임을 알고 있다는 것이다."
  }},
  {{
    "number": 2,
    "description(en)": "A young man dreams of becoming an artist in the bustling city.",
    "dialogue(en)": "At this moment, the key idea is: He is filled with hope, but knows the journey ahead will be challenging."
    "dialogue(ko)": "지금 이 순간 중요한 것은 그는 희망으로 가득 차 있지만, 앞길이 험난할 것임을 알고 있다는 것이다."
  }}
  ]
  
"""
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="gpt-4o-mini",
            response_format= {
                "type": "json_object",
            },
        )
        
        if (len(response.choices) == 0) :
            logger.error("generate_scenes choices: " + 0)
            return None, None
        
        if response.choices[0].finish_reason != "stop":
            logger.error("generate_scenes 종료 사유 에러: " + response.choices[0].finish_reason)
            return None, response.choices[0].finish_reason
        
        json_content = json.loads(response.choices[0].message.content)
        
        return [Scene(number=scene["number"], description=scene["description(en)"], en_dialogue=scene["dialogue(en)"], ko_dialogue=scene["dialogue(ko)"]) for scene in json_content["script"]], response.choices[0].finish_reason
    
    except Exception as e:
        logger.exception(e)
        return None, None

def generate_image(scene: Scene) -> Optional[bytes]:
    """장면을 기반으로 이미지 생성 함수

    Args:
        scenes (Scene): 장면

    Returns:
        bytes: 생성된 base64로 인코딩된 이미지
    """
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=f"""You are an Image Creation and Transformation Expert. Your task is to generate realistic image for a short-form news article. You will be provided with visual descriptions and scripts for each of the scene. 

        Here is how you will proceed:

        Step 1: Analyze Visual Descriptions and Scripts:
        Carefully read the provided visual description and script for scene. Understand the key elements and themes that need to be depicted.  

        Step 2: Conceptualize Image:
        Based on the description, conceptualize the visual representation for scene. Ensure that the concept aligns with the overall theme and narrative of the news article. 

        Step 3: Generate Images:
        Generate a realistic image that looks like a real photograph.

        Step 4: Review and Adjust:
        Review image to ensure it accurately represents the scene description. Make any necessary adjustments to ensure quality. 

        Step 5: Finalize and Deliver:
        Once image is reviewed and adjusted, finalize that and prepare that for use in the short-form news article. 

        Take a deep breath and lets work this out in a step by step way to be sure we have the right answer.
        Please create based on the scene description entered below.

        Here is the visual description:
        {scene.description}

        Here is the script:
        {scene.en_dialogue}
        """,
                n=1,
                quality='standard',
                response_format='b64_json',
                size="1024x1792",
            )
    
        return response.data[0].b64_json
    
    except Exception as e:
        logger.exception(e)
        return None

def base64_to_np(base64_string):
    image = Image.open(BytesIO(base64.b64decode(base64_string)))
    image_np = np.array(image)
    
    return image_np

def create_image_clip(images: list[np.ndarray], durations: list[float]):
    frames = []
    for image, duration in zip(images, durations):
        num_frames = int(duration * fps)
        frames.extend([image] * num_frames)

    video_clip = mp.ImageSequenceClip([cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) for frame in frames], fps=fps)

    return video_clip

def create_audio_clip_and_durations(speeches: list[Speech]) -> tuple[mp.AudioClip, List[float]]:
    """오디오 클립을 생성하는 함수

    Args:
        scenes (list[Speech]): 장면 리스트

    Returns:
        tuple[mp.AudioClip, List[float]]: 합쳐진 오디오 클립과 각 장면들의 재생 시간
    """
    
    speech_con = np.concatenate([speech.data for speech in speeches], axis=0)
    speech_durations = [speech.data.shape[0] / speech.sample_rate for speech in speeches]

    audio_clip = create_audio_clip(speech_con, speeches[0].sample_rate)

    return audio_clip, speech_durations

def generate_text_to_speech(dialogue: str) -> Optional[bytes]:
    """문자열을 발화 음성 바이트로 변환하는 함수

    Args:
        dialogue (str): 발화 데이터를 생성할 문자열

    Returns:
        bytes: 발화 음성 바이트
    """
    
    try:
        response = client.audio.speech.create(
                model="tts-1",
                voice="alloy",
                input=dialogue
            )
        
        return response.content
    except Exception as e:
        logger.exception(e)
        return None

def read_speech(speech: bytes) -> Speech:
    """음성 바이트를 넘파이 배열로 변환하는 함수

    Args:
        speech (bytes): 음성 바이트

    Returns:
        Speech: 생성된 음성 파일의 데이터와 시간
    """
    
    with BytesIO(speech) as audio_buffer:
        speech_data, sample_rate = sf.read(audio_buffer)
        
    return Speech(speech_data, sample_rate)

def create_audio_clip(audio_data: np.ndarray, sample_rate: int) -> mp.AudioClip:
    """오디오 넘파이를 오디오 클립으로 변환하는 함수

    Args:
        audio_data (np.ndarray): 오디오 넘파이 배열
        sample_rate (int): 오디오 시간
        
    Returns:
        mp.AudioClip: 오디오 클립
    """
    
    def make_frame(t):
        idx = np.array(t * sample_rate).astype(int)
        return audio_data[idx]
    
    return mp.AudioClip(make_frame, duration=len(audio_data) / sample_rate, fps=sample_rate)

def create_video_clip(image_clip: mp.ImageSequenceClip, audio_clip: mp.AudioClip) -> mp.VideoClip:
    """이미지 클립과 오디오 클립으로 동영상을 생성하는 함수

    Args:
        image_numpy (mp.ImageSequenceClip): 동영상에 들어갈 이미지 클립
        audio_clips (mp.AudioClip): 동영상에 들어갈 오디오 클립

    Returns:
        mp.VideoClip: 생성된 동영상
    """
    
    return image_clip.set_audio(audio_clip)