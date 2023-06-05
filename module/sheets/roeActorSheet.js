import * as Dice from "../dice.js";

export default class roeProtagonistSheet extends ActorSheet {
    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 760,
            height: 900,
            classes: ["roe", "sheet", "protagonist"]
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
}