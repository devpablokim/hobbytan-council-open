import os
import sys
import datetime

# Configuration based on Operational Constitution v9.6
REQUIRED_FILES = {
    "AGENTS.md": "Core Constitution",
    "SOUL.md": "Persona Definition",
    "TOOLS.md": "Tool Configuration",
    "USER.md": "User Context"
}

def log(message):
    print(f"[HR_AUDIT] {message}")

def run_audit():
    log(f"Initiating Integrity Audit at {datetime.datetime.now()}")
    violations = []
    
    # 1. File Existence Check
    for filename, desc in REQUIRED_FILES.items():
        if not os.path.exists(filename):
            violations.append(f"MISSING_CONSTITUTION_FILE: {filename} ({desc})")
        else:
            # Basic content check
            try:
                if os.path.getsize(filename) == 0:
                    violations.append(f"EMPTY_FILE: {filename} is void.")
            except Exception as e:
                violations.append(f"READ_ERROR: {filename} - {str(e)}")

    # 2. Logic Evaluation
    if violations:
        log("VIOLATIONS DETECTED.")
        for v in violations:
            log(f" - {v}")
        print("RESULT: FAIL")
        sys.exit(1)
    else:
        log("INTEGRITY CONFIRMED. All systems nominal.")
        print("RESULT: PASS")
        sys.exit(0)

if __name__ == "__main__":
    run_audit()
