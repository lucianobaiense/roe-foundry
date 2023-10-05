import * as Dice from "../dice.js";
import traits from "../traits.js"

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
        context.antagonistTraits = traits.antagonist

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

            context.system.healthPoints.max = (context.system.body.value * 10) + (context.system.body.value * context.system.level) + context.system.healthPoints.mod
            context.system.etherPoints.max = (context.system.essence.value * 5) + context.system.level + context.system.etherPoints.mod
            context.system.narrativePoints.max = 5 + context.system.narrativePoints.mod
            context.system.magicPower.value = (context.system.essence.value + context.system.essence.modifier) + context.system.magicPower.mod + context.system.magicPower.focus

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
                context.system.healthPoints.max = 10 + context.system.level + context.system.healthPoints.mod
                context.system.etherPoints.max = 2 + context.system.level + context.system.level + context.system.etherPoints.mod

            } else if (context.system.threat == "moderate") {
                context.system.power = 2
                context.system.healthPoints.max = 20 + (context.system.level * 2) + context.system.healthPoints.mod
                context.system.etherPoints.max = 4 + context.system.level + context.system.level + context.system.etherPoints.mod

            } else if (context.system.threat == "dangerous") {
                context.system.power = 3
                context.system.healthPoints.max = 40 + (context.system.level * 3) + context.system.healthPoints.mod
                context.system.etherPoints.max = 8 + context.system.level + context.system.level + context.system.etherPoints.mod

            } else if (context.system.threat == "extreme") {
                context.system.power = 4
                context.system.healthPoints.max = 80 + (context.system.level * 4) + context.system.healthPoints.mod
                context.system.etherPoints.max = 16 + context.system.level + context.system.level + context.system.etherPoints.mod

            } else if (context.system.threat == "deadly") {
                context.system.power = 5
                context.system.healthPoints.max = 160 + (context.system.level * 5) + context.system.healthPoints.mod
                context.system.etherPoints.max = 32 + context.system.level + context.system.level + context.system.etherPoints.mod
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

            context.system.magicPower.value = context.system.power + (context.system.essence.value + context.system.essence.modifier) + context.system.magicPower.mod + context.system.magicPower.focus
        }

        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (this.actor.isOwner) {
            html.find(".roll").click(this._onRoll.bind(this));
            html.find(".item-roll").click(this._onItemRoll.bind(this));
            html.find(".antagonist-trait-selected").change(this._onAntagonistTraitSelected.bind(this));
            html.find(".antagonist-trait-delete").click(this._onAntagonistTraitDelete.bind(this));
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
                skillModifier: element.dataset.skillModifier,
                skillRollModifier: element.dataset.skillRollModifier
            })
        }

        if (rollType == "action") { 
            Dice.ActionRoll({
                actor: this.actor,
                name: element.dataset.name,
                rollModifier: element.dataset.rollModifier,
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
            rollModifier: element.dataset.rollModifier,
            type: element.dataset.type,
            item: this.actor.items.get(itemId)
        })
    }

    async _onAntagonistTraitSelected(event) {
        event.preventDefault();

        const currentItem = this.object;
        const value = event.currentTarget.value;
        const traitName = value.split('|')[0];
        const traitDescription = value.split('|')[1];

        let traitsList = currentItem.system.traits;

        function filterTraits(arr, value) { 
            return arr.filter(function(trait) { 
                return trait.label == value; 
            });
        }

        const filter = filterTraits(traitsList, traitName)

        if (filter.length == 0) {
            if (traitName != "none") {
                const newTrait = {
                    "label": traitName,
                    "description": traitDescription
                }
        
                traitsList.push(newTrait)
        
                return await currentItem.update({
                    system: {
                        traits: traitsList
                    }
                });
            }
        }
    }

    async _onAntagonistTraitDelete(event) {
        event.preventDefault();

        const currentItem = this.object;
        const traitList = currentItem.system.traits;
        const deletedTrait = event.currentTarget.dataset.trait;

        function traitRemove(arr, value) { 
            return arr.filter(function(trait) { 
                return trait.label != value; 
            });
        }

        const newTraitList = traitRemove(traitList, deletedTrait);

        return await currentItem.update({
            system: {
                traits: newTraitList
            }
        });

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

        } else if (type == "skill") {
            img = "icons/sundries/books/book-worn-red.webp"

        } else if (type == "trait") {
            img = "icons/pings/chevron.webp"
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
        let itemValue = element.value
        let type = element.type
        let itemId = element.closest(".item").dataset.id;
        let field = element.dataset.field;

        if (type == "checkbox") {
            if (itemValue == "false") {
                itemValue = true
            } else {
                itemValue = false
            }
        }

        const updates = [{
            _id: itemId,
            [field]: itemValue
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
        let traitsList = []

        console.log(traits.antagonist)

        if (element.value == "constructs") {
            traitsList.push({ label: traits.antagonist[28].label, description: traits.antagonist[28].description })
            traitsList.push({ label: traits.antagonist[38].label, description: traits.antagonist[38].description })
            traitsList.push({ label: traits.antagonist[46].label, description: traits.antagonist[46].description })

            return await this.object.update({
                system: {
                    traits: traitsList
                }
            });
        }

        if (element.value == "elementals") {
            traitsList.push({ label: traits.antagonist[29].label, description: traits.antagonist[29].description })
            traitsList.push({ label: traits.antagonist[46].label, description: traits.antagonist[46].description })

            return await this.object.update({
                system: {
                    traits: traitsList
                }
            });
        }

        if (element.value == "humanoids") {
            traitsList.push({ label: traits.antagonist[18].label, description: traits.antagonist[18].description })

            return await this.object.update({
                system: {
                    traits: traitsList
                }
            });
        }

        if (element.value == "inferius") {
            traitsList.push({ label: traits.antagonist[28].label, description: traits.antagonist[28].description })
            traitsList.push({ label: traits.antagonist[38].label, description: traits.antagonist[38].description })

            return await this.object.update({
                system: {
                    traits: traitsList
                }
            });
        }
    }
}