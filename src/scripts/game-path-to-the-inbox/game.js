var rpApp = rpApp || {};

rpApp.resizeGameWrapper = function() {
    rpApp.window.setTimeout(function() {
        if (rpApp.isMobileDevice && rpApp.window.innerWidth > rpApp.window.innerHeight) {
            rpApp.gameHeight = rpApp.window.innerHeight;
            rpApp.gameWidth = 16 * rpApp.gameHeight / 9;

            $('#rpGameWrapper').css({
                width: rpApp.gameWidth + 'px',
                height: rpApp.gameHeight + 'px',
                margin: '0 auto'
            });
        }
    }, 200);
};

rpApp.launchGame = function() {
    $('#rpGame').addClass('active');

    rpApp.resizeGameWrapper();

    rpApp.game = new Phaser.Game(rpApp.dimensions.width, rpApp.dimensions.height, Phaser.CANVAS, 'rpGame');
    rpApp.game.state.add('boot', rpApp.boot);
    rpApp.game.state.add('load', rpApp.load);
    rpApp.game.state.add('intro', rpApp.intro);

    for (var level in rpApp.levels) {
        if (level !== 'secret') {
            rpApp.game.state.add('title-' + level, rpApp.titles[level]);
            rpApp.game.state.add('level-' + level, rpApp.play.levels[level]);
        } else {
            rpApp.game.state.add(level, rpApp.secret);
        }
    }

    rpApp.game.state.add('ending', rpApp.ending);
    rpApp.game.state.start('boot');
};

rpGame.launchGame = rpApp.launchGame;

(function($) {
    $(document).ready(function() {
        rpApp.window = window;
        rpApp.$window = $(window);
        rpApp.isMobileDevice = (typeof Modernizr !== 'undefined' && Modernizr.touchevents) ? true : false;
        rpApp.isFirefox = (typeof Modernizr !== 'undefined' && Modernizr.prefixedCSS('appearance') === '-moz-appearance') ? true : false;
        rpApp.gamePath = '/path-to-the-inbox/';

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

        rpApp.$window.on('resize', function(e) {
            rpApp.window.requestAnimationFrame(function() {
                rpApp.resizeGameWrapper();
            });
        });

        if (rpApp.cookieExists('return_path_ptti_user_info') ||
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
