var rpApp = rpApp || {};

rpApp.useZuoraApi = ['invoicePayment', 'creditCardPayment'];
rpApp.billingFields = {
    all: ['accountNumber', 'customerAccountName', 'invoiceNumber', 'regionCurrencyTemp', 'amount'],
    invoice: ['invoiceNumber', 'regionCurrencyTemp', 'amount'],
    certification: ['customerAccountName', 'regionCurrencyTemp', 'amount'],
    creditCard: ['regionCurrencyTemp'],
};
rpApp.collectionsEmail = '<a href="mailto:' + rpApp.billingContent.collectionsEmail + '">' + rpApp.billingContent.collectionsEmail + '</a>';
rpApp.collectionsPhone = '<span class="d-none d-lg-inline">' + rpApp.billingContent.collectionsPhone + '</span><a class="d-inline d-lg-none" href="tel:1-212-905-5500">' + rpApp.billingContent.collectionsPhone + '</a>';
rpApp.issues = 'If you are still having issues, please send an email to ' + rpApp.collectionsEmail + ' or call ' + rpApp.collectionsPhone + '.';

rpApp.resetForm = function() {
    $('#rpBilling')[0].reset();
    $('.alert').hide();
    rpApp.hideTryAgain();

    rpApp.billingFields.all.forEach(function(id) {
        rpApp.hideField(id);
    });

    rpApp.hideSubmit();
};

rpApp.showSubmit = function() {
    $('#submit').parents('.form-group').show();
};

rpApp.hideSubmit = function() {
    $('#submit').parents('.form-group').hide();
};

rpApp.showField = function(id) {
    $('#' + id).attr({
        'required': '',
        'aria-required': true
    }).parents('.form-group').show();
};

rpApp.hideField = function(id) {
    $('#' + id).removeAttr('required aria-required disabled');
    $('#' + id).parents('.form-group').hide();
};

rpApp.addError = function(error) {
    $('#accountNumberMessage').html('<p>' + error + '</p>');
};

rpApp.appendError = function(error) {
    $('#accountNumberMessage').append('<p>' + error + '</p>');
};

rpApp.showError = function() {
    $('#accountNumberMessage').show();
};

rpApp.hideError = function() {
    $('#accountNumberMessage').hide().html('');
};

rpApp.serviceUnavailable = function() {
    rpApp.addError(rpApp.billingContent.errorMessage);
    rpApp.showError();
    rpApp.showTryAgain();
};

rpApp.showTryAgain = function() {
    $('#tryAgain').show();
};

rpApp.hideTryAgain = function() {
    $('#tryAgain').hide();
};

rpApp.zuoraCallback = function(response) {
    var message = '<p>',
        alertClass = 'alert ';

    if (response.hasOwnProperty('success')) {
        if (response.success) {
            message = rpApp.billingContent.zuoraSuccess;
            alertClass += 'alert-success';
        } else {
            alertClass += 'alert-danger';

            message += rpApp.billingContent.errorMessage;

            if (response.responseFrom === 'Response_From_Submit_Page') {
                message += ' (Zuora error code: ' + response.errorCode + ', ' + 'message: ' + response.errorMessage + ').';
            }
        }
    } else {
        message += rpApp.billingContent.errorMessage;
    }

    message += '</p>';

    if (!response.success || !response.hasOwnProperty('success')) {
        $('#tryAgain').show();
    }

    $('#zuora_payment').hide();
    $('#zuora_response').removeClass().addClass(alertClass).html(message).show();

    rpApp.goToSection('#zuora_response');
};

