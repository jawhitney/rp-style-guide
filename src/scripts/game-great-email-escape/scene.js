var rpGame = rpGame || {};

rpGame.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

rpGame.debug = {
    time: rpGame.getUrlParameter('time'),
    outro: rpGame.getUrlParameter('outro'),
};

//== Defaults
rpGame.isAudioActive = $('html').hasClass('audio') ? true : false;
rpGame.isTouchActive = $('html').hasClass('touchevents') ? true : false;
rpGame.w = 1600;
rpGame.h = 900;
rpGame.tile = 100;
rpGame.button = 200;
rpGame.confetti = 48;
rpGame.icon = 70;
rpGame.time = (rpGame.debug.time) ? rpGame.debug.time : rpGame.content.time;
rpGame.frameRate = 10;
rpGame.depths = {
    wall: 0,
    wallObjectShadow: 10,
    wallObject: 20,
    deskShadow: 30,
    object1Shadow: 40,
    object1: 50,
    object2Shadow: 60,
    object2: 70,
    object3Shadow: 80,
    object3: 90,
    desk: 100,
    object4: 110,
    object5: 120,
    warning: 130,
    text: 140,
    response: 150,
    header: 160,
};
rpGame.months = rpGame.content.months;
rpGame.emailParts = rpGame.content.emailParts;
rpGame.devices = rpGame.content.devices;
rpGame.fonts = {
    sans: 'adelle-sans,sans-serif',
    serif: 'adelle,serif'
};
rpGame.styles = {
    fontSize: 0.5 * rpGame.tile,
    fontStyle: 'normal',
    fill: '#fff',
    align: 'center',
    wordWrap: {
        width: 0.9 * rpGame.w
    },
};
rpGame.normals = {};
rpGame.images = {};
rpGame.backgrounds = {};
rpGame.animations = {};
rpGame.audio = {};
rpGame.assets = {
    objects: {
        //== Wall
        wall: { x: 0.5 * rpGame.w, y: 0.5 * rpGame.h, depth: 'wall', },
        //== Wall objects
        shelf: { x: 272, y: 70, depth: 'wallObject', shadow: true, },
        portrait: { x: 143, y: 301, depth: 'wallObject', shadow: true, question: true, scale: 0.75 },
        clock: { x: 381, y: 300, depth: 'wallObject', shadow: true, question: true, scale: 1, animation: true, sound: 'clock' },
        fish: { x: 800, y: !rpGame.isTouchActive ? 147 : 175, depth: 'wallObject', shadow: true, question: true, scale: 1, animation: true, sound: 'fish' },
        chart: { x: !rpGame.isTouchActive ? 1125 : 1165, y: !rpGame.isTouchActive ? 152 : 195, depth: 'wallObject', question: true, scale: 0.75 },
        calendar: { x: !rpGame.isTouchActive ? 1178 : 1250, y: !rpGame.isTouchActive ? 352 : 375, depth: 'wallObject', question: true, scale: 1 },
        certificate: { x: 1453, y: 241, depth: 'wallObject', shadow: true, },
        //== Object 1
        plantdesk: { x: 525, y: 566, depth: 'object1', shadow: true, animation: true, sound: 'plant' },
        supplies: { x: 1039, y: 583, depth: 'object1', shadow: true },
        computer: { x: 800, y: 457, depth: 'object1', shadow: true, question: true, scale: 0.4 },
        laptop: { x: 351, y: 544, depth: 'object1', shadow: true, question: true, scale: 0.75 },
        //== Object 2
        plantcabinet: { x: 60, y: 419, depth: 'object2', shadow: true, animation: true, sound: 'plant' },
        cup: { x: 572, y: 557, depth: 'object2', shadow: true, animation: true, sound: 'cup' },
        //== Object 3
        crown: { x: 118, y: 475, depth: 'object3', shadow: true, question: true, scale: 1, animation: true, sound: 'crown' },
        inbox: { x: 1157, y: 599, depth: 'object3', shadow: true, question: true, scale: 1 },
        lamp: { x: 1200, y: 527, depth: 'object3', shadow: true, },
        globe: { x: 1372, y: 535, depth: 'object3', shadow: true, animation: true, sound: 'globe' },
        //== Desk
        desk: { x: 803, y: 606, depth: 'desk', shadow: true },
        //= Object 4
        list: { x: 100, y: 561, depth: 'object4', question: true, scale: 1 },
    },
    projectiles : ['plane', 'paperwad'],
    images: ['logo', 'email_parts', 'header', 'podium', 'shapes', 'win', 'lose'],
    sprites: {
        answers: { frameWidth: rpGame.icon, frameHeight: rpGame.icon, depth: 'background', },
        buttons: { frameWidth: rpGame.button, frameHeight: rpGame.icon, depth: 'background', },
        confetti: { frameWidth: rpGame.confetti, frameHeight: rpGame.confetti, depth: 'response', },
        icons: { frameWidth: rpGame.icon, frameHeight: rpGame.icon, depth: 'background', },
        iconslg: { frameWidth: 2 * rpGame.icon, frameHeight: 2 * rpGame.icon, depth: 'background', },
    },
    audio: {
        alarm: { loop: true, volume: 0, },
        clock: { loop: true, volume: 0.75, },
        correct: { loop: false, volume: 0.75, },
        crown: { loop: true, volume: 0.75, },
        cup: { loop: true, volume: 0.75, },
        fish: { loop: true, volume: 0.75, },
        globe: { loop: true, volume: 0.75, },
        incorrect: { loop: false, volume: 0.75, },
        paperwad: { loop: false, volume: 0.75, },
        plane: { loop: false, volume: 0.75, },
        plant: { loop: true, volume: 0.75, },
        sadtrombone: { loop: false, volume: 0.75, },
        spy: { loop: true, volume: 0.75, },
        victorytrumpet: { loop: false, volume: 0.75, },
    }
};
rpGame.totalQuestions = 10;
rpGame.totalCorrect = 0;
rpGame.questions = {
    calendar: { correct: false, },
    chart: { correct: false, },
    clock: { correct: false, },
    computer: { correct: false, },
    crown: { correct: false, },
    inbox: { correct: false, },
    fish: { correct: false, },
    laptop: { correct: false, },
    list: { correct: false, },
    portrait: { correct: false, },
};

