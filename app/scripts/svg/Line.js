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

    function Line(x1, y1, x2, y2, color, strokeWidth, attrs) {
        /* jshint expr: true */
        color || (color = 'black');
        strokeWidth || (strokeWidth = 1);

        var line = document.createElementNS(NS.SVG, 'line');

        line.setAttributeNS(null, 'x1', x1);
        line.setAttributeNS(null, 'y1', y1);
        line.setAttributeNS(null, 'x2', x2);
        line.setAttributeNS(null, 'y2', y2);
        line.setAttributeNS(null, 'fill', 'none');
        line.setAttributeNS(null, 'stroke', color);
        line.setAttributeNS(null, 'stroke-width', strokeWidth);

        // line.setAttributeNS(null, 'stroke', randomHex());
        // line.setAttributeNS(null, 'stroke-opacity', '0.5');

        Object.keys(attrs || {}).forEach(function(key) {
            line.setAttributeNS(null, key, attrs[key]);
        });

        return line;
    }

    return Line;

});
