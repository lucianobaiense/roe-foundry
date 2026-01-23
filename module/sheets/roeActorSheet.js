import * as Dice from "../dice.js";
import traits from "../traits.js"
import conditions from "../conditions.js"

export default class roeActorSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["roe", "sheet", "item"],
            height: "auto",
            template: "systems/roe/templates/actors/actor-sheet.hbs",
            width: 1024,
        });
    }

    async getData(options) {
        const context = await super.getData(options);
        context.config = CONFIG.roe
        context.system = context.actor.system;

        if (context.actor.type == "protagonist") {
            context.abilities = context.items.filter(item => item.type === "ability").sort((a, b) => a.system.levellog - b.system.levellog);
    
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

            context.weaponsTraits = traits.weapon

            context.armorTraits = traits.armor

            // Set Current Slots
            context.system.slots = context.equipments.length
        }

        if (context.actor.type == "antagonist") {
            context.antagonistTraits = traits.antagonist
            // context.system.healthPoints.max = 10 + (parseInt(context.system.level) * parseInt(context.system.power)) + parseInt(context.system.healthPoints.mod)
            // context.system.etherPoints.max = parseInt(context.system.level) + parseInt(context.system.power) + parseInt(context.system.etherPoints.mod)
        }

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
            context.system.maxSlots = context.system.body.value + context.system.body.modifier + 4
            context.system.overweight = 1

        } else if (context.system.size == "medium") {
            context. system.maxSlots = context.system.body.value + context.system.body.modifier + 5
            context. system.overweight = 2

        } else if (context.system.size == "large") {
            context.system.maxSlots = context.system.body.value + context.system.body.modifier + 6
            context.system.overweight = 3
        }

        // Set Narrative Dice Size
        const level = context.system.level
        if (level > 9) {
            context.system.narrativePoints.dice = "1d12"
        } else if (level > 6) {
            context.system.narrativePoints.dice = "1d10"
        } else if (level > 3) {
            context.system.narrativePoints.dice = "1d8"
        } else {
            context.system.narrativePoints.dice = "1d6"
        }

        context.system.conditionsList = conditions

        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (this.actor.isOwner) {
            html.find(".roll").click(this._onRoll.bind(this));
            html.find(".inventory-roll").click(this._onInventoryRoll.bind(this));
            html.find(".ability-roll").click(this._onAbilityRoll.bind(this));
            html.find(".attack-roll").click(this._onAttackRoll.bind(this));
            // html.find(".contition-selected").change(this._onContitionSelected.bind(this));
            html.find(".select-condition-toogle").click(this._onSelectConditionToogle.bind(this));
            html.find(".contition-delete").click(this._onContitionDelete.bind(this));
            html.find(".antagonist-trait-selected").change(this._onAntagonistTraitSelected.bind(this));
            html.find(".antagonist-trait-delete").click(this._onAntagonistTraitDelete.bind(this));
            html.find('.item').on('dragstart', this._onDragItemStart.bind(this));
            html.find('.roll').on('dragstart', this._onDragRollStart.bind(this));
            html.find('.trait-selected').on('dragstart', this._onTraitSelected.bind(this));
        }

        if (this.isEditable) {
            html.find(".item-create").click(this._onItemCreate.bind(this));
            html.find(".item-edit-inline").change(this._onItemEditInline.bind(this));
            html.find(".item-edit-popup").click(this._onItemEditPopup.bind(this));
            html.find(".item-delete").click(this._onItemDelete.bind(this));
        }

        // // Toogle Box
        // const actor = this.actor; // Obtém o ator da ficha

        // // Seleciona todos os botões de toggle e os respectivos boxes
        // html.find(".toggle-box").each((_, button) => {
        //     const boxId = $(button).data("target"); // Obtém o ID do box
        //     const box = html.find(`#${boxId}`);

        //     // Obtém o estado salvo no flag correspondente
        //     let isVisible = actor.getFlag("roe", `${boxId}Visible`) ?? false;

        //     // Aplica a visibilidade inicial baseada no flag salvo
        //     box.toggleClass("hidden-box", !isVisible);

        //     // Evento de clique para alternar visibilidade
        //     $(button).click(async () => {
        //         isVisible = !isVisible;
        //         box.toggleClass("hidden-box");
        //         await actor.setFlag("roe", `${boxId}Visible`, isVisible);

        //         // Se o box foi fechado, atualizar os forms
        //         if (!isVisible) {
        //             await this.submit(); // Substitui _onSubmit() por submit()
        //             this.render(); // Re-renderiza a ficha
        //         }
        //     });
        // });
    }

    async rollByData({ rollType, rollMod, name, itemId = null, attribute, attributeModifier, skill, traitsList }) {
        const actor = this.actor;

        if (rollType === "attribute") {
            return Dice.AttributeRoll({ actor, name, rollMod, attribute, attributeModifier });
        }

        if (rollType === "action") {
            const item = itemId ? actor.items.get(itemId) : actor.items.find(i => i.name === name);
            return Dice.ActionRoll({ actor, name, rollMod, item });
        }

        if (rollType === "action-basic") {
            console.log("action", rollMod)
            return Dice.ActionBasicRoll({ actor, name, rollMod, attribute, attributeModifier, traitsList });
        }

        if (rollType === "skill") {
            return Dice.SkillRoll({ actor, name, rollMod, attribute, attributeModifier, skill });
        }

        ui.notifications.warn("Tipo de rolagem desconhecido: " + rollType);
    }

    async _onRoll(event) {
        event.preventDefault();

        const element = event.currentTarget;
        const rollType = element.dataset.rollType;
        const rollMod = element.dataset.rollMod
        const name = element.dataset.name;
        const itemId = element.closest(".item")?.dataset.id;
        const attribute = element.dataset.attribute;
        const attributeModifier = element.dataset.attributeModifier;
        const traits = element.dataset.traitsList
        const skill = element.dataset.skill

        let traitsList = [];

        if (traits) {
            try {
                traitsList = JSON.parse(traits);
            } catch (e) {
                console.error("Erro ao parsear traitsList:", e);
            }
        }

        return this.rollByData({
            rollType,
            rollMod,
            name,
            itemId,
            attribute,
            attributeModifier,
            skill,
            traitsList
        });
    }

    async _onSelectConditionToogle(event) {
        event.preventDefault();

        const currentItem = this.object;
        const value = event.currentTarget;
        const conditionName = value.dataset.conditionName;
        const conditionDescription = value.dataset.conditionDescription;

        let currentConditionsList = currentItem.system.activeConditions;

        function filterConditions(arr, value) { 
            return arr.filter(function(conditions) { 
                return conditions.label == value; 
            });
        }

        const filter = filterConditions(currentConditionsList, conditionName)

        if (filter.length == 0 ) {
            const newCondition = {
                "label": conditionName,
                "description": conditionDescription,
            }

            currentConditionsList.push(newCondition)

            return await currentItem.update({
                system: {
                    activeConditions: currentConditionsList
                }
            });
        } else {
            function conditionRemove(arr, value) { 
                return arr.filter(function(condition) { 
                    return condition.label != value; 
                });
            }
    
            const updatedConditionList = conditionRemove(currentConditionsList, conditionName);
            
            return await currentItem.update({
                system: {
                    activeConditions: updatedConditionList
                }
            });
        }
    }

    async _onContitionDelete(event) {
        event.preventDefault();

        const currentItem = this.object;
        const conditionList = currentItem.system.conditions;
        const deletedCondition = event.currentTarget.dataset.condition;

        function conditionRemove(arr, value) { 
            return arr.filter(function(condition) { 
                return condition.label != value; 
            });
        }

        const newConditionList = conditionRemove(conditionList, deletedCondition);

        return await currentItem.update({
            system: {
                conditions: newConditionList
            }
        });

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

    async _onDragItemStart(event) {
        const li = event.currentTarget.closest(".item");
        if (!li) return;

        const itemId = li.dataset.id;
        const item = this.actor.items.get(itemId);
        if (!item) return;

        // Código da macro que invoca a rolagem customizada
        const macroCommand = `
            const token = canvas.tokens.controlled[0];
            if (!token) return ui.notifications.warn("Selecione um token.");

            const actor = token.actor;
            if (!actor) return ui.notifications.warn("Token não tem um ator.");

            const item = actor.items.find(i => i.name === "${item.name}");
            if (!item) return ui.notifications.warn("Item '${item.name}' não encontrado na ficha.");

            actor.sheet.rollByData({
            rollType: "action",
            name: item.name,
            itemId: item.id,
            attribute: null,
            attributeModifier: null
            });
            `.trim();

            // Tenta achar uma macro igual já existente
            let macro = game.macros.find(m => m.name === item.name && m.command === macroCommand);

            // Se não existir, cria
            if (!macro) {
                macro = await Macro.create({
                    name: item.name,
                    type: "script",
                    img: item.img || "icons/svg/dice-target.svg",
                    command: macroCommand,
                    flags: { "roe.generated": true }
                });
            }

            // Prepara os dados de arraste
            const dragData = macro.toDragData();
            event.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    }

    async _onDragRollStart(event) {
        const dataset = event.currentTarget.dataset;
        if (!dataset) return;

        const name = dataset.name;
        const attribute = Number(dataset.attribute);
        const attributeModifier = Number(dataset.attributeModifier);
        const total = attribute + attributeModifier;

        const macroName = `${name}`;
        const formula = `2d6 + ${total}`;

        // Texto que aparece no chat ao rolar
        const flavor = `<strong>${name}</strong> <small>(2d6 + ${attribute} + ${attributeModifier})</small>`;

        // Define a macro como um comando de chat simples
        const command = `/roll ${formula} # ${flavor}`;

        // Tenta encontrar macro existente com mesmo nome e comando
        let macro = game.macros.find(m => m.name === macroName && m.command === command);

        // Se não existe, cria nova macro
        if (!macro) {

            let img = null
            
            switch (name) {
                case "Ataque Corporal":
                    img = "icons/svg/sword.svg";
                    break;
                case "Ataque à Distância":
                    img = "icons/svg/target.svg";
                    break;
                case "Ressonância":
                    img = "icons/svg/aura.svg";
                    break;
                case "Defesa Ágil":
                    img = "icons/svg/wingfoot.svg";
                    break;
                case "Defesa Física":
                    img = "icons/svg/shield.svg";
                    break;
                case "Defesa Mental":
                    img = "icons/svg/book.svg";
                    break;
                default:
                    img = "icons/svg/dice-target.svg"; // ícone genérico
                    break;
            }

            macro = await Macro.create({
                name: macroName,
                type: "chat",
                img: img,
                command
            });
        }

        // Prepara os dados de arraste
        const dragData = macro.toDragData();
        event.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    }

    async _onAttackRoll(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let hit = element.dataset.hit;
        let damage = element.dataset.damage;
        let criticalDamage = element.dataset.criticalDamage;
        let type = element.dataset.type;
        let traits = element.dataset.traits;

        let traitsList = [];

        try {
            traitsList = JSON.parse(element.dataset.traitsList);
        } catch (e) {
            console.error("Erro ao parsear traitsList:", e);
        }

        Dice.AttackRoll({
            actor: this.actor,
            hit: hit,
            damage: damage,
            criticalDamage: criticalDamage,
            type: type,
            traits: traits,
            traitsList: traitsList
        })
    }

    async _onTraitSelected(event) {
        event.preventDefault();

        const currentItem = this.object;
        const value = event.currentTarget.value;
        const traitName = value.split('|')[0];
        const traitDescription = value.split('|')[1];

        console.log("currentItem", currentItem)
        console.log("value", value)
        console.log("traitName", traitName)
        console.log("traitDescription", traitDescription)

        // let traitsList = currentItem.system.traits;

        // function filterTraits(arr, value) { 
        //     return arr.filter(function(trait) { 
        //         return trait.label == value; 
        //     });
        // }

        // const filter = filterTraits(traitsList, traitName)

        // if (filter.length == 0) {
        //     if (traitName != "none") {
        //         const newTrait = {
        //             "label": traitName,
        //             "description": traitDescription
        //         }
        
        //         traitsList.push(newTrait)
        
        //         return await currentItem.update({
        //             system: {
        //                 traits: traitsList
        //             }
        //         });
        //     }
        // }
    }
}