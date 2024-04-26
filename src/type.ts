import { RESTPostAPIApplicationCommandsJSONBody, RepliableInteraction } from "discord.js";

export {
    RESTPostAPIChatInputApplicationCommandsJSONBody as ChatInputCommandData,
    RESTPostAPIContextMenuApplicationCommandsJSONBody as ContextMenuCommandData
} from "discord.js";

export interface CommandObject<CommandType extends RESTPostAPIApplicationCommandsJSONBody> {
    data: CommandType;
    run: (arg: RepliableInteraction) => any;
}
