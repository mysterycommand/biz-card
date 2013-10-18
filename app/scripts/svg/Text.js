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

    function Text(x, y, data, dx, dy, fill, fillOpacity) {
        /* jshint expr: true */
        dx || (dx = 0);
        dx || (dx = 0);

        fill || (fill = '#ffffff');
        fillOpacity || (fillOpacity = '1');

        var text = document.createElementNS(NS.SVG, 'text');
        text.setAttributeNS(null, 'x', x);
        text.setAttributeNS(null, 'y', y);
        if (dx) { text.setAttributeNS(null, 'dx', dx); }
        if (dy) { text.setAttributeNS(null, 'dy', dy); }
        text.setAttributeNS(null, 'fill', fill);
        text.setAttributeNS(null, 'fill-opacity', fillOpacity);
        text.appendChild(document.createTextNode(data));
        return text;
    }

    return Text;

});
