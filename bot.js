//Import required external packages
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var cmd=require('node-cmd');
const exec = require('child_process').exec;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});

//Provide status of Bot
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

function formatMessage(type, obj){
	var keysArray = Object.keys(obj);
	var fmessage = type + "\n\n";
	for (var i = 0; i < keysArray.length; i++) {
		var key = keysArray[i];
		var value = obj[key];
		fmessage = fmessage + key + "\t" + value + "\n"
	}
	return fmessage;
}

function RequestStats(user, userID, channelID, message, evt, name, location, number, type){

	if(location == "us"){
		cmd.get(
			"curl --silent " + "https://owapi.net/api/v3/u/" + name + "-" + number + "/stats",
			function(err, data, stderr){
				var json = JSON.parse(data);
				if(json.us != null){
					var respoo = json.us.stats;
					bot.sendMessage({
						to: channelID,
						message: formatMessage(type, respoo.quickplay.game_stats)
					});
				}else{
					bot.sendMessage({
						to: channelID,
						message: "No stats found"
					});
				}
			}
		);
	}else if(location == "kr"){
		cmd.get(
			"curl --silent " + "https://owapi.net/api/v3/u/" + name + "-" + number + "/stats",
			function(err, data, stderr){
				var json = JSON.parse(data);
				if(json.kr != null){
					var respoo = json.kr.stats;
					bot.sendMessage({
						to: channelID,
						message: formatMessage(type, respoo.quickplay.game_stats)
					});
				}else{
					bot.sendMessage({
						to: channelID,
						message: "No stats found"
					});
				}
			}
		);
	}else{
		cmd.get(
			"curl --silent " + "https://owapi.net/api/v3/u/" + name + "-" + number + "/stats",
			function(err, data, stderr){
				var json = JSON.parse(data);
				if(json.eu != null){
					var respoo = json.eu.stats;
					bot.sendMessage({
						to: channelID,
						message: formatMessage(type, respoo.quickplay.game_stats)
					});
				}else{
					bot.sendMessage({
						to: channelID,
						message: "No stats found"
					});
				}
			}
		);
	}
}

function RequestHero(user, userID, channelID, message, evt, name, location, number, type){

	if(location == "us"){
		cmd.get(
			"curl --silent " + "https://owapi.net/api/v3/u/" + name + "-" + number + "/heroes",
			function(err, data, stderr){
				var json = JSON.parse(data);
				if(json.us != null){
					var playtime = json.us.heroes.playtime.quickplay;
					var stats = json.us.heroes.stats.quickplay;
					if(playtime.type != 0){
						bot.sendMessage({
							to: channelID,
							message: formatMessage(type, respoo.quickplay.game_stats)
						});
					}else{
						bot.sendMessage({
							to: channelID,
							message: 'You have not played ' + type
						});
					}
				}else{
					bot.sendMessage({
						to: channelID,
						message: "No stats found"
					});
				}
			}
		);
	}else if(location == "kr"){
		cmd.get(
			"curl --silent " + "https://owapi.net/api/v3/u/" + name + "-" + number + "/heroes",
			function(err, data, stderr){
				var json = JSON.parse(data);
				if(json.kr != null){
					var playtime = json.kr.heroes.playtime.quickplay;
					var stats = json.kr.heroes.stats.quickplay;
					if(playtime.type != 0){
						bot.sendMessage({
							to: channelID,
							message: formatMessage(type, respoo.quickplay.game_stats)
						});
					}else{
						bot.sendMessage({
							to: channelID,
							message: 'You have not played ' + type
						});
					}
				}else{
					bot.sendMessage({
						to: channelID,
						message: "No stats found"
					});
				}
			}
		);
	}else{
		cmd.get(
			"curl --silent " + "https://owapi.net/api/v3/u/" + name + "-" + number + "/heroes",
			function(err, data, stderr){
				var json = JSON.parse(data);
				if(json.eu != null){
					var playtime = json.eu.heroes.playtime.quickplay;
					var stats = json.eu.heroes.stats.quickplay;
					console.log(playtime);
					if(playtime.type != 0){
						bot.sendMessage({
							to: channelID,
							message: formatMessage(type, respoo.quickplay.game_stats)
						});
					}else{
						bot.sendMessage({
							to: channelID,
							message: 'You have not played ' + type
						});
					}
				}else{
					bot.sendMessage({
						to: channelID,
						message: "No stats found"
					});
				}
			}
		);
	}
}