(function($) {
    $(document).ready(function() {
        if ($('.rp-row-billing').length > 0) {
            $('.rp-loader').hide();
            rpApp.showField('typeOfPayment');

            $('#typeOfPayment').on('change', function() {
                rpApp.resetForm();

                if (rpApp.useZuoraApi.indexOf($('#typeOfPayment').val()) !== -1) {
                    $('#accountNumberInstructions').show();

                    rpApp.showField('accountNumber');
                } else {
                    rpApp.billingFields.certification.forEach(function(id) {
                        rpApp.showField(id);
                    });

                    rpApp.showSubmit();
                }

                if ($('#typeOfPayment').val() === 'creditCardPayment') {
                    $('#submit').val(rpApp.billingContent.submitZuora);
                } else {
                    $('#submit').val(rpApp.billingContent.submitPaypal);
                }

                $('#submit').attr('disabled', true);
            });

            $('#accountNumber').on('keyup', function() {
                $('.rp-loader').show();

                rpApp.hideError();

                clearTimeout(rpApp.timeout);

                rpApp.timeout = setTimeout(function () {
                    if ($('#accountNumber').val() !== '') {
                        $.ajax({
                            type: 'GET',
                            url: rpApp.billingApiUrl,
                            data: {
                                method: 'authToken',
                                format: 'json',
                            },
                            dataType: 'json',
                            success: function(response) {
                                if (response.data.hasOwnProperty('authToken')) {
                                    if ($('#typeOfPayment').val() === 'invoicePayment') {
                                        $.ajax({
                                            type: 'GET',
                                            url: rpApp.billingApiUrl,
                                            data: {
                                                method: 'invoices',
                                                format: 'json',
                                                authToken: response.data.authToken,
                                                accountnumber: $('#accountNumber').val()
                                            },
                                            dataType: 'json',
                                            success: function(response) {
                                                if (response.data.invoices.length > 0 &&
                                                    response.data.hasOwnProperty('currency') &&
                                                    response.data.hasOwnProperty('invoices')) {
                                                    $('#invoiceNumber').html('<option value="" data-amount="">' + rpApp.billingContent.invoiceSelect + '</option>');

                                                    response.data.invoices.forEach(function(invoice) {
                                                        $('#invoiceNumber').append('<option value="' + invoice.invoiceNumber + '" data-amount="' + invoice.amount + '" data-currency="' + response.data.currency + '">' + invoice.invoiceNumber + '</option>');
                                                    });

                                                    rpApp.billingFields.invoice.forEach(function(id) {
                                                        rpApp.showField(id);
                                                    });

                                                    $('#invoiceNumber').focus();

                                                    $('#regionCurrencyTemp').attr('disabled', '');

                                                    rpApp.showSubmit();
                                                } else {
                                                    rpApp.billingFields.invoice.forEach(function(id) {
                                                        rpApp.hideField(id);
                                                    });

                                                    rpApp.hideSubmit();

                                                    rpApp.addError(rpApp.billingContent.noInvoices + rpApp.issues);
                                                    rpApp.showError();
                                                }
                                            },
                                            error: function() {
                                                rpApp.serviceUnavailable();
                                            },
                                            complete: function() {
                                                $('.rp-loader').hide();
                                            }
                                        });
                                    } else {
                                        $.ajax({
                                            type: 'GET',
                                            url: rpApp.billingApiUrl,
                                            data: {
                                                method: 'accountInfo',
                                                format: 'json',
                                                authToken: response.data.authToken,
                                                accountnumber: $('#accountNumber').val()
                                            },
                                            dataType: 'json',
                                            success: function(response) {
                                                if (response.data.hasOwnProperty('accountId')) {
                                                    rpApp.billingFields.creditCard.forEach(function(id) {
                                                        rpApp.showField(id);
                                                    });

                                                    $('#accountId').val(response.data.accountId);

                                                    if (response.data.hasOwnProperty('currency')) {
                                                        $('#regionCurrencyTemp').attr('disabled', '');
                                                        $('#regionCurrencyTemp').val(response.data.currency);
                                                    } else {
                                                        $('#regionCurrencyTemp').removeAttr('disabled');
                                                    }

                                                    rpApp.showSubmit();
                                                    $('#submit').attr('disabled', false);
                                                } else {
                                                    rpApp.billingFields.creditCard.forEach(function(id) {
                                                        rpApp.hideField(id);
                                                    });

                                                    rpApp.hideSubmit();

                                                    rpApp.addError(rpApp.billingContent.noAccount + rpApp.issues);
                                                    rpApp.showError();
                                                }
                                            },
                                            error: function() {
                                                rpApp.serviceUnavailable();
                                            },
                                            complete: function() {
                                                $('.rp-loader').hide();
                                            }
                                        });
                                    }
                                } else {
                                    rpApp.serviceUnavailable();
                                }
                            },
                            error: function() {
                                rpApp.serviceUnavailable();
                            }
                        });
                    } else {
                        $('.rp-loader').hide();
                    }
                });
            });

            $('#invoiceNumber').on('change blur', function() {
                if ($('#invoiceNumber option:selected').data('amount') !== '') {
                    var amount = $('#invoiceNumber option:selected').data('amount'),
                        amountFormatted = (Number(amount)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 });

                    $('#amount').val(amountFormatted).change();
                } else {
                    $('#amount').val('').change();
                }

                if ($('#invoiceNumber option:selected').data('currency') !== '') {
                    $('#regionCurrencyTemp').val($('#invoiceNumber option:selected').data('currency'));
                }
            });

            $('form').on('submit', function(e) {
                rpApp.hideError();

                rpApp.formErrors = [];

                $('#paymentType').val($('#typeOfPayment').val());

                $('input,textarea,select').filter('[required]:visible').each(function(i) {
                    if ($(this).val() === '') {
                        rpApp.formErrors.push($('label[for="' + $(this).attr('id') + '"]').text() + ' is required.');
                    }
                });

                if (rpApp.formErrors.length > 0) {
                    e.preventDefault();

                    rpApp.formErrors.forEach(function(error) {
                        rpApp.appendError(error);
                    });

                    rpApp.showError();
                } else {
                    $('#regionCurrencyTemp').attr('disabled', '');
                    $('#regionCurrency').val($('#regionCurrencyTemp').val());
                }
            });

            $('#amount').on('change blur', function() {
                if ($(this).val() !== '') {
                    $('#submit').attr('disabled', false);
                } else {
                    $('#submit').attr('disabled', true);
                }
            });

            if (rpApp.hasOwnProperty('zuoraParams') && typeof Z !== 'undefined') {
                rpApp.zuoraInfo = {};
                rpApp.zuoraPrepopulateFields = {};

                Z.render(
                    rpApp.zuoraParams,
                    rpApp.zuoraPrepopulateFields,
                    rpApp.zuoraCallback
                );
            }
        }
	});
} (jQuery));
