# roe-foundry
Resonance of Ether for Foundry VTT

## Rodando Localmente

Para rodar o foundry locamente navegue até o diretorio na qual o programa foi instalado e execute com o dataPath do seu foundry

```bash
    cd /Applications/Foundry Virtual Tabletop.app/Contents/Resources/app
    node main.js --dataPath=$HOME/foundrydata
```

## Atualizando o CSS com Tailwind

Execute o comando abaixo para o Tailwind compilar e gerar o bundle de css

```bash
    npx tailwindcss -i ./tailwind.css -o ./roe.css --watch
```