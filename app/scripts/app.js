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
            w = $card.width(),
            h = $card.height(),
            card = new Card(w, h);

        $('#js-front').append(card.svg);
        setupPointerEvents($card, $(window));
        $card.on('click', card.draw);
    };

});

/* ================================================================================================================== */
