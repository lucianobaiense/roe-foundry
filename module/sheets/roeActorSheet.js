import * as Dice from "../dice.js";

export default class roeActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 760,
            height: 900,
            classes: ["roe", "sheet", "actor"]
        });
    }

    get template() {
        return `systems/roe/templates/sheets/actors/${this.actor.data.type}-sheet.hbs`;
    }

    itemContextMenu = [
        {
            name: game.i18n.localize("roe.general.edit"),
            icon: '<i class="fas fa-pen-to-square"></i>',
            callback: element => {
                const itemId = element.data("id")
                const item = this.actor.items.get(itemId);
                item.sheet.render(true)
            }
        },
        {
            name: game.i18n.localize("roe.general.delete"),
            icon: '<i class="fas fa-trash"></i>',
            callback: element => {
                const itemId = element.data("id")
                Item.deleteDocuments([itemId], {parent: this.actor});
            }
        }
    ]

    getData() {
        const data = super.getData();       
        
        data.config = CONFIG.roe;

        data.abilities = data.items.filter(function(item) {
            return item.type == "ability"
        });

        data.actions = data.items.filter(function(item) {
            return item.type == "action"
        });

        data.equipments = data.items.filter(function(item) {
            return item.type == "equipment"
        })

        data.skills = data.items.filter(function(item) {
            return item.type == "skill"
        });

        data.spells = data.items.filter(function(item) {
            return item.type == "spell"
        });

        data.traits = data.items.filter(function(item) {
            return item.type == "trait"
        });

        // Prepare calculated data for Characters
        const system = data.data.system

        system.stamina.value = system.body.value + system.body.modifier + system.essence.value + system.essence.modifier
        system.dodge.value = system.dexterity.value + system.dexterity.modifier + system.perception.value + system.perception.modifier
        system.will.value = system.influence.value + system.influence.modifier + system.mind.value + system.mind.modifier

        // Prepare calculated data for Protagonist Characters
        if (data.actor.type == "protagonist") {
            system.healthPoints.max = (system.body.value * 10) + (system.body.value * system.level) + system.healthPointsModifier
            system.etherPoints.max = (system.essence.value * 5) + system.level + system.etherPointsModifier

            if (system.size == "small") {
                system.maxSlots = system.body.value + system.body.modifier + 6
                system.overweight = 1

            } else if (system.size == "medium") {
                system.maxSlots = system.body.value + system.body.modifier + 8
                system.overweight = 2

            } else if (system.size == "large") {
                system.maxSlots = system.body.value + system.body.modifier + 10
                system.overweight = 3
            }
        }

        // Prepare calculated data for Antagonist Characters
        if (data.actor.type == "antagonist") {

            if (system.threat == "low") {
                system.power = 1
                system.healthPoints.max = 10 + system.level + system.healthPointsModifier
                system.etherPoints.max = 2 + system.level + system.level + system.etherPointsModifier

            } else if (system.threat == "moderate") {
                system.power = 2
                system.healthPoints.max = 20 + (system.level * 2) + system.healthPointsModifier
                system.etherPoints.max = 4 + system.level + system.level + system.etherPointsModifier

            } else if (system.threat == "dangerous") {
                system.power = 3
                system.healthPoints.max = 40 + (system.level * 3) + system.healthPointsModifier
                system.etherPoints.max = 8 + system.level + system.level + system.etherPointsModifier

            } else if (system.threat == "extreme") {
                system.power = 4
                system.healthPoints.max = 80 + (system.level * 4) + system.healthPointsModifier
                system.etherPoints.max = 16 + system.level + system.level + system.etherPointsModifier

            } else if (system.threat == "deadly") {
                system.power = 5
                system.healthPoints.max = 160 + (system.level * 5) + system.healthPointsModifier
                system.etherPoints.max = 32 + system.level + system.level + system.etherPointsModifier
            }

            if (system.species == "beasts") {
                system.traitsInitial = 4

            } else if (system.species == "constructs") {
                system.traitsInitial = 3

            } else if (system.species == "elementals") {
                system.traitsInitial = 3

            } else if (system.species == "humanoids") {
                system.traitsInitial = 3

            } else if (system.species == "inferius") {
                system.traitsInitial = 3

            } else if (system.species == "monsters") {
                system.traitsInitial = 4
            }
        }

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (this.actor.isOwner) {
            html.find(".roll").click(this._onRoll.bind(this));
            html.find(".item-roll").click(this._onItemRoll.bind(this));
        }

        if (this.isEditable) {
            html.find(".item-create").click(this._onItemCreate.bind(this));
            html.find(".item-edit-inline").change(this._onItemEditInline.bind(this));
            html.find(".item-edit-popup").click(this._onItemEditPopup.bind(this));
            html.find(".item-delete").click(this._onItemDelete.bind(this));
            html.find(".species").change(this._onSpeciesChange.bind(this));
    
            new ContextMenu(html, ".item", this.itemContextMenu);
        }
    }

    async _onRoll(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let rollType = element.dataset.rollType;

        if (rollType == "attribute") {            
            Dice.AttributeRoll({
                actor: this.actor,
                name: element.dataset.name,
                attribute: element.dataset.attribute,
                attributeModifier: element.dataset.attributeModifier
            })
        }

        if (rollType == "skill") {
            const skillAttribute = element.dataset.skillAttribute;

            Dice.SkillRoll({
                actor: this.actor,
                name: element.dataset.name,
                skillAttribute: this.actor.system[skillAttribute].value + this.actor.system[skillAttribute].modifier,
                skillTraining: element.dataset.skillTraining,
                skillModifier: element.dataset.skillModifier
            })
        }

        if (rollType == "action") { 
            Dice.ActionRoll({
                actor: this.actor,
                name: element.dataset.name,
                hit: element.dataset.hit,
                damage: element.dataset.damage,
                damageCritical: element.dataset.damageCritical,
                traits: element.dataset.traits,
                type: rollType
            })
        }
    }

    async _onItemRoll(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.id;
        
        Dice.ItemRoll({
            actor: this.actor,
            name: element.dataset.name,
            type: element.dataset.type,
            item: this.actor.items.get(itemId)
        })
    }

    async _onItemCreate(event) {
        event.preventDefault();

        let element = event.currentTarget;
        
        const itemData = {
            name: "-",
            type: element.dataset.type,
        };

        return await Item.create(itemData, {parent: this.actor});
    }

    async _onItemEditInline(event) {   
        event.preventDefault();

        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.id;
        let field = element.dataset.field;

        const updates = [{
            _id: itemId,
            [field]: element.value
        }]

        return await Item.updateDocuments(updates, {parent: this.actor})
    }

    async _onItemEditPopup(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.id;
        let item = this.actor.items.get(itemId)

        item.sheet.render(true)
    }

    async _onItemDelete(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.id;

        return await Item.deleteDocuments([itemId], {parent: this.actor});
    }

    async _onSpeciesChange(event) {
        event.preventDefault();
  
        const element = event.currentTarget;

        if (element.value == "constructs") {
            const traits = [
                { name: "Imunidade a Condição (Envenenado, Sangramento)", type: "trait" },
                { name: "Resistência a Dano (Escolha dois tipos de dano)", type: "trait" },
                { name: "Vulnerabilidade (Escolha um tipo de dano)", type: "trait" }
            ];
            return await Item.createDocuments(traits, {parent: this.actor});

        } else if (element.value == "elementals") {
            const traits = [
                { name: "Imunidade a Dano (Escolha um tipo de dano)", type: "trait" },
                { name: "Vulnerabilidade (Escolha um tipo de dano)", type: "trait" }
            ];
            return await Item.createDocuments(traits, {parent: this.actor});

        } else if (element.value == "humanoids") {
            const traits = [
                { name: "Equipamento", type: "trait" }
            ];
            return await Item.createDocuments(traits, {parent: this.actor});

        } else if (element.value == "inferius") {
            const traits = [
                { name: "Imunidade a Condição (Envenenado, Sangramento)", type: "trait" },
                { name: "Resistência a Dano (Corte, Perfuração)", type: "trait" }
            ];
            return await Item.createDocuments(traits, {parent: this.actor});
        } 
    }
}