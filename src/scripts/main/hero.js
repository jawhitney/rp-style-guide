(function() {
    if (document.getElementById('rpHero') && document.getElementById('rpHero').classList.contains('rp-row-hero-scroll')) {
        var scrollTimeout,
            resizeTimeout,
            sections = [].slice.call(document.querySelectorAll('.rp-row-hero-scroll .section')),
            headline = [].slice.call(sections[sections.length -1].querySelectorAll('h2'))[0],
            svg = [].slice.call(document.querySelectorAll('.line'))[0],
            line = [].slice.call(document.querySelectorAll('.line svg line'))[0],
            envelopeBackground = [].slice.call(document.querySelectorAll('.envelope-bg'))[0],
            envelope = [].slice.call(document.querySelectorAll('.envelope'))[0],
            envelopeBounds,
            screenshots = [].slice.call(document.querySelectorAll('.screenshots'))[0],
            screenshotsCta = [].slice.call(document.querySelectorAll('.screenshots-cta'))[0],
            offset,
            reset = function() {
                var percent = 0.55;

                if (window.innerWidth >= 1920) {
                    percent = 0.65;
                } else if (document.documentElement.classList.contains('touchevents')) {
                    percent = 0.65;
                }

                offset = percent * window.innerHeight;

                if (svg) {
                    svg.style.top = offset + 'px';
                }

                if (envelope) {
                    envelopeBackground.style.top = offset + 'px';
                    envelope.style.top = offset + 'px';
                    envelopeBounds = envelope.getBoundingClientRect();
                }

                if (sections) {
                    sections[0].classList.add('active');
                }

                [].slice.call(document.querySelectorAll('.icon')).forEach(function(icon) {
                    icon.style.top = offset - (25) + 'px';
                    icon.style.left = envelopeBounds.right + 'px';
                });

                [].slice.call(document.querySelectorAll('.rp-jump-to-link')).forEach(function(link) {
                    var linkBounds = link.getBoundingClientRect();

                    link.style.top = envelopeBounds.top + (0.5 * (envelopeBounds.bottom - envelopeBounds.top)) - (0.5 * (linkBounds.bottom - linkBounds.top)) + 'px';
                });
            };

        document.addEventListener('DOMContentLoaded', reset);

        window.addEventListener('resize', function(e) {
            if (resizeTimeout) {
                window.cancelAnimationFrame(resizeTimeout);
            }

            resizeTimeout = window.requestAnimationFrame(function () {
                reset();
            });
        });

        envelope.addEventListener('transitionend', function(e) {
            if (!envelope.classList.contains('complete')) {
                envelopeBounds = envelope.getBoundingClientRect();
            }
        });

        window.addEventListener('scroll', function(e) {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }

            scrollTimeout = window.requestAnimationFrame(function () {
                sections.forEach(function(section, s) {
                    if (envelopeBounds.top < section.getBoundingClientRect().bottom) {
                        if (s === 0) {
                            section.classList.add('active');
                        } else {
                            [].slice.call(section.querySelectorAll('.inbox')).forEach(function(inbox) {
                                if (inbox.getBoundingClientRect().top <= envelopeBounds.top) {
                                    section.classList.add('active');
                                    section.classList.add('triggered');
                                } else {
                                    section.classList.remove('active');
                                }
                            });

                            [].slice.call(section.querySelectorAll('.rp-jump-to-link')).forEach(function(link) {
                                var parentElement = link.parentNode.parentNode.parentNode;

                                if (parentElement && parentElement.getBoundingClientRect().top <= envelopeBounds.top) {
                                    section.classList.add('active');
                                    envelope.classList.add('grown');
                                } else {
                                    section.classList.remove('active');
                                    envelope.classList.remove('grown');
                                }
                            });
                        }
                    } else {
                        section.classList.remove('active');
                    }
                });

                if ((headline.getBoundingClientRect().bottom + 25) <= envelopeBounds.top) {
                    envelope.classList.add('complete');
                    screenshotsCta.classList.add('complete');
                    screenshots.classList.add('complete');
                    svg.classList.add('complete');
                } else {
                    envelope.classList.remove('complete');
                    screenshotsCta.classList.remove('complete');
                    screenshots.classList.remove('complete');
                    svg.classList.remove('complete');
                    svg.style.height = window.pageYOffset + 'px';
                    line.setAttribute('y2', window.pageYOffset);
                }
            });
        });
    }
})();
