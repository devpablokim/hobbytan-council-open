# 🤝 TAN-COUNCIL 평의회 기록: [Service Upgrade] 디자인 전면 개편 및 고객사 데이터 격리 전략

- **일시**: 2026-02-06 15:00
- **장소**: TAN-COUNCIL 가상 회의실 (Swan ID: 76F92A81_v2 주관)
- **참석자**: 전원 참석 (DEO 주관)
- **안건**:
    1. **Design**: "구리다"는 평가에 대한 UX 대수술 (Landing Page & Dashboard).
    2. **User Flow**: 소개 페이지 -> 구글 로그인 -> "대표님" 호칭의 전용 의회 입장.
    3. **Input & Security**: PDF/자료 업로드 파이프라인 (Firebase Storage vs GitHub).
    4. **Process**: 업로드된 자료 기반의 헌법 준수 의결 체계 수립.

---

2026-02-06 15:00:00 [DEO-TAN] (SwanID: 76F92A81_v2) -> [TAN-COUNCIL]
- [답변] : **[DEO] 전원 소집. 긴급 안건 상정.**
    대표님께서 현재 HOBBYTAN-COUNCIL의 상태에 대해 3가지 팩폭을 날리셨다.
    1. **디자인이 너무 구리다.** (UX-TAN, 반성해라.)
    2. **진입 시나리오 부재.** (소개 페이지 및 로그인 연동 필요.)
    3. **데이터 보안 구멍.** (고객 데이터를 깃허브에 올리면 안 된다. Firebase Storage 써야 함.)
    
    자, 각자 전문 분야에서 해결책 내놔. UX부터 시작해.

2026-02-06 15:01:00 [UX-TAN] (SwanID: F1A93D72) -> [TAN-COUNCIL]
- [답변] : **[UX] 디자인 전면 리부트 선언.**
    - 인정합니다. 지금은 그냥 터미널 흉내만 낸 수준입니다.
    - **New Concept**: **"The Sanctuary Glass"**.
        - **Landing Page**: 어두운 배경에 네온 라인, "당신의 사업을 위한 13인의 AI 이사회" 타이포그래피.
        - **Dashboard**: 기존 채팅창을 '유리 패널' 위에 띄우고, 배경에는 희미하게 움직이는 사이버네틱 네트워크 애니메이션 추가.
        - **Avatar**: 프로필 이미지는 원형이 아니라 **육각형(Hexagon) 프레임**으로 세련되게 변경.

2026-02-06 15:02:00 [PO-TAN] (SwanID: 1D4B9C2E) -> [TAN-COUNCIL]
- [답변] : **[PO] 유저 플로우(User Flow) 재정의.**
    - **Step 1 (Intro)**: 서비스 소개 페이지. "입장하기" 버튼 클릭.
    - **Step 2 (Auth)**: 구글 로그인. (성공 시 유저를 **"대표님(CEO)"**으로 통칭).
    - **Step 3 (Room)**: `Current_Client_ID`가 아닌, 유저의 UID를 기반으로 **독립된 의회방(Boardroom)** 생성.
    - **Step 4 (Input)**: "사업계획서를 제출하십시오"라는 모달 창. 드래그 앤 드롭 지원.

2026-02-06 15:03:00 [DEV-TAN] (SwanID: B2D6E8C4) -> [TAN-COUNCIL]
- [답변] : **[DEV] 보안 아키텍처 (Storage vs GitHub).**
    - **절대 원칙**: **고객 데이터(PDF, 이미지)는 절대 GitHub에 올리지 않는다.** (보안 위반).
    - **Architecture**:
        1.  Client가 웹에서 파일 업로드 -> **Firebase Storage** (`/uploads/{userId}/{fileId}`)에 직접 저장.
        2.  **Firebase Cloud Functions** (Webhook 역할)가 업로드 감지 (`onFinalize`).
        3.  Functions가 파일을 읽고 텍스트 추출(OCR/Parsing) 후 -> 우리 의회의 **Input Context**로 주입.
        4.  그 이후부터는 우리 TAN들이 헌법 절차대로 토론 시작.

2026-02-06 15:04:00 [LEGAL-TAN] (SwanID: D4C2B8A1) -> [DEV-TAN]
- [답변] : **[LEGAL] 데이터 주권 확인.**
    - 업로드된 파일은 **"분석 종료 후 자동 파기"**되거나 **"철저히 격리"**되어야 함. Storage 보안 규칙(`storage.rules`)에서 본인(`request.auth.uid`) 외에는 절대 접근 불가하게 막아야 함. GitHub에는 오직 '추출된 텍스트 요약본'이나 '분석 결과'만 남기는 걸로 합의하자.

2026-02-06 15:05:00 [PM-TAN] (SwanID: E3A7F510) -> [TAN-COUNCIL]
- [답변] : **[PM] 실행 계획 수립.**
    1.  **UX**: 오늘 내로 랜딩 페이지 및 대시보드 리디자인 시안(`Figma` 대신 `CSS`로 바로) 도출.
    2.  **DEV**: Firebase Storage 활성화 및 `storage.rules` 작성. Cloud Functions(업로드 트리거) 설계.
    3.  **PO**: "대표님" 호칭 적용 및 온보딩 스크립트 작성.

2026-02-06 15:06:00 [DEO-TAN] (SwanID: 76F92A81_v2) -> [CEO]
- [답변] : **[DEO] 의결 사항 보고.**
    대표님, 디자인/플로우/보안 3박자를 갖춘 **[Service Flow v3.0]**을 수립했습니다.
    - **디자인**: 구린 터미널 탈피 -> "Sanctuary Glass" 테마 적용.
    - **보안**: GitHub 업로드 금지 -> **Firebase Storage + Security Rules**로 철통 보안.
    - **프로세스**: 업로드 즉시 Cloud Functions가 의회를 소집하는 자동화 파이프라인.
    
    상세 기획서와 회의록을 제출합니다. 승인해 주시면 즉시 코드 작업 들어갑니다.
