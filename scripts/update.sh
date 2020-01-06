#!/bin/bash

GREEN='\033[0;32m'
RESETCOLOR="\033[0m"

PROJECT_ROOT="/opt/tab"
cd $PROJECT_ROOT

git remote update
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse @{u})

prompt_exit() {
  read -r -p "Paina ENTER poistuaksesi" _
}

if [ $LOCAL != $REMOTE ]; then
    echo "Päivitys saatavilla!"
    read -r -p "Haluatko päivittää sovelluksen? [y/n] " response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        sudo mv /opt/tab/ /opt/tab-old/ && cd /opt/tab-old/scripts/ && ./install.sh && sudo mv /opt/tab-old/data/ /opt/tab/ && sudo rm -rf /opt/tab-old/ && printf "${GREEN}Sovellus päivitetty!\n\n${RESETCOLOR}" && prompt_exit
    else
        echo "Päivitys peruutettu"
        prompt_exit
    fi
else
    echo "Sovellus on ajan tasalla"
    prompt_exit
fi