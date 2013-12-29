/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint expr: true */

define([

], function (

) {

    'use strict';

    var Element = Object.create(null, {
        SVG_NS: { value: 'http://www.w3.org/2000/svg' },
        XLINK_NS: { value: 'http://www.w3.org/1999/xlink' },
        XMLNS_NS: { value: 'http://www.w3.org/2000/xmlns/' },

        svg: {
            enumerable: true,
            value: function(w, h, unit, attrs) {
                unit || (unit = '');
                attrs || (attrs = {});

                attrs.version || (attrs.version = 1.1);
                attrs.viewBox || (attrs.viewBox = [0, 0, w, h].join(' '));
                attrs.preserveAspectRatio || (attrs.preserveAspectRatio = 'xMidYMid meet');
                attrs.width || (attrs.width = w + unit);
                attrs.height || (attrs.height = h + unit);

                var svg = this._node('svg', attrs);
                svg.setAttributeNS(this.XMLNS_NS, 'xmlns', this.SVG_NS);

                return svg;
            }
        },

        g: {
            enumerable: true,
            value: function(attrs) {
                attrs || (attrs = {});
                return this._node('g', attrs);
            }
        },

        rect: {
            enumerable: true,
            value: function(x, y, w, h, attrs) {
                attrs || (attrs = {});
                attrs.x || (attrs.x = x);
                attrs.y || (attrs.y = y);
                attrs.width || (attrs.width = w);
                attrs.height || (attrs.height = h);
                this._defaults(attrs);

                return this._node('rect', attrs);
            }
        },

        circle: {
            enumerable: true,
            value: function(cx, cy, r, attrs) {
                attrs || (attrs = {});
                attrs.cx || (attrs.cx = cx);
                attrs.cy || (attrs.cy = cy);
                attrs.r || (attrs.r = r);
                this._defaults(attrs);

                return this._node('circle', attrs);
            }
        },

        line: {
            enumerable: true,
            value: function(x1, y1, x2, y2, attrs) {
                attrs || (attrs = {});
                attrs.x1 || (attrs.x1 = x1);
                attrs.y1 || (attrs.y1 = y1);
                attrs.x2 || (attrs.x2 = x2);
                attrs.y2 || (attrs.y2 = y2);
                this._defaults(attrs);

                return this._node('line', attrs);
            }
        },

        path: {
            enumerable: true,
            value: function(d, attrs) {
                attrs || (attrs = {});
                attrs.d || (attrs.d = d);
                this._defaults(attrs);

                return this._node('path', attrs);
            }
        },

        clipPath: {
            enumerable: true,
            value: function(attrs) {
                attrs || (attrs = {});
                return this._node('clipPath', attrs);
            }
        },

        _node: {
            value: function(name, attrs) {
                attrs || (attrs = {});

                var el = document.createElementNS(this.SVG_NS, name);

                Object.keys(attrs).forEach(function(key) {
                    el.setAttributeNS(null, key, attrs[key]);
                });

                return el;
            }
        },

        _defaults: {
            value: function(attrs) {
                attrs.fill || (attrs.fill = 'none');
                attrs.stroke || (attrs.stroke = '#000000');
                attrs['stroke-width'] || (attrs['stroke-width'] = 1);
                attrs['shape-rendering'] || (attrs['shape-rendering'] = 'geometricPrecision');
            }
        }
    });

    return Element;

});