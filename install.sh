#!/bin/bash

# mytools installation script

set -e

echo "📦 Installing mytools..."

# Install dependencies
if ! command -v fzf &> /dev/null; then
    echo "⚙️  Installing fzf via Homebrew..."
    brew install fzf
else
    echo "✅ fzf is already installed."
fi

# Create symlinks
BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR"

echo "🔗 Creating symlinks in $BIN_DIR..."
for script in scripts/*; do
    script_name=$(basename "$script")
    ln -sf "$PWD/$script" "$BIN_DIR/$script_name"
    chmod +x "$PWD/$script"
    echo "  - $script_name linked"
done

# Setup Zsh completions
ZFUNC_DIR="$HOME/.zfunc"
mkdir -p "$ZFUNC_DIR"
echo "🔗 Setting up Zsh completions in $ZFUNC_DIR..."
for comp in completions/*; do
    comp_name=$(basename "$comp")
    ln -sf "$PWD/$comp" "$ZFUNC_DIR/$comp_name"
    echo "  - $comp_name linked"
done

# Ensure .zfunc is in fpath
if ! grep -q "fpath+=~/.zfunc" "$HOME/.zshrc"; then
    echo "fpath+=~/.zfunc" >> "$HOME/.zshrc"
    echo "autoload -Uz compinit && compinit" >> "$HOME/.zshrc"
    echo "✅ Added ~/.zfunc to fpath in ~/.zshrc"
fi

echo "🚀 Installation complete! Please restart your terminal or run 'source ~/.zshrc' to apply completions."
