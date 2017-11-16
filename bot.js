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

function findvalue(key, keysArray, obj){

	var value = 0;
	for (var i = 0; i < keysArray.length; i++) {
		var keyrec = keysArray[i];
		if(String(keyrec) == String(key)){
			value = obj[keyrec];
		}
	}
	return value;
}

function formatMessage_stats(name, obj){
	var keysArray = Object.keys(obj);
	var fmessage = "```diff\n" + "Now displaying stats of " + name + "\n\n" +
	"-General\n" +
	"Games won:                " + findvalue('games_won', keysArray, obj) + "\n" +
	"E:D ratio:                " + findvalue('kpd', keysArray, obj) + "\n" +
	"Time Played:              " + findvalue('time_played', keysArray, obj) + "\n\n" +

	"-Eliminations\n" +
	"Total:                    " + findvalue('eliminations', keysArray, obj) + "\n" +
	"Solo kills:               " + findvalue('solo_kills', keysArray, obj) + "\n" +
	"Most in game:             " + findvalue('eliminations_most_in_game', keysArray, obj) + "\n" +
	"Most solo-kills in game:  " + findvalue('solo_kills_most_in_game', keysArray, obj) + "\n" +
	"Best kill streak:         " + findvalue('kill_streak_best', keysArray, obj) + "\n" +
	"Time on fire:             " + findvalue('time_spent_on_fire', keysArray, obj)*findvalue("time_played", keysArray, obj) + "\n\n" +

	"Solo Kills:               " + findvalue('solo_kills', keysArray, obj) + "\n" +
	"Objective Kills:          " + findvalue('objective_kills', keysArray, obj) + "\n" +
	"Final Blows:              " + findvalue('final_blows', keysArray, obj) + "\n" +
	"Environmental Kills:      " + findvalue('environmental_kills', keysArray, obj) + "\n" +
	"Melee Final Blows:        " + findvalue('melee_final_blows', keysArray, obj) + "\n\n" +

	"-Damage\n" +
	"Total:                    " + findvalue('all_damage_done', keysArray, obj) + "\n" +
	"Most in game:             " + findvalue('all_damage_done_most_in_game', keysArray, obj) + "\n" +
	"Barrier damage:           " + findvalue('barrier_damage_done', keysArray, obj) + "\n\n" +

	"-Healing\n" +
	"Total:                    " + findvalue('healing_done', keysArray, obj) + "\n" +
	"Most in game:             " + findvalue('healing_done_most_in_game', keysArray, obj) + "\n" +
	"Defensive assists:        " + findvalue('defensive_assists', keysArray, obj) + "\n" +
	"Offensive assists:        " + findvalue('offensive_assists', keysArray, obj) + "\n\n" +

	"-Medals\n" +
	"Total:                    " + findvalue('medals', keysArray, obj) + "\n" +
	"Gold:                     " + findvalue('medals_gold', keysArray, obj) + "\n" +
	"Silver:                   " + findvalue('medals_silver', keysArray, obj) + "\n" +
	"Bronze:                   " + findvalue('medals_bronze', keysArray, obj) + "```";

	console.log(fmessage);
	return fmessage;
}

