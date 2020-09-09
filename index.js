'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();


require('dotenv').config();

const token = process.env.TOKEN;

// store channels by id and check if the "switch" is on/off
var mutedChannels = [];

const channelTemplate = {
  id: 0,
  muteAll: false,
}

console.log('Using this token right now : \n', token)


// ****************************************************************************
// *                               Messages Send                              *
// ****************************************************************************


// client.on('voiceStateUpdate', (oldMember, newMember) => {
//   let newUserChannel = newMember.voiceChannel;
//   let oldUserChannel = oldMember.voiceChannel;

//   if (newMember != undefined) {
//     const channels = newMember.guild.channels.cache;
//     for (const [channelID, channel] of channels) {
//       if (channel.type === 'voice') {
//         let channelStored = mutedChannels.find(channelTemplate => channelTemplate.id === channelID)

//         if (channelStored == undefined) {
//           channelStored = {
//             id: channelID,
//             muteAll: false,
//           }
//         }
    
//         for (const [memberID, member] of channel.members) {
//           console.log(member)
//           //if (member.channelID != channelID) continue;
    
//           if (channelStored.muteAll == false)
//             member.voice.setMute(false, "En este canal se puede hablar")
//           else
//             member.voice.setMute(true, "En este canal NO se puede hablar");
//         }
//       }
//     }
//   }
// });


client.on('message', message => {
  let channelFound = false;
  //if (message.member.permissions.missing('ADMINISTRATOR')) return;
  if (message.content.charAt(0) === '!') {
    let messageSplitted = message.content.split(' ');
    let command = messageSplitted[0];
    let param1 = messageSplitted[1];

    switch (command) {
      case '!switch-voice':
        // iterate channels and find it by name and voice
        // iterate members and mute/active them

        const channels = message.guild.channels.cache;
        for (const [channelID, channel] of channels) {
          if (channel.name == param1 && channel.type === 'voice') {
            channelFound = true;

            if (mutedChannels.length == 0 || !mutedChannels.find(channelTemplate => channelTemplate.id === channelID))
              mutedChannels.push({ id: channelID, muteAll: false });

            const channelStored = mutedChannels.find(channelTemplate => channelTemplate.id === channelID)
  
            for (const [memberID, member] of channel.members) {
              if (channelStored.muteAll == false)
                member.voice.setMute(true, "Sssh, empieza la ronda, silencio.")
              else 
                member.voice.setMute(false, "Ya se terminó la ronda de discusión.")
            }

            mutedChannels = mutedChannels.map((channelTemplate) => {
              if (channelTemplate.id == channelID)
                channelTemplate.muteAll = !channelTemplate.muteAll
              return channelTemplate
            });
          }
        }
        if (channelFound)
          message.reply(`¡Listo, ahora se activaran/desactivarán los micros en ${param1}!`);
        else
          message.reply(`Vaya... parece que no he encontrado ese canal de voz, ¿Podrías revisar el nombre?`);
        break;
      case '!help':
      case '!ayuda':
        message.reply('Puedes utilizar el comando "!switch-voice nombre_del_canal" para activar/desctivar el audio');
        break;
      default:
        message.reply('Lo siento, ese comando no existe.');
        break;
    }
  }
})


client.login(token)