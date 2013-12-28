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

    function Rect(x, y, w, h, stroke, strokeWidth, fill, fillOpacity, attrs) {
        /* jshint expr: true */
        stroke || (stroke = 'black');
        strokeWidth || (strokeWidth = 0);

        fill || (fill = 'none');
        fillOpacity || (fillOpacity = 0);

        var rect = document.createElementNS(NS.SVG, 'rect');

        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'width', w);
        rect.setAttributeNS(null, 'height', h);
        rect.setAttributeNS(null, 'fill', fill);
        rect.setAttributeNS(null, 'fill-opacity', fillOpacity);
        rect.setAttributeNS(null, 'stroke', stroke);
        rect.setAttributeNS(null, 'stroke-width', strokeWidth);

        Object.keys(attrs || {}).forEach(function(key) {
            rect.setAttributeNS(null, key, attrs[key]);
        });

        return rect;
    }

    return Rect;

});
