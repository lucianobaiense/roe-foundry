#!/bin/bash

set -eu

HERE="$(dirname $(realpath $0))"

IMG_NAME="foundryvtt-roe"
BUILD_SCRIPT_PATH="${HERE}/build-docker.sh"

SUDO_CMD=""
if ! groups | grep -qw "docker" && [ $EUID -ne 0 ]; then
  echo "INFO: Usuario nao é root ou nao possui o grupo docker, rodando comandos como 'sudo'."
  SUDO_CMD="sudo"
fi

if ! $SUDO_CMD docker images | grep -wq $IMG_NAME; then
  echo "INFO: Imagem docker '${IMG_NAME}' não encontrada, executando script build..."
  $SUDO_CMD $BUILD_SCRIPT_PATH
fi

cd "$HERE/.."
FOUNDRY_DATA_PATH="$(pwd)/foundry-data"
if [ ! -d "${FOUNDRY_DATA_PATH}" ]; then
  mkdir "${FOUNDRY_DATA_PATH}"
fi

echo "INFO: Executando docker com foundry-data = '${FOUNDRY_DATA_PATH}'"

exec $SUDO_CMD docker run --rm \
  -v ${FOUNDRY_DATA_PATH}:/foundry-data \
  -p 30000:30000 \
  --name foundryvtt-roe \
  foundryvtt-roe &

sleep 2
xdg-open 'http://localhost:30000' || echo "INFO: Abra o endereço 'http://localhost:30000' no navegador"

wait
