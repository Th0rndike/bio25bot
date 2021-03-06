'use strict';



var TelegramBot = require('node-telegram-bot-api');

var TOKEN = '143051523:AAGfttyVAE7S3YDga_S6tBX4I3HJAes2-1I';
var USER = 'bio25bot';
var port = process.env.PORT || 8080;
var host = process.env.HOST;
var bot = new TelegramBot(TOKEN, {webHook: {port: port, host: host},polling:true});
//var bot = new TelegramBot(TOKEN, {polling: true});

var Phrase = {
	phraseId: 0,
	wordsToMatch : [],
	phraseResult : '',
	phraseType : 0,
	reply : false,
	initialize : function(phraseId,wordsToMatch,phraseResult, phraseType,reply){
		this.phraseId = phraseId;
		this.wordsToMatch = wordsToMatch;
		this.phraseResult = phraseResult;
		this.phraseType = phraseType;
		this.reply = reply;
	}
}


var TYPE_MATCH_WORD = 0;
var TYPE_ENDSWITH_CHAR = 1;
var TYPE_IS_PHOTO = 2;
var TYPE_STARTSWITH_EXCEPT = 3;
var TYPE_WELCOME = 4;
var TYPE_RANDOM = 5;
var TYPE_CONTAINS_ALL = 6;

