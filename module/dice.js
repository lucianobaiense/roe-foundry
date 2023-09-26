export async function AttributeRoll({
    name = null, 
    actor= null, 
    attribute = null, 
    attributeModifier = null
} = {}) {
    let rollString = ""

    if(actor.type == "antagonist") {
        rollString = `2d6 + ${attribute} + ${attributeModifier} + ${actor.system.power}`
    } else {
        rollString = `2d6 + ${attribute} + ${attributeModifier}`
    }
    
    const roll = await new Roll(rollString).evaluate({"async": true});

    roll.toMessage({
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: `Rolou ${name}`
    });    
}

export async function SkillRoll({
    name = null, 
    actor = null, 
    skillAttribute = null, 
    skillTraining = null, 
    skillModifier = null,
    skillRollModifier = null
} = {}) {
    let rollString = ''

    if (skillRollModifier == 'advantage') {
        rollString = `3d6kh2 + ${skillAttribute} + ${skillTraining} + ${skillModifier}`

    } else if (skillRollModifier == 'disadvantage') {
        rollString = `3d6kl2 + ${skillAttribute} + ${skillTraining} + ${skillModifier}`
    } else {
        rollString = `2d6 + ${skillAttribute} + ${skillTraining} + ${skillModifier}`
    }

    const roll = await new Roll(rollString).evaluate({"async": true});

    roll.toMessage({
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: `Rolou ${name}`
    });
}

export async function ActionRoll({
    name = null, 
    actor = null, 
    type = null,
    item = null,
    rollModifier = null
} = {}) {
    let roll = {}
    let hit = item.system.hit
    let damage = item.system.damage
    let damageCritical = item.system.damageCritical
    let img = item.img
    let traits = item.system.traits

    if (actor.type == "antagonist") {
        const power = Number(actor.system.power)
        
        hit = hit + power
        damage = `[[${damage} + ${power}]]`
        damageCritical = `[[${damageCritical} + ${power*2}]]`
    }

    let flavor = ""

    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    roll = {
        name, actor, rollModifier, hit, damage, damageCritical, img, traits
    }

    const template = `systems/roe/templates/chat/${type}-item.hbs`

    ChatMessage.create({
        content: await renderTemplate(template, roll),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    });
}

export async function ItemRoll({
    name = null, 
    actor = null, 
    item = null,
    rollModifier = null,
    type = null
} = {}) {

    let flavor = ""

    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    } 

    let difficulty = 0

    if (item.system.cost == '1') {
        difficulty = 6
    } else if (item.system.cost == '2') {
        difficulty = 9
    } else if (item.system.cost == '3') {
        difficulty = 12
    } else if (item.system.cost == '4') {
        difficulty = 15
    } else if (item.system.cost == '5') {
        difficulty = 18
    } else {
        difficulty = 21
    } 

    item.rollModifier = rollModifier
    item.difficulty = difficulty

    const template = `systems/roe/templates/chat/${type}-item.hbs`
    
    ChatMessage.create({
        content: await renderTemplate(template, item),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    });
}