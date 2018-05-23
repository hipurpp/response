const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log(`Impossible de trouver les fichiers de commandes | Erreur le `+ moment().format('YYYY-MM-DD'));
      return;
    }
  
    jsfile.forEach((f, i) =>{ 
      let props = require(`./commands/${f}`);
      console.log(`Le fichier ${f} est maintenant chargé.`);
      bot.commands.set(props.help.name, props);
    });
  });

  bot.on("ready", async () => {
    console.log(`${bot.user.username} est maintenant en ligne et opérationnel | Démarrage effectué le `+ moment().format('YYYY-MM-DD'));
    bot.user.setActivity("le peuple | +signaler", {type: "WATCHING"});
  
  });

  bot.on('disconnect', () =>{
    console.log(`Déconnexion à : ${new Date()}`);
  });
  
  bot.on('reconnecting', () => {
    console.log(`Reconnexion à : ${new Date()}`);
  });

  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = "+";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    
  
  });

  bot.on("guildMemberAdd", member => {

    const embed = new Discord.RichEmbed()
    
    
    .setAuthor("Un nouveau membre est là !", member.user.avatarURL)
    .setColor('RANDOM')
    .addField("Nom d'utilisateur", `${member.user.username}#${member.user.discriminator}` ,true)
    .addField("ID du compte", member.id ,true)
    .addField("Compte créé le", `${moment.utc(member.user.createdAt).format("MM/DD/YYYY, h:mm:ss a")}` ,true)
    .addField("À rejoint le", `${moment.utc(member.user.joinedAt).format("MM/DD/YYYY, h:mm:ss a")}` ,true)
    .addBlankField()
    .addField("Status", member.presence.status, true)
    .addField("BOT ?", member.user.bot, true)
    .setFooter("Souhaitez-lui la bienvenue.")
    .setThumbnail(member.user.avatarURL)
  
    .setTimestamp()
  
    member.guild.channels.find('name', 'log_nouveau').send({embed})
    console.log(`${member.user.username}#${member.user.discriminator} | ${member.id} est arrivé sur le serveur le `+ moment().format('YYYY-MM-DD'));
  });
  
  bot.login(process.env.TOKEN);
