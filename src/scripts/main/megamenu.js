(function() {
    var bounds;

    [].slice.call(document.querySelectorAll('.rp-megamenu-trigger, .rp-megamenu')).forEach(function(megamenu) {
        if (megamenu.classList.contains('rp-megamenu-trigger')) {
            megamenu.addEventListener('mouseenter', function(e) {
                closeMegamenu();

                if (megamenu.dataset.hasOwnProperty('childId')) {
                    megamenu.classList.add('open');
                    document.getElementById(megamenu.dataset.childId).classList.add('open');
                    document.getElementById('rpMegamenu').style.height = document.getElementById(megamenu.dataset.childId).clientHeight + 'px';

                    if (megamenu.classList.contains('rp-menu-categories')) {
                        document.getElementById('rpMegamenu').style.right = 'calc(100% - ' + (megamenu.getBoundingClientRect().right + 12.5) + 'px)';
                    } else {
                        document.getElementById('rpMegamenu').style.left = (megamenu.getBoundingClientRect().left - 12.5) + 'px';
                    }
                }
            });
        }

        megamenu.addEventListener('mouseleave', function(e) {
            checkTarget(e);
        });
    });

    [].slice.call(document.querySelectorAll('.rp-megamenu-ghost')).forEach(function(ghost) {
        ghost.addEventListener('mouseleave', function(e) {
            checkTarget(e);
        });
    });

    function checkTarget(e) {
        var target = e.relatedTarget || e.toElement;

        if (target === null ||
            !(target.classList.contains('rp-megamenu') ||
            target.classList.contains('rp-megamenu-trigger') ||
            target.classList.contains('rp-megamenu-content-left') ||
            target.classList.contains('rp-megamenu-content-right') ||
            target.classList.contains('rp-megamenu-ghost'))) {
            closeMegamenu();
        }
    }

    function closeMegamenu() {
        [].slice.call(document.querySelectorAll('.rp-megamenu-trigger.open, .rp-megamenu.open')).forEach(function(megamenu) {
            megamenu.classList.remove('open');
            document.getElementById('rpMegamenu').style.height = 0;
        });
    }
})();
