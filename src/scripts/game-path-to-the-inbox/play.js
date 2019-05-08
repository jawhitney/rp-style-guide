var rpApp = rpApp || {};

rpApp.play = {
	levels: [],
	setWorld: function() {
		rpApp.game.world.setBounds(0, 0, rpApp.tile * rpApp.tiles.x, rpApp.dimensions.height * rpApp.tiles.y);

		if (rpApp.levels[rpApp.currentLevel].parallax && !rpApp.isMobileDevice) {
			rpApp.background.back = rpApp.game.add.tileSprite(0, 0, rpApp.game.cache.getImage('level-' + rpApp.currentLevel + '-back').width, rpApp.game.cache.getImage('level-' + rpApp.currentLevel + '-back').height, 'level-' + rpApp.currentLevel + '-back');
			rpApp.background.front = rpApp.game.add.tileSprite(0, 0, rpApp.game.cache.getImage('level-' + rpApp.currentLevel + '-front').width, rpApp.game.cache.getImage('level-' + rpApp.currentLevel + '-front').height, 'level-' + rpApp.currentLevel + '-front');
		} else {
			rpApp.game.add.image(0, 0, 'level-' + rpApp.currentLevel);
		}
	},
	addMap: function() {
		rpApp.maps.level = rpApp.game.add.tilemap('level-' + rpApp.currentLevel);
	    rpApp.layers.platforms = rpApp.maps.level.createLayer('platforms');
	    rpApp.layers.platforms.visible = false;
	    rpApp.layers.platforms.resizeWorld();
		rpApp.maps.level.setCollisionBetween(1, 1, true, 'platforms');
	},
	addPlayerText: function() {
		rpApp.gameText.player = new rpApp.class.text((rpApp.tile / 2) - (rpApp.font.size / 2), (rpApp.tile / 2) - (rpApp.font.size / 2), rpApp.player.toUpperCase(), 'player');
	},
	addProgressBar: function() {
		rpApp.score = 0;
		rpApp.progress = rpApp.game.add.sprite(rpApp.dimensions.width / 2, rpApp.tile / 2, 'progress');
		rpApp.progress.anchor.set(0.5, 0);
		rpApp.progress.fixedToCamera = true;
		rpApp.gameText.ipwarm = new rpApp.class.text(rpApp.dimensions.width / 2, rpApp.tile / 1.8, '', 'progress');
	},
	addHealthBar: function() {
		rpApp.maxHealth = 10;
		rpApp.health = rpApp.game.add.sprite(rpApp.dimensions.width / 2, rpApp.tile / 2, 'progress');
		rpApp.health.frame = 25;
		rpApp.health.anchor.set(0.5, 0);
		rpApp.health.fixedToCamera = true;

		if (!rpApp.isMobileDevice) {
			rpApp.shootInstructions = new rpApp.class.text(rpApp.dimensions.width / 2, rpApp.tile, 'Use spacebar to shoot', 'progress');
		}
	},
	addSoundEffects: function() {
		rpApp.music['effect-die'] = rpApp.game.add.audio('effect-die', 0.5, false);
		rpApp.music['effect-exit'] = rpApp.game.add.audio('effect-exit', 0.5, false);
		rpApp.music['effect-jump'] = rpApp.game.add.audio('effect-jump', 0.5, false);

		if (rpApp.currentLevel === 1) {
			rpApp.music['effect-rain'] = rpApp.game.add.audio('effect-rain', 1.0, false);
		}

		if (rpApp.levels[rpApp.currentLevel].boss) {
			rpApp.music['effect-bomb'] = rpApp.game.add.audio('effect-bomb', 0.5, false);
			rpApp.music['effect-blast'] = rpApp.game.add.audio('effect-blast', 0.5, false);
			rpApp.music['effect-hit'] = rpApp.game.add.audio('effect-hit', 0.5, false);
			rpApp.music['effect-pain'] = rpApp.game.add.audio('effect-pain', 0.5, false);
			rpApp.music['effect-shoot-boss'] = rpApp.game.add.audio('effect-shoot-boss', 0.5, false);
			rpApp.music['effect-shoot-hero'] = rpApp.game.add.audio('effect-shoot-hero', 0.5, false);
		}
	},
	addItems: function() {
		rpApp.levelItems.items = [];
		rpApp.levelItems.type = rpApp.levels[rpApp.currentLevel].items === 'collect' ? 'coins' : rpApp.itemType;
		rpApp.levelItems.group = rpApp.game.add.group();
		rpApp.levelItems.group.enableBody = true;

		if (rpApp.levels[rpApp.currentLevel].items === 'collect' && !rpApp.isMobileDevice) {
			rpApp.music['effect-collect'] = rpApp.game.add.audio('effect-collect', 0.5, false);
		}

		for (var i = 0; i < rpApp.items[rpApp.levels[rpApp.currentLevel].items].locations[rpApp.currentLevel].length; i++) {
			if (rpApp.levels[rpApp.currentLevel].items === 'collect') {
				rpApp.levelItems.x = (rpApp.tile / 2) * rpApp.items.collect.locations[rpApp.currentLevel][i][0];
				rpApp.levelItems.y = (rpApp.tile / 2) * rpApp.items.collect.locations[rpApp.currentLevel][i][1];
			} else {
				rpApp.levelItems.x = (rpApp.tile / 2) * rpApp.items.avoid.locations[rpApp.currentLevel][i] + (rpApp.tile - rpApp.dimensions.item.avoid) / 2;
				rpApp.levelItems.y = (rpApp.tiles.y / 2) * rpApp.tile;
			}

			rpApp.levelItems.items[i] = rpApp.levelItems.group.create(rpApp.levelItems.x, rpApp.levelItems.y, rpApp.levels[rpApp.currentLevel].items);

			if (rpApp.levels[rpApp.currentLevel].items === 'avoid') {
				rpApp.game.physics.enable(rpApp.levelItems.items[i], Phaser.Physics.ARCADE);
				rpApp.levelItems.items[i].body.velocity.y = (i % 2 === 0) ? rpApp.game.rnd.integerInRange(100, 200) : rpApp.game.rnd.integerInRange(-200, -100);
				rpApp.levelItems.items[i].body.collideWorldBounds = true;
				rpApp.levelItems.items[i].body.bounce.y = 1;
				rpApp.levelItems.items[i].body.minBounceVelocity = 0;
			}

			rpApp.levelItems.items[i].animations.add('pulse', rpApp.items.animations[rpApp.levelItems.type], 0.75 * rpApp.fps, true);
			rpApp.levelItems.items[i].animations.play('pulse');
		}
	},
	addExit: function() {
		rpApp.exit = rpApp.game.add.sprite(rpApp.levels[rpApp.currentLevel].exit.x, rpApp.levels[rpApp.currentLevel].exit.y, 'exit');
		rpApp.exit.frame = rpApp.levels[rpApp.currentLevel].exit.animation[0];
		rpApp.game.add.existing(rpApp.exit);
		rpApp.game.physics.enable(rpApp.exit, Phaser.Physics.ARCADE);
		rpApp.animations.exit = rpApp.exit.animations.add('exit', rpApp.levels[rpApp.currentLevel].exit.animation, rpApp.fps, false);
	},
	addCharacter: function(type) {
		var position = rpApp.levels[rpApp.currentLevel].boss && type === 'hero' ? 'alt' : 'default';

		rpApp.characters[type] = rpApp.game.add.sprite(rpApp.characterConfig[type].start[position].x, rpApp.characterConfig[type].start[position].y, type);
		rpApp.characters[type].characterType = type;
		rpApp.characters[type].isAlive = true;
		rpApp.game.physics.enable(rpApp.characters[type], Phaser.Physics.ARCADE);
		rpApp.animations[type] = {};

		for (var animation in rpApp.characterConfig[type].animations) {
			if (type === 'hero') {
				rpApp.animations[type][animation] = rpApp.characters[type].animations.add(animation, rpApp.characterConfig[type].animations[animation][rpApp.gender], rpApp.characterConfig[type].fps, true);
			} else {
				rpApp.animations[type][animation] = rpApp.characters[type].animations.add(animation, rpApp.characterConfig[type].animations[animation], rpApp.characterConfig[type].fps, true);
			}
		}

		rpApp.characters[type].events.onKilled.add(rpApp.play.killCharacter, this);

		if (type === 'hero') {
			rpApp.characters[type].body.collideWorldBounds = false;
			rpApp.characters[type].body.gravity.y = rpApp.gravity;
			rpApp.characters[type].body.maxVelocity.x = rpApp.maxGravity;
			rpApp.characters[type].body.maxVelocity.y = rpApp.maxGravity;
			rpApp.characters[type].frame = rpApp.characterConfig[type].startingFrame[rpApp.gender];
			rpApp.characters[type].move = {
				left: false,
				right: false,
				jump: false
			};

			rpApp.game.camera.follow(rpApp.characters[type]);
		} else {
			rpApp.characters[type].health = 10;
			rpApp.characters[type].frame = rpApp.characterConfig[type].startingFrame;
			rpApp.characters[type].body.velocity.y = 300;
			rpApp.characters[type].body.collideWorldBounds = true;
			rpApp.characters[type].body.bounce.y = 1;
			rpApp.characters[type].body.minBounceVelocity = 0;
		}

		rpApp.game.add.existing(rpApp.characters[type]);
	},
	addWeapons: function(type) {
		rpApp.weapons[type] = rpApp.game.add.weapon(rpApp.characterConfig[type].weapon.ammo, rpApp.characterConfig[type].weapon.name);
		rpApp.weapons[type].fireAngle = rpApp.characterConfig[type].weapon.fireAngle;
		rpApp.weapons[type].fireRate = rpApp.characterConfig[type].weapon.fireRate;
		rpApp.weapons[type].bulletFrames = rpApp.characterConfig[type].weapon.bulletFrames;
		rpApp.weapons[type].bulletFrameCycle = true;
		rpApp.weapons[type].bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		rpApp.weapons[type].bulletSpeed = rpApp.characterConfig[type].weapon.bulletSpeed;
		rpApp.weapons[type].trackSprite(rpApp.characters[type], rpApp.characterConfig[type].weapon.x, rpApp.characterConfig[type].weapon.y);

		if (type === 'hero') {
			if (rpApp.isMobileDevice) {
		        rpApp.controls.buttons.fire = new rpApp.class.control('fire', rpApp.dimensions.width - (rpApp.tile * 4), rpApp.dimensions.height - (rpApp.tile * 2), [6, 6, 7, 6]);
				rpApp.groups.buttons.add(rpApp.controls.buttons.fire);
		    } else {
				rpApp.controls.keys.space = rpApp.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				rpApp.controls.keys.space.onDown.add(rpApp.play.heroFireWeapon, this);
			}
		} else {
			rpApp.weapons[type].autofire = rpApp.characterConfig[type].weapon.autofire;
			rpApp.weapons[type].bulletAngleOffset = rpApp.characterConfig[type].weapon.bulletAngleOffset;
			rpApp.weapons[type].onFire.add(rpApp.play.weaponFire, this);
		}

		for (var b in rpApp.weapons[type].bullets.children) {
			rpApp.weapons[type].bullets.children[b].animations.add('flame', rpApp.characterConfig[type].weapon.bulletFrames, 2 * rpApp.fps, true);
		}
	},
	weaponFire: function(weapon) {
		if (!rpApp.isMobileDevice) {
			rpApp.playSoundEffect('effect-shoot-boss');
		}
	},
	addControls: function(isMobile) {
		var key;

    	if (rpApp.isMobileDevice) {
			rpApp.groups.buttons = rpApp.game.add.group();
	        rpApp.controls.buttons.left = new rpApp.class.control('left', 0, rpApp.dimensions.height - (rpApp.tile * 2), [0, 0, 1, 0]);
			rpApp.groups.buttons.add(rpApp.controls.buttons.left);
	        rpApp.controls.buttons.right = new rpApp.class.control('right', rpApp.tile * 2, rpApp.dimensions.height - (rpApp.tile * 2), [2, 2, 3, 2]);
			rpApp.groups.buttons.add(rpApp.controls.buttons.right);
	        rpApp.controls.buttons.up = new rpApp.class.control('jump', rpApp.dimensions.width - (rpApp.tile * 2), rpApp.dimensions.height - (rpApp.tile * 2), [4, 4, 5, 4]);
			rpApp.groups.buttons.add(rpApp.controls.buttons.up);
	    } else {
	        rpApp.controls.cursors = rpApp.game.input.keyboard.createCursorKeys();

			for (key in rpApp.keys.used) {
				rpApp.controls.keys[key] = rpApp.game.input.keyboard.addKey(rpApp.keys.used[key]);
			}
	    }
	},
	addWheel: function() {
		rpApp.wheel = new rpApp.class.wheel();
      	rpApp.game.input.onDown.add(rpApp.wheel.spin, rpApp.wheel);
	},
	addEmitter: function(type) {
		for (var e in rpApp.emitterConfig[type]) {
			var emitter = rpApp.emitterConfig[type][e],
				name = type + e;

			rpApp.emitters[name] = rpApp.game.add.emitter(emitter.x, emitter.y, emitter.count);
			rpApp.emitters[name].width = emitter.width;

			if (emitter.fixed) {
				rpApp.emitters[name].fixedToCamera = true;
			}

			if (emitter.hasOwnProperty('frames')) {
				rpApp.emitters[name].makeParticles(type, emitter.frames);
			} else {
				rpApp.emitters[name].makeParticles(type);
			}

			rpApp.emitters[name].minParticleScale = emitter.scale.min;
			rpApp.emitters[name].maxParticleScale = emitter.scale.max;
			rpApp.emitters[name].setYSpeed(emitter.speed.y.min, emitter.speed.y.max);
			rpApp.emitters[name].setXSpeed(0, 0);
			rpApp.emitters[name].minRotation = 0;
			rpApp.emitters[name].maxRotation = 0;
			rpApp.emitters[name].minParticleAlpha = emitter.alpha.min;
			rpApp.emitters[name].maxParticleAlpha = emitter.alpha.max;

			rpApp.emitters[name].start(false, emitter.lifespan * 1000, 5, 0);
		}
	},
	addEmitters: function() {
		if (rpApp.levels[rpApp.currentLevel].hasOwnProperty('emitters')) {
			for (var e in rpApp.levels[rpApp.currentLevel].emitters) {
				rpApp.play.addEmitter(rpApp.levels[rpApp.currentLevel].emitters[e]);
			}
		}
	},
	heroMovement: function() {
		if (!rpApp.animations.hero.standLeft.isPlaying &&
			!rpApp.animations.hero.standRight.isPlaying &&
			!rpApp.animations.hero.walkLeft.isPlaying &&
			!rpApp.animations.hero.walkRight.isPlaying &&
			rpApp.characters.hero.body.velocity.x === 0 &&
			rpApp.characters.hero.body.velocity.y === 0) {
			if (rpApp.characterConfig.hero.animations.standLeft[rpApp.gender].indexOf(rpApp.characters.hero.frame) !== -1 ||
				rpApp.characters.hero.frame === rpApp.characterConfig.hero.jumpLeft[rpApp.gender]) {
				rpApp.characters.hero.animations.play('standLeft');
			} else {
				rpApp.characters.hero.animations.play('standRight');
			}
		}

		if (!rpApp.isMobileDevice) {
			rpApp.move.permit = {
				left: rpApp.controls.cursors.left.isDown || rpApp.controls.keys.a.isDown,
				right: rpApp.controls.cursors.right.isDown || rpApp.controls.keys.d.isDown,
				jump: rpApp.controls.cursors.up.isDown || rpApp.controls.keys.w.isDown,
				moonwalk: rpApp.controls.cursors.down.isDown || rpApp.controls.keys.s.isDown
			};

			rpApp.move.prevent = {
				left: !rpApp.controls.cursors.right.isDown && !rpApp.controls.keys.d.isDown,
				right: !rpApp.controls.cursors.left.isDown && !rpApp.controls.keys.a.isDown
			};

			if (rpApp.game.input.gamepad.supported && rpApp.game.input.gamepad.active && rpApp.pad.connected) {
				rpApp.move.left = (rpApp.move.permit.left || rpApp.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) && (rpApp.move.prevent.left && !rpApp.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT));

				rpApp.move.right = (rpApp.move.permit.right || rpApp.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) && (rpApp.move.prevent.right && !rpApp.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT));

				rpApp.move.none = rpApp.move.prevent.left && rpApp.move.prevent.right && !rpApp.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) && !rpApp.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT);

				rpApp.move.jump = rpApp.move.permit.jump || rpApp.pad.isDown(Phaser.Gamepad.XBOX360_B);
				rpApp.move.moonwalk = rpApp.move.permit.moonwalk || rpApp.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN);
			} else {
				rpApp.move.left = rpApp.move.permit.left && rpApp.move.prevent.left;
				rpApp.move.right = rpApp.move.permit.right && rpApp.move.prevent.right;
				rpApp.move.none = rpApp.move.prevent.left && rpApp.move.prevent.right;
				rpApp.move.jump = rpApp.move.permit.jump;
				rpApp.move.moonwalk = rpApp.move.permit.moonwalk;
			}

			if (rpApp.move.left) {
				rpApp.characters.hero.move.left = true;
				rpApp.characters.hero.move.right = false;
			}

			if (rpApp.move.right) {
				rpApp.characters.hero.move.left = false;
				rpApp.characters.hero.move.right = true;
			}

			if (rpApp.move.none) {
				rpApp.characters.hero.move.left = false;
				rpApp.characters.hero.move.right = false;
			}

			if (rpApp.move.jump) {
				rpApp.characters.hero.move.jump = true;
			} else {
				rpApp.characters.hero.move.jump = false;
			}
		}

		if (rpApp.characters.hero.move.left) {
			if (rpApp.isMobileDevice) {
				rpApp.characters.hero.animations.play('walkLeft');
			} else {
				if (rpApp.move.moonwalk) {
					rpApp.characters.hero.animations.play('walkRight');
				} else {
					rpApp.characters.hero.animations.play('walkLeft');
				}
			}

			rpApp.characters.hero.body.velocity.x = -1 * (rpApp.gravity / 2);
		}

		if (rpApp.characters.hero.move.right) {
			if (rpApp.isMobileDevice) {
				rpApp.characters.hero.animations.play('walkRight');
			} else {
				if (rpApp.move.moonwalk) {
					rpApp.characters.hero.animations.play('walkLeft');
				} else {
					rpApp.characters.hero.animations.play('walkRight');
				}
			}

			rpApp.characters.hero.body.velocity.x = rpApp.gravity / 2;
		}

		if ( (rpApp.characters.hero.move.jump && rpApp.characters.hero.body.blocked.down ) ||
			 (rpApp.characters.hero.move.jump && rpApp.game.state.current === 'secret' && rpApp.collisions.heroGround) ) {
			if (!rpApp.isMobileDevice) {
				rpApp.playSoundEffect('effect-jump');
			}

			rpApp.characters.hero.body.velocity.y = -1 * (rpApp.gravity / 1.5);
		}

		if (rpApp.characters.hero.body.velocity.x === 0) {
			if (rpApp.characterConfig.hero.animations.walkLeft[rpApp.gender].indexOf(rpApp.characters.hero.frame) !== -1) {
				rpApp.characters.hero.animations.play('standLeft');
			} else if (rpApp.characterConfig.hero.animations.walkRight[rpApp.gender].indexOf(rpApp.characters.hero.frame) !== -1) {
				rpApp.characters.hero.animations.play('standRight');
			}
		} else if (!rpApp.isMobileDevice && !rpApp.isFirefox && rpApp.levels[rpApp.currentLevel].parallax && rpApp.characters.hero.body.position.x > (rpApp.dimensions.width / 2) && !rpApp.characters.hero.body.blocked.left && !rpApp.characters.hero.body.blocked.right) {
			if (rpApp.characters.hero.body.velocity.x < 0) {
				rpApp.background.back.tilePosition.x += 0.25;
			} else {
				rpApp.background.back.tilePosition.x -= 0.25;
			}
		}

		if (rpApp.characters.hero.body.velocity.y !== 0 || (rpApp.characters.hero.body.velocity.y === 0 && rpApp.characters.hero.body.blocked.up)) {
			rpApp.characters.hero.animations.stop();

			if (rpApp.characters.hero.move.left || rpApp.characterConfig.hero.animations.standLeft[rpApp.gender].indexOf(rpApp.characters.hero.frame) !== -1) {
				rpApp.characters.hero.frame = rpApp.characterConfig.hero.jumpLeft[rpApp.gender];
			} else if (rpApp.characters.hero.move.right || rpApp.characterConfig.hero.animations.standRight[rpApp.gender].indexOf(rpApp.characters.hero.frame) !== -1) {
				rpApp.characters.hero.frame = rpApp.characterConfig.hero.jumpRight[rpApp.gender];
			}
		}
	},
	heroFireWeapon: function() {
		if (!rpApp.isMobileDevice) {
			rpApp.playSoundEffect('effect-shoot-hero');
		}

		if (rpApp.characters.hero.isAlive) {
			rpApp.weapons.hero.fire();
		}
	},
	heroHitPlatform: function(hero, platform) {
		if (hero.body.blocked.up) {
			if (!rpApp.isMobileDevice) {
				rpApp.stopAudio('effect-jump');
			}
		}
	},
	heroHitItem: function(hero, item) {
		if (rpApp.levels[rpApp.currentLevel].items === 'collect') {
			if (!rpApp.isMobileDevice) {
				rpApp.playSoundEffect('effect-collect');
			}

			if ((rpApp.score / rpApp.levelItems.items.length) > 0.5) {
				rpApp.gameText.ipwarm.setText('IP WARMED UP!');
			}

			item.kill();
		} else {
			rpApp.play.killHero();
		}

		if (rpApp.levels[rpApp.currentLevel].hasOwnProperty('score')) {
		    rpApp.score += 1;
			rpApp.progress.frame = rpApp.score;
		}
	},
	heroHitBullet: function(hero, bullet) {
		bullet.kill();
		rpApp.play.killHero();
	},
	bossHitBullet: function(boss, bullet) {
		if (!rpApp.isMobileDevice) {
			rpApp.playSoundEffect('effect-hit');
			rpApp.playSoundEffect('effect-pain');
		}

		bullet.kill();
		boss.damage(1);
		rpApp.health.frame = rpApp.maxHealth - rpApp.characters.boss.health + 25;
	},
	bulletHitBullet: function(heroBullet, bossBullet) {
		if (!rpApp.isMobileDevice) {
			rpApp.playSoundEffect('effect-blast');
		}

		rpApp.characters.bulletExplosion = rpApp.game.add.sprite(heroBullet.body.x + ((bossBullet.body.x - heroBullet.body.x) / 2), heroBullet.body.y + ((bossBullet.body.y - heroBullet.body.y) / 2), 'weapons');
		rpApp.animations.bulletExplosion = rpApp.characters.bulletExplosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(x) { return x + (2 * 11); }), 2 * rpApp.fps, false);
		rpApp.animations.bulletExplosion.onComplete.add(rpApp.play.killExplosion, this);
		rpApp.animations.bulletExplosion.play('explode', 2 * rpApp.fps, false, true);

		heroBullet.kill();
		bossBullet.kill();
	},
	killExplosion: function(explosion) {
		explosion.kill();
	},
	killCharacter: function(character) {
		if (character.characterType === 'hero') {
			if (character.isAlive && !rpApp.isMobileDevice && !rpApp.music['effect-exit'].isPlaying) {
				rpApp.playSoundEffect('effect-die');
			}
		} else {
			rpApp.play.killBoss();
		}
	},
	killHero: function() {
		if (!rpApp.isMobileDevice && rpApp.characters.hero.isAlive) {
			rpApp.playSoundEffect('effect-die');
		}

		rpApp.characters.hero.isAlive = false;
		rpApp.game.time.events.add(rpApp.delay, rpApp.play.gameOver, this);
	},
	killBoss: function() {
		if (!rpApp.isMobileDevice) {
			rpApp.playSoundEffect('effect-bomb');
		}

		rpApp.characters.boss.isAlive = false;
		rpApp.weapons.boss.destroy();

		rpApp.characters.deadBoss = rpApp.game.add.sprite(rpApp.characters.boss.body.x, rpApp.characters.boss.body.y, 'boss');
		rpApp.animations.deadBoss = {};

		rpApp.animations.deadBoss.die = rpApp.characters.deadBoss.animations.add('die', rpApp.characterConfig.boss.animations.die, rpApp.characterConfig.boss.fps / 2, false);

		rpApp.animations.deadBoss.die.onComplete.add(rpApp.play.addExit, this);
		rpApp.characters.deadBoss.animations.play('die', rpApp.characterConfig.boss.fps / 2, false, true);
	},
	exitLevel: function(hero, exit) {
		if (rpApp.characters.hero.alive) {
			if (!rpApp.isMobileDevice) {
				if (rpApp.currentLevel !== 'secret') {
					rpApp.stopAudio('level-' + rpApp.currentLevel);
				} else {
					rpApp.stopAudio(rpApp.currentLevel);
				}

				rpApp.playSoundEffect('effect-exit');
			}

			rpApp.exit.animations.play('exit');
			rpApp.characters.hero.kill();

			if (!rpApp.isMobileDevice) {
				rpApp.game.time.events.add(rpApp.delay * 2.5, rpApp.play.goToLevel, this);
			} else {
				rpApp.game.time.events.add(rpApp.delay, rpApp.play.goToLevel, this);
			}
		}
	},
	exitToSecretLevel: function() {
		if (rpApp.characters.hero.alive) {
			if (!rpApp.isMobileDevice) {
				rpApp.stopAudio('level-' + rpApp.currentLevel);
				rpApp.playSoundEffect('effect-exit');
			}

			rpApp.characters.hero.kill();

			if (!rpApp.isMobileDevice) {
				rpApp.game.time.events.add(rpApp.delay * 2.5, rpApp.play.goToSecretLevel, this);
			} else {
				rpApp.game.time.events.add(rpApp.delay, rpApp.play.goToSecretLevel, this);
			}
		}
	},
	goToLevel: function() {
		if (!rpApp.isMobileDevice) {
			if (rpApp.currentLevel === 1) {
				rpApp.stopAudio('effect-rain');
			}
		}

		rpApp.game.state.start(rpApp.levels[rpApp.currentLevel].next);
	},
	goToSecretLevel: function() {
		if (!rpApp.isMobileDevice) {
			if (rpApp.currentLevel === 1) {
				rpApp.stopAudio('effect-rain');
			}
		}

		rpApp.game.state.start('secret');
	},
	gameOver: function() {
		if (!rpApp.isMobileDevice) {
			if (rpApp.currentLevel === 1 && rpApp.music['effect-rain'].isPlaying) {
				rpApp.stopAudio('effect-rain');
			}
		}

	    rpApp.game.state.start('level-' + rpApp.currentLevel);
	}
};

