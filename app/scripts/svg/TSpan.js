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

    function TSpan(x, y, data, dx, dy, fill, fillOpacity) {
        /* jshint expr: true */
        dx || (dx = 0);
        dx || (dx = 0);

        fill || (fill = '#ffffff');
        fillOpacity || (fillOpacity = '1');

        var tspan = document.createElementNS(NS.SVG, 'tspan');
        tspan.setAttributeNS(null, 'x', x);
        tspan.setAttributeNS(null, 'y', y);
        if (dx) { tspan.setAttributeNS(null, 'dx', dx); }
        if (dy) { tspan.setAttributeNS(null, 'dy', dy); }
        tspan.setAttributeNS(null, 'fill', fill);
        tspan.setAttributeNS(null, 'fill-opacity', fillOpacity);
        tspan.appendChild(document.createTextNode(data));
        return tspan;
    }

    return TSpan;

});
