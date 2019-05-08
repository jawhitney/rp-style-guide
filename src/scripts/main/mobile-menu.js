(function() {
    var menu = document.getElementById('rpMobileMenu'),
        toggle = document.getElementById('rpMobileMenuToggle'),
        open = false;

    if (menu && toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            if (open) {
                menu.classList.remove('open');
                toggle.classList.remove('open');
                open = false;
            } else {
                menu.classList.add('open');
                toggle.classList.add('open');
                open = true;
            }
        });
    }
})();
