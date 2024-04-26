import { ChatInputCommandInteraction } from "discord.js";
import { ChatInputCommandData } from "../../type";

export const data: ChatInputCommandData = {
    name: "ping",
    description: "Pong",
    dm_permission: false
};

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    interaction.followUp({
        embeds: [
            {
                color: 0x5865f2,
                description: `Pong! Client: ${ping}ms \nWebsocket: ${interaction.client.ws.ping}ms`
            }
        ]
    });
}
