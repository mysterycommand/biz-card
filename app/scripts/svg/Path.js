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

    function Path(stroke, strokeOpacity, strokeWidth, attrs) {
        /* jshint expr: true */
        stroke || (stroke = 'black');
        strokeOpacity || (strokeOpacity = 0.8);
        strokeWidth || (strokeWidth = 1);

        var path = document.createElementNS(NS.SVG, 'path');

        path.setAttributeNS(null, 'fill', 'none');
        path.setAttributeNS(null, 'stroke', stroke);
        path.setAttributeNS(null, 'stroke-opacity', strokeOpacity);
        path.setAttributeNS(null, 'stroke-width', strokeWidth);

        Object.keys(attrs || {}).forEach(function(key) {
            path.setAttributeNS(null, key, attrs[key]);
        });

        return path;
    }

    return Path;

});
