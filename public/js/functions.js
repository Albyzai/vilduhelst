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

function removeOnclicks() {
    $('.button').onclick = null;
    console.log("removeonclicks called");
}

function animatePercent(id, start, end, duration) {
    // assumes integer values for start and end

    var obj = document.getElementById(id);
    var range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));

    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);

    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;

    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = value + '%';
        if (value === end) {
            clearInterval(timer);
        }
    }

    var timer = setInterval(run, stepTime);
    run();

}
