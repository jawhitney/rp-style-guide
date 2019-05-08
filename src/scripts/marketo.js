var rpApp = rpApp || {};

rpApp.marketoFormValues = {};

rpApp.emailInvalidMessage = function() {
    var msgs = {
        'en': 'Please enter a valid email address.',
        'fr': 'Veuillez fournir une adresse électronique valide.',
        'de': 'Geben Sie bitte eine gültige E-Mail Adresse ein.',
        'it': 'Inserisci un indirizzo email valido',
        'pt-br': 'Por favor, forne&ccedil;a um endere&ccedil;o de email v&aacute;lido.',
        'es': 'Por favor, escribe una dirección de correo válida.'
    };

    return typeof icl_vars !== 'undefined' ? msgs[icl_vars.current_language] : msgs.en;
};

rpApp.setCheckboxList = function () {
    $('.mktoCheckboxList').each(function(i) {
        if (!$(this).parents('.mktoFormRow').hasClass('rpMktOptInCheckbox')) {
            $(this).parents('.mktoFormRow').addClass('rpMktCheckboxList');
        }
    });
};

rpApp.marketoInitializeForm = function(form) {
    if (rpApp.cookieExists('return_path_mkto_user_form_values')) {
        var userinfo = JSON.parse(rpApp.getCookie('return_path_mkto_user_form_values'));

        for (var key in userinfo) {
            if (userinfo.hasOwnProperty(key)) {
                rpApp.marketoFormValues[key] = userinfo[key];
            }
        }
    }

    form.vals(rpApp.marketoFormValues);

    $('label[for="optIn"].mktoLabel, label[for*="OptIn"].mktoLabel').each(function(i) {
        var optin = $(this).attr('for');

        $(this).parents('.mktoFormRow').addClass('rpMktOptInCheckbox');
        $('.mktoFieldWrap > label[for="' + optin + '"]').siblings('.mktoCheckboxList').find('label').remove();
        $('.mktoFieldWrap > label[for="' + optin + '"]').insertAfter($('.mktoFieldWrap > label[for="' + optin + '"]').siblings('.mktoCheckboxList'));
    });

    rpApp.setCheckboxList();

    $('input#optIn').parents('.mktoFormRow').insertBefore($('.mktoButton').parents('.mktoButtonRow'));

    $('.rp-loader-marketo').addClass('hide-loader');
    $('.rp-marketo-form-wrapper').addClass('rp-marketo-form-rendered');
};

rpApp.formValidation = function(form, email) {
    form.onValidate(function() {
        form.submitable(false);

        if ( rpApp.verifyEmail(email.val()) ) {
            form.submitable(true);
        } else {
            form.showErrorMessage(rpApp.emailInvalidMessage(), email);
        }
    });
};

rpApp.userFormValues = ['Company', 'Country', 'Email', 'FirstName', 'LastName', 'Phone', 'State'];

rpApp.formSubmitEvent = function(formId, values) {
    if (typeof dataLayer === 'object') {
        dataLayer.push({
            'event': 'gtm.formSubmit',
            'eventAction': formId,
            'eventCategory': 'Form Submit',
            'eventLabel': window.location.href
        });
    }

    var userinfo = {};

    rpApp.userFormValues.forEach(function(ufv) {
        if (values.hasOwnProperty(ufv)) {
            userinfo[ufv] = values[ufv];
        }
    });

    rpApp.setCookie('return_path_mkto_user_form_values', JSON.stringify(userinfo), 0);

    if (rpApp.cookieExists('return_path_mkto_form_fills')) {
        rpApp.formFills = JSON.parse(rpApp.getCookie('return_path_mkto_form_fills'));

        if (rpApp.formFills.indexOf(formId) === -1) {
            rpApp.formFills.push(formId);
            rpApp.setCookie('return_path_mkto_form_fills', JSON.stringify(rpApp.formFills), 365);
        }
    } else {
        rpApp.setCookie('return_path_mkto_form_fills', JSON.stringify([formId]), 365);
    }
};

