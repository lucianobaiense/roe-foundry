export async function SkillRoll({
    name = null, 
    actor= null, 
    attribute = null, 
    attributeModifier = null,
    skill = null,
    rollMod = null
} = {}) {
    let flavor = ""

    if (rollMod == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollMod == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    let activeConditions = actor.system.activeConditions

    let roll = {
        name, actor, attribute, attributeModifier, skill, rollMod, activeConditions
    }
    
    const template = `systems/roe/templates/chat/skill-chat.hbs`

    ChatMessage.create({
        content: await foundry.applications.handlebars.renderTemplate(template, roll),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    }); 
}

export async function ActionRoll({
    name = null, 
    actor = null, 
    item = null,
    rollMod = null
} = {}) {
    let roll = {}
    let cost = item.system.cost
    let action = item.system.action
    // let rollMod = item.system.rollModifier
    let damage = item.system.damage
    let damageCritical = item.system.damageCritical
    let damageType = item.system.damageType
    let damageTypeCritical = item.system.damageTypeCritical
    let actionFlavor = item.system.flavor
    let description = item.system.description
    let img = item.img
    let traits = item.system.traits
    let power = actor.system.power
    let narrativePoints = actor.system.narrativePoints.value
    let activeConditions = actor.system.activeConditions

    let actionRoll = item.system.roll
    let hit = 0
    
    let magic = 0

    if (actor.type == "protagonist") {
        magic = actor.system.essence.value + actor.system.essence.modifier
    } else {
        magic = power
    }

    if (actionRoll == 'melee') {
        hit = actor.system.melee.value + actor.system.melee.mod
    } else if (actionRoll == 'distance') {
        hit = actor.system.distance.value + actor.system.distance.mod
    } else if (actionRoll == 'ressonance') {
        hit = actor.system.ressonance.value + actor.system.ressonance.mod
    } else if (actionRoll == 'restoration') {
        hit = magic + actor.system.restoration 
    } else if (actionRoll == 'transformation') {
        hit = magic + actor.system.transformation 
    } else if (actionRoll == 'movement') {
        hit = magic + actor.system.movement 
    } else if (actionRoll == 'senses') {
        hit = magic + actor.system.senses 
    } else if (actionRoll == 'intensity') {
        hit = magic + actor.system.intensity 
    } else if (actionRoll == 'domain') {
        hit = magic + actor.system.domain 
    } else if (actionRoll == 'enchantment') {
        hit = magic + actor.system.enchantment 
    } else if (actionRoll == 'protection') {
        hit = magic + actor.system.protection 
    } else if (actionRoll == 'ilusion') {
        hit = magic + actor.system.ilusion 
    } else if (actionRoll == 'revelation') {
        hit = magic + actor.system.revelation 
    } else if (actionRoll == 'echoes') {
        hit = magic + actor.system.echoes 
    } else if (actionRoll == 'concealment') {
        hit = magic + actor.system.concealment 
    } else if (actionRoll == 'portal') {
        hit = magic + actor.system.portal 
    } else if (actionRoll == 'time') {
        hit = magic + actor.system.time 
    } else if (actionRoll == 'growth') {
        hit = magic + actor.system.growth 
    } else if (actionRoll == 'invocation') {
        hit = magic + actor.system.invocation 
    } else {
        hit = 0
    }

    let flavor = ""

    console.log("rollMod",rollMod)

    if (rollMod == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollMod == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    roll = {
        name, actor, rollMod, cost, action, hit, damage, damageCritical, damageType, damageTypeCritical, actionFlavor, description, img, power, narrativePoints, traits, activeConditions
    }

    const template = `systems/roe/templates/chat/action-chat.hbs`

    ChatMessage.create({
        content: await foundry.applications.handlebars.renderTemplate(template, roll),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    });
}

export async function ActionBasicRoll({
    name = null, 
    actor = null, 
    attribute = null, 
    attributeModifier = null,
    traitsList = null,
    rollMod = null
} = {}) {
    // let rollModifier = actor.system.rollModifier
    let flavor = ""

    if (rollMod == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollMod == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    let power = 0

    if (actor.type == "antagonist") {
        power = actor.system.power
    }

    let activeConditions = actor.system.activeConditions

    let counterAttack = {}

    if (actor.system.primaryWeaponTrained) {
        counterAttack.active = true
        counterAttack.primaryCounterAttackName = actor.system.primaryWeaponName
        counterAttack.primaryCounterAttackDamage = actor.system.primaryWeaponCounterAttack.damage
        counterAttack.primaryCounterAttackTraits = actor.system.primaryWeaponCounterAttack.traits
    }

    if (actor.system.secondaryWeaponTrained) {
        counterAttack.active = true
        counterAttack.secondaryCounterAttackName = actor.system.secondaryWeaponName
        counterAttack.secondaryCounterAttackDamage = actor.system.secondaryWeaponCounterAttack.damage
        counterAttack.secondaryCounterAttackTraits = actor.system.secondaryWeaponCounterAttack.traits
    }

    let defense = false

    if (["Vigor", "Reflexos", "Vontade"].includes(name)) {
        defense = true;
    }

    console.log("rollMod", rollMod)

    let roll = {
        name, actor, attribute, attributeModifier, rollMod, power, activeConditions, defense, counterAttack, traitsList
    }
    
    const template = `systems/roe/templates/chat/basic-action-chat.hbs`

    ChatMessage.create({
        content: await foundry.applications.handlebars.renderTemplate(template, roll),
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
    let flavor = item.flavor

    const template = `systems/roe/templates/chat/inventory-chat.hbs`
    
    ChatMessage.create({
        content: await foundry.applications.handlebars.renderTemplate(template, item),
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
        item.rankDif = rankDif + parseInt(item.system.cost)
        ressonance = actor.system.ressonance.value + actor.system.ressonance.mod
        item.ressonance = ressonance
    }
    
    let flavor = ""
    
    const rollModifier = actor.system.rollModifier
    item.rollModifier = rollModifier

    item.activeConditions = actor.system.activeConditions

    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    const template = `systems/roe/templates/chat/ability-chat.hbs`
    
    ChatMessage.create({
        content: await foundry.applications.handlebars.renderTemplate(template, item),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    });
}

export async function AttackRoll({
    actor = null, 
    hit = null,
    damage = null,
    criticalDamage = null,
    type = null,
    traits = null,
    traitsList = null
} = {}) {
    let rollModifier = actor.system.rollModifier
    let activeConditions = actor.system.activeConditions
   
    let name = ""
    
    if (type == 'basic-attack') {
        name = "Ataque Básico ( ► )"
    } else if (type == 'special-attack') {
        name = "Ataque Especial ( ►► )"
    } else if (type == 'fast-attack') {
        name = "Ataque Rápido ( ☈ )"
    } else {
        name = "Contra Ataque ( ✦ )"
    }

    let flavor = ""
    
    if (rollModifier == 'advantage') {
        flavor = `Rolou ${name} com Vantagem`
    } else if (rollModifier == 'disadvantage') {
        flavor = `Rolou ${name} com Desvantagem`
    } else {
        flavor = `Rolou ${name}`
    }

    if (hit == "melee") {
        hit = actor.system.melee.value + actor.system.melee.mod
    } else if (hit == "distance") {
        hit = actor.system.distance.value + actor.system.distance.mod
    } else if (hit == "ressonance") {
        hit = actor.system.ressonance.value + actor.system.ressonance.mod
    } else {
        hit = 0
    }

    let roll = {
        name, actor, hit, damage, criticalDamage, traits, traitsList, rollModifier , activeConditions
    }
    
    const template = `systems/roe/templates/chat/attack-chat.hbs`

    ChatMessage.create({
        content: await foundry.applications.handlebars.renderTemplate(template, roll),
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flavor: flavor
    }); 
}