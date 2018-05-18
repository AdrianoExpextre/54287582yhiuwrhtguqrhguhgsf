const Discord = require("discord.js");
const music = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const cfg = require("./config.json");

music.commands = new Discord.Collection();
const queue = new Map();

fs.readdir("./commands/", (err, files) => {

	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0) {
		console.log("Comando não encontrado!");
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		music.commands.set(props.help.name, props);
	});
});

music.on("ready", (message) => {
music.user.setStatus('Online');
music.user.setGame('Pedófilos na fornalha');
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