rpApp.marketoInit = function() {
    MktoForms2.whenReady(function(form) {
        var email = form.getFormElem().find('#Email'),
            formId = form.getId();

        rpApp.marketoInitializeForm(form);
        rpApp.formValidation(form, email);

        form.onSuccess(function(values, followUpUrl) {
            rpApp.formSubmitEvent(formId, values);

            location.href = ( $('input#marketo_form_redirect_url').val() !== '' ) ? $('input#marketo_form_redirect_url').val() : followUpUrl;

            return false;
        });
    });

    MktoForms2.onFormRender(function(form) {
        rpApp.setCheckboxList();
    });
};

rpApp.marketoInitGame = function(name) {
    MktoForms2.whenReady(function(form) {
        var email = form.getFormElem().find('#Email'),
            formId = form.getId();

        rpApp.marketoInitializeForm(form);
        rpApp.formValidation(form, email);

        form.onSuccess(function(values, followUpUrl) {
            if (name === 'return_path_ptti_user_info') {
                var marketoVals = form.vals(),
                    userInfo = {
                        'firstname': marketoVals.FirstName,
                        'lastname': marketoVals.LastName,
                        'email': marketoVals.Email,
                        'company': marketoVals.Company
                    };

                rpApp.setCookie('return_path_ptti_user_info', JSON.stringify(userInfo), 365);
                rpApp.player = userInfo.firstname;
            } else {
                rpApp.setCookie(name, 1, 365);
            }

            rpApp.formSubmitEvent(formId, values);

            $('#rpGameModal').addClass('active');

            $('#rpMarketoFormSection').hide(function() {
                $('#rpGameSection').show();
            });

            if (typeof rpGame !== 'undefined') {
                rpGame.launchGame();
            }

            return false;
        });
    });

    MktoForms2.onFormRender(function(form) {
        rpApp.setCheckboxList();
    });
};

rpApp.marketoInitReferral = function() {
    MktoForms2.whenReady(function(form) {
        var emailreferrer = form.getFormElem().find('#Referrer_Email__c'),
            email = form.getFormElem().find('#Email'),
            formId = form.getId();

        rpApp.marketoInitializeForm(form);

        form.onValidate(function() {
            form.submitable(false);

            if ( rpApp.verifyEmail(emailreferrer.val()) && rpApp.verifyEmail(email.val()) ) {
                form.submitable(true);
            } else {
                if (!rpApp.verifyEmail(emailreferrer.val())) {
                    form.showErrorMessage(rpApp.emailInvalidMessage(), emailreferrer);
                }

                if (!rpApp.verifyEmail(email.val())) {
                    form.showErrorMessage(rpApp.emailInvalidMessage(), email);
                }
            }
        });

        form.onSuccess(function(values, followUpUrl) {
            rpApp.formSubmitEvent(formId, values);

            location.href = ( $('input#marketo_form_redirect_url').val() !== '' ) ? $('input#marketo_form_redirect_url').val() : followUpUrl;

            return false;
        });
    });

    MktoForms2.onFormRender(function(form) {
        rpApp.setCheckboxList();
    });
};

rpApp.marketoInitCalc = function() {
    MktoForms2.whenReady(function(form) {
        rpApp.marketoInitializeForm(form);

        var formId = form.getId();

        form.onSuccess(function(values, followUpUrl) {
            rpApp.formSubmitEvent(formId, values);

            $('.rp-marketo-form-wrapper form').fadeOut(function() {
                $('.rp-row-calculator').fadeIn();
                $('.rp-loader').hide();
                $('.rp-marketo-form-wrapper').hide();
                $('.rp-row-marketo').hide();
            });

            if (formId === 2638) {
                rpApp.setCookie('return_path_unsubscribe_calc', 1, 365);
            } else if (formId === 3511) {
                rpApp.setCookie('return_path_validation_roi_calc', 1, 365);
            }

            return false;
        });
    });

    MktoForms2.onFormRender(function(form) {
        rpApp.setCheckboxList();
    });
};

