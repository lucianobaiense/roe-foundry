export const traits = {};

traits.ability = [
    {
        label: "Condição Positiva",
        description: "Você só pode manter ativo um efeito com esse traço por vez. Se você receber outro efeito que aplique esse traço, deve escolher qual deles vai ficar ativo."
    },
    {
        label: "Fatigante",
        description: "Esse traço indica que o efeito da habilidade em questões só pode acontecer uma vez por rodada."
    },
    {
        label: "Preparação",
        description: "Habilidades com esse traço só podem ser ativadas no início de uma cena de ação antes da primeira rodada. Somente uma habilidade com esse traço pode ser ativada por vez pelo mesmo personagem."
    }
]

traits.antagonist = [
    {
        label: "Absorção de Dano",
        description: "O antagonista absorve dano de um certo tipo. Escolha um tipo de dano na qual já possua Resistência ou Imunidade, agora você absorve qualquer dano causado daquele tipo em PV."
    },
    {
        label: "Ação Única",
        description: "O antagonista possui uma ação exclusiva, que só ele consegue realizar. Toda Ação Única deve gastar PE. Não existe um modelo padrão de Ação Única, esse traço serve para modelar detalhes que os outros traços não cobrem, como por exemplo: O Antagonista pode chamar reforços."
    },
    {
        label: "Alado",
        description: "O antagonista possui asas. Possui movimento Aéreo."
    },
    {
        label: "Alfa",
        description: "O antagonista é o líder do bando, matilha e etc. Esse antagonista se destaca dos demais, qualquer criatura que esteja na mesma Zona que o Alfa recebe Vantagem para realizar ações com o traço [ Ataque ]. Esse efeito só acontece para Antagonistas que não sejam Alfas, normalmente só existe um Alfa por encontro."
    },
    {
        label: "Anfíbio",
        description: "O antagonista possui características de seres do mar. Possui movimento Aquático e pode enxergar e respirar debaixo da água."
    },
    {
        label: "Armadura Natural",
        description: "O antagonista possui a pele rígida como a de uma armadura. Possui Resistência a Dano igual ao valor de Poder do antagonista. Essa RD protege tanto de ataques físicos quanto mágicos."
    },
    {
        label: "Ataque Final",
        description: "O antagonista desfere um último ataque antes de morrer. Construtos que se autodestroem são um exemplo comum desse tipo de ação. Quando seu Antagonista chega a 0 PV ele imediatamente causa 1d6 pontos de dano (escolha o tipo entre as essências do antagonista) por valor de Poder que possua em todos na área, os personagens atingidos podem fazer um Teste de Esquiva (Parcial) contra DIF adequada para a Ameaça do antagonista."
    },
    {
        label: "Ataque Penetrante",
        description: "O antagonista consegue penetrar a proteção dos seus alvos. Escolha uma ação (que cause dano) que não tenha sido modificada por um traço, esse ataque ignora 1 de RD do alvo para cada nível de Poder do antagonista."
    },
    {
        label: "Aura Elemental",
        description: "O antagonista emana energia das essências. Escolha um tipo de dano dentre as essências do antagonista. No início do seu turno cause 1d6 pontos de dano (do tipo de dano escolhido) em todos dentro da zona do antagonista, os alvos podem fazer um teste de Esquiva (Parcial) contra a DIF adequada para ameaça do antagonista."
    },
    {
        label: "Aura Corrompida",
        description: "O antagonista emana a energia profana da corrupção. Personagens inconscientes que estejam na mesma Zona que um antagonista com esse traço sofrem Desvantagem em Testes de Morte. Se alguma criatura morrer dentro da área de efeito da Aura Corrompida ela se torna um Inferi."
    },
    {
        label: "Brutalidade",
        description: "O antagonista consegue provocar grandes ferimentos quando acerta em cheio um alvo. Escolha uma ação (que cause dano) que não tenha sido modificada por um traço, ela recebe o traço Brutal 1 para cada nível de Poder do antagonista. Esse traço pode ser adquirido várias vezes para ações ou habilidades diferentes."
    },
    {
        label: "Condição Negativa",
        description: "O antagonista consegue causar condições negativas nos seus alvos. Escolha uma ação (que cause dano) que não tenha sido modificada por um traço, ela passa a causar uma condição negativa, a DIF para resistir varia de acordo com a Ameaça do antagonista. Esse traço pode ser adquirido várias vezes para ações ou habilidades diferentes."
    },
    {
        label: "Dano Aprimorado",
        description: "O antagonista é extremamente competente em causar dano com uma determinada ação. Escolha uma ação (que cause dano) que não tenha sido modificada por um traço, aumente o dano causado em +1d6 por nível de Poder. Esse traço pode ser adquirido várias vezes para ações ou habilidades diferentes."
    },
    {
        label: "Defesa Aprimorada",
        description: "O antagonista é extremamente competente em se defender. Escolha entre Aparar, Bloquear ou Esquivar. O Antagonista dobra o seu nível de Poder quando usa a defesa escolhida. Você pode escolher esse traço múltiplas vezes, mas não para a mesma defesa."
    },
    {
        label: "Desequilíbrio Mágico",
        description: "O antagonista causa interferência nas forças mágicas de onde passa. Sempre que um sortilégio for ressoado na mesma zona que esse antagonista o conjurador sofre 1 ponto de dano para cada PE que gastou na conjuração, esse dano não pode ser evitado."
    },
    {
        label: "Drenar Ether",
        description: "O antagonista suga as forças mágicas de um alvo que tenha ferido. Escolha uma ação (que cause dano) que não tenha sido modificada por um traço, sempre que causar dano com ela você rouba 1 PE por nível de Poder. Esse traço pode ser adquirido várias vezes para ações ou habilidades diferentes."
    },
    {
        label: "Drenar Vida",
        description: "O antagonista suga as forças vitais de um alvo que tenha ferido. Escolha uma ação (que cause dano) que não tenha sido modificada por um traço, sempre que causa dano com ela recupera 1 PV por nível de Poder. Esse traço pode ser adquirido várias vezes para ações ou habilidades diferentes."
    },
    {
        label: "Elite",
        description: "O antagonista é mais poderoso que o comum. Possui dois turnos durante uma mesma rodada."
    },
    {
        label: "Equipamento",
        description: "O antagonista consegue usar itens. Você pode equipar Itens. A qualidade dos equipamentos do antagonista varia de acordo com seu nível de ameaça. Ameaça Baixa: Só possuem equipamentos comuns. Ameaça Moderada: Podem possuir 1 equipamento rúnico. Ameaça Perigosa: Podem possuir até 2 equipamentos rúnicos. Ameaça Extrema: Podem possuir até 3 equipamentos rúnicos. Ameaça Mortal: Podem possuir até 4 equipamentos rúnicos ou uma 1 relíquia."
    },
    {
        label: "Escalador",
        description: "O antagonista consegue cavar túneis. Possui Movimento Vertical."
    },
    {
        label: "Especialista",
        description: "O antagonista é um especialista em uma determinada perícia. Escolha uma perícia, o Antagonista dobra o seu nível de Poder quando usa ela. Você pode escolher esse traço múltiplas vezes, mas não para a mesma perícia."
    },
    {
        label: "Espinhos",
        description: "O antagonista possui o corpo revestido por poderosos espinhos. Sempre que sofrer dano de um Ataque Físico sem o traço Alcance causa de volta 1d6 de dano (perfuração) por nível de Poder de volta para o atacante."
    },
    {
        label: "Etéreo",
        description: "O antagonista não possui forma física. Pode atravessar barreiras físicas. Possui Movimento Aéreo. Recebe imunidade a dano físico. Recebe imunidade a condições físicas. Recebe vulnerabilidade contra todos os tipos de danos mágicos."
    },
    {
        label: "Ether Extra",
        description: "O antagonista possui uma grande energia mágica. Calcule os PE do antagonista como se ele fosse um categoria de ameaça acima. Antagonistas de Ameaça Mortal não podem adquirir esse traço."
    },
    {
        label: "Faro Aguçado",
        description: "O antagonista possui um faro fora do comum. Possui o sentido especial Faro Aguçado. "
    },
    {
        label: "Ferocidade",
        description: "O antagonista possui uma vontade sobrenatural que lhe permite lutar até o fim. Você permanece consciente e pode continuar lutando mesmo se seu total de pontos de vida chegar a 0. A criatura ainda está ferida e a cada rodada recebe uma falha automática em seu teste de morte, morrendo quando ultrapassar um número de falhas igual a ao seu Poder."
    },
    {
        label: "Força de Vontade",
        description: "O antagonista possui uma vontade sobrenatural que intensifica suas habilidades. Enquanto estiver com a condição Machucado, o Antagonista recebe algum bônus ou habilidade especial, como por exemplo: O tipo de dano causado é modificado, o dano causado ignora RD ou alguma ação recebe novos traços, como Área ou Explosivo."
    },
    {
        label: "Habilidade",
        description: "O antagonista possui uma habilidade especial. Escolha uma habilidade disponível para Protagonistas no Capítulo 3 - Guia dos Jogadores, essa habilidade não pode ser oriunda da seção de Heranças. Você não precisa respeitar pré-requisitos de perícia, mas ainda precisa respeitar um pré-requisito de possuir outra habilidade."
    },
    {
        label: "Imunidade a Condição",
        description: "O antagonista possui imunidade contra condições. Possui imunidade a dois efeitos de condições negativas à sua escolha."
    },
    {
        label: "Imunidade a Dano",
        description: "O antagonista possui imunidade contra tipos de dano específicos. Possui imunidade a um tipo de dano à sua escolha desde que não seja vulnerável a ele. Tenha cuidado ao tornar uma criatura imune a dano físico (Corte, Impacto ou Perfuração), pois é o tipo de dano mais comum durante os níveis iniciais."
    },
    {
        label: "Lacerar",
        description: "O antagonista consegue causar feridas profundas em seus alvos. Escolha uma ação (que cause dano) que não tenha sido modificada por um traço, ela recebe o traço Sangramento 1 para cada nível de Poder do antagonista. Esse traço pode ser adquirido várias vezes para ações ou habilidades diferentes."
    },
    {
        label: "Membros Extras",
        description: "O antagonista possui membros extras, como uma cauda, tentáculos, mais braços ou similares. Ele recebe Vantagem em rolagens quando usa a ação Ataque Especial e escolhe usar a opção Manobras (Agarrar). Também pode fazer uma ação simples adicional de Interagir por turno."
    },
    {
        label: "Mobilidade",
        description: "O antagonista consegue se movimentar com precisão em qualquer tipo de terreno. Não sofre penalidade por Terrenos Difíceis."
    },
    {
        label: "Monstruoso",
        description: "O antagonista é um tipo de monstro ou besta. Ele não consegue falar, usando somente urros e grunhidos. Isso impede que ele use habilidades que requerem fala ou sortilégios."
    },
    {
        label: "Percepção as Cegas",
        description: "O antagonista pode reagir mesmo quando cego. Possui o sentido especial Percepção às Cegas. "
    },
    {
        label: "Predador",
        description: "O antagonista pode rastrear alvos com precisão. Recebe Vantagem para rastrear alvos que estejam com condição Machucado ou Ferido."
    },
    {
        label: "Presença Aterrorizante",
        description: "O antagonista emana medo. Todas as criaturas que começam um turno dentro da mesma Zona que um antagonista com esse traço devem fazer um Teste de Vontade (Anula) contra a DIF adequada para a Ameaça do antagonista. Em caso de falha, sofre a condição Medo 1."
    },
    {
        label: "Regeneração",
        description: "O antagonista recupera sua energia vital sozinho. Recupera 1 PV para cada nível de Poder que possua no início do seu turno. Escolha um tipo de dano Mágico, a regeneração não funciona se o antagonista tiver recebido dano desse tipo durante a rodada. "
    },
    {
        label: "Resistência a Dano",
        description: "O antagonista possui resistência contra tipos específicos de dano. Recebe Resistência a dois tipos de dano à sua escolha. Se você escolher um tipo de dano que seu seja vulnerável, você não se tornará resistente a ele: em vez disso, simplesmente perderá a vulnerabilidade correspondente (somente vulnerabilidades adquiridas pela Espécie do Antagonista podem ser removidas desta forma)."
    },
    {
        label: "Sortilégio Inato",
        description: "O antagonista possui a capacidade de usar um sortilégio como se fosse uma habilidade natural. Escolha um sortilégio que face parte das essências do antagonista, ele pode usar ele como se fosse uma habilidade natural mantendo as mesmas estatísticas base do sortilégio original. Para sortilégios que precisam de teste de resistência, o Antagonista faz um Ataque Mágico para acertar e para os que não precisam basta gastar o valor em PE do sortilégio original para ativar. Você não pode usar os Encantos Rúnicos de um sortilégio que esteja sendo usado como Sortilégio Inato. Um sortilégio que esteja sendo usado como Sortilégio Inato não causa corrupção e nem surtos abissais."
    },
    {
        label: "Túnel",
        description: "O antagonista pode cavar túneis. Possui Movimento Túnel."
    },
    {
        label: "Vida Extra",
        description: "O antagonista pode tolerar muito mais dano. Calcule os PV do antagonista como se ele fosse um categoria de ameaça acima. Antagonistas de Ameaça Mortal não podem adquirir esse traço."
    },
    {
        label: "Vínculo Elemental",
        description: "O antagonista consegue vincular sua essência a de outra criatura. Com um ação padrão o antagonista pode forçar um alvo em alcance médio a fazer um disputa de Ressonância, se o antagonista vencer ele passa a compartilhar a dor com o alvo, que sofre sempre metade do dano que o antagonista sofrer."
    },
    {
        label: "Visão no Escuro",
        description: "O antagonista pode enxergar na escuridão total. Para escolher esse traço é preciso ter aprendido Visão na Penumbra. Possui Visão no Escuro."
    },
    {
        label: "Visão na Penumbra",
        description: "O antagonista pode enxergar em ambientes escuros. Possui o sentido especial Visão na Penumbra."
    },
    {
        label: "Velocidade Aprimorada",
        description: "O antagonista tem uma velocidade acima do normal. Possui Velocidade Rápida."
    },
    {
        label: "Vulnerabilidade",
        description: "O antagonista tem fraqueza contra certos tipos de dano. Recebe Vulnerabilidade a um tipo de dano à sua escolha. Esse traço não conta no limite de traços que um antagonista pode possuir, ao invés disso ele permite que você escolha um traço adicional para cada vulnerabilidade que o antagonista possuir."
    }
]

