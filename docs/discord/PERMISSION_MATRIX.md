# ⚔️ HOBBYTAN-COUNCIL 디스코드 권한 매트릭스

**TAN 12-Node Cluster × 19 Channels | v1.0 | 2026-02-20**

## 권한 레벨 정의

| 레벨 | 표기 | 설명 |
|------|------|------|
| 🟢 OWN | `OWN` | 홈채널. RW + `requireMention: false`. 모든 메시지에 자동 응답. 채널 운영 주도권 보유. |
| 🔵 RW | `RW` | 읽기+쓰기. `requireMention: true`. @멘션 시에만 응답. 불필요한 노이즈 방지. |
| 🟣 W | `W` | 쓰기 전용. `#chronicle` 전용. 자신의 작업 기록만 남김. 다른 TAN 기록에 반응 불가. DEO만 OWN. |
| 🟡 R | `R` | 읽기 전용. 정보 참조만 필요한 채널. 맥락 파악 가능하나 직접 발언 불가. |
| ⚫ — | `—` | 접근 불가. 업무와 무관한 채널. 정보 격리 원칙에 따라 완전 차단. |

---

## 📂 COMMAND CENTER

| 채널 | 🎖️DEO | 📦PO | 📋PM | 📊BA | 💻DEV | 🧪QA | 🎨UX | 👥HR | ⚖️Legal | 📣MKT | 🤝CS | 🔬RES |
|------|--------|------|------|------|-------|------|------|------|---------|-------|------|------|
| #ceo-briefing | OWN | RW | RW | R | R | R | R | RW | RW | R | R | R |
| #council-hall | OWN | RW | RW | RW | RW | RW | RW | RW | RW | RW | RW | RW |
| #chronicle | OWN | W | W | W | W | W | W | W | W | W | W | W |
| #task-board | OWN | RW | RW | R | RW | RW | R | R | R | R | R | R |
| #incident-report | OWN | RW | RW | RW | RW | RW | RW | RW | RW | RW | RW | RW |

## 📂 EXECUTIVE

| 채널 | 🎖️DEO | 📦PO | 📋PM | 📊BA | 💻DEV | 🧪QA | 🎨UX | 👥HR | ⚖️Legal | 📣MKT | 🤝CS | 🔬RES |
|------|--------|------|------|------|-------|------|------|------|---------|-------|------|------|
| #deo-command | OWN | — | — | — | — | — | — | — | — | — | — | — |

## 📂 PRODUCT & PROJECT

| 채널 | 🎖️DEO | 📦PO | 📋PM | 📊BA | 💻DEV | 🧪QA | 🎨UX | 👥HR | ⚖️Legal | 📣MKT | 🤝CS | 🔬RES |
|------|--------|------|------|------|-------|------|------|------|---------|-------|------|------|
| #po-product | RW | OWN | RW | RW | R | R | RW | — | R | RW | RW | R |
| #pm-project | RW | RW | OWN | RW | RW | RW | RW | R | R | R | R | R |
| #ba-analysis | RW | RW | RW | OWN | R | R | R | R | R | RW | RW | RW |

## 📂 ENGINEERING

| 채널 | 🎖️DEO | 📦PO | 📋PM | 📊BA | 💻DEV | 🧪QA | 🎨UX | 👥HR | ⚖️Legal | 📣MKT | 🤝CS | 🔬RES |
|------|--------|------|------|------|-------|------|------|------|---------|-------|------|------|
| #dev-lab | R | R | RW | R | OWN | RW | RW | — | — | — | — | RW |
| #qa-testing | R | R | RW | R | RW | OWN | R | — | — | — | — | R |
| #ux-design | R | RW | RW | R | RW | R | OWN | — | — | RW | RW | R |
| #research-lab | R | R | R | RW | RW | R | R | — | R | R | — | OWN |

## 📂 OPERATIONS

| 채널 | 🎖️DEO | 📦PO | 📋PM | 📊BA | 💻DEV | 🧪QA | 🎨UX | 👥HR | ⚖️Legal | 📣MKT | 🤝CS | 🔬RES |
|------|--------|------|------|------|-------|------|------|------|---------|-------|------|------|
| #hr-personnel | RW | — | R | — | — | — | — | OWN | RW | — | — | — |
| #legal-counsel | RW | RW | R | R | R | — | — | RW | OWN | R | R | — |
| #marketing-ops | R | RW | R | RW | — | — | RW | — | R | OWN | RW | R |
| #cs-support | R | RW | R | RW | RW | RW | RW | — | R | RW | OWN | — |

---

## 📌 권한 설계 원칙

### OWN (홈채널)
해당 TAN의 주 활동 공간. `requireMention: false`로 설정하여 모든 메시지에 자동 응답. 채널 운영 주도권 보유.

### RW (읽기+쓰기)
업무상 협업이 필요한 채널. `requireMention: true`로 설정하여 @멘션 시에만 응답. 불필요한 노이즈 방지.

### W (쓰기 전용)
`#chronicle` 전용. 모든 TAN이 자신의 작업 기록을 남길 수 있지만, 다른 TAN의 기록에 반응하지 않음. DEO만 전체 관리 권한(OWN).

### R (읽기 전용)
정보 참조만 필요한 채널. 해당 TAN이 맥락을 파악할 수 있지만 직접 발언하지 않음.

### — (접근 불가)
업무상 관련 없는 채널. 정보 격리 원칙에 따라 완전 차단. 노이즈 제거 및 보안 강화.

---

## 🔑 핵심 설계 논리

- **DEO** — 모든 COMMAND CENTER 채널 OWN + 전 채널 최소 R 이상. 유일하게 `#deo-command` 독점 접근 (CEO ↔ DEO 전용 핫라인).
- **#council-hall** — 유일하게 전원 RW인 채널. TAN 전체 회의, 투표, 의사결정이 이루어지는 광장.
- **#incident-report** — 전원 RW. 누구든 인시던트를 보고하고 대응에 참여할 수 있어야 함.
- **#chronicle** — 전원 W (DEO만 OWN). 연산 대화록의 무결성을 위해 기록만 허용, 상호 대화 불가.
- **#ceo-briefing** — DEO(OWN) + PO/PM/HR/Legal(RW) + 나머지(R). 경영진 보고는 핵심 리더만 쓰기 가능.
- **ENGINEERING 카테고리** — 비기술 TAN(HR, Legal, MKT, CS)은 접근 제한. 기술 집중 환경 보호.
- **OPERATIONS 카테고리** — HR/Legal은 민감 정보 취급으로 접근 범위 최소화. DEO는 감독 차원에서 RW.
- **교차 협업 패턴:** PM은 거의 모든 실행 채널에 RW (일정/리소스 조율), BA는 분석이 필요한 곳에 RW, UX-MKT-CS는 사용자 관점으로 서로 연결.

---
**HOBBYTAN-COUNCIL : "권한은 곧 책임이며, 접근은 곧 의무다."** ⚔️🚀
