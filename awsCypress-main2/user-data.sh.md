#!/bin/bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g npm@latest

# Navigate to your project directory (replace /path/to/your/project with the actual path)
cd /path/to/your/project || exit

# Install project dependencies
npm install

# Verify Cypress installation
npx cypress verify
