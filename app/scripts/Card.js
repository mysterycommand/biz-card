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

    'svg/NS',
    'svg/SVG',
    'svg/Group',

    'svg/Circle',
    'svg/Line',
    'svg/Path',
    'svg/Rect',

    'util/coinToss',
    'util/randomHex'

], function (

    NS,
    SVG,
    Group,

    Circle,
    Line,
    Path,
    Rect,

    coinToss,
    randomHex

) {

    'use strict';

    var PHI = (1 + Math.sqrt(5)) / 2,
        G = (2 * Math.PI) / (PHI * PHI);

    var Card = function Card(w, h) {
        this.w = w;
        this.h = h;

        // this.defs = document.createElementNS(NS.SVG, 'defs');
        this.svg = new SVG(this.w, this.h);
        this.front = new Group(0, 0);

        this.draw();
    };

    // Card.prototype.createClipPath = function() {
    //     this.clipPath = document.createElementNS(NS.SVG, 'clipPath');
    //     this.clipPath.setAttributeNS(null, 'id', 'frame');
    //     this.clipPath.appendChild(this.clip);
    // };

    Card.prototype.draw = function() {
        this.colors();
        this.recalc();

        this.empty();
        this.drawFront();
        this.drawPath();
        this.center();
    };

    Card.prototype.colors = function() {
        this.hex0 = randomHex();
        this.hex1 = randomHex();
        this.hex2 = randomHex();
        this.hex3 = randomHex();
        this.hex4 = randomHex();
        this.hex5 = randomHex();
        this.hex6 = randomHex();
        this.hex7 = randomHex();
        this.hex8 = coinToss() ? this.hex0 : randomHex();
    };

    Card.prototype.recalc = function() {
        this.r = 8.75;

        this.r0 = this.r * (8 / 13);
        this.r1 = this.r * (13 / 8);
        this.r2 = this.r1 * (13 / 8);
        this.r3 = this.r2 * (21 / 8);

        this.d0 = this.r0 * 2;
        // this.d1 = this.r1 * 2;
        this.d2 = this.r2 * 2;
        this.d3 = this.r3 * 2;

        this.hw = this.w / 2;
        this.hh = this.h / 2;

        this.a2 = Circle.area(this.r2);
        this.s2 = Math.sqrt(this.a2);
        this.hs = this.s2 / 2;

        this.aSq = this.r3 * this.r3;
        this.cSq = this.d3 * this.d3;
        this.bSq = this.cSq - this.aSq;
        this.b = Math.sqrt(this.bSq);

        this.cx1 = this.hw - this.hs;
        this.cy1 = this.hh - this.hs - this.b;

        this.cx2 = this.hw - this.hs + this.r3;
        this.cy2 = this.hh - this.hs;

        this.inc = Math.atan2(this.r3, this.b);

        this.px1 = this.cx1 + Math.sin(this.inc - G) * this.r3;
        this.py1 = this.cy1 + Math.cos(this.inc - G) * this.r3;
        this.px2 = this.cx1 + Math.sin(this.inc) * this.r3;
        this.py2 = this.cy1 + Math.cos(this.inc) * this.r3;

        this.rx = ~~(this.px1);
        this.ry = ~~(this.cy1 - this.r3);
        this.rw = ~~((this.hw + this.hs + this.d2) - this.px1);
        this.rh = ~~(this.r3 + this.b + this.s2 + this.d2);

        this.bw = this.w; // this.rw * 1.3;
        this.bh = 84 * (this.bw / 55);
        this.bx = this.rx - (this.bw - this.rw) / 2;
        this.by = this.ry - (this.bh - this.rh) / 2;
    };

    Card.prototype.empty = function() {
        while (this.front.firstChild) {
            this.front.removeChild(this.front.firstChild);
        }
    };

    Card.prototype.drawFront = function() {
        var elements = {
            // white: new Rect(bx, by, this.bw, this.bh, 'none', '0', '#ffffff'),
            background: new Rect(this.bx, this.by, this.bw, this.bh, 'none', 0, this.hex8, Math.random() * 0.5),

            centerCircle: new Circle(this.hw, this.hh, this.r2, this.hex1),
            centerCircleSquared: new Rect(this.hw - this.hs, this.hh - this.hs, this.s2, this.s2, this.hex2),

            squaredCircle: new Circle(this.hw, this.hh, this.hs, this.hex3),

            topRightSquare: new Rect(this.hw + this.hs, this.hh - this.hs - this.d2, this.d2, this.d2, this.hex2),
            topRightCircle: new Circle(this.hw + this.hs + this.r2, this.hh - this.hs - this.r2, this.r2, this.hex3),

            bottomRightSquare: new Rect(this.hw + this.hs, this.hh + this.hs, this.d2, this.d2, this.hex2),
            bottomRightCircle: new Circle(this.hw + this.hs + this.r2, this.hh + this.hs + this.r2, this.r2, this.hex3),
            bottomLeftCircle: new Circle(this.hw - this.hs, this.hh + this.hs, this.r0, this.hex2),

            topLeftBigCircle: new Circle(this.cx1, this.cy1, this.r3, this.hex4),
            topLeftBigCircleSpine: new Circle(this.cx2, this.cy2, this.r3, this.hex4),

            hypotenuse: new Line(this.cx1, this.cy1, this.cx2, this.cy2, this.hex5),
            adjacent: new Line(this.cx2, this.cy2, this.hw - this.hs, this.hh - this.hs, this.hex5),
            opposite: new Line(this.hw - this.hs, this.hh - this.hs, this.cx1, this.cy1, this.hex5),

            golden: new Line(this.px1, this.py1, this.cx1, this.cy1, this.hex6),
            incedence: new Line(this.cx1, this.cy1, this.px2, this.py2, this.hex6),

            boundingBox: new Rect(this.rx, this.ry, this.rw, this.rh, this.hex7)

            // lineTL: new Line(this.hw, this.hh, this.bx, this.by, '#000'),
            // lineTR: new Line(this.hw, this.hh, this.bx + this.bw, this.by, '#000'),
            // lineBL: new Line(this.hw, this.hh, this.bx, this.by + this.bh, '#000'),
            // lineBR: new Line(this.hw, this.hh, this.bx + this.bw, this.by + this.bh, '#000'),

            // lineTLBR: new Line(this.bx, this.by, this.bx + this.bw, this.by + this.bh, '#000'),
            // lineTRBL: new Line(this.bx + this.bw, this.by, this.bx, this.by + this.bh, '#000'),

            // frame: new Rect(this.bx, this.by, this.bw, this.bh, '#222222')
        };

        // elements.topLeftBigCircleSpine.setAttributeNS(null, 'clip-path', 'url(#frame)');

        Object.keys(elements).forEach(function(key) {
            this.front.appendChild(elements[key]);
        }.bind(this));
    };

    Card.prototype.drawPath = function() {
        var path1 = new Path(this.hex0, 0.25 + Math.random() * 0.75, 18),
            path2 = new Path(this.hex8, 0.25 + Math.random() * 0.75, 18);

        path1.setAttributeNS(null, 'd', [
            'M', this.px1, this.py1,
            'A', this.r3, this.r3, 0, 1, 1, this.px2, this.py2,
            'A', this.r3, this.r3, 0, 0, 0, this.cx1, this.cy2,
            'L', this.cx1 + this.s2 + this.r2, this.cy2,
            'A', this.r2, this.r2, 0, 1, 0, this.cx1 + this.s2, this.cy2 - this.r2,
            'L', this.hw + this.hs, this.hh + this.hs + this.r2,
            'A', this.r2, this.r2, 0, 1, 0, this.hw + this.hs + this.r2, this.hh + this.hs,
            'L', this.hw + this.hs, this.hh + this.hs
        ].join(' '));
        this.front.appendChild(path1);

        path2.setAttributeNS(null, 'd', [
            'M', this.hw - this.hs + this.r0, this.hh + this.hs - this.r0,
            'L', this.hw - this.hs, this.hh + this.hs - this.r0,
            'A', this.r0, this.r0, 0, 1, 0, this.hw - this.hs + this.r0, this.hh + this.hs,
            'Z'
        ].join(' '));
        this.front.appendChild(path2);
    };

    Card.prototype.center = function() {
        this.front.setAttributeNS(null, 'transform', [
            'translate(', ((this.w - this.bw) / 2) - this.bx, ((this.h - this.bh) / 2) - this.by, ')'
        ].join(' '));
        this.svg.appendChild(this.front);
    };

    return Card;

});