#!/bin/bash

# Simple installation script for Cosseter SP Artifact Python dependencies
# This script will create a virtual environment and install all required packages

set -e  # Exit on any error

echo "=========================================="
echo "Cosseter SP Artifact - Dependency Installer"
echo "=========================================="

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not found. Please install Python 3.7 or higher."
    exit 1
fi

# Get Python version
PYTHON_VERSION=$(python3 --version 2>&1 | cut -d' ' -f2)
echo "Python version: $PYTHON_VERSION"

# Change to script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"
echo "Working directory: $SCRIPT_DIR"

# Define virtual environment path
VENV_PATH="$SCRIPT_DIR/env"

# Create virtual environment if it doesn't exist
if [ ! -d "$VENV_PATH" ]; then
    echo "Creating virtual environment..."
    python3 -m venv "$VENV_PATH"
    echo "Virtual environment created at: $VENV_PATH"
else
    echo "Virtual environment already exists at: $VENV_PATH"
fi

# Activate virtual environment
echo "Activating virtual environment..."
source "$VENV_PATH/bin/activate"

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "Installing Python packages..."

# Core packages needed for the application
PACKAGES=(
    "pymongo>=4.3.3"
    "celery>=5.2.0"
    "redis>=4.0.0"
    "pyyaml>=6.0"
    "psutil"
    "func_timeout>=4.3.5"
    "networkx>=2.4"
    "sty>=1.0.0"
    "z3-solver>=4.8.8.0"
    "tqdm>=4.48.2"
    "semgrep>=1.0.0"
    "colorlog>=6.7.0"
    "dnspython>=2.3.0"
    "gitpython>=3.1.30"
    "pika>=1.3.1"
    "watchdog>=3.0.0"
    "python-dotenv>=1.0.0"
)

# Install each package
for package in "${PACKAGES[@]}"; do
    echo "Installing $package..."
    if ! pip install "$package"; then
        echo "Warning: Failed to install $package, continuing..."
    fi
done

# Verify key installations
echo ""
echo "Verifying installation..."

KEY_PACKAGES=("pymongo" "celery" "redis" "yaml" "semgrep")

for package in "${KEY_PACKAGES[@]}"; do
    if python3 -c "import $package" 2>/dev/null; then
        echo "✓ $package is working"
    else
        echo "✗ $package failed to import"
    fi
done

echo ""
echo "=========================================="
echo "Installation completed!"
echo "=========================================="
echo ""
echo "To activate the virtual environment:"
echo "  source $VENV_PATH/bin/activate"
echo ""
echo "To run the main tool:"
echo "  python runTool.py"
echo ""
echo "Note: Make sure Docker containers are running before using the tool!"
echo "Use: docker compose up --build"