const Discord = require("discord.js");
const music = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const cfg = require("./config.json");
const db = require('./database.js')

music.commands = new Discord.Collection();
const queue = new Map();

music.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    
    db.Guilds.findOne({"_id": message.guild.id}).then(servidor => {

        if (message.content.startsWith(servidor.setprefix)) {

            db.Bloqueio.findOne({"_id": message.author.id}).then(bloqueio => {

                if(bloqueio) {
                    if ([bloqueio.block].includes(message.author.id) && !['244489368717230090'].includes(message.author.id))
                    return message.channel.send(`<:xguardian:476061993368027148> | ${message.author}! Você foi bloqueado de usar comandos do **Sysop**, se você acha que isso é um engano nos contate! `);
                }

                let command = message.content.split(" ")[0];
                command = command.slice(servidor.setprefix.length);

                let args = message.content.split(" ").slice(1);
                console.log(args)
                try {   

	                let commandFile = require(`./commands/${command}.js`);
                    commandFile.run(music, message, args);

                } catch (err) {
                    if (err.code === 'MODULE_NOT_FOUND') return;
                    console.warn(err);
                }

            })
       
            }
        
    
    })
   
  });

music.on("ready", () => {
music.user.setPresence({
        status: 'Online',
        /*game: {
            name: `sy!help`,
            url: 'https://www.twitch.tv/expextreadriano'
        }*/
});
});

music.on('message', async message => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
	  if (!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefixes: cfg.prefix
		};
    }

    let prefix = prefixes[message.guild.id].prefixes;
    let msg = message.content.toLowerCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (!msg.startsWith(prefix)) return;
    if (sender.bot) return;
    
    try {
        let commandFile = require(`./commands/${cmd}.js`); 
        commandFile.run(music, message, args, queue); 
    } catch(e) { 
        console.log("atá"); 
    } finally { 
        console.log(`${message.author.username} Usou o comando:   ${cmd}, na guild: ${message.guild.name}`);
	}
});
music.login(process.env.t);


music.on('ready', async () => {
    console.log(`${music.user.username} está respondendo!`);
});

function generateOutputFile(channel, member) {
  // use IDs instead of username cause some people have stupid emojis in their name
  const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
  return fs.createWriteStream(fileName);
}

client.on('message', msg => {
  if (msg.content.startsWith('sy&join')) {
    let [command, ...channelName] = msg.content.split(" ");
    if (!msg.guild) {
      return msg.reply('no private service is available in your area at the moment. Please contact a service representative for more details.');
    }
    const voiceChannel = msg.guild.channels.find("name", channelName.join(" "));
    //console.log(voiceChannel.id);
    if (!voiceChannel || voiceChannel.type !== 'voice') {
      return msg.reply(`I couldn't find the channel ${channelName}. Can you spell?`);
    }
    voiceChannel.join()
      .then(conn => {
        msg.reply('ready!');
        // create our voice receiver
        const receiver = conn.createReceiver();

        conn.on('speaking', (user, speaking) => {
          if (speaking) {
            msg.channel.sendMessage(`I'm listening to ${user}`);
            // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
            const audioStream = receiver.createPCMStream(user);
            // create an output stream so we can dump our data in a file
            const outputStream = generateOutputFile(voiceChannel, user);
            // pipe our audio data into the file stream
            audioStream.pipe(outputStream);
            outputStream.on("data", console.log);
            // when the stream ends (the user stopped talking) tell the user
            audioStream.on('end', () => {
              msg.channel.sendMessage(`I'm no longer listening to ${user}`);
            });
          }
        });
      })
      .catch(console.log);
  }
  if(msg.content.startsWith('sy&leave')) {
    let [command, ...channelName] = msg.content.split(" ");
    let voiceChannel = msg.guild.channels.find("name", channelName.join(" "));
    voiceChannel.leave();
  }
});

client.on('ready', () => {
  console.log('ready Music!');
});