for (var level in rpApp.levels) {
	rpApp.play.levels[level] = function() {};
	rpApp.play.levels[level].prototype = {
		level: level,
		create: function () {
			rpApp.currentLevel = this.level;

			if (rpApp.levels[rpApp.currentLevel].bg && rpApp.levels[rpApp.currentLevel].map) {
			    rpApp.game.physics.startSystem(Phaser.Physics.ARCADE);
			    rpApp.play.setWorld();
				rpApp.play.addMap();
				rpApp.play.addPlayerText();
				rpApp.play.addControls();

				if (!rpApp.isMobileDevice) {
					rpApp.play.addSoundEffects();
					rpApp.play.addEmitters();
				}

				if (rpApp.levels[rpApp.currentLevel].hasOwnProperty('score')) {
					rpApp.play.addProgressBar();
				}

				if (rpApp.levels[rpApp.currentLevel].hasOwnProperty('items')) {
					rpApp.play.addItems();
				}

				if (!rpApp.levels[rpApp.currentLevel].boss) {
			        rpApp.play.addExit();
				}

				if (rpApp.levels[rpApp.currentLevel].boss) {
					rpApp.play.addHealthBar();
					rpApp.play.addCharacter('hero');
					rpApp.play.addWeapons('hero');
					rpApp.play.addCharacter('boss');
					rpApp.play.addWeapons('boss');
				} else {
					rpApp.play.addCharacter('hero');
				}
			} else {
				rpApp.setWorld();
				rpApp.music['effect-wheel'] = rpApp.game.add.audio('effect-wheel', 0.5, true);
				rpApp.wheelInstructions = new rpApp.class.text(rpApp.game.world.centerX, rpApp.tile, 'Click anywhere to spin the wheel', '');
				rpApp.play.addWheel();
			}

			if (!rpApp.isMobileDevice) {
				rpApp.addAudioButton();
			}

			rpApp.addCloseButton();
		},
		update: function() {
			var b;

			if (rpApp.levels[rpApp.currentLevel].bg && rpApp.levels[rpApp.currentLevel].map) {
			    rpApp.characters.hero.body.velocity.x = 0;
				rpApp.collisions.platform = rpApp.game.physics.arcade.collide(rpApp.characters.hero, rpApp.layers.platforms, rpApp.play.heroHitPlatform);
				rpApp.game.physics.arcade.overlap(rpApp.characters.hero, rpApp.exit, rpApp.play.exitLevel, null, this);

				if ((rpApp.game.world.height - rpApp.characters.hero.y) <= rpApp.tile * 2) {
					rpApp.characters.hero.kill();
					rpApp.characters.hero.isAlive = false;
					rpApp.game.time.events.add(rpApp.delay, rpApp.play.gameOver, this);
			    }

				if (rpApp.characters.hero.x > rpApp.game.world.width) {
					rpApp.play.exitToSecretLevel();
			    }

				if (rpApp.isMobileDevice) {
					rpApp.game.world.bringToTop(rpApp.groups.buttons);
				}

			    if (rpApp.characters.hero.isAlive) {
					rpApp.play.heroMovement();
			    } else {
					rpApp.characters.hero.frame = rpApp.characterConfig.hero.dead[rpApp.gender];
					rpApp.characters.hero.body.velocity.y = rpApp.gravity / 2;
				}

				if (rpApp.levels[rpApp.currentLevel].hasOwnProperty('items')) {
					rpApp.game.physics.arcade.overlap(rpApp.characters.hero, rpApp.levelItems.group, rpApp.play.heroHitItem, null, this);
				}

				if (rpApp.currentLevel === 1 && !rpApp.isMobileDevice) {
					if (rpApp.characters.hero.body.position.x >= rpApp.game.world.width / 2) {
						rpApp.loopSoundEffect('effect-rain');
					} else {
						rpApp.stopAudio('effect-rain');
					}
				}

				if (rpApp.levels[rpApp.currentLevel].boss) {
					rpApp.game.physics.arcade.collide(rpApp.characters.boss, rpApp.layers.platforms);
					rpApp.game.physics.arcade.overlap(rpApp.characters.hero, rpApp.weapons.boss.bullets, rpApp.play.heroHitBullet, null, this);
					rpApp.game.physics.arcade.overlap(rpApp.weapons.hero.bullets, rpApp.weapons.boss.bullets, rpApp.play.bulletHitBullet, null, this);
					rpApp.game.physics.arcade.overlap(rpApp.characters.boss, rpApp.weapons.hero.bullets, rpApp.play.bossHitBullet, null, this);

					if (rpApp.characters.boss.isAlive) {
						rpApp.characters.boss.animations.play('standLeft');

						for (b in rpApp.weapons.hero.bullets.children) {
							rpApp.weapons.hero.bullets.children[b].animations.play('flame');
						}

						for (b in rpApp.weapons.boss.bullets.children) {
							rpApp.weapons.boss.bullets.children[b].animations.play('flame');
						}
					}
				}
			}
		}
	};
}
