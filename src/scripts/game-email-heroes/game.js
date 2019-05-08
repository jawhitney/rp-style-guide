var rpApp = rpApp || {};
var rpGame = rpGame || {};

rpGame.resizeGameWrapper = function() {
    rpGame.window.setTimeout(function() {
        if (rpGame.isMobileDevice) {
            if (rpGame.window.innerWidth > rpGame.window.innerHeight) {
                rpGame.gameHeight = rpGame.window.innerHeight;
                rpGame.gameWidth = 16 * rpGame.gameHeight / 9;
            } else {
                rpGame.gameWidth = rpGame.window.innerWidth;
                rpGame.gameHeight = 9 * rpGame.gameWidth / 16;
            }

            $('#rpGameWrapper').css({
                width: rpGame.gameWidth + 'px',
                height: rpGame.gameHeight + 'px',
                margin: '0 auto'
            });
        }
    }, 200);
};

rpGame.startGame = function() {
    rpGame.resizeGameWrapper();

    if (typeof drift !== 'undefined') {
        drift.on('ready',function(api){
            api.widget.hide();
        });
    }

    rpGame.game = new Phaser.Game(rpGame.phaserConfig);
};

rpGame.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

rpGame.isEvent = rpGame.hasOwnProperty('isEvent') ? true : false;

rpGame.launchGame = function() {
    $('#rpGame').addClass('active');

    rpGame.isAudioActive = $('html').hasClass('audio') ? true : false;
    rpGame.isAudioMuted = false;
    rpGame.isTouchActive = $('html').hasClass('touchevents') ? true : false;
    rpGame.scenes = ['Intro', 'Transition', 'Demo', 'Level1', 'Level2', 'Level3', 'Level4', 'Congrats'];
    rpGame.bgs = ['back', 'mid', 'fore'];
    rpGame.levels = 4;
    rpGame.text = {};
    rpGame.audio = {};
    rpGame.images = {};
    rpGame.background = {};
    rpGame.animations = {};
    rpGame.events = {};
    rpGame.events.timer = {};
    rpGame.collectibleCount = 0;
    rpGame.movementDisabled = true;
    rpGame.phaserConfig = {
        type: Phaser.CANVAS,
        resolution: 1,
        parent: 'rpGame',
        width: 1600,
        height: 900,
        backgroundColor: '#ffffff',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x: 0, y: 0 },
            },
        },
        input: {
            gamepad: true
        },
        scene: [],
    };

    rpGame.scenes.forEach(function(scene) {
        rpGame.phaserConfig.scene.push(rpGame[scene]);
    });

    rpGame.startGame();
};

(function($) {
    rpGame.window = window;

    $(document).ready(function() {
        rpGame.$window = $(window);
        rpGame.isMobileDevice = (typeof Modernizr !== 'undefined' && Modernizr.touchevents) ? true : false;
        rpApp.gamePath = '/email-heroes/';

        var images = [],
            mp3 = [],
            ogg = [];

        if (rpApp.hasOwnProperty('preloadAssests')) {
            rpApp.preloadAssests.images.forEach(function(image, i) {
                images[i] = new Image();
                images[i].src = rpApp.wpAssetUrl + rpApp.gamePath + image;
            });

            if (!rpGame.isMobileDevice) {
                rpApp.preloadAssests.mp3.forEach(function(audio, a) {
                    mp3[a] = new Audio();
                    mp3[a].src = rpApp.wpAssetUrl + rpApp.gamePath + audio;
                });

                rpApp.preloadAssests.ogg.forEach(function(audio, a) {
                    ogg[a] = new Audio();
                    ogg[a].src = rpApp.wpAssetUrl + rpApp.gamePath + audio;
                });
            }
        }

        rpGame.$window.on('resize', function(e) {
            rpGame.window.requestAnimationFrame(function() {
                rpGame.resizeGameWrapper();
            });
        });

        if (rpApp.cookieExists('return_path_email_heroes_game') ||
            rpApp.getUrlParameter('playnow') === 'true') {
            $('#rpGameModal').addClass('active');

            $('#rpMarketoFormSection').hide(function() {
                $('#rpGameSection').show();
            });

            rpGame.launchGame();
        }

        $('#rpGameLaunch').on('click', function(e) {
            e.preventDefault();
            $('#rpGameModal').addClass('active');
            rpGame.launchGame();
        });
	});
} (jQuery));
