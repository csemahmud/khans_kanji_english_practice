#!/bin/bash

# Personal Git identity
PERSONAL_NAME="csemahmud"
PERSONAL_EMAIL="lone.wolf.mahmud@gmail.com"
PERSONAL_GITHUB_HOST="github.com-personal"
PERSONAL_SSH_KEY="$HOME/.ssh/id_ed25519_github_personal"
REPO_PATH="/d/Work/ubuntu_practice/java/spring_boot/khans_kanji_english_practice"
GITHUB_REPO_PATH="csemahmud/khans_kanji_english_practice.git"

echo "🛠️ Starting personal Git configuration..."

# Step 1: Generate SSH key if not already present
if [ ! -f "$PERSONAL_SSH_KEY" ]; then
  echo "🔑 Generating new SSH key at: $PERSONAL_SSH_KEY"
  ssh-keygen -t ed25519 -C "$PERSONAL_EMAIL" -f "$PERSONAL_SSH_KEY" -N ""
else
  echo "✅ SSH key already exists: $PERSONAL_SSH_KEY"
fi

# Step 2: Add SSH config if not already present
SSH_CONFIG="$HOME/.ssh/config"
if ! grep -q "$PERSONAL_GITHUB_HOST" "$SSH_CONFIG" 2>/dev/null; then
  echo "⚙️ Adding SSH config entry for $PERSONAL_GITHUB_HOST"
  {
    echo ""
    echo "Host $PERSONAL_GITHUB_HOST"
    echo "  HostName github.com"
    echo "  User git"
    echo "  IdentityFile $PERSONAL_SSH_KEY"
    echo "  IdentitiesOnly yes"
  } >> "$SSH_CONFIG"
  chmod 600 "$SSH_CONFIG"
else
  echo "✅ SSH config for $PERSONAL_GITHUB_HOST already exists."
fi

# Step 3: Configure local Git identity and remote
echo "📁 Configuring repository: $REPO_PATH"
cd "$REPO_PATH" || {
  echo "❌ Could not access $REPO_PATH"
  exit 1
}

git config user.name "$PERSONAL_NAME"
git config user.email "$PERSONAL_EMAIL"
echo "✅ Git identity set to: $PERSONAL_NAME <$PERSONAL_EMAIL>"

git remote set-url origin "git@${PERSONAL_GITHUB_HOST}:${GITHUB_REPO_PATH}"
echo "🔄 Git remote updated to use SSH: git@${PERSONAL_GITHUB_HOST}:${GITHUB_REPO_PATH}"

# Step 4: Show public key for GitHub upload
echo ""
echo "📎 Add this public key to your GitHub account (https://github.com/settings/ssh):"
echo "--------------------------------------------------"
cat "${PERSONAL_SSH_KEY}.pub"
echo "--------------------------------------------------"

echo "✅ All done!"
