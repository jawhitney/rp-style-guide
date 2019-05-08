var rpGame = rpGame || {};

rpGame.Level4 = new Phaser.Class({
    Extends: rpGame.Level,
    initialize: function Level4() {
        Phaser.Scene.call(this, { key: 'Level4', active: false });
        this.rp.Level4 = {
            animations: {
                bossrepeat: {
    	            sprite: 'boss',
                    start: 20,
                    end: 39,
    	            frameRate: 1,
    	            repeat: -1,
    	        },
                boss: {
    	            sprite: 'boss',
                    start: 20,
                    end: 39,
    	            frameRate: 1,
    	            repeat: 0,
    	        },
                bossprep: {
    	            sprite: 'boss',
                    start: 0,
                    end: 10,
    	            frameRate: 1,
    	            repeat: 0,
    	        },
                bossshoot: {
    	            sprite: 'boss',
                    start: 11,
                    end: 19,
    	            frameRate: 1,
    	            repeat: 0,
    	        },
                bossdead: {
    	            sprite: 'boss',
                    start: 40,
                    end: 41,
    	            frameRate: 0.5,
    	            repeat: -1,
    	        },
                bossprojectile: {
    	            sprite: 'superProjectile',
                    start: 10,
                    end: 19,
    	            frameRate: 2,
    	            repeat: -1,
    	        },
                bosslaser: {
    	            sprite: 'projectile',
                    start: 10,
                    end: 19,
    	            frameRate: 2,
    	            repeat: 0,
    	        },
                bomb: {
                    sprite: 'obstacles',
                    start: 0,
                    end: 9,
                    frameRate: 1,
                    repeat: -1,
                },
                soldier: {
                    sprite: 'enemies',
                    start: 0,
                    end: 9,
                    frameRate: 1,
                    repeat: -1,
                },
    		},
            text: {
                intro: {
                    key: 'intro',
                    text: rpGame.content.levels[4].intro,
                },
            }
        };
    },
    //== RP functions
    addBoss: function() {
        var _this = this;

        rpGame.bossDead = false;
        rpGame.bossRemoved = false;

        if (rpGame.hasOwnProperty('debug') && rpGame.hasOwnProperty('debugLevel')) {
            if (rpGame.debug && rpGame.debugLevel === 4) {
                rpGame.restart = true;
            }
        }

        if (!rpGame.restart) {
            rpGame.boss = rpGame.bosses.group.create(rpGame.w + (2.9 * this.rp.tile), 0.5 * rpGame.h, 'boss');
            rpGame.bossDeployed = false;
            rpGame.bossIntroRepeat = 0;
        } else {
            rpGame.bossIntroRepeat = 8;
            rpGame.boss = rpGame.bosses.group.create(rpGame.w - (2.9 * this.rp.tile), 0.5 * rpGame.h, 'boss');

            if (this.hasOwnProperty('bossHealth')) {
                rpGame.images[this.scene.key].bossHealth.destroy();
                this.bossHealth.destroy();
            }
        }

        rpGame.boss.setCircle(4 * this.rp.tile, this.rp.tile, 0.5 * this.rp.tile);
        rpGame.boss.rp = {
            'type': 'boss',
            'startingHealth': 10,
            'health': 10,
        };
        rpGame.boss.depth = 2;

        rpGame.boss.on('animationstart', function(event) {
            if (event.key === 'bossrepeat') {
                _this.bossRestart();
            }
        });

        rpGame.boss.on('animationrepeat', function(event) {
            if (event.key === 'bossrepeat') {
                _this.bossStart(this);
            }
        });

        rpGame.boss.on('animationcomplete', function(event) {
            if (event.key === 'boss') {
                _this.bossShootStart(this);
            } else if (event.key === 'bossprep') {
                _this.bossShoot(this);
            } else if (event.key === 'bossshoot') {
                _this.bossReload(this);
            }
        });

        rpGame.boss.anims.play('bossrepeat');

        this.rp.utils.addImage(this, this.rp.Intro, 'bossHealth');
        rpGame.images[this.scene.key].bossHealth.depth = 50;

        this.bossHealth = this.add.graphics();
        this.bossHealth.fillStyle(this.rp.colors.red.hexd, 1);
        this.bossHealth.fillRect(425, 56, 794, 38);
        this.bossHealth.depth = 50;
        this.bossHealth.setAlpha(0.5);
    },
    bossStart: function(sprite) {
        if (rpGame.bossIntroRepeat === 8) {
            rpGame.boss.anims.stop('bossrepeat');
            rpGame.boss.anims.play('boss');
        } else {
            rpGame.bossIntroRepeat++;
        }
    },
    bossRestart: function() {
        if (rpGame.restart) {
            rpGame.boss.anims.stop('bossrepeat');
            rpGame.boss.anims.play('boss');
        }
    },
    bossShootStart: function(sprite) {
        this.rp.utils.playAudio(this, 'bossshoot');
        rpGame.boss.anims.play('bossprep');

        if (rpGame.difficulty === 3) {
            this.addObjects({
                group: 'enemies',
                objects: [
                    {
                        x: rpGame.w + (0.5 * rpGame.widths.enemies),
                        y: 0.25 * rpGame.h,
                        path: 'straight',
                        vel: {
                            x: -100 * Math.floor((Math.random() * 7) + 5),
                        }
                    },
                    {
                        x: rpGame.w + (0.5 * rpGame.widths.enemies),
                        y: 0.5 * rpGame.h,
                        path: 'straight',
                        vel: {
                            x: -100 * Math.floor((Math.random() * 7) + 5),
                        }
                    },
                    {
                        x: rpGame.w + (0.5 * rpGame.widths.enemies),
                        y: 0.75 * rpGame.h,
                        path: 'straight',
                        vel: {
                            x: -100 * Math.floor((Math.random() * 7) + 5),
                        }
                    },
                ],
            });
        }
    },
    bossShoot: function(sprite) {
        this.rp.utils.playAudio(this, 'fireball');
        rpGame.bossprojectile = rpGame.bossprojectiles.group.create(rpGame.w - (4 * this.rp.tile), 0.65 * rpGame.h, 'superProjectile');
        rpGame.bossprojectile.depth = 1;
        rpGame.bossprojectile.rp = {
            'type': 'bossprojectile',
        };
        rpGame.bossprojectile.anims.play('bossprojectile');
        rpGame.boss.anims.play('bossshoot');

        if (rpGame.difficulty === 1) {
            rpGame.bossprojectile.setVelocityX(-250);
        } else {
            rpGame.bossprojectile.setVelocityX(-100 * Math.floor((Math.random() * 5) + 4));

            if (Math.floor((Math.random() * 2) + 1) % 2 === 0) {
                rpGame.bossprojectile.setVelocityY(100 * Math.floor((Math.random() * 2) + 1));
            } else {
                rpGame.bossprojectile.setVelocityY(-100 * Math.floor((Math.random() * 2) + 1));
            }

            this.rp.utils.playAudio(this, 'bosslaser');
            rpGame.bosslaser = rpGame.bossprojectiles.group.create(rpGame.w - (6 * this.rp.tile), 3.5 * this.rp.tile, 'projectile');
            rpGame.bosslaser.depth = 3;
            rpGame.bosslaser.rp = {
                'type': 'bossprojectile',
            };
            rpGame.bosslaser.anims.play('bosslaser');
            rpGame.bosslaser.setVelocityX(-500);
        }
    },
    bossReload: function(sprite) {
        rpGame.boss.anims.play('boss');

        if (rpGame.difficulty === 3) {
            this.addObjects({
                group: 'obstacles',
                objects: [
                    {
                        x: rpGame.w,
                        y: rpGame.h,
                        path: 'trajectory',
                        vel: {
                            x: -100 * Math.floor((Math.random() * 10) + 8),
                            y: -1000,
                            g: 500,
                            a: 75,
                        },
                        variation: 1,
                    },
                    {
                        x: rpGame.w,
                        y: rpGame.h,
                        path: 'trajectory',
                        vel: {
                            x: -100 * Math.floor((Math.random() * 10) + 8),
                            y: -1000,
                            g: 500,
                            a: 65,
                        },
                        variation: 1,
                    },
                    {
                        x: rpGame.w,
                        y: rpGame.h,
                        path: 'trajectory',
                        vel: {
                            x: -100 * Math.floor((Math.random() * 10) + 8),
                            y: -1000,
                            g: 500,
                            a: 55,
                        },
                        variation: 1,
                    },
                ],
            });
        }
    },
    //== Phaser functions
    preload: function() {
        this.rpPreload();
    },
    create: function() {
        this.rpCreate(4);
        this.addBoss();
    },
    update: function() {
        var _this = this;

        this.rpUpdate();

        if (!rpGame.restart) {
            if (this.elapsed === 1) {
                this.addTextbox('intro');
            } else if (this.elapsed === 16) {
                this.removeTextbox('intro');
            }
        }

        if (rpGame.boss.rp.health > 0) {
            this.bossHealth.clear();
            this.bossHealth.fillStyle(this.rp.colors.red.hexd, 1);
            this.bossHealth.fillRect(425 + (794 * ((rpGame.boss.rp.startingHealth - rpGame.boss.rp.health) / rpGame.boss.rp.startingHealth)), 56, 794 * (rpGame.boss.rp.health / rpGame.boss.rp.startingHealth), 38);

            if (!rpGame.bossDeployed && rpGame.boss.x <= rpGame.w - (2.9 * this.rp.tile)) {
                rpGame.bossDeployed = true;
            }

            if (rpGame.boss.active) {
                if (!rpGame.bossDeployed) {
                    if (rpGame.boss.body.velocity.x === 0) {
                        rpGame.boss.setVelocityX(-30);
                    }
                } else {
                    if (rpGame.boss.body.velocity.x !== 0) {
                        rpGame.boss.setVelocityX(0);
                    }

                    if (rpGame.movementDisabled) {
                        rpGame.movementDisabled = false;
                    }
                }

                rpGame.bossprojectiles.group.getChildren().forEach(function(child) {
                    if ((child.x < (-1.5 * child.width)) || (child.y > (rpGame.h + (1.5 * child.height)))) {
                        child.destroy();
                    }
                });
            }
        } else {
            rpGame.images[this.scene.key].bossHealth.destroy();
            this.bossHealth.destroy();

            rpGame.hero.isInvincible = true;

            if (!rpGame.bossDead) {
                rpGame.movementDisabled = true;
                this.resetHero();
                rpGame.bossDead = true;
                rpGame.bossRemoved = false;
                i = 1;
                j = 1;

                //== Remove all enemies, obstacles, walls
                this.rp.groups.forEach(function(group) {
                    if (rpGame.hasOwnProperty(group)) {
                        rpGame[group].group.getChildren().forEach(function(child) {
                            child.destroy();
                        });
                    }
                });

                //== Dead boss
                rpGame.deadBoss = rpGame.bosses.group.create(rpGame.boss.x, rpGame.boss.y, 'boss', 10);
                rpGame.deadBoss.rp = {
                    'type': 'deadBoss',
                };
                rpGame.deadBoss.anims.play('bossdead');
                rpGame.boss.destroy();

                //== Boss explosions
                this.tweens.add({
                    targets: rpGame.deadBoss,
                    alpha: 1,
                    ease: 'Power1',
                    duration: 5000,
                    onStart: function() {
                        _this.rp.utils.playAudio(_this, 'bossdie');
                        _this.rp.utils.playAudio(_this, 'bossexplosion');
                    },
                    onComplete: function() {
                        rpGame.bossRemoved = true;

                        _this.tweens.add({
                            targets: rpGame.deadBoss,
                            alpha: 0,
                            ease: 'Power1',
                            duration: 1000,
                            onComplete: function() {
                                rpGame.deadBoss.destroy();
                                _this.rp.utils.fadeOutAudio(_this, 'bossdie');
                                rpGame.goToTransition = true;
                            },
                        });
                    },
                });
            }

            if (!rpGame.bossRemoved) {
                var x, y;

                i = Math.floor((Math.random() * 3) + 2);
                j = Math.floor((Math.random() * 4) + 2);

                x = rpGame.w - (6 * this.rp.tile) + (0.75 * this.rp.tile) + (1.5 * this.rp.tile * (i - 1));
                y = 1.5 * this.rp.tile * (j - 1);

                rpGame.explosion = rpGame.explosions.group.create(x, y, 'obstacles', 10);
                rpGame.explosion.anims.play('explosion');
            } else {
                rpGame.explosions.group.getChildren().forEach(function(child) {
                    child.destroy();
                });
            }
        }
    },
});
