var rpApp = rpApp || {};

rpApp.gameAssets = {
	audio: rpApp.wpAssetUrl + '/path-to-the-inbox/',
	maps: rpApp.wpAssetUrl + '/path-to-the-inbox/',
	images: rpApp.wpAssetUrl + '/path-to-the-inbox/'
};

rpApp.load = function() {};

rpApp.load.prototype = {
	preload: function() {
		rpApp.setWorld();
 	},
 	create: function() {
		rpApp.game.load.onLoadStart.add(rpApp.load.start, this);
		rpApp.game.load.onFileComplete.add(rpApp.load.fileComplete, this);
	    rpApp.game.load.onLoadComplete.add(rpApp.load.complete, this);

		rpApp.gameText.loading = new rpApp.class.text(rpApp.game.world.centerX, rpApp.game.world.centerY, rpApp.text.loading);

		rpApp.load.start();
 	}
};

rpApp.load.start = function() {
	var sprite, image, audio, level;

	for (sprite in rpApp.sprites.all) {
		rpApp.game.load.spritesheet(sprite, rpApp.gameAssets.images + sprite + '.png', rpApp.sprites.all[sprite].w, rpApp.sprites.all[sprite].h);
	}

	for (image in rpApp.images.all) {
		rpApp.game.load.image(rpApp.images.all[image], rpApp.gameAssets.images + rpApp.images.all[image] + '.png');
	}

	if (rpApp.isMobileDevice) {
		for (sprite in rpApp.sprites.mobile) {
			rpApp.game.load.spritesheet(sprite, rpApp.gameAssets.images + sprite + '.png', rpApp.sprites.mobile[sprite].w, rpApp.sprites.mobile[sprite].h);
		}
	} else {
		for (sprite in rpApp.sprites.desktop) {
			rpApp.game.load.spritesheet(sprite, rpApp.gameAssets.images + sprite + '.png', rpApp.sprites.desktop[sprite].w, rpApp.sprites.desktop[sprite].h);
		}

		for (image in rpApp.images.desktop) {
			rpApp.game.load.image(rpApp.images.desktop[image], rpApp.gameAssets.images + rpApp.images.desktop[image] + '.png');
		}

		for (audio in rpApp.audio) {
			rpApp.game.load.audio(rpApp.audio[audio], [rpApp.gameAssets.audio +  rpApp.audio[audio] + '.ogg', rpApp.gameAssets.audio + rpApp.audio[audio] + '.mp3']);
		}
	}

	for (level in rpApp.levels) {
		if (rpApp.levels[level].bg && rpApp.levels[level].map) {
			if (rpApp.isMobileDevice || !rpApp.levels[level].parallax) {
				rpApp.game.load.image('level-' + level, rpApp.gameAssets.images + 'level-' + level + '.png');
			} else {
				rpApp.game.load.image('level-' + level + '-back', rpApp.gameAssets.images + 'level-' + level + '-back.png');
				rpApp.game.load.image('level-' + level + '-front', rpApp.gameAssets.images + 'level-' + level + '-front.png');
			}

			rpApp.game.load.tilemap('level-' + level, rpApp.gameAssets.maps + 'level-' + level + '.json', null, Phaser.Tilemap.TILED_JSON);
		}
	}

	rpApp.game.load.start();
};

rpApp.load.fileComplete = function(progress, cacheKey, success, totalLoaded, totalFiles) {
	rpApp.gameText.loading.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);
};

rpApp.load.complete = function() {
	rpApp.gameText.loading.setText('Loading complete!');
	rpApp.game.state.start('intro');
};
