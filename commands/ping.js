const Discord = require("discord.js");
const config = require("../config.json");
const moment = require("moment");


module.exports.run = async (bot, message, args) => {
    
    message.delete().catch(O_o=>{});
    
    if(message.author.id !== config.ownerID)
    { 
      let noPerms = new Discord.RichEmbed()
      .addField("Alerte :no_entry_sign: ", message.author + " n'est pas autorisé à utiliser cette commande !")
      .setColor('RANDOM')
      message.channel.send(noPerms);
    }
    else
    {
      let pingEmbed = new Discord.RichEmbed()
      .addField("Pong! :ping_pong:", `${Date.now() - message.createdTimestamp} ms`)
      .setColor('RANDOM')

      message.channel.send(pingEmbed);
      console.log(`${message.author} a effectué un test de ping le `+ moment().format('YYYY-MM-DD'));

    }

    return;

}
 
module.exports.help = {
  name: "ping"
}