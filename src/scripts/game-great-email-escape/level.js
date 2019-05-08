var rpGame = rpGame || {};

rpGame.Level = new Phaser.Class({
    Extends: rpGame.Scene,
    initialize: function Level() {
        Phaser.Scene.call(this, { key: 'Level', active: false });
    },
    updateObject: function(object, isCorrect) {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        rpGame.questions[object].correct = isCorrect;
        this.images[object].setTint(isCorrect ? rp.colors.greenlight.hexd : rp.colors.red.hexd);

        rpGame.complete = true;

        for (var question in rpGame.questions) {
            if (!rpGame.questions[question].correct) {
                rpGame.complete = false;
                break;
            }
        }
    },
    getValue: function(type) {
        var values = {
            h: {
                min: 0.2 * rpGame.h,
                max: 0.5 * rpGame.h
            },
            x: {
                min: 1000,
                max: 1200
            },
            y: {
                min: 200,
                max: 300
            },
            a: {
                min: 35,
                max: 55
            }
        };

        return Math.floor(Math.random() * (values[type].max - values[type].min + 1) + values[type].min);
    },
    createProjectile: function(group, sprite) {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        if (group.getChildren().length === 0) {
            group.invertProjectile = Math.random() >= 0.5;

            var plane = group.create(group.invertProjectile ? 0 : rp.w, this.getValue('h'), sprite);
            plane.depth = rpGame.depths.object5;

            if (group.invertProjectile) {
                plane.flipX = true;
            }

            rp.playAudio(this, sprite);
        }
    },
    updateProjectiles: function(group) {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        group.getChildren().forEach(function(child, i) {
            child.setPipeline('Light2D');

            if (child.x < 0 ||
                child.x > rp.w ||
                child.y > rp.h) {
                child.destroy();
            } else {
                if (child.body.gravity.y === 0) {
                    var params = {
                        x: _this.getValue('x'),
                        y: _this.getValue('y'),
                        a: _this.getValue('a')
                    };

                    child.setGravityY(500);
                    child.setVelocityX(group.invertProjectile ? params.x : -1 * params.x * Math.cos(params.a * Math.PI / 180));
                    child.setVelocityY(-1 * params.y * Math.sin(params.a * Math.PI / 180));
                }

                child.setRotation((group.invertProjectile ? Math.PI / 180 : Math.PI) + Math.atan2(child.body.velocity.y, child.body.velocity.x));
            }
        });
    },
    goToOutro: function() {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        for (var object in rpGame.questions) {
            scene.stop(rpGame.capitalize(object));
        }

        rp.stopAudio(this, 'alarm');
        scene.stop('Level');
        scene.start('Outro');
        scene.bringToTop('Countdown');
    },
    create: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        //== Timer
        rpGame.timeLeft = rpGame.time * 60;

        if (!this.hasOwnProperty('events')) {
            this.events = {};
        }

        //== Audio
        if (rpGame.isAudioActive && !rpGame.isTouchActive) {
            if (!this.hasOwnProperty('audio')) {
                this.audio = {};
            }

            ['alarm', 'clock', 'correct', 'crown', 'cup', 'fish', 'globe', 'incorrect', 'paperwad', 'plane', 'plant', 'spy'].forEach(function(audio, i) {
                _this.audio[audio] = _this.sound.add(audio);
            });

            rp.playAudio(this, 'alarm');
            rp.playAudio(this, 'spy');
        }

        //== Warning
        this.graphics = {
            warning: this.add.graphics(),
        };
        this.graphics.warning.fillStyle(rp.colors.red.hexd, 1);
        this.graphics.warning.fillRect(0, 0, rp.w, rp.h);
        this.graphics.warning.depth = rpGame.depths.warning;
        this.graphics.warning.setAlpha(0);

        //== Sprites
        for (var key in rpGame.assets.objects) {
            var image = rpGame.assets.objects[key];

            if (!this.hasOwnProperty('normals')) {
                this.normals = {};
            }

            if (!this.hasOwnProperty('images')) {
                this.images = {};
            }

            if (!this.hasOwnProperty('animations')) {
                this.animations = {};
            }

            if (!this.hasOwnProperty('animationZones')) {
                this.animationZones = [];
            }

            if (image.hasOwnProperty('animation')) {
                this.images[key] = _this.add.sprite(image.x, image.y, key, '01');
                this.images[key].animationKey = key;
                this.animationZones.push(key);

                this.animations[key] = this.anims.create({
                    key: key, frames: this.anims.generateFrameNames(key, {
                        start: 0, end: 9, zeroPad: 2
                    }),
                    frameRate: rpGame.frameRate,
                    repeat: -1
                });
            } else {
                this.images[key] = _this.add.sprite(image.x, image.y, key);
            }

            this.images[key].depth = rpGame.depths[image.depth];

            if (!rpGame.isTouchActive) {
                this.images[key].setPipeline('Light2D');
            }

            if (image.hasOwnProperty('question')) {
                if (image.depth === 'wall') {
                    this.images[key + 'Ghost'] = this.add.zone(image.x, image.y, this.images[key].getBounds().width, this.images[key].getBounds().height);
                    this.images[key + 'Ghost'].setOrigin(0.5);
                    this.images[key + 'Ghost'].setInteractive();
                    this.images[key + 'Ghost'].depth = rpGame.depths[image.depth];
                    this.images[key + 'Ghost'].sceneToLaunch = key;
                    this.images[key + 'Ghost'].on('pointerdown', function() {
                        if (rpGame.started && !rpGame.over && !rpGame.questionActive && !rpGame.questions[this.sceneToLaunch].correct) {
                            _this.scene.launch(rpGame.capitalize(this.sceneToLaunch));
                            _this.scene.bringToTop('Countdown');
                        }
                    });
                } else {
                    this.images[key].setInteractive();
                    this.images[key].sceneToLaunch = key;
                    this.images[key].on('pointerdown', function() {
                        if (rpGame.started && !rpGame.over && !rpGame.questionActive && !rpGame.questions[this.sceneToLaunch].correct) {
                            _this.scene.launch(rpGame.capitalize(this.texture.key));
                            _this.scene.bringToTop('Countdown');
                        }
                    });
                }
            }

            if (!rpGame.isTouchActive && image.hasOwnProperty('shadow')) {
                this.images[key + 'Shadow'] = this.add.quad(image.x, image.y, key + '_s');
                this.images[key + 'Shadow'].depth = rpGame.depths[image.depth + 'Shadow'];
                this.images[key + 'Shadow'].setPipeline('Light2D');
            }
        }

        //== Groups
        this.planes = this.physics.add.group();
        this.paperwads = this.physics.add.group();

        //== Lights
        if (!rpGame.isTouchActive) {
            this.light = this.lights.addLight(0.25 * rp.w, 0.25 * rp.h, 500, 0xffffff, 1);
            this.lights.enable();

            this.input.on('pointermove', function (pointer) {
                if (!rpGame.questionActive) {
                    _this.light.x = pointer.x;
                    _this.light.y = pointer.y;

                    for (var key in rpGame.assets.objects) {
                        if (rpGame.assets.objects[key].hasOwnProperty('shadow')) {
                            var image = rpGame.assets.objects[key],
                                shadow = _this.images[key + 'Shadow'],
                                bounds = shadow.getBounds(),
                                dx = _this.light.x - image.x,
                                dy = _this.light.y - image.y,
                                r = Math.sqrt(Math.pow(Math.abs(dx), 2) + Math.pow(Math.abs(dy), 2)),
                                maxdx = (image.x > (rp.w - image.x)) ? image.x : rp.w - image.x,
                                maxdy = (image.y > (rp.h - image.y)) ? image.y : rp.h - image.y,
                                maxr = Math.sqrt(Math.pow(Math.abs(maxdx), 2) + Math.pow(Math.abs(maxdy), 2)),
                                a = 1 * (1 - (r / maxr)),
                                stretch = 0.1,
                                shift = 0.2,
                                left,
                                right,
                                bottom,
                                top;

                            if (dx >= 0) {
                                left = bounds.left - (stretch * Math.abs(dx));
                                right = bounds.right - (shift * stretch * Math.abs(dx));
                            } else {
                                left = bounds.left + (shift * stretch * Math.abs(dx));
                                right = bounds.right + (stretch * Math.abs(dx));
                            }

                            if (dy >= 0) {
                                top = bounds.top - (stretch * Math.abs(dy));
                                bottom = bounds.bottom - (shift * stretch * Math.abs(dy));
                            } else {
                                top = bounds.top + (shift * stretch * Math.abs(dy));
                                bottom = bounds.bottom + (stretch * Math.abs(dy));
                            }

                            shadow.setTopLeft(left, top);
                            shadow.setTopRight(right, top);
                            shadow.setBottomRight(right, bottom);
                            shadow.setBottomLeft(left, bottom);
                            shadow.alphas = [a, a, a, a, a, a];
                        }
                    }

                    _this.animationZones.forEach(function(zone, i) {
                        var object = _this.images[zone],
                            bounds = object.getBounds(),
                            config = rpGame.assets.objects[zone];

                        if (pointer.x >= bounds.left &&
                            pointer.x <= bounds.right &&
                            pointer.y >= bounds.top &&
                            pointer.y <= bounds.bottom) {
                            if (!object.anims.isPlaying) {
                                object.anims.play(zone);

                                if (config.hasOwnProperty('sound')) {
                                    rp.playAudio(_this, config.sound);
                                }
                            }
                        } else {
                            if (object.anims.isPlaying) {
                                object.anims.stop(zone);

                                if (config.hasOwnProperty('sound')) {
                                    rp.stopAudio(_this, config.sound);
                                }
                            }
                        }
                    });
                }
            });
        }

        this.scene.launch('Countdown');
    },
    update: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        if (rpGame.started) {
            if (rpGame.debug.outro) {
                this.goToOutro();
            }

            if (!this.events.hasOwnProperty('timer')) {
                this.events.timer = this.time.addEvent({ delay: 0, loop: true });
            }

            if (!rpGame.complete) {
                rpGame.currenttime = this.events.timer.elapsed;
                rpGame.elapsed = Math.round(rpGame.currenttime / 1000);
                rpGame.timeLeft = (rpGame.time * 60) - rpGame.elapsed;
                rpGame.percentLeft = 1 - (rpGame.timeLeft / (rpGame.time * 60));
                rpGame.minutesLeft = Math.floor(rpGame.timeLeft / 60);
                rpGame.secondsLeft = Math.floor(rpGame.timeLeft) - (60 * rpGame.minutesLeft);
                rpGame.timeString = rpGame.minutesLeft + ':';
                rpGame.timeString += (rpGame.secondsLeft < 10) ? '0' + rpGame.secondsLeft : rpGame.secondsLeft;

                if (rpGame.timeLeft > 0) {
                    if (rpGame.isAudioActive && !rpGame.isTouchActive) {
                        this.audio.alarm.setVolume(rpGame.percentLeft);
                    }

                    this.graphics.warning.setAlpha(0.5 * rpGame.percentLeft);

                    if (rpGame.elapsed > 0) {
                        if (rpGame.elapsed % 7 === 0) {
                            this.createProjectile(this.planes, 'plane');
                        }

                        if (rpGame.elapsed % 11 === 0) {
                            this.createProjectile(this.paperwads, 'paperwad');
                        }

                        this.updateProjectiles(this.planes);
                        this.updateProjectiles(this.paperwads);
                    }
                } else if (!rpGame.over) {
                    this.goToOutro();
                }
            } else {
                this.goToOutro();
            }
        }
    },
});
