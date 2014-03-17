
(function (root) {
    'use strict';

    var App = root.App = {
        list: {}
    },
    dom = {
        map: document.querySelector('#map')
    };

    App.main = function () {
        dom.map.resources_url = 'http://educastellano.alwaysdata.net/data/';
        dom.map.renderPlaces(App.list.Places); 
    };

})(this);