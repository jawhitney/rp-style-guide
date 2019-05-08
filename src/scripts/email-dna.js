var rpApp = rpApp || {};

(function($) {
    //*** Window
    rpApp.window = window;

    $(document).ready(function() {
        //*** Init variables
        rpApp.$window = $(window);
        rpApp.currentSectionIndex = 0;
        rpApp.scrollToSections = '.rp-scrollto-section, footer';
        rpApp.isTouch = $('html').hasClass('touchevents');
        rpApp.$scrollWatch = rpApp.isTouch ? rpApp.$window: $('main');

        //*** Init
        $('body').addClass('rp-document-ready');
        rpApp.animateContent();

        if (rpApp.getUrlParameter('launchvideo') === 'true') {
            $('#vidyardModal').modal('show');
        }

        rpApp.$scrollWatch.on('scroll', function (e) {
            rpApp.window.requestAnimationFrame(function() {
                if (!$('body').hasClass('rp-is-scrolling')) {
                    $('body').addClass('rp-is-scrolling');
                }

                rpApp.animateContent();

                if (rpApp.$scrollWatch.scrollTop() > 0) {
                    if (!$('header').hasClass('rp-has-scrolled')) {
                        $('header').addClass('rp-has-scrolled');
                    }

                    $('header').addClass('rp-is-below-top');

                    if (!$('body').hasClass('error404')) {
                        $('header').find('.btn').removeClass('btn-white-hollow').addClass('btn-yellow-dark');
                    }
                } else {
                    $('header').removeClass('rp-is-below-top');

                    if (!$('body').hasClass('error404')) {
                        $('header').find('.btn').removeClass('btn-yellow-dark').addClass('btn-white-hollow');
                    }
                }

                if (rpApp.isOnScreen($('footer'))) {
                    $('body').addClass('rp-footer-is-visible');
                } else {
                    $('body').removeClass('rp-footer-is-visible');
                }

                $('.rp-donut-chart:not(.rp-content-on-screen)').each(function(i, chart) {
                    var $chart = $(chart),
                        $svg = $chart.find('svg');

                    if (rpApp.isOnScreen($svg)) {
                        var obj = { stat: 0 },
                            primary = $svg.data('primary');

                        $svg.find('.anim').each(function(i, circle) {
                            var r = circle.getAttribute('r'),
                                c = 2 * Math.PI * r,
                                value = circle.getAttribute('data-value'),
                                percent = 1 - (value / 100),
                                props = {
                                    targets: circle,
                                    strokeDashoffset: [anime.setDashoffset, c * percent],
                                    easing: 'easeInOutSine',
                                    duration: 1500,
                                    loop: false
                                };

                            if (circle.hasAttribute('data-delay')) {
                                props.delay = circle.getAttribute('data-delay');
                            }

                            anime(props);
                        });

                        if (primary > 10) {
                            anime({
                                targets: obj,
                                stat: primary,
                                round: 1,
                                easing: 'linear',
                                duration: 1500,
                                update: function() {
                                    $chart.find('h2')[0].innerHTML = obj.stat + '%';
                                }
                            });
                        } else {
                            $chart.find('h2')[0].innerHTML = primary + '%';
                        }

                        $chart.addClass('rp-content-on-screen');
                    }
                });
            });

            window.clearTimeout(rpApp.isNowScrolling);

            rpApp.isNowScrolling = setTimeout(function() {
                if ($('body').hasClass('rp-is-scrolling')) {
                    $('body').removeClass('rp-is-scrolling');
                }

                var scrollTop = rpApp.$scrollWatch.scrollTop();

                rpApp.scrollPosition = scrollTop;

                for (var i = 0; i < $(rpApp.scrollToSections).length; i++) {
                    var section = $(rpApp.scrollToSections)[i],
                        bounds = {
                            index: i,
                            top: Math.floor(scrollTop + $(section).offset().top),
                            bottom: Math.floor(scrollTop + $(section).offset().top + $(section).outerHeight())
                        };

                    if ((scrollTop > bounds.top && scrollTop < bounds.bottom) ||
                        scrollTop === bounds.top) {
                        rpApp.currentSectionIndex = i;
                        break;
                    }
                }
            }, 66);
        });

        rpApp.$window.on('resize', function(e) {
            rpApp.window.requestAnimationFrame(function() {
                rpApp.animateContent();
            });
        });

        //*** Request a demo
        $('header a.btn, .rp-row-hero a.btn, footer a.btn').on('click', function(e) {
            e.preventDefault();

            $('#radForm').modal('show');
        });

        $('.rp-row-promo a, .rp-row-promo .rp-video-skew').on('click', function(e) {
            e.preventDefault();

            $('#vidyardModal').modal('show');
        });

        $('section').first().addClass('rp-scrollto-current');

        //*** Scroll to side navigation
        $('.rp-side-navigation a').on('click', function(e) {
            e.preventDefault();

            var position = 0,
                $el = rpApp.isTouch ? $('html, body') : rpApp.$scrollWatch;

            if (rpApp.currentDeviceSize() === 'lg' || rpApp.currentDeviceSize() === 'xl') {
                if (!$('body').hasClass('rp-is-scrolling')) {
                    position = 0;

                    if (!$('body').hasClass('rp-footer-is-visible')) {
                        rpApp.toSection = $(rpApp.scrollToSections)[rpApp.currentSectionIndex + 1];

                        if (rpApp.isTouch) {
                            position = $(rpApp.toSection).offset().top;
                        } else {
                            position = rpApp.$scrollWatch.scrollTop() + $(rpApp.toSection).offset().top;
                        }
                    }

                    $el.animate({
                        scrollTop: position,
                    }, 1000, function() {
                        $('body').removeClass('rp-is-scrolling');
                    });
                }
            } else if ($('body').hasClass('rp-footer-is-visible')) {
                $el.animate({
                    scrollTop: 0,
                }, 1000, function() {
                    $('body').removeClass('rp-is-scrolling');
                });
            }
        });
    });

    $(window).on('load', function() {
        //*** Init
        $('body').addClass('rp-window-loaded');

        //*** Animate content
        setTimeout(function() {
            rpApp.animateContent();
        }, 250);
    });
}(jQuery));

