rpGame.Countdown = new Phaser.Class({
    Extends: rpGame.Scene,
    initialize: function Countdown() {
        Phaser.Scene.call(this, { key: 'Countdown', active: false });
    },
    preload: function () {
        this.images = {};
    },
    create: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        if (rpGame.isTouchActive) {
            this.graphics = {
                black: _this.add.graphics()
            };

            this.graphics.black.fillStyle(rp.colors.black.hexd, 0.75);
            this.graphics.black.fillRect(0, 0, rp.w, rp.h);
            this.graphics.black.depth = rpGame.depths.wall;
        }

        this.images.logo = _this.add.image(0.5 * rp.w, 0.3 * rp.h, 'logo');

        rp.addText(this, scene.key, {
            key: 'intro',
            text: rpGame.content.intro,
            x: 0.5 * rp.w,
            y: 0.6 * rp.h,
            styles: {
                font: 'serif',
                fontSize: 0.35 * rp.tile,
                wordWrap: {
                    width: 0.8 * rp.w
                },
            },
        });

        this.images.start = this.add.sprite(0.5 * rp.w, rp.h - (0.5 * (rp.h - this.text.intro.getBounds().bottom)), 'iconslg', 0);
        this.images.start.depth = rpGame.depths.text;
        this.images.start.setInteractive();
        this.images.start.on('pointerdown', function () {
            var transition = 250;

            rpGame.started = true;

            //== Tweens
            if (rpGame.isTouchActive) {
                _this.tweens.add({
                    targets: _this.graphics.black,
                    alpha: 0,
                    ease: 'Power1',
                    duration: transition,
                    onComplete: function() {
                        _this.graphics.black.destroy();
                    }
                });
            }

            _this.tweens.add({
                targets: _this.images.logo,
                alpha: 0,
                ease: 'Power1',
                duration: transition,
                onComplete: function() {
                    _this.images.logo.destroy();
                }
            });

            _this.tweens.add({
                targets: _this.text.intro,
                alpha: 0,
                ease: 'Power1',
                duration: transition,
                onComplete: function() {
                    _this.text.intro.destroy();
                }
            });

            _this.tweens.add({
                targets: _this.images.start,
                alpha: 0,
                ease: 'Power1',
                duration: transition,
                onComplete: function() {
                    _this.images.start.destroy();
                }
            });

            _this.tweens.add({
                targets: _this.images.countdown,
                alpha: 1,
                ease: 'Power1',
                duration: transition,
            });

            _this.tweens.add({
                targets: _this.text.timer,
                alpha: 1,
                ease: 'Power1',
                duration: transition,
            });

            _this.tweens.add({
                targets: _this.images.progress,
                alpha: 1,
                ease: 'Power1',
                duration: transition,
            });

            _this.tweens.add({
                targets: _this.text.progress,
                alpha: 1,
                ease: 'Power1',
                duration: transition,
            });

            if (rpGame.isTouchActive) {
                _this.graphics.header = _this.add.graphics();
                _this.graphics.header.fillStyle(rp.colors.black.hexd, 0.5);
                _this.graphics.header.fillRect(0, 0, rp.w, 1.2 * rp.tile);
                _this.graphics.header.depth = rpGame.depths.wall;
            }
        });

        var btnY = (0.25 * rp.tile) + (0.5 * rp.icon);

        //== Close
        this.images.close = this.add.sprite(rp.w - (0.25 * rp.tile) - (0.5 * rp.icon), btnY, 'icons', 4);
        this.images.close.depth = rpGame.depths.text;
        this.images.close.setInteractive();
        this.images.close.on('pointerdown', function () {
            _this.sys.game.destroy(true);

            $('#rpGame').removeClass('active').html('');
            $('#rpGameModal').removeClass('active');

            if (typeof drift !== 'undefined') {
                drift.on('ready',function(api){
                    api.widget.show();
                });
            }
        });

        var countdownX = this.images.close.getBounds().left - (0.25 * rp.tile) - (0.5 * rp.btn);

        if (rpGame.isAudioActive && !rpGame.isTouchActive) {
            //== Mute
            this.images.mute = this.add.sprite(this.images.close.getBounds().left - (0.25 * rp.tile) - (0.5 * rp.icon), btnY, 'icons', 6);
            this.images.mute.depth = rpGame.depths.text;
            this.images.mute.setInteractive();
            this.images.mute.on('pointerdown', function () {
                if (rpGame.isAudioMuted) {
                    _this.images.mute.setFrame(6);
                } else {
                    _this.images.mute.setFrame(5);
                }

                if (rpGame.isAudioActive && !rpGame.isTouchActive) {
                    rpGame.isAudioMuted = rpGame.isAudioMuted ? false : true;

                    for (var audio in rpGame.assets.audio) {
                        if (scene.get('Level').audio.hasOwnProperty(audio)) {
                            scene.get('Level').audio[audio].mute = rpGame.isAudioMuted;
                        }
                    }
                }
            });

            countdownX = this.images.mute.getBounds().left - (0.25 * rp.tile) - (0.5 * rp.btn);
        }

        //== Countdown
        this.images.countdown = this.add.sprite(countdownX, btnY, 'buttons', 0);
        this.images.countdown.depth = rpGame.depths.text;
        this.images.countdown.setAlpha(0);

        rp.addText(this, scene.key, {
            key: 'timer',
            text: '0:00',
            x: this.images.countdown.getBounds().left + (0.62 * rp.btn),
            y: btnY,
            styles: {
                fontSize: 0.4 * rp.tile,
                fontStyle: 'bold',
            },
        });
        this.text.timer.setAlpha(0);

        //== Progress
        this.images.progress = this.add.sprite(btnY, btnY, 'icons', 3);
        this.images.progress.depth = rpGame.depths.text;
        this.images.progress.setAlpha(0);

        rp.addText(this, scene.key, {
            key: 'progress',
            text: rpGame.totalCorrect + '/' + rpGame.totalQuestions,
            x: (0.75 * rp.tile) + (rp.icon),
            y: btnY,
            styles: {
                fontSize: 0.4 * rp.tile,
                fontStyle: 'bold',
            },
        });
        this.text.progress.setAlpha(0);
    },
    update: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        if (this.text.progress.text !== rpGame.totalCorrect + '/' + rpGame.totalQuestions) {
            this.text.progress.setText(rpGame.totalCorrect + '/' + rpGame.totalQuestions);
        }

        if (rpGame.timeLeft > 0) {
            this.text.timer.setText(rpGame.timeString);
        } else if (!rpGame.over) {
            rpGame.over = true;
            this.text.timer.setText('0:00');
        }
    },
});