function formatMessage_heros(name, obj){
	var keysArray = Object.keys(obj);
	var fmessage = "```diff\n" + "Now displaying stats of " + name + "\n\n" +
	"-General\n" +
	"Games won:                " + findvalue('games_won', keysArray, obj) + "\n" +
	"E:D ratio:                " + findvalue('eliminations', keysArray, obj)/findvalue('deaths', keysArray, obj) + "\n" +
	"Win Percentage:           " + findvalue('games_won', keysArray, obj)/findvalue('games_lost', keysArray, obj) + "\n" +
	"Weapon Accuracy:          " + findvalue('weapon_accuracy', keysArray, obj) + "\n" +
	"Time Played:              " + findvalue('time_played', keysArray, obj) + "\n\n" +

	"-Eliminations\n" +
	"Total:                    " + findvalue('eliminations', keysArray, obj) + "\n" +
	"Solo kills:               " + findvalue('solo_kills', keysArray, obj) + "\n" +
	"Most in game:             " + findvalue('eliminations_most_in_game', keysArray, obj) + "\n" +
	"Avg per life:             " + findvalue('eliminations_per_life', keysArray, obj) + "\n" +
	"Most solo-kills in game:  " + findvalue('solo_kills_most_in_game', keysArray, obj) + "\n" +
	"Best kill streak:         " + findvalue('kill_streak_best', keysArray, obj) + "\n" +
	"Time on fire:             " + findvalue('time_spent_on_fire', keysArray, obj)*findvalue("time_played", keysArray, obj) + "\n\n" +

	"Solo Kills:               " + findvalue('solo_kills', keysArray, obj) + "\n" +
	"Objective Kills:          " + findvalue('objective_kills', keysArray, obj) + "\n" +
	"Final Blows:              " + findvalue('final_blows', keysArray, obj) + "\n" +
	"Environmental Kills:      " + findvalue('environmental_kills', keysArray, obj) + "\n" +
	"Melee Final Blows:        " + findvalue('melee_final_blows', keysArray, obj) + "\n\n" +

	"-Damage\n" +
	"Total:                    " + findvalue('all_damage_done', keysArray, obj) + "\n" +
	"Most in game:             " + findvalue('all_damage_done_most_in_game', keysArray, obj) + "\n" +
	"Most in life:             " + findvalue('all_damage_done_most_in_life', keysArray, obj) + "\n" +
	"Barrier damage:           " + findvalue('barrier_damage_done', keysArray, obj) + "\n" +
	"Most Barrier Dmg in game: " + findvalue('barrier_damage_done_most_in_game', keysArray, obj) + "\n\n" +

	"-Healing\n" +
	"Total:                    " + findvalue('healing_done', keysArray, obj) + "\n" +
	"Most in game:             " + findvalue('healing_done_most_in_game', keysArray, obj) + "\n" +
	"Defensive assists:        " + findvalue('defensive_assists', keysArray, obj) + "\n" +
	"Offensive assists:        " + findvalue('offensive_assists', keysArray, obj) + "\n\n" +

	"-Medals\n" +
	"Total:                    " + findvalue('medals', keysArray, obj) + "\n" +
	"Gold:                     " + findvalue('medals_gold', keysArray, obj) + "\n" +
	"Silver:                   " + findvalue('medals_silver', keysArray, obj) + "\n" +
	"Bronze:                   " + findvalue('medals_bronze', keysArray, obj) + "```";

	console.log(fmessage);
	return fmessage;
}

