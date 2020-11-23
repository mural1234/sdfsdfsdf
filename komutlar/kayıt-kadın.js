const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['774987902714642434'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
let tag = "↟"
const kayıtlı = message.guild.roles.cache.find(r => r.id === '774987901103636500')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '774987920686972948')

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor ?')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('İsim Belirt.')
if(!yas) return message.reply('Yaş Belirt.')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`kadinUye.${message.author.id}`, 1)
let kadın = db.get(`kadinUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(`<a:greenload:770623808678920192>Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`<a:greenload:770623808678920192>Kayıt Edilen:`, `<@${stg.user.id}> Kayıt Oldu`)
    .addField(`<a:greenload:770623808678920192>Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`<a:greenload:770623808678920192>Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`<a:greenload:770623808678920192>Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`<a:greenload:770623808678920192>Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
.setFooter(`Archeva Kayıt Botu`)
.setColor('GREEN')
client.channels.cache.get('774988036937220098').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kadın','k','woman','girl', 'kız'],
    permLevel: 0
};

exports.help = {
    name: 'kadın',
};