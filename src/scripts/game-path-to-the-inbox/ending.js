var rpApp = rpApp || {};

rpApp.endingUtils = {
	addCharacter: function(type, gender) {
		var name = gender || 'professor',
			animation = type === 'hero' ? 'standLeft' : 'standRight',
			x = 0.25 * rpApp.dimensions.width,
			y = rpApp.dimensions.height - (rpApp.dimensions.ground + (2 * rpApp.tile));

		if (type === 'hero') {
			if (gender === 'male') {
				x = 0.65 * rpApp.dimensions.width;
			} else {
				x = 0.75 * rpApp.dimensions.width;
			}
		}

		rpApp.characters[name] = rpApp.game.add.sprite(x, y, type);

		if (type === 'professor') {
			rpApp.characters[name].scale.setTo(rpApp.tile / rpApp.sprites.all.professor.w, (2 * rpApp.tile) / rpApp.sprites.all.professor.h);
		}

		rpApp.game.physics.enable(rpApp.characters[name], Phaser.Physics.ARCADE);
		rpApp.animations[name] = {};
		rpApp.animations[name][animation] = rpApp.characters[name].animations.add(animation, rpApp.characterConfig[type].animations[animation][name], rpApp.characterConfig[type].fps, true);
	},
	addCharacters: function() {
		rpApp.endingUtils.addCharacter('professor');
		rpApp.endingUtils.addCharacter('hero', 'male');
		rpApp.endingUtils.addCharacter('hero', 'female');
	},
	addConfetti: function() {
		rpApp.emitters.confetti = rpApp.game.add.emitter(rpApp.game.world.centerX, 0, 200);
		rpApp.emitters.confetti.width = rpApp.dimensions.width;
		rpApp.emitters.confetti.minParticleScale = 0.75;
	    rpApp.emitters.confetti.maxParticleScale = 1;
	    rpApp.emitters.confetti.makeParticles('confetti', [0, 1, 2, 3, 4, 5, 6, 7]);
	    rpApp.emitters.confetti.start(false, 5000, 20);
	}
};

rpApp.ending = function() {};

rpApp.ending.prototype = {
	create: function () {
		rpApp.setWorld();

		rpApp.endingUtils.addCharacters();
		rpApp.endingUtils.addConfetti();

		rpApp.gameText.ending = new rpApp.class.text(rpApp.game.world.centerX, rpApp.game.world.centerY, '', 'ending');

		rpApp.textData = {
			text: rpApp.gameText.ending,
			content: rpApp.text.ending,
			line: [],
			wordIndex: 0,
			lineIndex: 0,
			callback: function() {
				rpApp.controls.buttons.infographic = new rpApp.class.button('download', 'infographic', rpApp.game.world.centerX, rpApp.game.world.centerY + rpApp.tile, [1, 0, 1, 0]);
			}
		};
		rpApp.nextLine();

		if (!rpApp.isMobileDevice) {
			rpApp.addAudioButton();
			rpApp.addAudio('ending');
		}

		rpApp.addCloseButton();
	},
	update: function() {
		rpApp.characters.professor.animations.play('standRight');
		rpApp.characters.male.animations.play('standLeft');
		rpApp.characters.female.animations.play('standLeft');
	}
};
