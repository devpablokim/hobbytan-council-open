# 🔄 TAN 평의회 기록: 5-Cycle Verification [Cycle 1 - Start]

- **일시**: 2026-02-07 19:00 (KST)
- **주제**: `/academy` 경로 접속 불가(404) 이슈 해결을 위한 1차 개발 착수
- **참석**: DEO, DEV
- **상태**: **CYCLE 1 START**

---

2026-02-07 19:00:00 [DEO-TAN v3.0] -> [DEV-TAN v2.0]
- [지시] : 대표님 피드백 접수. 루트(`/`)는 뜨는데 `/academy`가 안 뜬다? 이건 전형적인 **SPA 라우팅 이슈**다.
    `firebase.json`에 `rewrites` 설정이 되어 있는지 확인하고, 만약 되어 있다면 왜 안 먹히는지 파악해라.
    지금 바로 **[개발 착수]**하고 대표님께 보고해.

2026-02-07 19:02:00 [DEV-TAN v2.0] -> [DEO-TAN v3.0]
- [분석] : `firebase.json`을 확인해보니 `rewrites` 설정은 되어 있습니다.
    ```json
    "rewrites": [ { "source": "**", "destination": "/index.html" } ]
    ```
    이게 있는데도 안 된다는 건, **`cleanUrls`** 설정이 없어서 `.html` 확장자를 제거하는 과정에서 꼬였거나, 혹은 브라우저 캐시 문제일 수 있습니다.
    하지만 더 유력한 건, 아까 `package.json`에서 `"homepage": "/"`로 바꿨지만, 실제 빌드된 파일들이 서브 경로를 제대로 인식하지 못하는 경우입니다.
    
    **[수정 계획]**
    1.  `firebase.json`에 `"cleanUrls": true` 추가.
    2.  `firebase.json`의 `rewrites` 규칙을 좀 더 명시적으로 수정.
    3.  `App.js`에서 `BrowserRouter` 대신 `HashRouter`를 쓰는 것도 고려해볼 만하지만, URL이 못생겨지니(`/#/academy`) 일단 `rewrites` 수정으로 해결 시도.

---
**기록자**: DEO-TAN v3.0
