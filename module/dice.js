export async function CareerRoll({
    name = null, 
    actor= null, 
    attribute = null, 
    attributeModifier = null,
    career = null
} = {}) {
    let rollModifier = actor.system.rollModifier
    let flavor = ""

    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    let roll = {
        name, actor, attribute, attributeModifier, career, rollModifier
    }
    
    const template = `systems/roe/templates/chat/career-chat.hbs`

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
} = {}) {
    let roll = {}
    let rollModifier = actor.system.rollModifier
    let hit = item.system.hit
    let damage = item.system.damage
    let damageCritical = item.system.damageCritical
    let damageType = item.system.damageType
    let damageTypeCritical = item.system.damageTypeCritical
    let actionFlavor = item.system.flavor
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
        name, actor, rollModifier, hit, damage, damageCritical, damageType, damageTypeCritical, actionFlavor, img, power, narrativePoints, traits
    }

    const template = `systems/roe/templates/chat/action-chat.hbs`

    ChatMessage.create({
        content: await renderTemplate(template, roll),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    });
}

export async function ActionBasicRoll({
    name = null, 
    actor= null, 
    attribute = null, 
    attributeModifier = null,
    career = null
} = {}) {
    let rollModifier = actor.system.rollModifier
    let flavor = ""

    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    let power = 0

    if (actor.type == "antagonist") {
        power = actor.system.power
    }

    let roll = {
        name, actor, attribute, attributeModifier, career, rollModifier, power
    }
    
    const template = `systems/roe/templates/chat/basic-action-chat.hbs`

    ChatMessage.create({
        content: await renderTemplate(template, roll),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    }); 
}

export async function InventoryRoll({
    name = null, 
    actor = null, 
    item = null,
    type = null
} = {}) {
    let rank = item.system.rank
    let rankDif = 0
    let ressonance = 0

    if (item.system.sortilege == "yes") {
        rankDif = (rank * 3) + 3
        item.rankDif = rankDif + item.system.cost
        ressonance = actor.system.ressonance.value + actor.system.ressonance.mod
        item.ressonance = ressonance
    }

    let careerName = ""
    let careerValue = 0
    let careerAttributeValue = 0
    let careerAttributeValueMod = 0

    if (type == "ability" && item.system.roll) {
        const careerName = item.system.roll

        let careerValue = 0

        if (careerName != "none") {
            careerValue = actor.system[careerName]
        }

        if (careerName == "brute" || careerName == "resistant") {
            careerAttributeValue = actor.system.body.value
            careerAttributeValueMod = actor.system.body.modifier

            item.careerName = careerName
            item.careerAttributeValue = careerAttributeValue
            item.careerAttributeValueMod = careerAttributeValueMod
            item.careerValue = careerValue
        }

        if (careerName == "alchemist" || careerName == "mystic") {
            careerAttributeValue = actor.system.essence.value
            careerAttributeValueMod = actor.system.essence.modifier

            item.careerName = careerName
            item.careerAttributeValue = careerAttributeValue
            item.careerAttributeValueMod = careerAttributeValueMod
            item.careerValue = careerValue
        }
        
        if (careerName == "athlete" || careerName == "skillful") {
            careerAttributeValue = actor.system.dexterity.value
            careerAttributeValueMod = actor.system.dexterity.modifier

            item.careerName = careerName
            item.careerAttributeValue = careerAttributeValue
            item.careerAttributeValueMod = careerAttributeValueMod
            item.careerValue = careerValue
        } 

        if (careerName == "explorer" || careerName == "researcher") {
            careerAttributeValue = actor.system.perception.value
            careerAttributeValueMod = actor.system.perception.modifier

            item.careerName = careerName
            item.careerAttributeValue = careerAttributeValue
            item.careerAttributeValueMod = careerAttributeValueMod
            item.careerValue = careerValue
        } 

        if (careerName == "artist" || careerName == "diplomat") {
            careerAttributeValue = actor.system.influence.value
            careerAttributeValueMod = actor.system.influence.modifier

            item.careerName = careerName
            item.careerAttributeValue = careerAttributeValue
            item.careerAttributeValueMod = careerAttributeValueMod
            item.careerValue = careerValue
        } 

        if (careerName == "academic" || careerName == "artisan") {
            careerAttributeValue = actor.system.mind.value
            careerAttributeValueMod = actor.system.mind.modifier

            item.careerName = careerName
            item.careerAttributeValue = careerAttributeValue
            item.careerAttributeValueMod = careerAttributeValueMod
            item.careerValue = careerValue
        } 
    }

    let flavor = ""
    let rollModifier = actor.system.rollModifier

    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    const template = `systems/roe/templates/chat/inventory-chat.hbs`
    
    ChatMessage.create({
        content: await renderTemplate(template, item),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    });
}

