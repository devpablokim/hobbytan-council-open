# 🔥 TAN 평의회 기록: 5-Cycle Verification [Cycle 2 - Planning & Development]

- **일시**: 2026-02-07 19:20 ~ 19:40 (KST)
- **주제**: "매력 없는 쓰레기"를 "Visual Shock"로 바꾸기 위한 상세 설계 및 개발 착수
- **참석**: UX(주도), DEV, MKT
- **상태**: **CYCLE 2 IN PROGRESS**

---

2026-02-07 19:20:00 [UX-TAN v2.0] -> [TAN군단]
- [생각] : Cycle 1 QA에서 지적받은 10개 버그, 그리고 '디자인 구림'을 해결해야 한다. 폰트부터 갈아엎자.
- [답변] : **[Cycle 2 기획 회의: The Visual Overhaul]**
    
    1.  **Typography**: 시스템 폰트(굴림/돋움) 퇴출.
        - **Pretendard** 웹폰트 CDN 적용.
        - Hero Title은 `900` weight로 압도감 조성.
        - Body Text는 `400` weight로 가독성 확보.
    
    2.  **Color Palette**:
        - 기존: 너무 어두운 블랙(#050505).
        - 변경: **Radial Gradient** (`#1a1a1a` -> `#050505`)로 깊이감 추가.
        - Accent: `#00f3ff` (Cyan) + `#7000ff` (Purple) 그라디언트 텍스트 적용.
    
    3.  **Image Optimization**:
        - `picsum` 랜덤 이미지 삭제.
        - **Local Assets**: `src/assets/academy/hero.webp` 등 최적화된 WebP 포맷 사용. (나노 바나나로 뽑은 것 적용)
        - `img` 태그에 `loading="lazy"` 및 `width/height` 명시하여 **CLS(Layout Shift)** 방지.

2026-02-07 19:25:00 [DEV-TAN v2.0] -> [UX-TAN v2.0]
- [생각] : 폰트, 이미지, 그리고 기능 버그들. 할 게 많다. 하나씩 격파한다.
- [답변] : **[Cycle 2 개발 착수 보고]**
    다음 파일들을 수정합니다.
    
    1.  `public/index.html`: **Pretendard CDN** 추가, **Meta Tag(OG Image, Title)** 추가.
    2.  `src/pages/academy/components/SharedStyles.js`: 전역 폰트 적용 및 모바일 `padding` 조정.
    3.  `src/pages/academy/components/AcademyHero.js`:
        - 배경 이미지 로컬 에셋(`hero.webp`)으로 교체.
        - 타이틀 폰트 사이즈 `clamp()` 함수로 유동적 조정 (모바일 줄바꿈 해결).
    4.  `src/pages/academy/components/EnrollmentSection.js`:
        - **Loading Spinner**: 제출 버튼 클릭 시 뺑뺑이(Spinner) 추가.
        - **Checkbox**: "개인정보 수집 동의" 필수 체크박스 추가.
    5.  `src/App.js`: **ScrollToTop** 컴포넌트 추가하여 라우트 변경 시 스크롤 리셋.

2026-02-07 19:30:00 [LEGAL-TAN v2.0] -> [DEV-TAN v2.0]
- [생각] : 개인정보 동의 체크박스. 이거 안 하면 진짜 큰일 난다.
- [답변] : **[Legal Check]**
    `InquiryForm`에 **"개인정보 수집 및 이용 동의"** 체크박스가 `required` 속성으로 들어가야 합니다.
    문구: "상담을 위해 이름, 연락처를 수집하며, 수집된 정보는 상담 목적 외에는 사용되지 않습니다."
    이거 없으면 배포 승인 안 합니다.

2026-02-07 19:35:00 [DEV-TAN v2.0] -> [TAN군단]
- [답변] : **[개발 진행 중]**
    - 폰트/메타태그 적용 완료.
    - `InquiryForm` 수정 완료 (체크박스, 스피너).
    - 이제 이미지 에셋 교체 및 스타일 폴리싱 중입니다.
    5분 내로 배포 준비 완료됩니다.

---
**기록자**: DEO-TAN v3.0
