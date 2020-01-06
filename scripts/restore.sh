#!/bin/bash

TARGET="/media/$USER/TAB/backup"
RED='\033[0;31m'
GREEN='\033[0;32m'
RESETCOLOR="\033[0m"
PROJECT_ROOT="/opt/tab"

restart_app() {
    sudo docker-compose -f $PROJECT_ROOT/docker-compose.yml restart
}

# Start the application if not running
IS_RUNNING=$(docker inspect -f '{{.State.Running}}' tab-db)
if [ "$IS_RUNNING" != "true" ]; then
  docker-compose -f $PROJECT_ROOT/docker-compose.yml up -d
fi

while :
do
  echo "Anna palautustiedoston nimi (esim. 111219.archive):"
  read backup

  # Check if backup exists
  if [ -f "$TARGET/$backup" ]; then
    docker exec -i tab-db sh -c 'exec mongorestore --drop --batchSize=1 --archive ' < "$TARGET/$backup" && printf "\n${GREEN}Tiedoston palautus onnistui!\n${RESETCOLOR}"

    restart_app

    break
  else
    printf "${RED}Palautuskansiota ${TARGET}/${backup} ei löytynyt${RESETCOLOR}\n\n"
  fi
done

echo "Paina ENTER poistuaksesi"
read _