rpApp.marketoInitQuiz = function() {
    MktoForms2.whenReady(function(form) {
        rpApp.marketoInitializeForm(form);

        var formId = form.getId();

        form.onSubmit(function(form) {
            if (typeof Modernizr !== 'undefined' && Modernizr.audio) {
                rpApp.quiz.playButtonClick();
            }
        });

        form.onSuccess(function(values, followUpUrl) {
            rpApp.formSubmitEvent(formId, values);

            if ($('.rp-quiz-archive-page').length > 0) {
                rpApp.quiz.checkConnect();
            }

            if ($('.rp-quiz-single').length > 0) {
                $('#quizModal').modal('hide');
                rpApp.quiz.next(true);
            }

            if (!rpApp.euDisableCookies) {
                var marketoVals = form.vals(),
                    userInfo = {
                        'firstname': marketoVals.FirstName,
                        'lastname': marketoVals.LastName,
                        'email': marketoVals.Email,
                        'company': marketoVals.Company
                    };

                rpApp.setCookie('return_path_wke_quiz_user_info', JSON.stringify(userInfo), 365);
            }

            return false;
        });
    });

    MktoForms2.onFormRender(function(form) {
        rpApp.setCheckboxList();
    });
};

rpApp.marketoInitEmailDNA = function() {
    MktoForms2.whenReady(function(form) {
        rpApp.marketoInitializeForm(form);

        var formId = form.getId();

        form.onSuccess(function(values, followUpUrl) {
            rpApp.formSubmitEvent(formId, values);

            $('#radFormWrapper').fadeOut(function() {
                $('#radThanksWrapper').fadeIn();
            });

            return false;
        });
    });

    MktoForms2.onFormRender(function(form) {
        rpApp.setCheckboxList();
    });
};

rpApp.marketoInitBlog = function() {
    MktoForms2.whenReady(function(form) {
        var email = form.getFormElem().find('#Email'),
            formId = form.getId();

        rpApp.marketoInitializeForm(form);
        rpApp.formValidation(form, email);

        form.onSuccess(function(values, followUpUrl) {
            rpApp.formSubmitEvent(formId, values);

            location.href = ( $('input#blogThankYouUrl').val() !== '' ) ? $('input#blogThankYouUrl').val() : followUpUrl;

            return false;
        });
    });

    MktoForms2.onFormRender(function(form) {
        rpApp.setCheckboxList();
    });
};

rpApp.marketoInitForm = function() {
    if ($('#marketo_form_id').val() === '1471') {
        rpApp.marketoInitReferral();
    } else if ($('#marketo_form_id').val() === '1577') {
        rpApp.marketoInitBlog();
    } else if ($('#marketo_form_id').val() === '2638' || $('#marketo_form_id').val() === '3511') {
        rpApp.marketoInitCalc();
    } else if ($('#marketo_form_id').val() === '3081' || rpApp.isEmailUniversity) {
        rpApp.marketoInitQuiz();
    } else if ($('#marketo_form_id').val() === '4045') {
        rpApp.marketoInitEmailDNA();
    } else if ($('#marketo_form_id').val() === '3160') {
        rpApp.marketoInitGame('return_path_ptti_user_info');
    } else if ($('#marketo_form_id').val() === '3730') {
        rpApp.marketoInitGame('return_path_email_heroes_game');
    } else if ($('#marketo_form_id').val() === '3981') {
        rpApp.marketoInitGame('return_path_escape_room_game');
    } else {
        rpApp.marketoInit();
    }
};

$(document).ready(function() {
    var d = new Date();

    rpApp.marketoFormValues = {
        'formSubmitDateHidden': (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(),
        'gACampaign': $('#ga_utmccn').length > 0 ? $('#ga_utmccn').val() : '',
        'gAClientID': $('#ga_uid').length > 0 ? $('#ga_uid').val() : '',
        'gAMedium': $('#ga_utmcmd').length > 0 ? $('#ga_utmcmd').val() : '',
        'gASource': $('#ga_utmcsr').length > 0 ? $('#ga_utmcsr').val() : '',
        'gAKeyword': $('#ga_utmctr').length > 0 ? $('#ga_utmctr').val() : ''
    };

    rpApp.marketoInitForm();
});
