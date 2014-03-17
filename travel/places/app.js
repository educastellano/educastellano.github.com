
(function (root) {
    'use strict';

    var App = root.App = {
        model: {},
        list: {},
        view: {}
    };

    App.view.Map = {
        map: false,

        renderPlaces: function (places) {
            var i;

            for (i=0; i<places.length; i++) {
                this.createMarker(places[i]);
            }
        },

        createMarker: function (place) {
            var me = this,
                marker;

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(place.lat, place.lon),
                map: this.map,
                title: place.name,
                model: place,
                icon: {
                    url: 'img/' + place.icon,
                    scaledSize: {
                        height: 30,
                        width: 30
                    }
                }
            });

            google.maps.event.addListener(marker, 'click', function (e) {
                var infowindow,
                    content;
                content =
                        '<h3>'+ place.name +'</h3>' +
                        ''+ place.description +'' +
                        '<br><br>'+
                        '<a href="'+ place.link +'" target="_blank">more info</a>';
                infowindow = new google.maps.InfoWindow({
                    content: content
                });
                infowindow.open(me.map, marker);
            });

            return marker;
        }
    };

    // main
    //
    window.addEventListener('WebComponentsReady', function () {
        $.ajax({
            url: 'data/places.json',
            success: function (resp) {
                App.view.Map.map = document.querySelector('google-maps').map;
                App.list.Places = resp.places;
                App.view.Map.renderPlaces(resp.places);
            },
            error: function () {
                console.log('could not load places');
            }
        });
    });

})(this);