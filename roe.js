import { roe } from "./module/config.js"
import roeItemSheet from "./module/sheets/roeItemSheet.js";
import roeProtagonistSheet from "./module/sheets/roeProtagonistSheet.js"

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/roe/templates/partials/protagonist/abilities.hbs",
        "systems/roe/templates/partials/protagonist/actions.hbs",
        "systems/roe/templates/partials/protagonist/attributes.hbs",
        "systems/roe/templates/partials/protagonist/equipments.hbs",
        "systems/roe/templates/partials/protagonist/information.hbs",
        "systems/roe/templates/partials/protagonist/notes.hbs",
        "systems/roe/templates/partials/protagonist/skills.hbs",
        "systems/roe/templates/partials/protagonist/spells.hbs",
    ];

    return loadTemplates(templatePaths);
};

Hooks.once("init", async function() {
    console.log("roe | Initialising Resonance of Ether System")

    CONFIG.roe = roe;

    Actors.unregisterSheet("core", ActorSheet)
    Actors.registerSheet("roe", roeProtagonistSheet, { makeDefault: true })

    Items.unregisterSheet("core", ItemSheet)
    Items.registerSheet("roe", roeItemSheet, { makeDefault: true })

    preloadHandlebarsTemplates();
});