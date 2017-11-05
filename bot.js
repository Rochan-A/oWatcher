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

function extractType(type, stats){

	switch(type){
		case 'doomfist':
			return formatMessage(type, stats.doomfist.general_stats);
		case 'genji':
			return formatMessage(type, stats.genji.general_stats);

		case 'mccree':
			return formatMessage(type, stats.mccree.general_stats);

		case 'pharah':
			return formatMessage(type, stats.pharah.general_stats);

		case 'reaper':
			return formatMessage(type, stats.reaper.general_stats);

		case 'soldier76':
			return formatMessage(type, stats.soldier76.general_stats);

		case 'sombra':
			return formatMessage(type, stats.sombra.general_stats);

		case 'tracer':
			return formatMessage(type, stats.tracer.general_stats);

		case 'bastion':
			return formatMessage(type, stats.bastion.general_stats);

		case 'hanzo':
			return formatMessage(type, stats.hanzo.general_stats);

		case 'junkrat':
			return formatMessage(type, stats.junkrat.general_stats);

		case 'mei':
			return formatMessage(type, stats.mei.general_stats);

		case 'torbjorn':
			return formatMessage(type, stats.torbjorn.general_stats);

		case 'widowmaker':
			return formatMessage(type, stats.widowmaker.general_stats);

		case 'dva':
			return formatMessage(type, stats.dva.general_stats);

		case 'orisa':
			return formatMessage(type, stats.orisa.general_stats);

		case 'reinhardt':
			return formatMessage(type, stats.reinhardt.general_stats);

		case 'roadhog':
			return formatMessage(type, stats.roadhog.general_stats);

		case 'winston':
			return formatMessage(type, stats.winston.general_stats);

		case 'zarya':
			return formatMessage(type, stats.zarya.general_stats);

		case 'ana':
			return formatMessage(type, stats.ana.general_stats);

		case 'lucio':
			return formatMessage(type, stats.lucio.general_stats);

		case 'mercy':
			return formatMessage(type, stats.mercy.general_stats);

		case 'symmetra':
			return formatMessage(type, stats.symmetra.general_stats);

		case 'zenyatta':
			return formatMessage(type, stats.zenyatta.general_stats);
	}
}

function extractplaytime(type, playtime){
	
		switch(type){
			case 'doomfist':
				return playtime.doomfist;
			case 'genji':
				return playtime.genji;
	
			case 'mccree':
				return playtime.mccree;
	
			case 'pharah':
				return playtime.pharah;
	
			case 'reaper':
				return playtime.reaper;
	
			case 'soldier76':
				return playtime.soldier76;
	
			case 'sombra':
				return playtime.sombra;
	
			case 'tracer':
				return playtime.tracer;
	
			case 'bastion':
				return playtime.bastion;
	
			case 'hanzo':
				return playtime.hanzo;
	
			case 'junkrat':
				return playtime.junkrat;
	
			case 'mei':
				return playtime.mei;
	
			case 'torbjorn':
				return playtime.torbjorn;
	
			case 'widowmaker':
				return playtime.widowmaker;
	
			case 'dva':
				return playtime.dva;
	
			case 'orisa':
				return playtime.orisa;
	
			case 'reinhardt':
				return playtime.reinhardt;
	
			case 'roadhog':
				return playtime.roadhog;
	
			case 'winston':
				return playtime.winston;
	
			case 'zarya':
				return playtime.zarya;
	
			case 'ana':
				return playtime.ana;
	
			case 'lucio':
				return playtime.lucio;
	
			case 'mercy':
				return playtime.mercy;
	
			case 'symmetra':
				return playtime.symmetra;
	
			case 'zenyatta':
				return playtime.zenyatta;
		}
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
					if(extractplaytime(type, playtime) != 0.0){
						var generalStats = extractType(type, stats);
						console.log(generalStats);
						bot.sendMessage({
							to: channelID,
							message: generalStats
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
					if(extractplaytime(type, playtime) != 0.0){
						var generalStats = extractType(type, stats);
						console.log(generalStats);
						bot.sendMessage({
							to: channelID,
							message: generalStats
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
					if(extractplaytime(type, playtime) != 0.0){
						var generalStats = extractType(type, stats);
						console.log(generalStats);
						bot.sendMessage({
							to: channelID,
							message: generalStats
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
				RequestStats(user, userID, channelID, message, evt, name, location, number, 'stats');
				break;

			case 'doomfist':
			case 'Doomfist':
			case 'terrycrews':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'doomfist');
				break;

			case 'genji':
			case 'Genji':
			case 'genji':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'genji');
				break;

			case 'mccree':
			case 'McCree':
			case 'Mccree':
			case 'itshighnoon':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'mccree');
				break;

			case 'pharah':
			case 'Pharah':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'pharah');
				break;

			case 'reaper':
			case 'Reaper':
			case 'edgelord':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'reaper');
				break;

			case 'soldier':
			case 'soldier76':
			case 'Soldier':
			case 'Soldier76':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'soldier76');
				break;

			case 'sombra':
			case 'Sombra':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'sombra');
				break;

			case 'tracer':
			case 'Tracer':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'tracer');
				break;

			case 'bastion':
			case 'Bastion':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'bastion');
				break;

			case 'hanzo':
			case 'Hanzo':
			case 'weeb':
			case 'Weeb':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'hanzo');
				break;

			case 'junkrat':
			case 'Junkrat':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'junkrat');
				break;

			case 'mei':
			case 'Mei':
			case 'stall':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'mei');
				break;

			case 'torb':
			case 'torbjörn':
			case 'torbjorn':
			case 'Torb':
			case 'Torbjörn':
			case 'Torbjorn':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'torbjorn');
				break;

			case 'widowmaker':
			case 'widow':
			case 'Widow':
			case 'Widowmaker':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'widowmaker');
				break;

			case 'dva':
			case 'd.va':
			case 'DVa':
			case 'D.Va':
			case 'Dva':
			case 'D.va':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'dva');
				break;

			case 'orisa':
			case 'Orisa':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'orisa');
				break;

			case 'Reinhardt':
			case 'Rein':
			case 'reinhardt':
			case 'rein':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'reinhardt');
				break;

			case 'Roadhog':
			case 'roadhog':
			case 'hog':
			case 'Hog':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'roadhog');
				break;

			case 'Winston':
			case 'monkey':
			case 'winston':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'winston');
				break;

			case 'Zarya':
			case 'zarya':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'zarya');
				break;

			case 'Ana':
			case 'ana':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'ana');
				break;

			case 'Lúcio':
			case 'Lucio':
			case 'lúcio':
			case 'lucio':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'lucio');
				break;

			case 'Mercy':
			case 'mercy':
			case 'rezpls':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'mercy');
				break;

			case 'Symmetra':
			case 'symmetra':
			case 'sym':
			case 'toxic':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'symmetra');
				break;

			case 'Zenyatta':
			case 'zenyatta':
			case 'zen':
			case 'Zen':
			case 'spacegandhi':
				RequestHero(user, userID, channelID, message, evt, name, location, number, 'zenyatta');
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