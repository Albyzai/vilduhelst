var document = this;




$(document).ready(function ($) {


    var fadedIn = false;



    $(document).scroll(function () {
        let y = $(this).scrollTop();
        let treshold = $('#buttonrow').outerHeight() + $('#textrow').outerHeight();

        if (y > treshold) {
            if (!fadedIn) {
                $('.answer-peek').fadeIn(function () {
                    $(this).css('display', 'block');
                    fadedIn = true
                });

            }

        } else {

            if (fadedIn) {
                $('.answer-peek').fadeOut(function () {
                    $(this).css('display', 'none');
                    fadedIn = false;
                });
            }


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

    $('.button-right').on('click', function () {
        $.ajax({
            type: 'GET',
            url: '/next',
            success: function (response) {
                window.location.href = '/next'
                console.log(response);
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $('.button-left').on('click', function () {
        $.ajax({
            type: 'GET',
            url: '/prev',
            success: function (response) {
                window.location.href = '/prev'
                console.log(response);
            },
            error: function (err) {
                console.log(err);
            }
        })
    });



    $('button.remove-dilemma').on('click', function (e) {
        $target = $(e.target);
        const id = $target.attr('name');

        $.ajax({
            type: 'DELETE',
            url: '/dilemmas/' + id,
            success: function (response) {
                alert('Deleting dilemma');
                window.location.href = '/dilemmas/delete';
            },
            error: function (err) {
                console.log(err);
            }
        })

    });
});

function removeOnclicks() {
    const buttons = document.getElementsByClassName("button");
    for (i = 0; i < buttons.length; i++) {
        console.log(buttons[i] + "");
        buttons[i].onclick = null;
    }
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