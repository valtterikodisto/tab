#!/bin/bash

build_image() {
  cd /opt/ && sudo git clone https://github.com/valtterikodisto/tab && cd tab && docker build -t valtterikodisto/tab .
}

move_shortcut_icons() {
  yes | sudo cp -f /opt/tab/scripts/assets/*.desktop ~/.local/share/applications/
}

chmod_scripts() {
  cd /opt/tab/scripts/ && sudo chmod +x *.sh
}

build_image && move_shortcut_icons && chmod_scripts