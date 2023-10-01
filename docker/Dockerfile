FROM node:20-bookworm-slim

ARG FOUNDRY_VERSION=11.309

ENV FOUNDRY_ZIP="FoundryVTT-${FOUNDRY_VERSION}.zip"

RUN apt update && \
    apt install -y --no-install-recommends unzip && \
    rm -fr /var/lib/apt/lists/*

RUN --mount=target=/project \
    cd /project && \
    unzip ${FOUNDRY_ZIP} -d /FoundryVTT && \
    cd /FoundryVTT/resources/app && \
    npm install

VOLUME ["/foundry-data"]
EXPOSE 30000/TCP

WORKDIR /FoundryVTT/resources/app

CMD ["node", "main.js", "--dataPath=/foundry-data"]
