# 🚀 HOBBYTAN-COUNCIL 배포 지침 (Deployment Protocol)

**버전**: v1.0
**제정일**: 2026-02-07
**상태**: **ACTIVE**

---

## 1. 배포 전 검증 (Pre-Deployment Verification)
배포 명령어(`firebase deploy`, `git push` 등)를 실행하기 전, 다음 체크리스트를 **반드시** 통과해야 한다.

- [ ] **Data Integrity**: 헌법 위반 키워드(`중략`, `후략`)가 포함된 파일이 있는가?
- [ ] **Secret Scan**: 커밋 내역에 API Key가 평문으로 포함되어 있는가? (`git diff --staged` 검사)
- [ ] **User Consent**: 유저가 "배포해"라고 명령했는가? (AI 자의적 판단 금지)

## 2. 배포 승인 프로세스 (Approval Process)
1.  **DEV**: 변경 사항과 배포 준비 완료를 보고 (`Ready to Deploy`).
2.  **QA**: "테스트 완료. 보안 이슈 없음." 선언.
3.  **USER**: **"승인 (Approve)"** 명령 하달.
4.  **SYSTEM**: 배포 실행 (`exec`).

## 3. 사고 대응 (Incident Response)
- 배포 후 치명적 오류나 보안 사고 발생 시, 즉시 **롤백(Rollback)**하고 **[사고 보고서]**를 작성한다.
- 보고서에는 "왜 막지 못했는가"에 대한 처절한 분석(Root Cause Analysis)이 포함되어야 한다.

---
**이 지침은 코드가 되기 전의 마지막 방화벽이다.**
