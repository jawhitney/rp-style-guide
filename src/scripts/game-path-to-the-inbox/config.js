var rpApp = rpApp || {};

// Constants
rpApp.tile = 96;
rpApp.tiles = {
	x: 64,
	y: 10
};
rpApp.dimensions = {
	height : rpApp.tile * rpApp.tiles.y,
	width: (16 / 9) * rpApp.tile * rpApp.tiles.y,
	ground: rpApp.tile,
	item: {
		avoid: 58
	}
};
rpApp.gravity = 1250; // * Bug in collisions when velocity too high
rpApp.maxGravity = 999;
rpApp.fps = 10;
rpApp.delay = 2000;
rpApp.font = {
	size: 24,
	sans: 'adelle-sans,sans-serif',
	serif: 'adelle,serif',
	color: '#ffffff'
};
rpApp.wordDelay = 125;
rpApp.lineDelay = 2500;
rpApp.fontStyle = {
	default: {
		font: (1.5 * rpApp.font.size) + 'px ' + rpApp.font.sans,
		fill: rpApp.font.color,
		align: 'center',
		wordWrap: true,
		wordWrapWidth: 8 * rpApp.tile
	},
	level: {
		font: (3 * rpApp.font.size) + 'px ' + rpApp.font.serif,
		fill: rpApp.font.color,
		align: 'center'
	},
	instructions: {
		font: (1.5 * rpApp.font.size) + 'px ' + rpApp.font.sans,
		fill: rpApp.font.color,
		align: 'center'
	},
	player: {
		font: (2 * rpApp.font.size) + 'px ' + rpApp.font.serif,
		fill: rpApp.font.color,
		align: 'left'
	},
	progress: {
		font: (1.25 * rpApp.font.size) + 'px ' + rpApp.font.serif,
		fill: rpApp.font.color,
		align: 'center'
	},
	ending: {
		font: (2 * rpApp.font.size) + 'px ' + rpApp.font.sans,
		fill: rpApp.font.color,
		align: 'center',
		wordWrap: true,
		wordWrapWidth: 0.5 * rpApp.dimensions.width
	}
};

// Preload
rpApp.sprites = {
	all : {
		avoid: {
			w: rpApp.dimensions.item.avoid,
			h: rpApp.tile
		},
		boss: {
			w: 340,
			h: 340
		},
		buttons: {
			w: 2 * rpApp.tile,
			h: rpApp.tile
		},
		collect: {
			w: rpApp.tile,
			h: rpApp.tile
		},
		confetti: {
			w: rpApp.tile / 2,
			h: rpApp.tile / 2
		},
		controlsSmall: {
			w: rpApp.tile,
			h: rpApp.tile
		},
		download: {
			w: 312,
			h: rpApp.tile
		},
		exit: {
			w: 2 * rpApp.tile,
			h: 2 * rpApp.tile
		},
		headshot: {
			w: 3 * rpApp.tile,
			h: 3 * rpApp.tile
		},
		hero: {
			w: rpApp.tile,
			h: 2 * rpApp.tile
		},
		professor: {
			w: 392,
			h: 784
		},
		progress: {
			w: 6 * rpApp.tile,
			h: rpApp.tile / 2
		},
		weapons: {
			w: 288,
			h: rpApp.tile
		},
		wheels: {
			w: 825,
			h: 825
		},
	},
	mobile: {
		controls: {
			w: 2 * rpApp.tile,
			h: 2 * rpApp.tile
		}
	},
	desktop: {
		matrix: {
			w: 20,
			h: 613
		},
		rain: {
			w: 12,
			h: 34
		}
	}
};
rpApp.images = {
	all: ['background', 'backgroundFloor', 'clubinbox', 'congratulations', 'intro', 'logo', 'professorBoard'],
	desktop: ['instructions']
};
rpApp.audio = [
	'intro',
	'level-1',
	'level-2',
	'level-3',
	'level-4',
	'level-5',
	'level-6',
	'secret',
	'ending',
	'effect-blast',
	'effect-bomb',
	'effect-button',
	'effect-collect',
	'effect-die',
	'effect-exit',
	'effect-hit',
	'effect-jump',
	'effect-pain',
	'effect-rain',
	'effect-select',
	'effect-shoot-boss',
	'effect-shoot-hero',
	'effect-wheel'
];

