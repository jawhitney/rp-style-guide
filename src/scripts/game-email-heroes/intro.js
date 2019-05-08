var rpGame = rpGame || {};

rpGame.Intro = new Phaser.Class({
    Extends: rpGame.Scene,
	initialize: function Intro() {
        Phaser.Scene.call(this, { key: 'Intro', active: false });
		this.rp.Intro = {
			images: {
				introOverlay: {
					url: this.rp.imageUrl + 'intro-overlay.png',
					x: 0.5 * this.rp.width,
					y: 0.5 * this.rp.height,
				},
                introControls: {
					url: this.rp.imageUrl + 'intro-controls.png',
					x: 0.5 * this.rp.width,
					y: this.rp.height - 45,
                    hideOnMobile: true,
				},
                introControlsGamepad: {
					url: this.rp.imageUrl + 'intro-controls-gamepad.png',
					x: 0.5 * this.rp.width,
					y: this.rp.height - 45,
                    hideOnMobile: true,
				},
                textbox: {
                    url: this.rp.imageUrl + 'textbox.png',
					x: 0.5 * this.rp.width,
					y: !rpGame.isTouchActive ? this.rp.height - (2 * this.rp.tile) : 2.75 * this.rp.tile,
                },
                skipTextSpace: {
                    url: this.rp.imageUrl + 'text-skip-space.png',
					x: 0.5 * this.rp.width,
					y: this.rp.height - (0.75 * this.rp.tile),
                },
                skipTextButton: {
                    url: this.rp.imageUrl + 'text-skip-button.png',
					x: 0.5 * this.rp.width,
					y: this.rp.height - (0.75 * this.rp.tile),
                },
                skipTextTouch: {
                    url: this.rp.imageUrl + 'text-skip-touch.png',
					x: 0.5 * this.rp.width,
					y: 4 * this.rp.tile
                },
                backTransition: {
                    url: this.rp.imageUrl + 'transition-back.png',
					x: 0.5 * this.rp.width,
					y: 0.5 * this.rp.height,
                },
                midTransition: {
                    url: this.rp.imageUrl + 'transition-mid.png',
					x: 0.5 * this.rp.width,
					y: 0.5 * this.rp.height,
                },
                foreTransition: {
                    url: this.rp.imageUrl + 'transition-fore.png',
					x: 0.5 * this.rp.width,
					y: 0.5 * this.rp.height,
                },
                bossHealth: {
                    url: this.rp.imageUrl + 'boss-health.png',
					x: 0.5 * this.rp.width,
					y: 0.75 * this.rp.tile,
                },
                congratsBack: {
					url: this.rp.imageUrl + 'congrats-back.png',
					x: 0.5 * this.rp.width,
					y: 0.5 * this.rp.height,
				},
                congratsLogo: {
					url: this.rp.imageUrl + 'congrats-logo.png',
					x: (2/3) * this.rp.width,
					y: this.rp.height - 88,
				},
                congratsSun: {
                    url: this.rp.imageUrl + 'congrats-sun.png',
					x: this.rp.width,
					y: 0,
                },
			},
            sprites: {
                controls: {
    				url: this.rp.imageUrl + 'controls.png',
    				frameWidth: 1.5 * this.rp.tile,
    				frameHeight: 1.5 * this.rp.tile,
    				endFrame: 4,
    			},
                controlsSmall: {
    				url: this.rp.imageUrl + 'controls-small.png',
    				frameWidth: this.rp.tile,
    				frameHeight: this.rp.tile,
    				endFrame: 2,
    			},
                heroSelect: {
    				url: this.rp.imageUrl + 'hero-select.png',
    				frameWidth: 2.5 * this.rp.tile,
    				frameHeight: 2.5 * this.rp.tile,
    				endFrame: 3,
    			},
    			hero: {
    				url: this.rp.imageUrl + 'hero.png',
    				frameWidth: 3 * this.rp.tile,
    				frameHeight: 1.5 * this.rp.tile,
    				endFrame: 139,
    			},
    			projectile: {
    				url: this.rp.imageUrl + 'projectile.png',
    				frameWidth: 3 * this.rp.tile,
    				frameHeight: 0.5 * this.rp.tile,
    				endFrame: 19,
    			},
    			superProjectile: {
    				url: this.rp.imageUrl + 'super-projectile.png',
    				frameWidth: 3 * this.rp.tile,
    				frameHeight: 3 * this.rp.tile,
    				endFrame: 19,
    			},
                boss: {
    				url: this.rp.imageUrl + 'boss.png',
    				frameWidth: 6 * this.rp.tile,
    				frameHeight: 9 * this.rp.tile,
    				endFrame: 42,
    			},
    			powerups: {
    				url: this.rp.imageUrl + 'powerups.png',
    				frameWidth: 1.5 * this.rp.tile,
    				frameHeight: 1.5 * this.rp.tile,
    				endFrame: 19,
    			},
    			enemies: {
    				url: this.rp.imageUrl + 'enemies.png',
                    frameWidth: 3 * this.rp.tile,
    				frameHeight: 1.5 * this.rp.tile,
    				endFrame: 19,
    			},
                obstacles: {
    				url: this.rp.imageUrl + 'obstacles.png',
                    frameWidth: 1.5 * this.rp.tile,
    				frameHeight: 1.5 * this.rp.tile,
    				endFrame: 59,
    			},
    			walls: {
    				url: this.rp.imageUrl + 'walls.png',
    				frameWidth: 0.5 * this.rp.tile,
    				frameHeight: 0.5 * this.rp.tile,
    				endFrame: 0,
    			},
                congratsHeroes: {
    				url: this.rp.imageUrl + 'congrats-heroes.png',
    				frameWidth: 7.5 * this.rp.tile,
    				frameHeight: 7.5 * this.rp.tile,
    				endFrame: 9,
    			},
                congratsBtn: {
    				url: this.rp.imageUrl + 'congrats-btn.png',
    				frameWidth: 2.2 * this.rp.tile,
    				frameHeight: 0.75 * this.rp.tile,
    				endFrame: 1,
    			},
    		},
			text: {
                progress: {
                    key: 'progress',
                    text: '',
                    x: 0.5 * rpGame.game.canvas.width,
                    y: (0.5 * rpGame.game.canvas.height) - (0.25 * this.rp.tile),
                    styles: {
                        fontFamily: this.rp.font.sans,
                        fontSize: 0.5 * this.rp.tile,
                        fill: '#fff',
                    },
                    origin: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
				intro: {
                    key: 'start',
					text: rpGame.content.intro,
					x: 0.5 * this.rp.width,
					y: 0.43 * this.rp.height,
					styles: {
						fontFamily: this.rp.font.sans,
						fontSize: 0.25 * this.rp.tile,
						fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.56 * rpGame.game.canvas.width
                        },
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
				},
                beginner: {
                    key: 'beginner',
					text: 'BEGINNER',
					x: 0.25 * this.rp.width,
					y: 0.67 * this.rp.height,
					styles: {
						fontFamily: this.rp.font.sans,
						fontSize: 0.5 * this.rp.tile,
                        fontStyle: 'bold',
						fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.5 * rpGame.game.canvas.width
                        },
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
				},
                normal: {
                    key: 'normal',
					text: 'NORMAL',
					x: 0.5 * this.rp.width,
					y: 0.67 * this.rp.height,
					styles: {
						fontFamily: this.rp.font.sans,
						fontSize: 0.5 * this.rp.tile,
                        fontStyle: 'bold',
						fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.5 * rpGame.game.canvas.width
                        },
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
				},
                impossible: {
                    key: 'impossible',
					text: 'IMPOSSIBLE',
					x: 0.75 * this.rp.width,
					y: 0.67 * this.rp.height,
					styles: {
						fontFamily: this.rp.font.sans,
						fontSize: 0.5 * this.rp.tile,
                        fontStyle: 'bold',
						fill: '#fff',
                        align: 'center',
                        wordWrap: {
                            width: 0.5 * rpGame.game.canvas.width
                        },
					},
					origin: {
						x: 0.5,
						y: 0.5,
					},
				},
			},
            audio: {
                //== Intro/Select
                intro: {
                    key: 'intro',
                    file: 'intro-music',
                    volume: 0.75,
                },
                button: {
                    key: 'button',
                    file: 'intro-hero-select',
                    loop: false,
                    volume: 1.0,
                },
                //== Transition
                transition: {
                    key: 'transition',
                    file: 'transition',
                    volume: 0.75,
                },
                //== All levels
                femaleDie: {
                    key: 'femaleDie',
                    file: 'female-death',
                    loop: false,
                    volume: 1.0,
                },
                maleDie: {
                    key: 'maleDie',
                    file: 'male-death',
                    loop: false,
                    volume: 1.0,
                },
                collect: {
                    key: 'collect',
                    file: 'collect',
                    loop: false,
                    volume: 1.0,
                },
                powerUp: {
                    key: 'powerUp',
                    file: 'powerup',
                    loop: false,
                    volume: 1.0,
                },
                powerDown: {
                    key: 'powerDown',
                    file: 'powerdown',
                    loop: false,
                    volume: 1.0,
                },
                shoot: {
                    key: 'shoot',
                    file: 'hero-shoot',
                    loop: false,
                    volume: 1.0,
                },
                killwall: {
                    key: 'killwall',
                    file: 'wall-break',
                    loop: false,
                    volume: 1.0,
                },
                explosion: {
                    key: 'explosion',
                    file: 'explosion',
                    loop: false,
                    volume: 1.0,
                },
                //== Level 1
                music1: {
                    key: 'music1',
                    file: 'level-1-music',
                    volume: 0.75,
                },
                sounds1: {
                    key: 'sounds1',
                    file: 'level-1-city-ambiance',
                    volume: 0.75,
                },
                bomb: {
                    key: 'bomb',
                    file: 'level-1-bomb',
                    loop: false,
                    volume: 1.0,
                },
                soldier: {
                    key: 'soldier',
                    file: 'level-1-soldier',
                    loop: false,
                    volume: 1.0,
                },
                killsoldier: {
                    key: 'killsoldier',
                    file: 'level-1-soldier-death',
                    loop: false,
                    volume: 1.0,
                },
                //== Level 2
                music2: {
                    key: 'music2',
                    file: 'level-2-music',
                    volume: 0.75,
                },
                sounds2: {
                    key: 'sounds2',
                    file: 'level-2-jungle',
                    volume: 0.5,
                },
                fireball: {
                    key: 'fireball',
                    file: 'level-2-fireball',
                    loop: false,
                    volume: 1.0,
                },
                firerock: {
                    key: 'firerock',
                    file: 'level-2-firerock',
                    loop: false,
                    volume: 1.0,
                },
                pterodactyl: {
                    key: 'pterodactyl',
                    file: 'level-2-pterodactyl',
                    loop: false,
                    volume: 1.0,
                },
                killpterodactyl: {
                    key: 'killpterodactyl',
                    file: 'level-2-pterodactyl-death',
                    loop: false,
                    volume: 1.0,
                },
                //== Level 3
                music3: {
                    key: 'music3',
                    file: 'level-3-music',
                    volume: 0.75,
                },
                sounds3: {
                    key: 'sounds3',
                    file: 'level-3-mud-sloshing',
                    volume: 0.25,
                },
                eye: {
                    key: 'eye',
                    file: 'level-3-eye-tentacle',
                    loop: false,
                    volume: 1.0,
                },
                eyeblink: {
                    key: 'eyeblink',
                    file: 'level-3-eye-blink',
                    loop: false,
                    volume: 1.0,
                },
                eyegroup: {
                    key: 'eyegroup',
                    file: 'level-3-eye-group',
                    loop: false,
                    volume: 1.0,
                },
                splat: {
                    key: 'splat',
                    file: 'level-3-eye-splat',
                    loop: false,
                    volume: 1.0,
                },
                //== Level 4
                music4: {
                    key: 'music4',
                    file: 'level-4-music',
                    volume: 0.75,
                },
                sounds4: {
                    key: 'sounds4',
                    file: 'level-4-cybernetic',
                    volume: 0.25,
                },
                bosshurt: {
                    key: 'bosshurt',
                    file: 'level-4-boss-hurt',
                    loop: false,
                    volume: 1.0,
                },
                bossshoot: {
                    key: 'bossshoot',
                    file: 'level-4-boss-fire',
                    loop: false,
                    volume: 1.0,
                },
                bossdie: {
                    key: 'bossdie',
                    file: 'level-4-boss-death',
                    loop: true,
                    volume: 1.0,
                },
                bossexplosion: {
                    key: 'bossexplosion',
                    file: 'level-4-explosions',
                    loop: false,
                    volume: 1.0,
                },
                bosslaser: {
                    key: 'bosslaser',
                    file: 'level-4-boss-laser',
                    loop: false,
                    volume: 1.0,
                },
                //== Congrats
                congrats: {
                    key: 'congrats',
                    file: 'congrats-music',
                    volume: 0.75,
                },
                cheers: {
                    key: 'cheers',
                    file: 'congrats-cheers',
                    volume: 0.25,
                },
            },
		};

        for (var level = 1; level <= rpGame.levels; level++) {
            for (var bg = 0; bg < rpGame.bgs.length; bg++) {
                var background = rpGame.bgs[bg];

                this.rp.Intro.images[background + level] = {
                    url: this.rp.imageUrl + 'level' + level + '-' + background + '.png',
                    x: 0.5 * this.rp.width,
                    y: 0.5 * this.rp.height,
                };
            }
        }
    },
    selectHero: function(scene, hero) {
        rpGame.selectedHero = hero;
        rpGame.heroSelected = true;
        scene.rp.utils.playAudio(scene, 'button');

        if (rpGame.isEvent) {
            scene.selectDifficulty(scene, this, 2);
        } else {
            setTimeout(function() {
                rpGame.selectHero1.destroy();
                rpGame.selectHero2.destroy();

                scene.rp.utils.addText(scene, scene.rp[scene.scene.key].text.beginner);
                scene.rp.utils.addText(scene, scene.rp[scene.scene.key].text.normal);
                scene.rp.utils.addText(scene, scene.rp[scene.scene.key].text.impossible);

                rpGame.text.Intro.beginner.setInteractive();
                rpGame.text.Intro.normal.setInteractive();
                rpGame.text.Intro.impossible.setInteractive();

                rpGame.text.Intro.beginner.on('pointerdown', function() {
                    scene.selectDifficulty(scene, this, 1);
                });

                rpGame.text.Intro.normal.on('pointerdown', function() {
                    scene.selectDifficulty(scene, this, 2);
                });

                rpGame.text.Intro.impossible.on('pointerdown', function() {
                    scene.selectDifficulty(scene, this, 3);
                });
            }, 2000);
        }
    },
    selectDifficulty: function(scene, text, difficulty) {
        rpGame.difficulty = difficulty;

        if (!rpGame.isEvent) {
            text.setColor(scene.rp.colors.yellowdark.hex);
            text.setShadow(2, 2, '#333333', 2, false, true);
            scene.rp.utils.playAudio(scene, 'button');
        }

        setTimeout(function() {
            scene.rp.utils.fadeOutAudio(scene, 'intro');
            scene.scene.stop('Intro');

            if (rpGame.demoMode) {
                scene.scene.start('Demo');
            } else {
                scene.rp.utils.fadeOutAudio(scene, 'intro');
                scene.scene.start('Level1');
            }
        }, 2000);
    },
    preload: function() {
        if (!rpGame.hasOwnProperty('restartGame') || !rpGame.restartGame) {
            var _this = this,
                config = this.rp[this.scene.key],
                audio, sprite;

            rpGame.w = rpGame.game.canvas.width;
            rpGame.h = rpGame.game.canvas.height;

            this.graphics = {
                background: this.add.graphics(),
                progress: this.add.graphics(),
            };

            //== Add background
            this.graphics.background.fillStyle(this.rp.colors.purpledark.hexd, 1);
            this.graphics.background.fillRect(0, 0, rpGame.w, rpGame.h);

            //== Add text
            this.rp.utils.addText(this, config.text.progress);
            rpGame.text[this.scene.key].progress.setShadow(2, 2, '#333333', 2, false, true);

            //== Load audio
            if (rpGame.isAudioActive && !rpGame.isTouchActive) {
                for (var a in config.audio) {
                    audio = config.audio[a];

                    this.load.audio(audio.key, [this.rp.audioUrl + audio.file + '.ogg', this.rp.audioUrl + audio.file + '.mp3']);
                }
            }

            //== Load images
            for (var image in config.images) {
                if (!config.images[image].hasOwnProperty('hideOnMobile') || !rpGame.isTouchActive) {
                    this.load.image(image, config.images[image].url);
                }
            }

            //== Load sprites
            for (var s in config.sprites) {
                sprite = config.sprites[s];

                this.load.spritesheet(s, sprite.url, {
                    frameWidth: sprite.frameWidth,
                    frameHeight: sprite.frameHeight,
                    defaultFrame: sprite.endFrame
                });
            }

            //== Update loading progresss
            this.load.on('progress', function (value) {
                _this.graphics.progress.clear();
                _this.graphics.progress.fillStyle(0xffffff, 1);
                _this.graphics.progress.fillRect(0.25 * rpGame.w, (0.5 * rpGame.h) + (0.25 * _this.rp.tile), 0.5 * rpGame.w * value, 0.5 * _this.rp.tile);

                if (value < 0.25) {
                    rpGame.text[_this.scene.key].progress.setText('The waiting is the hardest part.');
                } else if (value >= 0.25 && value < 0.5) {
                    rpGame.text[_this.scene.key].progress.setText('Have some patience millennials.');
                } else if (value >= 0.5 && value < 0.75) {
                    rpGame.text[_this.scene.key].progress.setText('Good things come to those who wait.');
                } else if (value >= 0.75 && value < 1) {
                    rpGame.text[_this.scene.key].progress.setText('Hopefully this game is one of those good things.');
                } else {
                    rpGame.text[_this.scene.key].progress.setText('The game is ready!!!');
                }
            });

            //== On loading complete
            this.load.on('complete', function() {
                _this.graphics.background.destroy();
                _this.graphics.progress.destroy();

                if (rpGame.isAudioActive && !rpGame.isTouchActive) {
                    rpGame.audio.intro = _this.sound.add('intro');
                    _this.rp.utils.playAudio(_this, 'intro');
                }
            });
        } else {
            if (rpGame.isAudioActive && !rpGame.isTouchActive && !rpGame.audio.intro.isPlaying) {
                this.rp.utils.playAudio(this, 'intro');
            }
        }
    },
    create: function() {
        var _this = this,
            config = this.rp[this.scene.key];

        if (rpGame.isEvent) {
            //== Add timer
            rpGame.events.timer[this.scene.key] = this.time.addEvent({ delay: 0, loop: true });
        }

        //== Add mute button
        this.rp.utils.addMuteBtn(this);

        //== Add close button
        this.rp.utils.addCloseBtn(this);

        //== Add audio
        if (rpGame.isAudioActive && !rpGame.isTouchActive) {
            for (var audio in config.audio) {
                if (!rpGame.audio.hasOwnProperty(audio)) {
                    rpGame.audio[audio] = this.sound.add(audio);
                }
            }
        }

        //== Set background
        rpGame.bgs.forEach(function(bg) {
            rpGame.background[bg] = _this.add.tileSprite(0.5 * rpGame.game.canvas.width, 0.5 * rpGame.h, rpGame.w, rpGame.h, bg + 'Transition', 0);
            rpGame.background[bg].depth = 0;
        });

        //== Add images
        this.rp.utils.addImage(this, config, 'introOverlay');

        if (!rpGame.isTouchActive && !rpGame.isEvent) {
            this.rp.utils.addImage(this, config, 'introControls');
        }

        if (rpGame.isEvent) {
            this.rp.utils.addImage(this, config, 'introControlsGamepad');
        }

        //== Add text
        this.rp.utils.addText(this, config.text.intro);

        //== Add sprites
        rpGame.selectHero1 = this.add.sprite((0.5 * rpGame.w) - (1.75 * this.rp.tile), 0.69 * rpGame.h, 'heroSelect', 0).setInteractive();
        rpGame.selectHero2 = this.add.sprite((0.5 * rpGame.w) + (1.75 * this.rp.tile), 0.69 * rpGame.h, 'heroSelect', 2).setInteractive();

        //== Select hero
        rpGame.selectHero1.on('pointerdown', function() {
            if (!rpGame.heroSelected) {
                _this.selectHero(_this, 1);
                rpGame.selectHero1.setFrame(1);
            }
        });

        rpGame.selectHero2.on('pointerdown', function() {
            if (!rpGame.heroSelected) {
                _this.selectHero(_this, 2);
                rpGame.selectHero2.setFrame(3);
            }
        });

        //== Add option to mute audio
        this.input.keyboard.on('keydown', function(event) {
            if (event.code === 'KeyM') {
                _this.rp.utils.muteAudio(_this);
            }
        });

        //== Add keys
        rpGame.keys = {};

        this.rp.keys.forEach(function(key) {
            rpGame.keys[key] = _this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key.toUpperCase()]);
        });

        if (this.input.gamepad.gamepads.length > 0) {
            //== Gamepad
            rpGame.gamepad = {
                pad: this.input.gamepad.getPad(0),
                axes: {},
                buttons: {}
            };

            rpGame.gamepad.axes.h = rpGame.gamepad.pad.axes[0];
            rpGame.gamepad.axes.v = rpGame.gamepad.pad.axes[1];
            rpGame.gamepad.buttons.b = rpGame.gamepad.pad.buttons[0];
            rpGame.gamepad.buttons.a = rpGame.gamepad.pad.buttons[1];
            rpGame.gamepad.buttons.y = rpGame.gamepad.pad.buttons[2];
            rpGame.gamepad.buttons.x = rpGame.gamepad.pad.buttons[3];
        }
    },
    update: function() {
        //== Background
        rpGame.background.back.tilePositionX += 10;
        rpGame.background.mid.tilePositionX += 20;
        rpGame.background.fore.tilePositionX += 30;

        if (rpGame.hasOwnProperty('gamepad') && !rpGame.heroSelected) {
            if (rpGame.gamepad.buttons.b.value === 1 || rpGame.gamepad.buttons.y.value === 1) {
                this.selectHero(this, 1);
                rpGame.selectHero1.setFrame(1);
            }

            if (rpGame.gamepad.buttons.a.value === 1 || rpGame.gamepad.buttons.x.value === 1) {
                this.selectHero(this, 2);
                rpGame.selectHero2.setFrame(3);
            }
        }

        if (rpGame.isEvent) {
            //== Elapsed time
            this.currenttime = rpGame.events.timer[this.scene.key].elapsed;
            this.elapsed = Math.round(this.currenttime / 1000);

            if (this.elapsed >= 5 && !rpGame.heroSelected) {
                rpGame.demoMode = true;

                if (Math.round(Math.random()) === 0) {
                    this.selectHero(this, 1);
                    rpGame.selectHero1.setFrame(1);
                } else {
                    this.selectHero(this, 2);
                    rpGame.selectHero2.setFrame(3);
                }
            }
        }
    },
});
