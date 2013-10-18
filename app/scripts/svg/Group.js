/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

define([

    'svg/NS'

], function (

    NS

) {

    'use strict';

    function Group() {
        var g = document.createElementNS(NS.SVG, 'g');
        return g;
    }

    return Group;

});