// Config
rpApp.player = rpApp.cookieExists('return_path_ptti_user_info') ? JSON.parse(rpApp.getCookie('return_path_ptti_user_info')).firstname : 'Player 1';
rpApp.levels = {
	1: {
		bg: true,
		map: true,
		items: 'collect',
		score: true,
		next: 'title-2',
		parallax: true,
		exit: {
			x: (rpApp.tiles.x * rpApp.tile) - (3.5 * rpApp.tile),
			y: (rpApp.tiles.y * rpApp.tile) - (rpApp.dimensions.ground + (2 * rpApp.tile)),
			animation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		},
		emitters: ['rain']
	},
	2: {
		bg: false,
		map: false,
		wheel: 0,
		next: 'title-3'
	},
	3: {
		bg: true,
		map: true,
		items: 'avoid',
		itemTypes: {
			0: 'trashcans0'
		},
		next: 'title-4',
		parallax: true,
		exit: {
			x: (rpApp.tiles.x * rpApp.tile) - (3.5 * rpApp.tile),
			y: (rpApp.tiles.y * rpApp.tile) - (rpApp.dimensions.ground + (2 * rpApp.tile)),
			animation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (1 * 11); })
		}
	},
	4: {
		bg: false,
		map: false,
		wheel: 1,
		next: 'title-5'
	},
	5: {
		bg: true,
		map: true,
		items: 'avoid',
		itemTypes: {
			0: 'trashcans1'
		},
		next: 'title-6',
		parallax: true,
		exit: {
			x: (rpApp.tiles.x * rpApp.tile) - (3 * rpApp.tile),
			y: (rpApp.tiles.y * rpApp.tile) - (rpApp.dimensions.ground + (2 * rpApp.tile)),
			animation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (2 * 11); })
		},
		emitters: ['matrix']
	},
	6: {
		bg: true,
		map: true,
		next: 'ending',
		boss: true,
		parallax: true,
		exit: {
			x: (rpApp.tiles.x * rpApp.tile) - (3.25 * rpApp.tile),
			y: (rpApp.tiles.y * rpApp.tile) - (rpApp.dimensions.ground + (2 * rpApp.tile)),
			animation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (2 * 11); })
		}
	},
	'secret': {
		bg: false,
		map: false,
		wheel: 0,
		next: 'title-2',
		exit: {
			x: rpApp.dimensions.width - (2.25 * rpApp.tile),
			y: rpApp.dimensions.height - (3 * rpApp.tile),
			animation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		}
	}
};
rpApp.emitterConfig = {
	matrix: [
		{
			x: 0,
			y: 0,
			count: 250,
			width: 2 * rpApp.dimensions.width,
			fixed: true,
			frames: [0, 1, 2, 3, 4],
			lifespan: 2.5,
			scale: {
				min: 0.3,
				max: 0.6
			},
			speed: {
				y: {
					min: 50,
					max: 100
				}
			},
			alpha: {
				min: 0.25,
				max: 0.5
			}
		}
	],
	rain: [
		{
			x: 0.75 * rpApp.tile * rpApp.tiles.x,
			y: 0,
			count: 500,
			width: 2 * rpApp.dimensions.width,
			lifespan: 3,
			scale: {
				min: 0.25,
				max: 0.75
			},
			speed: {
				y: {
					min: 1000,
					max: 1500
				}
			},
			alpha: {
				min: 0.5,
				max: 1.0
			}
		}
	]
};
rpApp.keys = {
	used: {
		w: Phaser.Keyboard.W,
		a: Phaser.Keyboard.A,
		s: Phaser.Keyboard.S,
		d: Phaser.Keyboard.D
	},
	map: {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		65: 'left',
		87: 'up',
		68: 'right',
		83: 'down',
	}
};
rpApp.gamepad = {
	used: {

	}
};
rpApp.characterConfig = {
	professor: {
		fps: rpApp.fps,
		start: {
			x: 0.25 * rpApp.tile,
			y: rpApp.dimensions.height - (0.25 * rpApp.tile)
		},
		animations: {
			standRight: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		}
	},
	hero: {
		fps: rpApp.fps,
		start: {
			default: {
				x: rpApp.tile / 2,
				y: rpApp.dimensions.height - (rpApp.dimensions.ground + (2 * rpApp.tile))
			},
			alt: {
				x: rpApp.tile / 2,
				y: 0
			}
		},
		startingFrame: {
			male: 11,
			female: 66
		},
		animations: {
			standLeft: {
				male: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				female: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (5 * 11); })
			},
			standRight: {
				male: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (1 * 11); }),
				female: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (6 * 11); })
			},
			walkLeft: {
				male: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (2 * 11); }),
				female: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (7 * 11); })
			},
			walkRight: {
				male: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (3 * 11); }),
				female: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (8 * 11); })
			}
		},
		stand: {
			left: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			right: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (1 * 11); })
		},
		walk: {
			left: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (2 * 11); }),
			right: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (3 * 11); })
		},
		jumpLeft: {
			male: 44,
			female: 99
		},
		jumpRight: {
			male: 45,
			female: 100
		},
		dead: {
			male: 46,
			female: 101
		},
		weapon: {
			name: 'weapons',
			ammo: 25,
			fireAngle: 0,
			fireRate: 400,
			bulletFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (1 * 11); }),
			bulletSpeed: 1000,
			x: rpApp.tile,
			y: rpApp.tile / 2
		}
	},
	boss: {
		fps: 2 * rpApp.fps,
		start: {
			default: {
				x: (rpApp.tiles.x * rpApp.tile) - rpApp.dimensions.ground - 340,
				y: rpApp.dimensions.height - rpApp.dimensions.ground - 340
			}
		},
		startingFrame: 0,
		animations: {
			standLeft: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			die: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (1 * 11); })
		},
		weapon: {
			name: 'weapons',
			ammo: 25,
			autofire: true,
			fireAngle: 180,
			fireRate: 3000,
			bulletFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			bulletAngleOffset: 180,
			bulletSpeed: 500,
			x: 0,
			y: 340 / 2
		}
	}
};
rpApp.items = {
	collect: {
		locations: {
			'1': [
				[1, 2],
				[13, 10],
				[13, 5],
				[10, 15],
				[16, 15],
				[29, 10],
				[37, 6],
				[41, 11],
				[45, 13],
				[43, 2],
				[60, 14],
				[63, 0],
				[63, 12],
				[66, 10],
				[73, 9],
				[83, 5],
				[95, 5],
				[101, 3],
				[107, 3],
				[113, 3],
				[101, 11],
				[107, 11],
				[113, 11],
				[125, 0]
			]
		}
	},
	avoid: {
		locations: {
			'3': [11, 21, 31, 45, 53, 65, 85, 95, 107],
			'5': [9, 17.5, 27, 38.5, 47, 53, 59, 66, 76, 90, 103.5, 114, 117]
		}
	},
	animations: {
		'coins': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		'trashcans0': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		'trashcans1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(x) { return x + (1 * 10); })
	}
};

