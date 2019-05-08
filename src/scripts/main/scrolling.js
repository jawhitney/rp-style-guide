(function() {
    if (document.getElementById('rpHero')) {
        var hero = document.getElementById('rpHero'),
            timeout;

        window.addEventListener('scroll', function(e) {
            if (timeout) {
                window.cancelAnimationFrame(timeout);
            }

            timeout = window.requestAnimationFrame(function () {
                var body = document.getElementsByTagName('body')[0],
                    scrollTop = {
                        'document': document.documentElement.scrollTop,
                        'body': body.scrollTop,
                    };

                if (scrollTop.document > 0 || scrollTop.body > 0) {
                    body.classList.add('rp-has-scrolled');
                    body.classList.add('rp-is-below-top');
                } else {
                    body.classList.remove('rp-is-below-top');
                }

                if (scrollTop.document > hero.clientHeight || scrollTop.body > hero.clientHeight) {
                    body.classList.add('rp-below-hero');
                } else {
                    body.classList.remove('rp-below-hero');
                }
            });
        });
    }
})();
