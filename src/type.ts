import { RESTPostAPIApplicationCommandsJSONBody, RepliableInteraction } from "discord.js"

export interface CommandObject<CommandType extends RESTPostAPIApplicationCommandsJSONBody> {
    data: CommandType
    run: (arg: RepliableInteraction) => any
}
