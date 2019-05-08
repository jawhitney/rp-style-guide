var rpApp = rpApp || {};

(function($) {
    var page = 1,
        offset = 150,
        archive,
        bounds,
        results,
        bgImages,
        bgImageObserver,
        content,
        contentImages,
        contentObserver,
        data = {};

    [].slice.call(document.querySelectorAll('#rpLoadMore, #rpFilterTrigger')).forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();

            var button = this;

            if (!button.disabled) {
                button.disabled = true;
                button.classList.add('loading');

                if (button.id === 'rpLoadMore') {
                    page++;
                } else {
                    page = 1;
                }

                data.action = 'rp_get_filtered_data';
                data.security = rp_filters_ajax_object.security;
                data.page = page;
                data.post_type = rpApp.archive.post_type;
                data.filters = rpApp.archive.filters;

                [].slice.call(document.querySelectorAll('#rpFilters ul')).forEach(function(filter) {
                    var values = [];

                    [].slice.call(filter.querySelectorAll('input')).forEach(function(input) {
                        if (input.checked) {
                            values.push(input.value);
                        }
                    });

                    data[filter.dataset.filter] = values.join(',');
                });

                $.ajax({
                    url: rp_filters_ajax_object.ajax_url,
                    type: 'get',
                    data: data,
                    success: function(response) {
                        if (undefined !== response.success && false === response.success) {
                            return;
                        }

                        archive = document.getElementById('rpArchive');
                        bounds = archive.getBoundingClientRect();
                        results = JSON.parse(response);

                        if (button.id === 'rpLoadMore') {
                            $(archive).append($(results.content));

                            if (page >= results.max_num_pages) {
                                document.getElementById('rpLoadMore').classList.add('hide');
                            }
                        } else {
                            $(archive).html($(results.content));

                            if (results.max_num_pages > 1) {
                                document.getElementById('rpLoadMore').classList.remove('hide');
                            } else {
                                document.getElementById('rpLoadMore').classList.add('hide');
                            }
                        }

                        if (results.total_posts === 0) {
                            document.getElementById('rpLoadMore').classList.add('hide');
                            rpApp.goToSection('rpArchive', 'top', -1 * offset);
                        } else {
                            bgImages = [].slice.call(document.querySelectorAll('div.rp-bg-image:not([class="loaded"])'));
                            content = [].slice.call(document.querySelectorAll('.animate-content:not([class="loaded"])'));

                            if ('IntersectionObserver' in window) {
                                bgImageObserver = new IntersectionObserver(function(entries, observer) {
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

                                contentObserver = new IntersectionObserver(function(entries, observer) {
                                    entries.forEach(function(entry) {
                                        if (entry.isIntersecting) {
                                            var content = entry.target;
                                            contentObserver.unobserve(content);
                                            rpApp.updateContent(content);
                                        }
                                    });
                                });

                                content.forEach(function(image) {
                                    contentObserver.observe(image);
                                });
                            } else {
                                bgImages.forEach(function(image) {
                                    rpApp.updateBgImage(image);
                                });

                                content.forEach(function(content) {
                                    rpApp.updateContent(content);
                                });
                            }

                            if (button.id === 'rpLoadMore') {
                                rpApp.goToPosition(window.pageYOffset + bounds.bottom - offset);
                            } else {
                                rpApp.goToPosition(window.pageYOffset + bounds.top - offset);
                            }
                        }

                        [].slice.call(document.querySelectorAll('.rp-more-content')).forEach(function(content) {
                            if (!content.classList.contains('loaded')) {
                                content.classList.add('loaded');
                            }
                        });

                        button.disabled = false;
                        button.classList.remove('loading');
                    },
                    error: function(response) {
                        console.log('Error retrieving the information: ' + response.status + ' ' + response.statusText);
                        $('#rpArchive').html($('<div class="row"><div class="col text-center"><h3>Something went wrong. Please try again later.</h3></div></div>'));
                    }
                });
            }
        });
    });
})(jQuery);
