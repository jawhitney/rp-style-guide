(function() {
    var search = document.getElementById('rpSearchForm'),
        trigger = document.getElementById('rpSearchTrigger'),
        input = document.getElementById('s');

    if (search && trigger && input) {
        trigger.addEventListener('click', function(e) {
            toggleSearch(e);
        });
    }

    function toggleSearch(e) {
        e.preventDefault();

        if (search.classList.contains('active')) {
            trigger.classList.remove('active');
            search.classList.remove('active');
            search.style.width = 0 + 'px';
        } else {
            trigger.classList.add('active');
            search.classList.add('active');
            search.style.width = '400px';
            input.focus();
        }
    }
})();
