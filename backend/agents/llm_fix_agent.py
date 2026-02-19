import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()  # 🔥 this loads .env file



client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

print("API KEY LOADED:", os.getenv("OPENAI_API_KEY"))

def llm_fix_code(file_content, test_logs):

    prompt = f"""
You are an expert software engineer.

The following code has failing tests.

### Code:
{file_content}

### Test Output:
{test_logs}

Fix the code so that the tests pass.
Return ONLY the corrected full file content.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert developer."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    return response.choices[0].message.content
