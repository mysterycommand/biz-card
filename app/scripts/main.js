/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

require([

    'jquery',
    // 'lodash',
    'app'

], function (

    $,
    // _,
    app

) {

    'use strict';

    if (window.$) {
        window.$.noConflict(true);
        delete window.jQuery;
        delete window.$;
    }

    // if (window._) {
    //     window._.noConflict();
    //     delete window._;
    // }

    $(app);

});

/* ================================================================================================================== */