var PhraseChooser = {
	phraseCollection : [],
	initialize : function(){
		console.log('initializing...');
		var phrase0 = Object.create(Phrase);
		phrase0.initialize(0,['puffi','puffo','resistenza','res','blu'], '#puffiMerda',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase0);

		var phrase1 = Object.create(Phrase);
		phrase1.initialize(1,['zainetti','zaino','zainetto','invicta','seven'], 'Solo i puffi sono pieni di zainetti',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase1);

		var phrase2 = Object.create(Phrase);
		phrase2.initialize(2,['guardian'], '#nowhine',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase2);

		var phrase3 = Object.create(Phrase);
		phrase3.initialize(3,['anomaly','anomalia'], 'I puffi hanno perso tutte le anomaly in Italia',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase3);

		var phrase4 = Object.create(Phrase);
		phrase4.initialize(4,['#nowhine'], '+1',TYPE_MATCH_WORD,true);
		this.phraseCollection.push(phrase4);

		var phrase5 = Object.create(Phrase);
		phrase5.initialize(5,['?'], 'Figa se non lo sai tu che sei puffo',TYPE_ENDSWITH_CHAR,false);
		this.phraseCollection.push(phrase5);

		var phrase6 = Object.create(Phrase);
		phrase6.initialize(6,['!'], 'E questo chi te l\'ha detto? La zia?',TYPE_ENDSWITH_CHAR,false);
		this.phraseCollection.push(phrase6);

		var phrase7 = Object.create(Phrase);
		phrase7.initialize(7,[], 'Ma è sborly?',TYPE_IS_PHOTO,true);
		this.phraseCollection.push(phrase7);

		var phrase8 = Object.create(Phrase);
		phrase8.initialize(8,['medaglia','medaglietta','badge'], 'Ho TUTTE le medaglie',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase8);

		var phrase9 = Object.create(Phrase);
		phrase9.initialize(9,['abaddon'], 'Ha vinto la sportività',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase9);

		var phrase10 = Object.create(Phrase);
		phrase10.initialize(10,['rabbia','whine','rosicare','rosicata','rosica','vendere'], 'L\'altro giorno hanno cercato di vendermi whine per rabbia...a me sembrava una semplice rosicata',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase10);

		var phrase11 = Object.create(Phrase);
		phrase11.initialize(11,['#puffi_merda'], 'Ti correggo. #puffiMerda',TYPE_STARTSWITH_EXCEPT,true);
		this.phraseCollection.push(phrase11);

		var phrase12 = Object.create(Phrase);
		phrase12.initialize(12,['lacrime','tears','tear','frogtears','#frogtears','hulktears','#hulktears'], 'E un po\' che sono in questa chat e le lacrime hanno un solo colore...blu',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase12);

		var phrase13 = Object.create(Phrase);
		phrase13.initialize(13,[], 'Qua è pieno di gente simpatica... e puffi',TYPE_WELCOME,false);
		this.phraseCollection.push(phrase13);
		
		var phrase14 = Object.create(Phrase);
		phrase14.initialize(14,['black guardian','scarso'], 'scarso ma con la black guardian',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase14);

		var phrase15 = Object.create(Phrase);
		phrase15.initialize(15,['disattivare','commenti','piangina','pavidi'], 'Solo i ppp disattivano i commenti (pavidi piangina puffi)﻿',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase15);
		
		var phrase16 = Object.create(Phrase);
		phrase16.initialize(16,['patti','accordi','contrario','puffi','rispettare'], 'Io non sono contrario a stringere patti con i puffi...basta che alla fine non li si rispetti',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase16);

		var phrase17 = Object.create(Phrase);
		phrase17.initialize(17,['fesso','scorretto','antipatico','cittone','puffo'], 'Il puffo non nasce cittone, antipatico, scorretto, fesso...lo diventa frequentando gli altri puffiMerda',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase17); 

		var phrase18 = Object.create(Phrase);
		phrase18.initialize(18,['sborlotto','bazinga','zaino','zainetto','scorretto','cittone','ladro'], 'bazingaaaaaaa!!',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase18); 	

		var phrase19 = Object.create(Phrase);
		phrase19.initialize(19,['sborlotto','disonesti','beccati','sgamati','scorretto','cittone','ladro','scorretti'], 'Quelli più disonesti son quelli beccati a rubare',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase19); 		

		var phrase20 = Object.create(Phrase);
		phrase20.initialize(20,['haha','lol',':d'], 'Menomale che a voi puffi fa ridere',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase20);

		var phrase21 = Object.create(Phrase);
		phrase21.initialize(21,['punti',' ap '], 'Gli ap sono roba da puffi',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase21);

		var phrase22 = Object.create(Phrase);
		phrase22.initialize(22,['sborlotto','onesto','onesti','categoria','categorie','amico','amici'], 'I puffi si dividono in 2 categorie: gli amici di sborlotto e quello onesti',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase22); 		 		

		var phrase23 = Object.create(Phrase);
		phrase23.initialize(23,['uguali','puffi','resistenza'], 'Voi puffi siete tutti uguali',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase23); 		 		

		var phrase24 = Object.create(Phrase);
		phrase24.initialize(24,[20], 'Voi puffi siete tutti uguali',TYPE_RANDOM,false);
		this.phraseCollection.push(phrase24); 		 		

		var phrase25 = Object.create(Phrase);
		phrase25.initialize(25,[20], '#nowhine',TYPE_RANDOM,false);
		this.phraseCollection.push(phrase25); 		 		

		var phrase26 = Object.create(Phrase);
		phrase26.initialize(26,['natul','renatul','bannatul'], 'Natul è il giocatore più forte d\'europa',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase26); 		 		

		var phrase27 = Object.create(Phrase);
		phrase27.initialize(27,['natul','renatul','bannatul'], 'Sciacquati la bocca prima di parlare di Natul',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase27); 

		var phrase28 = Object.create(Phrase);
		phrase28.initialize(28,['enl','illuminati','enlightened','lampadine','muffe'], 'Sciacquati la bocca prima di parlare degli illuminati',TYPE_MATCH_WORD,true);
		this.phraseCollection.push(phrase28); 

		var phrase29 = Object.create(Phrase);
		phrase29.initialize(29,['sborlotto','denuncia','denunciato','palby'], '@SBORLOTTO hai denunciato @palby ?',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase29); 

		var phrase30 = Object.create(Phrase);
		phrase30.initialize(30,[' ddo'], 'Sciacquati la bocca prima di parlare del ddo',TYPE_MATCH_WORD,true);
		this.phraseCollection.push(phrase30); 

		var phrase31 = Object.create(Phrase);
		phrase31.initialize(31,['amici','persone','sul cazzo'], 'Io non ho amici, solo persone che mi stanno meno sul cazzo di altre',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase31); 	

		var phrase31 = Object.create(Phrase);
		phrase31.initialize(31,['crossfaction',' xf ','odiare','odiamo','sincerità'], 'Guarda che qua nessuno approva crossfaction. Ci odiamo con sincerità',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase31); 	

		var phrase32 = Object.create(Phrase);
		phrase32.initialize(32,['cagare','cagando','facendo la cacca'], 'Io non cago mai...per essere più cattivo',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase32); 

		var phrase33 = Object.create(Phrase);
		phrase33.initialize(33,['bot','bio25bot','cittoni',' tg ', 'telegram'], 'Ma con tutti i cittoni che avete nella resistenza possibile che non riuscite a fare un cazzo di bot TG?',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase33);

		//var phrase34 = Object.create(Phrase);
		//phrase34.initialize(34,['bot','bio25bot','cittoni',' tg ', 'telegram'], 'Ma con tutti i cittoni che avete nella resistenza possibile che non riuscite a fare un cazzo di bot TG?',TYPE_MATCH_WORD,false);
		//this.phraseCollection.push(phrase34);

		var phrase35 = Object.create(Phrase);
		phrase35.initialize(35,['denuncia','piange','piangina'], 'Sì ora piange e denuncia tutti',TYPE_MATCH_WORD,false);
		this.phraseCollection.push(phrase35);

		var phrase36 = Object.create(Phrase);
		phrase36.initialize(36,['ha problemi','problemi ha','hai problemi'], 'Siediti, hai tempo?',TYPE_MATCH_WORD,true);
		this.phraseCollection.push(phrase36);

		var phrase37 = Object.create(Phrase);
		phrase37.initialize(37,['piange'], 'Sicuramente non abbastanza',TYPE_MATCH_WORD,true);
		this.phraseCollection.push(phrase37);

		var phrase38 = Object.create(Phrase);
		phrase38.initialize(38,[['puffi','bravi'],['puffi','forti'],['puffi','simpatici'],['resistenza','brava'],['resistenza','forte']], 'Hahahahahahahahahaha fa sempre ridere (puffimmerda)',TYPE_CONTAINS_ALL,true);
		this.phraseCollection.push(phrase38);

		var phrase39 = Object.create(Phrase);
		phrase39.initialize(39,['#nowhine'], 'sei il puffo piu all\'avanguardia che conosco',TYPE_MATCH_WORD,true);
		this.phraseCollection.push(phrase39);

		console.log('done!');
	},
	findWordMatches: function(msg){
		var isPhoto = msg.photo != undefined;
		console.log('MSG: ');
		console.log(msg);
		var msg_text = (!isPhoto) ? msg.text.toLowerCase() : '';
		var result = this.phraseCollection.filter(function(phrase){
			if(!isPhoto){
				switch(phrase.phraseType){
					case TYPE_MATCH_WORD:
						for(var i=0;i<phrase.wordsToMatch.length;i++){
							if(msg_text.indexOf(phrase.wordsToMatch[i]) >= 0){
								return true;
							}
						}
					break;
					case TYPE_ENDSWITH_CHAR:
						for(var i=0;i<phrase.wordsToMatch.length;i++){
							if(msg_text.indexOf(phrase.wordsToMatch[i]) == (msg.text.length - 1))
								return true;
						}
					break;
					case TYPE_STARTSWITH_EXCEPT:
						for(var i=0;i<phrase.wordsToMatch.length;i++){
							var currentSplitted = phrase.wordsToMatch[i].split('_');
							if(msg_text.indexOf(currentSplitted[0]) >= 0 && msg.text.substring(msg.text.indexOf(currentSplitted[0]),msg.text.indexOf(currentSplitted[0]) + currentSplitted[1].length) != currentSplitted[1]){
								return true;
							}
						}
					break;
					case TYPE_RANDOM:
						var showPerc = phrase.wordsToMatch[0];
						var random = Math.floor(Math.random() * 100);
						if(random <= showPerc)
							return true;
					break;
					case TYPE_CONTAINS_ALL:
						for(var i=0;i<phrase.wordsToMatch.length;i++){
							var finalResult = true;
							for (var j=0;j<phrase.wordsToMatch[i].length;j++){
									finalResult = finalResult && (msg_text.indexOf(phrase.wordsToMatch[i][j]) >= 0);
							}
							if(finalResult)
								return true;
						}
					break;
					default:
					return false;
				}
			}else{
				switch(phrase.phraseType){
					case TYPE_IS_PHOTO:
						if(phrase.phraseType == TYPE_IS_PHOTO)
							return true;
					break;
					default:
					return false;	
				}
			}
		});

		
			
		console.log('result: ' + result);
		return result;
	}
}

var pc = Object.create(PhraseChooser);
pc.initialize();
var opts = {
  reply_markup: JSON.stringify(
    {
      force_reply: true
    }
  )};
	bot.on('message', function (msg) {
		
	  var matches = pc.findWordMatches(msg);
	  	console.log('FINAL MATCHES:');
	  	console.log(matches);

	  //console.log(msg);
	  var chatId = msg.chat.id;
	  var msg_id = msg.message_id;
	  
	  if(matches.length == 1){
	  	if(!matches[0].reply){
	  		bot.sendMessage(chatId,matches[0].phraseResult);
		  }else{
		  	bot.sendMessage(chatId,matches[0].phraseResult, {reply_to_message_id: msg_id});
		  }	
	  }else if(matches.length > 1){
	  	var resIndex = Math.floor(Math.random() * matches.length);
	  	if(!matches[resIndex].reply){
	  		bot.sendMessage(chatId,matches[resIndex].phraseResult);
		  }else{
		  	bot.sendMessage(chatId,matches[resIndex].phraseResult, {reply_to_message_id: msg_id});
		  }	
	  }
	});




