/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint expr: true, bitwise: false */

define([

    'jquery'
    // 'lodash'

], function (

    $
    // _

) {

    'use strict';

    var SVG_NS = 'http://www.w3.org/2000/svg',
        // XLINK_NS = 'http://www.w3.org/1999/xlink',
        XMLNS_NS = 'http://www.w3.org/2000/xmlns/',
        PHI = (1 + Math.sqrt(5)) / 2,
        G = (2 * Math.PI) / (PHI * PHI),
        qr = 15,
        hr = qr * (13 / 8),
        r = hr * (13 / 8),
        d = r * (21 / 8);

    function toDegrees(radians) { return radians * (180 / Math.PI); }
    function toRadians(degrees) { return degrees * (Math.PI / 180); }

    function randomHex() {
        var hex = (Math.random() * (0xFFFFFF + 1) << 0).toString(16);
        return '#' + new Array(7 - hex.length).join('0') + hex;
    }

    function SVG(w, h) {
        var svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttributeNS(XMLNS_NS, 'xmlns', SVG_NS);
        svg.setAttributeNS(null, 'version', 1.1);
        svg.setAttributeNS(null, 'width', w);
        svg.setAttributeNS(null, 'height', h);
        return svg;
    }

    function Circle(cx, cy, r, color) {
        color = color || 'black';

        var circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'cx', cx);
        circle.setAttributeNS(null, 'cy', cy);
        circle.setAttributeNS(null, 'r', r);
        circle.setAttributeNS(null, 'fill', 'none');
        circle.setAttributeNS(null, 'stroke', color);
        circle.setAttributeNS(null, 'stroke-width', ((color === 'black') ? ~~(qr * 2) : 1));
        // circle.setAttributeNS(null, 'fill', randomHex());
        // circle.setAttributeNS(null, 'fill-opacity', '0.5');
        return circle;
    }

    function Line(x1, y1, x2, y2, color) {
        color = color || 'black';

        var line = document.createElementNS(SVG_NS, 'line');
        line.setAttributeNS(null, 'x1', x1);
        line.setAttributeNS(null, 'y1', y1);
        line.setAttributeNS(null, 'x2', x2);
        line.setAttributeNS(null, 'y2', y2);
        line.setAttributeNS(null, 'fill', 'none');
        line.setAttributeNS(null, 'stroke', color);
        line.setAttributeNS(null, 'stroke-width', ((color === 'black') ? ~~(qr * 2) : 1));
        // line.setAttributeNS(null, 'stroke', randomHex());
        // line.setAttributeNS(null, 'stroke-opacity', '0.5');
        return line;
    }

    function Path(stroke, strokeOpacity, strokeWidth) {
        /* jshint expr: true */
        stroke || (stroke = 'black');
        strokeOpacity || (strokeOpacity = 0.8);
        strokeWidth || (strokeWidth = ~~(qr * 2));

        var path = document.createElementNS(SVG_NS, 'path');
        path.setAttributeNS(null, 'fill', 'none');
        path.setAttributeNS(null, 'stroke', stroke);
        path.setAttributeNS(null, 'stroke-opacity', strokeOpacity);
        path.setAttributeNS(null, 'stroke-width', strokeWidth);
        return path;
    }

    // Object.defineProperties(Path.prototype, {
    //     d: {
    //         get: function() {
    //             console.log('get', this);
    //             return this.getAttributeNS(null, 'd') || '';
    //         },
    //         set: function(value) {
    //             console.log('set', this);
    //             this.setAttributeNS(null, 'd', value || '');
    //         },
    //         configurable: false,
    //         enumerable: true
    //     }
    // });

    function Rect(x, y, w, h, color) {
        color = color || 'black';

        var rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'width', w);
        rect.setAttributeNS(null, 'height', h);
        rect.setAttributeNS(null, 'fill', 'none');
        rect.setAttributeNS(null, 'stroke', color);
        rect.setAttributeNS(null, 'stroke-width', ((color === 'black') ? ~~(qr * 2) : 1));
        // rect.setAttributeNS(null, 'fill', randomHex());
        // rect.setAttributeNS(null, 'fill-opacity', '0.5');
        return rect;
    }

    return function() {
        // var $main = $('#js-main');
        // $main.append('<svg/>');

        var $main = $('#js-main'),
            w = $main.width(),
            h = $main.height(),
            main = $main[0],
            svg = new SVG(w, h);

        main.innerHTML = '';
        // Alternatively ...
        // while (main.firstChild) { main.removeChild(main.firstChild); }
        main.appendChild(svg);

        var hw = w / 2,
            hh = h / 2,

            c = Math.PI * (r * r),
            s = Math.sqrt(c),
            hs = s / 2,
            p = r / hs,

            aSq = hs * hs,
            cSq = (d + hs) * (d + hs),
            bSq = cSq - aSq,
            b = Math.sqrt(bSq),
            db = (d+r)-b+r,

            col = '#bbb',

            cx = hw - hs,
            cy = hh - hs - d - r - r,
            px = cx + Math.sin(hs / b - G) * d,
            py = cy + Math.cos(hs / b - G) * d,
            qx = cx + Math.sin(hs / b) * d,
            qy = cy + Math.cos(hs / b) * d,

            elements = [
                new Circle(hw+r+hs, hh-r-hs, r),
                // new Circle(hw+r+hs, hh-r-hs, (hr)*p),

                new Circle(hw+r+hs, hh+r+hs, r),
                // new Circle(hw+r+hs, hh+r+hs, (hr)*p),

                new Circle(hw, hh-hs-db, hs),
                new Circle(hw, hh-hs-db, r),

                new Circle(cx, hh-hs-b-db, d),

                new Circle(cx, hh+hs, qr),

                new Line(cx, hh-hs, hw+hs+r, hh-hs),
                new Line(hw+hs, hh+hs, hw+hs+r, hh+hs),

                new Line(cx, hh-hs-db, cx, hh-hs),
                new Line(hw+hs, hh-hs-r, hw+hs, hh+hs+r),

                // new Rect(hw-r, hh-r, d, d, col),
                new Rect(cx, hh-hs, s, s, col),
                new Rect(hw-d-hs, hh-d-hs, s+d+d, s+d+d, col),

                new Circle(hw, hh, r, col),
                new Circle(hw, hh, hs, col),

                new Circle(hw, hh-hs-db, r, col),
                new Circle(cx, hh-hs, d, col),

                new Line(cx, cy, hw, hh-hs-db, col),
                new Line(cx, cy, cx, hh-hs-db, col),
                new Line(cx, hh-hs-db, hw, hh-hs-db, col),

                new Line(cx, cy, px, py, 'red'),

                // new Line(cx, hh-hs-b, hw, hh-hs, col),
                // new Line(cx, hh-hs-b, cx, hh-hs, col),

                new Circle(hw+r+hs, hh-r-hs, hr, col),
                new Circle(hw+r+hs, hh+r+hs, hr, col),

                new Circle(hw, hh-hs-db, hs, 'red'),

                new Circle(cx, hh-hs-b-db, d, col),
                new Circle(cx, hh-hs-b-db, r * 1.5, col),
                new Circle(cx, hh-hs-b-db, r, col),
                new Circle(cx, hh-hs-b-db, hr, col),
                new Circle(cx, hh-hs-b-db, hr, col),

                new Circle(hw-hs+d, hh-hs, d, 'green')
            ].forEach(function(element) {
                svg.appendChild(element);
            }),
            path1,
            path2;

        col = randomHex();

        // path1 = new Path(col);
        // path1.setAttributeNS(null, 'd', [
        //     'M', px, py,
        //     'A', d, d, 0, 1, 1, qx, qy,
        //     'A', hs, hs, 0, 0, 0, cx, hh-hs-db,
        //     'L', cx, hh-hs,
        //     'L', hw+hs+r, hh-hs,
        //     'A', r, r, 0, 1, 0, hw+hs, hh-hs-r,
        //     'L', hw+hs, hh+hs+r,
        //     'A', r, r, 0, 1, 0, hw+hs+r, hh+hs,
        //     'L', hw+hs, hh+hs
        // ].join(' '));
        // svg.appendChild(path1);

        // path2 = new Path(col);
        // path2.setAttributeNS(null, 'd', [
        //     'M', hw-hs+qr, hh+hs-qr,
        //     'L', hw-hs, hh+hs-qr,
        //     'A', qr, qr, 0, 1, 0, hw-hs+qr, hh+hs,
        //     'Z'
        // ].join(' '));
        // svg.appendChild(path2);

    };

});

/* ================================================================================================================== */
