import * as Dice from "../dice.js";

export default class roeActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["roe", "sheet", "item"],
            height: 900,
            template: "systems/roe/templates/sheets/actors/actor-sheet.hbs",
            width: 700,
        });
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

    async getData(options) {
        const context = await super.getData(options);
        context.config = CONFIG.roe
        context.system = context.data.system;

        context.abilities = context.items.filter(function(item) {
            return item.type == "ability"
        });

        context.actions = context.items.filter(function(item) {
            return item.type == "action"
        });

        context.equipments = context.items.filter(function(item) {
            return item.type == "equipment"
        })

        context.skills = context.items.filter(function(item) {
            return item.type == "skill"
        });

        context.spells = context.items.filter(function(item) {
            return item.type == "spell"
        });

        context.traits = context.items.filter(function(item) {
            return item.type == "trait"
        });

        // Prepare calculated data for Characters
        context.system.stamina.value = context.system.body.value + context.system.body.modifier + context.system.essence.value + context.system.essence.modifier
        context.system.dodge.value = context.system.dexterity.value + context.system.dexterity.modifier + context.system.perception.value + context.system.perception.modifier
        context.system.will.value = context.system.influence.value + context.system.influence.modifier + context.system.mind.value + context.system.mind.modifier

        // Prepare calculated data for Protagonist Characters
        if (context.actor.type == "protagonist") {
            context.system.healthPoints.max = (context.system.body.value * 10) + (context.system.body.value * context.system.level) + context.system.healthPointsModifier
            context.system.etherPoints.max = (context.system.essence.value * 5) + context.system.level + context.system.etherPointsModifier

            if (context.system.size == "small") {
                context.system.maxSlots = context.system.body.value + context.system.body.modifier + 6
                context.system.overweight = 1

            } else if (context.system.size == "medium") {
                context. system.maxSlots = context.system.body.value + context.system.body.modifier + 8
                context. system.overweight = 2

            } else if (context.system.size == "large") {
                context.system.maxSlots = context.system.body.value + context.system.body.modifier + 10
                context.system.overweight = 3
            }
        }

        // Prepare calculated data for Antagonist Characters
        if (context.actor.type == "antagonist") {

            if (context.system.threat == "low") {
                context.system.power = 1
                context.system.healthPoints.max = 10 + context.system.level + context.system.healthPointsModifier
                context.system.etherPoints.max = 2 + context.system.level + context.system.level + context.system.etherPointsModifier

            } else if (context.system.threat == "moderate") {
                context.system.power = 2
                context.system.healthPoints.max = 20 + (context.system.level * 2) + context.system.healthPointsModifier
                context.system.etherPoints.max = 4 + context.system.level + context.system.level + context.system.etherPointsModifier

            } else if (context.system.threat == "dangerous") {
                context.system.power = 3
                context.system.healthPoints.max = 40 + (context.system.level * 3) + context.system.healthPointsModifier
                context.system.etherPoints.max = 8 + context.system.level + context.system.level + context.system.etherPointsModifier

            } else if (context.system.threat == "extreme") {
                context.system.power = 4
                context.system.healthPoints.max = 80 + (context.system.level * 4) + context.system.healthPointsModifier
                context.system.etherPoints.max = 16 + context.system.level + context.system.level + context.system.etherPointsModifier

            } else if (context.system.threat == "deadly") {
                context.system.power = 5
                context.system.healthPoints.max = 160 + (context.system.level * 5) + context.system.healthPointsModifier
                context.system.etherPoints.max = 32 + context.system.level + context.system.level + context.system.etherPointsModifier
            }

            if (context.system.species == "beasts") {
                context.system.traitsInitial = 4

            } else if (context.system.species == "constructs") {
                context.system.traitsInitial = 3

            } else if (context.system.species == "elementals") {
                context.system.traitsInitial = 3

            } else if (context.system.species == "humanoids") {
                context.system.traitsInitial = 3

            } else if (context.system.species == "inferius") {
                context.system.traitsInitial = 3

            } else if (context.system.species == "monsters") {
                context.system.traitsInitial = 4
            }
        }

        return context;
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
        let itemId = element.closest(".item").dataset.id;

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
                type: rollType,
                item: this.actor.items.get(itemId)
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
        let type = element.dataset.type;
        let img = ""

        if (type == "action") {
            img = "icons/skills/movement/figure-running-gray.webp"

        } else if (type == "equipment") {
            img = "icons/containers/bags/coinpouch-leather-grey.webp"

        } else if (type == "spell") {
            img = "icons/magic/symbols/runes-star-pentagon-blue.webp"

        } else if (type == "ability") {
            img = "icons/magic/symbols/chevron-elipse-circle-blue.webp"
        }
        
        const itemData = {
            name: "-",
            type: element.dataset.type,
            img: img
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