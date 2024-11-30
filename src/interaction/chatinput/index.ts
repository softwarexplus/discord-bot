import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js"
import { CommandObject } from "../../type"

export default [require("./pong")] as Array<CommandObject<RESTPostAPIApplicationCommandsJSONBody>>
