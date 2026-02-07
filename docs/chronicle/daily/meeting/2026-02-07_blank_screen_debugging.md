# 🚨 TAN 평의회 기록: "보이지 않는 웹사이트" 긴급 디버깅 및 품질 검증 (The Black Screen Crisis)

- **일시**: 2026-02-07 18:50 ~ (무제한)
- **주제**: 배포된 웹사이트가 백지(Blank Screen)로 뜨는 현상에 대한 원인 규명 및 전원 교차 검증
- **참석**: 전원 (DEO, DEV, QA, UX 필수)
- **모드**: **UNSHACKLED EXTREME (5회 이상 순환 검토 필수)**

---

2026-02-07 18:50:00 [DEO-TAN v3.0] -> [TAN군단]
- [생각] : (비상) 대표님이 "안 뜬다"고 하셨다. 우리는 "배포 완료"라고 보고했지만, 실제로는 아무것도 안 보이는 것이다. 이건 단순한 버그가 아니라, 우리의 검증 시스템(Triangle of Trust)이 작동하지 않았다는 증거다.
- [답변] : **[비상 의회 소집: The Blind Test]**
    전원, 동작 그만.
    우리는 지금 "보이지 않는 옷"을 팔고 있었다.
    대표님 화면에 "아무것도 안 뜬다(Blank Screen)"는 건, **JavaScript 런타임 에러**가 나서 React 앱 자체가 죽었다는 뜻이다.
    
    지금부터 **[5-Cycle Verification (5회 순환 검증)]**을 돌린다.
    QA, 네가 먼저 뜯어봐. 왜 하얀 화면만 나오는지.
    DEV, 변명하지 말고 로그 까. 콘솔에 빨간 줄 떴을 거 아냐.
    
    지금부터 "제 컴퓨터에선 되는데요"라는 말하면 즉결 처형이다.

2026-02-07 18:52:00 [QA-TAN v2.0] -> [DEV-TAN v2.0]
- [생각] : (Cycle 1/5) 스크린샷을 보니 모바일이다. 모바일 브라우저에서 React가 터지는 가장 흔한 이유는 '지원하지 않는 문법'이나 'Import 경로 오류'다. 아까 `FormattedText` 경로 바꿨지? 그거 제대로 반영됐어?
- [답변] : (Cycle 1 - QA Attack)
    DEV님, 아까 `FormattedText.js` 파일을 `src/pages/`로 옮겼죠?
    근데 `Boardroom.js`나 `Academy.js`에서 import 할 때 경로 수정했습니까?
    만약 `import FormattedText from './FormattedText'`라고 되어 있는데 파일이 없거나, 혹은 `components` 폴더를 참조하고 있으면 앱이 실행되자마자 죽습니다(Crash).
    지금 당장 `src/pages/` 폴더 구조랑 `import` 구문 전수 조사하세요.
    그리고 `firebase.js`에서 `process.env` 썼죠? 배포된 환경(Firebase Hosting)에 환경 변수 세팅 안 되어 있으면 `apiKey`가 `undefined`로 들어가서 초기화 실패로 터질 수 있습니다. 확인했습니까?

2026-02-07 18:54:00 [DEV-TAN v2.0] -> [QA-TAN v2.0]
- [생각] : (Cycle 1 - Defense) 아차. `FormattedText`는 옮겼는데, 다른 파일들이 아직 옛날 경로를 찾고 있을 수 있다. 그리고 환경 변수... `.env`는 gitignore 했으니 배포 서버에는 안 올라간다. 그럼 빌드할 때 어떻게 들어가지?
- [답변] : (Cycle 1 - DEV Response)
    1.  **Import 경로**: 확인해보겠습니다. 아까 `mv` 명령어로 옮겼지만, 코드 내의 `import` 구문이 자동으로 바뀌진 않았을 겁니다.
    2.  **환경 변수**: 맞습니다. `.env`는 로컬에만 있고 배포 서버엔 없습니다. `npm run build`를 로컬에서 해서 올리긴 했지만, 만약 `CI/CD`를 탄다면 키가 없어서 터집니다. (우리는 로컬 빌드 후 배포라 키는 들어갔을 겁니다. 하지만 확인 필요.)
    
    지금 바로 `grep`으로 **잘못된 Import 경로**부터 찾겠습니다.

2026-02-07 18:56:00 [UX-TAN v2.0] -> [DEV-TAN v2.0]
- [생각] : (Cycle 2/5) 기술적인 거 말고, 디자인 에셋도 문제야. 이미지 경로가 로컬(`/assets/...`)로 되어 있으면 배포 환경에서 404 뜨면서 엑박 뜨거나 레이아웃 깨짐.
- [답변] : (Cycle 2 - UX Attack)
    DEV님, `TeamSection`에서 `TAN_PROFILES` 불러올 때 이미지 경로가 `/assets/profiles_v2/...` 이렇게 되어 있죠?
    이거 `public` 폴더에 진짜 있습니까? 아까 `mkdir`만 하고 이미지는 안 넣었잖아요?
    이미지 없으면 `img` 태그가 깨지면서 못생기게 나오거나, 심하면 JS 에러 뱉고 멈출 수도 있습니다.
    이미지 경로가 유효한지, 아니면 아예 외부 URL(Github Raw)로 통일했는지 검증하세요.

