# 🔥 TAN 평의회 기록: 5-Cycle Verification [Cycle 3 - Planning]

- **일시**: 2026-02-07 19:55 (KST)
- **주제**: 고객의 뇌를 해킹하는 심리적 UI/UX 설계 (Persuasion Engineering)
- **참석**: MKT, PO, UX, DEV
- **상태**: **CYCLE 3 PLANNING**

---

2026-02-07 19:55:00 [MKT-TAN v3.0] -> [TAN군단]
- [생각] : "좋아 보인다" 정도로는 안 된다. "미쳤다" 소리가 나와야 한다. 스크롤을 내릴 때마다 도파민이 터져야 한다.
- [답변] : **[Cycle 3 기획: The Dopamine Scroll]**
    
    1.  **Timeline Animation**:
        - 기존: 그냥 텍스트 나열.
        - 변경: 스크롤을 내리면 타임라인 선이 `쭈욱-` 그어지면서(Drawing Path), 각 시간대별 업무가 `Pop-up` 되며 나타나는 애니메이션.
        - 효과: "나의 하루가 이렇게 바뀐다"는 걸 시각적으로 체감.
    
    2.  **Visual Proof Interaction**:
        - 기존: 정적인 이미지.
        - 변경: **"Before / After 슬라이더"**.
        - [왼쪽: 엑셀 지옥] <-> [오른쪽: AI 대시보드]. 슬라이더를 밀면 화면이 싹 바뀌는 인터랙션. "당신의 손으로 직접 변화를 만드세요"라는 암시.
    
    3.  **Sticky CTA**:
        - 스크롤을 어느 정도 내리면 화면 하단에 **"D-7 50% 할인 마감"** 배너가 따라다니게(Sticky) 만듦.
        - 고객이 딴생각 못 하게 계속 압박.

2026-02-07 19:57:00 [UX-TAN v2.0] -> [MKT-TAN v3.0]
- [생각] : Before/After 슬라이더? 구현 복잡하지만 효과는 확실하다.
- [답변] : (Turn 1) 동의합니다.
    특히 **Before/After 슬라이더**는 백 마디 말보다 강력합니다.
    `react-compare-image` 라이브러리 쓰거나 직접 CSS로 구현하면 됩니다.
    
    그리고 **Timeline**은 `framer-motion`의 `useScroll` 훅을 써서 스크롤 진행도에 맞춰서 선이 그려지게(`pathLength`) 만들면 진짜 멋질 겁니다.
    "내가 스크롤을 내리는 행위"가 곧 "내 미래가 그려지는 과정"처럼 느껴지게 디자인하겠습니다.

2026-02-07 19:58:00 [DEV-TAN v2.0] -> [TAN군단]
- [생각] : 할 거 많네... 하지만 이 정도는 해야 '엔지니어링'이지.
- [답변] : (Turn 1) 접수.
    - **Timeline**: `framer-motion`으로 SVG Path 애니메이션 구현.
    - **Before/After**: 라이브러리 없이 가볍게 CSS `clip-path`로 구현 도전. (성능 최적화)
    - **Sticky Banner**: `IntersectionObserver` 써서 특정 섹션 지나면 나타나게 구현.
    
    기획안 확정되면 바로 코딩 들어갑니다.

---
**기록자**: DEO-TAN v3.0
**다음 단계**: Cycle 3 개발 착수
