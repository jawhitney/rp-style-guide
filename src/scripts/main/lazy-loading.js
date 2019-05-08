var rpApp = rpApp || {};

rpApp.updateImage = function(image) {
    var img = new Image();
    img.src = image.dataset.src;
    img.alt = image.alt;
    img.classList.add('rp-image-lazy-load');
    img.onload = function() {
        image.classList.add('loaded');
        img.classList.add('loaded');
    };

    image.parentElement.appendChild(img);
};

rpApp.updateBgImage = function(el) {
    if (el.hasAttribute('data-bgimage')) {
        var img = new Image();
        img.src = el.dataset.bgimage;
        img.onload = function() {
            el.style.backgroundImage = 'url(' + el.dataset.bgimage + ')';
            el.classList.add('loaded');
        };
    }
};

rpApp.updateVideo = function(video) {
    video.poster = video.dataset.poster;

    for (var source in video.children) {
        var videoSource = video.children[source];
        if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
            videoSource.src = videoSource.dataset.src;
        }
    }

    video.load();
    video.oncanplay = function() {
        video.classList.add('loaded');
    };
};

rpApp.updateContent = function(content) {
    content.classList.add('loaded');
};

rpApp.updateStat = function(stat) {
    var duration = 2000,
        range = stat.dataset.stat,
        unit = stat.dataset.unit,
        uom = stat.dataset.uom,
        stepTime = Math.abs(Math.floor(duration / range)),
        endTime = new Date().getTime() + duration,
        timer;

    function run() {
        var remaining = Math.max((endTime - new Date().getTime()) / duration, 0),
            value = Math.round(range - (remaining * range));

        if (unit === 'currency') {
            if (value < 0) {
                value = '-' + uom + Math.abs(value).toFixed(2);
            } else {
                value = uom + value.toFixed(2);
            }
        } else {
            value += uom;
        }

        stat.innerHTML = value;

        if (value === range) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, Math.max(stepTime, 50));
    run();
};

rpApp.animateContent = [
    '.animate-content:not([class="loaded"])',
    '.content-left-image-right:not([class="loaded"])',
    '.image-left-content-right:not([class="loaded"])',
];

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var config = {
            threshold: [0.25]
        };

        var images = [].slice.call(document.querySelectorAll('img.rp-image-lazy-load-placeholder:not([class="loaded"])')),
            bgImages = [].slice.call(document.querySelectorAll('div.rp-bg-image:not([class="loaded"])')),
            videos = [].slice.call(document.querySelectorAll('video.rp-lazy-load-video:not([class="loaded"])')),
            content = [].slice.call(document.querySelectorAll(rpApp.animateContent.join(','))),
            stats = [].slice.call(document.querySelectorAll('.animate-content .rp-stat:not([class="triggered"])'));

        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var image = entry.target;
                        imageObserver.unobserve(image);
                        rpApp.updateImage(image);
                    }
                });
            });

            images.forEach(function(image) {
                imageObserver.observe(image);
            });

            var bgImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var image = entry.target;
                        bgImageObserver.unobserve(image);
                        rpApp.updateBgImage(image);
                    }
                });
            });

            bgImages.forEach(function(image) {
                bgImageObserver.observe(image);
            });

            var videoObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var video = entry.target;
                        rpApp.updateVideo(video);
                        videoObserver.unobserve(video);
                    }
                });
            });

            videos.forEach(function(video) {
                videoObserver.observe(video);
            });

            var contentObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var content = entry.target;

                        rpApp.updateContent(content);
                        contentObserver.unobserve(content);
                    }
                });
            }, config);

            content.forEach(function(content) {
                contentObserver.observe(content);
            });

            var statsObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var stat = entry.target;
                        rpApp.updateStat(stat);
                        statsObserver.unobserve(stat);
                    }
                });
            }, config);

            stats.forEach(function(stat) {
                statsObserver.observe(stat);
            });
        } else {
            images.forEach(function(image) {
                rpApp.updateImage(image);
            });

            bgImages.forEach(function(image) {
                rpApp.updateBgImage(image);
            });

            videos.forEach(function(video) {
                rpApp.updateVideo(video);
            });

            content.forEach(function(content) {
                rpApp.updateContent(content);
            });

            stat.forEach(function(stat) {
                rpApp.updateStat(stat);
            });
        }
    });
})();
