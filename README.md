# 📰 뉴쓱

## 📌 프로젝트 소개

**뉴쓱**은 사람들이 뉴스를 더 쉽고 재밌게 소비할 수 있도록 **뉴스 기사를 숏폼 형태로 제공**하는 커뮤니티 플랫폼입니다.

사용자들은 간단한 숏폼 영상으로 최신 뉴스를 빠르게 확인하고, 접근성을 높인 인터페이스를 통해 다양한 뉴스를 소비할 수 있습니다.


## 💻 프로젝트 주요 기능

### 🎬 숏폼 영상 시청

숏폼으로 제작한 뉴스 기사를 오늘의 뉴스, 연령별 추천 기사, 전체 기사, 언론사별 기사, 카테고리 기반 추천을 통해 사용자에게 제공합니다.

-   일반 기사 조회
    -   오늘의 기사 : 오늘 발행된 최신 뉴스를 숏폼 영상으로 제공하여 사용자들이 최신 뉴스를 빠르게 확인할 수 있습니다.

    -   연령별 추천 기사 : 사용자의 연령대에 맞춰 가장 많이 조회된 뉴스를 추천해 주며, 연령대별로 적합한 콘텐츠를 제공합니다.

    -   전체 기사 : 전체 뉴스 기사를 카테고리 필터를 통해 원하는 분류의 기사를 쉽게 탐색할 수 있습니다.

-   카테고리 기반 추천 기사 : 사용자의 시청 기록을 바탕으로 가장 최근에 시정한 카테고리에 해당하는 기사를 제공합니다.

|    기사 조회        |              카테고리 기반 추천 기사               |
| :------------------------------------------: | :------------------------------------------------: |
| <img width="250" src="./etc/asset/home.gif"> | <img width="250" src="./etc/asset/user_video.gif"> |

### 💼 언론사 구독 기능

사용자가 관심 있는 언론사를 구독하여 해당 언론사의 기사 숏폼을 모아볼 수 있습니다.

|                    언론사 구독                    |              구독한 언론사 기사 조회              |
| :-----------------------------------------------: | :-----------------------------------------------: |
| <img width="180" src="./etc/asset/subscribe-1.gif"> | <img width="180" src="./etc/asset/subscribe-2.gif"> |

### 📂 북마크 기능

사용자가 보고 싶은 기사를 북마크할 수 있는 기능으로, '저장하기' 버튼을 눌러 자신이 만든 폴더에 숏폼 영상을 저장하여 언제든지 쉽게 다시 확인할 수 있습니다.

|                     북마크                     |                      북마크한 기사 조회                      |
| :--------------------------------------------: | :--------------------------------------------: |
| <img width="250" src="./etc/asset/scrap1.gif"> | <img width="250" src="./etc/asset/scrap2.gif"> |

### 🔍 검색 기능

키워드를 입력하면 관련된 기사와 언론사를 제공합니다.

|                      검색                      |
| :--------------------------------------------: |
| <img width="250" src="./etc/asset/search.gif"> |

## 🎥 숏폼 생성 과정

각 언론사에 보도된 뉴스 기사를 다음과 같은 과정을 통해 숏폼 영상으로 제작하여 사용자에게 제공합니다.

### 🐱‍🏍 주요 기능 흐름

<img width="600" src="./etc/asset/functional-flow-chart.png">

### 🕷 크롤링

BeautifulSoup4 라이브러리를 활용해 각 언론사별 크롤러를 구현했습니다.

<img width="600" src="./etc/asset/crawler-compare.png">

### 🌐 배포 환경

크롤러는 AWS Lambda 를 통한 서버리스 환경에서 동작하고 있습니다.

이러한 설계는 다음과 같은 요약을 토대로 선택했습니다.

<img width="600" src="./etc/asset/server-less-compare.png">

### ⚙️ 프롬프트 엔지니어링

관련 논문을 참고해 정확도를 61%에서 87%로 상승시킨 5가지 방법 중 3가지를 적용하여 다음 사진과 같이 작성했습니다.

<img width="600" src="./etc/asset/prompt.png">

### 📃 시나리오 생성

기사 원문을 전달하면 프롬프트를 통해 해당 기사를 6개의 장면으로 분할하여 다음과 같은 사진과 같이 각 장면에 대한 묘사와 대사를 생성합니다.

