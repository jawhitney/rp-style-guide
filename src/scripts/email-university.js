var rpApp = rpApp || {};

rpApp.quiz = {};

(function($) {
    rpApp.window = window;

    $(document).ready(function() {
        rpApp.$window = $(window);

        if ($('.rp-quiz-archive-page').length > 0) {
            if ( (rpApp.quiz.getUrlParameter('exams') == null || rpApp.quiz.getUrlParameter('exams') == 'undefined' || rpApp.quiz.getUrlParameter('exams') == '') || (!rpApp.cookieExists('return_path_wke_quiz_user_info') && !rpApp.euDisableCookies) ) {
                rpApp.quiz.audio = {};
                rpApp.quiz.connect = $('#rpQuizArchiveConnect');

                rpApp.quiz.showSection('#rpQuizArchiveIntro');

                if (typeof Modernizr != 'undefined' && Modernizr.audio && !Modernizr.touchevents) {
                    rpApp.quiz.audio.modem1 = document.getElementById("rpAudioModem1");
                    rpApp.quiz.audio.modem2 = document.getElementById("rpAudioModem2");
                    rpApp.quiz.audio.modem3 = document.getElementById("rpAudioModem3");
                    rpApp.quiz.audio.welcome = document.getElementById("rpAudioWelcome");
                    rpApp.quiz.audio.buttonClick = document.getElementById("rpButtonClick");

                    rpApp.quiz.audio.modem1.onended = function() {
                        rpApp.quiz.audio.modem2.play();
                        rpApp.quiz.connect.find('.modem-2 img').addClass('active');
                        rpApp.quiz.connect.find('.rp-connect-description').html('Step 2: Authenticating...');
                    };

                    rpApp.quiz.audio.modem2.onended = function() {
                        rpApp.quiz.audio.modem3.play();
                        rpApp.quiz.connect.find('.modem-3 img').addClass('active');
                        rpApp.quiz.connect.find('.rp-connect-description').html('Step 3: Connecting...');
                    };

                    rpApp.quiz.audio.modem3.onended = function() {
                        rpApp.quiz.hideSection('#rpQuizArchiveConnect');
                        rpApp.quiz.showSection('#rpQuizArchive');
                        rpApp.quiz.audio.welcome.play();
                    };
                }

                $('.rp-quiz-button').on('click', function(e) {
                    e.preventDefault();
                    rpApp.quiz.playButtonClick();

                    if ($(this).attr('id') == 'quizSignOn') {
                        rpApp.quiz.hideSection('#rpQuizArchiveIntro');

                        if (rpApp.cookieExists('return_path_wke_quiz_user_info') && !rpApp.euDisableCookies) {
                            rpApp.quiz.checkConnect();
                        } else {
                            rpApp.quiz.showSection('#rpQuizArchiveMarketo');
                        }
                    }

                    if (typeof Modernizr != 'undefined' && Modernizr.audio && !Modernizr.touchevents) {
                        if ($(this).attr('id') == 'quizConnectSkip') {
                            for (var sound in rpApp.quiz.audio) {
                                if (rpApp.quiz.isAudioPlaying(rpApp.quiz.audio[sound])) {
                                    rpApp.quiz.audio[sound].pause();
                                    rpApp.quiz.audio[sound].currentTime = 0;
                                }
                            }

                            rpApp.quiz.playButtonClick();
                            rpApp.quiz.hideSection('#rpQuizArchiveConnect');
                            rpApp.quiz.showSection('#rpQuizArchive');
                            rpApp.quiz.audio.welcome.play();
                        }
                    }
                });
            } else {
                rpApp.quiz.hideSection('#rpQuizArchiveIntro');
                rpApp.quiz.showSection('#rpQuizArchive');
            }

            $('#rpQuizzesTabs li').on('click', function(e) {
                e.preventDefault();

                var tab = '[data-tab="' + $(this).data('tab') + '"]';

                $('#rpQuizzesTabs li.active, #rpQuizzes div.active').removeClass('active');
                $('#rpQuizzesTabs li' + tab + ', #rpQuizzes div' + tab).addClass('active');
            });
        }

        if ($('.rp-quiz-wrapper').length > 0) {
            rpApp.quiz.body = $('body');
            rpApp.quiz.wrapper = $('.rp-quiz-wrapper');
            rpApp.quiz.pass = rpApp.quiz.wrapper.find('.rp-quiz-outro-pass');
            rpApp.quiz.fail = rpApp.quiz.wrapper.find('.rp-quiz-outro-fail');
			rpApp.quiz.items = rpApp.quiz.wrapper.find('.rp-quiz-item');
			rpApp.quiz.activeItem = rpApp.quiz.wrapper.find('.rp-quiz-item.active');
            rpApp.quiz.answers = [];
            rpApp.quiz.i = rpApp.quiz.activeItem.data('quiz-item');
            rpApp.quiz.indicators = $('.rp-quiz-indicators li');
            rpApp.quiz.answerTracker = rpApp.quiz.wrapper.find('.correct-answers');
            rpApp.quiz.correctAnswers = 0;
            rpApp.quiz.audio = {};
            rpApp.quiz.audio.buttonClick = document.getElementById("rpButtonClick");

            $('.option-letter, .option-text').on('click', function(e) {
                $(this).parents('li').find('.question-option').removeClass('selected');
                $(this).parents('.question-option').addClass('selected');

                rpApp.quiz.next(false);

                if ($(this).parents('.question-option').data('last-question')) {
                    rpApp.quiz.showResults();
                }
            });

            $('.rp-quiz-wrapper .rp-quiz-button').on('click', function(e) {
				e.preventDefault();

                if ($(this).hasClass('next')) {
                    if ((rpApp.cookieExists('return_path_wke_quiz_user_info') && !rpApp.euDisableCookies) || $('#quizModal').length === 0) {
                        rpApp.quiz.next(true);
                    } else {
                        $('#quizModal').modal('show');
                    }
                } else if ($(this).hasClass('reset')) {
                    rpApp.quiz.reset();
                } else {
                    window.location.href = $(this).attr('href');
                }
			});
        }
	});
} (jQuery));

