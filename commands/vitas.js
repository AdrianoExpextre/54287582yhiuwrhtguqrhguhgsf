const  ytdl = require('ytdl-core')
exports.run = (music, message, args) => {

if (!message.member.voiceChannel) 
return message.channel.send(`<:xguardian:476061993368027148> ${message.author} conecte-se a um canal de voz primeiro!`)

if (message.guild.members.get(music.user.id).voiceChannel) 
return message.channel.send(`<:xguardian:476061993368027148> Opa ${message.author}! já estou conectado no canal **${message.guild.members.get(music.user.id).voiceChannel.name}**`)

const voiceChannel = message.member.voiceChannel;
const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
      return message.channel.send(`<:xguardian:476061993368027148> Opa ${message.author}, Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!`);
    } 
    if (!permissions.has('SPEAK')) {
      return message.channel.send(`<:xguardian:476061993368027148> Opa ${message.author}! Eu não posso falar neste canal de voz, verifique se eu tenho as permissões adequadas!`);
    }

var asdasd = { "URL": "https://youtube.com/watch?v=j4jS5ZYp4kc" }
voiceChannel.join().then(connection => {

let vitas = 'https://www.youtube.com/watch?v=j4jS5ZYp4kc';  
const url = ytdl(vitas, { filter: 'audioonly' });
const dispatcher = connection.playStream(url);

    
});  
};
