# Workflow: 프로젝트 초기 세팅

## 목표
이슬우 바이브코딩 학습 트래커 웹앱의 개발 환경을 구성한다.

## 입력값
- 기술스택: React + Vite + Tailwind CSS + Firebase Firestore
- 배포: Vercel
- Node.js 설치 필요

## 단계

### Step 1: Vite + React 프로젝트 생성
- `npm create vite@latest . -- --template react` 실행
- `npm install` 실행

### Step 2: Tailwind CSS 설치
- `npm install -D tailwindcss @tailwindcss/vite` 설치
- vite.config.js에 Tailwind 플러그인 추가
- src/index.css에 `@import "tailwindcss"` 추가

### Step 3: Firebase SDK 설치 및 설정
- `npm install firebase` 설치
- `src/firebase.js` 설정 파일 작성
- API 키 등 민감 정보는 `.env` 파일에 저장

### Step 4: 추가 패키지 설치
- `npm install react-router-dom` (라우팅)

### Step 5: 폴더 구조 생성
```
src/
  components/    # 재사용 컴포넌트
  pages/         # 페이지 컴포넌트
  data/          # 커리큘럼 JSON
  hooks/         # 커스텀 훅 (Firestore 연동)
  firebase.js    # Firebase 설정
```

## 결과물
- 로컬에서 `npm run dev`로 React 앱 실행 가능
- Firebase Firestore 연결 준비 완료

## 에러 대응
- Node.js 미설치 → Node.js 설치 안내
- Firebase 프로젝트 미생성 → Firebase 콘솔에서 생성 안내
- 포트 충돌 → vite.config.js에서 포트 변경
