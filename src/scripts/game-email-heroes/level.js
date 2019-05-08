var rpGame = rpGame || {};

rpGame.Level = new Phaser.Class({
    Extends: rpGame.Scene,
    level: {
        animations: {
            hero1: {
                sprite: 'hero',
                start: 0,
                end: 19,
                frameRate: 1,
                repeat: -1,
            },
            hero1Powerup: {
                sprite: 'hero',
                start: 40,
                end: 59,
                frameRate: 1,
                repeat: -1,
            },
            hero1Shoot: {
                sprite: 'hero',
                start: 20,
                end: 29,
                frameRate: 2,
                repeat: 0,
            },
            hero1ShootPowerup: {
                sprite: 'hero',
                start: 60,
                end: 69,
                frameRate: 2,
                repeat: 0,
            },
            hero1Die: {
                sprite: 'hero',
                start: 30,
                end: 39,
                frameRate: 1,
                repeat: 0,
            },
            hero2: {
                sprite: 'hero',
                start: 70,
                end: 89,
                frameRate: 1,
                repeat: -1,
            },
            hero2Powerup: {
                sprite: 'hero',
                start: 110,
                end: 129,
                frameRate: 1,
                repeat: -1,
            },
            hero2Shoot: {
                sprite: 'hero',
                start: 90,
                end: 99,
                frameRate: 2,
                repeat: 0,
            },
            hero2ShootPowerup: {
                sprite: 'hero',
                start: 130,
                end: 139,
                frameRate: 2,
                repeat: 0,
            },
            hero2Die: {
                sprite: 'hero',
                start: 100,
                end: 109,
                frameRate: 1,
                repeat: 0,
            },
            projectile: {
                sprite: 'projectile',
                start: 0,
                end: 9,
                frameRate: 1,
                repeat: 0,
            },
            superProjectile: {
                sprite: 'superProjectile',
                start: 0,
                end: 9,
                frameRate: 1,
                repeat: 0,
            },
            powerup: {
                sprite: 'powerups',
                start: 0,
                end: 9,
                frameRate: 1,
                repeat: -1,
            },
            collectible: {
                sprite: 'powerups',
                start: 10,
                end: 19,
                frameRate: 1,
                repeat: -1,
            },
            explosion: {
                sprite: 'obstacles',
                start: 10,
                end: 19,
                frameRate: 1,
                repeat: 0,
            },
        },
        projectiles: {
            projectile: {
                single: 'projectile',
                plural: 'projectiles',
                className: 'Projectile',
            },
            superProjectile: {
                single: 'superProjectile',
                plural: 'superProjectiles',
                className: 'SuperProjectile',
            },
        },
    },
    //== Add functions
    addTimer: function(scene) {
        rpGame.events.timer[scene.scene.key] = scene.time.addEvent({ delay: 0, loop: true });
    },
    addGroups: function() {
        var _this = this;

        this.rp.groups.forEach(function(group) {
            rpGame[group] = {};
            rpGame[group].waves = {};
            rpGame[group].group = _this.physics.add.group();
            rpGame[group].waves[_this.scene.key] = {};
        });
    },
    addDirectionBtn : function(dir, btn) {
        rpGame['btn' + dir] = this.add.sprite(btn.x, btn.y, 'controls', btn.frame).setInteractive();
        rpGame['btn' + dir].depth = 60;
        rpGame['btn' + dir].on('pointerdown', function() {
            rpGame['move' + dir] = true;
        });
        rpGame['btn' + dir].on('pointerup', function() {
            rpGame['move' + dir] = false;
        });
    },
    addTransitionGraphic: function(a) {
        rpGame.transitionFadeOutStart = false;
        rpGame.transitionFadeInStart = false;
        rpGame.transitionFadeInComplete = false;
        rpGame.transitionGraphicAlpha = a;

        this.transitionGraphic = this.add.graphics();
        this.transitionGraphic.fillStyle(0xffffff, 1);
        this.transitionGraphic.fillRect(0, 0, rpGame.w, rpGame.w);
        this.transitionGraphic.depth = 50;
        this.transitionGraphic.setAlpha(rpGame.transitionGraphicAlpha);
    },
    addExplosion: function(x, y) {
        var _this = this;

        rpGame.explosion = this.physics.add.sprite(x, y, 'obstacles', 10);
        rpGame.explosion.depth = 40;

        rpGame.explosion.on('animationcomplete', function(event) {
            _this.destroy(this);
        });

        rpGame.explosion.anims.play('explosion');
        this.rp.utils.playAudio(this, 'explosion');
    },
    addObjects: function(args) {
        var _this = this;

        var wave = rpGame[args.group].waves[this.scene.key],
            object;

        if (!wave.hasOwnProperty(this.elapsed)) {
            wave[this.elapsed] = true;

            args.objects.forEach(function(o) {
                var sprite = o.hasOwnProperty('sprite') ? o.sprite : args.group;

                if (o.hasOwnProperty('blocks')) {
                    for (var block = 0; block < o.blocks; block++) {
                        object = rpGame[args.group].group.create(o.x + (0.25 * _this.rp.tile), o.y + ( (o.y === 0) ? ((block * 0.5 * _this.rp.tile) + (0.25 * _this.rp.tile)) : ((block * -0.5 * _this.rp.tile) - (0.25 * _this.rp.tile)) ), sprite);
                        object.rp = {
                            'type': 'wall',
                            'path': o.path,
                            'invert': false,
                        };
                        object.depth = 30;

                        if (o.hasOwnProperty('vel')) {
                            object.rp.vel = o.vel;
                        }

                        if (rpGame.activeLevel > 0) {
                            object.setFrame(rpGame.activeLevel - 1);
                        }
                    }
                } else {
                    object = rpGame[args.group].group.create(o.x, o.y, sprite);
                    object.rp = {
                        'path': o.path,
                        'invert': false,
                    };
                    object.depth = 30;

                    if (o.hasOwnProperty('vel')) {
                        object.rp.vel = o.vel;
                    }

                    if (args.group === 'collectibles' || args.group === 'powerups') {
                        if (args.group === 'collectibles') {
                            object.rp.type = 'collectible';
                        } else {
                            object.rp.type = 'powerup';
                        }

                        object.setCircle(0.5 * _this.rp.tile, 25, 25);
                    } else if (args.group === 'obstacles') {
                        object.rp.type = _this.rp.objects[_this.scene.key]['obstacle' + o.variation];

                        if (rpGame.activeLevel === 2 && object.rp.type === 'fireball') {
                            object.rp.invert = true;
                        }

                        if (object.rp.type === 'bomb') {
                            object.setCircle(0.5 * _this.rp.tile, 25, 40);
                        } else if (object.rp.type === 'firerock' || object.rp.type === 'eyeblink') {
                            object.setCircle(0.75 * _this.rp.tile);
                        }
                    } else if (args.group === 'enemies') {
                        object.rp.type = _this.rp.objects[_this.scene.key].enemy;
                        object.setSize(2.75 * _this.rp.tile, _this.rp.tile, true);
                    }

                    object.anims.play(object.rp.type);

                    if (rpGame.audio.hasOwnProperty(object.rp.type)) {
                        _this.rp.utils.playAudio(_this, object.rp.type);
                    }
                }
            });
        }
    },
    //== Background functions
    addBackgrounds: function(level) {
        var _this = this;

        level = level || rpGame.activeLevel;

        rpGame.bgs.forEach(function(bg) {
            if (rpGame.hasOwnProperty(bg)) {
                rpGame.background[bg].destroy();
            }

            rpGame.background[bg] = _this.add.tileSprite(0.5 * rpGame.w, 0.5 * rpGame.h, rpGame.w, rpGame.h, bg + level, 0);
            rpGame.background[bg].depth = 0;
        });
    },
    //== Hero functions
    addHero: function() {
        var _this = this;

        if (!rpGame.hasOwnProperty('hero') || !rpGame.hero.isAlive) {
            rpGame.hero = this.physics.add.sprite(1.5 * this.rp.tile, 0.5 * rpGame.h, 'hero', 0);
            rpGame.hero.setCollideWorldBounds(true);
            rpGame.hero.setSize(2.75 * this.rp.tile, this.rp.tile, true);
            rpGame.hero.depth = 40;
            rpGame.hero.isAlive = true;
            rpGame.hero.isInvincible = false;
            rpGame.hero.isPoweredup = false;
            rpGame.hero.isShooting = false;

            rpGame.hero.on('animationcomplete', function(event) {
                if (event.key === 'hero1Shoot' ||
                    event.key === 'hero1ShootPowerup' ||
                    event.key === 'hero2Shoot' ||
                    event.key === 'hero2ShootPowerup') {
                    _this.shootProjectile(this);
                } else if (event.key === 'explosion') {
                    _this.shootProjectile(this);
                }
            });

            rpGame.hero.anims.play('hero' + rpGame.selectedHero);

            var g, group;

            for (g = 0; g < this.rp.groups.length; g++) {
                group = this.rp.groups[g];

                this.physics.add.overlap(rpGame.hero, rpGame[group].group, this.rp.killGroups.includes(group) ? this.killHero : this['heroVS' + group], null, this);
            }

            //== Add projectiles
            for (var p in this.level.projectiles) {
                p = this.level.projectiles[p];
                rpGame[p.classname] = new Phaser.Class(this.getProjectileParams(p.single));
                rpGame[p.plural] = this.physics.add.group({ classType: rpGame[p.classname], runChildUpdate: true });

                for (g = 0; g < this.rp.groups.length; g++) {
                    group = this.rp.groups[g];

                    if (['powerups', 'collectibles', 'explosions'].indexOf(group) === -1) {
                        this.physics.add.overlap(rpGame[p.plural], rpGame[group].group, this.projectilesVSobjects, null, this);
                    }
                }
            }
        }
    },
    killHero: function(hero, object) {
        if (hero.isAlive && !hero.isInvincible && !rpGame.movementDisabled) {
            hero.isAlive = false;
            hero.setCollideWorldBounds(false);
            hero.anims.stop('hero' + rpGame.selectedHero);
            hero.anims.play('hero' + rpGame.selectedHero + 'Die');

            if (this.rp.explosionGroups.indexOf(object.rp.type) !== -1) {
                this.addExplosion(object.x - (0.5 * object.width), object.y);
                object.destroy();
            }

            if (rpGame.selectedHero === 1) {
                this.rp.utils.playAudio(this, 'maleDie');
            } else {
                this.rp.utils.playAudio(this, 'femaleDie');
            }

            for (var timer in rpGame.events.timer) {
                rpGame.events.timer[timer].remove();
            }
        }
    },
    resetHero: function() {
        rpGame.movementDisabled = true;
        rpGame.hero.setAccelerationX(0);
        rpGame.hero.setAccelerationY(0);
        rpGame.hero.setVelocityX(0);
        rpGame.hero.setVelocityY(0);

        this.tweens.add({
            targets: rpGame.hero,
            x: 1.5 * this.rp.tile,
            ease: 'Power1',
            duration: 1000,
        });

        this.tweens.add({
            targets: rpGame.hero,
            y: 0.5 * rpGame.h,
            ease: 'Power1',
            duration: 1000,
        });

        this.tweens.add({
            targets: rpGame.hero,
            rotation: 0,
            ease: 'Power1',
            duration: 250,
        });
    },
    heroShoot: function() {
        if (rpGame.hero.isAlive && !rpGame.hero.isShooting && !rpGame.movementDisabled) {
            rpGame.hero.isShooting = true;

            if (!rpGame.hero.isPoweredup) {
                rpGame.hero.anims.stop('hero' + rpGame.selectedHero);
                rpGame.hero.anims.play('hero' + rpGame.selectedHero + 'Shoot');
                rpGame.hero.projectiles = rpGame.projectiles.get();
            } else {
                rpGame.hero.anims.stop('hero' + rpGame.selectedHero + 'Powerup');
                rpGame.hero.anims.play('hero' + rpGame.selectedHero + 'ShootPowerup');
                rpGame.hero.projectiles = rpGame.superProjectiles.get();
            }

            rpGame.hero.projectiles.setActive(true);
            rpGame.hero.projectiles.setVisible(true);

            if (rpGame.projectiles) {
                rpGame.hero.projectiles.fire(this, rpGame.hero);
            }
        }
    },
    shootProjectile: function(hero) {
        if (hero.isAlive && hero.isShooting) {
            hero.isShooting = false;

            if (hero.isPoweredup) {
                hero.anims.play('hero' + rpGame.selectedHero + 'Powerup');
            } else {
                hero.anims.play('hero' + rpGame.selectedHero);
            }
        }
    },
    powerdown: function() {
        var hero = rpGame.hero;

        if (hero.isAlive && hero.isPoweredup) {
            hero.isPoweredup = false;
            hero.anims.stop('hero' + rpGame.selectedHero + 'Powerup');
            hero.anims.play('hero' + rpGame.selectedHero);
            this.rp.utils.playAudio(this, 'powerDown');
        }
    },
    isOutsideBtn: function(pointer, btn) {
        var d = 0.5 * this.rp.tile;

        if (pointer.x < (btn.x - d) ||
            pointer.x > (btn.x + d) ||
            pointer.y < (btn.y - d) ||
            pointer.y > (btn.y + d) ) {
            return true;
        } else {
            return false;
        }
    },
    isInsideBtn: function(pointer, btn) {
        var d = 0.5 * this.rp.tile;

        if (pointer.x >= (btn.x - d) &&
            pointer.x <= (btn.x + d) &&
            pointer.y <= (btn.y - d) &&
            pointer.y >= (btn.y + d) ) {
            return true;
        } else {
            return false;
        }
    },
    //== Projectile functions
    getProjectileParams: function(projectile) {
        var _this = this;

        return {
            Extends: Phaser.GameObjects.Sprite,
            initialize: function Projectile(scene) {
                Phaser.GameObjects.Sprite.call(this, scene, 0, 0, projectile, 0);
                this.speed = 0;
                this.depth = 50;
            },
            fire: function(scene, player) {
                this.angle = player.angle;
                this.rads = Math.abs(this.angle * (Math.PI / 180));
                this.originx = player.x + player.width - (0.5 * Math.abs(player.width - this.width));
                this.originy = player.y;

                if (projectile === 'superProjectile') {
                    this.body.setCircle(0.75 * _this.rp.tile, 1.5 * _this.rp.tile, 0.75 * _this.rp.tile);
                }

                if (this.angle !== 0) {
                    this.deltay = 3 * scene.rp.tile * Math.sin(this.rads);

                    if (this.angle > 0) {
                        this.originy += this.deltay;
                    } else {
                        this.originy -= this.deltay;
                    }
                }

                this.setPosition(this.originx, this.originy);
                this.speed = Phaser.Math.GetSpeed(1000, 1);
                this.anims.play(projectile);
                _this.rp.utils.playAudio(_this, 'shoot');
            },
            update: function(t, d) {
                this.deltaspeed = this.speed * d;
                this.x += this.deltaspeed * Math.cos(this.rads);

                if (this.angle > 0) {
                    this.y += this.deltaspeed * Math.sin(this.rads);
                } else if (this.angle < 0) {
                    this.y -= this.deltaspeed * Math.sin(this.rads);
                }

                if ((this.x - (0.5 * this.width)) > rpGame.w) {
                    _this.killProjectile(this);
                }
            }
        };
    },
    killProjectile: function(projectile) {
        projectile.setActive(false);
        projectile.setVisible(false);
        projectile.x = -1 * rpGame.w;
        projectile.y = -1 * rpGame.h;
    },
    //== Collide functions
    projectilesVSobjects: function(projectile, object) {
        if (object.rp.type !== 'boss' && object.rp.type !== 'deadBoss') {
            this.addExplosion(object.x - (0.5 * object.width), object.y);

            if (this.rp.explosionGroups.indexOf(object.rp.type) === -1) {
                if (['eye', 'eyeblink', 'eyegroup'].indexOf(object.rp.type) === -1) {
                    this.rp.utils.playAudio(this, 'kill' + object.rp.type);
                } else {
                    this.rp.utils.playAudio(this, 'splat');
                }
            }

            object.destroy();
        } else {
            if (rpGame.boss.rp.health > 1) {
                this.addExplosion(projectile.x + (0.75 * projectile.width), projectile.y);
                this.rp.utils.playAudio(this, 'bosshurt');
                this.rp.utils.playAudio(this, 'explosion');
            }

            rpGame.boss.rp.health--;
        }

        this.killProjectile(projectile);
    },
    heroVSpowerups: function(hero, powerup) {
        var _this = this;

        if (hero.isAlive && !hero.isPoweredup && !rpGame.movementDisabled) {
            powerup.destroy();

            hero.isPoweredup = true;
            hero.anims.stop('hero' + rpGame.selectedHero);
            hero.anims.play('hero' + rpGame.selectedHero + 'Powerup');
            this.rp.utils.playAudio(this, 'powerUp');

            setTimeout(function() {
                _this.events.emit(rpGame.events.powerupcomplete);
            }, 5000);
        }
    },
    heroVScollectibles: function(hero, collectible) {
        if (hero.isAlive && !rpGame.movementDisabled) {
            rpGame.collectibleCount++;
            collectible.destroy();
            this.rp.utils.playAudio(this, 'collect');
        }
    },
    //== Text functions
    addTextbox: function(key) {
        var _this = this;

        if (!rpGame.text.hasOwnProperty(this.scene.key) || !rpGame.text[this.scene.key].hasOwnProperty(key)) {
            rpGame.textBoxActive = true;

            //== Add textbox
            rpGame.images.textbox = this.add.image(this.rp.Intro.images.textbox.x, this.rp.Intro.images.textbox.y, 'textbox');
            rpGame.images.textbox.depth = 10;
            rpGame.images.textbox.setAlpha(0);

            this.tweens.add({
                targets: rpGame.images.textbox,
                alpha: 1,
                ease: 'Power1',
                duration: 500,
            });

            if (rpGame.isEvent) {
                rpGame.skipType = 'skipTextButton';

                rpGame.images.skiptext = this.add.image(this.rp.Intro.images[rpGame.skipType].x, this.rp.Intro.images[rpGame.skipType].y, rpGame.skipType);
                rpGame.images.skiptext.depth = 10;
                rpGame.images.skiptext.setAlpha(0);

                this.tweens.add({
                    targets: rpGame.images.skiptext,
                    alpha: 1,
                    ease: 'Power1',
                    duration: 500,
                });
            }

            //== Add text
            this.rp.utils.addText(this, this.rp[this.scene.key].text[key], true);
            rpGame[this.scene.key + 'TextGraphics'] = this.add.graphics();

            rpGame.text[this.scene.key][key].setPadding(0.5 * this.rp.tile);
            rpGame.text[this.scene.key][key].depth = 20;
            rpGame.text[this.scene.key][key].setAlpha(0);

            this.tweens.add({
                targets: rpGame.text[this.scene.key][key],
                alpha: 1,
                ease: 'Power1',
                duration: 500,
            });
        }
    },
    removeTextbox: function(key) {
        var _this = this;

        rpGame.textBoxActive = false;

        this.tweens.add({
            targets: rpGame.images.textbox,
            alpha: 0,
            ease: 'Power1',
            duration: 500,
            onComplete: function() {
                rpGame.images.textbox.destroy();

                if (rpGame.activeLevel !== 4) {
                    rpGame.movementDisabled = false;
                } else {
                    if (rpGame.bossDeployed) {
                        rpGame.movementDisabled = false;
                    }
                }
            },
        });

        if (rpGame.isEvent) {
            this.tweens.add({
                targets: rpGame.images.skiptext,
                alpha: 0,
                ease: 'Power1',
                duration: 500,
                onComplete: function() {
                    rpGame.images.skiptext.destroy();
                },
            });
        }

        this.tweens.add({
            targets: rpGame.text[this.scene.key][key],
            alpha: 0,
            ease: 'Power1',
            duration: 500,
            onComplete: function() {
                rpGame.text[_this.scene.key][key].destroy();
            },
        });
    },
    //== Misc functions
    destroy: function(obstacle) {
        obstacle.destroy();
    },
    resetGroups: function() {
        var _this = this;

        this.rp.groups.forEach(function(group) {
            if (rpGame.hasOwnProperty(group)) {
                rpGame[group].waves[_this.scene.key] = {};
                rpGame[group].group.clear(true);
            }
        });
    },
    addCollectText: function() {
        rpGame.collectibleCountStart = rpGame.collectibleCount;

        //== Collectible count
        rpGame.collectibleIcon = this.add.sprite(0.75 * this.rp.tile, 0.75 * this.rp.tile, 'powerups', 10);
        rpGame.collectibleIcon.depth = 20;
        rpGame.collectibleCountX = this.add.text(1.5 * this.rp.tile, 0.75 * this.rp.tile, 'x', {
            fontFamily: 'adelle-sans,sans-serif',
            fontSize: 0.5 * 100,
            fill: '#fff',
        }).setOrigin(0.5, 0.5);
        rpGame.collectibleCountX.depth = 20;
        rpGame.collectibleCountText = this.add.text(2 * this.rp.tile, 0.75 * this.rp.tile, rpGame.collectibleCount, {
            fontFamily: 'adelle-sans,sans-serif',
            fontSize: 0.5 * 100,
            fill: '#fff',
        }).setOrigin(0.5, 0.5);
        rpGame.collectibleCountText.depth = 20;
    },
    goToCongrats: function() {
        this.rp.utils.fadeOutAudio(this, 'music' + rpGame.activeLevel);
        this.rp.utils.fadeOutAudio(this, 'sounds' + rpGame.activeLevel);
        this.resetGroups();

        rpGame.restartGame = true;
        rpGame.demoMode = false;
        rpGame.heroSelected = false;
        rpGame.hero.isAlive = false;
        rpGame.hero.destroy();
        this.scene.stop('Level' + rpGame.activeLevel);
        this.scene.start('Congrats');
    },
    //== RP functions
    rpPreload: function() {
        var _this = this;

        rpGame.widths = {
            walls: this.rp.Intro.sprites.walls.frameWidth,
            powerups: this.rp.Intro.sprites.powerups.frameWidth,
            obstacles: this.rp.Intro.sprites.obstacles.frameWidth,
            enemies: this.rp.Intro.sprites.enemies.frameWidth,
        };

        //== Add groups
        this.addGroups();

        //== Animations
        var animation;

        //== Level animations
        if (!rpGame.hasOwnProperty('activeLevel') || rpGame.activeLevel === 0) {
            for (animation in this.level.animations) {
                if (!rpGame.animations.hasOwnProperty(animation)) {
                    this.rp.utils.addAnimation(this, this.level.animations, animation);
                }
            }
        }

        //== Scene animations
        for (animation in this.rp[this.scene.key].animations) {
            this.rp.utils.addAnimation(this, this.rp[this.scene.key].animations, animation);
        }

        //== Transition graphic
        this.addTransitionGraphic(1);
    },
    rpCreate: function(level) {
        // 0: Backgrounds
        // 10: Textbox
        // 20: Text
        // 30: Objects
        // 40: Transition
        // 50: Hero
        // 60: Buttons

        var _this = this;

        rpGame.activeLevel = level;
        rpGame.movementDisabled = true;
        rpGame.restart = false;
        rpGame.goToTransition = false;
        rpGame.moveRight = false;
        rpGame.textBoxActive = true;

        //== Add timer
        this.addTimer(this);

        if (rpGame.isTouchActive) {
            var btns = {
                Left: {
                    frame: 0,
                    x: this.rp.tile,
                    y: rpGame.h - (2.25 * this.rp.tile)
                },
                Right: {
                    frame: 1,
                    x: 3.5 * this.rp.tile,
                    y: rpGame.h - (2.25 * this.rp.tile)
                },
                Up: {
                    frame: 2,
                    x: 2.25 * this.rp.tile,
                    y: rpGame.h - (3.5 * this.rp.tile)
                },
                Down: {
                    frame: 3,
                    x: 2.25 * this.rp.tile,
                    y: rpGame.h - this.rp.tile
                },
                Shoot: {
                    frame: 4,
                    x: rpGame.w - this.rp.tile,
                    y: rpGame.h - this.rp.tile
                },
            };

            for (var btn in btns) {
                this.addDirectionBtn(btn, btns[btn]);
            }

            this.input.on('pointermove', function (pointer) {
                //== Move left
                if (_this.isOutsideBtn(pointer, btns.Left)) {
                    rpGame.moveLeft = false;
                }

                if (_this.isInsideBtn(pointer, btns.Left)) {
                    rpGame.moveLeft = true;
                }

                //== Move up
                if (_this.isOutsideBtn(pointer, btns.Up)) {
                    rpGame.moveUp = false;
                }

                if (_this.isInsideBtn(pointer, btns.Up)) {
                    rpGame.moveUp = true;
                }

                //== Move right
                if (_this.isOutsideBtn(pointer, btns.Right)) {
                    rpGame.moveRight = false;
                }

                if (_this.isInsideBtn(pointer, btns.Right)) {
                    rpGame.moveRight = true;
                }

                //== Move down
                if (_this.isOutsideBtn(pointer, btns.Down)) {
                    rpGame.moveDown = false;
                }

                if (_this.isInsideBtn(pointer, btns.Down)) {
                    rpGame.moveDown = true;
                }
            });

            rpGame.btnShoot = this.add.sprite(btns.Shoot.x, btns.Shoot.y, 'controls', btns.Shoot.frame).setInteractive();
            rpGame.btnShoot.depth = 60;
            rpGame.btnShoot.on('pointerdown', function() {
                _this.heroShoot();
            });
        }

        //== Collectible count
        this.addCollectText();

        //== Add mute button
        this.rp.utils.addMuteBtn(this);

        //== Add close button
        this.rp.utils.addCloseBtn(this);

        //== Add events
        rpGame.events.powerupcomplete = new Phaser.EventEmitter('powerupcomplete');

        if (rpGame.restartGame) {
            this.events.off(rpGame.events.powerupcomplete, this.powerdown);
            this.events.off('changeScene', this.changeScene);
        }

        this.events.on(rpGame.events.powerupcomplete, this.powerdown, this);
        this.events.on('changeScene', this.changeScene, this);

        //== Set audio
        this.rp.utils.playAudio(this, 'music' + rpGame.activeLevel);
        this.rp.utils.playAudio(this, 'sounds' + rpGame.activeLevel);

        //== Add background
        this.addBackgrounds();

        //== Add hero
        this.addHero();

        //== Set key inputs
        this.input.keyboard.on('keydown', function(event) {
            if (event.keyCode === 32) { // Space
                _this.heroShoot();
            }
        });
    },
    rpSkipTextbox: function() {
        if (this.elapsed > 10) {
            if (rpGame.activeLevel !== 4) {
                this.removeTextbox('outro');
                rpGame.goToTransition = true;
            }
        } else {
            this.removeTextbox('intro');

            for (var timer in rpGame.events.timer) {
                rpGame.events.timer[timer].remove();
            }

            rpGame.restart = true;

            this.addTimer(this);
        }
    },
    rpRestart: function() {
        rpGame.movementDisabled = false;
        rpGame.restart = true;

        //== Add timer
        this.addTimer(this);

        //== Reset collect count
        rpGame.collectibleCount = rpGame.collectibleCountStart;

        //== Remove enemies, obstacles, walls
        this.resetGroups();

        //== Remove and add hero
        rpGame.hero.destroy();
        this.addHero();

        //== Add boss
        if (rpGame.activeLevel === 4) {
            this.addBoss();
        }
    },
    rpUpdate: function() {
        var _this = this;

        //== Elapsed time
        this.currenttime = rpGame.events.timer[this.scene.key].elapsed;
        this.elapsed = Math.round(this.currenttime / 1000);

        rpGame.collectibleCountText.setText(rpGame.collectibleCount);

        //== Move background
        if (!rpGame.goToTransition) {
            rpGame.background.back.tilePositionX += this.rp.bgVelocity.x;
            rpGame.background.mid.tilePositionX += this.rp.bgVelocity.y;
            rpGame.background.fore.tilePositionX += this.rp.bgVelocity.z;
        } else {
            rpGame.background.back.tilePositionX += this.rp.bgVelocity.x + ((this.currenttime - rpGame.transitionStart) * this.rp.bgVelocity.x / 25);
            rpGame.background.mid.tilePositionX += this.rp.bgVelocity.y + ((this.currenttime - rpGame.transitionStart) * this.rp.bgVelocity.y / 25);
            rpGame.background.fore.tilePositionX += this.rp.bgVelocity.z + ((this.currenttime - rpGame.transitionStart) * this.rp.bgVelocity.z / 25);
        }

        //== Fade out transition graphic
        if (!rpGame.goToTransition) {
            if (!rpGame.transitionFadeOutStart) {
                rpGame.transitionFadeOutStart = true;

                this.tweens.add({
                    targets: this.transitionGraphic,
                    alpha: 0,
                    ease: 'Power1',
                    duration: 1000,
                });
            }

            if (rpGame.textBoxActive && rpGame.hasOwnProperty('gamepad')) {
                if (rpGame.gamepad.buttons.b.value === 1 && !rpGame.movementDisabled) {
                    this.removeTextbox('intro');
                }
            }

            //== Hero
            if (rpGame.hero.isAlive) {
                if (!rpGame.movementDisabled) {
                    if (rpGame.hasOwnProperty('gamepad')) {
                        if (rpGame.gamepad.axes.v.value === 1) {
                            rpGame.moveDown = true;
                        } else if (rpGame.gamepad.axes.v.value === -1) {
                            rpGame.moveUp = true;
                        } else {
                            rpGame.moveUp = false;
                            rpGame.moveDown = false;
                        }

                        if (rpGame.gamepad.axes.h.value === 1) {
                            rpGame.moveRight = true;
                        } else if (rpGame.gamepad.axes.h.value === -1) {
                            rpGame.moveLeft = true;
                        } else {
                            rpGame.moveRight = false;
                            rpGame.moveLeft = false;
                        }

                        if (rpGame.gamepad.buttons.b.value === 1 || rpGame.gamepad.buttons.a.value === 1 || rpGame.gamepad.buttons.y.value === 1 || rpGame.gamepad.buttons.x.value === 1) {
                            this.heroShoot();
                        }
                    }

                    rpGame.hero.setAccelerationX(0);
                    rpGame.hero.setAccelerationY(0);

                    if (rpGame.keys.up.isDown || rpGame.keys.w.isDown || rpGame.moveUp) {
                        this.tweens.add({
                            targets: rpGame.hero,
                            rotation: -10 * (Math.PI / 180),
                            ease: 'Power1',
                            duration: 250,
                        });

                        rpGame.hero.setAccelerationY(-1000);
            		} else if (rpGame.keys.down.isDown || rpGame.keys.s.isDown || rpGame.moveDown) {
                        this.tweens.add({
                            targets: rpGame.hero,
                            rotation: 10 * (Math.PI / 180),
                            ease: 'Power1',
                            duration: 250,
                        });

                        rpGame.hero.setAccelerationY(1000);
            		} else {
                        this.tweens.add({
                            targets: rpGame.hero,
                            rotation: 0,
                            ease: 'Power1',
                            duration: 250,
                        });

                        rpGame.hero.setAccelerationY(0);

                        if (rpGame.hero.body.velocity.y > 0) {
                            rpGame.hero.body.velocity.y -= 0.05 * Math.abs(rpGame.hero.body.velocity.y);
                        } else if (rpGame.hero.body.velocity.y < 0) {
                            rpGame.hero.body.velocity.y += 0.05 * Math.abs(rpGame.hero.body.velocity.y);
                        }
                    }

            		if (rpGame.keys.left.isDown || rpGame.keys.a.isDown || rpGame.moveLeft) {
                        if (rpGame.hero.x > 1.5 * this.rp.tile) {
                            rpGame.hero.setAccelerationX(-1000);

                            this.tweens.add({
                                targets: rpGame.hero,
                                rotation: 0,
                                ease: 'Power1',
                                duration: 500,
                            });
                        }
            		} else if (rpGame.keys.right.isDown || rpGame.keys.d.isDown || rpGame.moveRight) {
                        if (rpGame.hero.x < (rpGame.w - (1.5 * this.rp.tile))) {
                            rpGame.hero.setAccelerationX(1000);
                        }
            		} else {
                        rpGame.hero.setAccelerationX(0);

                        if (rpGame.hero.body.velocity.x > 0) {
                            rpGame.hero.body.velocity.x -= 0.05 * Math.abs(rpGame.hero.body.velocity.x);
                        } else if (rpGame.hero.body.velocity.x < 0) {
                            rpGame.hero.body.velocity.x += 0.05 * Math.abs(rpGame.hero.body.velocity.x);
                        }
                    }
                } else {
                    if (rpGame.hasOwnProperty('gamepad')) {
                        if (rpGame.gamepad.buttons.b.value === 1 || rpGame.gamepad.buttons.a.value === 1 || rpGame.gamepad.buttons.y.value === 1 || rpGame.gamepad.buttons.x.value === 1) {
                            _this.rpSkipTextbox();
                        }
                    }
                }
            } else {
                if (rpGame.hero.active) {
                    rpGame.hero.setAccelerationX(0);
                    rpGame.hero.setAccelerationY(1000);
                }

                if ((rpGame.hero.y - (0.5 * rpGame.hero.height)) > rpGame.h) {
                    if (!rpGame.isEvent) {
                        this.rpRestart();
                    } else {
                        this.goToCongrats();
                    }
                }
            }

            //== Objects
            this.rp.groups.forEach(function(group) {
                rpGame[group].group.getChildren().forEach(function(child) {
                    if (child.active) {
                        if ((child.x < (-1.5 * child.width)) || (child.y > (rpGame.h + (1.5 * child.height)))) {
                            child.destroy();
                        } else {
                            if (child.hasOwnProperty('rp')) {
                                if (child.rp.path === 'straight') {
                                    if (child.rp.hasOwnProperty('vel') && child.rp.vel.hasOwnProperty('x')) {
                                        child.setVelocityX(child.rp.vel.x);
                                    } else {
                                        child.setVelocityX(_this.rp.objectVelocity.x);
                                    }
                                } else if (child.rp.path === 'fall') {
                                    if (child.body.gravity.y === 0) {
                                        if (child.rp.hasOwnProperty('vel') && child.rp.vel.hasOwnProperty('g')) {
                                            child.setGravityY(child.rp.vel.g);
                                        } else {
                                            child.setGravityY(_this.rp.objectVelocity.g);
                                        }
                                    }

                                    if (child.rp.invert) {
                                        child.setRotation(Math.PI);
                                    }
                                } else if (child.rp.path === 'wave') {
                                    if (child.rp.hasOwnProperty('vel') && child.rp.vel.hasOwnProperty('x')) {
                                        child.setVelocityX(child.rp.vel.x);
                                    } else {
                                        child.setVelocityX(_this.rp.objectVelocity.x);
                                    }

                                    if (child.rp.hasOwnProperty('vel') && child.rp.vel.hasOwnProperty('y')) {
                                        child.setVelocityY(child.rp.vel.y * Math.sin(5 * _this.currenttime / 1000));
                                    } else {
                                        child.setVelocityY(_this.rp.objectVelocity.y * Math.sin(5 * _this.currenttime / 1000));
                                    }
                                } else if (child.rp.path === 'trajectory') {
                                    if (child.body.gravity.y === 0) {
                                        if (child.rp.hasOwnProperty('vel') && child.rp.vel.hasOwnProperty('g')) {
                                            child.setGravityY(child.rp.vel.g);
                                        } else {
                                            child.setGravityY(_this.rp.objectVelocity.g);
                                        }

                                        if (child.rp.hasOwnProperty('vel') && child.rp.vel.hasOwnProperty('x') && child.rp.vel.hasOwnProperty('a')) {
                                            child.setVelocityX(child.rp.vel.x * Math.cos(child.rp.vel.a * Math.PI / 180));
                                        } else {
                                            child.setVelocityX(_this.rp.objectVelocity.x * Math.cos(_this.rp.objectVelocity.a * Math.PI / 180));
                                        }

                                        if (child.rp.hasOwnProperty('vel') && child.rp.vel.hasOwnProperty('y') && child.rp.vel.hasOwnProperty('a')) {
                                            child.setVelocityY(child.rp.vel.y * Math.sin(child.rp.vel.a * Math.PI / 180));
                                        } else {
                                            child.setVelocityY(_this.rp.objectVelocity.y * Math.sin(_this.rp.objectVelocity.a * Math.PI / 180));
                                        }
                                    }

                                    child.setRotation((90 * Math.PI / 180) + Math.atan2(child.body.velocity.y, child.body.velocity.x));
                                }
                            }
                        }
                    }
                });
            });
        } else {
            if (!rpGame.transitionFadeInStart) {
                rpGame.transitionFadeInStart = true;

                this.events.emit('changeScene');
            }
        }
    },
    changeScene: function() {
        var _this = this;

        rpGame.hero.isInvincible = true;
        rpGame.transitionStart = this.currenttime;

        this.rp.utils.fadeOutAudio(this, 'music' + rpGame.activeLevel);
        this.rp.utils.fadeOutAudio(this, 'sounds' + rpGame.activeLevel);
        this.rp.utils.playAudio(this, 'transition');
        this.resetGroups();
        this.addBackgrounds('Transition');
        this.tweens.add({
            targets: this.transitionGraphic,
            alpha: 1,
            ease: 'Power1',
            duration: 4000,
            onComplete: function() {
                _this.rp.utils.fadeOutAudio(_this, 'transition');

                rpGame.hero.isAlive = false;
                rpGame.hero.destroy();

                _this.scene.stop('Level' + rpGame.activeLevel);

                if (rpGame.activeLevel !== rpGame.levels) {
                    _this.scene.start('Level' + (rpGame.activeLevel + 1));
                } else {
                    _this.scene.start('Congrats');
                }
            }
        });
    },
});
