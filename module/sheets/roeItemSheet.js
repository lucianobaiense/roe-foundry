export default class roeItemSheet extends ItemSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["roe", "sheet", "item"],
            height: 500,
            template: "systems/roe/templates/sheets/items/item-sheet.hbs",
            width: 600,
        });
    }

    async getData(options) {
        const context = await super.getData(options);
        context.config = CONFIG.roe
        context.system = context.data.system;

        return context
    }
}