/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint bitwise: false */

define([

    'svg/NS'

], function (

    NS

) {

    'use strict';

    function Circle(cx, cy, r, color, strokeWidth) {
        /* jshint expr: true */
        color || (color = 'black');
        strokeWidth || (strokeWidth = 1);

        var circle = document.createElementNS(NS.SVG, 'circle');
        circle.setAttributeNS(null, 'cx', cx);
        circle.setAttributeNS(null, 'cy', cy);
        circle.setAttributeNS(null, 'r', r);
        circle.setAttributeNS(null, 'fill', 'none');
        circle.setAttributeNS(null, 'stroke', color);
        circle.setAttributeNS(null, 'stroke-width', strokeWidth);
        // circle.setAttributeNS(null, 'fill', randomHex());
        // circle.setAttributeNS(null, 'fill-opacity', '0.5');
        return circle;
    }
    Circle.area = function(radius) { return Math.PI * (radius * radius); };

    return Circle;

});