export async function AbilityRoll({
    name = null, 
    actor = null, 
    item = null,
} = {}) {
    let rank = item.system.rank
    let rankDif = 0
    let ressonance = 0
    let sortilege = item.system.sortilege

    if (sortilege == "yes") {
        rankDif = (rank * 3) + 3
        item.rankDif = rankDif + item.system.cost
        ressonance = actor.system.ressonance.value + actor.system.ressonance.mod
        item.ressonance = ressonance
    }

    let careerName = item.system.roll
    let careerValue = 0
    let careerAttributeValue = 0
    let careerAttributeValueMod = 0

    if (careerName != "none") {
        careerValue = actor.system[careerName]
    }

    if (careerName == "brute" || careerName == "resistant") {
        careerAttributeValue = actor.system.body.value
        careerAttributeValueMod = actor.system.body.modifier

        item.careerName = careerName
        item.careerAttributeValue = careerAttributeValue
        item.careerAttributeValueMod = careerAttributeValueMod
        item.careerValue = careerValue
    }

    if (careerName == "alchemist" || careerName == "mystic") {
        careerAttributeValue = actor.system.essence.value
        careerAttributeValueMod = actor.system.essence.modifier

        item.careerName = careerName
        item.careerAttributeValue = careerAttributeValue
        item.careerAttributeValueMod = careerAttributeValueMod
        item.careerValue = careerValue
    }
    
    if (careerName == "athlete" || careerName == "skillful") {
        careerAttributeValue = actor.system.dexterity.value
        careerAttributeValueMod = actor.system.dexterity.modifier

        item.careerName = careerName
        item.careerAttributeValue = careerAttributeValue
        item.careerAttributeValueMod = careerAttributeValueMod
        item.careerValue = careerValue
    } 

    if (careerName == "explorer" || careerName == "researcher") {
        careerAttributeValue = actor.system.perception.value
        careerAttributeValueMod = actor.system.perception.modifier

        item.careerName = careerName
        item.careerAttributeValue = careerAttributeValue
        item.careerAttributeValueMod = careerAttributeValueMod
        item.careerValue = careerValue
    } 

    if (careerName == "artist" || careerName == "diplomat") {
        careerAttributeValue = actor.system.influence.value
        careerAttributeValueMod = actor.system.influence.modifier

        item.careerName = careerName
        item.careerAttributeValue = careerAttributeValue
        item.careerAttributeValueMod = careerAttributeValueMod
        item.careerValue = careerValue
    } 

    if (careerName == "academic" || careerName == "artisan") {
        careerAttributeValue = actor.system.mind.value
        careerAttributeValueMod = actor.system.mind.modifier

        item.careerName = careerName
        item.careerAttributeValue = careerAttributeValue
        item.careerAttributeValueMod = careerAttributeValueMod
        item.careerValue = careerValue
    } 
    
    let flavor = ""
    
    const rollModifier = actor.system.rollModifier
    item.rollModifier = rollModifier

    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    const template = `systems/roe/templates/chat/ability-chat.hbs`

    console.log("fim", item)
    
    ChatMessage.create({
        content: await renderTemplate(template, item),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    });
}