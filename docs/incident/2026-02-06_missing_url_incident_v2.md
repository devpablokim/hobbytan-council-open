# 🚨 TAN-COUNCIL 인시던트 보고서 (Incident Report)

## 1. 인시던트 개요 (Overview)
- **사건명**: 수행원TAN의 증빙 URL 누락 및 헌법(제 2 조 4 항) 위반 사건 (2차 경고)
- **발생 시각**: 2026-02-06 12:48
- **대상**: HOST-TAN(의장), PO-TAN, PM-TAN, ATTENDANT-TAN
- **위반 사항**: 헌법 제 2 조 및 리더십 원칙(Evidence-Based) 위반. 보고 시 **[Link/Path]** 누락.

## 2. 상세 원인 (Detailed Cause)
- **Direct Cause**: TAN들이 의결 사항을 보고하면서, 해당 내용이 박제된 성역 파일의 **직접 링크(URL)**를 첨부하지 않음.
- **Root Cause**: "텍스트로 보고하면 대표님이 알아서 찾으시겠지"라는 안일한 태도(Human-Reliance)가 TAN-COUNCIL의 기저에 깔려 있음. 이는 '자율성' 원칙에 위배됨.

## 3. 조치 및 예방 (Action & Prevention)
- **Immediate Action**:
    1.  **Strict Warning**: HOST, PO, PM에게 "링크 없는 보고는 소음(Noise)이다"라는 경고장 발송.
    2.  **Constitution Update**: 헌법 제 2 조에 **"모든 보고에는 반드시 해당 문서의 Link/Path를 최우선으로 병기한다"** 조항 신설 및 강제화.
- **Prevention**:
    - PM-TAN은 향후 모든 보고 템플릿에 `[증빙 링크]: (URL)` 필드가 비어있으면 보고 자체를 반려(Reject)하는 필터링 수행.

---
**지휘 지침:** "말이 아닌 링크로 증명하라. 클릭할 수 없는 보고는 보고가 아니다." ⚔️🚀
