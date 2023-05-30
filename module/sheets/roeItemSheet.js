export default class roeItemSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 600,
            height: 500,
            classes: ["roe", "sheet", "item"]
        });
    }

    get template() {
        return `systems/roe/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.roe;
        
        return data;
    }
}