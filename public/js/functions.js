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



    $('.button-right').on('click', function () {

        $.ajax({
            type: 'GET',
            url: '/next',
            success: function (response) {
                window.location.href = '/next';
                $("#div1").load("demo_test.txt");
                console.log('next response: ' + response);
                //console.log(response);
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $('.button-left').on('click', function () {
        $.ajax({
            type: 'GET',
            url: '/prev'
        })
    });





    $('button.remove-dilemma').on('click', function (e) {
        if (confirm('Are you sure you want to delete this dilemma?')) {


            $target = $(e.target);
            const id = $target.attr('name');
            console.log('This is the ID to remove: ' + id);
            console.log('This is the url the DELTE request is requested on: ' + '/delete/' + id);
            $.ajax({
                type: 'DELETE',
                url: '/delete/' + id,
                success: function (response) {
                    window.location.href = '/delete';
                },
                error: function (err) {
                    console.log('Error removing dilemma: ' + err);
                }
            })
        }
    });
});





function showResults(document, button, bluepercent, redpercent) {

    $(document).ready(function ($) {

        var $red_word = $('#redbutton').find('.word');
        var $blue_word = $('#bluebutton').find('.word');
        let enige = 'enige';
        let uenige = 'uenige';


        $('.dilemma-button .question').css('display', 'none');
        $('.dilemma-button .result').css('display', 'block');

        animatePercent('blue-percent', 0, bluepercent, 2000);
        animatePercent('red-percent', 0, redpercent, 2000);

        if (button === 'red') {
            $red_word.html('').append(enige);
            $blue_word.html('').append(uenige);
            $('.redCheckDiv').css('display', 'block');
        } else if (button === 'blue') {
            $red_word.html('').append(uenige);
            $blue_word.html('').append(enige);
            $('.blueCheckDiv').css('display', 'block');
        }

        removeOnclicks();
        $('.button-form').removeAttr("method");

    });

}



function removeOnclicks() {
    const buttons = document.getElementsByClassName("dilemma-button");
    for (i = 0; i < buttons.length; i++) {
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
        if (isNaN(value)) {
            value = 0;
        }
        obj.innerHTML = value + '%';
        if (value === end) {
            clearInterval(timer);
        }
    }

    var timer = setInterval(run, stepTime);
    run();


}