rpGame.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

rpGame.Scene = new Phaser.Class({
    Extends: Phaser.Scene,
    rp: {
        tile: rpGame.tile,
        frameRate: rpGame.frameRate,
        w: rpGame.w,
        h: rpGame.h,
        btn: rpGame.button,
        icon: rpGame.icon,
        colors: {
            red: { hexd: 0xCB333B, hex: '#CB333B' },
            orangedark: { hexd: 0xE35205, hex: '#E35205' },
            orangelight: { hexd: 0xFF9D6E, hex: '#FF9D6E' },
            yellowdark: { hexd: 0xFFA300, hex: '#FFA300' },
            yellowlight: { hexd: 0xF1BE48, hex: '#F1BE48' },
            greendark: { hexd: 0x00965E, hex: '#00965E' },
            greenlight: { hexd: 0x84BD00, hex: '#84BD00' },
            tealdark: { hexd: 0x008C95, hex: '#008C95' },
            teallight: { hexd: 0x2DCCD3, hex: '#2DCCD3' },
            bluedark: { hexd: 0x00A3E0, hex: '#00A3E0' },
            bluelight: { hexd: 0x71C5E8, hex: '#71C5E8' },
            bluelighter: { hexd: 0xd5eef7, hex: '#d5eef7' },
            navydark: { hexd: 0x003D51, hex: '#003D51' },
            navylight: { hexd: 0x4298B5, hex: '#4298B5' },
            purpledark: { hexd: 0x6D2077, hex: '#6D2077' },
            purplelight: { hexd: 0xAB4FC6, hex: '#AB4FC6' },
            black: { hexd: 0x000000, hex: '#000000' },
            graybase: { hexd: 0x4C4B4D, hex: '#4C4B4D' },
            graydarkest: { hexd: 0x707274, hex: '#707274' },
            graydarker: { hexd: 0x95989B, hex: '#95989B' },
            graydark: { hexd: 0xAAADAF, hex: '#AAADAF' },
            gray: { hexd: 0xB4B4B4, hex: '#B4B4B4' },
            graylight: { hexd: 0xD5D6D7, hex: '#D5D6D7' },
            graylighter: { hexd: 0xe3e3e3, hex: '#e3e3e3' },
            graylightest: { hexd: 0xf5f6f7, hex: '#f5f6f7' },
            white: { hexd: 0xffffff, hex: '#ffffff' },
        },
        addText: function (scene, key, text) {
            var styles = {};

            if (text.hasOwnProperty('styles')) {
                if (text.styles.hasOwnProperty('font')) {
                    styles.fontFamily = rpGame.fonts[text.styles.font];
                } else {
                    styles.fontFamily = rpGame.fonts.sans;
                }

                ['fontSize', 'fontStyle', 'fill', 'align', 'wordWrap'].forEach(function(prop) {
                    if (text.styles.hasOwnProperty(prop)) {
                        styles[prop] = text.styles[prop];
                    } else {
                        styles[prop] = rpGame.styles[prop];
                    }
                });
            }

            if (!scene.hasOwnProperty('text')) {
                scene.text = {};
            }

            if (!scene.text.hasOwnProperty(key)) {
                scene.text[key] = {};
            }

            scene.text[text.key] = scene.add.text(text.x, text.y, text.text, styles);
            scene.text[text.key].setOrigin(0.5, 0.5);
            scene.text[text.key].depth = rpGame.depths.text;
        },
        addTextUnderline: function(scene, key, text, depth) {
            key = key + 'Underline';

            if (!scene.hasOwnProperty('graphics')) {
                scene.graphics = {};
            }

            scene.graphics[key] = scene.add.graphics();
            scene.graphics[key].lineStyle(2, 0xFFFFFF, 1.0);
            scene.graphics[key].beginPath();
            scene.graphics[key].moveTo(text.getBounds().left, text.getBounds().bottom);
            scene.graphics[key].lineTo(text.getBounds().right, text.getBounds().bottom);
            scene.graphics[key].closePath();
            scene.graphics[key].strokePath();
            scene.graphics[key].depth = depth;
        },
        playAudio: function(scene, key) {
            if (rpGame.isAudioActive && !rpGame.isTouchActive) {
                var audio, loop, volume;

                audio = rpGame.assets.audio[key];
                loop = (audio.hasOwnProperty('loop')) ? audio.loop : true;

                if (rpGame.isAudioMuted) {
                    volume = 0;
                } else {
                    volume = (audio.hasOwnProperty('volume')) ? audio.volume : 1;
                }

                if (scene.audio.hasOwnProperty(key)) {
                    scene.audio[key].play({ loop: loop, volume: volume });
                }
            }
        },
        stopAudio: function(scene, audio) {
            if (rpGame.isAudioActive && !rpGame.isTouchActive && scene.audio.hasOwnProperty(audio) && scene.audio[audio].isPlaying) {
                scene.audio[audio].stop();
            }
        },
        shuffleArray: function(array) {
            var temp = [];

            for (var i = array.length-1; i >= 0; i--) {
                temp[i] = array[i];
            }

            for (var j = temp.length-1; j >= 0; j--) {

                var randomIndex = Math.floor(Math.random() * (j + 1));
                var itemAtIndex = temp[randomIndex];

                temp[randomIndex] = temp[j];
                temp[j] = itemAtIndex;
            }

            return temp;
        },
    },
});
