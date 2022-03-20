const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync } = require("fs");
const config = require("../../config/config.json");
let prefix = config.prefix

module.exports = {
  name: 'help',
  aliases: ['h'],
  categories : 'info',
  description: 'Zeigt alle verfügbaren Bot-Befehle an',
  useage: 'help',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, user) => {
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
      .setTitle("HELP MENU 🔰 Commands")
      .addField(`Discord FunBot || Information`, `\n**Prefix**: \`${prefix}\`\n**CaeliBots Website**: https://caelibots.de/\n**Support**: https://discord.gg/6Hehgvbep8`, false)
      .addFields(categories)
        .addFields(categories)
        .setDescription(
          ``
        )
        .setFooter(`Discord FunBot || Version: v2.0.1💖`, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RED")
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Ungültiger Befehl! Verwenden Sie \`${prefix}help\` für alle meine Befehle!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .setThumbnail(client.user.displayAvatarURL())
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "Kein Name für diesen Befehl."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Keine Aliase für diesen Befehl."
        )
        .addField(
          "VERWENDUNGSZWECK:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "Keine Beschreibung für diesen Befehl."
        )
        .setFooter(
          `Angefordert von ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  }
}