//*** Utilitites
rpApp.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

rpApp.setCookie = function(cname, cvalue, exdays) {
    var expires = 'expires=';

    if (exdays === 0) {
        expires += '0';
    } else {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires += d.toUTCString();
    }
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + 'path=/';
};

rpApp.getCookie = function(cname) {
    var name = cname + '=',
        ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
};

rpApp.cookieExists = function(cname) {
    return rpApp.getCookie(cname) === '' ? false : true;
};

rpApp.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

rpApp.verifyEmail = function(emailAddress) {
    return rpApp.validateEmail(emailAddress) ? true : false;
};

rpApp.currentDeviceSize = function() {
    // Ref: http://zerosixthree.se/detecting-media-queries-with-javascript/
    return window.getComputedStyle(document.body, ':after').getPropertyValue('content').replace(/['"]+/g, '');
};

rpApp.isOnScreen = function(element) {
    var isOnScreen = false;

    if (rpApp.isTouch) {
        if (element.offset().top <= (rpApp.$window.scrollTop() + rpApp.$window.height())) {
            isOnScreen = true;
        }
    } else {
        if (element.offset().top <= $('main').outerHeight()) {
            isOnScreen = true;
        }
    }

    return isOnScreen;
};

rpApp.setOnScreen = function(content) {
    $(content).addClass('rp-content-on-screen');
};

rpApp.animateContent = function() {
    $('.rp-animate-content:not(.rp-content-on-screen)').each(function(c, content) {
        if (rpApp.isOnScreen($(content))) {
            setTimeout(rpApp.setOnScreen(content), 250);
        }
    });
};

rpApp.colors = {
    'red': '#CB333B',
    'orangedark': '#E35205',
    'orangelight': '#FF9D6E',
    'yellowdark': '#FFA300',
    'yellowlight': '#F1BE48',
    'greendark': '#00965E',
    'greenlight': '#84BD00',
    'tealdark': '#008C95',
    'teallight': '#2DCCD3',
    'bluedark': '#00A3E0',
    'bluelight': '#71C5E8',
    'bluelighter': '#d5eef7',
    'navydark': '#003D51',
    'navylight': '#4298B5',
    'purpledark': '#6D2077',
    'purplelight': '#AB4FC6',
    'graybase': '#4C4B4D',
    'graydarkest': '#707274',
    'graydarker': '#95989B',
    'graydark': '#AAADAF',
    'gray': '#B4B4B4',
    'graylight': '#D5D6D7',
    'graylighter': '#e3e3e3',
    'graylightest': '#f5f6f7',
    'twitter': '#00abf0',
    'facebook': '#3a579a',
    'linkedin': '#127bb6',
    'pinterest': '#cd1c1f',
};
