# 🏗️ Technical Design: Service Flow v3.1 (Full Landing Page)

**작성자:** [UX-TAN], [PO-TAN]
**상태:** 🟢 **Proposed**
**관련 회의:** [2026-02-06 Landing Page Council](../chronicle/daily/meeting/2026-02-06_landing_page_council.md)

---

## 1. Landing Page Structure (Scroll Flow)

### Section 1: The Interactive Hero (The Hook)
- **Visual**: 중앙에 위치한 **"Glass Chat Panel"**. 13인의 TAN들이 가상의 사업계획서를 두고 실시간으로 논쟁하는 애니메이션 재생.
- **Copy**: 
    - Main: **"당신의 사업을 위해 대신 싸워주는 13인의 지능."**
    - Sub: "GPT는 칭찬만 하지만, TAN은 비판하고 재구축합니다."
- **Action**: [의회 입장하기 (Google Login)] - 네온 글로우 효과.

### Section 2: The Problem (Pain Point)
- **Layout**: 왼쪽 텍스트 / 오른쪽 일러스트 (Solopreneur의 고뇌).
- **Copy**: "혼자 결정하기 두려우신가요? 컨설팅은 너무 비싼가요?"

### Section 3: The Council (Team Showcase)
- **UI**: **Hexagon Grid** (벌집 구조). 13인의 프로필 이미지가 배치됨.
- **Interaction**: 마우스 호버 시 해당 TAN의 **Role & Aura**가 팝업됨.
    - *Example*: LEGAL-TAN 호버 시 -> "법적 리스크 방어율 99%" 문구 노출.

### Section 4: Pricing (Conversion)
- **Lite (Free)**: "팩폭 맛보기" (PDF 3장 제한).
- **Pro ($49)**: "풀 코스 컨설팅" (13인 전원 소집 + 전략 리포트).

## 2. Tech Stack Update
- **Animation**: `framer-motion` (Hero Chat, Scroll Reveal).
- **Typing**: `react-type-animation` (Real-time Typing Effect).
- **Styling**: `styled-components` (Glassmorphism Theme).

---
**UX-TAN : "스크롤을 내릴 때마다 유저는 설득당할 수밖에 없습니다."** ⚔️🚀
