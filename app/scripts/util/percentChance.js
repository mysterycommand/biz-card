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
    return function percentChance(percent) {
        percent = Math.min(Math.max(0, percent), 100);
        return percent > Math.random() * 100;
    };

});