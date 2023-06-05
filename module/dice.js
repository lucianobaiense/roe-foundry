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
    skillModifier = null
} = {}) {
    const rollString = `2d6 + ${skillAttribute} + ${skillTraining} + ${skillModifier}`
    const roll = await new Roll(rollString).evaluate({"async": true});

    roll.toMessage({
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: `Rolou ${name}`
    });
}

export async function ActionRoll({
    name = null, 
    actor = null, 
    hit = null, 
    damage = null, 
    damageCritical = null,
    traits = null,
    type = null
} = {}) {
    let roll = {}

    if(actor.type == "antagonist") {
        const power = Number(actor.system.power)
        
        hit = Number(hit) + power
        damage = Number(damage) + power
        damageCritical = Number(damageCritical) + (power*2)

        roll = {
            name, actor, hit, damage, damageCritical, traits
        }
    } else {
        roll = {
            name, actor, hit, damage, damageCritical, traits
        }
    }

    const template = `systems/roe/templates/chat/${type}-item.hbs`

    const a = ChatMessage.create({
        content: await renderTemplate(template, roll),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: `Rolou ${name}`,
    });
}

export async function ItemRoll({
    name = null, 
    actor = null, 
    item = null,
    type = null 
} = {}) {
    const template = `systems/roe/templates/chat/${type}-item.hbs`
    ChatMessage.create({
        content: await renderTemplate(template, item),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: `Rolou ${name}`
    });
}