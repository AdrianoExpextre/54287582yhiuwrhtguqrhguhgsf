const cfg = require("../config.json");
const Discord = require('discord.js');
const key = process.env.YT_API;
const fs = require("fs");
const moment = require("moment");
const yt = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(key);
const opus = require("opusscript");
const gyp = require("node-gyp");
var fetchVideoInfo = require('youtube-info');
var db = require('../database.js');


exports.run = async(music, message, args, queue) => {
db.Bloqueio.findOne({"_id": message.author.id}, function (erro, documento) {
                if(documento) {
         if (!['244489368717230090'].includes(message.author.id))
                
 if ([documento.block].includes(message.author.id)) return message.channel.send(`<:xguardian:476061993368027148> ${message.author}, você foi bloqueado de usar comandos do **Sysop**, se você acha que isso é um engano nos contate!`);
        
}});

  
  //if (!['244489368717230090'].includes(message.author.id)) return message.channel.send(`<:sysalerta:469789950938841088> Opa ${message.author}, comando em manutenção!`);

  
  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  let o = message.mentions.users.first() ? message.mentions.users.first().username : message.author.username;
  let fotinha = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL
const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send(`<:sysalerta:469789950938841088> Opa ${message.author} você não está em um canal de voz!`);
    if (searchString <1) return message.reply(`<:sysalerta:469789950938841088> ${message.author}, você deve especificar o nome da música ou adicionar um URL!`);
    
    const permissions = voiceChannel.permissionsFor(music.user);
    if (!permissions.has('CONNECT')) {
      return message.channel.send(`<:xguardian:476061993368027148> Opa ${message.author}, Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!`);
    } 
    if (!permissions.has('SPEAK')) {
      return message.channel.send(`<:xguardian:476061993368027148> Opa ${message.author}! Eu não posso falar neste canal de voz, verifique se eu tenho as permissões adequadas!`);
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return message.channel.send(`<a:discoSong:483871229741105163> | **${playlist.title}** foi adicionado à fila por ${message.author.username}`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 5);
          let index = 0;
          
          
          /*const embed = new Discord.RichEmbed()
          .setTitle("<a:som:447056441556205570> Selecione uma música <a:som:447056441556205570>")
          .setDescription(videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n'))
          .setFooter("Defina um valor para selecionar a música entre 1 a 10!")
          .setColor('#fd5927')*/ //${song.durationm}:${durations}
          
          let msgtoDelete = await message.channel.send(`<a:discoSong:483871229741105163> | **Selecione uma música da lista**\n${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`);
          // eslint-disable-next-line max-depth
          try {
            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
              maxMatches: 1,
              time: 20000,
              errors: ['time']
            });
            msgtoDelete.delete();
          } catch (err) {
            console.error(err);
            message.channel.send(`:shrug::skin-tone-2: | Passou-se **20** segundos e nenhuma resposta. Cancelado seleção da música!`);
            msgtoDelete.delete()
            return;
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return message.channel.send('<:sysalerta:469789950938841088> Não consegui obter nenhum resultado.');
        } 
      }
      return handleVideo(video, message, voiceChannel);
    }

    // Time for the functions
      
async function handleVideo(video, message, voiceChannel, playlist = false) {
    
  const serverQueue = queue.get(message.guild.id);
  console.log(video);
    
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
  };
  if (!serverQueue) {
    const queueConstruct = { 
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      skippers: [],
      songs: [],
      volume: 8,
      playing: true
    };
    
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
    }
  } else {
    fetchVideoInfo(`${video.id}`).then(function (v) {    
      
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
      
    else return message.channel.send(`:notes: **${v.title}** foi adicionado por \`${message.author.username}\``);
          })  
         
}
  return undefined;


}


function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

