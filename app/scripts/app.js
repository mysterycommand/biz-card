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

    'jquery'

], function (

    $

) {

    'use strict';

    return function() {
        var $card = $('#js-card'),
            previousX,
            currentX,
            currentDeg = 0;

        function onKeyUp(event) {
            event.preventDefault();

            switch (event.which) {
            case 32: // SPACE
                // colors();
                break;
            case 38: // UP
                // r += 1;
                break;
            case 40: // DOWN
                // r -= 1;
                break;
            default:
                return;
            }
        }

        function onPointerDown(event) {
            if ($(event.target).is('a')) { return; }
            event.preventDefault();

            previousX = currentX = event.pageX || event.originalEvent.pageX;

            $card.css({ transition: 'none' });

            $(window)
                .on('touchmove', onPointerMove)
                .on('mousemove', onPointerMove);
        }

        function onPointerMove(event) {
            event.preventDefault();

            previousX = currentX;
            currentX = event.pageX || event.originalEvent.pageX;
            currentDeg += (currentX - previousX);

            while (currentDeg > 180) { currentDeg -= 360; }
            while (currentDeg < -180) { currentDeg += 360; }

            $card.css({
                transform: 'rotateY(' + currentDeg + 'deg)'
            });
        }

        function onPointerUp(event) {
            if ($(event.target).is('a')) { return; }
            event.preventDefault();

            var d = currentDeg / Math.abs(currentDeg);
            currentDeg = (Math.abs(currentDeg) > 90) ? d * 180 : 0;

            $card.css({
                transform: 'rotateY(' + currentDeg + 'deg)',
                transition: ''
            });

            $(window)
                .off('touchmove', onPointerMove)
                .off('mousemove', onPointerMove);
        }

        $(window)
            .on('keyup', onKeyUp)
            .on('touchstart', onPointerDown)
            .on('mousedown', onPointerDown)
            .on('touchend', onPointerUp)
            .on('mouseup', onPointerUp);
    };

});

/* ================================================================================================================== */