bot.on('message', function (user, userID, channelID, message, evt) {

	if (message.substring(0, 2) == 'ow') {
		var args = message.split('@');
		var submesg = args[1];
		var mesg = submesg.split(' ');
		var type = mesg[0];
		var name = mesg[1];
		var number = mesg[2];
		var location = mesg[3];

		switch(type) {

			case 'stats':
				RequestStats(user, userID, channelID, message, evt, name, location, number, type);
				break;

			case 'doomfist':
			case 'Doomfist':
			case 'terrycrews':
				break;

			case 'genji':
			case 'Genji':
			case 'genji':
				RequestHero(user, userID, channelID, message, evt, name, location, number, type);
				break;

			case 'mccree':
			case 'McCree':
			case 'Mccree':
			case 'itshighnoon':
				break;

			case 'pharah':
			case 'Pharah':
				break;

			case 'reaper':
			case 'Reaper':
			case 'edgelord':
				break;

			case 'soldier':
			case 'soldier76':
			case 'Soldier':
			case 'Soldier76':
				break;

			case 'sombra':
			case 'Sombra':
				break;

			case 'tracer':
			case 'Tracer':
				break;

			case 'bastion':
			case 'Bastion':
				break;

			case 'hanzo':
			case 'Hanzo':
			case 'weeb':
			case 'Weeb':
				break;

			case 'junkrat':
			case 'Junkrat':
				break;

			case 'mei':
			case 'Mei':
			case 'stall':
				break;

			case 'torb':
			case 'torbjörn':
			case 'torbjorn':
			case 'Torb':
			case 'Torbjörn':
			case 'Torbjorn':
				break;

			case 'widowmaker':
			case 'widow':
			case 'Widow':
			case 'Widowmaker':
				break;

			case 'dva':
			case 'd.va':
			case 'DVa':
			case 'D.Va':
			case 'Dva':
			case 'D.va':
				break;

			case 'orisa':
			case 'Orisa':
				break;

			case 'Reinhardt':
			case 'Rein':
			case 'reinhardt':
			case 'rein':
				break;

			case 'Roadhog':
			case 'roadhog':
			case 'hog':
			case 'Hog':
				break;

			case 'Winston':
			case 'monkey':
			case 'winston':
				break;

			case 'Zarya':
			case 'zarya':
				break;

			case 'Ana':
			case 'ana':
				break;

			case 'Lúcio':
			case 'Lucio':
			case 'lúcio':
			case 'lucio':
				break;

			case 'Mercy':
			case 'mercy':
			case 'rezpls':
				break;

			case 'Symmetra':
			case 'symmetra':
			case 'sym':
			case 'toxic':
				RequestHero(user, userID, channelID, message, evt, name, location, number, type);
				break;

			case 'Zenyatta':
			case 'zenyatta':
			case 'zen':
			case 'Zen':
			case 'spacegandhi':
				break;

			case 'help':

				bot.sendMessage({
					to: channelID,
					message: "Usage:\n\n \
							ow@stats <battletag> <number> <region>:\tDisplay general stats of the user in a specified region \n\
							ow@<hero_name> <battletag> <number> <region>:\tDisplay  stats of the user at a hero in a specified region \n\
							ow@help:\tPrint this help guide"
				});
				break;

			default:

				bot.sendMessage({
					to: channelID,
					message: 'Noob, cant even type a fucking command'
				});
				break;

			// Just add any case commands if you want to..
		}
	}
});