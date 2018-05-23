const Discord = require("discord.js");
const moment = require("moment");


module.exports.run = async (bot, message, args) => {
    
    message.delete().catch(O_o=>{});

      let pingEmbed = new Discord.RichEmbed()
      .addField("Pong! :ping_pong:", `${Date.now() - message.createdTimestamp} ms`)
      .setColor('RANDOM')

      message.channel.send(pingEmbed).then(message => message.delete(5000));
      console.log(`${message.author} a effectué un test de ping le `+ moment().format('YYYY-MM-DD'));

    return;

}
 
module.exports.help = {
  name: "ping"
}
