const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(`./bot.js`, { totalShards: 20});

manager.spawn();

manager.on('launch', shard => console.log(`Shard ${shard.id} iniciada com sucesso!`));
