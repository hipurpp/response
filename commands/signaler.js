const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    
    let cible = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let raison = args.slice(1).join(' ');
    let salon = message.guild.channels.find('name', 'report');
    message.delete().catch(O_o=>{});

    if(!args[0]) return message.channel.send({embed: {
      color: 4886754,
      title: "Information :information_source:",
      description: `**+signaler <@pseudo> <raison>** \n\n Tout abus du système de signalement sera **sanctionné** ${message.author}`,
      
    }}).then(message => message.delete(5000));
    
    /// ///

    if(!cible) return message.channel.send({embed: {
      color: 13632027,
      title: "Alerte :no_entry_sign:",
      description: "Vous devez spécifier un utilisateur " + message.author,
      
    }}).then(message => message.delete(5000));

    /// /// 
    
    if(!raison) return message.channel.send({embed: {
      color: 13632027,
      title: "Alerte :no_entry_sign:",
      description: "Vous devez spécifier une raison " + message.author,

    }}).then(message => message.delete(5000));

    /// ///

    if(!salon) return message.channel.send({embed: {
      color: 13632027,
      title: "Erreur :interrobang: ",
      description: "Impossible d'envoyer le signalement " + message.author,

    }}).then(message => message.delete(5000));

    //////// EMBED ///////
    let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail("https://www.gstatic.com/images/branding/product/1x/admin_512dp.png")
      .setTitle("Signalement n° " + message.id)
      .addBlankField()
      .addField("Signalement par", `${message.author} • ID: ${message.author.id}`)
      .addField("Membre accusé", `${cible} • ID: ${cible.id}`)
      .addField('Raison', raison)
      .addField('Envoyé depuis le salon textuel', message.channel)
      .setTimestamp();

      message.channel.send({embed: {
        color: 8311585,
        title: "Alerte :pushpin:",
        description: `Votre signalement pour ${cible} a été reçu, nous vous contacterons très prochainement ` + message.author,
  
      }}).then(message => message.delete(10000));

      salon.send(embed);
      console.log(`${message.author} à signalé ${cible} le `+ moment().format('YYYY-MM-DD'));
    
      return;

}
 
module.exports.help = {
  name: "signaler"
}