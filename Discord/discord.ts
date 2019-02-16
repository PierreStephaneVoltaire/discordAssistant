import { Client, WebhookClient, } from "discord.js"
import Dialog from "../dialogflow/dialogflow"
const prefix = "!";


class Bot {
  private readonly client: Client;
  constructor() {
    this.client = new Client();
    this.client.on("ready", () => {
      console.log("I am ready!");
    });

    this.client.on("message", (message) => {
      if (!message.content.startsWith(prefix) || message.author.bot) return;

      console.log(message.channel.id)

      // if(message.channel.id)

      if (message.content.startsWith(prefix + "hello")) {
        const handler = new Dialog()
        handler.handleQuerry(message.content).then((messages) => {
          message.channel.send(messages.toString());
        }).catch((e) => {
          console.log(e)
        })
      }


    });

    this.client.login(process.env.DISCORD_APP_TOKEN);

  }


  getChannel() {
    this.client.guilds.forEach((guild) => {
      console.log(" - " + guild.name)
      guild.channels.forEach((channel) => {
        console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
      })
    })
  }


}






