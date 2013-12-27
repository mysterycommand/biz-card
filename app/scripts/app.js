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
        var $card = $('#js-card'),
            $window = $(window),
            w = $card.width(),
            h = $card.height(),
            card = new Card(w, h);

        $('#js-front').append(card.svg);
        setupPointerEvents($card, $window);

        var frame = null,
            start = null,
            delta = 0;

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

        $window.on('keyup', toggleTimer);
        $card.on('tap', function() {
            card.draw();
            stopTimer();
        });
    };

});

/* ================================================================================================================== */
