var rpGame = rpGame || {};

rpGame.Level1 = new Phaser.Class({
    Extends: rpGame.Level,
    initialize: function Level1() {
        Phaser.Scene.call(this, { key: 'Level1', active: false });
        this.rp.Level1 = {
            animations: {
                bomb: {
    	            sprite: 'obstacles',
                    start: 0,
                    end: 9,
    	            frameRate: 1,
    	            repeat: -1,
    	        },
    	        soldier: {
    	            sprite: 'enemies',
                    start: 0,
                    end: 9,
    	            frameRate: 1,
    	            repeat: -1,
    	        },
    		},
            text: {
                intro: {
                    key: 'intro',
                    text: rpGame.content.levels[1].intro,
                },
                outro: {
                    key: 'outro',
                    text: [
                        rpGame.content.levels[1].outro,
                    ],
                },
            }
        };
    },
    //== Dispatcher functions
    levelDispatcher: function(start) {
        if (rpGame.difficulty === 1) {
            if (this.elapsed === start) {
                if (!rpGame.restart) {
                    this.removeTextbox('intro');
                }

                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 8,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 5)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 8,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 10)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 4,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 4,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 15)) {
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 20)) {
                this.addObjects({
                    group: 'powerups',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 25)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.obstacles),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            variation: 1,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.obstacles),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            variation: 1,
                        },
                    ],
                });
            } else if (this.elapsed === (start + 30)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 35)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 43)) {
                this.addTextbox('outro');
                this.resetHero();
            } else if (this.elapsed === (start + 53)) {
                this.removeTextbox('outro');
            } else if (this.elapsed === (start + 54)) {
                rpGame.goToTransition = true;
            }
        } else if (rpGame.difficulty === 2) {
            if (this.elapsed === start) {
                if (!rpGame.restart) {
                    this.removeTextbox('intro');
                }

                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 9,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 4)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 9,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 8)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 4,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 4,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 12)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 3,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 3,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 16)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.obstacles),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            variation: 1,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.obstacles),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            variation: 1,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.obstacles),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            variation: 1,
                        },
                    ],
                });
            } else if (this.elapsed === (start + 20)) {
                this.addObjects({
                    group: 'powerups',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 24)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: (1/3) * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: (2/3) * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 28)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.25 * rpGame.h,
                            path: 'wave',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'wave',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.75 * rpGame.h,
                            path: 'wave',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 32)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.obstacles),
                            y: 0.3 * rpGame.h,
                            path: 'straight',
                            variation: 1,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.obstacles),
                            y: 0.7 * rpGame.h,
                            path: 'straight',
                            variation: 1,
                        },
                    ],
                });
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.1 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.9 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 40)) {
                this.addTextbox('outro');
                this.resetHero();
            } else if (this.elapsed === (start + 50)) {
                this.removeTextbox('outro');
            } else if (this.elapsed === (start + 51)) {
                rpGame.goToTransition = true;
            }
        } else {
            if (this.elapsed === start) {
                if (!rpGame.restart) {
                    this.removeTextbox('intro');
                }

                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 12,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 3,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: (2/3) * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                    ]
                });
            } else if (this.elapsed === (start + 3)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 3,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 12,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: (2/3) * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                    ]
                });
            } else if (this.elapsed === (start + 6)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 8,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 8,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: (2/3) * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                    ]
                });
            } else if (this.elapsed === (start + 9)) {
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 12)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.3 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.5 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.7 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.9 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 13)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.4 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.6 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.8 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 14)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.3 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.5 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.7 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.9 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 15)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.4 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.6 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                        {
                            x: 0.8 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 18)) {
                this.addObjects({
                    group: 'powerups',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 21)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 23)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: (1/3) * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: (2/3) * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 25)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: (1/3) * rpGame.h,
                            path: 'wave',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: (2/3) * rpGame.h,
                            path: 'wave',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 27)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: (1/3) * rpGame.h,
                            path: 'wave',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: (2/3) * rpGame.h,
                            path: 'wave',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 35)) {
                this.addTextbox('outro');
                this.resetHero();
            } else if (this.elapsed === (start + 45)) {
                this.removeTextbox('outro');
            } else if (this.elapsed === (start + 46)) {
                rpGame.goToTransition = true;
            }
        }
    },
    //== Phaser functions
    preload: function() {
        this.rpPreload();
    },
    create: function() {
        this.rpCreate(1);
    },
    update: function() {
        this.rpUpdate();

        if (rpGame.hasOwnProperty('debug') && rpGame.hasOwnProperty('debugLevel')) {
            if (rpGame.debug && rpGame.debugLevel === 1) {
                rpGame.restart = true;
            }
        }

        if (!rpGame.restart) {
            if (this.elapsed === 1) {
                this.addTextbox('intro');
            } else {
                this.levelDispatcher(11);
            }
        } else {
            this.levelDispatcher(1);
        }
    },
});
