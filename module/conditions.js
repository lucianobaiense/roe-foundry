export let conditions = {};

conditions = [
    {
        label: "Agouro",
        description: "<p>Enquanto sob o efeito de <strong>Agouro</strong> você recebe <strong>Desvantagem</strong> em todas as suas Rolagens.</p>",
        type: "afflictions"
    },
    {
        label: "Amaldiçoado",
        description: "<p>Você só recupera metade dos <strong>PV</strong> ou <strong>PE</strong> através de meios mágicos, seja através de habilidades ou consumíveis com o traço <strong>[ Alquímico ]</strong>.</p>",
        type: "afflictions"
    },
    {
        label: "Atordoado",
        description: "<p>Você perde todas as suas <strong>Ações Padrões</strong>, só podendo realizar <strong>Ações Simples</strong> ou <strong>Ações Rápidas</strong>. Além disso, caso você esteja co, alguma habilidade com <strong>[ Sustentavel ]</strong> ativada ela é cancelada.</</p>",
        type: "afflictions"
    },
    {
        label: "Bravura",
        description: "<p>Você recebe <strong>Vantagem</strong> em Testes de <strong>Defesa Mental</strong>.</p>",
        type: "enlargements"
    },
    {
        label: "Caído",
        description: "<p>Você está no chão e por isso seu movimento é reduzido, mude sua <strong>Velocidade</strong> para Lenta. Além disso, recebe <strong>Desvantagem</strong> na ação <strong>Ataque</strong> quando usando armas sem <strong>[ Alcance ]</strong>, receba <strong>Desvantagem</strong> também em <strong>Ações Rápidas</strong>. Se levantar custa uma <strong>Ação Simples</strong>.</p>",
        type: "afflictions"
    },
    {
        label: "Cegueira",
        description: "<p>Você sofre <strong>Desvantagem</strong> em todas as rolagens que fizer.</p>",
        type: "afflictions"
    },
    {
        label: "Congelado",
        description: `<p>Essa condição possui níveis. Para cada nível você sofre um tipo de efeito:</p>
            <ul>
                <li><strong>Congelado 1:</strong> Você perde uma Ação Simples em todos os seus turnos.</li>
                <li><strong>Congelado 2:</strong> Você perde uma Ação Padrão em todos os seus turnos.</li>
                <li><strong>Congelado 3:</strong> Você perde seu turno por completo.</li>
            </ul>`,
        type: "afflictions"
    },
    {
        label: "Corrompido",
        description: `<p>Essa condição possui níveis. Para cada nível dessa condição você sofre um efeito:</p>
            <ul>
                <li><strong>Corrompido 1:</strong> Sempre que for rolar dados para ver as consequências de um Surto Abissal role novamente qualquer resultado 1. Esse efeito dura por um número de dias igual ao seu valor de Essência.</li>
                <li><strong>Corrompido 2:</strong> Sempre que for rolar dados para ver as consequências de um Surto Abissal role novamente qualquer resultado 2. Esse efeito é permanente e não pode ser removido.</li>
            </ul>`,
        type: "afflictions"
    },
    {
        label: "Cristalizado",
        description: "<p>Nesse estado você não pode agir nem sentir nada. Você mantém os <strong>PV</strong> que tinha no momento da cristalização e recebe <strong>RDF</strong> e <strong>RMD</strong> 20 contra todos os tipos de dano. Se seu cristal for destruído, você morre imediatamente.</p>",
        type: "afflictions"
    },
    {
        label: "Desarmonia",
        description: "<p>Essa condição possui níveis. No início do seu turno você perde <strong>1 PE</strong> para cada nível dessa condição.</p>",
        type: "afflictions"
    },
    {
        label: "Desbalanceado",
        description: "<p>Você recebe uma penalidade de <strong>-1</strong> em qualquer rolagem.</p>",
        type: "afflictions"
    },
    {
        label: "Desprevenido",
        description: "<p>Você sofre <strong>Desvantagem</strong> ao usar Ações Rápidas.</p>",
        type: "afflictions"
    },
    {
        label: "Doente",
        description: "<p>Você está doente, aplique os efeitos relacionados com a doença em questão. Ver lista de doenças na página X.</p>",
        type: "afflictions"
    },
    {
        label: "Eletrocutado",
        description: "<p>Você age sempre por último durante a sua fase de agir. Se houver mais criaturas com essa condição do seu lado decidam quem age primeiro.</p>",
        type: "afflictions"
    },
    {
        label: "Encantado",
        description: `<p>Quando sob o efeito dessa condição você sofre alguns efeitos:</p>
            <ul>
                <li><strong>Proibição de Agressão:</strong> Você não pode ferir, prejudicar ou causar qualquer mal à criatura que o encantou. Além disso, sempre tentará ajudá-la da melhor forma possível.</li>
                <li><strong>Movimento Obrigatório:</strong> Você sempre se move em direção à criatura que o encantou, você quer ficar ao seu lado e sempre usará o caminho mais direto disponível para alcançá-la.</li>
                <li><strong>Proteção Contra Perigo:</strong> Se o trajeto levar a um perigo iminente (como fogo ou um penhasco), você tem direito a um segundo teste de Defesa. Se for bem-sucedido, o efeito do encantamento se encerra antes de você entrar na área perigosa.</li>
                <li><strong>Limitação de Ações:</strong> Enquanto estiver encantado, você não pode realizar nenhuma ação ofensiva. A única exceção é a possibilidade de se defender caso seja atacado.</li>
            </ul>`,
        type: "afflictions"
    },
    {
        label: "Enfraquecido (Atributo)",
        description: "<p>Essa condição possui níveis. O Atributo informado recebe uma penalidade igual ao nível da condição.</p>",
        type: "afflictions"
    },
    {
        label: "Enjoado",
        description: "<p>Enquanto estiver sob essa condição você não consegue ingerir alimentos e ou itens consumíveis.<p>",
        type: "afflictions"
    },
    {
        label: "Envenenado",
        description: `<p>Essa condição possui níveis e seus efeitos são cumulativos. O dano causado por essa condição só pode ser prevenido por fontes de RD que são específicas contra danos de natureza.<p>
            <ul>
                <li><strong>Envenenado 1:</strong> No início de cada um dos seus turnos você recebe <strong>1d6 de dano (Natureza)</strong>.</li>
                <li><strong>Envenenado 2:</strong> Você recebe <strong>1d6 de dano (Natureza)</strong> sempre que usa ações que possuem o traço <strong>[ Movimento ]</strong>.</li>
                <li><strong>Envenenado 3:</strong> Você recebe <strong>1d6 de dano (Natureza)</strong> sempre que usa ações que possuem o traço <strong>[ Ataque ]</strong>.</li>
            <ul>`,
        type: "afflictions"
    },
    {
        label: "Fatigado",
        description: "<p>Essa condição possui níveis. A cada dois níveis de Fatigado, o personagem sofre uma <strong>penalidade de -1</strong> em todas as rolagens. Se o número de níveis de <strong>Fatigado</strong> ultrapassar o <strong>Nível</strong> de Personagem, ele desmaia. Para recuperar-se, é necessário realizar um <strong>Descanso Completo</strong>, que remove todos os níveis dessa condição.</p>",
        type: "afflictions"
    },
    {
        label: "Fratura",
        description: "<p>Qualquer Habilidade ou Ação derivada da parte fraturada deixa de funcionar. Para se recuperar dessa condição você deve realizar um <strong>Descanso Completo</strong> sem estar com as condições <strong>Machucado</strong> ou <strong>Ferido</strong>.</p>",
        type: "afflictions"
    },
    {
        label: "Ferido",
        description: "<p>Essa condição possui níveis. Quando estiver ferido você sofre <strong>Desvantagem</strong> em todas as rolagens. A cada vez que seus <strong>Pontos de Vida (PV)</strong> chegam a 0, você acumula um nível de <strong>Ferido</strong>. Se o número de níveis de <strong>Ferido</strong> exceder seu <strong>Corpo</strong>, você morre automaticamente. Para remover os níveis de <strong>Ferido</strong>, é necessário realizar um <strong>Descanso Completo.</strong></p>",
        type: "afflictions"
    },
    {
        label: "Fortalecido (Atributo)",
        description: "<p>Essa condição possui níveis. O Atributo informado recebe um bônus igual ao nível da condição.</p>",
        type: "enlargements"
    },
    {
        label: "Fortuna",
        description: "<p>Enquanto sob o efeito de <strong>Fortuna</strong> você recebe <strong>Vantagem</strong> em todas as suas Rolagens.</p>",
        type: "enlargements"
    },
    {
        label: "Furtivo",
        description: "<p>Você recebe <strong>Vantagem</strong> em suas rolagens e não pode ser escolhido como alvo de ações. Quando você realiza alguma ação você perde essa condição.</p>",
        type: "enlargements"
    },
    {
        label: "Harmonia",
        description: "<p>Essa condição possui níveis. No início do seu turno você recupera <strong>1 PE</strong> para cada nível dessa condição.</p>",
        type: "enlargements"
    },
    {
        label: "Imóvel",
        description: "<p>Você não pode usar a ação <strong>Movimento</strong> ou habilidades que possuam o traço <strong>[ Movimento ]</strong>.</p>",
        type: "afflictions"
    },
    {
        label: "Inconsciente",
        description: "<p>Se você estiver de pé quando receber essa condição, cairá no chão, sofrendo também os efeitos da condição <strong>Caído</strong>. Enquanto <strong>Inconsciente</strong> você também sofre os efeitos da condição <strong>Indefeso</strong>, mas se receber qualquer ferimento acorda na mesma rodada.</p>",
        type: "afflictions"
    },
    {
        label: "Indefeso",
        description: "<p>Você não pode usar nenhuma <strong>Ação Rápida</strong>.</p>",
        type: "afflictions"
    },
    {
        label: "Lento",
        description: `<p>Essa condição possui níveis e seus efeitos são cumulativos.</p>
            <ul>
                <li><strong>Lento 1:</strong> A opção Engajar da ação Movimento agora gasta uma ação padrão ao invés de simples.</li>
                <li><strong>Lento 2:</strong> A opção Mover da ação Movimento agora passa a gastar duas ações padrões ao invés de somente uma.</li>
            <ul>`,
        type: "afflictions"
    },
    {
        label: "Machucado",
        description: "<p>Quando seus <strong>PV</strong> atuais estão abaixo da metade do seu total de <strong>PV</strong> você sofre a condição <strong>Machucado</strong>.</p>",
        type: "afflictions"
    },
    {
        label: "Obscurecido",
        description: "<p>Você recebe <strong>Desvantagem</strong> em rolagens relacionadas com a visão.</p>",
        type: "afflictions"
    },
    {
        label: "Quebrado",
        description: "<p>Um item com essa condição deixa de funcionar. Se um item já estiver com essa condição e for receber ela novamente ele é destruído.</p>",
        type: "afflictions"
    },
    {
        label: "Regeneração",
        description: "<p>No início de cada um dos seus turnos você recupera seu valor de <strong>Nível + Essência</strong> em <strong>PV</strong>.</p>",
        type: "enlargements"
    },
    {
        label: "Saudável",
        description: "<p>Você recebe <strong>Vantagem</strong> em Testes de <strong>Defesa Física</strong> para resistir a habilidades.</p>",
        type: "enlargements"
    },
    {
        label: "Sangramento",
        description: "<p>Essa condição possui níveis. No início do seu turno, você sofre dano igual ao seu nível de <strong>Sangramento</strong>.</p>",
        type: "afflictions"
    },
    {
        label: "Silenciado",
        description: "<p>Você não pode usar habilidades com o traço <strong>[ Sortilégio ]</strong> e também não pode realizar ações que requeiram fala.</p>",
        type: "afflictions"
    },
    {
        label: "Surdo",
        description: "<p>Você recebe <strong>Desvantagem</strong> para usar ações que requeiram audição.</p>",
        type: "afflictions"
    },
    {
        label: "Trauma",
        description: "<p>Escolha um dos seus <strong>Impulsos</strong> para desativar. O Cronista definirá o trauma e a forma de superá-lo.</p>",
        type: "afflictions"
    },
    {
        label: "Veloz",
        description: "<p>Você recebe <strong>Vantagem</strong> em Testes de <strong>Defesa Ágil</strong>.</p>",
        type: "enlargements"
    },
    {
        label: "Vigoroso",
        description: "<p>Você recebe <strong>Vantagem</strong> em Testes de <strong>Defesa Física</strong>.</p>",
        type: "enlargements"
    }      
]

export default conditions;