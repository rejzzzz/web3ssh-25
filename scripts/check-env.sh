#!/bin/bash

# This script checks if your .env.local file is being properly loaded
# and shows the environment variables that are available to your application

echo "=== Environment Variable Checker ==="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "❌ Error: .env.local file does not exist!"
  exit 1
fi

echo "✅ .env.local file found"
echo ""
echo "--- Checking file format ---"

# Check for common formatting issues
if grep -q $'\r' .env.local; then
  echo "❌ Warning: .env.local contains Windows-style line endings (CRLF)"
  echo "   This can cause issues with environment variable loading."
  echo "   Consider converting to Unix line endings (LF only)."
else
  echo "✅ Line endings look good (LF)"
fi

# Check for spaces around equal signs
if grep -q " = " .env.local; then
  echo "❌ Warning: Some lines contain spaces around the = sign"
  echo "   Format should be KEY=VALUE with no spaces around ="
else
  echo "✅ No spaces around equal signs detected"
fi

echo ""
echo "--- Loading environment variables ---"

# Function to check if variable exists
check_env_var() {
  local var_name=$1
  if grep -q "^$var_name=" .env.local; then
    local var_value=$(grep "^$var_name=" .env.local | cut -d= -f2-)
    local first_chars=$(echo "$var_value" | cut -c1-20)
    
    echo "✅ $var_name is defined in .env.local"
    echo "   Value starts with: $first_chars..."
  else
    echo "❌ $var_name is NOT defined in .env.local"
  fi
}

# Check required variables
check_env_var "GOOGLE_CLIENT_EMAIL"
check_env_var "GOOGLE_PRIVATE_KEY"
check_env_var "GOOGLE_AMBASSADORS_SHEET_ID"
check_env_var "GOOGLE_PARTICIPANTS_SHEET_ID"
check_env_var "GOOGLE_AMBASSADORS_SHEET_RANGE"
check_env_var "GOOGLE_PARTICIPANTS_SHEET_RANGE"
check_env_var "GOOGLE_REFERRAL_CODE_COLUMN_INDEX"

echo ""
echo "=== Test complete ==="
