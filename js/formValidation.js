// validate
jQuery(document).ready(function($) {
    var validateSelector = 'input[data-validate=true]';
    var validateErrorClass = 'invalid';

    // find all validate elements
    $(document).find(validateSelector).each(function(){
        var $input = $(this);
        console.log($(this));
        var $form = $input.parents('form').eq(0);

        // define submit handler for parent form
        function submitHandler(form) {
            var result = true;

            var allWarnings = [];

            var $form = $(form);

            // get around all the child validate elements
            $form.find(validateSelector).each(function() {
                var $validateElement = $(this);
                var rulesList = $validateElement.attr('class').split(' ');
                var value = $validateElement.val();

                var $additionalElements = null;
                var localWarnings = [];

                for (var i = 0; i < rulesList.length; i++) {
                    var rule = rulesList[i];

                    switch (rule) {
                        case 'required':
                            // trim value
                            var value = $.trim(value);

                            if (!value.length) {
                                var warningText = $validateElement.data('validate-msg-required');
                                localWarnings.push(warningText);
                            }

                            break;
                        case 'email':
                            var checkReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                            if (!checkReg.test(value)) {
                                var warningText = $validateElement.data('validate-msg-email');
                                localWarnings.push(warningText);
                            }
                            break;
                        case 'only-digits-and-letters':
                            var checkReg = /^[a-zA-Z0-9]+$/;

                            if (!checkReg.test(value)) {
                                var warningText = $validateElement.data('validate-msg-only-digits-and-letters');
                                localWarnings.push(warningText);
                            }

                            break;

                        case 'only-digits':
                            var checkReg = /^[0-9]+$/;

                            if (!checkReg.test(value)) {
                                var warningText = $validateElement.data('validate-msg-only-digits');
                                localWarnings.push(warningText);
                            }

                            break;
                        case 'credit-card-number':
                            var checkReg = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

                            if (!checkReg.test(value)) {
                                var warningText = $validateElement.data('validate-credit-card-number');
                                localWarnings.push(warningText);
                            }

                            break;
                        case 'min-length':
                            var value = $.trim(value);
                            var minLength = $validateElement.data('validate-min-length');

                            if (value.length < minLength) {
                                var warningText = $validateElement.data('validate-msg-min-length');
                                localWarnings.push(warningText);
                            }

                            break;

                        case 'exact-length':
                            var value = $.trim(value);
                            var exactLength = $validateElement.data('validate-exact-length');

                            if (value.length != exactLength) {
                                var warningText = $validateElement.data('validate-msg-exact-length');
                                localWarnings.push(warningText);
                            }

                            break;
                        case 'matches':
                            var correspondElementId = $validateElement.data('validate-correspond-element-id');
                            var $correspondElement = $('#' + correspondElementId);
                            var secondValue = $correspondElement.val();

                            $additionalElements = $correspondElement;

                            if (value != secondValue) {
                                var warningText = $validateElement.data('validate-msg-matches');
                                localWarnings.push(warningText);
                            }

                            break;
                        case 'checked':
                            var state = $validateElement.prop('checked');

                            if (!state) {
                                var warningText = $validateElement.data('validate-msg-checked');
                                localWarnings.push(warningText);
                            }

                            break;
                    }

                }

                if (localWarnings.length) {
                    result = false;
                    $validateElement.addClass(validateErrorClass);
                    if ($validateElement.hasClass('dd-selected-value')) {
                        $validateElement
                            .parent()
                            .add($validateElement.next().find('.dd-selected-text'))
                            .addClass(validateErrorClass);
                    }
                    $validateElement.val('');

                    if ($additionalElements) {
                        $additionalElements.addClass(validateErrorClass);
                        $additionalElements.val('');
                    }
                } else {
                    $validateElement.removeClass(validateErrorClass);

                    if ($validateElement.hasClass('dd-selected-value')) {
                        $validateElement
                            .parent()
                            .add($validateElement.next().find('.dd-selected-text'))
                            .removeClass(validateErrorClass);
                    }

                    if ($additionalElements) {
                        $additionalElements.removeClass(validateErrorClass);
                    }
                }
                allWarnings = allWarnings.concat(localWarnings);
            });

            var msgElementId = $form.data('validate-msg-id');
            var $msgElement = $('#' + msgElementId);
            if (allWarnings.length) {
                result = false;
                setValidateWarnings($msgElement, allWarnings);
                $form.data('error-trigger') && $form.trigger($form.data('error-trigger'));
                $msgElement.addClass('active'); // adding "active" class to error area so it can take up space - AKD
            } else {
                resetValidateWarnings($msgElement);
            }
            return result;
        }

        function setValidateWarnings($msg, warnings) {
            $msg.html('');
            for (var i = 0; i < warnings.length; i++) {
                var warning = warnings[i];

                if (warning) {
                    $('<div/>', {
                        class: 'message error',
                        text: warning
                    }).appendTo($msg);
                }
            }
        }

        function resetValidateWarnings($msg) {
            $msg.html('');
        }

        // attach validate function to parent form
        $form.off('submit').on('submit', function(e){
            $form = e.currentTarget;
            var result = submitHandler($form);

            // if true - open next step
            if (result === true) {
                $(document).trigger("form:validated", [this] );
            }

            return false;

        });
    });
});
