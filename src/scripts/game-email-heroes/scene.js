var rpGame = rpGame || {};

rpGame.Scene = new Phaser.Class({
    Extends: Phaser.Scene,
    rp: {
        imageUrl: rpApp.wpAssetUrl + '/email-heroes/',
        audioUrl: rpApp.wpAssetUrl + '/email-heroes/',
        tile: 100,
        frameRate: 10,
        width: 1600,
        height: 900,
        font: {
            sans: 'adelle-sans,sans-serif',
            serif: 'adelle,serif',
            x: 0.5 * 1600,
            y: !$('html').hasClass('touchevents') ? 900 - (1.75 * 100) : 3 * 100,
            styles: {
                fontFamily: 'adelle-sans,sans-serif',
                fontSize: 0.25 * 100,
                fill: '#fff',
                wordWrap: {
                    width: 1600 - (2 * 100),
                },
            },
            origin: {
                x: 0.5,
                y: 0.5,
            },
    	},
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
    	    graybase: { hexd: 0x4C4B4D, hex: '#4C4B4D' },
    	    graydarkest: { hexd: 0x707274, hex: '#707274' },
    	    graydarker: { hexd: 0x95989B, hex: '#95989B' },
    	    graydark: { hexd: 0xAAADAF, hex: '#AAADAF' },
    	    gray: { hexd: 0xB4B4B4, hex: '#B4B4B4' },
    	    graylight: { hexd: 0xD5D6D7, hex: '#D5D6D7' },
    	    graylighter: { hexd: 0xe3e3e3, hex: '#e3e3e3' },
    	    graylightest: { hexd: 0xf5f6f7, hex: '#f5f6f7' },
    	    twitter: { hexd: 0x00abf0, hex: '#00abf0' },
    	    facebook: { hexd: 0x3a579a, hex: '#3a579a' },
    	    linkedin: { hexd: 0x127bb6, hex: '#127bb6' },
    	    pinterest: { hexd: 0xcd1c1f, hex: '#cd1c1f' },
    	},
        groups: ['enemies', 'obstacles', 'walls', 'bosses', 'bossprojectiles', 'powerups', 'collectibles', 'explosions'],
        killGroups: ['enemies', 'obstacles', 'walls', 'bosses', 'bossprojectiles'],
        explosionGroups: ['bomb', 'fireball', 'firerock', 'bossprojectile'],
        keys: ['up', 'w', 'down', 's', 'left', 'a', 'right', 'd', 'space'],
        objects: {
            Level1: {
                obstacle1: 'bomb',
                enemy: 'soldier',
            },
            Level2: {
                obstacle1: 'fireball',
                obstacle2: 'firerock',
                enemy: 'pterodactyl',
            },
            Level3: {
                obstacle1: 'eyeblink',
                obstacle2: 'eyegroup',
                enemy: 'eye',
            },
            Level4: {
                obstacle1: 'bomb',
                enemy: 'soldier',
            },
        },
        objectVelocity: {
            x: -250,
            y: -250,
            g: 250,
            a: 65,
        },
        bgVelocity: {
            x: 0.25,
            y: 0.5,
            z: 0.75,
        },
        utils: {
            addImage: function(scene, config, i) {
                var key = scene.scene.key,
                    image = config.images[i];

                if (!rpGame.hasOwnProperty('images')) {
                    rpGame.images = {};
                }

                if (!rpGame.images.hasOwnProperty(key)) {
                    rpGame.images[key] = {};
                }

                rpGame.images[key][i] = scene.add.image(image.x, image.y, i);
                rpGame.images[key][i].depth = 0;
            },
            addAnimation: function(scene, config, key) {
                if (!rpGame.animations.hasOwnProperty(key)) {
                    var animation = config[key],
                        params = {
                            key: key,
                            frames: scene.anims.generateFrameNumbers(animation.sprite, {
                                start: animation.start,
                                end: animation.end
                            }),
                            frameRate: scene.rp.frameRate * animation.frameRate,
                            repeat: animation.repeat,
                        };

                    rpGame.animations[key] = scene.anims.create(params);
                }
            },
            addText: function(scene, text, isTextbox) {
                isTextbox = (typeof isTextbox !== 'undefined') ?  isTextbox : false;

                var key = scene.scene.key;

                if (!rpGame.hasOwnProperty('text')) {
                    rpGame.text = {};
                }

                if (!rpGame.text.hasOwnProperty(key)) {
                    rpGame.text[key] = {};
                }

                if (!isTextbox) {
                    rpGame.text[key][text.key] = scene.add.text(text.x, text.y, text.text, text.styles);
                    rpGame.text[key][text.key].setOrigin(text.origin.x, text.origin.y);
                } else {
                    rpGame.text[key][text.key] = scene.add.text(scene.rp.font.x, scene.rp.font.y, text.text, scene.rp.font.styles);
                    rpGame.text[key][text.key].setOrigin(scene.rp.font.origin.x, scene.rp.font.origin.y);
                }
            },
            //== Buttons
            addMuteBtn: function(scene) {
                if (rpGame.isAudioActive && !rpGame.isTouchActive) {
                    rpGame.muteBtn = scene.add.sprite(rpGame.w - (1.75 * scene.rp.tile), 0.75 * scene.rp.tile, 'controlsSmall', 1).setInteractive();

                    if (rpGame.isAudioMuted) {
                        rpGame.muteBtn.setFrame(2);
                    }

                    rpGame.muteBtn.depth = 60;
                    rpGame.muteBtn.on('pointerdown', function() {
                        if (rpGame.isAudioMuted) {
                            rpGame.muteBtn.setFrame(1);
                        } else {
                            rpGame.muteBtn.setFrame(2);
                        }

                        scene.rp.utils.muteAudio(scene);
                    });
                }
            },
            destroyGame: function(scene) {
                scene.sys.game.destroy(true);

                $('#rpGame').removeClass('active').html('');
                $('#rpGameModal').removeClass('active');

                if (rpGame.hasOwnProperty('heroSelected')) {
                    rpGame.heroSelected = false;
                }

                if (rpGame.hasOwnProperty('hero')) {
                    rpGame.hero.isAlive = false;
                }

                if (rpGame.hasOwnProperty('activeLevel')) {
                    rpGame.activeLevel = 0;
                }

                if (typeof drift !== 'undefined') {
                    drift.on('ready',function(api){
                        api.widget.show();
                    });
                }
            },
            addCloseBtn: function(scene) {
                rpGame.closeBtn = scene.add.sprite(rpGame.w - (0.75 * scene.rp.tile), 0.75 * scene.rp.tile, 'controlsSmall', 0).setInteractive();
                rpGame.closeBtn.depth = 60;
                rpGame.closeBtn.on('pointerdown', function() {
                    scene.rp.utils.destroyGame(scene);
                });
            },
            playAudio: function(scene, key) {
                if (rpGame.isAudioActive && !rpGame.isTouchActive) {
                    var audio, loop, volume;

                    audio = scene.rp.Intro.audio[key];
                    loop = (audio.hasOwnProperty('loop')) ? audio.loop : true;

                    if (rpGame.isAudioMuted) {
                        volume = 0;
                    } else {
                        volume = (audio.hasOwnProperty('volume')) ? audio.volume : 1;
                    }

                    if (rpGame.audio.hasOwnProperty(key)) {
                        rpGame.audio[key].play({ loop: loop, volume: volume });
                    }
                }
            },
            stopAudio: function(audio) {
                if (rpGame.isAudioActive && !rpGame.isTouchActive && rpGame.audio.hasOwnProperty(audio) && rpGame.audio[audio].isPlaying) {
                    rpGame.audio[audio].stop();
                }
            },
            fadeOutAudio: function(scene, audio) {
                if (rpGame.isAudioActive && !rpGame.isTouchActive && rpGame.audio.hasOwnProperty(audio) && rpGame.audio[audio].isPlaying) {
                    if ((rpGame.audio[audio].volume - 0.1) > 0) {
                        rpGame.audio[audio].volume -= 0.1;

                        setTimeout(function() {
                            scene.rp.utils.fadeOutAudio(scene, audio);
                        }, 200);
                    } else {
                        rpGame.audio[audio].stop();
                    }
                }
            },
            muteAudio: function(scene) {
                if (rpGame.isAudioActive && !rpGame.isTouchActive) {
                    rpGame.isAudioMuted = rpGame.isAudioMuted ? false : true;

                    for (var a in rpGame.audio) {
                        rpGame.audio[a].mute = rpGame.isAudioMuted;
                    }
                }
            },
        },
    },
});
