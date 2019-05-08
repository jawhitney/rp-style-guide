(function() {
    [].slice.call(document.querySelectorAll('.rp-jump-to-link')).forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            var ref = this.href.split('#')[1],
                bounds = link.hasAttribute('data-bounds') ? link.dataset.bounds : 'top',
                offset = link.hasAttribute('data-offset') ? link.dataset.offset : 0;

            if (ref) {
                rpApp.goToSection(ref, bounds, -1 * offset);
            }
        });
    });
})();
