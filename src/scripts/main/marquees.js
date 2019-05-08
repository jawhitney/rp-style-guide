(function() {
    var scrollTimeout,
        resizeTimeout,
        marquees = [].slice.call(document.querySelectorAll('.rp-row-marquee')).filter(function(marquee) {
            return [].slice.call(marquee.querySelectorAll('.item')).length > 1;
        }),
        intervals = {};

    marquees.forEach(function(marquee, m) {
        var items = [].slice.call(marquee.querySelectorAll('.item')),
            indicators = [].slice.call(marquee.querySelectorAll('.indicators div'));

        setHeight(marquee);

        items[0].classList.add('active');

        if (indicators.length > 0) {
            indicators[0].classList.add('active');
            indicators.forEach(function(indicator, i) {
                indicator.addEventListener('click', function(e) {
                    e.preventDefault();

                    stop(m);
                    cycle([marquee, m], i);
                });
            });
        }

        if (!marquee.classList.contains('loaded')) {
            marquee.classList.add('loaded');
        }
    });

    window.addEventListener('scroll', function(e) {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(function () {
            marquees.forEach(function(marquee, m) {
                if (rpApp.isOnScreen(marquee) && !intervals[m]) {
                    start(marquee, m);
                }
            });
        });
    });

    window.addEventListener('resize', function(e) {
        if (resizeTimeout) {
            window.cancelAnimationFrame(resizeTimeout);
        }

        resizeTimeout = window.requestAnimationFrame(function () {
            marquees.forEach(function(marquee, m) {
                setHeight(marquee);
            });
        });
    });

    function setHeight(marquee) {
        if (marquee.classList.contains('rp-row-promo')) {
            var height = 0,
                padding = 150,
                content,
                container = [].slice.call(marquee.querySelectorAll('.container-inner'));

            [].slice.call(marquee.querySelectorAll('.item')).forEach(function(item, i) {
                content = [].slice.call(item.querySelectorAll('.item-content'));

                if (content.length > 0) {
                    if (content[0].clientHeight > height) {
                        height = content[0].clientHeight;
                    }
                }
            });

            if (container.length > 0) {
                container[0].style.height = padding + height + 'px';
            }
        }
    }

    function start(marquee, m) {
        intervals[m] = window.requestInterval(cycle, marquee.dataset.interval, marquee, m);
    }

    function stop(m) {
        window.clearRequestInterval(intervals[m]);
        intervals[m] = false;
    }

    function cycle(args, next) {
        next = next || 'undefined';

        var marquee = args[0],
            m = args[1],
            items = [].slice.call(marquee.querySelectorAll('.item')),
            indicators = [].slice.call(marquee.querySelectorAll('.indicators div')),
            current = parseInt([].slice.call(marquee.querySelectorAll('.item.active'))[0].dataset.slide);

        if (next === 'undefined') {
            next = (current + 1 < items.length) ? current + 1 : 0;
        } else {
            start(marquee, m);
        }

        if (next !== current) {
            items[current].classList.remove('active');
            items[next].classList.add('active');

            if (indicators.length > 0) {
                indicators[current].classList.remove('active');
                indicators[next].classList.add('active');
            }
        }
    }
})();
