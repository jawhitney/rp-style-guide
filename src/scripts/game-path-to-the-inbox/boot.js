var rpApp = rpApp || {};

rpApp.boot = function() {};

rpApp.boot.prototype = {
	preload: function() {
		rpApp.animations = {};
		rpApp.background = {};
		rpApp.characters = {};
		rpApp.collisions = {};
		rpApp.controls = {
			buttons: {},
			cursors: {},
			keys: {},
			gamepad: {}
		};
		rpApp.emitters = {};
		rpApp.gameText = {};
		rpApp.gender = false;
		rpApp.graphics = {};
		rpApp.groups = {};
		rpApp.layers = {};
		rpApp.levelItems = {
			items: []
		};
		rpApp.maps = {};
		rpApp.move = {
			permit: {},
			prevent: {}
		};
		rpApp.music = {};
		rpApp.muteAudio = false;
		rpApp.tileSprites = {};
		rpApp.weapons = {};

		rpApp.game.input.activePointer.capture = true;
	},
	create: function () {
		rpApp.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		rpApp.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		rpApp.game.scale.refresh();
		rpApp.game.scale.pageAlignHorizonally = true;
		rpApp.game.scale.pageAlignVertically = true;

		rpApp.game.input.gamepad.start();
		rpApp.pad = rpApp.game.input.gamepad.pad1;
		rpApp.pad.addCallbacks(this, { onConnect: rpApp.addPadButtons });

		rpApp.game.state.start('load');
	}
};
