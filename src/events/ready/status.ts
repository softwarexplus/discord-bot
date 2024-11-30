import { Client, ActivityType } from "discord.js"

export async function status(client: Client<true>) {
    client.user.setPresence({
        status: "online",
        activities: [
            {
                name: "Something Cool",
                type: ActivityType.Watching
            }
        ]
    })
}
