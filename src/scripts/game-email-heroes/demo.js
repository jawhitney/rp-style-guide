var rpGame = rpGame || {};

rpGame.Demo = new Phaser.Class({
    Extends: rpGame.Level,
    initialize: function Demo() {
        Phaser.Scene.call(this, { key: 'Demo', active: false });
        this.rp.Demo = {
			text: {
                headline: {
                    key: 'headline',
                    text: 'TOP EMAIL HEROES',
                    x: (2/3) * rpGame.game.canvas.width,
                    y: 0.1 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.75 * this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.5 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                rank: {
                    key: 'rank',
                    text: 'RANK',
                    x: ((2/3) * rpGame.game.canvas.width) - (3.05 * this.rp.tile),
                    y: 0.2 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.5 * this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.5 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                name: {
                    key: 'name',
                    text: 'NAME',
                    x: (2/3) * rpGame.game.canvas.width,
                    y: 0.2 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.5 * this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.5 * rpGame.game.canvas.width,
                        },
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                score: {
                    key: 'score',
                    text: 'SCORE',
                    x: ((2/3) * rpGame.game.canvas.width) + (2.85 * this.rp.tile),
                    y: 0.2 * rpGame.game.canvas.height,
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.5 * this.rp.tile,
                        fontStyle: 'bold',
                        fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.5 * rpGame.game.canvas.width,
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
    addLeaderboardText: function(player, i) {
        var styles = {
                fontFamily: this.rp.font.sans,
                fontSize: 0.4 * this.rp.tile,
                fontStyle: 'bold',
                fill: '#fff',
                align: 'center',
                wordWrap: {
                    width: 0.5 * rpGame.game.canvas.width,
                },
            },
            origin = {
                x: 0.5,
                y: 0.5,
            },
            y = 0.3 * rpGame.game.canvas.height + (i * 0.065 * rpGame.game.canvas.height);

        this.rp.utils.addText(this, {
            key: 'rank' + i,
            text: i + 1,
            x: ((2/3) * rpGame.game.canvas.width) - (3.05 * this.rp.tile),
            y: y,
            styles: styles,
            origin: origin,
        });
        rpGame.text[this.scene.key]['rank' + i].depth = 20;

        this.rp.utils.addText(this, {
            key: 'name' + i,
            text: player[0],
            x: ((2/3) * rpGame.game.canvas.width),
            y: y,
            styles: styles,
            origin: origin,
        });
        rpGame.text[this.scene.key]['name' + i].depth = 20;

        this.rp.utils.addText(this, {
            key: 'score' + i,
            text: player[1],
            x: ((2/3) * rpGame.game.canvas.width) + (2.85 * this.rp.tile),
            y: y,
            styles: styles,
            origin: origin,
        });
        rpGame.text[this.scene.key]['score' + i].depth = 20;
    },
    endDemo: function() {
        var _this = this;

        this.events.off('endDemo', this.endDemo);

        this.rp.utils.playAudio(this, 'button');

        rpGame.restartGame = true;
        rpGame.demoMode = false;
        rpGame.collectibleCount = 0;
        rpGame.heroSelected = false;

        this.tweens.add({
            targets: this.transitionGraphic,
            alpha: 1,
            ease: 'Power1',
            duration: 1000,
            onComplete: function() {
                rpGame.hero.isAlive = false;
                rpGame.hero.destroy();
                _this.scene.stop('Demo');
                _this.scene.start('Intro');
            }
        });
    },
    //== Phaser functions
    preload: function() {
        this.rpPreload();

        if (rpGame.isAudioActive && !rpGame.isTouchActive && !rpGame.audio.intro.isPlaying) {
            this.rp.utils.playAudio(this, 'intro');
        }
    },
    create: function() {
        var _this = this;

        rpGame.activeLevel = 1;
        rpGame.movementDisabled = true;
        rpGame.restart = false;
        rpGame.goToTransition = false;
        rpGame.moveRight = false;
        rpGame.checkGamepad = false;

        //== Add timer
        this.addTimer(this);

        //== Add background
        this.addBackgrounds();

        //== Add hero
        if (!rpGame.hasOwnProperty('hero') || !rpGame.hero.isAlive) {
            rpGame.hero = this.physics.add.sprite(0.25 * rpGame.w, 0.5 * rpGame.h, 'hero', 0);
            rpGame.hero.setCollideWorldBounds(true);
            rpGame.hero.depth = 40;
            rpGame.hero.isAlive = true;

            rpGame.hero.anims.play('hero' + rpGame.selectedHero);
        }

        //== Add text
        for (var text in this.rp[this.scene.key].text) {
            this.rp.utils.addText(this, this.rp[this.scene.key].text[text]);

            if (text === 'headline') {
                rpGame.text[this.scene.key][text].setShadow(5, 5, '#333333', 10, false, true);
            }

            rpGame.text[this.scene.key][text].depth = 20;
        }

        if (!rpApp.cookieExists('return_path_email_heroes_game_scores')) {
            for (var i = 0; i < 10; i++) {
                this.addLeaderboardText(['-', 0], i);
            }
        } else {
            var leaders = JSON.parse(rpApp.getCookie('return_path_email_heroes_game_scores'));

            for (var j = 0; j < leaders.length; j++) {
                this.addLeaderboardText(leaders[j], j);
            }
        }

        rpGame.bgTransition = false;

        this.input.on('pointerdown', function (pointer) {
            _this.endDemo();
        }, this);

        this.events.on('endDemo', this.endDemo, this);
    },
    update: function() {
        var _this = this;

        //== Elapsed time
        this.currenttime = rpGame.events.timer[this.scene.key].elapsed;
        this.elapsed = Math.round(this.currenttime / 1000);

        //== Move background
        rpGame.background.back.tilePositionX += this.rp.bgVelocity.x;
        rpGame.background.mid.tilePositionX += this.rp.bgVelocity.y;
        rpGame.background.fore.tilePositionX += this.rp.bgVelocity.z;

        rpGame.text.Demo.headline.setFontFamily('adelle,serif');

        if (!rpGame.transitionFadeOutStart) {
            rpGame.transitionFadeOutStart = true;

            this.tweens.add({
                targets: this.transitionGraphic,
                alpha: 0,
                ease: 'Power1',
                duration: 1000,
                onComplete: function() {
                    rpGame.checkGamepad = true;
                }
            });
        }

        if (rpGame.hasOwnProperty('gamepad') && rpGame.checkGamepad && rpGame.gamepad.buttons.b.value === 1) {
            this.events.emit('endDemo');
        }

        if (this.elapsed > 0 && this.elapsed % 10 === 0) {
            if (!rpGame.bgTransition) {
                rpGame.bgTransition = true;

                if (rpGame.activeLevel === rpGame.levels) {
                    rpGame.activeLevel = 1;
                } else {
                    rpGame.activeLevel++;
                }

                this.tweens.add({
                    targets: this.transitionGraphic,
                    alpha: 1,
                    ease: 'Power1',
                    duration: 1000,
                    onComplete: function() {
                        _this.addBackgrounds();
                        _this.tweens.add({
                            targets: _this.transitionGraphic,
                            alpha: 0,
                            ease: 'Power1',
                            duration: 1000,
                        });
                    }
                });
            }
        } else {
            rpGame.bgTransition = false;
        }
    },
});
