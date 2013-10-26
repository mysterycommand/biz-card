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

    // 'svg/NS',
    // 'svg/SVG',
    // 'svg/Group',

    // 'svg/Circle',
    // 'svg/Line',
    // 'svg/Path',
    // 'svg/Rect',
    // 'svg/Text',
    // 'svg/TSpan'

], function (

    $

    // NS,
    // SVG,
    // Group,

    // Circle,
    // Line,
    // Path,
    // Rect,
    // Text,
    // TSpan

) {

    'use strict';

    return function() {
        var $card = $('#js-card'),
            cardOffset = $card.offset(),
            cardWidth = $card.width(),
            startX,
            startDeg,
            deg;
            // $front = $('#js-front');

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
            event.preventDefault();

            startX = event.pageX || event.originalEvent.pageX;

            if (cardOffset.left > startX ||
                startX > cardOffset.left + cardWidth) { return; }

            $card.css({
                transition: 'none'
            });

            var style = window.getComputedStyle($card[0], null),
                trans = style.getPropertyValue('-webkit-transform') ||
                        style.getPropertyValue('-moz-transform') ||
                        style.getPropertyValue('-ms-transform') ||
                        style.getPropertyValue('-o-transform') ||
                        style.getPropertyValue('transform'),
                ident = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
                value = (trans === 'none') ? ident : trans.split('(')[1].split(')')[0].split(', ');

            startDeg = Math.round(toDegrees(Math.asin(value[8])));
            console.log(value);

            $(window)
                .on('touchmove', onPointerMove)
                .on('mousemove', onPointerMove);
        }

        function onPointerMove(event) {
            event.preventDefault();

            var pageX = event.pageX || event.originalEvent.pageX;

            deg = startDeg + (pageX - startX) / 2;
            while (deg > 180) { deg -= 360; }
            while (deg < -180) { deg += 360; }

            console.log(deg);
            $card.css({
                transform: 'rotateY(' + deg + 'deg)'
            });
        }

        function onPointerUp(event) {
            event.preventDefault();

            $card.css({
                transform: '',
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
