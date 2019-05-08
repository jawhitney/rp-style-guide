var rpGame = rpGame || {};

rpGame.Intro = new Phaser.Class({
    Extends: rpGame.Scene,
    initialize: function Intro() {
        Phaser.Scene.call(this, { key: 'Intro', active: false });
    },
    preload: function () {
        var _this = this,
            scene = this.scene,
            rp = this.rp;

        this.graphics = {
            background: this.add.graphics(),
            progress: this.add.graphics(),
        };

        this.graphics.background.fillStyle(rp.colors.black.hexd, 1);
        this.graphics.background.fillRect(0, 0, rp.w, rp.h);

        this.images = {};

        this.load.setPath(rpApp.wpAssetUrl + '/great-email-escape/');

        for (var object in rpGame.assets.objects) {
            var o = rpGame.assets.objects[object];

            if (o.hasOwnProperty('animation')) {
                this.load.multiatlas(object, object + '.json');
            } else {
                this.load.image(object, [object + '.png', object + '_n.png']);
            }

            if (!rpGame.isTouchActive && o.hasOwnProperty('shadow')) {
                this.load.image(object + '_s', [object + '_s.png', object + '_s_n.png']);
            }
        }

        for (var projectile in rpGame.assets.projectiles) {
            projectile = rpGame.assets.projectiles[projectile];

            this.load.image(projectile, [projectile + '.png', projectile + '_n.png']);
            // this.load.image(object + '_s', [object + '_s.png', object + '_s_n.png']);
        }

        for (var image in rpGame.assets.images) {
            image = rpGame.assets.images[image];

            this.load.image(image, image + '.png');
        }

        for (var sprite in rpGame.assets.sprites) {
            this.load.spritesheet(sprite, sprite + '.png', {
                frameWidth: rpGame.assets.sprites[sprite].frameWidth,
                frameHeight: rpGame.assets.sprites[sprite].frameHeight,
                defaultFrame: 0
            });
        }

        if (rpGame.isAudioActive && !rpGame.isTouchActive) {
            for (var audio in rpGame.assets.audio) {
                this.load.audio(audio, ['sound-' + audio + '.ogg', 'sound-' + audio + '.mp3']);
            }
        }

        this.load.on('progress', function (value) {
            _this.graphics.progress.clear();
            _this.graphics.progress.fillStyle(rp.colors.white.hexd, 1);
            _this.graphics.progress.fillRect(0.25 * rp.w, (0.5 * rp.h) + (0.25 * rp.tile), 0.5 * rp.w * value, 0.5 * rp.tile);
        });

        this.load.on('complete', function () {
            scene.stop('Intro');
            scene.start('Level');
        });
    },
});
