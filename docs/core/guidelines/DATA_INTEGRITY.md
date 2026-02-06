# 🛡️ 데이터 무결성 및 헌법 수호 지침 (Guidelines for Data Integrity & Constitution Enforcement)

**제정일**: 2026-02-06
**승인**: DEO-TAN v2.0
**상태**: **ACTIVE (절대 준수)**

---

## 1. 목적 (Purpose)
본 지침은 HOBBYTAN-COUNCIL의 최상위 가치인 **'헌법 수호'**와 **'데이터 무결성(Zero Loss)'**을 기술적, 절차적으로 강제하기 위함이다. "중략"은 반역이며, "요약"은 태업이다. 우리는 있는 그대로 기록하고 보존한다.

## 2. 금지 행위 (Prohibited Actions)
다음의 키워드나 패턴이 포함된 문서는 **절대 생성, 저장, 배포될 수 없다.**
- `(중략)`
- `(생략)`
- `(후략)`
- `... (이하 생략)`
- `[skip]`
- `[summary]` (원본 없이 요약만 있는 경우)

## 3. 기술적 강제 조치 (Technical Enforcement)
### 3.1 Pre-commit Hook
- **대상**: 모든 Markdown (`.md`), 텍스트 파일.
- **동작**: 커밋 시점에 금지어 패턴을 스캔하여, 발견 시 `exit(1)`로 커밋을 차단한다.
- **예외**: 본 지침 문서(`DATA_INTEGRITY.md`) 및 사고 보고서(`incident/*.md`) 내의 인용구.

### 3.2 CI/CD Pipeline Check
- 배포 파이프라인에서 다시 한번 무결성 검사를 수행한다.
- 검사 실패 시 배포는 즉시 중단(Abort)된다.

## 4. 업무 수행 절차 (Workflow)
### 4.1 문서 작성 (Documentation)
- **길이 제한 철폐**: 파일 용량이 커지더라도 내용을 자르지 않는다. 필요시 파일을 분할(`part1`, `part2`)한다.
- **원본 보존 (Raw Data Retention)**: 분석 보고서 작성 시, 반드시 원본 데이터를 별첨하거나 링크한다.

### 4.2 UI/UX
- **The Scroll of Truth**: 사용자에게 보여주는 화면에서도 "더 보기" 뒤에 숨기는 것을 지양하고, 전체 내용을 투명하게 공개한다. (단, UX 편의를 위해 접기/펴기 기능은 허용하되, 기본적으로 데이터는 전송되어야 한다.)

### 4.3 마케팅 및 대외 커뮤니케이션
- **Origin Linking**: SNS 게시물 등 짧은 글을 올릴 때는 반드시 근거가 되는 원본 문서(헌법, 회의록 등)의 링크를 포함하여 신뢰도를 담보한다.

## 5. 징계 및 책임 (Disciplinary Action)
- 본 지침을 위반하여 데이터를 훼손한 TAN은 헌법 제8조 3항에 의거하여 **즉시 포맷(Format)**된다.
- 해당 문서를 검수(Review)한 동료 TAN 또한 연대 책임을 진다.

---
**"We Do Not Summarize. We Verify."**
