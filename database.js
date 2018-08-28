const config  = require("./config.json");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect(process.env.DB, {
    useMongoClient: true
}, (err) => {
    if (err) return console.log("Erro ao conectar no database!");
    console.log("Sucesso ao conectar-se no banco de dados!");
});

var User = new Schema({
    _id: {
        type: String
    },
     level: {
        type: Number,
        default: 0
    },
    rpup: {
        type: Number,
        default: 0
    },
    adv: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    rubys: {
        type: Number,
        default: 0
    },
    emerald: {
        type: Number,
        default: 0
    },
    containers: {
        type: Number,
        default: 0
    },
    goldbox: {
        type: Number,
        default: 0
    },
     lootboxr: {
        type: Number,
        default: 0,
    },
    lootbox: {
        type: Number,
        default: 0,
    },
    cupcake: {
        type: Number,
        default: 0,
    },
    dayCol: {
        type: Number,
        default: 0,
    },
    premium: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: "No hay una descripción"
    },
    casou: {
        type: String,
        default: "Ninguém"
    },
    rep: {
        type: Number,
        default: 0
    },
      emblema: {
        type: String,
        default: "./Emblema/level0.png" // "https://i.imgur.com/6TUbmWk.png"
    },
    profile_background: {
        type: String,
        default: "https://cdn.discordapp.com/attachments/413155538755649538/433355322208419840/New_Logo_Sysop.png"
        
    },
    badgep1: {
        type: String,
        default: "Invisiblebadge"
        
    },
    badgep2: {
        type: String,
        default: "Invisiblebadge"
        
    },
    badgep3: {
        type: String,
        default: "Invisiblebadge"
        
    },
    borderp: {
        type: String,
        default: "bwhite"
        
    },
     gumberr_shoped: {
        type: String,
        default: "no"
    },
    background_shoped: {
        type: String,
        default: "no"
    },
    rolecor_shoped: {
        type: String,
        default: "no"
    },
    bio_shoped: {
        type: String,
        default: "no"
    },
    goldbox_shoped: {
        type: String,
        default: "no"
    },
    border_shoped: {
        type: String,
        default: "no"
    },
    cla_nome_shoped: {
        type: String,
        default: "no"
    },
    fbranca: {
        type : Number,
        default: 0
    },
    flaranja: {
        type : Number,
        default: 0
    },
    fvermelha: {
        type : Number,
        default: 0
    },
    fpreta: {
        type : Number,
        default: 0
    },
    strike1: {
        type: String,
        default: "1",
    },
    strike2: {
        type: String,
        default: "2",
    },
    strike3: {
        type: String,
        default: "3",
    },
    verificado: {
        type: String,
        defaunt: "",
    },
    nexDay: {
        type: String,
        defaunt: 0,
    },
    temprep: {
        type: String,
        defaunt: 0,
    },
    nv: {
        type: Number,
        defaunt: 0,
    },
    nvxp: {
        type: Number,
        defaunt: 0,
    },
    day: {
        type: Number,
        defaunt: 0,
    },
    hora: {
        type: Number,
        defaun: 0,
    },
    sycoins: {
       type: Number,
        default: 9000000000,
    },
    syrubys: {
       type: Number,
        default: 9000000000,
    },
    syesmeralda: {
       type: Number,
        default: 9000000000,
    },
    lvll: {
        type: Number,
        default: 0,
        
    },
    eexp: {
        type: Number,
        default: 0,
        
    },
});


