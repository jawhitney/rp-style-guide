var rpApp = rpApp || {};

rpApp.secret = function() {};

rpApp.secret.prototype = {
	addSpotlights: function() {
		if (rpApp.spotlights.length > 0) {
			for (var spotlight in rpApp.spotlights) {
				rpApp.spotlights[spotlight].destroy();
			}
		}

		for (var poly in rpApp.spotlightPolys) {
			rpApp.spotlights[poly] = rpApp.game.add.graphics(0, 0);
		    rpApp.spotlights[poly].beginFill(Math.floor(Math.random() * 16777215), 0.25);
		    rpApp.spotlights[poly].drawPolygon(rpApp.spotlightPolys[poly]);
		    rpApp.spotlights[poly].endFill();
		}
	},
	addFloor: function(position, type) {
		for (var tile in rpApp.floor[position][type]) {
			rpApp.floor[position][type][tile].destroy();
		}

		for (var poly in rpApp.floorPolys[position][type]) {
			rpApp.floor[position][type][poly] = rpApp.game.add.graphics(0, 0);
		    rpApp.floor[position][type][poly].beginFill(Math.floor(Math.random() * 16777215), 1);
		    rpApp.floor[position][type][poly].drawPolygon(rpApp.floorPolys[position][type][poly]);
		    rpApp.floor[position][type][poly].endFill();
		}
	},
	addFloorTopEven: function() {
		this.addFloor('top', 'even');
	},
	addFloorTopOdd: function() {
		this.addFloor('top', 'odd');
	},
	addFloorBottomEven: function() {
		this.addFloor('bottom', 'even');
	},
	addFloorBottomOdd: function() {
		this.addFloor('bottom', 'odd');
	},
	create: function () {
		rpApp.currentLevel = 'secret';
		rpApp.setWorld();
		rpApp.spotlights = [];
		rpApp.spotlightPolys = [
			new Phaser.Polygon([
				new Phaser.Point(rpApp.dimensions.width / 4, 0),
				new Phaser.Point((2 * rpApp.dimensions.width) / 3, rpApp.dimensions.height - rpApp.tile),
				new Phaser.Point(0, rpApp.dimensions.height - rpApp.tile)
			]),
			new Phaser.Polygon([
				new Phaser.Point(rpApp.dimensions.width - (rpApp.dimensions.width / 4), 0),
				new Phaser.Point(rpApp.dimensions.width / 3, rpApp.dimensions.height - rpApp.tile),
				new Phaser.Point(rpApp.dimensions.width, rpApp.dimensions.height - rpApp.tile)
			]),
			new Phaser.Polygon([
				new Phaser.Point(rpApp.dimensions.width / 2, 0),
				new Phaser.Point((7 * rpApp.dimensions.width) / 8, rpApp.dimensions.height - rpApp.tile),
				new Phaser.Point(rpApp.dimensions.width / 8, rpApp.dimensions.height - rpApp.tile)
			]),
		];
		rpApp.floor = {
			top: {
				even: {},
				odd: {}
			},
			bottom: {
				even: {},
				odd: {}
			}
		};
		rpApp.floorPolys = {
			top: {
				even: {},
				odd: {}
			},
			bottom: {
				even: {},
				odd: {}
			}
		};

		var yt1 = rpApp.dimensions.height - rpApp.tile,
			yt2 = rpApp.dimensions.height - (0.75* rpApp.tile),
			yb1 = rpApp.dimensions.height - (0.75* rpApp.tile),
			yb2 = rpApp.dimensions.height - (0.5* rpApp.tile);

		for (var i = 0; (i * rpApp.tile / 4) <= rpApp.dimensions.width; i++) {
			var x1 = 0 + (i * rpApp.tile / 4),
				x2 = (rpApp.tile / 4) + (i * rpApp.tile / 4);

			var type = i % 2 === 0 ? 'even' : 'odd';

			rpApp.floorPolys.top[type][i] = new Phaser.Polygon([
				new Phaser.Point(x1, yt1),
				new Phaser.Point(x2, yt1),
				new Phaser.Point(x2, yt2),
				new Phaser.Point(x1, yt2)
			]);
			rpApp.floorPolys.bottom[type][i] = new Phaser.Polygon([
				new Phaser.Point(x1, yb1),
				new Phaser.Point(x2, yb1),
				new Phaser.Point(x2, yb2),
				new Phaser.Point(x1, yb2)
			]);
		}

		rpApp.play.addSoundEffects();
		rpApp.play.addExit();
		rpApp.play.addCharacter('hero');
		rpApp.characters.hero.body.collideWorldBounds = true;
		rpApp.play.addControls();
		rpApp.addCloseButton();

		if (!rpApp.isMobileDevice) {
			rpApp.addAudioButton();
			rpApp.addAudio('secret');
		}

		this.addSpotlights();
		this.addFloorTopEven();
		this.addFloorTopOdd();
		this.addFloorBottomOdd();
		this.addFloorBottomEven();

		rpApp.game.time.events.loop((60 / 124) * Phaser.Timer.SECOND, this.addSpotlights, this);
		rpApp.game.time.events.loop((30 / 124) * Phaser.Timer.SECOND, this.addFloorTopEven, this);
		rpApp.game.time.events.loop((60 / 124) * Phaser.Timer.SECOND, this.addFloorTopOdd, this);
		rpApp.game.time.events.loop((30 / 124) * Phaser.Timer.SECOND, this.addFloorBottomOdd, this);
		rpApp.game.time.events.loop((60 / 124) * Phaser.Timer.SECOND, this.addFloorBottomEven, this);
	},
	update: function() {
		rpApp.characters.hero.body.velocity.x = 0;
		rpApp.collisions.heroGround = rpApp.game.physics.arcade.collide(rpApp.characters.hero, rpApp.graphics.ground);
		rpApp.game.physics.arcade.overlap(rpApp.characters.hero, rpApp.exit, rpApp.play.exitLevel, null, this);
		rpApp.play.heroMovement();
	}
};
