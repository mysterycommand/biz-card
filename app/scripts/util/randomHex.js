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

], function (

) {

    'use strict';
    return function randomHex() {
        var hex = (Math.random() * (0xFFFFFF + 1) << 0).toString(16);
        return '#' + new Array(7 - hex.length).join('0') + hex;
    };

});