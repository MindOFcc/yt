const { Client, Message, MessageEmbed } = require('discord.js');
const djsGames = require('djs-games')
const SnakeGame = new djsGames.SnakeGame()

module.exports = {
    name: 'snack',
    aliases: ['snk'],
    categories : 'discord_games',
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.channel.send(
            new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Ihr Spiel beginnt, bitte warten...`)
                .setAuthor(message.author.tag)
                .setFooter(`CaeliBots | Test`)
                .setTimestamp(5000)
        ).then(msg => {
            msg.delete({ timeout: 5000 })
            setTimeout(() => {
                SnakeGame.startGame(message)
            }, 5000);
        })

    }
}