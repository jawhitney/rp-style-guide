var rpApp = rpApp || {};

(function($) {
    var map, marker;

    var smallStyle = [
        {
            'featureType': 'administrative',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#3c4858'
                },
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'administrative.country',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
            'featureType': 'administrative.province',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'administrative.locality',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
            'featureType': 'administrative.locality',
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'administrative.neighborhood',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'administrative.land_parcel',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [
                {
                    'color': '#f2f2f2'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': [
                {
                    'saturation': -100
                },
                {
                    'lightness': 45
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
            'featureType': 'road.arterial',
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
                {
                    'color': '#71c5e8'
                },
                {
                    'visibility': 'on'
                }
            ]
        }
    ];

    var largeStyle = [
        {
            'featureType': 'all',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'administrative',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'administrative',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#3c4858'
                },
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'administrative.country',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'administrative.province',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'administrative.locality',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
        'featureType': 'administrative.locality',
        'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'administrative.neighborhood',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'administrative.land_parcel',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [
                {
                    'color': '#f2f2f2'
                },
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'landscape.natural',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'poi.attraction',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'poi.government',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.medical',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.park',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.place_of_worship',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.school',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.sports_complex',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': [
                {
                    'saturation': -100
                },
                {
                    'lightness': 45
                },
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'road.arterial',
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
            'featureType': 'transit.station.airport',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
                {
                    'color': '#71c5e8'
                },
                {
                    'visibility': 'on'
                }
            ]
        }
    ];

    [].slice.call(document.querySelectorAll('.rp-map-wrapper')).forEach(function(wrapper) {
        initMap(wrapper.dataset.map, getLatLng(wrapper), 12, smallStyle);
    });

    [].slice.call(document.querySelectorAll('.rp-map-expand')).forEach(function(expand) {
        expand.addEventListener('click', function(e) {
            e.preventDefault();
            mapExpand(getLatLng(expand.parentElement));
        });
    });

    function initMap(id, pos, zoom, style, icon) {
        icon = icon || '';
        map = new google.maps.Map(document.getElementById(id), {
            center: pos,
            zoom: zoom,
            disableDefaultUI: true,
            styles: style,
        });
        marker = new google.maps.Marker({
            position: pos,
            icon: '/assets/images/icons/icon-about-globaloffices-mapmarker' + icon + '.png',
            map: map,
            // animation: google.maps.Animation.DROP,
        });
        marker.addListener('click', function() {
            mapExpand(pos);
        });
    }

    function mapExpand(pos) {
        initMap('rpMap', pos, 16, largeStyle, '2x');
        $('#rpMapWrapper').slideDown();
        rpApp.goToSection('rpMapWrapper', 'top', -100);
    }

    function getLatLng(el) {
        return {
            lat: parseFloat(el.dataset.lat),
            lng: parseFloat(el.dataset.lng)
        };
    }

    document.getElementById('rpMapClose').addEventListener('click', function(e) {
        e.preventDefault();
        $('#rpMapWrapper').slideUp();
    });
})(jQuery);
