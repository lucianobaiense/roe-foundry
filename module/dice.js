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
    let roll = {}
    let narrativePoints = actor.system.narrativePoints.value
    let flavor = ""

    if (skillRollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (skillRollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    roll = {
        name, actor, skillAttribute, skillTraining, skillModifier, skillRollModifier, narrativePoints
    }

    const template = `systems/roe/templates/chat/skill-item.hbs`

    ChatMessage.create({
        content: await renderTemplate(template, roll),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
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
    let power = actor.system.power
    let narrativePoints = actor.system.narrativePoints.value

    let flavor = ""

    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    roll = {
        name, actor, rollModifier, hit, damage, damageCritical, img, power, narrativePoints, traits
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
    item.actorType = actor.type
    item.power = actor.system.power
    item.narrativePoints = actor.system.narrativePoints.value

    const template = `systems/roe/templates/chat/${type}-item.hbs`
    
    ChatMessage.create({
        content: await renderTemplate(template, item),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    });
}