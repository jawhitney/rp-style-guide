var rpApp = rpApp || {};

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementsByTagName('body')[0].classList.add('rp-dom-content-loaded');

        [].slice.call(document.querySelectorAll('.rp-bg-parallax, .rp-bg-parallax-home')).forEach(function(parallax) {
            parallax.classList.add('loaded');
        });
    });
})();

rpApp.isOnScreen = function(el) {
    var bounds = el.getBoundingClientRect();

    if ((bounds.top >= 0 || bounds.bottom <= (window.innerHeight || document.documentElement.clientHeight)) &&
        bounds.left >= 0 &&
        bounds.right <= (window.innerWidth || document.documentElement.clientWidth)) {
        return true;
    } else {
        return false;
    }
};

rpApp.goToSection = function(ref, bound, offset) {
    var position = 0,
        target = document.getElementById(ref);

    bound = bound || 'top';
    offset = offset || 0;

    if (target && ref !== 'top') {
        position = target.getBoundingClientRect()[bound] + window.pageYOffset + offset;
    }

    rpApp.goToPosition(position);
};

rpApp.goToPosition = function(position) {
    if (typeof $ !== 'undefined') {
        $('html, body').animate({
            scrollTop: position
        }, 500);
    } else {
        window.scrollTo({
            top: position,
            left: 0,
            behavior: 'smooth'
        });
    }
};

rpApp.currentDeviceSize = function() {
    // Ref: http://zerosixthree.se/detecting-media-queries-with-javascript/
    return window.getComputedStyle(document.body, ':after').getPropertyValue('content').replace(/['"]+/g, '');
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

rpApp.deleteCookie = function(cname) {
    var expires = 'expires=',
        d = new Date();

    d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
    expires += d.toUTCString();
    document.cookie = cname + '=; ' + expires + '; ' + 'path=/';
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

rpApp.verifyEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

rpApp.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