// Functions
rpApp.startGame = function() {
	if (!rpApp.isMobileDevice) {
		rpApp.stopAudio('intro');
	}

	if (rpApp.debug) {
		rpApp.game.state.start(rpApp.debugLevel);
	} else {
		rpApp.game.state.start('title-1');
	}
};

rpApp.setWorld = function() {
	rpApp.game.stage.backgroundColor = '#333';
	rpApp.game.world.setBounds(0, 0, rpApp.dimensions.width, rpApp.dimensions.height);

	if (rpApp.game.state.current === 'secret' || rpApp.game.state.current === 'ending') {
		var image = rpApp.game.state.current === 'secret' ? 'clubinbox' : 'background';

		rpApp.graphics.background = rpApp.game.add.image(rpApp.game.world.centerX, rpApp.game.world.centerY, image);
		rpApp.graphics.background.anchor.set(0.5);

		if (rpApp.game.state.current === 'ending') {
			rpApp.graphics.congratulations = rpApp.game.add.image(rpApp.game.world.centerX, 2.5 * rpApp.tile, 'congratulations');
			rpApp.graphics.congratulations.anchor.set(0.5);
			rpApp.graphics.floor = rpApp.game.add.image(0, rpApp.dimensions.height - rpApp.tile, 'backgroundFloor');
		}

		rpApp.groundPoly = new Phaser.Polygon([
			new Phaser.Point(0, rpApp.dimensions.height - rpApp.tile),
			new Phaser.Point(rpApp.dimensions.width, rpApp.dimensions.height - rpApp.tile),
			new Phaser.Point(rpApp.dimensions.width, rpApp.dimensions.height),
			new Phaser.Point(0, rpApp.dimensions.height)]);
		rpApp.graphics.ground = rpApp.game.add.graphics(0, rpApp.dimensions.height - rpApp.tile);
		rpApp.graphics.ground.drawPolygon(rpApp.groundPoly);
		rpApp.game.physics.arcade.enable(rpApp.graphics.ground);
		rpApp.graphics.ground.enableBody = true;
		rpApp.graphics.ground.body.immovable = true;
	} else {
		if (rpApp.game.state.current !== 'load' && rpApp.game.state.current !== 'intro') {
			rpApp.graphics.background = rpApp.game.add.image(rpApp.game.world.centerX, rpApp.game.world.centerY, 'background');
			rpApp.graphics.background.anchor.set(0.5);
		} else if (rpApp.game.state.current === 'intro') {
			rpApp.graphics.introBackground = rpApp.game.add.image(0, 0, 'level-1-back');
			rpApp.tileSprites.intro = rpApp.game.add.tileSprite(0, 0, rpApp.tiles.x * rpApp.tile, rpApp.dimensions.height, 'intro');

			if (!rpApp.isMobileDevice && !rpApp.isFirefox) {
				rpApp.tileSprites.intro.autoScroll(-100, 0);
			}
		}
	}
};

