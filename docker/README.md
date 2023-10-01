# Docker FoundryVTT

Simples imagem docker contendo o necessário para rodar o FoundryVTT, atualmente com suporte apenas para ambiente linux.

Para executar o build da img é necessário ter o zip do Foundry (Exp: FoundryVTT-11.309.zip) na raiz desse projeto e a versão corretamente definida no arquivo [Dockerfile](./Dockerfile).

Para rodar, basta executar o script [start-docker.sh](./start-docker.sh), ele vai criar a img docker caso nao encontre.

## TODO
[] - Atualmente é necessário ter o zip/exe do Foundry, oq é um problema quando tem um novo update.
[] - Criar um dockerfile para windows.
[] - Fazer o Foundry ja carregar o system desse repositório caso a pasta foundry-data nao exista, talvez sempre atualizar o conteúdo em todo start.