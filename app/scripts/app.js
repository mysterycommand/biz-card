/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint expr: true, bitwise: false */

define([

    'jquery',
    'setupPointerEvents',
    'Card'

], function (

    $,
    setupPointerEvents,
    Card

) {

    'use strict';

    return function() {
        var $card = $('.card'),
            $window = $(window),
            w = 59, // $card.width(),
            h = 88, // $card.height(),
            card = null;

        $card.each(function(index, element) {
            var card = new Card(w, h);
            $(element)
                .data('card', card)
                .find('.front').append(card.svg);
        });

        function updateCard(timestamp) {
            frame = window.requestAnimationFrame(updateCard);

            start || (start = timestamp);
            delta = timestamp - start;

            if (delta > 1500) {
                start = null;
                card.draw();
            }
        }

        function startTimer() {
            frame = window.requestAnimationFrame(updateCard);
            card.draw();
        }

        function stopTimer() {
            if (frame === null) { return; }
            window.cancelAnimationFrame(frame);
            frame = null;
        }

        function toggleTimer(event) {
            if (event.which !== 32) { return; }
            if (frame === null) { startTimer(); }
            else { stopTimer(); }
        }

        if ($card.length === 1) {
            var frame = null,
                start = null,
                delta = 0;

            card || (card = $(this).data('card'));
            setupPointerEvents($card, $window);
            $window.on('keyup', toggleTimer);
        }

        $card.on('click tap', function() {
            card || (card = $(this).data('card'));
            card.draw();
            stopTimer();
        });
    };

});

/* ================================================================================================================== */