rpApp.addCloseButton = function() {
	rpApp.controls.buttons.close = new rpApp.class.button('controlsSmall', 'close', rpApp.dimensions.width - (0.75 * rpApp.tile), rpApp.tile / 4, [1, 0, 1, 0]);
};

rpApp.addAudioButton = function() {
	rpApp.controls.buttons.audio = new rpApp.class.button('controlsSmall', 'audio', rpApp.dimensions.width - (1.75 * rpApp.tile), rpApp.tile / 4, rpApp.muteAudio ? [5, 4, 5, 4] : [3, 2, 3, 2]);
};

rpApp.addAudio = function(audio) {
	if (!rpApp.music.hasOwnProperty(audio)) {
		rpApp.music[audio] = rpApp.game.add.audio(audio, 0.5, true);
	}

	if (rpApp.muteAudio) {
		rpApp.music[audio].volume = 0;
	}

	rpApp.music[audio].play();
};

rpApp.stopAudio = function(audio) {
	rpApp.music[audio].stop();
	rpApp.music[audio].position = 0;
};

rpApp.playSoundEffect = function(audio) {
	if (rpApp.music[audio].isPlaying) {
		rpApp.music[audio].stop();
	}

	if (rpApp.muteAudio) {
		rpApp.music[audio].volume = 0;
	}

	rpApp.music[audio].play();
};

rpApp.loopSoundEffect = function(audio) {
	if (!rpApp.music[audio].isPlaying) {
		if (rpApp.muteAudio) {
			rpApp.music[audio].volume = 0;
		}

		rpApp.music[audio].play();
	}
};

rpApp.nextLine = function() {
	if (rpApp.textData.lineIndex < rpApp.textData.content.length) {
		rpApp.textData.text.text = '';
	}

	if (rpApp.textData.lineIndex === rpApp.textData.content.length) {
        return;
    }

    rpApp.textData.line = rpApp.textData.content[rpApp.textData.lineIndex].split(' ');
    rpApp.textData.wordIndex = 0;
    rpApp.game.time.events.repeat(rpApp.wordDelay, rpApp.textData.line.length, rpApp.nextWord, rpApp.textData);
    rpApp.textData.lineIndex++;
};

