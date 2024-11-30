import { APIEmbed, DiscordAPIError, WebhookClient } from "discord.js"
import { inspect } from "node:util"
import config from "../config"

export function errorHandler(error: NonNullable<Error>, type = "Uncaught Exception", origin?: any) {
    if (error instanceof DiscordAPIError) {
        console.log(inspect({ ...error.rawError, ...error.requestBody }, { depth: 10, colors: true }))

        let text
        for (let depth = 10; !text || text.length > 4096; depth--) {
            if (depth > 0) {
                const rawError = inspect(error.rawError, false, 10)
                const requestBody = inspect(error.requestBody, false, depth)

                text = `\`\`\`js\n${rawError}\n${requestBody}`.concat(`\n\`\`\``)
                text = text + "```js\n" + (error.stack ?? "null") + "\n```"
            } else {
                text = "Error is too large to send"
            }
        }

        reply({ title: `Discord API Error (${error.code})`, description: text, timestamp: new Date().toISOString() })
    } else {
        console.log(error, origin)
        reply({ title: type, description: "```js\n" + error.stack + "\n```", timestamp: new Date().toISOString() })
    }
}

async function reply(embeds: APIEmbed) {
    const webhook = new WebhookClient({ url: config.webhook })
    try {
        return await webhook.send({ embeds: [embeds] })
    } catch (error) {
        return console.log(error)
    }
}
