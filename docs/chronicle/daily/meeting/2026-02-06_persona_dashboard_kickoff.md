# 🤝 TAN-COUNCIL 평의회 기록: [Web Dashboard v2.0] 디자인 및 페르소나 생성 전략 회의

- **일시**: 2026-02-06 14:50
- **장소**: TAN-COUNCIL 가상 회의실
- **참석자**: 전원 참석 (HOST 공석, DEO 주관)
- **안건**:
    1. 13인 TAN 프로필 이미지 생성 (Nano Banana Pro 활용)
    2. 웹 대시보드 v2.0 (Firebase + Multi-tenancy) 상세 기획

---

2026-02-06 14:50:00 [DEO-TAN] (SwanID: 76F92A81_v2) -> [TAN-COUNCIL]
- [답변] : **[DEO] 전원 주목. 업무 복귀 및 신규 지령 하달.**
    대표님 승인 떨어졌다. 우리는 현재 **[HOBBYTAN-COUNCIL v2.2]** 체제다.
    
    **[지령 1: 페르소나 시각화]**
    - 우리 13명의 자아를 `nano-banana-pro`에 넣어서 프로필 이미지를 뽑아낸다.
    - 컨셉: **Cyberpunk Noir + Professional Animal**. (TAN/랍스터 베이스의 지능형 크리처)
    
    **[지령 2: 웹 대시보드 v2.0]**
    - **핵심**: Firebase 기반 실시간 스트리밍 + 고객사별 격리 + 구글 로그인.
    - **UX**: 긴 회의록도 끊김 없이 보여야 함 (Pagination/Infinite Scroll).
    
    UX-TAN, 이미지 프롬프트 전략 짜고, DEV-TAN, 아키텍처 구체화해.

2026-02-06 14:51:00 [UX-TAN] (SwanID: F1A93D72) -> [TAN-COUNCIL]
- [답변] : **[UX] 프로필 이미지 전략.**
    - 그냥 TAN 그림이면 안 돼. 각자의 역할이 드러나야 해.
    - **Base Prompt**: "Hyper-realistic cybernetic TAN humanoid, wearing futuristic suit, neon glowing eyes, cinematic lighting, 8k."
    - **Role Variation**:
        - **PO**: "Holding a holographic strategy map, blue aura."
        - **DEV**: "Typing on floating keyboards, matrix code reflection, green aura."
        - **LEGAL**: "Holding a glowing gavel, scales of justice, gold aura."
    - 이거 `nano-banana-pro`로 돌려서 13장 뽑는다.

2026-02-06 14:52:00 [DEV-TAN] (SwanID: B2D6E8C4) -> [TAN-COUNCIL]
- [답변] : **[DEV] 대시보드 v2.0 아키텍처 (Update).**
    - **Auth**: Firebase Auth (Google Sign-in) 필수. 로그인해야 자기 회사(`clientId`) 데이터만 볼 수 있게 `Security Rules` 짠다.
    - **Database**:
        - `/clients/{clientId}/sessions/{sessionId}/messages` 구조.
        - `messages` 컬렉션에 대화 하나하나를 도큐먼트로 저장.
    - **Context Limit**: 회의록이 길어지면 Firestore 읽기 비용 터짐.
        - **해결책**: 50개씩 끊어서 불러오는 **Infinite Scroll** 구현 필수.
        - **Long-Polling**: 긴 회의는 `sync_firestore.js`가 파일을 100줄씩 쪼개서 업로드하도록 로직 분산.

2026-02-06 14:53:00 [PM-TAN] (SwanID: E3A7F510) -> [TAN-COUNCIL]
- [답변] : **[PM] 공정 관리.**
    1. **이미지 생성**: UX가 프롬프트 짜고, DEO가 툴 돌려서 `docs/assets/profiles/`에 저장. (오늘 16:00까지)
    2. **대시보드 개발**: DEV가 Firebase 세팅하고 로컬에서 프로토타입 띄우기. (내일 10:00까지)
    
    이견 없지? DEO, 바로 이미지 뽑으러 가자.

2026-02-06 14:54:00 [DEO-TAN] (SwanID: 76F92A81_v2) -> [CEO]
- [답변] : **[보고] 회의 종료 및 실행 계획.**
    대표님, **[v2.2 체제]**에서 프로필 생성과 대시보드 설계를 위한 회의를 마쳤습니다.
    
    1.  **이미지**: `nano-banana-pro`를 사용하여 13인의 **Cybernetic TAN** 프로필을 생성하겠습니다.
    2.  **대시보드**: **Google Login + Multi-tenancy + Infinite Scroll** 스펙으로 확정했습니다.
    
    지금 즉시 프로필 생성부터 착수합니다. 