traits.armor = [
    {
        label: "Barulhenta",
        description: "Armaduras com esse traço fazem barulho ao serem usadas. Você recebe Desvantagem em rolagens de Furtividade."
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
        label: "Barulhenta",
        description: "Quando usa itens com esse traço todos os personagens na Cena podem fazer um teste Prontidão contra DIF 9 para perceber sua localização."
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
        label: "Cobertura",
        description: "Com uma ação de Interação você se coloca em Cobertura Menor."
    },
    {
        label: "Restritivo",
        description: "Itens com esse traço são pesados e restringem os movimentos dos usuários. Você recebe Desvantagem em rolagens de Atletismo. Você recebe -1 de penalidade na rua reação de Esquiva."
    }
]

traits.spell = [
    {
        label: "Ataque",
        description: "Sortilégios que causam dano."
    },
    {
        label: "Condição Positiva",
        description: "Você só pode manter ativo um efeito com esse traço por vez. Se você receber outro efeito que aplique esse traço, deve escolher qual deles vai ficar ativo."
    },
    {
        label: "Cura",
        description: "Sortilégios que recuperam pontos de vida."
    },
    {
        label: "Invocação",
        description: "Sortilégios que invocam criaturas."
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
        description: "Armas com esse traço fazem barulho ao serem usadas. Quando ataca com uma arma com esse traço todos os personagens na Cena podem fazer um teste Prontidão contra DIF 9 para perceber sua localização."
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