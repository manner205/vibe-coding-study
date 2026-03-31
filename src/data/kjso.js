// KJSO 1단계 전체 강의 목록 (55회차)
export const KJSO_LECTURES = [
  // 1주차
  { id: 1, subject: '물리', week: '1주차', part: '(1)', title: '물리는 기호와 단위' },
  { id: 2, subject: '물리', week: '1주차', part: '(2)', title: '일차원이동1 물체의 이동' },
  { id: 3, subject: '물리', week: '1주차', part: '(3)', title: '일차원이동2 가속도와 등가속도 이동' },
  { id: 4, subject: '화학', week: '1주차', part: '(1)', title: '원소와 원자(1)' },
  { id: 5, subject: '화학', week: '1주차', part: '(2)', title: '원소와 원자(2)' },
  { id: 6, subject: '생물', week: '1주차', part: '(1)', title: '생물 특징' },
  { id: 7, subject: '생물', week: '1주차', part: '(2)', title: '증산작용' },
  // 2주차
  { id: 8,  subject: '물리', week: '2주차', part: '(1)', title: '뉴턴의 이동법칙(1) — 힘' },
  { id: 9,  subject: '물리', week: '2주차', part: '(2)', title: '뉴턴의 이동법칙(2) — 뉴턴의 이동법칙' },
  { id: 10, subject: '물리', week: '2주차', part: '(3)', title: '뉴턴의 이동법칙(3) — 뉴턴의 이동법칙 적용' },
  { id: 11, subject: '화학', week: '2주차', part: '',    title: '분자와 화학 결합' },
  { id: 12, subject: '생물', week: '2주차', part: '(1)', title: '광합성(1)' },
  { id: 13, subject: '생물', week: '2주차', part: '(2)', title: '광합성(2)' },
  // 3주차
  { id: 14, subject: '물리', week: '3주차', part: '',    title: '일과 에너지' },
  { id: 15, subject: '화학', week: '3주차', part: '',    title: '기체' },
  { id: 16, subject: '생물', week: '3주차', part: '(1)', title: '영양과 호흡(1)' },
  { id: 17, subject: '생물', week: '3주차', part: '(2)', title: '영양과 호흡(2)' },
  // 4주차
  { id: 18, subject: '물리', week: '4주차', part: '(1)', title: '유체(1) 물질의 상태 밀도 압력' },
  { id: 19, subject: '물리', week: '4주차', part: '(2)', title: '유체(2)' },
  { id: 20, subject: '화학', week: '4주차', part: '',    title: '기체 법칙' },
  { id: 21, subject: '생물', week: '4주차', part: '(1)', title: '영양의 배출(1)' },
  { id: 22, subject: '생물', week: '4주차', part: '(2)', title: '영양의 배출(2)' },
  // 5주차
  { id: 23, subject: '물리', week: '5주차', part: '(1)', title: '열과 온도' },
  { id: 24, subject: '물리', week: '5주차', part: '(2)', title: '열팽창과 비열' },
  { id: 25, subject: '화학', week: '5주차', part: '',    title: '화학 반응식' },
  { id: 26, subject: '생물', week: '5주차', part: '(1)', title: '사람의 감각기관(1)' },
  { id: 27, subject: '생물', week: '5주차', part: '(2)', title: '사람의 감각기관(2)' },
  // 6주차
  { id: 28, subject: '물리', week: '6주차', part: '',    title: '파동' },
  { id: 29, subject: '화학', week: '6주차', part: '',    title: '화학 반응 법칙' },
  { id: 30, subject: '생물', week: '6주차', part: '(1)', title: '신경계의 구조와 기능(1)' },
  { id: 31, subject: '생물', week: '6주차', part: '(2)', title: '신경계의 구조와 기능(2)' },
  // 7주차
  { id: 32, subject: '물리', week: '7주차', part: '(1)', title: '전기력과 전기장(1)' },
  { id: 33, subject: '물리', week: '7주차', part: '(2)', title: '전기력과 전기장(2)' },
  { id: 34, subject: '화학', week: '7주차', part: '',    title: '물질의 상태' },
  { id: 35, subject: '생물', week: '7주차', part: '(1)', title: 'DNA의 중심원리(1)' },
  { id: 36, subject: '생물', week: '7주차', part: '(2)', title: 'DNA의 중심원리(2)' },
  // 8주차
  { id: 37, subject: '물리', week: '8주차', part: '(1)', title: '전류와 전기저항(1)' },
  { id: 38, subject: '물리', week: '8주차', part: '(2)', title: '전류와 전기저항(2)' },
  { id: 39, subject: '화학', week: '8주차', part: '',    title: '용액의 특성' },
  { id: 40, subject: '생물', week: '8주차', part: '(1)', title: '세포분열(1)' },
  { id: 41, subject: '생물', week: '8주차', part: '(2)', title: '세포분열(2)' },
  // 9주차
  { id: 42, subject: '물리', week: '9주차', part: '',    title: '빛의 반사' },
  { id: 43, subject: '화학', week: '9주차', part: '',    title: '혼합물의 분리' },
  { id: 44, subject: '생물', week: '9주차', part: '(1)', title: '멘델의 유전 법칙(1)' },
  { id: 45, subject: '생물', week: '9주차', part: '(2)', title: '멘델의 유전 법칙(2)' },
  // 10주차
  { id: 46, subject: '물리', week: '10주차', part: '',    title: '빛의 굴절' },
  { id: 47, subject: '화학', week: '10주차', part: '',    title: '산과 염기' },
  { id: 48, subject: '생물', week: '10주차', part: '(1)', title: '사람의 유전(1)' },
  { id: 49, subject: '생물', week: '10주차', part: '(2)', title: '사람의 유전(2)' },
  // 생물 선택강의
  { id: 50, subject: '생물', week: '선택강의', part: '2-2', title: '생물의 분류' },
  { id: 51, subject: '생물', week: '선택강의', part: '2-1', title: '생물의 다양성' },
  { id: 52, subject: '생물', week: '선택강의', part: '1-2', title: '생물 구성' },
  { id: 53, subject: '생물', week: '선택강의', part: '1-1', title: '세포' },
  // 화학 추가 차시
  { id: 54, subject: '화학', week: '11차시', part: '',    title: '산화환원 반응' },
  { id: 55, subject: '화학', week: '12차시', part: '',    title: '화학 화합물' },
]

export const SUBJECT_CONFIG = {
  물리: { color: 'blue',   emoji: '⚡', label: '물리' },
  화학: { color: 'green',  emoji: '🧪', label: '화학' },
  생물: { color: 'purple', emoji: '🌱', label: '생물' },
}