rpApp.nextWord = function() {
    rpApp.textData.text.text = rpApp.textData.text.text.concat(rpApp.textData.line[rpApp.textData.wordIndex] + ' ');

    rpApp.textData.wordIndex++;

    if (rpApp.textData.wordIndex === rpApp.textData.line.length) {
		if (rpApp.textData.lineIndex === rpApp.textData.content.length) {
			if (rpApp.textData.hasOwnProperty('callback')) {
				rpApp.textData.callback.call();
			}
		}

        rpApp.game.time.events.add(rpApp.lineDelay, rpApp.nextLine, rpApp.textData);
    }
};

// Classes
rpApp.class = {};

rpApp.class.text = function(x, y, message, type) {
	type = type || 'default';

	this.text = rpApp.game.add.text(x, y, message, rpApp.fontStyle[type]);

	if (type !== 'player' && type !== 'ending') {
		this.text.anchor.set(0.5, 0);
	}

	if (type === 'default' || type === 'ending') {
		this.text.anchor.set(0.5);
	}

	if (type === 'player' || type === 'progress') {
		this.text.setShadow(3, 3, '#333', 5);
		this.text.fixedToCamera = true;
	}

	if (type === 'score') {
		this.text.setTextBounds(3, 3, rpApp.dimensions.width, 5);
	}

	return this.text;
};

rpApp.class.button = function(sprite, type, x, y, frames) {
    this.button = rpApp.game.add.button(x, y, sprite, this.click, this, frames[0], frames[1], frames[2], frames[3]);
	this.button.anchor.set(0.5, 0);
	this.button.frames = frames;
    this.button.type = type;
    this.button.fixedToCamera = true;

    return this.button;
};

rpApp.selectCharacter = function(button) {
	if (!rpApp.isMobileDevice) {
		rpApp.playSoundEffect('effect-select');
	}

	rpApp.gender = button.type;
	button.setFrames(button.frames[2], button.frames[2], button.frames[2], button.frames[2]);
	rpApp.game.time.events.add(rpApp.delay, rpApp.startGame, this);
};

rpApp.startLevel = function() {
	rpApp.game.state.start('level-' + rpApp.currentLevel);

	if (!rpApp.isMobileDevice) {
		rpApp.playSoundEffect('effect-button');
	}
};

rpApp.class.button.prototype = {
	i: 0,
	click: function(button) {
		if (button.type === 'start') {
			rpApp.startLevel();
		} else if (button.type === 'close') {
			rpApp.game.destroy();

            $('#rpGame').removeClass('active').html('');
            $('#rpGameModal').removeClass('active');

			if (typeof drift !== 'undefined') {
				drift.on('ready',function(api){
					api.widget.show();
				});
			}
		} else if ((button.type === 'male' || button.type === 'female') && !rpApp.gender) {
			rpApp.selectCharacter(button);
		} else if (button.type === 'audio') {
			var m;

			if (rpApp.muteAudio) {
				rpApp.muteAudio = false;

				for (m in rpApp.music) {
					rpApp.music[m].volume = 0.5;
				}

				button.setFrames(3, 2, 3, 2);
			} else {
				rpApp.muteAudio = true;

				for (m in rpApp.music) {
					rpApp.music[m].volume = 0;
				}

				button.setFrames(5, 4, 5, 4);
			}
		} else if (button.type === 'infographic') {
			window.location.href = typeof rpApp.gameInfographic !== 'undefined' ? rpApp.gameInfographic : '/';
		}
	}
};

rpApp.class.control = function(action, x, y, frames) {
    this.control = rpApp.game.add.button(x, y, 'controls', this.click, this, frames[0], frames[1], frames[2], frames[3]);
    this.control.action = action;
    this.control.fixedToCamera = true;

	if (action !== 'fire') {
		this.control.onInputDown.add(this.down, this);
		this.control.onInputUp.add(this.up, this);
	}

    return this.control;
};

rpApp.class.control.prototype = {
	click: function(control) {
		if (control.action === 'fire') {
			rpApp.play.heroFireWeapon();
		}
	},
	down: function(control) {
		rpApp.characters.hero.move[control.action] = true;
	},
	up: function(control) {
		rpApp.characters.hero.move[control.action] = false;
	}
};

