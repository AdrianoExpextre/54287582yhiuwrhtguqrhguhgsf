const Discord = require('discord.js');

exports.run = (client, message, args) => {
		
let database = require("../database.js");  
database.Bloqueio.findOne({
                "_id": message.author.id
            }, function (erro, documento) {
                if(documento) {
         if (!['244489368717230090'].includes(message.author.id))
                
 if ([documento.block].includes(message.author.id)) return message.channel.send(`<:xguardian:476061993368027148> | ${message.author}! Você foi bloqueado de usar comandos do **Sysop**, se você acha que isso é um engano nos contate! `);
        
}
		

message.channel.send(`Ok ${message.author}, lhe enviei meus comandos em seu privado. <:SysopJoia:469847222641491988>`)
let paginas = ["SysopCorp é um bot discord escrito em discord.js. Um bot simples com inúmeras funcionalidades como: Moderação, Entretenimento, Social, Economia, Músicas, Jogos e muito mais a cada evolução"] 
let pages = [`<a:mod:461510313947430943> | Moderação\n<:wumpmugshot:461492631042523136> | Sociais\n<a:festa:461509706763206657> | Entretenimento\n<:adsales:461493157465423883> | Economia\n<a:music3:461493558512451584> | Música\n<:nsfw:461495244480053248> | NSFW\n<:DiscordPartner:434417598801641481> | Parceiros\n<:btnvoltar:461495764443725844> | Menu inicial.\n\n[DBL Discord](https://discordbots.org/bot/412593783696261121) | [Vote DBL](https://discordbots.org/bot/412593783696261121/vote) | [Servidor de Suport](https://discord.gg/6HwTNBT)`];
let page = 1;

const embed = new Discord.RichEmbed()
.setColor('#36393E')
.setThumbnail('https://cdn.discordapp.com/attachments/439176584000307210/469847812709023745/SysopLogo.png')
.setTitle((paginas[page-1]))
.setDescription(pages[page-1])
.setFooter(`Página ${page} de  9`)
message.author.send(embed).then(function(value) {
  
  
  setTimeout(function() {
  value.react("a:mod:461510313947430943"); //Moderação
  }, 2000)
  setTimeout(function() {
      value.react(":wumpmugshot:461492631042523136"); //Sociais
  }, 3000)
  setTimeout(function() {
      value.react("a:festa:461509706763206657"); //Entretenimento
  }, 4000)
  setTimeout(function() {
      value.react(":adsales:461493157465423883"); //Economia
  }, 5000)
  setTimeout(function() {
    value.react("a:music3:461493558512451584"); //Música
}, 6000)

setTimeout(function() {
  value.react(":nsfw:461495244480053248"); //NSFW
}, 8000)
setTimeout(function() {
  value.react(":DiscordPartner:434417598801641481"); //vips
}, 8500)
setTimeout(function() {
  value.react(":btnvoltar:461495764443725844"); //Volta menu inicial
}, 9000)
    

  /*voltar menu*/ const backFilter = (reaction, user) => reaction.emoji.id === '461495764443725844' && user.id === message.author.id;
  /*mod*/         const modFilter = (reaction, user) => reaction.emoji.id === `461510313947430943` && user.id === message.author.id;
  /*social*/      const socialFilter = (reaction, user) => reaction.emoji.id === '461492631042523136' && user.id === message.author.id;
  /*diversão*/    const diversaoFilter = (reaction, user) => reaction.emoji.id === '461509706763206657' && user.id === message.author.id;
  /*economia*/    const economiaFilter = (reaction, user) => reaction.emoji.id === '461493157465423883' && user.id === message.author.id;
  /*música*/      const musicFilter = (reaction, user) => reaction.emoji.id === '461493558512451584' && user.id === message.author.id;
  /*nsfw*/        const nsfwFilter = (reaction, user) => reaction.emoji.id === '461495244480053248' && user.id === message.author.id;
   /*vips*/        const partnersFilter = (reaction, user) => reaction.emoji.id === '434417598801641481' && user.id === message.author.id;


  //const music = value.createReactionCollector(musicFilter);

  const h1 = value.createReactionCollector(modFilter);
  const h2 = value.createReactionCollector(socialFilter);
  const h3 = value.createReactionCollector(diversaoFilter);
  const h4 = value.createReactionCollector(economiaFilter);
  const h5 = value.createReactionCollector(musicFilter);
  const h7 = value.createReactionCollector(nsfwFilter);
  const h8 = value.createReactionCollector(partnersFilter);
  const h9 = value.createReactionCollector(backFilter);



  
//adm
h1.on('collect', r => {
if(page === 2) return;
page++;
embed.setTitle("<a:mod:461510313947430943> | Comandos de Moderação");
embed.setDescription(`\`\`\`css\nPrefixo: sy!\n\n
[ addrole - sy!addrole @user @role  ]
Adicione um cargo a um usuário
[ anuncie - sy!anuncie <ID channel> <text> ]
Anuncie com o perfil do bot em qualquer canal.
[ apagar - sy!apagar <amount> | sy!apagar 15 ]
Apago mensagens do chat ou um usuário especifico.
[ autorole - sy!autorole @role ]
Define a role quando um usuário entrar no servidor.
[ deletrolall ]
Comando para remover todas as tags do servidor a baixo do bot. ATENÇÃO! Comando perigoso.
[ addrolall ]
Adicionar um cargo/role especifico em todos do servidor. ATENÇÃO! Comando perigoso.
[ kick - sy!kick @user <reason> ]
Expulse usuário do servidor.
[ removerole ]
Remove um cargo de usuário
[ report - sy!report @user <reason> ]
Reporte um usuário para algum Administrador! É necessário ter um canal chamado reports. Mais infos em sy!report help
[ setname - sy!setname <new name> ]
Alterar apelido de usuários
[ setnick - sy!setnick <new nick> ]
Alterar apelido do Bot
[ striker - sy!striker <reason> (1/3) ]
Um comando de avisos no qual o usuário acumula strikers, após fazer dois strikers, no terceiro striker o usuário é banido do servidor automaticamente.
[ mute - sy!tempmute @user <time> (1h | 1m | 1s) ]
Silencie um usuário no servidor por tempo.
[ unmute - sy!unmute @user motivo ]
Desmuta usuário do servidor com motivo.
[ warn - sy!warn @user <reason> ]
Avisar a algum usuário.
[ selfrole | sy!selfrole help ]
Defina até 5 roles para auto atribuição de cargos no servidor.
[ join-role | join-role 1/2/3/4/5 ]
Pega cargos liberados no selfrole.\`\`\``)
embed.setFooter(`Pagina 2 de 8`);
value.edit(embed).then(m => { setTimeout(() => { m.delete() }, 5 * 60 * 1000) });
});


//utilidade
h2.on('collect', r => {
  if(page === 3) return;
  page++;
  embed.setTitle("<:wumpmugshot:461492631042523136> | Comandos Sociais");
  embed.setDescription(`\`\`\`css\nPrefixo sy!\n\n
[ level <on/off> ]
Ativa e Desativa o sistema de Levels no servidor.
[ avatar ]
Mostro o avatar de usários usando menção ou ID.
 
[ bio ]
Altere sua biografia no seu perfil personalizado.
 
[ colour ]
Tenha informações de determinada cor. Infos use: sy!colour help.
 
[ createwebhook ]
Crie um Webhook através de comando em um canal.
 
[ descrim ]
Procure por usuários com o mesmo descriminator (tag) que o seu ou de outras pessoas no servidor. 
 
[ emojis ]
Tenha visualização de todos os emojis personalizados do seu servidor em excessão animados.
[ google ]
Pesquise no GOOGLE.
[ gwords ]
Pesquise por uma palavra chave no google.
 
[ invite ]
Mostro o convite para o meu servidor.
 
[ recrutador ]
Mostre os TOP 5 divulgadores de seu servidor.
 
[ bye <bye help> ]
Define ou mostra a mensagem de saída do servidor
 
[ memberole ]
Verifique quantos membros estão em um determinado cargo.
 
[ ping ]
Respondo pong!.
 
[ server ]
Lhe dá informações do servidor.
 
[ setbackground ]
Altere o background do seu perfil e seja único! XD.
 
[ setborder ]
Altere a borda do seu avatar dentro de seu perfil no bot.
 
[ tankionline ]
Tenha um acesso rápido no Tanki Online, use esse comando para acessar ao Jogo no navegador ou fazer o download do mesmo em diversos servidores.
 
[ thumbnail ]
Mostro a thumbnail do servidor.
 
[ twitch-live ]
Procure por uma live com o username Twitch. Mais Infos: sy!twitch-live help.
[ user ]
Você pode ver informações suas ou de outro usuário mencionando-o.
 
[ vrole ]
Verifique se você tem um cargo do servidor.
 
[ welcome  <welcome help> ]
Define ou mostra a mensagem de boas vindas do servidor.
[ dm  <dm help> ]
Define ou mostra a mensagem de boas vindas do servidor.
[ slow  <slow 5> ]
Modo lento no chat para evitar spamm. Defina em segundos o tempo de envio de mensagens no chat.
[ infos ]
Informações do bot.\`\`\``)
embed.setFooter(`Pagina 3 de 8`);
value.edit(embed).then(m => { setTimeout(() => { m.delete() }, 5 * 60 * 1000) });
  
})

h3.on('collect', r => {
  if(page === 4) return;
  page++;
  embed.setTitle("<a:festa:461509706763206657> | Entretenimento");
  embed.setDescription(`\`\`\`css\nPrefixo sy!\n\n
[ decidir ]
Divirta-se com os amigos com este comando. Faça o bot escolher uma opção de três ou mais, mais infos use sy!decidir help.
 
[ giphy ]
Pesquise GIF no site GIPHY online de qualquer coisa.
[ marvel ]
Adicione um filtro sua foto de perfil com o tema da MARVEL.
[ profile ]
Tenha um perfil personalizado com seu nível, xp, emblemas, moedas e muito mais!
 
[ random-puppy ]
Obtenha imagens de cachorrinhos super fofos.
 
[ gumber | sy!gumber 30 (Gera um número de 0 á 30) ]
Gere um número aleatório.
 
[ reverse ]
Ulitize esse comando para eu modificar suas palavras e frases ao contrário.
[ rank ]
Confira seu level e pontuações.
[ ranking (MANUTENÇÃO) ]  
Confira o top 10 usuários e seus respectivos números no rank global do bot!
[ roleta ]
Jogue Roleta Russa.
 
[ say ]
Repito qualquer palavra ou frase.
 
[ saymbed ]
Repito qualquer palavra ou frase sua dentro de uma embed.
 
[ ship ]
Calcule seu amor ou de outros usuários.
[ igdb - sy!igdb <Game Name> | sy!igdb League Of Legends ]  
Pesquise por jogos no site IGDB pelo bot Sysop.
 
[ rep ]
Adicione Upvotes para seus amigos assim será ainda mais conhecido no perfil do bot!\`\`\``)
  embed.setFooter(`Pagina 4 de 8`);
  value.edit(embed).then(m => { setTimeout(() => { m.delete() }, 5 * 60 * 1000) });
  
})

h4.on('collect', r => {
  if(page === 5) return;
  page++;
  embed.setTitle("<:adsales:461493157465423883> | Economia");
  embed.setDescription(`\`\`\`css\nPrefixo sy!\n\n
[ assaunt ]
Assalte seu amigo e roube algumas coisinhas!
[ balance ]
Para visualizar seu saldo!
 
[ container <open> ]
Abra containers ganhos do bônus diário e se surpreeda com novidades!
 
[ work ]
Trabalhe e receba!
 
[ containers - sy!containers @user <amount> ]
Doe containers ou de de presente para algum amigo :)
[ ggoldbox - sy!ggoldbox @user <amoun> ]
Doe Caixas Douradas para os amigos ou de de presente!
[ goldbox - sy!goldbox drop ]
Solte uma caixa dourada e alguém aleatóriamente do seu servidor irá pegar, contendo prêmios!
[ Sycoins - sy!sycoins @user <amount> ]
Para doar SY moedas.
[ Esmeralda - sy!esmeralda @user <amount> ]
Para doar Esmeraldas.
[ Sy Crystal - sy!sycrystal @user <amount> ]
Doe Sy Crystal para os necessitados :) Faça a festa em nossa loja!
 
[ shop - sy!shop | sy!shop item ]
Loja Global do Bot, onde você compra alguns comandos premiums e divertidos!
Para comprar use: sy!by <item>\`\`\``) 
  embed.setFooter(`Pagina 5 de 8`);
  value.edit(embed).then(m => { setTimeout(() => { m.delete() }, 5 * 60 * 1000) });
  
})

h5.on('collect', r => {
  if(page === 6) return;
  page++;
  embed.setTitle("<a:music3:461493558512451584> | Comandos de Música");
  embed.setDescription(`\`\`\`css\nPrefixo sy!\n\n
[ play <name song>  /  <youtube url> ]
Dê play nas músicas com urls do youtube ou pesquise pelo nome
[ pause ]
Pause a música.
[ resume ]
Despausa a música.
[ np ]
Informação da música atual tocando.
[ queue ]
Infos da playlist!
[ volume  - Max 10 ]
Aumente o volume do bot
[ skip ]
Pule a música para a próxima na playlist.
[ conectar ]
Conecte o bot ao seu canal de voz.\`\`\``);
  embed.setFooter(`Pagina 6 de 8`);
  value.edit(embed).then(m => { setTimeout(() => { m.delete() }, 5 * 60 * 1000) });
  
})

  h7.on('collect', r => {
    if(page === 8) return;
    page++;
    embed.setTitle("<:nsfw:461495244480053248> | NSFW");
    embed.setDescription(`\`\`\`css\nPrefixo sy!\n\n
 [ ghentai ]
 Obtenha alguns HENTAIS aleatórios.
  
 [ boobs ]
 Peitos, Peitos e mais Peitos.
  
 [ 4k ]
 Alguns NSFW aleatórios.\`\`\``) 
    embed.setFooter(`Pagina 7 de 8`);
    value.edit(embed).then(m => { setTimeout(() => { m.delete() }, 5 * 60 * 1000) });
    
  });
   h8.on('collect', r => {
    if(page === 9) return;
    page++;
    embed.setTitle("<:DiscordPartner:434417598801641481> | Comandos Especiais");
    embed.setDescription(`\`\`\`Markdown\n# Prefixo sy!\n\n
 # divulgador
 Veja quantas pessoas você convidou em um servidor em especifico.
 
< filtro invites >
 Filtro de convites para bloquear links de outros servidores. Evento filtrado: (message, messageUpdate)
< banfinish - sy!banfinish @user (reason(Opcional)) | sy!banfinish ID  >
 Bano usuários do servidor com motivo por menção ou ID e anuncio no privado.
 
< banoff - sy!banoff @user (reason(Opcional)) | sy!banoff ID  >
 Bano usuários do servidor com motivo por menção ou ID e anuncio no privado.
 
< anistia - sy!anistia ID > 
 Desbanir usuários por ID com motivo.
 
< slow - sy!slow <amount> | sy!slow off (Para desativar)>
 Evite spamm e flood em seu servidor com o comando de modo lento. Defina o tempo em segundos e deixe a mágica acontecer.
\`\`\``) 
    embed.setFooter(`Pagina 9 de 9`);
    value.edit(embed).then(m => { setTimeout(() => { m.delete() }, 5 * 60 * 1000) });
    
  })

h9.on('collect', r => {
  if(page === 1) return;
  page++;
  embed.setTitle("MENU");
  embed.setDescription(`<a:mod:461510313947430943>  | Moderação\n<:wumpmugshot:461492631042523136> | Sociais\n<a:festa:461509706763206657> | Entretenimento\n<:adsales:461493157465423883> | Economia\n<a:music3:461493558512451584> | Música\n<:nsfw:461495244480053248> | NSFW\n<:DiscordPartner:434417598801641481> | Parceiros\n<:btnvoltar:461495764443725844> | Menu inicial.\n\n[DBL Discord](https://discordbots.org/bot/412593783696261121) | [Vote DBL](https://discordbots.org/bot/412593783696261121/vote) | [Servidor de Suport](https://discord.gg/6HwTNBT)`);
  embed.setFooter(`Pagina 1 de 9`);
  value.edit(embed).then(m => { setTimeout(() => { m.delete() }, 5 * 60 * 1000) });
  
});
}).catch(e => console.log(e));
	});
    };
    
exports.help = {
    name: "help",
    description: "comandos/ajuda",
    usage: "sy!help"
}
