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

    return function setupPointerEvents($target, $delegateTarget) {
        var previousX,
            currentX,
            currentDeg = 0,
            hasMoved = false;


        function onPointerDown(event) {
            if ($(event.target).is('a')) { return; }
            event.preventDefault();

            previousX = currentX = event.pageX || event.originalEvent.pageX;

            $target.css({ transition: 'none' });

            $delegateTarget
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

            $target.css({
                transform: 'rotateY(' + currentDeg + 'deg)'
            });

            hasMoved = true;
        }

        function onPointerUp(event) {
            if ($(event.target).is('a')) { return; }
            event.preventDefault();

            var d = currentDeg / Math.abs(currentDeg);
            currentDeg = (Math.abs(currentDeg) > 90) ? d * 180 : 0;

            $target.css({
                transform: 'rotateY(' + currentDeg + 'deg)',
                transition: ''
            });

            $delegateTarget
                .off('touchmove', onPointerMove)
                .off('mousemove', onPointerMove);

            if ( ! hasMoved) { $(event.target).trigger('click'); }
            hasMoved = false;
        }

        $delegateTarget
            .on('touchstart', onPointerDown)
            .on('mousedown', onPointerDown)
            .on('touchend', onPointerUp)
            .on('mouseup', onPointerUp);
    };

});