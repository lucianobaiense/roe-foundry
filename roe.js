import { roe } from "./module/config.js"
import roeItemSheet from "./module/sheets/roeItemSheet.js";
import roeActorSheet from "./module/sheets/roeActorSheet.js"

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/roe/templates/partials/antagonist/antagonist-sheet.hbs",
        "systems/roe/templates/partials/antagonist/information.hbs",
        "systems/roe/templates/partials/protagonist/protagonist-sheet.hbs",
        "systems/roe/templates/partials/protagonist/abilities.hbs",
        "systems/roe/templates/partials/protagonist/actions.hbs",
        "systems/roe/templates/partials/protagonist/attributes.hbs",
        "systems/roe/templates/partials/protagonist/equipments.hbs",
        "systems/roe/templates/partials/protagonist/information.hbs",
        "systems/roe/templates/partials/protagonist/notes.hbs",
        "systems/roe/templates/partials/protagonist/skills.hbs",
        "systems/roe/templates/partials/protagonist/spells.hbs",
        "systems/roe/templates/partials/items/ability-sheet.hbs",
        "systems/roe/templates/partials/items/action-sheet.hbs",
        "systems/roe/templates/partials/items/equipment-sheet.hbs",
        "systems/roe/templates/partials/items/skill-sheet.hbs",
        "systems/roe/templates/partials/items/spell-sheet.hbs",
        "systems/roe/templates/partials/items/trait-sheet.hbs"
    ];

    return loadTemplates(templatePaths);
};

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