rpApp.quiz.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

rpApp.quiz.hideSection = function(id) {
    $(id).removeClass('d-block d-md-flex').addClass('d-none');
};

rpApp.quiz.showSection = function(id) {
    $(id).removeClass('d-none').addClass('d-block d-md-flex');
};

rpApp.quiz.updateActiveItem = function() {
    rpApp.quiz.activeItem.removeClass('active');
    rpApp.quiz.activeItem = $(rpApp.quiz.items[rpApp.quiz.i]);
    rpApp.quiz.activeItem.addClass('active');
    rpApp.quiz.q = rpApp.quiz.activeItem.data('question');
    rpApp.quiz.answerTracker.html(rpApp.quiz.correctAnswers);
};

rpApp.quiz.isAudioPlaying = function(audio) {
    if (audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2) {
        return true;
    } else {
        return false;
    }
};

rpApp.quiz.playButtonClick = function() {
    if (typeof Modernizr != 'undefined' && Modernizr.audio && !Modernizr.touchevents) {
        if (rpApp.quiz.isAudioPlaying(rpApp.quiz.audio.buttonClick)) {
            rpApp.quiz.audio.buttonClick.pause();
            rpApp.quiz.audio.buttonClick.currentTime = 0;
        }

        rpApp.quiz.audio.buttonClick.play();
    }
};

rpApp.quiz.changeQuestion = function(is_button) {
    rpApp.quiz.playButtonClick();

    if ((rpApp.currentDeviceSize() == 'xs' || rpApp.currentDeviceSize() == 'sm') && !is_button) {
        $('html, body').animate({
            scrollTop: 0
        }, 200, function() {
            rpApp.quiz.updateActiveItem();
        });
    } else {
        rpApp.quiz.updateActiveItem();
    }
};

rpApp.quiz.next = function(is_button) {
    rpApp.quiz.indicators.removeClass('active');
    $(rpApp.quiz.indicators[rpApp.quiz.i]).addClass('active');

    if (is_button) {
        rpApp.quiz.i++;
        rpApp.quiz.changeQuestion(is_button);
    } else {
        rpApp.quiz.selected = rpApp.quiz.activeItem.find('.question-option.selected').data('option-id');
        rpApp.quiz.correctAnswer = $(rpApp.quiz.activeItem).data('correct-answer');

        if (rpApp.quiz.selected == rpApp.quiz.correctAnswer) {
            rpApp.quiz.answers[rpApp.quiz.q] = true;
            rpApp.quiz.correctAnswers++;
        } else {
            rpApp.quiz.answers[rpApp.quiz.q] = false;
        }

        rpApp.quiz.i++;
        rpApp.quiz.changeQuestion(is_button);
    }
};

rpApp.quiz.checkConnect = function() {
    rpApp.quiz.hideSection('#rpQuizArchiveMarketo');

    if (typeof Modernizr != 'undefined' && Modernizr.audio && !Modernizr.touchevents) {
        rpApp.quiz.showSection('#rpQuizArchiveConnect');
        rpApp.quiz.audio.modem1.play();
    } else {
        rpApp.quiz.showSection('#rpQuizArchive');
    }
};

rpApp.quiz.displayResults = function() {
    rpApp.quiz.result = rpApp.quiz.correctAnswers >= 8 ? 'pass' : 'fail';
    rpApp.quiz.body.removeClass(rpApp.quiz.body.data('bg-color'));

    if (rpApp.quiz.result == 'fail') {
        rpApp.quiz.updateBg(false);
        rpApp.quiz.wrapper.find('.rp-quiz-outro-pass').hide();
        rpApp.quiz.wrapper.find('.rp-quiz-outro-fail').show();
    } else {
        rpApp.quiz.updateBg(true);
        rpApp.quiz.wrapper.find('.rp-quiz-outro-fail').hide();
        rpApp.quiz.wrapper.find('.rp-quiz-outro-pass').show();
    }

    rpApp.quiz.cookieData = rpApp.cookieExists('return_path_wke_quiz_history') ? JSON.parse(rpApp.getCookie('return_path_wke_quiz_history')) : {};

    rpApp.quiz.cookieData[rpApp.quiz.wrapper.data('page-id')] = {
        'result': rpApp.quiz.result
    };

    rpApp.setCookie('return_path_wke_quiz_history', JSON.stringify(rpApp.quiz.cookieData), 365);
};

