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
var Jimp = require("jimp");


exports.run = async(music, message, args, queue) => {
db.Bloqueio.findOne({"_id": message.author.id}, function (erro, documento) {
                if(documento) {
         if (!['244489368717230090'].includes(message.author.id))
                
 if ([documento.block].includes(message.author.id)) return message.channel.send(`<:xguardian:476061993368027148> ${message.author}, você foi bloqueado de usar comandos do **Sysop**, se você acha que isso é um engano nos contate!`);
        
}});

  
  if (!['244489368717230090'].includes(message.author.id)) return message.channel.send(`<:sysalerta:469789950938841088> Opa ${message.author}, comando em manutenção!`);

  
  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  let o = message.mentions.users.first() ? message.mentions.users.first().username : message.author.username;
  let fotinha = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL
  const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send(`<:sysalerta:469789950938841088> Opa ${message.author} você não está em um canal de voz!`);
    if (searchString <1) return message.channel.send(`<:sysalerta:469789950938841088> ${message.author}, você deve especificar o nome da música ou adicionar um URL!`);
  
  /* if (message.guild.members.get(music.user.id).voiceChannel) 
   return message.channel.send(`<:xguardian:476061993368027148> Opa ${message.author}! já estou conectado no canal **${message.guild.members.get(music.user.id).voiceChannel.name}**`)
 */
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
          var videos = await youtube.searchVideos(searchString, 6);
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
      volume: 6,
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
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 3);

    //Modified playing messages that give you the song duration!
    fetchVideoInfo(`${song.id}`).then(function (v) {    
      
    let durations = song.durations - 1
  var secondslength = Math.log(durations) * Math.LOG10E + 1 | 0;
  var mlength = Math.log(song.durationm) * Math.LOG10E + 1 | 0;
  if(song.durationh !== 0) {
    if(secondslength == 1 || secondslength == 0) {
      if(mlength == 1 || mlength == 0) {
      return serverQueue.textChannel.send(`<a:discoSong:483871229741105163> Tocando agora: **${song.title}** **(${song.durationh}:0${song.durationm}:0${durations})**`);
  }}}
  /*if(song.durationh !== 0) {
    if(secondslength == 1 || secondslength == 0) {
      if(mlength !== 1 || mlength !== 0) {
      let p1  =  Jimp.read(v.thumbnailUrl);
       let p2  =  Jimp.read('https://cdn.discordapp.com/attachments/485376421271961600/497045442362867762/CardMusicSysop.png');
       let p3 =   Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
       let p4 =   Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
       let p5  =  Jimp.read("https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png");
       Promise.all([p1, p2, p3, p4, p5]).then(function (images) {
         
       
             let img = images[0];
             let lv = images[1];
             let fuente = images[2];
             let fuente2 = images[3];
             let mask = images[4];
          
             img.resize(115, 110);
             lv.print(fuente, 150, 30, `${v.title}`, 380);
             lv.print(fuente2, 170, 95, `00:00/${song.durationm}:${durations}`);
             lv.print(fuente2, 380, 95, `${Number(v.views).toLocaleString()}`);
       
       
       
                             
                       lv.composite(img, 15, 5).getBuffer(Jimp.MIME_PNG, (err, image) => {
                      
                             if (err) throw err;
                              message.channel.send(``,new Discord.Attachment(image, 'CardMusicSysop.png'));
                             return;
                       });
       });
    }}};
    if(song.durationh !== 0) {
      if(mlength == 1 || mlength == 0) {
        if(secondslength !== 1 || secondslength !== 0) {
    
    }}}
    if(song.durationh !== 0) {
      if(mlength !== 1 || mlength !== 0) {
        if(secondslength !== 1 || secondslength !== 0) {
 let p1  =  Jimp.read(v.thumbnailUrl);
       let p2  =  Jimp.read('https://cdn.discordapp.com/attachments/485376421271961600/497045442362867762/CardMusicSysop.png');
       let p3 =   Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
       let p4 =   Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
       let p5  =  Jimp.read("https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png");
       Promise.all([p1, p2, p3, p4, p5]).then(function (images) {
         
       
             let img = images[0];
             let lv = images[1];
             let fuente = images[2];
             let fuente2 = images[3];
             let mask = images[4];
          
             img.resize(115, 110);
             lv.print(fuente, 150, 30, `${v.title}`, 380);
             lv.print(fuente2, 170, 95, `00:00/${song.durationm}:${durations}`);
             lv.print(fuente2, 380, 95, `${Number(v.views).toLocaleString()}`);
       
       
       
                             
                       lv.composite(img, 15, 5).getBuffer(Jimp.MIME_PNG, (err, image) => {
                      
                             if (err) throw err;
                              message.channel.send(``,new Discord.Attachment(image, 'CardMusicSysop.png'));
                             return;
                       });
       });
    }}}*/
    if(song.durationh == 0 && song.durationm !== 0) {
      if(secondslength == 1 || secondslength == 0) {
  let p1  =  Jimp.read(v.thumbnailUrl);
       let p2  =  Jimp.read('https://cdn.discordapp.com/attachments/485376421271961600/497045442362867762/CardMusicSysop.png');
       let p3 =   Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
       let p4 =   Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
       let p5  =  Jimp.read("https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png");
       Promise.all([p1, p2, p3, p4, p5]).then(function (images) {
         
       
             let img = images[0];
             let lv = images[1];
             let fuente = images[2];
             let fuente2 = images[3];
             let mask = images[4];
          
             img.resize(115, 110);
             lv.print(fuente, 150, 30, `${v.title}`, 380);
             lv.print(fuente2, 170, 95, `00:00/${song.durationm}:${durations}`);
             lv.print(fuente2, 380, 95, `${Number(v.views).toLocaleString()}`);
       
       
       
                             
                       lv.composite(img, 15, 5).getBuffer(Jimp.MIME_PNG, (err, image) => {
                      
                             if (err) throw err;
                              message.channel.send(``,new Discord.Attachment(image, 'CardMusicSysop.png'));
                             return;
                       });
       });
    }}
    if(song.durationh == 0 && song.durationm !== 0) {
      if(secondslength !== 1 || secondslength !== 0) {
      let p1  =  Jimp.read(v.thumbnailUrl);
       let p2  =  Jimp.read('https://cdn.discordapp.com/attachments/485376421271961600/497045442362867762/CardMusicSysop.png');
       let p3 =   Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
       let p4 =   Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
       let p5  =  Jimp.read("https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png");
       Promise.all([p1, p2, p3, p4, p5]).then(function (images) {
         
       
             let img = images[0];
             let lv = images[1];
             let fuente = images[2];
             let fuente2 = images[3];
             let mask = images[4];
          
             img.resize(115, 110);
             lv.print(fuente, 150, 30, `${v.title}`, 380);
             lv.print(fuente2, 170, 95, `00:00/${song.durationm}:${durations}`);
             lv.print(fuente2, 380, 95, `${Number(v.views).toLocaleString()}`);
       
       
       
                             
                       lv.composite(img, 15, 5).getBuffer(Jimp.MIME_PNG, (err, image) => {
                      
                             if (err) throw err;
                              message.channel.send(``,new Discord.Attachment(image, 'CardMusicSysop.png'));
                             return;
                       });
       });
    }}
    if(song.durationh == 0 && song.durationm == 0 && song.durations !== 0) {
   let p1  =  Jimp.read(v.thumbnailUrl);
       let p2  =  Jimp.read('https://cdn.discordapp.com/attachments/485376421271961600/497045442362867762/CardMusicSysop.png');
       let p3 =   Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
       let p4 =   Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
       let p5  =  Jimp.read("https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png");
       Promise.all([p1, p2, p3, p4, p5]).then(function (images) {
         
       
             let img = images[0];
             let lv = images[1];
             let fuente = images[2];
             let fuente2 = images[3];
             let mask = images[4];
          
             img.resize(115, 110);
             lv.print(fuente, 150, 30, `${v.title}`, 380);
             lv.print(fuente2, 170, 95, `00:00/${song.durationm}:${durations}`);
             lv.print(fuente2, 380, 95, `${Number(v.views).toLocaleString()}`);
       
       
       
                             
                       lv.composite(img, 15, 5).getBuffer(Jimp.MIME_PNG, (err, image) => {
                      
                             if (err) throw err;
                              message.channel.send(``,new Discord.Attachment(image, 'CardMusicSysop.png'));
                             return;
                       });
       });
    } else {
         let p1  =  Jimp.read(v.thumbnailUrl);
       let p2  =  Jimp.read('https://cdn.discordapp.com/attachments/485376421271961600/497045442362867762/CardMusicSysop.png');
       let p3 =   Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
       let p4 =   Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
       let p5  =  Jimp.read("https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png");
       Promise.all([p1, p2, p3, p4, p5]).then(function (images) {
         
       
             let img = images[0];
             let lv = images[1];
             let fuente = images[2];
             let fuente2 = images[3];
             let mask = images[4];
          
             img.resize(115, 110);
             lv.print(fuente, 150, 30, `${v.title}`, 380);
             lv.print(fuente2, 170, 95, `00:00/${song.durationm}:${durations}`);
             lv.print(fuente2, 380, 95, `${Number(v.views).toLocaleString()}`);
       
       
       
                             
                       lv.composite(img, 15, 5).getBuffer(Jimp.MIME_PNG, (err, image) => {
                      
                             if (err) throw err;
                              message.channel.send(``,new Discord.Attachment(image, 'CardMusicSysop.png'));
                             return;
                       });
       });

            }
          })
}

} 


exports.help = {
    name: "play",
    description: "Toca a música para você",
    usage: "r!play [name] || [url] || [playlist-url]"
}
