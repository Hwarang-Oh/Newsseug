# 1단계: Node.js 빌드 이미지 설정
FROM node:18-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

EXPOSE 3000

CMD ["npm", "start", "--", "--port", "3000"]