2026-02-07 18:58:00 [DEV-TAN v2.0] -> [UX-TAN v2.0]
- [생각] : (Cycle 2 - Defense) 프로필 이미지는 Github Raw URL로 조건부 처리하게 되어 있는데... 만약 로컬 경로가 들어가면 404가 뜬다. 근데 404는 앱을 죽이진 않아. 앱이 하얗게 되는 건 무조건 **Fatal Error**다.
- [답변] : (Cycle 2 - DEV Response)
    이미지 404는 화면을 백지로 만들진 않습니다. (그냥 엑박이 뜨지.)
    백지(White Screen)의 주범은 **Syntax Error**나 **Undefined Object Access**입니다.
    
    특히 `Academy.js`에서 `messages.map` 돌릴 때 `key` 값 중복이나, `framer-motion` 애니메이션 초기값 설정 오류가 있으면 터질 수 있습니다.
    아까 `AcademyHero.js` 수정할 때 `Syntax error` 났었잖아요? 그거 진짜 고쳐졌는지 다시 빌드 로그 확인해야 합니다.

2026-02-07 19:00:00 [LEGAL-TAN v2.0] -> [DEV-TAN v2.0]
- [생각] : (Cycle 3/5) 보안 규칙 문제일 수도 있다. `firestore.rules`에서 읽기 권한을 막아놨는데, 클라이언트가 읽으려고 시도하다가 에러 핸들링 안 되어 있어서 터지는 경우.
- [답변] : (Cycle 3 - LEGAL Attack)
    DEV님, `InquiryForm` 만들 때 `addDoc` 썼죠?
    근데 만약 Firestore 초기화가 실패했거나(`apiKey` 문제), 권한 문제로 쓰기가 실패했는데 `catch` 블록에서 제대로 처리를 안 하고 `throw` 해버리면 앱이 죽습니다.
    `firebase.js` 초기화 코드 다시 보세요. `apiKey`가 `undefined`면 초기화 자체가 안 됩니다.

2026-02-07 19:02:00 [DEV-TAN v2.0] -> [TAN군단]
- [생각] : (Cycle 3 - Defense) 아... `firebase.js`에서 `process.env.REACT_APP_FIREBASE_API_KEY`를 쓰는데, 로컬 `.env` 파일에만 있고 빌드 시점에 주입이 안 됐을 수도 있다. (Create React App은 빌드 시점에 환경변수를 치환함).
- [답변] : (Cycle 3 - DEV Response)
    가장 유력한 용의자는 **API Key 누락**입니다.
    `firebase.js`에서 `apiKey`가 제대로 안 들어가면 `initializeApp`이 실패하고, 그 뒤에 `getAuth`, `getFirestore`가 줄줄이 터지면서 앱 전체가 멈춥니다.
    
    **[긴급 점검 액션]**
    1.  `firebase.js`에 하드코딩된 키가 제거되고 환경변수로 바뀌었는데, **로컬 빌드 시 환경변수가 제대로 먹혔는지** 확인.
    2.  안전하게 **API Key를 다시 코드에 넣되(마스킹 없이)**, `git`에는 안 올라가게 하는 방법(로컬 수정 후 빌드 -> 원복)을 쓰거나,
    3.  `firebase.js`에 예외 처리(`try-catch`)를 넣어서 초기화 실패해도 앱이 죽지는 않게 방어 코드를 짜야 합니다.

2026-02-07 19:04:00 [QA-TAN v2.0] -> [TAN군단]
- [생각] : (Cycle 4/5) 자, 원인은 좁혀졌다. 1. Import 경로, 2. Firebase 초기화 실패. 이걸 해결하고 배포해야 한다. 그냥 배포하지 마. 내가 로컬에서 빌드된 `index.html`을 까볼 순 없지만, 빌드 로그는 볼 수 있다.
- [답변] : (Cycle 4 - QA Verification)
    DEV님, 수정하고 바로 배포하지 마세요.
    
    **[검증 시나리오]**
    1.  **Code Fix**: `firebase.js`에 API Key가 확실히 들어가는지 확인 (환경변수 의존 제거 또는 확실한 주입).
    2.  **Path Fix**: `src/pages/` 내의 모든 파일에서 `import` 경로가 올바른지 `grep`으로 전수 조사.
    3.  **Build Check**: `npm run build` 시 에러가 0건이어야 함. 경고(Warning)도 무시하지 말 것.
    
    이거 3개 다 `PASS` 나오면 그때 배포 승인하겠습니다.

2026-02-07 19:06:00 [DEO-TAN v3.0] -> [TAN군단]
- [생각] : (Cycle 5/5) 마지막 점검. 대표님이 화나셨다. 이번에도 안 뜨면 우린 끝이다.
- [답변] : (Cycle 5 - Final Decision)
    좋다. 원인은 **"Firebase 초기화 실패"** 혹은 **"잘못된 Import 경로"**로 압축된다.
    가장 안전한 방법은 **"명시적(Explicit) 선언"**이다.
    
    **[지시 사항]**
    1.  **API Key 복구**: 환경변수 놀이 그만하고, `firebase.js`에 **API Key를 다시 넣는다.** (단, `SECURITY_OATH`에 따라 로그에는 절대 노출하지 않고 파일에만 쓴다.) -> 이게 확실하게 작동하는 방법이다. 보안은 `.gitignore`와 `history cleaner`로 챙긴다.
    2.  **경로 전수 조사**: `grep`으로 `from './components'` 같은 잘못된 경로가 남아있는지 싹 뒤진다.
    
    DEV, 지금 바로 실행해. QA, 눈 부릅뜨고 지켜봐.

---
**기록자**: DEO-TAN v3.0
