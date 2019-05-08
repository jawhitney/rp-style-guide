rpGame.Outro = new Phaser.Class({
    Extends: rpGame.Scene,
    initialize: function Outro() {
        Phaser.Scene.call(this, { key: 'Outro', active: false });
    },
    preload: function () {
        this.images = {};
        this.win = rpGame.content.win;
        this.lose = rpGame.content.lose;
        this.complete = rpGame.complete || rpGame.debug.outro === 'win';
    },
    create: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        if (rpGame.isAudioActive && !rpGame.isTouchActive) {
            if (!this.hasOwnProperty('audio')) {
                this.audio = {};
            }

            if (this.complete) {
                this.audio.victorytrumpet = this.sound.add('victorytrumpet');
                rp.playAudio(this, 'victorytrumpet');
            } else {
                this.audio.sadtrombone = this.sound.add('sadtrombone');
                rp.playAudio(this, 'sadtrombone');
            }
        }

        this.graphics = {
            background: this.add.graphics(),
        };
        this.graphics.background.fillStyle(this.complete ? rp.colors.greenlight.hexd : rp.colors.red.hexd, 1);
        this.graphics.background.fillRect(0, 0, rp.w, rp.h);
        this.graphics.background.depth = rpGame.depths.wall;

        this.images.background = this.add.image(0.5 * rp.w, 0.5 * rp.h, 'shapes');
        this.images.background.depth = rpGame.depths.wall;

        if (this.complete) {
            this.confetti = this.add.particles('confetti');
            this.confetti.depth = rpGame.depths.wall;
            this.confettiEmitter = this.confetti.createEmitter({
                x: 0.5 * rp.w,
                y: 0,
                angle: { min: 0, max: 360 },
                frame: Phaser.Utils.Array.NumberArray(0, 7),
                gravityY: 500,
                lifespan: 3000,
                scale: { min: 0.75, max: 1 },
                speed: { min: -500, max: 500 },
            });
        }

        this.images.header = this.add.image(0.5 * rp.w, 0.6 * rp.tile, 'header');
        this.images.header.depth = rpGame.depths.header;

        this.images.object = this.add.image(0.5 * rp.w, 1.2 * rp.tile, this.complete ? 'win' : 'lose');
        this.images.object.depth = rpGame.depths.header;

        rp.addText(this, scene.key, {
            key: 'message',
            text: this.complete ? this.win : this.lose,
            x: 0.5 * rp.w,
            y: 0.5 * rp.h,
            styles: {
                fontSize: 0.4 * rp.tile,
                fontStyle: 'bold',
                wordWrap: {
                    width: 0.6 * rpGame.w
                },
            },
        });
        this.text.message.depth = rpGame.depths.response;

        rp.addText(this, scene.key, {
            key: 'cta',
            text: this.complete ? rpGame.content.winLinkText : rpGame.content.loseLinkText,
            x: 0.5 * rpGame.w,
            y: this.text.message.getBounds().bottom + rp.tile,
            styles: {
                fontStyle: 'bold',
                fontSize: 0.3 * rp.tile,
            },
        });
        this.text.cta.depth = rpGame.depths.response;
        rp.addTextUnderline(this, 'cta', this.text.cta, rpGame.depths.response);
        this.text.cta.setInteractive();
        this.text.cta.on('pointerdown', function () {
            if (_this.complete) {
                window.location.href = rpGame.content.winUrl;
            } else {
                _this.sys.game.destroy(true);

                $('#rpGame').removeClass('active').html('');
                $('#rpGameModal').removeClass('active');
            }
        });
    },
    update: function () {},
});