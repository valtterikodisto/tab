#!/bin/bash

TARGET="/media/$USER/TAB/backup"
RED='\033[0;31m'
GREEN='\033[0;32m'
RESETCOLOR="\033[0m"

# Start the application if not running
IS_RUNNING=$(docker inspect -f '{{.State.Running}}' tab-db)
if [ "$IS_RUNNING" != "true" ]; then
  #docker-compose -f /opt/tab/docker-compose.yml up -d
  docker-compose -f /home/valtteri/Courses/fullstack/tab/docker-compose.yml up -d
fi

while :
do
  echo "Anna palautustiedoston nimi (esim. 111219.archive):"
  read backup

  # Check if backup exists
  if [ -f "$TARGET/$backup" ]; then
    docker exec -i tab-db sh -c 'exec mongorestore --drop --batchSize=1 --archive ' < "$TARGET/$backup" && printf "\n${GREEN}Tiedoston palautus onnistui!\n${RESETCOLOR}"

    # Restart
    docker-compose -f /home/valtteri/Courses/fullstack/tab/docker-compose.yml down
    docker-compose -f /home/valtteri/Courses/fullstack/tab/docker-compose.yml up -d
    break
  else
    printf "${RED}Palautuskansiota ${TARGET}/${backup} ei löytynyt${RESETCOLOR}\n\n"
  fi
done

echo "Paina ENTER poistuaksesi"
read _