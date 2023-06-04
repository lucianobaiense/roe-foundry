export default class roeItem extends Item {
    chatTemplate = {
        "equipment": "systems/roe/templates/sheets/items/equipment-sheet.hbs"
    };

    async roll() {
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({actor: this.actor})
        };

        let cardData = {
            ...this.data,
            owner: this.actor.id
        };

        chatData.content = await renderTemplate(this.chatTemplate[this.type], cardData);

        chatData.roll = true;

        return ChatMessage.create(chatData)
    }
}