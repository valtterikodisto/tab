#!/bin/bash

# This script is should be used only if you start your applicaton with docker-compose

NAME=`date +%d%m%y`
TARGET="/media/$USER/TAB"
GREEN='\033[0;32m'
RESETCOLOR="\033[0m"

mkdir $TARGET/backup/
mkdir $TARGET/backup-csv/

# Start the application if not running
IS_RUNNING=$(docker inspect -f '{{.State.Running}}' tab-db)
if [ $IS_RUNNING != "true" ]; then
  #docker-compose -f /opt/tab/docker-compose.yml up -d
  docker-compose -f /home/valtteri/Courses/fullstack/tab/docker-compose.yml up -d
fi

# Backup database
cd $TARGET/backup/ && docker exec tab-db sh -c 'exec mongodump --db=tab --archive' > "${NAME}.archive" && printf "\n\n${GREEN}Tietokanta varmuuskopioitu!\n${RESETCOLOR}"

mkdir $TARGET/backup-csv/$NAME/

# Export customers to CSV
cd $TARGET/backup-csv/$NAME/ && docker exec tab-db sh -c 'exec mongoexport --type=csv --db tab --collection customers --fields firstname,lastname,organization,balance' > customers.csv && printf "${GREEN}Asiakkaat tallennettu CSV-tiedostoon!\n${RESETCOLOR}"

# Export organizations to CSV
docker exec tab-db sh -c 'exec mongoexport --type=csv --db tab --collection organizations --fields name,_id,maxTab' > organizations.csv && printf "${GREEN}Järjestöt tallennettu CSV-tiedostoon!\n\n${RESETCOLOR}"

echo "Paina ENTER poistuaksesi"
read _