<img width="600" src="./etc/asset/scenario.png">

### 🎞️ 이미지 생성

프롬프팅 엔지니어링을 수행한 결과 다음 사진과 같으며, 생성한 시나리오의 **description**을 바탕으로 이미지를 생성합니다.

|                     수행전                    |                      수행후                      |
| :--------------------------------------------: | :--------------------------------------------: |
| <img width="275" src="./etc/asset/before.png"> | <img width="290" src="./etc/asset/after.png"> |

### 🎙️ 나레이션 생성

생성한 시나리오의 **dialogue**을 바탕으로 나레이션을 생성합니다.

<img width="600" src="./etc/asset/speech.png">

### 📹 숏폼 생성

위에서 도출한 이미지 배열과 나레이션을 합쳐 숏폼 영상을 생성합니다.

<img width="600" src="./etc/asset/create_video.png">

## 🧑🏻 팀원

### 🖥️ Client

| 김주연 | 김민경 | 오화랑 |
| :---: | :---: | :---: |
| <a href="https://github.com/izodam"><img src="https://avatars.githubusercontent.com/izodam" width=160/></a> | <a href="https://github.com/mkkim68"><img src="https://avatars.githubusercontent.com/mkkim68" width=160/></a> | <a href="https://github.com/Hwarang-Oh"><img src="https://avatars.githubusercontent.com/Hwarang-Oh" width=160/></a> | | [izodam](https://github.com/izodam) | [mkkim68](https://github.com/mkkim68) [Hwarang-Oh](https://github.com/Hwarang-Oh) |

### 🖥️ Server

| 박근석 | 박상후 | 박찬규 |
| :---: | :---: | :---: |
| <a href="https://github.com/parkrootseok"><img src="https://avatars.githubusercontent.com/parkrootseok" width=160/></a> | <a href="https://github.com/SangHuPark"><img src="https://avatars.githubusercontent.com/SangHuPark" width=160/></a> | <a href="https://github.com/pcg0610"><img src="https://avatars.githubusercontent.com/pcg0610" width=160/></a> | |[parkrootseok](https://github.com/parkrootseok) | [SangHuPark](https://github.com/SangHuPark) | [pcg0610](https://github.com/pcg0610) |

## ⚒️ 기술 스택

### 🖥️ Client

|  |  |
| :----- | :----- |
| Framework            | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> | 
| Language             | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>                                                                                                        |
| Styling              | <img src="https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">                                                                                          |
| State Management     | <img src="https://img.shields.io/badge/react%20query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> |
| Version Control      | <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/gitLAB-fc6d26?style=for-the-badge&logo=gitlab&logoColor=white"/>              |
| IDE                  | <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>                                                                                  |

### 🖥️ Server

|  |  |
| :-------------------: | :-------------- |
| Framework             | <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white"/> <img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white"/> |
| Language | <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"/> <img src="https://img.shields.io/badge/python-3776AB.svg?style=for-the-badge&logo=python&logoColor=white"/> |
| Database              | <img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white" alt="MariaDB"/> <img src="https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/> |
|Monitoring | <img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white" alt="prometheus"/> <img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="grafana"/>|
| Cloud                 | <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"> <img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white"> |
| DevOps                | <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" alt="Docker"> <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" alt="jenkins"> |  
| AI                    |  <img src="https://img.shields.io/badge/openai-412991.svg?style=for-the-badge&logo=openai&logoColor=white"/> |
| Crawling              |  <img src="https://img.shields.io/badge/awslambda-FF9900.svg?style=for-the-badge&logo=awslambda&logoColor=white"/> <img src="https://img.shields.io/badge/Beautiful%20Soup-000000.svg?style=for-the-badge&logoColor=white"/> |
| Version Control       | <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/gitLAB-fc6d26?style=for-the-badge&logo=gitlab&logoColor=white"/> |
| IDE                   | <img src="https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white"/> |

### 🖥️ Common

|  |  |
| :--- | :--- |
| Collaboration | <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white" alt="Notion"/> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white" alt="Notion"/> <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger"/> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma"/> |

## 📚 산출물
|  |  |
| :--: | ---: |
| Architecture | <img width="700" src="./etc/asset/Newsseug%20Architecture.png"> |
| ERD          | <img width="700" src="./etc/asset/ERD.png"> |

