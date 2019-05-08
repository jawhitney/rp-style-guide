var rpGame = rpGame || {};

rpGame.Level2 = new Phaser.Class({
    Extends: rpGame.Level,
    initialize: function Level2() {
        Phaser.Scene.call(this, { key: 'Level2', active: false });
        this.rp.Level2 = {
            animations: {
                firerock: {
    	            sprite: 'obstacles',
                    start: 20,
                    end: 29,
    	            frameRate: 1,
    	            repeat: -1,
    	        },
                fireball: {
    	            sprite: 'obstacles',
                    start: 30,
                    end: 39,
    	            frameRate: 1,
    	            repeat: -1,
    	        },
                pterodactyl: {
    	            sprite: 'enemies',
                    start: 10,
                    end: 19,
    	            frameRate: 1,
    	            repeat: -1,
    	        },
    		},
            text: {
                intro: {
                    key: 'intro',
                    text: rpGame.content.levels[2].intro,
                },
                outro: {
                    key: 'outro',
                    text: rpGame.content.levels[2].outro,
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
            } else if (this.elapsed === (start + 2)) {
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.4 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.6 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 4)) {
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerup',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 8)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [{
                        x: 0.5 * rpGame.w,
                        y: 0,
                        path: 'fall',
                        variation: 1,
                    }],
                });
            } else if (this.elapsed === (start + 12)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [{
                        x: 0.5 * rpGame.w,
                        y: 0,
                        path: 'fall',
                        variation: 2,
                    }],
                });
            } else if (this.elapsed === (start + 16)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.5 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 1,
                        },
                    ]
                });
            } else if (this.elapsed === (start + 20)) {
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
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 28)) {
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
            } else if (this.elapsed === (start + 32)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'wave',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 40)) {
                this.addTextbox('outro');
                this.resetHero();
            } else if (this.elapsed === (start + 50)) {
                this.removeTextbox('outro');
            } else if (this.elapsed === (start + 51)) {
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
            } else if (this.elapsed === (start + 2)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 5,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 5,
                        },
                    ],
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.4 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.6 * rpGame.h,
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
                            y: 0,
                            path: 'straight',
                            blocks: 7,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 7,
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
                            sprite: 'powerup',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 8)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [{
                        x: rpGame.w,
                        y: rpGame.h,
                        path: 'trajectory',
                        vel: {
                            x: -750,
                            y: -1000,
                            g: 500,
                            a: 65,
                        },
                        variation: 1,
                    }],
                });
            } else if (this.elapsed === (start + 10)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [{
                        x: rpGame.w,
                        y: rpGame.h,
                        path: 'trajectory',
                        vel: {
                            x: -750,
                            y: -1000,
                            g: 500,
                            a: 65,
                        },
                        variation: 1,
                    }],
                });
            } else if (this.elapsed === (start + 12)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [{
                        x: rpGame.w,
                        y: rpGame.h,
                        path: 'trajectory',
                        vel: {
                            x: -750,
                            y: -1000,
                            g: 500,
                            a: 65,
                        },
                        variation: 1,
                    }],
                });
            } else if (this.elapsed === (start + 16)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.3 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                        },
                    ]
                });
            } else if (this.elapsed === (start + 17)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.5 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                        },
                    ]
                });
            } else if (this.elapsed === (start + 18)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.7 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                        },
                    ]
                });
            } else if (this.elapsed === (start + 19)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.9 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                        },
                    ],
                });
            } else if (this.elapsed === (start + 20)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 5,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 5,
                        },
                    ],
                });
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
                            y: 0.1 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 25)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.3 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 26)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 27)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.7 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 28)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.9 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 29)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.7 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 30)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'wave',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 31)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.3 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 32)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.1 * rpGame.h,
                            path: 'wave',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 39)) {
                this.addTextbox('outro');
                this.resetHero();
            } else if (this.elapsed === (start + 49)) {
                this.removeTextbox('outro');
            } else if (this.elapsed === (start + 50)) {
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
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w - (0.5 * rpGame.widths.obstacles),
                            y: 0.25 * rpGame.h,
                            path: 'straight',
                            variation: 2,
                        },
                        {
                            x: rpGame.w - (0.5 * rpGame.widths.obstacles),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            variation: 2,
                        },
                        {
                            x: rpGame.w - (0.5 * rpGame.widths.obstacles),
                            y: 0.75 * rpGame.h,
                            path: 'straight',
                            variation: 2,
                        },
                    ]
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
            } else if (this.elapsed === (start + 2)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: 0,
                            path: 'straight',
                            blocks: 6,
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 6,
                        },
                    ],
                });
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w - (0.5 * rpGame.widths.obstacles),
                            y: 0.4 * rpGame.h,
                            path: 'straight',
                            variation: 2,
                        },
                        {
                            x: rpGame.w - (0.5 * rpGame.widths.obstacles),
                            y: 0.6 * rpGame.h,
                            path: 'straight',
                            variation: 2,
                        },
                    ]
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.4 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerups',
                        },
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.6 * rpGame.h,
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
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w - (0.5 * rpGame.widths.obstacles),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            variation: 2,
                        },
                    ]
                });
                this.addObjects({
                    group: 'collectibles',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                            sprite: 'powerup',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 8)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 65,
                            },
                            variation: 1,
                        },
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 45,
                            },
                            variation: 1,
                        },
                    ],
                });
            } else if (this.elapsed === (start + 9)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 65,
                            },
                            variation: 1,
                        },
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 45,
                            },
                            variation: 1,
                        },
                    ],
                });
            } else if (this.elapsed === (start + 10)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 65,
                            },
                            variation: 1,
                        },
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 45,
                            },
                            variation: 1,
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
                            blocks: 12,
                        },
                    ],
                });
            } else if (this.elapsed === (start + 14)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.25 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                            vel: {
                                g: 100 * Math.floor((Math.random() * 3) + 5),
                            },
                        },
                        {
                            x: 0.5 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                            vel: {
                                g: 100 * Math.floor((Math.random() * 3) + 5),
                            },
                        },
                        {
                            x: 0.75 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                            vel: {
                                g: 100 * Math.floor((Math.random() * 3) + 5),
                            },
                        },
                    ]
                });
            } else if (this.elapsed === (start + 16)) {
                this.addObjects({
                    group: 'walls',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.walls),
                            y: rpGame.h,
                            path: 'straight',
                            blocks: 12,
                        },
                    ],
                });
            } else if (this.elapsed === (start + 18)) {
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: 0.25 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                            vel: {
                                g: 100 * Math.floor((Math.random() * 3) + 5),
                            },
                        },
                        {
                            x: 0.5 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                            vel: {
                                g: 100 * Math.floor((Math.random() * 3) + 5),
                            },
                        },
                        {
                            x: 0.75 * rpGame.w,
                            y: 0,
                            path: 'fall',
                            variation: 2,
                            vel: {
                                g: 100 * Math.floor((Math.random() * 3) + 5),
                            },
                        },
                    ]
                });
            } else if (this.elapsed === (start + 20)) {
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
                    group: 'powerups',
                    objects: [
                        {
                            x: rpGame.w + ((1/3) * rpGame.widths.powerups),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                    ],
                });
            } else if (this.elapsed === (start + 22)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 24)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.4 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.6 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 25)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.3 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.7 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 26)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.2 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.4 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.6 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.8 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 27)) {
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
                            y: 0.3 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.7 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.9 * rpGame.h,
                            path: 'straight',
                        },
                    ]
                });
            } else if (this.elapsed === (start + 30)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.25 * rpGame.h,
                            path: 'wave',
                            vel: {
                                y: 250,
                            },
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.75 * rpGame.h,
                            path: 'wave',
                        },
                    ],
                });
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 75,
                            },
                            variation: 1,
                        },
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 65,
                            },
                            variation: 1,
                        },
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 55,
                            },
                            variation: 1,
                        },
                    ],
                });
            } else if (this.elapsed === (start + 32)) {
                this.addObjects({
                    group: 'enemies',
                    objects: [
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.25 * rpGame.h,
                            path: 'wave',
                            vel: {
                                y: 250,
                            },
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.5 * rpGame.h,
                            path: 'straight',
                        },
                        {
                            x: rpGame.w + (0.5 * rpGame.widths.enemies),
                            y: 0.75 * rpGame.h,
                            path: 'wave',
                        },
                    ],
                });
                this.addObjects({
                    group: 'obstacles',
                    objects: [
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 75,
                            },
                            variation: 1,
                        },
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 65,
                            },
                            variation: 1,
                        },
                        {
                            x: rpGame.w,
                            y: rpGame.h,
                            path: 'trajectory',
                            vel: {
                                x: -100 * Math.floor((Math.random() * 8) + 6),
                                y: -1000,
                                g: 500,
                                a: 55,
                            },
                            variation: 1,
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
        }
    },
    //== Phaser functions
    preload: function() {
        this.rpPreload();
    },
    create: function() {
        this.rpCreate(2);
    },
    update: function() {
        this.rpUpdate();

        if (rpGame.hasOwnProperty('debug') && rpGame.hasOwnProperty('debugLevel')) {
            if (rpGame.debug && rpGame.debugLevel === 2) {
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
