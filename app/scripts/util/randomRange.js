/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

], function (

) {

    'use strict';
    return function randomRange(min, max) {
        return min + (Math.random() * (max - min));
    };

});