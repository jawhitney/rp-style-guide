var rpGame = rpGame || {};

rpGame.Congrats = new Phaser.Class({
    Extends: rpGame.Level,
	initialize: function Congrats() {
        Phaser.Scene.call(this, { key: 'Congrats', active: false });
		this.rp.Congrats = {
			text: {
                headline: {
                    key: 'headline',
                    text: rpGame.content.congrats.headline,
                    x: (2/3) * rpGame.game.canvas.width,
                    y: 0.2 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.75 * this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.4 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                subheadline: {
                    key: 'subheadline',
                    text: rpGame.content.congrats.subheadline,
                    x: (2/3) * rpGame.game.canvas.width,
                    y: 0.39 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.5 * this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.4 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                outro: {
                    key: 'outro',
                    text: rpGame.content.congrats.outro,
                    x: (2/3) * rpGame.game.canvas.width,
                    y: 0.49 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.25 * this.rp.tile,
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.4 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                restart: {
                    key: 'restart',
                    text: 'RESTART GAME',
                    x: (2/3) * rpGame.game.canvas.width,
                    y: 0.8 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.25 * this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.4 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                initial1: {
                    key: 'initial1',
                    text: 'A',
                    x: ((2/3) * rpGame.game.canvas.width) - (0.75 * this.rp.tile),
                    y: 0.69 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.4 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                initial2: {
                    key: 'initial2',
                    text: 'A',
                    x: (2/3) * rpGame.game.canvas.width,
                    y: 0.69 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.4 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                initial3: {
                    key: 'initial3',
                    text: 'A',
                    x: ((2/3) * rpGame.game.canvas.width) + (0.75 * this.rp.tile),
                    y: 0.69 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.4 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
			},
		};
    },
    changeLetter: function() {
        if (!rpGame.directionPressed) {
            if ((rpGame.hasOwnProperty('gamepad') && rpGame.gamepad.axes.v.value === 1) || (rpGame.keys.down.isDown)) {
                if (rpGame.currentLetter < rpGame.alphabet.length - 1) {
                    rpGame.currentLetter++;
                } else {
                    rpGame.currentLetter = 0;
                }
            } else {
                if (rpGame.currentLetter > 0) {
                    rpGame.currentLetter--;
                } else {
                    rpGame.currentLetter = rpGame.alphabet.length - 1;
                }
            }

            rpGame.text.Congrats['initial' + rpGame.currentInitial].setText(rpGame.alphabet[rpGame.currentLetter]);
        }
    },
    setLetter: function() {
        var _this = this;

        if (!rpGame.buttonPressed) {
            this.rp.utils.playAudio(this, 'button');

            rpGame.text.Congrats['initial' + rpGame.currentInitial].setColor(this.rp.colors.bluedark.hex);

            if (rpGame.currentInitial < 3) {
                rpGame.currentLetter = 0;
                rpGame.currentInitial++;
            } else {
                rpGame.initialsSet = true;

                var leaders = [];

                if (rpApp.cookieExists('return_path_email_heroes_game_scores')) {
                    leaders = JSON.parse(rpApp.getCookie('return_path_email_heroes_game_scores'));
                }

                leaders.push([rpGame.text.Congrats.initial1.text + rpGame.text.Congrats.initial2.text + rpGame.text.Congrats.initial3.text, rpGame.collectibleCount, Date.now()]);

                leaders.sort(function(a, b) {
                    return b[1] - a[1] || b[2] - a[2];
                });

                if (leaders.length < 10) {
                    var tempScores = 10 - leaders.length;

                    for (var i = 0; i < tempScores; i++) {
                        leaders.push(['-', 0, 0]);
                    }
                } else if (leaders.length > 10) {
                    leaders.length = 10;
                }

                rpApp.setCookie('return_path_email_heroes_game_scores', JSON.stringify(leaders), 1);

                rpGame.goToTransition = true;
            }
        }
    },
    resetGame: function() {
        this.rp.utils.fadeOutAudio(this, 'congrats');
        this.rp.utils.fadeOutAudio(this, 'cheers');

        rpGame.restartGame = true;
        rpGame.heroSelected = false;
        rpGame.collectibleCount = 0;
        rpGame.text = {};

        this.scene.stop('Congrats');

        if (!rpGame.isEvent) {
            this.scene.start('Intro');
        } else {
            this.scene.start('Demo');
        }
    },
    preload: function() {
        rpGame.resetGame = false;

        //== Transition graphic
        this.addTransitionGraphic(1);
    },
    create: function() {
        var _this = this,
            config = this.rp[this.scene.key];

        rpGame.goToTransition = false;
        rpGame.transitionComplete = false;

        //== Add mute button
        this.rp.utils.addMuteBtn(this);

        //== Add close button
        this.rp.utils.addCloseBtn(this);

        //== Add audio
        this.rp.utils.playAudio(this, 'congrats');
        this.rp.utils.playAudio(this, 'cheers');

        //== Set background
        ['congratsBack', 'congratsLogo', 'congratsSun'].forEach(function(i) {
            _this.rp.utils.addImage(_this, _this.rp.Intro, i);
        });

        //== Add text
        for (var text in this.rp[this.scene.key].text) {
            if (!rpGame.isEvent && ['initial1', 'initial2', 'initial3'].indexOf(text) !== -1) {
                continue;
            }

            this.rp.utils.addText(this, config.text[text]);
            rpGame.text[this.scene.key][text].setAlpha(0);
        }

        if (rpGame.restartGame) {
            this.events.off('resetGame', this.resetGame);
        }

        this.events.on('resetGame', this.resetGame, this);

        //== Add restart button
        rpGame.text.Congrats.restart.setInteractive();
        rpGame.text.Congrats.restart.on('pointerdown', function() {
            rpGame.goToTransition = true;
        });

        //== Add sprites
        rpGame.congratsHeroes = this.add.sprite(0.25 * rpGame.game.canvas.width, 0.55 * rpGame.game.canvas.height, 'congratsHeroes', 0);

        //== Animations
        if (!rpGame.animations.hasOwnProperty('congratsHeroes')) {
            rpGame.animations.congratsHeroes = this.anims.create({
                key: 'congratsHeroes',
                frames: this.anims.generateFrameNumbers('congratsHeroes', {
                    start: 0,
                    end: 9
                }),
                frameRate: this.rp.frameRate,
                repeat: -1,
            });
        }

        rpGame.congratsHeroes.anims.play('congratsHeroes');

        if (!rpGame.isEvent) {
            rpGame.congratsBtn = this.add.sprite((2/3) * rpGame.game.canvas.width, 0.7 * rpGame.game.canvas.height, 'congratsBtn', 0).setInteractive();

            //== Button functionality
            rpGame.congratsBtn.on('pointerdown', function() {
                rpGame.congratsBtn.setFrame(1);
                window.location.href = rpGame.content.congrats.url;
            });
        } else {
            //== Update initials
            rpGame.initialsSet = false;
            rpGame.currentInitial = 1;
            rpGame.currentLetter = 0;
            rpGame.alphabet = [];

            var i = 'A'.charCodeAt(0),
                j = 'Z'.charCodeAt(0);

            for (; i <= j; ++i) {
                rpGame.alphabet.push(String.fromCharCode(i));
            }

            if (rpGame.restartGame) {
                this.events.off('changeLetter', this.changeLetter);
                this.events.off('setLetter', this.setLetter);
            }

            this.events.on('changeLetter', this.changeLetter, this);
            this.events.on('setLetter', this.setLetter, this);
        }
    },
    update: function() {
        var _this = this;

        rpGame.images[this.scene.key].congratsSun.rotation -= 0.001;

        if (!rpGame.goToTransition) {
            if (!rpGame.transitionComplete) {
                rpGame.text.Congrats.headline.setFontFamily('adelle,serif');

                this.tweens.add({
                    targets: this.transitionGraphic,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 1000,
                    onComplete: function() {
                        rpGame.transitionComplete = true;
                    }
                });

                for (var text in this.rp[this.scene.key].text) {
                    this.tweens.add({
                        targets: rpGame.text[this.scene.key][text],
                        alpha: 1,
                        ease: 'Power1',
                        duration: 500,
                    });
                }
            }

            if (rpGame.isEvent && !rpGame.initialsSet) {
                rpGame.text.Congrats['initial' + rpGame.currentInitial].setShadow(5, 5, '#333333', 10, false, true);

                if ((rpGame.hasOwnProperty('gamepad') && (rpGame.gamepad.axes.v.value === 1 || rpGame.gamepad.axes.v.value === -1)) || (rpGame.keys.up.isDown || rpGame.keys.down.isDown)) {
                    this.events.emit('changeLetter');
                    rpGame.directionPressed = true;
                } else {
                    rpGame.directionPressed = false;
                }

                if ((rpGame.hasOwnProperty('gamepad') && rpGame.gamepad.buttons.b.value === 1) || (rpGame.keys.space.isDown)) {
                    this.events.emit('setLetter');
                    rpGame.buttonPressed = true;
                } else {
                    rpGame.buttonPressed = false;
                }
            }
        } else {
            if (!rpGame.resetGame) {
                rpGame.resetGame = true;

                this.events.emit('resetGame');
            }
        }
    },
});
