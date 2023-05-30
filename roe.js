import { roe } from "./module/config.js"
import roeItemSheet from "./module/sheets/roeItemSheet.js";
import roeProtagonistSheet from "./module/sheets/roeProtagonistSheet.js"

Hooks.once("init", function() {
    console.log("roe | Initialising Resonance of Ether System")

    CONFIG.roe = roe;

    Actors.unregisterSheet("core", ActorSheet)
    Actors.registerSheet("roe", roeProtagonistSheet, { makeDefault: true })

    Items.unregisterSheet("core", ItemSheet)
    Items.registerSheet("roe", roeItemSheet, { makeDefault: true })
});