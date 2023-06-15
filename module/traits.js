export const traits = {};

traits.armor = [
    {
        label: "Barulhenta",
        description: "Armas ou Armaduras com esse traço fazem barulho ao serem usadas. Você recebe Desvantagem em rolagens de Furtividade."
    },
    {
        label: "Discreta",
        description: "Armaduras com esse traço são maleáveis e podem ser ocultadas. Você consegue esconder que está com uma armadura usando roupas comuns sobre ela."
    },
    {
        label: "Fabricável",
        description: "Esse item pode ser fabricado usando a perícia Manufatura."
    },
    {
        label: "Restritivo",
        description: "Itens com esse traço são pesadas e restringem os movimentos dos usuários. Você recebe Desvantagem em rolagens de Atletismo. Você recebe -1 de penalidade na rua reação de Esquiva."
    }
]

traits.consumable = [
    {
        label: "Alquímico",
        description: "Esse item pode ser fabricado usando a perícia Alquimia."
    },
    {
        label: "Consumível",
        description: "Esse item é consumido permanentemente após ser usado uma vez."
    },
    {
        label: "Fabricável",
        description: "Esse item pode ser fabricado usando a perícia Manufatura."
    },
    {
        label: "Alcance (Médio)",
        description: "Esse item pode ser arressado em até Alcance (Médio). Quando você ataca um alvo em Alcance Fechado, enquanto está montado ou conduzindo um veículo e estiver usando uma arma com o traço Alcance você sofre Desvantagem na rolagem."
    },
    {
        label: "Área (Explosão)",
        description: "Esse item causa Dano de Fragmentação em todos os alvos disponiveis na zona de impacto."
    },
    {
        label: "Área (Zona)",
        description: "Esse item aplica seu efeito completo em todos os alvos disponiveis na zona de impacto."
    },
    {
        label: "Fabricável",
        description: "Esse item pode ser fabricado usando a perícia Manufatura."
    }
]

traits.shield = [
    {
        label: "Ágil",
        description: "Armas ágeis permitem escolher entre Corpo ou Destreza quando causa Dano."
    },
    {
        label: "Restritivo",
        description: "Itens com esse traço são pesados e restringem os movimentos dos usuários. Você recebe Desvantagem em rolagens de Atletismo. Você recebe -1 de penalidade na rua reação de Esquiva."
    }
]

