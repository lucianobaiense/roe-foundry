#!/bin/bash

set -eu

HERE="$(dirname $(realpath $0))"
cd "$HERE/.."

SUDO_CMD=""
if ! groups | grep -qw "docker" && [ $EUID -ne 0 ]; then
  echo "INFO: Usuario nao é root ou nao possui o grupo docker, rodando comandos como 'sudo'."
  SUDO_CMD="sudo"
fi

$SUDO_CMD docker build -t foundryvtt-roe -f docker/Dockerfile .