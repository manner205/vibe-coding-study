# Workflow: Firebase 연동

## 목표
Firestore에 학습 진도(상태, 메모)를 저장하고 실시간 동기화한다.

## 입력값
- Firebase 프로젝트 설정값 (.env)
- Firestore 컬렉션: `progress`

## 단계

### Step 1: Firestore 데이터 구조
- 컬렉션: `progress`
- 문서 ID: `day-{번호}` (day-1 ~ day-30)
- 필드:
  - `status`: "not_started" | "completed" | "review_later"
  - `memo`: string
  - `updatedAt`: timestamp

### Step 2: CRUD 함수 작성
- `updateStatus(dayId, status)` — 상태 업데이트
- `updateMemo(dayId, memo)` — 메모 저장
- `getProgress()` — 전체 진도 불러오기

### Step 3: 실시간 동기화
- `onSnapshot`으로 Firestore 변경 감지
- 다른 기기에서 변경 시 즉시 UI 반영

### Step 4: 커스텀 훅
- `useProgress()` 훅으로 컴포넌트에서 간편하게 사용

## 결과물
- 상태 변경 → Firestore 저장 → 다른 기기 즉시 반영
- 메모 저장 → 새로고침 후에도 유지

## 에러 대응
- Firebase 연결 실패 → .env 설정값 확인
- 권한 에러 → Firestore 보안 규칙 확인 (개발 중: 읽기/쓰기 허용)

## 보안 규칙 (배포 시)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /progress/{document} {
      allow read, write: if true;  // 인증 없이 사용 (혼자 사용 전제)
    }
  }
}
```
주의: 공개 앱이 아니므로 허용. 추후 인증 추가 시 규칙 강화 필요.
