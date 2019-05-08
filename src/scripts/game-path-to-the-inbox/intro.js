var rpApp = rpApp || {};

rpApp.intro = function() {};

rpApp.intro.prototype = {
	create: function () {
		rpApp.setWorld();

		rpApp.graphics.logo = rpApp.game.add.image(rpApp.game.world.centerX, 2 * rpApp.tile, 'logo');
		rpApp.graphics.logo.anchor.set(0.5);

		rpApp.gameText.intro = new rpApp.class.text(rpApp.game.world.centerX, 3 * rpApp.tile, rpApp.player + rpApp.text.welcome + '\n' + rpApp.text.instructions, 'instructions');

		rpApp.controls.buttons.male = new rpApp.class.button('headshot', 'male', rpApp.game.world.centerX - (2 * rpApp.tile), rpApp.game.world.centerY - (0.5 * rpApp.tile), [0, 0, 1, 0]);
		rpApp.controls.buttons.female = new rpApp.class.button('headshot', 'female', rpApp.game.world.centerX + (2 * rpApp.tile), rpApp.game.world.centerY - (0.5 * rpApp.tile), [2, 2, 3, 2]);

		if (!rpApp.isMobileDevice) {
			rpApp.music['effect-select'] = rpApp.game.add.audio('effect-select', 0.5, false);
		}

		if (!rpApp.isMobileDevice) {
			rpApp.graphics.instructions = rpApp.game.add.image(rpApp.game.world.centerX, rpApp.game.world.height - (1.5 * rpApp.tile), 'instructions');
			rpApp.graphics.instructions.anchor.set(0.5);

			rpApp.addAudioButton();
			rpApp.addAudio('intro');
		}

		rpApp.addCloseButton();
	}
};