rpApp.quiz.showResults = function() {
    if (rpApp.currentDeviceSize() == 'xs' || rpApp.currentDeviceSize() == 'sm') {
        $('html, body').animate({
            scrollTop: 0
        }, 200, function() {
            rpApp.quiz.displayResults();
        });
    } else {
        rpApp.quiz.displayResults();
    }
};

rpApp.quiz.updateBg = function(pass) {
    rpApp.quiz.body.removeClass(rpApp.quiz.body.data('bg-color'));

    if (pass) {
        rpApp.quiz.body.addClass('rp-bg-color-green-dark');
        rpApp.quiz.body.css({
            'background-image': 'url(\'' + rpApp.wpAssetUrl + '/email-university/EU-background-quiz-congrats.svg\')'
        });
    } else {
        rpApp.quiz.body.addClass('rp-bg-color-red');
        rpApp.quiz.body.css({
            'background-image': 'url(\'' + rpApp.wpAssetUrl + '/email-university/EU-background-quiz-fail.svg\')'
        });
    }
};

rpApp.quiz.reset = function() {
    rpApp.quiz.answers = [];
    rpApp.quiz.i = 0;
    rpApp.quiz.correctAnswers = 0;
    rpApp.quiz.body.removeClass('rp-bg-color-green-dark');
    rpApp.quiz.body.removeClass('rp-bg-color-red');
    rpApp.quiz.body.addClass(rpApp.quiz.body.data('bg-color'));
    rpApp.quiz.body.css({
        'background-image': 'url(\'' + rpApp.quiz.body.data('bg-image') + '\')'
    });
    rpApp.quiz.items.find('.question-option').removeClass('selected');
    rpApp.quiz.changeQuestion(false);
};

//*** Cookie utilities
rpApp.setCookie = function(cname, cvalue, exdays) {
    var expires = 'expires=';

    if (exdays === 0) {
        expires += '0';
    } else {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        expires += d.toUTCString();
    }
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + 'path=/';
};

rpApp.deleteCookie = function(cname) {
    var expires = 'expires=',
        d = new Date();

    d.setTime(d.getTime() - (1*24*60*60*1000));
    expires += d.toUTCString();
    document.cookie = cname + '=; ' + expires + '; ' + 'path=/';
};

rpApp.getCookie = function(cname) {
    var name = cname + '=',
        ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }

    return '';
};

rpApp.cookieExists = function(cname) {
    return rpApp.getCookie(cname) === '' ? false : true;
};

//*** Format utilities
rpApp.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

rpApp.verifyEmail = function(emailAddress) {
    return rpApp.validateEmail(emailAddress) ? true : false;
};

rpApp.validateDomain = function(domain) {
    var re = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
    return re.test(domain);
};

rpApp.startsWithWWW = function(url) {
    return (url.indexOf('www.') === 0) ? true : false;
};

rpApp.formatNumber = function(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

//*** Misc utilities
rpApp.currentDeviceSize = function() {
    // Ref: http://zerosixthree.se/detecting-media-queries-with-javascript/
    return window.getComputedStyle(document.body, ':after').getPropertyValue('content').replace(/['"]+/g, '');
};

rpApp.isOnScreen = function(element) {
    var is_on_screen = false;

    if (element.offset().top <= (rpApp.$window.scrollTop() + rpApp.$window.height())) {
        is_on_screen = true;
    }

    return is_on_screen;
};

(function() {
    var menus = [].slice.call(document.querySelectorAll('.rp-scroll-to-menu')),
        links = [].slice.call(document.querySelectorAll('.rp-jump-to-link')),
        toggles = [].slice.call(document.querySelectorAll('.rp-toggle-menu'));

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            var ref = this.href.split('#')[1];

            if (ref) {
                rpApp.goToSection(ref);
            }
        });
    });

    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            var parent = this.parentElement,
                sibling = this.previousElementSibling,
                width = parent.getBoundingClientRect().width;

            if (parent.classList.contains('hidden')) {
                parent.classList.remove('hidden');

                if (parent.classList.contains('rp-scroll-to-menu-a2a')) {
                    sibling.style.left = 0;
                } else {
                    sibling.style.right = 0;
                }
            } else {
                parent.classList.add('hidden');

                if (parent.classList.contains('rp-scroll-to-menu-a2a')) {
                    sibling.style.left = '-' + width + 'px';
                } else {
                    sibling.style.right = '-' + width + 'px';
                }
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        menus.forEach(function(menu) {
            menu.classList.add('loaded');
        });
    });
})();
