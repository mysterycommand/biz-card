/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint expr: true, bitwise: false, laxbreak: true */

define([

    'Element',

    'util/coinToss',
    'util/percentChance',
    'util/randomHex',
    'util/randomRange'

], function (

    Element,

    coinToss,
    percentChance,
    randomHex,
    randomRange

) {

    'use strict';

    var PHI = (1 + Math.sqrt(5)) / 2,
        G = (2 * Math.PI) / (PHI * PHI),
        area = function(radius) {
            return Math.PI * (radius * radius);
        },
        counter = 0;

    var Card = function Card(w, h) {
        this.id = ('0' + counter++).substr(-2);
        this.w = w;
        this.h = h;

        this.el = Element.svg(w, h, 'mm', { id: 'business-card-' + this.id });
        this.clip = Element.clipPath({ id: 'clip-' + this.id });

        this.fills = Element.g({ 'class': 'fills', id: 'fills-' + this.id, 'clip-path': 'url(#' + 'clip-' + this.id + ')' });
        this.strokes = Element.g({ 'class': 'strokes', id: 'strokes-' + this.id, 'clip-path': 'url(#' + 'clip-' + this.id + ')' });

        this.draw();
    };

    Card.prototype = Object.create(Object.prototype, {
        draw: {
            enumerable: true,
            value: function() {
                this._colors();
                this._recalc();

                this._empty();
                this._drawBkgd();
                this._drawPath();
                this._center();
            }
        },

        _colors: {
            value: function() {
                this.hex0 = randomHex();
                this.hex1 = randomHex();
                this.hex2 = randomHex();
                this.hex3 = randomHex();
                this.hex4 = randomHex();
                this.hex5 = randomHex();
                this.hex6 = randomHex();
                this.hex7 = randomHex();
                this.hex8 = coinToss()
                    ? randomHex()
                    : this.hex0;
            }
        },

        _recalc: {
            value: function() {
                this.r = randomRange(2, 4); // (8.75 / 223) * 59;

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

                this.a2 = area(this.r2);
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
                this.bh = this.h; // Math.round(16 * (this.bw / 9));
                this.bx = this.rx - (this.bw - this.rw) / 2;
                this.by = this.ry - (this.bh - this.rh) / 2;
            }
        },

        _empty: {
            value: function() {
                while (this.clip.firstChild) {
                    this.clip.removeChild(this.clip.firstChild);
                }

                while (this.fills.firstChild) {
                    this.fills.removeChild(this.fills.firstChild);
                }

                while (this.strokes.firstChild) {
                    this.strokes.removeChild(this.strokes.firstChild);
                }
            }
        },

        _randomStroke: {
            value: function(hex, max) {
                max || (max = (hex ? 10 : 100));
                hex || (hex = randomHex());

                var w = Math.ceil(randomRange(0, max)) / 2,
                    attrs = {
                        'stroke': hex,
                        'fill': 'none'
                    };

                attrs['stroke-opacity'] = Math.random();
                attrs['stroke-width'] = w;

                if (percentChance(20)) {
                    attrs['stroke-dasharray'] = [0.001, w * 2].join(' ');
                    attrs['stroke-linecap'] = coinToss() ? 'round' : 'square';
                }
                
                return attrs;
            }
        },

        _randomFill: {
            value: function(hex) {
                hex || (hex = randomHex());

                var attrs = {
                    'stroke': 'none',
                    'fill': hex
                };

                attrs['fill-opacity'] = 0.25 + Math.random() * 0.25;
                
                return attrs;
            }
        },

        _drawBkgd: {
            value: function() {
                var elements = {
                    background: ['rect', null, this.bx, this.by, this.bw, this.bh],
                    
                    centerCircle: ['circle', this.hex1, this.hw, this.hh, this.r2],
                    centerCircleSquared: ['rect', this.hex2, this.hw - this.hs, this.hh - this.hs, this.s2, this.s2],
                    
                    squaredCircle: ['circle', this.hex3, this.hw, this.hh, this.hs],
                    
                    topRightSquare: ['rect', this.hex2, this.hw + this.hs, this.hh - this.hs - this.d2, this.d2, this.d2],
                    topRightCircle: ['circle', this.hex3, this.hw + this.hs + this.r2, this.hh - this.hs - this.r2, this.r2],
                    
                    bottomRightSquare: ['rect', this.hex2, this.hw + this.hs, this.hh + this.hs, this.d2, this.d2],
                    bottomRightCircle: ['circle', this.hex3, this.hw + this.hs + this.r2, this.hh + this.hs + this.r2, this.r2],
                    bottomLeftCircle: ['circle', this.hex2, this.hw - this.hs, this.hh + this.hs, this.r0],
                    
                    topLeftBigCircle: ['circle', this.hex4, this.cx1, this.cy1, this.r3],
                    topLeftBigCircleSpine: ['circle', this.hex4, this.cx2, this.cy2, this.r3],
                    
                    hypotenuse: ['line', this.hex5, this.cx1, this.cy1, this.cx2, this.cy2],
                    adjacent: ['line', this.hex5, this.cx2, this.cy2, this.hw - this.hs, this.hh - this.hs],
                    opposite: ['line', this.hex5, this.hw - this.hs, this.hh - this.hs, this.cx1, this.cy1],
                    
                    golden: ['line', this.hex5, this.px1, this.py1, this.cx1, this.cy1],
                    incedence: ['line', this.hex5, this.cx1, this.cy1, this.px2, this.py2],
                    
                    boundingBox: ['rect', this.hex7, this.rx, this.ry, this.rw, this.rh]
                },
                strokes = [],
                fills = [];

                Object.keys(elements).forEach(function(key) {
                    var func = elements[key].shift(),
                        hex = elements[key].shift(),
                        attrs;

                    if (coinToss()) {
                        attrs = this._randomStroke(hex);
                        attrs['class'] = key;

                        elements[key].push(attrs);
                        strokes.push(Element[func].apply(Element, elements[key]));
                        elements[key].pop();
                    }

                    if (coinToss()) {
                        attrs = this._randomFill(hex);
                        attrs['class'] = key;

                        elements[key].push(attrs);
                        fills.push(Element[func].apply(Element, elements[key]));
                        elements[key].pop();
                    }
                }.bind(this));

                strokes.forEach(function(ele) {
                    this.strokes.appendChild(ele);
                }.bind(this));

                fills.forEach(function(ele) {
                    this.fills.appendChild(ele);
                }.bind(this));
            }
        },

        _drawPath: {
            value: function() {
                var strokeWidth = Math.ceil(randomRange(0, 20)),
                    attrs1,
                    attrs2,
                    path1,
                    path2;

                attrs1 = {
                    'stroke': this.hex0,
                    'stroke-opacity': Math.random(),
                    'stroke-width': strokeWidth
                };

                attrs2 = {
                    'stroke': this.hex8,
                    'stroke-opacity': Math.random(),
                    'stroke-width': strokeWidth
                };

                if (strokeWidth < 11 && percentChance(20)) {
                    attrs1['stroke-dasharray'] = [0.001, strokeWidth * 2].join(' ');
                    attrs1['stroke-linecap'] = coinToss() ? 'round' : 'square';

                    if (strokeWidth < 4) {
                        attrs2['stroke-dasharray'] = [0.001, strokeWidth * 2].join(' ');
                        attrs2['stroke-linecap'] = coinToss() ? 'round' : 'square';
                    }
                }

                path1 = Element.path([
                    'M', this.px1, this.py1,
                    'A', this.r3, this.r3, 0, 1, 1, this.px2, this.py2,
                    'A', this.r3, this.r3, 0, 0, 0, this.cx1, this.cy2,
                    'L', this.cx1 + this.s2 + this.r2, this.cy2,
                    'A', this.r2, this.r2, 0, 1, 0, this.cx1 + this.s2, this.cy2 - this.r2,
                    'L', this.hw + this.hs, this.hh + this.hs + this.r2,
                    'A', this.r2, this.r2, 0, 1, 0, this.hw + this.hs + this.r2, this.hh + this.hs,
                    'L', this.hw + this.hs, this.hh + this.hs
                ].join(' '), attrs1);

                path2 = Element.path([
                    'M', this.hw - this.hs + this.r0, this.hh + this.hs - this.r0,
                    'L', this.hw - this.hs, this.hh + this.hs - this.r0,
                    'A', this.r0, this.r0, 0, 1, 0, this.hw - this.hs + this.r0, this.hh + this.hs,
                    'Z'
                ].join(' '), attrs2);

                this.strokes.appendChild(path1);
                this.strokes.appendChild(path2);
            }
        },

        _center: {
            value: function() {
                var x = ((this.w - this.bw) / 2) - this.bx,
                    y = ((this.h - this.bh) / 2) - this.by;

                this.clip.appendChild(Element.rect(this.bx, this.by, this.bw, this.bh, { stroke: 'none', fill: randomHex() }));

                this.fills.setAttributeNS(null, 'transform', [
                    'translate(', x, y, ')'
                ].join(' '));

                this.strokes.setAttributeNS(null, 'transform', [
                    'translate(', x, y, ')'
                ].join(' '));
                
                this.el.appendChild(this.clip);
                this.el.appendChild(this.fills);
                this.el.appendChild(this.strokes);
            }
        }
    });

    return Card;

});