function extractType(type, stats){

	switch(type){
		case 'doomfist':
			return formatMessage_heros(type, stats.doomfist.general_stats);
		case 'genji':
			return formatMessage_heros(type, stats.genji.general_stats);

		case 'mccree':
			return formatMessage_heros(type, stats.mccree.general_stats);

		case 'pharah':
			return formatMessage_heros(type, stats.pharah.general_stats);

		case 'reaper':
			return formatMessage_heros(type, stats.reaper.general_stats);

		case 'soldier76':
			return formatMessage_heros(type, stats.soldier76.general_stats);

		case 'sombra':
			return formatMessage_heros(type, stats.sombra.general_stats);

		case 'tracer':
			return formatMessage_heros(type, stats.tracer.general_stats);

		case 'bastion':
			return formatMessage_heros(type, stats.bastion.general_stats);

		case 'hanzo':
			return formatMessage_heros(type, stats.hanzo.general_stats);

		case 'junkrat':
			return formatMessage_heros(type, stats.junkrat.general_stats);

		case 'mei':
			return formatMessage_heros(type, stats.mei.general_stats);

		case 'torbjorn':
			return formatMessage_heros(type, stats.torbjorn.general_stats);

		case 'widowmaker':
			return formatMessage_heros(type, stats.widowmaker.general_stats);

		case 'dva':
			return formatMessage_heros(type, stats.dva.general_stats);

		case 'orisa':
			return formatMessage_heros(type, stats.orisa.general_stats);

		case 'reinhardt':
			return formatMessage_heros(type, stats.reinhardt.general_stats);

		case 'roadhog':
			return formatMessage_heros(type, stats.roadhog.general_stats);

		case 'winston':
			return formatMessage_heros(type, stats.winston.general_stats);

		case 'zarya':
			return formatMessage_heros(type, stats.zarya.general_stats);

		case 'ana':
			return formatMessage_heros(type, stats.ana.general_stats);

		case 'lucio':
			return formatMessage_heros(type, stats.lucio.general_stats);

		case 'mercy':
			return formatMessage_heros(type, stats.mercy.general_stats);

		case 'symmetra':
			return formatMessage_heros(type, stats.symmetra.general_stats);

		case 'zenyatta':
			return formatMessage_heros(type, stats.zenyatta.general_stats);
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

function RequestStats(user, play_type, userID, channelID, message, evt, name, location, number, type){

	if(location == "us"){
		cmd.get(
			"curl --silent " + "https://owapi.net/api/v3/u/" + name + "-" + number + "/stats",
			function(err, data, stderr){
				var json = JSON.parse(data);
				if(json.us != null){
					var respoo = json.us.stats;
					bot.sendMessage({
						to: channelID,
						message: (play_type == "c") ? formatMessage_stats(name, respoo.competitive.game_stats) : formatMessage_stats(name, respoo.quickplay.game_stats)
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
						message: (play_type == "c") ? formatMessage_stats(name, respoo.competitive.game_stats) : formatMessage_stats(name, respoo.quickplay.game_stats)
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
						message: (play_type == "c") ? formatMessage_stats(name, respoo.competitive.game_stats) : formatMessage_stats(name, respoo.quickplay.game_stats)
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

function RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, type){

	if(location == "us"){
		cmd.get(
			"curl --silent " + "https://owapi.net/api/v3/u/" + name + "-" + number + "/heroes",
			function(err, data, stderr){
				var json = JSON.parse(data);
				if(json.us != null){
					var playtime = (play_type == "c") ? json.us.heroes.playtime.competitive : json.us.heroes.playtime.quickplay;
					var stats = (play_type == "c") ? json.us.heroes.stats.competitive : json.us.heroes.stats.quickplay;
					if(extractplaytime(type, playtime) != 0.0){
						bot.sendMessage({
							to: channelID,
							message: extractType(type, stats)
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
					var playtime = (play_type == "c") ? json.kr.heroes.playtime.competitive : json.kr.heroes.playtime.quickplay;
					var stats = (play_type == "c") ? json.kr.heroes.stats.competitive : json.kr.heroes.stats.quickplay;
					if(extractplaytime(type, playtime) != 0.0){
						bot.sendMessage({
							to: channelID,
							message: extractType(type, stats)
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
					var playtime = (play_type == "c") ? json.eu.heroes.playtime.competitive : json.eu.heroes.playtime.quickplay;
					var stats = (play_type == "c") ? json.eu.heroes.stats.competitive : json.eu.heroes.stats.quickplay;
					if(extractplaytime(type, playtime) != 0.0){
						bot.sendMessage({
							to: channelID,
							message: extractType(type, stats)
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
		var play_type = mesg[4];

		switch(type) {

			case 'stats':
				RequestStats(user, play_type, userID, channelID, message, evt, name, location, number, 'stats');
				break;

			case 'doomfist':
			case 'Doomfist':
			case 'terrycrews':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'doomfist');
				break;

			case 'genji':
			case 'Genji':
			case 'genji':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'genji');
				break;

			case 'mccree':
			case 'McCree':
			case 'Mccree':
			case 'itshighnoon':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'mccree');
				break;

			case 'pharah':
			case 'Pharah':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'pharah');
				break;

			case 'reaper':
			case 'Reaper':
			case 'edgelord':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'reaper');
				break;

			case 'soldier':
			case 'soldier76':
			case 'Soldier':
			case 'Soldier76':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'soldier76');
				break;

			case 'sombra':
			case 'Sombra':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'sombra');
				break;

			case 'tracer':
			case 'Tracer':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'tracer');
				break;

			case 'bastion':
			case 'Bastion':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'bastion');
				break;

			case 'hanzo':
			case 'Hanzo':
			case 'weeb':
			case 'Weeb':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'hanzo');
				break;

			case 'junkrat':
			case 'Junkrat':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'junkrat');
				break;

			case 'mei':
			case 'Mei':
			case 'stall':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'mei');
				break;

			case 'torb':
			case 'torbjörn':
			case 'torbjorn':
			case 'Torb':
			case 'Torbjörn':
			case 'Torbjorn':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'torbjorn');
				break;

			case 'widowmaker':
			case 'widow':
			case 'Widow':
			case 'Widowmaker':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'widowmaker');
				break;

			case 'dva':
			case 'd.va':
			case 'DVa':
			case 'D.Va':
			case 'Dva':
			case 'D.va':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'dva');
				break;

			case 'orisa':
			case 'Orisa':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'orisa');
				break;

			case 'Reinhardt':
			case 'Rein':
			case 'reinhardt':
			case 'rein':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'reinhardt');
				break;

			case 'Roadhog':
			case 'roadhog':
			case 'hog':
			case 'Hog':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'roadhog');
				break;

			case 'Winston':
			case 'monkey':
			case 'winston':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'winston');
				break;

			case 'Zarya':
			case 'zarya':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'zarya');
				break;

			case 'Ana':
			case 'ana':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'ana');
				break;

			case 'Lúcio':
			case 'Lucio':
			case 'lúcio':
			case 'lucio':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'lucio');
				break;

			case 'Mercy':
			case 'mercy':
			case 'rezpls':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'mercy');
				break;

			case 'Symmetra':
			case 'symmetra':
			case 'sym':
			case 'toxic':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'symmetra');
				break;

			case 'Zenyatta':
			case 'zenyatta':
			case 'zen':
			case 'Zen':
			case 'spacegandhi':
				RequestHero(user, play_type, userID, channelID, message, evt, name, location, number, 'zenyatta');
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
					message: 'Noob, cant even type a simple command'
				});
				break;

			// Just add any case commands if you want to..
		}
	}
});