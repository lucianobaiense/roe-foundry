import { roe } from "./module/config.js"
import { traits } from "./module/traits.js"
import roeItemSheet from "./module/sheets/roeItemSheet.js";
import roeActorSheet from "./module/sheets/roeActorSheet.js"

// Preload Templates

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        // Actors
        "systems/roe/templates/actors/actor-sheet.hbs",
        "systems/roe/templates/actors/protagonist/protagonist-sheet.hbs",
        "systems/roe/templates/actors/protagonist/components/information.hbs",
        "systems/roe/templates/actors/protagonist/components/parameters.hbs",
        "systems/roe/templates/actors/protagonist/components/impulses.hbs",
        "systems/roe/templates/actors/protagonist/components/dissonances.hbs",
        "systems/roe/templates/actors/protagonist/components/skills.hbs",
        "systems/roe/templates/actors/protagonist/components/combat.hbs",
        "systems/roe/templates/actors/protagonist/components/abilities.hbs",
        "systems/roe/templates/actors/protagonist/components/inventory.hbs",
        "systems/roe/templates/actors/antagonist/antagonist-sheet.hbs",
        
        // Items
        "systems/roe/templates/items/item-sheet.hbs",
        "systems/roe/templates/items/components/ability-component.hbs",
        "systems/roe/templates/items/components/action-component.hbs",
        "systems/roe/templates/items/components/inventory-component.hbs",

        // Chat
        "systems/roe/templates/chat/ability-chat.hbs",
        "systems/roe/templates/chat/action-chat.hbs",
        "systems/roe/templates/chat/basic-action-chat.hbs",
        "systems/roe/templates/chat/attack-chat.hbs",
        "systems/roe/templates/chat/inventory-chat.hbs",
        "systems/roe/templates/chat/skill-chat.hbs"
    ];

    return foundry.applications.handlebars.loadTemplates(templatePaths);
};

// Open Dialogs in Actor Sheet

Hooks.on('renderActorSheet', (sheet, html) => {
  html.find('.show-dialog').on('click', async function () {
    const actor = sheet.actor;
    const templatePath = $(this).data('template') || "systems/roe/templates/dialogs/test-form.html";
    const title = $(this).data('label') || "Editar";

    // const content = await renderTemplate(templatePath, { actor });

    const content = await renderTemplate(templatePath, { 
      actor, 
      roe,
      traits
    });

    new Dialog({
      title,
      content,
      buttons: {
        save: {
          label: "Salvar",
          callback: async (dlgHtml) => {
            const form = dlgHtml[0].querySelector("form");
            if (!form) return;

            const inputs = Array.from(form.querySelectorAll("input[name],select[name],textarea[name]"));
            const updateData = {};

            for (const input of inputs) {
              const name = input.name;
              if (!name) continue;

              let value;

              if (input.type === "checkbox") {
                // Checkbox: usa checked (true/false)
                value = input.checked;
              } else if (input.type === "number" || input.dataset.dtype === "Number") {
                // Number: converte
                value = input.value === "" ? null : Number(input.value);
              } else {
                // Default: string
                value = input.value;
              }

              updateData[name] = value;
            }

            // Opcional: debug
            console.log("Actor update payload:", updateData);

            // Atualiza o actor com chaves em dot-notation
            await actor.update(updateData);
          }
        },
        cancel: { label: "Cancelar" }
      },
      default: "save"
    },{
      resizable: true,
      classes: ["custom-dialog"]
    }).render(true);
  });
});


Hooks.on('renderActorSheet', (sheet, html) => {
  html.find('.show-info').on('click', async function () {
    const actor = sheet.actor;
    const templatePath = $(this).data('template') || "systems/roe/templates/dialogs/test-form.html";
    const title = $(this).data('label') || "Editar";

    const content = await renderTemplate(templatePath, { actor });

    new Dialog({
      title,
      content,
      buttons: {
        close: { label: "Fechar" }
      },
      default: "close"
    },{
      resizable: true,
      classes: ["custom-dialog"]
    }).render(true);
  });
});

// Modify Chat Message

Hooks.on("renderChatMessageHTML", (message, html, data) => {
    // Só processa se a mensagem tiver um speaker com actorId
    if (!message?.speaker?.actor) return;

    // Só continua se for de um usuário com cor definida (não sistema)
    const user = message.author;
    if (!user || !user.color) return;

    const actor = game.actors.get(message.speaker.actor);
    if (!actor) return;

    const imgSrc = actor.token?.img || actor.img;
    if (!imgSrc) return;

    const userColor = user.color;
    html.style.borderLeft = `4px solid ${userColor}`;

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = actor.name;
    img.classList.add("chat-speaker-avatar");
    img.width = 36;
    img.height = 36;

    const header = html.querySelector(".message-header");
    const nameElement = header?.querySelector(".message-sender");

    if (header && nameElement) {
    nameElement.prepend(img);
    }
});

// System Initialization

Hooks.once("init", async function() {
    console.log("roe | Initialising Resonance of Ether System")

    CONFIG.roe = roe;

    CONFIG.Combat.initiative = {
        formula: "",
        decimals: 0 
    };

    foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet)
    foundry.documents.collections.Actors.registerSheet("roe", roeActorSheet, { makeDefault: true })

    foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet)
    foundry.documents.collections.Items.registerSheet("roe", roeItemSheet, { makeDefault: true })

    Handlebars.registerHelper('safe', function(str) {
        return new Handlebars.SafeString(str);
    });

    Handlebars.registerHelper("contains", function(array, label, options) {
        if (array && Array.isArray(array)) {
            const encontrado = array.some(obj => obj.label === label);
            return encontrado ? options.fn(this) : options.inverse(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper("getTraits", function (csv, traitsArray) {
        if (!csv || !Array.isArray(traitsArray)) return "";

        // Quebra a string passada no template em array
        const keys = String(csv).split(",").map(k => k.trim().toLowerCase());

        // Busca no array os traits cujo label case-insensitive bate
        const results = keys.map(key => {
            const found = traitsArray.find(t => t.label.toLowerCase() === key);
            return found
            ? `<div class="traits-action">
                    <p data-tooltip="${found.description}" data-tooltip-direction="UP">${found.label}</p>
                </div>`
            : `<p>${key} não encontrado</p>`;
        });

        // Retorna como HTML seguro
        return new Handlebars.SafeString(results.join("<br>"));
    });

    Handlebars.registerHelper("json", function (context) {
        try {
            return JSON.stringify(context);
        } catch (e) {
            console.error("Erro no helper json:", e, context);
        return "null";
        }
    });
    
    preloadHandlebarsTemplates();
});