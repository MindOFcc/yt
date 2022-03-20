const { Client, Message, MessageEmbed } = require('discord.js');
const djsGames = require('djs-games')
const RockPaperScissors = new djsGames.RockPaperScissors()

module.exports = {
    name: 'rockpaperdcissors',
    aliases: ['rpc'],
    categories : 'discord_games',
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first()
        message.channel.send(
            new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Ihr Spiel beginnt, bitte warten...`)
                .setAuthor(message.author.tag)
                .setFooter(`CaeliBots | Test`)
                .setTimestamp(5000)
        ).then(msg => {
            msg.delete({ timeout: 5000 })
            if (!user) return message.channel.send(
                new MessageEmbed()
                    .setTitle(`Bitte erwähnen Sie Ihren Freund, um das Spiel zu spielen.`)
            ).then(hehe => {
                hehe.delete({ timeout: 5000 })
            })
            setTimeout(() => {
                RockPaperScissors.startGame(message)
            }, 5000);
        })


    }
}