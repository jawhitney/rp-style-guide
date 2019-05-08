var rpApp = rpApp || {};

rpApp.formatNumber = function(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));

rpApp.calcUtils = {};

rpApp.calcUtils.checkFormComplete = function(cookie) {
    if (rpApp.cookieExists(cookie)) {
        $('.rp-row-calculator').fadeIn();
        $('.rp-loader').hide();
        $('.rp-marketo-form-wrapper').hide();
        $('.rp-row-marketo').hide();
    }
};

rpApp.calcUtils.setValidation = function(id) {
    $('form#' + id).validate({
        errorElement: "div",
        errorClass : 'dgjqueryerrorclass',
        onkeyup : false
    });
};

rpApp.calcUtils.setValidInput = function() {
    $('.form-group input').inputFilter(function(value) {
        return /^-?\d*[.,]?\d*$/.test(value);
    });
};

(function($) {
    $(document).ready(function() {
        $('.rp-tooltip').on('click', function(e) {
            e.preventDefault();

            $('#calcHelpModal .modal-title').html($(this).data('label'));
            $('#calcHelpModal .modal-body').html($(this).attr('title'));
            $('#calcHelpModal').modal('show');
        });

        if ($('.rp-sample-size-calculator').length > 0) {
            rpApp.calcUtils.setValidation('rpSampleSizeCalculator');
            rpApp.calcUtils.setValidInput();

            $('#rpSubmitCalculator').on('click', function(e) {
                if ($('form#rpSampleSizeCalculator').valid()) {
                    e.preventDefault();

                    var z = $('select#ConfidenceLevel').val(),
                        n = $('input#ListSize').val().replace(/\,/g,''),
                        p = 0.5,
                        m = $('input#MarginOfError').val()/100,
                        ss = ( Math.pow(z, 2) * n * p * (1 - p) ) / ( ( Math.pow(m, 2) * (n - 1) ) - ( Math.pow(z,2) * p * (p - 1) ) );

                    $('#calcResultsModal .rp-display-results').html(Math.round(ss));
                    $('#calcResultsModal').modal('show');
                }
            });
        }

        if ($('.rp-unsubscribe-calculator').length > 0) {
            rpApp.calcUtils.checkFormComplete('return_path_unsubscribe_calc');
            rpApp.calcUtils.setValidation('rpUnsubscribeCalculator');
            rpApp.calcUtils.setValidInput();

            $('#rpSubmitCalculator').on('click', function(e) {
                if ($('form#rpUnsubscribeCalculator').valid()) {
                    e.preventDefault();

                    var pv = $('input#SubscriberCount').val().replace(/\,/g,''),
                        r = $('input#UnsubRate').val() / 100,
                        t = $('input#AvgWeeklyCampaigns').val().replace(/\,/g,''),
                        fv = pv - (pv * Math.pow(1 - r, t * 52));

                    $('#calcResultsModal .rp-display-results').html(rpApp.formatNumber(Math.round(fv)));
                    $('#calcResultsModal').modal('show');
                }
            });
        }

        if ($('.rp-validation-roi-calculator').length > 0) {
            rpApp.calcUtils.checkFormComplete('return_path_validation_roi_calc');
            rpApp.calcUtils.setValidation('rpValidationRoiCalculator');
            rpApp.calcUtils.setValidInput();

            $('#rpSubmitCalculator').on('click', function(e) {
                if ($('form#rpValidationRoiCalculator').valid()) {
                    e.preventDefault();

                    // Emails collected per year (epy)
                    // Number of potential customers lost (pcl)
                    // Number of lost customer that were willing to spend money with you (lc)
                    // Potential Revenue lost per year due to poor email data quality (rlpy)
                    // Yearly cost to verify the number of emails collected each year (ycvepy)
                    // ROI (roi)

                    var epy = 12 * $('input#emailsPerMonth').val().replace(/\,/g,''),
                        pcl = 0.1 * epy,
                        lc = pcl * ($('input#conversionRate').val() / 100),
                        rlpy = lc * $('input#customerLifetimeValue').val().replace(/\,/g,''),
                        ycvepy = 0.006 * epy,
                        roi = 100 * ((rlpy - ycvepy) / ycvepy);

                    $('.rp-display-result-1').html(rpApp.formatNumber('$' + Math.round(rlpy)));
                    $('.rp-display-result-2').html(rpApp.formatNumber('$' + Math.round(ycvepy)));
                    $('.rp-display-result-3').html(rpApp.formatNumber('$' + Math.round(roi)));

                    $('#calcResultsModal').modal('show');
                }
            });
        }
	});
} (jQuery));
