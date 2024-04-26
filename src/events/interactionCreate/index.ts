import { Button, ChatInput, Context, Modal, SelectMenu } from "../../interaction";
import { Interaction, RepliableInteraction } from "discord.js";

export default async function interaction(interaction: Interaction) {
    switch (true) {
        case interaction.isChatInputCommand():
            const command = ChatInput.find((cmd) => cmd.data.name === interaction.commandName);
            if (!command || typeof command.run !== "function") return xcf(interaction, "404 - Unknown Command");
            command.run(interaction);
            break;

        case interaction.isContextMenuCommand():
            const context = Context.find((cmd) => cmd.data.name === interaction.commandName);
            if (!context || typeof context.run !== "function") return xcf(interaction, "404 - Unknown Command");
            context.run(interaction);
            break;

        case interaction.isButton():
            const button = Button.get(interaction.customId);
            if (interaction.deferred || interaction.replied) return;
            if (button && typeof button === "function") button(interaction);
            break;

        case interaction.isModalSubmit():
            const modal = Modal.get(interaction.customId);
            if (interaction.deferred || interaction.replied) return;
            if (modal && typeof modal === "function") modal(interaction);
            break;

        case interaction.isAnySelectMenu():
            const selectmenu = SelectMenu.get(interaction.customId);
            if (interaction.deferred || interaction.replied) return;
            if (selectmenu && typeof selectmenu === "function") selectmenu(interaction);
            break;

        case interaction.isAutocomplete():
            // Handle it yourself
            break;

        default:
            xcf(interaction as RepliableInteraction);
    }
}

function xcf(interaction: RepliableInteraction, message?: string) {
    throw new Error("Function not implemented.");
}
