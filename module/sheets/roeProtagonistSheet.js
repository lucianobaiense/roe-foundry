export default class roeProtagonistSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 600,
            height: 900,
            classes: ["roe", "sheet", "protagonist"]
        });
    }

    get template() {
        return `systems/roe/templates/sheets/actors/${this.actor.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.roe;
        
        return data;
    }
}