const dispatcher = serverQueue.connection.playStream(yt(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            setTimeout(() => {
                play(guild, serverQueue.songs[0]);
            }, 250);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    //Modified playing messages that give you the song duration!
    fetchVideoInfo(`${song.id}`).then(function (v) {    
      
    let durations = song.durations - 1
  var secondslength = Math.log(durations) * Math.LOG10E + 1 | 0;
  var mlength = Math.log(song.durationm) * Math.LOG10E + 1 | 0;
  if(song.durationh !== 0) {
    if(secondslength == 1 || secondslength == 0) {
      if(mlength == 1 || mlength == 0) {
      return serverQueue.textChannel.send(`Tocando: **[${song.title}](https://www.youtube.com/watch?v=${video.id})** (${song.durationh}:0${song.durationm}:0${durations})`);
  }}}
  if(song.durationh !== 0) {
    if(secondslength == 1 || secondslength == 0) {
      if(mlength !== 1 || mlength !== 0) {
    const embed2 = new Discord.RichEmbed()
      
         .setAuthor(o, fotinha)
         .setDescription(`[${v.title}](${v.url})`)
         .addField('Duração',"00:00/"+`${song.durationm}:${durations}`,true)
         .addField('Visualizações:', Number(v.views).toLocaleString(),true)
        
         .addField('Gostei', Number(v.likeCount).toLocaleString(),true)
         .addField('Não gostei', Number(v.dislikeCount).toLocaleString(),true)
         .addField("Comentários:", Number(v.commentCount).toLocaleString())
         .setThumbnail(v.thumbnailUrl)
         .setTimestamp()
         .setFooter( message.guild.name , message.guild.iconURL )
         .setColor('#00d8ff');
         
      return serverQueue.textChannel.send(embed2);
    }}};
    if(song.durationh !== 0) {
      if(mlength == 1 || mlength == 0) {
        if(secondslength !== 1 || secondslength !== 0) {
    const embed3 = new Discord.RichEmbed()
      
         .setAuthor(o, fotinha)
         .setDescription(`[${v.title}](${v.url})`)
         .addField('Duração',"00:00/"+`${song.durationm}:${durations}`,true)
         .addField('Visualizações:', Number(v.views).toLocaleString(),true)
        
         .addField('Gostei', Number(v.likeCount).toLocaleString(),true)
         .addField('Não gostei', Number(v.dislikeCount).toLocaleString(),true)
         .addField("Comentários:", Number(v.commentCount).toLocaleString())
         .setThumbnail(v.thumbnailUrl)
         .setTimestamp()
         .setFooter( message.guild.name , message.guild.iconURL )
         .setColor('#00d8ff');
         
      return serverQueue.textChannel.send(embed3);;
    }}}
    if(song.durationh !== 0) {
      if(mlength !== 1 || mlength !== 0) {
        if(secondslength !== 1 || secondslength !== 0) {
const embed4 = new Discord.RichEmbed()
      
         .setAuthor(o, fotinha)
         .setDescription(`[${v.title}](${v.url})`)
         .addField('Duração',"00:00/"+`${song.durationm}:${durations}`,true)
         .addField('Visualizações:', Number(v.views).toLocaleString(),true)
        
         .addField('Gostei', Number(v.likeCount).toLocaleString(),true)
         .addField('Não gostei', Number(v.dislikeCount).toLocaleString(),true)
         .addField("Comentários:", Number(v.commentCount).toLocaleString())
         .setThumbnail(v.thumbnailUrl)
         .setTimestamp()
         .setFooter( message.guild.name , message.guild.iconURL )
         .setColor('#00d8ff');
         
      return serverQueue.textChannel.send(embed4);
    }}}
    if(song.durationh == 0 && song.durationm !== 0) {
      if(secondslength == 1 || secondslength == 0) {
     const embed5 = new Discord.RichEmbed()
      
         .setAuthor(o, fotinha)
         .setDescription(`[${v.title}](${v.url})`)
         .addField('Duração',"00:00/"+`${song.durationm}:${durations}`,true)
         .addField('Visualizações:', Number(v.views).toLocaleString(),true)
        
         .addField('Gostei', Number(v.likeCount).toLocaleString(),true)
         .addField('Não gostei', Number(v.dislikeCount).toLocaleString(),true)
         .addField("Comentários:", Number(v.commentCount).toLocaleString())
         .setThumbnail(v.thumbnailUrl)
         .setTimestamp()
         .setFooter( message.guild.name , message.guild.iconURL )
         .setColor('#00d8ff');
         
      return serverQueue.textChannel.send(embed5);
    }}
    if(song.durationh == 0 && song.durationm !== 0) {
      if(secondslength !== 1 || secondslength !== 0) {
        const embed6 = new Discord.RichEmbed()
      
         .setAuthor(o, fotinha)
         .setDescription(`[${v.title}](${v.url})`)
         .addField('Duração',"00:00/"+`${song.durationm}:${durations}`,true)
         .addField('Visualizações:', Number(v.views).toLocaleString(),true)
        
         .addField('Gostei', Number(v.likeCount).toLocaleString(),true)
         .addField('Não gostei', Number(v.dislikeCount).toLocaleString(),true)
         .addField("Comentários:", Number(v.commentCount).toLocaleString())
         .setThumbnail(v.thumbnailUrl)
         .setTimestamp()
         .setFooter( message.guild.name , message.guild.iconURL )
         .setColor('#00d8ff');
         
      return serverQueue.textChannel.send(embed6);
    }}
    if(song.durationh == 0 && song.durationm == 0 && song.durations !== 0) {
 const embed7 = new Discord.RichEmbed()
      
         .setAuthor(o, fotinha)
         .setDescription(`<:movie_play_light_green:447056994398896159> [${v.title}](${v.url})`)
         .addField('Duração',"00:00/"+`${song.durationm}:${durations}`,true)
         .addField('Visualizações:', Number(v.views).toLocaleString(),true)
        
         .addField('Gostei', Number(v.likeCount).toLocaleString(),true)
         .addField('Não gostei', Number(v.dislikeCount).toLocaleString(),true)
         .addField("Comentários:", Number(v.commentCount).toLocaleString())
         .setThumbnail(v.thumbnailUrl)
         .setTimestamp()
         .setFooter( message.guild.name , message.guild.iconURL )
         .setColor('#00d8ff');
         
      return serverQueue.textChannel.send(embed7);
    } else {
        const embed8 = new Discord.RichEmbed()
      
         .setAuthor(o, fotinha)
         .setDescription(`[${v.title}](${v.url})`)
         .addField('Duração',"00:00/"+`${song.durationm}:${durations}`,true)
         .addField('Visualizações:', Number(v.views).toLocaleString(),true)
        
         .addField('Gostei', Number(v.likeCount).toLocaleString(),true)
         .addField('Não gostei', Number(v.dislikeCount).toLocaleString(),true)
         .addField("Comentários:", Number(v.commentCount).toLocaleString())
         .setThumbnail(v.thumbnailUrl)
         .setTimestamp()
         .setFooter( message.guild.name , message.guild.iconURL )
         .setColor('#00d8ff');
         
      return serverQueue.textChannel.send(embed8);

            }
          })
}

} 


exports.help = {
    name: "play",
    description: "Toca a música para você",
    usage: "r!play [name] || [url] || [playlist-url]"
}
