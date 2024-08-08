const PLAYER = require('../modules/player.js');
const config = require('../App/config.json');
const mongoose = require('mongoose');
const SQUAD = require('../modules/squad.js');
const AREA = require('../modules/area.js');

mongoose
   .connect(config.mongodb, {})
   .then(() => console.log(`MongoDB Ready`));
   async function run() {
      try {
          const players = await PLAYER.find({});
  
          for (const player of players) {
              if (player.player.petelo === undefined) {
                  player.player.petelo = 1500;
                  await player.save();
              }
          }
      } catch (error) {
          console.error('Error updating players:', error);
      }
  }
  
  run();