traits.weapon = [
    {
        label: "Ágil",
        description: "Armas ágeis permitem escolher entre Corpo ou Destreza quando causa Dano."
    },
    {
        label: "Alcance (Longo)",
        description: "Esse item pode ser arressado em até Alcance (Longo). Quando você ataca um alvo em Alcance Fechado, enquanto está montado ou conduzindo um veículo e estiver usando uma arma com o traço Alcance você sofre Desvantagem na rolagem."
    },
    {
        label: "Alcance (Médio)",
        description: "Esse item pode ser arressado em até Alcance (Médio). Quando você ataca um alvo em Alcance Fechado, enquanto está montado ou conduzindo um veículo e estiver usando uma arma com o traço Alcance você sofre Desvantagem na rolagem."
    },
    {
        label: "Arco",
        description: "Armas com esse traço são longas e resistentes, elas permitem ao seu portador desferir golpes amplos e perigosos que atingem vários inimigos ao mesmo tempo. Quando ataca com uma arma com esse traço você pode atingir até dois alvos dentro da mesma Zona. Faça uma única rolagem e use o mesmo resultado para ambos os alvos."
    },
    {
        label: "Arremessável",
        description: "Armas arremessáveis são balanceadas e podem ser arremessadas em Alcance Médio."
    },
    {
        label: "Barulhenta",
        description: "Armas ou Armaduras com esse traço fazem barulho ao serem usadas. Quando ataca com uma arma com esse traço todos os personagens na Cena podem fazer um teste Prontidão contra DIF 9 para perceber sua localização."
    },
    {
        label: "Brutal",
        description: "Armas brutais causam +1d6 de dano (do mesmo tipo do dano original) quando você consegue um Sucesso Ressonante em uma ação de Atacar."
    },
    {
        label: "Combo",
        description: "Armas de combo são eficientes para ataques em sequência. Quando um mesmo alvo é atacado em sequência ele tem uma penalidade adicional de -1 em suas Reações de Defesa contra todos os ataques após o primeiro."
    },
    {
        label: "Cortante",
        description: "Armas cortantes causam dano do tipo Corte. Um Sucesso Ressoante em uma ação de Atacar causa a condição Sangramento no alvo."
    },
    {
        label: "Defensiva",
        description: "Armas defensivas são balanceadas para se defender. Em caso de empate em uma Disputa de Ataque você ganha se empunhar uma arma defensiva. Os traços Defensiva e Precisa se anulam."
    },
    {
        label: "Duas Mãos",
        description: "Armas com esse traço usam as duas mãos para serem empunhadas adequadamente em combate. Empunhar armas com esse traço usando somente uma mão reduz o dano causado à metade."
    },
    {
        label: "Empalar",
        description: "Armas empaladoras causam a condição Imovel quando você consegue um Sucesso Ressonante em uma ação de Atacar. Com uma ação de Interagir você pode puxar a arma empalada removendo a condição Imovel para causar o Dano da arma (esse dano não pode ser prevenido) na criatura empalada."
    },
    {
        label: "Empunhadura",
        description: "Armas com o traço empunhadura podem ser usadas com uma ou duas mãos. Quando usada com duas mãos aumente em +2 o dano causado."
    },
    {
        label: "Estilhaçadora",
        description: "Armas estilhaçadoras quebram armaduras e escudos. Cada golpe bem sucedido reduz a DU do escudo ou a RD da armadura em 1. Itens que tenham a DU ou RD reduzida a 0 são destruídos."
    },
    {
        label: "Impactante",
        description: "Armas impactantes causam dano do tipo Impacto. Um Sucesso Ressoante em uma ação de Atacar causa a condição Desbalanceado no alvo."
    },
    {
        label: "Longa",
        description: "Armas longas possuem uma haste como lanças ou uma extensão como chicotes. Esse traço aumenta o alcance natural da arma para Alcance Curto."
    },
    {
        label: "Munição",
        description: "Armas com esse traço precisam de munição para atacar. A primeira vez que você usar uma arma com esse traço durante uma cena, gaste 1 Munição. Durante o resto da cena você pode continuar usando ela normalmente sem gastos adicionais."
    },
    {
        label: "Perfurante",
        description: "Armas perfurantes causam dano do tipo Perfuração. Quando usa a ação Atacar você consegue um Sucesso Ressonante com um Resultado 4 pontos acima da Dificuldade ao invés de 5."
    },
    {
        label: "Pesada",
        description: "Armas pesadas são mais difíceis de se defender. Usar uma reação de Defender contra uma arma pesada tem um redutor adicional de -1."
    },
    {
        label: "Precisa",
        description: "Armas precisas são mais dificies de se defender. Em caso de empate em uma Disputa de Ataque você ganha se empunhar uma arma precisa. Os traços Defensiva e Precisa se anulam."
    },
    {
        label: "Recarga (Lenta)",
        description: "Armas com o traço recarga precisam ser recarregadas após uma ação de Atacar. Carregar uma arma com esse traço custa uma ação padrão."
    },
    {
        label: "Recarga (Rápida)",
        description: "Armas com o traço recarga precisam ser recarregadas após uma ação de Atacar. Carregar uma arma com esse traço custa uma ação simples."
    },
    {
        label: "Tambor",
        description: "O tambor de sua arma tem espaço para seis balas, você só precisa recarregar após esvaziar esse tambor, essa recarga leva duas Ações Padrão."
    },
    {
        label: "Versátil",
        description: "Armas com esse traço são otimizadas para realizar manobras de combate. Você recebe Vantagem quando usa a Ação Manobras."
    }
]

export default traits;