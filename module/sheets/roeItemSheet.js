import traits from "../traits.js"

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
        context.traits = traits
        context.system = context.data.system;

        return context
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find(".trait-selected").change(this._onTraitSelected.bind(this));
        html.find(".trait-delete").click(this._onTraitDelete.bind(this));
    }

    async _onTraitSelected(event) {
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

    async _onTraitDelete(event) {
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
}