rpApp.class.wheel = function() {
	this.state = rpApp.currentLevel;
	this.slices = 4;
	this.canSpin = true;
	this.board = rpApp.game.add.sprite(rpApp.game.world.centerX, rpApp.game.world.centerY + (0.5 * rpApp.tile), 'wheels');
	this.board.scale.setTo(0.85);
	this.board.frame = rpApp.levels[rpApp.currentLevel].wheel;
	this.board.anchor.set(0.5);
	this.pointer = rpApp.game.add.sprite(rpApp.game.world.centerX, rpApp.game.world.centerY + (0.5 * rpApp.tile), 'wheels');
	this.pointer.scale.setTo(0.85);
	this.pointer.frame = 2;
	this.pointer.anchor.set(0.5);

	this.spin = function() {
		if (this.canSpin) {
			if (!rpApp.isMobileDevice) {
				rpApp.playSoundEffect('effect-wheel');
			}

			this.rounds = rpApp.game.rnd.between(3, 6);
			this.degrees = rpApp.game.rnd.between(0, 360);
			this.selection = this.slices - 1 - Math.floor(this.degrees / (360 / this.slices));
			this.canSpin = false;
			this.spinTween = rpApp.game.add.tween(this.board).to({
				angle: 360 * this.rounds + this.degrees
			}, 3000, Phaser.Easing.Quadratic.Out, true);
			this.spinTween.onComplete.add(this.stop, this);
		}
	};

	this.stop = function() {
		if (!rpApp.isMobileDevice) {
			rpApp.stopAudio('effect-wheel');
		}

		rpApp.game.time.events.add(rpApp.delay, this.next, this);
	};

	this.next = function() {
		if (!rpApp.isMobileDevice) {
			rpApp.stopAudio('level-' + this.state);
		}

		rpApp.itemType = rpApp.levels[parseInt(rpApp.currentLevel) + 1].itemTypes[0];
		rpApp.game.state.start(rpApp.levels[rpApp.currentLevel].next);
	};

	return this;
};

// Gamepad
rpApp.addPadButtons = function() {
	rpApp.controls.gamepad.A = rpApp.pad.getButton(Phaser.Gamepad.XBOX360_A);
    rpApp.controls.gamepad.B = rpApp.pad.getButton(Phaser.Gamepad.XBOX360_B);
    rpApp.controls.gamepad.X = rpApp.pad.getButton(Phaser.Gamepad.XBOX360_X);
    rpApp.controls.gamepad.Y = rpApp.pad.getButton(Phaser.Gamepad.XBOX360_Y);
	rpApp.controls.gamepad.START = rpApp.pad.getButton(Phaser.Gamepad.XBOX360_START);

    rpApp.controls.gamepad.A.onDown.add(rpApp.padOnDown, this);
    rpApp.controls.gamepad.B.onDown.add(rpApp.padOnDown, this);
    rpApp.controls.gamepad.X.onDown.add(rpApp.padOnDown, this);
    rpApp.controls.gamepad.Y.onDown.add(rpApp.padOnDown, this);
	rpApp.controls.gamepad.START.onDown.add(rpApp.padOnDown, this);
};

rpApp.padOnDown = function(button, value) {
	if (rpApp.game.state.current === 'intro') {
		if (button.buttonCode === Phaser.Gamepad.XBOX360_X) {
			rpApp.selectCharacter(rpApp.controls.buttons.male);
		} else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y) {
			rpApp.selectCharacter(rpApp.controls.buttons.female);
		}
	} else if (rpApp.game.state.current.indexOf('title') !== -1) {
		if (button.buttonCode === Phaser.Gamepad.XBOX360_START) {
			rpApp.startLevel();
		}
	} else if (rpApp.game.state.current.indexOf('level') !== -1) {
		if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
			if (rpApp.levels[rpApp.currentLevel].boss) {
				rpApp.play.heroFireWeapon();
			}
		}

		if (!rpApp.levels[rpApp.currentLevel].bg && !rpApp.levels[rpApp.currentLevel].map) {
			rpApp.wheel.spin();
		}
	}
};
