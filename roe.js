import { roe } from "./module/config.js"
import roeItemSheet from "./module/sheets/roeItemSheet.js";
import roeActorSheet from "./module/sheets/roeActorSheet.js"

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        // Actors
        "systems/roe/templates/actors/actor-sheet.hbs",
        "systems/roe/templates/actors/protagonist/protagonist-sheet.hbs",
        "systems/roe/templates/actors/protagonist/components/logo.hbs",
        "systems/roe/templates/actors/protagonist/components/information.hbs",
        "systems/roe/templates/actors/protagonist/components/level.hbs",
        "systems/roe/templates/actors/protagonist/components/experience.hbs",
        "systems/roe/templates/actors/protagonist/components/resources.hbs",
        "systems/roe/templates/actors/protagonist/components/essences.hbs",
        "systems/roe/templates/actors/protagonist/components/attributes.hbs",
        "systems/roe/templates/actors/protagonist/components/goals.hbs",
        "systems/roe/templates/actors/protagonist/components/abilities.hbs",
        "systems/roe/templates/actors/protagonist/components/combat.hbs",
        "systems/roe/templates/actors/protagonist/components/inventory.hbs",
        "systems/roe/templates/actors/protagonist/components/notes.hbs",
        "systems/roe/templates/actors/antagonist/antagonist-sheet.hbs",
        
        // Items
        "systems/roe/templates/items/items-sheet.hbs",
        "systems/roe/templates/items/components/ability-component.hbs",
        "systems/roe/templates/items/components/action-component.hbs",
        "systems/roe/templates/items/components/inventory-component.hbs",

        // Chat
        "systems/roe/templates/chat/ability-chat.hbs",
        "systems/roe/templates/chat/action-chat.hbs",
        "systems/roe/templates/chat/basic-action-chat.hbs",
        "systems/roe/templates/chat/career-chat.hbs",
        "systems/roe/templates/chat/inventory-chat.hbs"


        // "systems/roe/templates/protagonist.hbs",
        // "systems/roe/templates/partials/antagonist/antagonist-sheet.hbs",
        // "systems/roe/templates/partials/antagonist/information.hbs",
        // "systems/roe/templates/partials/protagonist/protagonist-sheet.hbs",
        // "systems/roe/templates/partials/protagonist/abilities.hbs",
        // "systems/roe/templates/partials/protagonist/actions.hbs",
        // "systems/roe/templates/partials/protagonist/attributes.hbs",
        // "systems/roe/templates/partials/protagonist/equipments.hbs",
        // "systems/roe/templates/partials/protagonist/information.hbs",
        // "systems/roe/templates/partials/protagonist/notes.hbs",
        // "systems/roe/templates/partials/protagonist/skills.hbs",
        // "systems/roe/templates/partials/protagonist/spells.hbs",
        // "systems/roe/templates/partials/items/ability-sheet.hbs",
        // "systems/roe/templates/partials/items/action-sheet.hbs",
        // "systems/roe/templates/partials/items/equipment-sheet.hbs",
        // "systems/roe/templates/partials/modals/attribute-modal.hbs"
    ];

    return loadTemplates(templatePaths);
};

Hooks.on("createActor", (actor) => {
    if (actor.type == "protagonist") {
        actor.update({
            "system.water": "none",
            "system.air": "none",
            "system.fire": "none",
            "system.earth": "none",
            "system.light": "none",
            "system.darkness": "none",
            "system.moon": "none",
            "system.nature": "none",
        });
    }
  });

Hooks.once("init", async function() {
    console.log("roe | Initialising Resonance of Ether System")

    CONFIG.roe = roe;

    CONFIG.Combat.initiative = {
        formula: "2d6 + @dexterity.value + @dexterity.modifier"
    };

    Actors.unregisterSheet("core", ActorSheet)
    Actors.registerSheet("roe", roeActorSheet, { makeDefault: true })

    Items.unregisterSheet("core", ItemSheet)
    Items.registerSheet("roe", roeItemSheet, { makeDefault: true })

    Handlebars.registerHelper('safe', function(str) {
        return new Handlebars.SafeString(str);
    });

    Handlebars.registerHelper('joinItems', function (array, field) {
        return array.map(i => i[field]).join(', ')
    });
    
    preloadHandlebarsTemplates();
});