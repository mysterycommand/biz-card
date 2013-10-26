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

    'jquery',

    'svg/NS',
    'svg/SVG',
    'svg/Group',

    'svg/Circle',
    'svg/Line',
    'svg/Path',
    'svg/Rect',
    'svg/Text',
    'svg/TSpan'

], function (

    $,

    NS,
    SVG,
    Group,

    Circle,
    Line,
    Path,
    Rect,
    Text,
    TSpan

) {

    'use strict';

    var PHI = (1 + Math.sqrt(5)) / 2,
        G = (2 * Math.PI) / (PHI * PHI),

        $main,
        main,
        svg,
        front,

        defs = document.createElementNS(NS.SVG, 'defs'),
        clipPath = document.createElementNS(NS.SVG, 'clipPath'),
        clip,

        r = 10,
        r0,
        r1,
        r2,
        r3,

        d0,
        // d1,
        d2,
        d3,

        hex0,
        hex1,
        hex2,
        hex3,
        hex4,
        hex5,
        hex6,
        hex7,
        hex8,

        w,
        h,

        hw,
        hh,

        a2,
        s2,
        hs,

        aSq,
        cSq,
        bSq,
        b,

        cx1,
        cy1,

        cx2,
        cy2,

        inc,

        px1,
        py1,

        px2,
        py2,

        rx,
        ry,
        rw,
        rh,

        bw,
        bh,
        bx,
        by;

    // function toDegrees(radians) { return radians * (180 / Math.PI); }
    // function toRadians(degrees) { return degrees * (Math.PI / 180); }
    function coinToss() { return !! Math.round(Math.random()); }
    function randomHex() {
        var hex = (Math.random() * (0xFFFFFF + 1) << 0).toString(16);
        return '#' + new Array(7 - hex.length).join('0') + hex;
    }

    function onResize(/* event */) {
        recalc();

        svg.setAttributeNS(null, 'width', w);
        svg.setAttributeNS(null, 'height', h);
        svg.setAttributeNS(null, 'viewBox', [0, 0, w, h].join(' '));

        center();
    }

    function onKeyUp(event) {
        switch (event.which) {
        case 32:
            colors();
            break;
        case 38:
            r += 1;
            break;
        case 40:
            r -= 1;
            break;
        default:
            return;
        }

        recalc();

        gaussian.setAttributeNS(null, 'stdDeviation', r);

        clip.setAttributeNS(null, 'x', bx);
        clip.setAttributeNS(null, 'y', by);
        clip.setAttributeNS(null, 'width', bw);
        clip.setAttributeNS(null, 'height', bh);

        flood.setAttributeNS(null, 'x', bx);
        flood.setAttributeNS(null, 'y', by);
        flood.setAttributeNS(null, 'width', bw);
        flood.setAttributeNS(null, 'height', bh);

        draw();
    }

    function onUp(/* event */) {
        colors();
        draw();
    }

    function colors() {
        hex0 = randomHex();
        hex1 = randomHex();
        hex2 = randomHex();
        hex3 = randomHex();
        hex4 = randomHex();
        hex5 = randomHex();
        hex6 = randomHex();
        hex7 = randomHex();
        hex8 = coinToss() ? hex0 : randomHex();
    }

    function draw() {
        empty();
        drawFront();
        drawPath();
        center();
    }

    function recalc() {
        r0 = r * (8 / 13);
        r1 = r * (13 / 8);
        r2 = r1 * (13 / 8);
        r3 = r2 * (21 / 8);

        d0 = r0 * 2;
        // d1 = r1 * 2;
        d2 = r2 * 2;
        d3 = r3 * 2;

        w = $main.width();
        h = $main.height();

        hw = 0; // w / 2;
        hh = 0; // h / 2;

        a2 = Circle.area(r2);
        s2 = Math.sqrt(a2);
        hs = s2 / 2;

        aSq = r3 * r3;
        cSq = d3 * d3;
        bSq = cSq - aSq;
        b = Math.sqrt(bSq);

        cx1 = hw - hs;
        cy1 = hh - hs - b;

        cx2 = hw - hs + r3;
        cy2 = hh - hs;

        inc = Math.atan2(r3, b);

        px1 = cx1 + Math.sin(inc - G) * r3;
        py1 = cy1 + Math.cos(inc - G) * r3;

        px2 = cx1 + Math.sin(inc) * r3;
        py2 = cy1 + Math.cos(inc) * r3;

        rx = ~~(px1);
        ry = ~~(cy1 - r3);
        rw = ~~((hw + hs + d2) - px1);
        rh = ~~(r3 + b + s2 + d2);

        bw = rw * 1.3;
        bh = 16 * (bw / 9);
        bx = rx - (bw - rw) / 2;
        by = ry - (bh - rh) / 2;
    }

    function empty() {
        while (front.firstChild) {
            front.removeChild(front.firstChild);
        }
    }

    function drawFront() {
        var elements = {
            // white: new Rect(bx, by, bw, bh, 'none', '0', '#ffffff'),
            background: new Rect(bx, by, bw, bh, 'none', 0, '#ffffff', 0.2),

            centerCircle: new Circle(hw, hh, r2, hex1),
            centerCircleSquared: new Rect(hw - hs, hh - hs, s2, s2, hex2),

            squaredCircle: new Circle(hw, hh, hs, hex3),

            topRightSquare: new Rect(hw + hs, hh - hs - d2, d2, d2, hex2),
            topRightCircle: new Circle(hw + hs + r2, hh - hs - r2, r2, hex3),

            bottomRightSquare: new Rect(hw + hs, hh + hs, d2, d2, hex2),
            bottomRightCircle: new Circle(hw + hs + r2, hh + hs + r2, r2, hex3),
            bottomLeftCircle: new Circle(hw - hs, hh + hs, r0, hex2),

            topLeftBigCircle: new Circle(cx1, cy1, r3, hex4),
            topLeftBigCircleSpine: new Circle(cx2, cy2, r3, hex4),

            hypotenuse: new Line(cx1, cy1, cx2, cy2, hex5),
            adjacent: new Line(cx2, cy2, hw - hs, hh - hs, hex5),
            opposite: new Line(hw - hs, hh - hs, cx1, cy1, hex5),

            golden: new Line(px1, py1, cx1, cy1, hex6),
            incedence: new Line(cx1, cy1, px2, py2, hex6),

            boundingBox: new Rect(rx, ry, rw, rh, hex7)

            // lineTL: new Line(hw, hh, bx, by, '#000'),
            // lineTR: new Line(hw, hh, bx + bw, by, '#000'),
            // lineBL: new Line(hw, hh, bx, by + bh, '#000'),
            // lineBR: new Line(hw, hh, bx + bw, by + bh, '#000'),

            // lineTLBR: new Line(bx, by, bx + bw, by + bh, '#000'),
            // lineTRBL: new Line(bx + bw, by, bx, by + bh, '#000'),

            // frame: new Rect(bx, by, bw, bh, '#222222')
        };

        elements.topLeftBigCircleSpine.setAttributeNS(null, 'clip-path', 'url(#frame)');

        Object.keys(elements).forEach(function(key) {
            front.appendChild(elements[key]);
        });
    }

    function drawPath() {
        var path1 = new Path(hex0, 0.8, d0),
            path2 = new Path(hex8, 0.8, d0);

        path1.setAttributeNS(null, 'd', [
            'M', px1, py1,
            'A', r3, r3, 0, 1, 1, px2, py2,
            'A', r3, r3, 0, 0, 0, cx1, cy2,
            'L', cx1 + s2 + r2, cy2,
            'A', r2, r2, 0, 1, 0, cx1 + s2, cy2 - r2,
            'L', hw + hs, hh + hs + r2,
            'A', r2, r2, 0, 1, 0, hw + hs + r2, hh + hs,
            'L', hw + hs, hh + hs
        ].join(' '));
        front.appendChild(path1);

        path2.setAttributeNS(null, 'd', [
            'M', hw - hs + r0, hh + hs - r0,
            'L', hw - hs, hh + hs - r0,
            'A', r0, r0, 0, 1, 0, hw - hs + r0, hh + hs,
            'Z'
        ].join(' '));
        front.appendChild(path2);
    }

    function center() {
        front.setAttributeNS(null, 'transform', [
            'translate(', ((w - bw) / 2) - bx, ((h - bh) / 2) - by, ')'
        ].join(' '));
        svg.appendChild(front);
    }

    return function() {
        $main = $('#js-main .front');
        recalc();
        colors();

        main = $main[0];
        svg = new SVG(w, h);
        front = new Group(0, 0);

        clip = new Rect(bx, by, bw, bh);

        $(window)
            .on('resize', onResize)
            .on('keyup', onKeyUp);

        $main
            .on('mouseup', onUp)
            .on('touchend', onUp);

        main.innerHTML = '';
        main.appendChild(svg);

        /**
         *
         */
        clipPath.setAttributeNS(null, 'id', 'frame');
        clipPath.appendChild(clip);
        defs.appendChild(clipPath);
        svg.appendChild(defs);

        draw();
    };

});

/* ================================================================================================================== */
