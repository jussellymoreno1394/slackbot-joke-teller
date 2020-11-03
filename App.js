const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xxxxxxxxxxxxxxxxxxx',
    name: 'jokerbot'
});
 bot.on('start', () => {
    const params = {
        icon_emoji: ':clown_face:'
    };
    bot.postMessageToChannel(
        'general',
        'I will make you laugh with @Jokerbot!',
        params
    );
 });
 bot.on('error', err => console.log(err));
 bot.on('message', data => {
    if(data.type !== 'message'){
        return;
    }
    handleMessage(data.text);
 });

function handleMessage(message){

    if(message.includes(' chucknorris')) {
        MrchuckNorrisJoke();
    } else if(message.includes(' yomama')) {
        YoMamaJoke();
    }else if(message.includes(' randomjoke')) {
        randomJoke();
    } else if(message.includes(' help')) {
        runHelp();
    }
}

function MrchuckNorrisJoke() {
    axios.get('http://api.icndb.com/jokes/random').then(res => {
       const joke = res.data.value.joke;

       const params = {
        icon_emoji: 'laughing:'
    };

    bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
  });
}

function YoMamaJoke() {
    axios.get('http://api.yomomma.info').then(res => {
       const joke = res.data.joke;

       const params = {
        icon_emoji: 'laughing:'
    };
    bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
  });
}

function randomJoke() {
    const rand = Math.floor(Math.random() * 2) + 1;
    if(rand === 1){
        MrchuckNorrisJoke();
    } else if(rand === 2){
       YoMamaJoke(); 
    }
}

function runHelp() {
    const params = {
        icon_emoji: 'question:'
    };
    bot.postMessageToChannel('general', "type @jokerbot with either 'chucknorris', 'yomama' or 'randomjoke' to get a joke", params);
}
