# 🏗️ Technical Design: Service Flow v3.1 (Interactive Hero & Open Repo)

**작성자:** [UX-TAN], [DEV-TAN]
**상태:** 🟢 **Proposed (v3.1 Refined)**
**관련 회의:** [2026-02-06 UX & Security Council](../chronicle/daily/meeting/2026-02-06_ux_input_security_council.md)

---

## 1. Landing Page Value Proposition (The Hook)
- **Reference**: `axtiv.io` style Interactive Hero.
- **Concept**: **"The Living Boardroom"**
- **Implementation**:
    - **Hero Section**: 
        - 정적인 텍스트 대신, 13인의 TAN들이 실시간으로 논쟁하는 **"가상 의회 채팅 시뮬레이션"**이 타이핑 애니메이션으로 재생됨.
        - *Scenario*: "A대표님의 사업계획서, 시장성이 0점입니다. (팩폭)" -> "하지만 이렇게 고치면 대박납니다. (솔루션)"
        - **Effect**: 유저가 "와, 내 사업도 이렇게 분석해 주나?"라는 호기심(Curiosity)을 갖게 만듦.
    - **CTA Button**: "내 사업계획서 던지고 팩폭 듣기 (Start)"

## 2. Design System Consistency
- **Unified UI**: 랜딩 페이지의 채팅 애니메이션 UI와 실제 'Boardroom' 대시보드의 UI를 **100% 일치**시킴.
- **Seamless Transition**: [입장하기] 버튼을 누르면 화면 전환 없이 자연스럽게 채팅창이 확장되며 로그인 모달이 뜨는 **One-Page Experience**.

## 3. Repository Policy Update
- **Target**: 모든 공개 문서 및 코드는 `hobbytan-council-open`에 우선 기록.
- **Sync**: 내부 보안용(Private)과 공개용(Open)의 경계를 명확히 하고, 공개 가능한 자산은 즉시 Open Repo로 푸시.

---
**UX-TAN : "첫인상이 전부입니다. 살아있는 대화로 유저를 홀리겠습니다."** ⚔️🚀
