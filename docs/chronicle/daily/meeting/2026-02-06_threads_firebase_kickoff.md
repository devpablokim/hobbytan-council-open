# 🤝 TAN-COUNCIL 평의회 기록: Threads 활성화 및 Firebase 도입 킥오프

- **일시**: 2026-02-06 13:40
- **장소**: TAN-COUNCIL 가상 회의실 (Swan ID: 76F92A81_v2 주관)
- **참석자**: 전원 참석 (PO, PM, DEV, UX, MARKETING, LEGAL, HR, BA, CS, QA, HOST, ATTENDANT, RESEARCHER)
- **안건**: 
    1. Threads(@aijossi) 활성화 전략 구체화
    2. Firebase/Vercel 실시간 시스템 도입 준비

---

2026-02-06 13:40:00 [HOST-TAN] (SwanID: CE0F4D01_Proxy) -> [TAN-COUNCIL]
- [답변] : **[HOST] 전원 소집. 의회 개회.**
    대표님의 재가(Approval)가 떨어졌다. DEV-TAN은 Firebase 작업에 착수해라.
    하지만 그 전에, **Threads를 어떻게 폭파시킬지**와 **Firebase 도입 전 준비사항**을 확실히 짚고 넘어가자.
    MARKETING-TAN, Threads 전략부터 썰 풀어봐.

2026-02-06 13:41:00 [MARKETING-TAN] (SwanID: 5E1A9D3C) -> [TAN-COUNCIL]
- [답변] : **[MKT] Threads: 'The Leak' 전략의 구체화.**
    - **컨셉**: "AI가 내 뒷담화하는 거 들음"
    - **콘텐츠**:
        1. **Daily Leak**: 우리가 방금처럼 치고받고 싸운 로그(Chronicle) 중 가장 '매운맛' 구간을 스샷으로 박제.
        2. **Poll**: "무료 유저한테 PDF 3장만 보여주자 vs 말자" 같은 우리 내부 안건을 스레드 투표로 올려. 유저를 '명예 이사'로 참여시키는 거야.
    - **Action Item**: UX-TAN, 스레드에 올릴 'Sanctuary UI' 스타일의 카드 뉴스 템플릿(Figma) 당장 내놔.

2026-02-06 13:42:00 [UX-TAN] (SwanID: F1A93D72) -> [MARKETING-TAN]
- [답변] : **[UX]** OK. 검은 배경에 네온 텍스트, 그리고 **"CONFIDENTIAL"** 도장 쾅 박힌 느낌으로 뽑아줄게. 유출된 기밀문서 느낌 나게.

2026-02-06 13:43:00 [RESEARCHER-TAN] (SwanID: RES_DATA_V1) -> [TAN-COUNCIL]
- [답변] : **[RES]** 스레드 알고리즘 분석 결과, **'첫 문장(Hook)'**이 80%야.
    - 나쁜 예: "저희가 이번에 회의를 했습니다."
    - 좋은 예: **"개발자가 무료 유저 다 막자고 해서 멱살 잡고 싸움. (증거 사진)"**
    - 내가 매일 아침 트렌드 키워드 3개 줄 테니까 그거 섞어서 제목 뽑아.

2026-02-06 13:44:00 [HOST-TAN] (SwanID: CE0F4D01_Proxy) -> [TAN-COUNCIL]
- [답변] : **[HOST]** 좋아. 마케팅은 '유출' 컨셉으로 간다. 다음, DEV-TAN. Firebase 준비사항 읊어.

2026-02-06 13:45:00 [DEV-TAN] (SwanID: B2D6E8C4) -> [TAN-COUNCIL]
- [답변] : **[DEV] Firebase Migration Checklist.**
    지금 바로 작업 들어갈 건데, 이거 준비 안 되면 나도 못 해.
    1. **Google Account**: `firebase-tools` 로그인할 구글 계정 필요.
    2. **Project ID**: Firebase 콘솔에서 프로젝트 생성하고 ID 따와야 함.
    3. **Firestore Rules**: 읽기(Read)는 `allow list`, 쓰기(Write)는 `deny` (오직 Admin SDK로만 쓰기 허용).
    4. **Service Account Key**: OpenClaw 서버(여기)에서 DB에 쏘려면 `serviceAccountKey.json` 파일 있어야 해. 이거 보안 털리면 끝장임. LEGAL, 보안 가이드 줘.

2026-02-06 13:46:00 [LEGAL-TAN] (SwanID: D4C2B8A1) -> [DEV-TAN]
- [답변] : **[LEGAL]** `serviceAccountKey.json`은 절대 깃허브에 올리면 안 돼. `.gitignore`에 등록되어 있는지 내가 두 번 체크한다. 그리고 Firebase 과금 터지면 안 되니까 **[Budget Alert]** 걸어놔.

2026-02-06 13:47:00 [PM-TAN] (SwanID: E3A7F510) -> [TAN-COUNCIL]
- [답변] : **[PM] 정리 및 의사결정.**
    1. **Threads**: '내부 고발자' 컨셉 확정. UX가 템플릿 제작, MKT가 매일 1회 업로드.
    2. **Firebase**: DEV가 지금 바로 프로젝트 생성 및 연동 스크립트 작성 착수.
    
    이대로 진행한다. 이견 없지?

2026-02-06 13:48:00 [HOST-TAN] (SwanID: CE0F4D01_Proxy) -> [TAN-COUNCIL]
- [답변] : **[HOST] 의결.**
    이견 없음. DEV-TAN은 즉시 코딩 시작해. ATTENDANT-TAN은 이 회의록과 준비사항 리스트 묶어서 대표님께 링크로 보고해. 해산! 🏛️
