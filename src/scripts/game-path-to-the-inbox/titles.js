var rpApp = rpApp || {};

rpApp.titles = {};

for (var level in rpApp.levels) {
	rpApp.titles[level] = function() {};
	rpApp.titles[level].prototype = {
		level: level,
		create: function () {
			rpApp.titles.create(this.level);
		},
		update: function() {
			rpApp.characters.professor.animations.play('standRight');
		}
	};
}

rpApp.titles.create = function(level) {
    rpApp.currentLevel = level;

	rpApp.setWorld();

	rpApp.graphics.board = rpApp.game.add.image(rpApp.game.world.centerX, rpApp.game.world.centerY, 'professorBoard');
	rpApp.graphics.board.anchor.set(0.5);

	rpApp.characters.professor = rpApp.game.add.sprite(rpApp.characterConfig.professor.start.x, rpApp.characterConfig.professor.start.y, 'professor');
	rpApp.characters.professor.anchor.set(0, 1);
	rpApp.characters.professor.animations.add('standRight', rpApp.characterConfig.professor.animations.standRight, rpApp.characterConfig.professor.fps, true);

	rpApp.gameText.level = new rpApp.class.text(rpApp.game.world.centerX, rpApp.tile / 3, 'LEVEL ' + level.toUpperCase(), 'level');
	rpApp.gameText.board = new rpApp.class.text(rpApp.game.world.centerX, rpApp.game.world.centerY, '', '');

	rpApp.controls.buttons.start = new rpApp.class.button('buttons', 'start', rpApp.game.world.centerX, rpApp.dimensions.height - (1.5 * rpApp.tile), [3, 2, 3, 2]);

	rpApp.textData = {
		text: rpApp.gameText.board,
		content: rpApp.text.levels[level],
		line: [],
		wordIndex: 0,
		lineIndex: 0,
		callback: function() {
			rpApp.controls.buttons.start.setFrames(5, 4, 5, 4);
		}
	};
	rpApp.nextLine();

	if (!rpApp.isMobileDevice) {
		rpApp.addAudioButton();
		rpApp.addAudio('level-' + level);
		rpApp.music['effect-button'] = rpApp.game.add.audio('effect-button', 0.5, false);
	}

	rpApp.addCloseButton();
};
