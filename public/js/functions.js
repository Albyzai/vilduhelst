var document = this;

$(document).ready(function ($) {
    $('.answer-peek').hide();

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 451) {
            $('.answer-peek').fadeIn();
        } else {
            $('.answer-peek').fadeOut();
        }
    });

    /* Funktion som sørger for at vise checkmark på knapperne når de er trykket */
    $('#buttonrow .button').click(function () {
        var $this = $(this);
        $this.addClass('selected');
        $('#buttonrow .button .question').css('display', 'none');
        $('#buttonrow .button .result').css('display', 'block');
        if ($this.attr('id') === 'redbutton' && $('.blueCheckDiv').css('display') !== 'block' && $('.redCheckDiv').css('display') !== 'block') {
            $('.redCheckDiv').css('display', 'block');
        } else if ($('.blueCheckDiv').css('display') !== 'block' && $('.redCheckDiv').css('display') !== 'block') {
            $('.blueCheckDiv').css('display', 'block');
        }
    });

    $('.button-right').click(function () {

    });

    $('.button-left').click(function () {

    });

});
