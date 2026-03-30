# Workflow: 커리큘럼 데이터 구성

## 목표
30일치 바이브코딩 학습 커리큘럼을 JSON 파일로 정리한다.

## 입력값
- 트랙 1: AI 도구 활용 코딩 입문 (Day 1~12)
- 트랙 2: 웹 개발 기초 HTML/CSS/JS (Day 13~30)

## 단계

### Step 1: JSON 구조 설계
```json
{
  "tracks": [
    {
      "id": "track-1",
      "title": "트랙명",
      "phases": [
        {
          "id": "phase-a",
          "title": "Phase명",
          "days": [
            {
              "day": 1,
              "title": "주제",
              "description": "학습 설명",
              "example": "생성 예시"
            }
          ]
        }
      ]
    }
  ]
}
```

### Step 2: 30일치 데이터 작성
- `src/data/curriculum.json`에 저장
- 각 Day마다 title, description, example 필수

## 결과물
- `src/data/curriculum.json` 파일 완성

## 에러 대응
- JSON 문법 오류 → 린트 도구로 검증
