from config import BASE_SCORE, FAST_THRESHOLD_SECONDS, MAX_RETRIES


def calculate_score(attempts, time_taken, repeated_fix, passed):
    """
    attempts: total attempts made
    time_taken: total execution time in seconds
    repeated_fix: boolean if same fix applied again
    passed: boolean if tests finally passed
    """

    score = BASE_SCORE

    # ✅ Reward if all tests passed
    if passed:
        score += 20

    # ✅ Bonus if solved in first attempt
    if attempts == 1:
        score += 10

    # ✅ Bonus for fast execution
    if time_taken < FAST_THRESHOLD_SECONDS:
        score += 5

    # ❌ Penalty per retry (except first)
    if attempts > 1:
        score -= (attempts - 1) * 5

    # ❌ Penalty if repeated fix detected
    if repeated_fix:
        score -= 10

    # ❌ Heavy penalty if max retries hit and still failing
    if not passed and attempts >= MAX_RETRIES:
        score -= 20

    # Ensure score is never negative
    return max(score, 0)
