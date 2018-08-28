const cfg = require("../config.json");
const Discord = require("discord.js");
const key = (process.env.YT_API);

const fs = require("fs"); 
const moment = require('moment');
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(key);
const opus = require("opusscript");
const gyp = require("node-gyp");

exports.run = async(client, message, args,  queue) => {
    const args1 = message.content.split(' ');
    const searchString = args1.slice(1).join(' ');
    const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(message.guild.id); 

    if (!message.member.voiceChannel) return message.channel.send('<:sysalerta:469789950938841088> Você não está em um canal de voz! :loud_sound:');
		if (!serverQueue) return message.channel.send('<:sysalerta:469789950938841088> Não há nada tocando.');
		if (!args1[1]) return message.channel.send(`<a:Volume:483880143991996417> | O volume atual é: **${serverQueue.volume}**`);
		serverQueue.volume = args1[1];
    if (args1[1] > 10) return message.channel.send(`:no_entry_sign: O limite \`10\` é o máximo! Vol atual: **${serverQueue.volume}**`);
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args1[1] / 10);
        
       
    
        message.channel.send(`<a:Volume:483880143991996417> | Volume alerado para: **${args1[1]}**`);
        
async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = { 
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      skippers: [],
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`<:sysalerta:469789950938841088> Eu não pude entrar no canal de voz: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return message.channel.send(`<:trust:447056422346424320> **${song.title}** foi adicionado à fila!`);
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
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 15);

    serverQueue.textChannel.send(`Começou a tocar: **${song.title}**`);
}
}

exports.help = {
    name: "volume"
}