var Guilds = new Schema({
    _id: {
        type: String
    },
    invites: {
        type: String,
        default: ''
    },
    autorole: {
      type: String,
      default: '',
    },
    welcome: {
      type: String,
      default: '',
    },
    welcomeChannel: {
      type: String,
      default: '',
    },
    contador: {
    type: String,
    default: '',  
    },
    contadora: {
    type: String,
    default: '',  
    },
     rremove: {
      type: String,
      default: '',
    },
    rremoveChannel: {
      type: String,
      default: '',
    },
     words: {
      type: Array,
      default: [],
    },
    convites: {
      type: Boolean,
      default: false,
    },
    filterPrintscreen: {
      type: Boolean,
      default: false,
    },
    sugest: {
      type: String,
      default: '',
    },
    menino: {
      type: String,
      default: '',
    },
    menina: {
      type: String,
      default: '',
    },
    principiante: {
      type: String,
      default: '',
    },
    staff: {
      type: String,
      default: '',
    },
    logging: {
      type: String,
      default: '',
    },
    emj1: {
      type: String,
      default: '',
    },
    emj2: {
      type: String,
      default: '',
    },
    emj3: {
      type: String,
      default: '',
    },
    emj4: {
      type: String,
      default: '',
    },
    emj5: {
      type: String,
      default: '',
    },
    emj6: {
      type: String,
      default: '',
    },
    emj7: {
      type: String,
      default: '',
    },
    emj8: {
      type: String,
      default: '',
    },
    emj9: {
      type: String,
      default: '',
    },
    emj10: {
      type: String,
      default: '',
    },
    emj11: {
      type: String,
      default: '',
    },
    emj12: {
      type: String,
      default: '',
    },
    rol1: {
      type: String,
      default: '',
    },
    rol2: {
      type: String,
      default: '',
    },
    rol3: {
      type: String,
      default: '',
    },
    rol4: {
      type: String,
      default: '',
    },
    rol5: {
      type: String,
      default: '',
    },
     staffanuncio: {
      type: String,
      default: '',
    },
    bye: {
      type: String,
      default: '',
    },
    byeChannel: {
      type: String,
      default: '',
    },
    dm: {
    type: String,
    default: '', 
    },
    verificado: {
        type: String,
        defaunt: '',
    },
    slow: {
        type: Number,
        defaunt: 1,
    },
    texto: {
        type: String,
        defaunt: 'Texto do contador não definido.',
    },
    numero: {
        type: String,
        defaunt: '',
    },
    animado: {
        type: String,
        defaunt: '',
    }, 
    girl: {
        type: String,
        default: "",
    },
    man: {
        type: String,
        default: "",
    },
    staffer: {
        type: String,
        default: "",
    },
    upar: {
        type: Boolean,
        default: true,
    },
});



var Cla = new Schema({
    _nome: {
        type: String
    },
    tag: {
        type: String,
        default: '',
    },
    imagem: {
        type: String,
        default: "https://i.pinimg.com/originals/26/e6/0f/26e60fbef37732bd3443e4a81413f4c9.png",
    },
    dono: {
        type: String
    },
    trofeus: {
        type: Number,
        default: 0
    },
    vitorias: {
        type: Number,
        default: 0
    },
    derrotas: {
        type: Number,
        default: 0
    },
    publico: {
        type: Boolean,
        default: false
    },
    points: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    userssize: {
        type: Number,
        default: 0
    },
    staff1: {
        type: String,
        default: "Ninguem"
    },
    staff2: {
        type: String,
        default: "Ninguem"
    },
    staff3: {
        type: String,
        default: "Ninguem"
    },
    membro4: {
        type: String,
        default: "Ninguem"
    },
    membro5: {
        type: String,
        default: "Ninguem"
    },
    membro6: {
        type: String,
        default: "Ninguem"
    },
    membro7: {
        type: String,
        default: "Ninguem"
    },
    membro8: {
        type: String,
        default: "Ninguem"
    },
    membro9: {
        type: String,
        default: "Ninguem"
    },
    membro10: {
        type: String,
        default: "Ninguem"
    },
    logger: {
    type: String,
    defaunt: '',
    },
    
});


var Ship = new Schema({
    nome1: {
        type: String
    },
    nome2: {
        type: String
    },
    porcentagem: {
        type: String
    },
});

var Lista = new Schema({
    _id: {
        type: String
    },
   block: {
        type: String,
        default: 0
        
    },
}) 

var Bloqueio = new Schema({
    _id: {
        type: String
    },
   block: {
        type: String,
        default: 0
        
    },
})


var Registrador = new Schema({
    _id: {
        type: String
    },
    mh: {
        type: Number,
        default: 0,
    },
    hm: {
        type: Number,
        default: 0,
    },
    executor: {
        type: String,
        default: '',
    },
});

var Guilds = mongoose.model("Guilds", Guilds);
var Clas = mongoose.model("Clas", Cla);
var Users = mongoose.model("Users", User);
var Ships = mongoose.model("Ships", Ship);
var Lista = mongoose.model("List", Lista);
var Bloqueio = mongoose.model("Bloqueio", Bloqueio);
var Registrador = mongoose.model("Registrador", Registrador);


exports.Users = Users;
exports.Clas = Clas;
exports.Ships = Ship;
exports.Guilds = Guilds;
exports.Lista = Lista;
exports.Bloqueio = Bloqueio;
exports.Registrador = Registrador;
