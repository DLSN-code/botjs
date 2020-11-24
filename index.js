const Discord = require('discord.js');
const client = new Discord.Client();
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;


  client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});



//Вместо инстансов GuildMember, используются инстансы VoiceState, что равносильно member.voice
const botconfig = {
  voice: "779524972682674217",
  parent: "779524892876996648"
}
//Вместо инстансов GuildMember, используются инстансы VoiceState, что равносильно member.voice
client.on("voiceStateUpdate", (oldState, newState) => {
  if(!oldState.guild.channels.cache.has(botconfig.voice) || !oldState.guild.channels.cache.has(botconfig.voice)) throw Error("Не указано либо айди канала, либо айди категории")
  if(newState.channelID === botconfig.voice) {
    newState.guild.channels.create("┆🌀", {
      type: "VOICE",
      parent: botconfig.parent,
      permissionOverwrites: [
        {
           id: newState.guild.id, //Права для роли @everyone
           allow: ["VIEW_CHANNEL"]
        },
        {
          id: newState.member.id, //Права для создателя канала
          allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS"]
        }
      ]
    }).then(ch => newState.setChannel(ch))
  }
  //удаление канала, если в нем больше не осталось человек
  if(oldState.channel && !oldState.channel.members.size && oldState.channel.parentID === botconfig.parent && oldState.channelID !== botconfig.voice) oldState.channel.delete();
})




client.on('ready', () => {
  let myGuild = client.guilds.cache.get('766369530057719839');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get('779873444518952961');
  memberCountChannel.setName('┆🤼Участников: ' + memberCount)


  .then(result => console.log(result))
  .catch(error => console.log(error));
});

client.on('guildMemberAdd', member => {
  let myGuild = client.guilds.cache.get('766369530057719839');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get('779873444518952961');
  memberCountChannel.setName('┆🤼Участников: ' + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));
})

client.on('guildMemberRemove', member => {
  let myGuild = client.guilds.cache.get('766369530057719839');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get('779873444518952961');
  memberCountChannel.setName('┆🤼Участников: ' + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));
})


const colors = {
  "780856699082375208": "766555782128599051",
  "780851958071296041": "766555784469151764",
  "780851957975744614": "766746065583996960" // И так далее.
};
client.on("ready", () => {
const channelID = "766371872459456534",
   messageID = "766612280245878806";

// Внимание, данное действие нужно выполнять в ready ивенте. Тобишь тогда, когда бот запустится.
client.channels.cache.get(channelID).messages.fetch(messageID); // Добавляем сообщение в коллекцию.

client.on("messageReactionAdd", (r, user) => {
  if (user.bot || r.message.id != messageID || (!(r.emoji.id in colors) && !(r.emoji.name in colors))) return; 
  r.message.guild.member(user.id).roles.add(colors[(r.emoji.id in colors) ? r.emoji.id : r.emoji.name]);
});

client.on("messageReactionRemove", (r, user) => {
  if (user.bot || r.message.id != messageID || (!(r.emoji.id in colors) && !(r.emoji.name in colors))) return;
  r.message.guild.member(user.id).roles.remove(colors[(r.emoji.id in colors) ? r.emoji.id : r.emoji.name]);
});
})


client.login(token);