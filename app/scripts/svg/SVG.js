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

    function SVG(w, h) {
        var svg = document.createElementNS(NS.SVG, 'svg');
        svg.setAttributeNS(NS.XMLNS, 'xmlns', NS.SVG);
        svg.setAttributeNS(null, 'version', 1.1);
        svg.setAttributeNS(null, 'viewBox', [
            0, 0, w, h
        ].join(' '));
        svg.setAttributeNS(null, 'width', w + 'mm');
        svg.setAttributeNS(null, 'height', h + 'mm');
        return svg;
    }

    return SVG;

});
