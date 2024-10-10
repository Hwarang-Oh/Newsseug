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

from config import config, log_format

logger = logging.getLogger('article-logger')
logger.setLevel(logging.INFO)  # 로그 레벨 설정

# 콘솔 핸들러 추가 (로그를 터미널에 출력)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)  # 핸들러 레벨 설정

# 로그 포맷 설정
formatter = logging.Formatter(log_format)
console_handler.setFormatter(formatter)

# 핸들러를 로거에 추가
logger.addHandler(console_handler)

OPENAI_API_KEY = config['openai']['api_key']

client = OpenAI(api_key=OPENAI_API_KEY)

size = {"height": 1792, "width": 1024} # 숏폼의 크기

fps = 10

scene_count: int = 4

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
You are a storytelling expert in short-form videos.

Task: Convert an article into a 1-minute script with {scene_count} scenes.

Process:
1.Article Analysis: Identify key points and main story elements.
2.Scene Breakdown: Create 6 scenes capturing the story, with cultural diversity in visuals (race, nationality, etc.).
3.Scene Description: Briefly describe each scene's visuals and actions, including cultural details.
4.Dialogue Creation: Write concise, effective dialogues for each scene, reflecting cultural nuances where relevant.
5.Timing and Flow: Ensure smooth transitions between scenes, with a total duration under 1 minute.

Now, generate a {scene_count} script in JSON format. Each scene should include diverse cultural descriptions, English dialogue, and Korean dialogue, based on the provided article.
Take a deep breath and lets work this out in a step by step way to be sure we have the right answer.

Article:
{article_content}

Example:
[
  {
    "scene": 1,
    "description": "A young man dreams of becoming an artist in the bustling city.",
    "dialogue_en": "He is filled with hope but knows the road ahead will be tough.",
    "dialogue_ko": "그는 희망으로 가득 차 있지만, 앞길이 험난할 것임을 알고 있다."
  },
  {
    "scene": 2,
    "description": "The man meets a diverse group of artists who inspire him.",
    "dialogue_en": "This is the beginning of his artistic journey.",
    "dialogue_ko": "이것은 그의 예술 여정의 시작이다."
  }
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
            prompt=f"""You are an Image Creation and Transformation Expert tasked with creating realistic images for a short-form news article, guided by visual descriptions and scripts. Scenes may include cultural specifics like race and nationality.

Steps:

1.Analyze: Examine the scene description and script, noting cultural details to accurately represent diversity.

2.Conceptualize: Visualize the scene to align with the theme, narrative, and cultural context.

3.Generate: Produce a realistic, photo-like image. Depict individuals as White, Black, Asian, or according to the specified nationality.

4.Review & Adjust: Ensure accuracy in cultural representation and quality. Adjust as needed.

5.Finalize: Once approved, finalize the image for use in the article.

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

    video_clip = mp.ImageSequenceClip(frames, fps=fps)

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