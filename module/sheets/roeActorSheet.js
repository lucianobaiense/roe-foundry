import * as Dice from "../dice.js";
import traits from "../traits.js"

export default class roeActorSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["roe", "sheet", "item"],
            height: 900,
            template: "systems/roe/templates/actors/actor-sheet.hbs",
            width: 900,
        });
    }

    async getData(options) {
        const context = await super.getData(options);
        context.config = CONFIG.roe
        context.system = context.data.system;

        console.log("system", context.system)

        if (context.actor.type == "protagonist") {
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

            // Prepare calculated basic attacks
            context.system.melee.value = context.system.body.value + context.system.body.modifier + context.system.dexterity.value + context.system.dexterity.modifier
            context.system.distance.value = context.system.dexterity.value + context.system.dexterity.modifier + context.system.mind.value + context.system.mind.modifier

            if (context.system.ressonance.attribute == 'perception') {
                context.system.ressonance.value = context.system.essence.value + context.system.essence.modifier + context.system.perception.value + context.system.perception.modifier

            } else if (context.system.ressonance.attribute == 'influence') {
                context.system.ressonance.value = context.system.essence.value + context.system.essence.modifier + context.system.influence.value + context.system.influence.modifier

            } else {
                context.system.ressonance.value = context.system.essence.value + context.system.essence.modifier + context.system.mind.value + context.system.mind.modifier
            }

            // Prepare calculated basic defenses
            context.system.physical.value = context.system.body.value + context.system.body.modifier + context.system.essence.value + context.system.essence.modifier
            context.system.agile.value = context.system.dexterity.value + context.system.dexterity.modifier + context.system.perception.value + context.system.perception.modifier
            context.system.mental.value = context.system.influence.value + context.system.influence.modifier + context.system.mind.value + context.system.mind.modifier

            // Set Max Slots
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

            // Set Current Slots
            for (let item of context.equipments) {
                let convertNumber = parseInt(item.system.slots)
                context.system.slots = context.system.slots + convertNumber
            }
        }

        if (context.actor.type == "antagonist") {
            console.log("antagonist")

            context.antagonistTraits = traits.antagonist

            context.system.healthPoints.max = 10 + parseInt(context.system.level) + parseInt(context.system.healthPoints.mod) + parseInt(context.system.power) 
            context.system.etherPoints.max = parseInt(context.system.level) + parseInt(context.system.etherPoints.mod) + parseInt(context.system.power) 
        }

        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (this.actor.isOwner) {
            html.find(".roll").click(this._onRoll.bind(this));
            html.find(".inventory-roll").click(this._onInventoryRoll.bind(this));
            html.find(".ability-roll").click(this._onAbilityRoll.bind(this));
            html.find(".antagonist-trait-selected").change(this._onAntagonistTraitSelected.bind(this));
            html.find(".antagonist-trait-delete").click(this._onAntagonistTraitDelete.bind(this));
        }

        if (this.isEditable) {
            html.find(".item-create").click(this._onItemCreate.bind(this));
            html.find(".item-edit-inline").change(this._onItemEditInline.bind(this));
            html.find(".item-edit-popup").click(this._onItemEditPopup.bind(this));
            html.find(".item-delete").click(this._onItemDelete.bind(this));
            // html.find(".species").change(this._onSpeciesChange.bind(this));
        }

        // Toogle Box
        const actor = this.actor; // Obtém o ator da ficha

        // Seleciona todos os botões de toggle e os respectivos boxes
        html.find(".toggle-box").each((_, button) => {
            const boxId = $(button).data("target"); // Obtém o ID do box
            const box = html.find(`#${boxId}`);

            // Obtém o estado salvo no flag correspondente
            let isVisible = actor.getFlag("roe", `${boxId}Visible`) ?? false;

            // Aplica a visibilidade inicial baseada no flag salvo
            box.toggleClass("hidden-box", !isVisible);

            // Evento de clique para alternar visibilidade
            $(button).click(async () => {
                isVisible = !isVisible;
                box.toggleClass("hidden-box");
                await actor.setFlag("roe", `${boxId}Visible`, isVisible);
            });
        });
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

        if (rollType == "career") {            
            Dice.CareerRoll({
                actor: this.actor,
                name: element.dataset.name,
                attribute: element.dataset.attribute,
                attributeModifier: element.dataset.attributeModifier,
                career: element.dataset.career,
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
                // rollModifier: element.dataset.rollModifier,
                type: rollType,
                item: this.actor.items.get(itemId)
            })
        }

        if (rollType == "action-basic") { 
            Dice.ActionBasicRoll({
                actor: this.actor,
                name: element.dataset.name,
                attribute: element.dataset.attribute,
                attributeModifier: element.dataset.attributeModifier,
            })
        }
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

    // async _onSpeciesChange(event) {
    //     event.preventDefault();

    //     const element = event.currentTarget;
    //     let traitsList = []

    //     // console.log(traits.antagonist)

    //     if (element.value == "constructs") {
    //         traitsList.push({ label: traits.antagonist[28].label, description: traits.antagonist[28].description })
    //         traitsList.push({ label: traits.antagonist[38].label, description: traits.antagonist[38].description })
    //         traitsList.push({ label: traits.antagonist[46].label, description: traits.antagonist[46].description })

    //         return await this.object.update({
    //             system: {
    //                 traits: traitsList
    //             }
    //         });
    //     }

    //     if (element.value == "elementals") {
    //         traitsList.push({ label: traits.antagonist[29].label, description: traits.antagonist[29].description })
    //         traitsList.push({ label: traits.antagonist[46].label, description: traits.antagonist[46].description })

    //         return await this.object.update({
    //             system: {
    //                 traits: traitsList
    //             }
    //         });
    //     }

    //     if (element.value == "humanoids") {
    //         traitsList.push({ label: traits.antagonist[18].label, description: traits.antagonist[18].description })

    //         return await this.object.update({
    //             system: {
    //                 traits: traitsList
    //             }
    //         });
    //     }

    //     if (element.value == "inferius") {
    //         traitsList.push({ label: traits.antagonist[28].label, description: traits.antagonist[28].description })
    //         traitsList.push({ label: traits.antagonist[38].label, description: traits.antagonist[38].description })

    //         return await this.object.update({
    //             system: {
    //                 traits: traitsList
    //             }
    //         });
    //     }
    // }

    async _onInventoryRoll(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.id;
        
        Dice.InventoryRoll({
            actor: this.actor,
            name: element.dataset.name,
            rollModifier: element.dataset.rollModifier,
            type: element.dataset.type,
            item: this.actor.items.get(itemId)
        })
    }

    async _onAbilityRoll(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.id;
        
        Dice.AbilityRoll({
            actor: this.actor,
            name: element.dataset.name,
            item: this.actor.items.get(itemId)
        })
    }
}