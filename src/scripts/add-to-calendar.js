var rpApp = rpApp || {};

(function($) {
    $(document).ready(function() {
        rpApp.$header = $('header');

		//*** Add to Calendar functions
        if ($('.rp-row-add-to-calendar').length > 0) {
            if (typeof $.datetimepicker !== 'undefined') {
    			var dtOptions = {
    				format: 'Y-m-d H:i',
    				closeOnDateSelect: true
    			};

    			$('#startDateTime').datetimepicker(dtOptions);
    			$('#endDateTime').datetimepicker(dtOptions);
    		}

    		if (typeof ClipboardJS !== 'undefined') {
    	        new ClipboardJS('.rp-copy-btn');
    	    }

            $('#rpAddToCalendar').on('submit', function(e) {
    			e.preventDefault();

    			var form = $(this),
    				errors = false;

    			form.find('input').each(function(i) {
    				if ($(this).val() === '') {
    					errors = true;
    					return false;
    				}
    			});

    			if (errors) {
    				$('html, body').animate({
    					scrollTop: $('.rp-row-add-to-calendar').offset().top - rpApp.$header.outerHeight()
    				}, 500, function() {
    					$('.rp-atc-errors').slideDown();
    				});
    			} else {
    				$('.rp-atc-errors').slideUp();

    				$('#eventTitle').html(form.find('#title').val());
    				$('#eventDescription').html(form.find('#description').val());
    				$('#eventLocation').html(form.find('#location').val());
    				$('#eventOrganizer').html(form.find('#organizer').val());
    				$('#eventOrganizerEmail').html(form.find('#organizerEmail').val());
    				$('#eventStartDateTime').html(form.find('#startDateTime').val());
    				$('#eventEndDateTime').html(form.find('#endDateTime').val());
    				$('#eventTimezone').html(form.find('#timezone').val());
    				$('#eventCtaText').html(form.find('#ctaText').val());


                    $('.rp-row-add-to-calendar-results').slideDown(function() {
                        $('html, body').animate({
                            scrollTop: $('.rp-row-add-to-calendar-results').offset().top - rpApp.$header.outerHeight()
                        }, 500, function() {

                        });
                    });
    			}
    		});
        }
	});
} (jQuery));
