
var infowindow, map;
var markers = [	]
var locations = [
	{title:'Some oaks bistro', location:{lat:-33.965765, lng:18.475173}, id:'52125b4611d2e6fdf222a3aa',category:'Pizza Place'},
	{title:'Chuck Yangs Chinese', location:{lat:-33.965748, lng:18.475282}, id:'4c38c4170a71c9b67d4641c9',category:'Chinese'},
	{title:'Michaels Kitchen & Bar', location:{lat:-33.965513, lng:18.475367}, id:'4c5320e4a4269c74cf5f83ab',category:'Cafe and Deli'},
	{title:'Chippies prego', location:{lat:-33.9611828, lng:18.4780655}, id:'4c73a8ba8efc37040b09167d',category:'Fast Food'},
	{title:'Kelvin Grove Club', location:{lat:-33.9711542, lng:18.4702621}, id:'4c6e071165eda0931b9250d0',category:'Fine dinning'},
	{title:'Borussos', location:{lat:-33.9656008, lng:18.4730615}, id:'4da5e9221e726e4969669412',category:'Pizza Place'},]
var categories = ['All', 'Cafe and Deli', 'Pizza Place', 'Fast Food', 'Fine dinning','Chinese']
var styles = [
	    {
	        "featureType": "all",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#ffffff"
	            }
	        ]
	    },
	    {
	        "featureType": "all",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "color": "#000000"
	            },
	            {
	                "lightness": 13
	            }
	        ]
	    },
	    {
	        "featureType": "administrative",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#000000"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#144b53"
	            },
	            {
	                "lightness": 14
	            },
	            {
	                "weight": 1.4
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#08304b"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#0c4152"
	            },
	            {
	                "lightness": 5
	            }
	        ]
	    },
	    {
	        "featureType": "poi.park",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "saturation": "100"
	            },
	            {
	                "lightness": "14"
	            },
	            {
	                "color": "#0a4529"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#000000"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#0b434f"
	            },
	            {
	                "lightness": 25
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#000000"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#0b3d51"
	            },
	            {
	                "lightness": 16
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#000000"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#146474"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#021019"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "saturation": "-100"
	            },
	            {
	                "lightness": "0"
	            },
	            {
	                "color": "#291451"
	            }
	        ]
	    }
		]
var chosenCategory= []
function initMap(){
	infowindow = new google.maps.InfoWindow()
	map = new google.maps.Map(document.getElementById('map'), {
		center :{lat:-33.967585, lng:18.473704},
		zoom: 15,
		styles:styles
	}); 

        // The following group uses the location array to create an array of markers on initialize.
	for (var i = 0; i < locations.length; i++) {
	  // Get the position from the location array.
		var position = locations[i].location;
		var title = locations[i].title;
		var content = locations[i].content;
		var id = locations[i].id;
	  // Create a marker per location, and put into markers array.
		var marker = new google.maps.Marker({
		    position: position,
		    title: title,
		    content:content,
		    animation: google.maps.Animation.DROP,
		    id: id
		});
		locations[i].marker = marker;

		// Push the marker to our array of markers and display all markers.
		markers.push(marker);
		showListings()
		// Create an onclick event to open an infowindow at each marker.
		marker.addListener('click', function() {
			fourSquareInfo(this)
	    });
	}
}
// This function will loop through the markers array and display them all.
function showListings() {
	// listMarkers(markers);
	var bounds = new google.maps.LatLngBounds();
	// Extend the boundaries of the map for each marker and display the marker
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
	}
		map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideListings() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
}	


function viewModel(){
	restaurantCategories = ko.observableArray(categories);
	 var self = this;

	self.locations = ko.observableArray(locations);
	self.openInfo =function(i){
		google.maps.event.trigger(this.marker, 'click');
	}

	self.restaurantCategories = ko.observableArray(categories);
	self.chosenCategory = ko.observable('');
	self.items = ko.observableArray(locations);
	self.filteredItems = ko.computed(function() {
        var filter = self.chosenCategory();
        if (!filter || filter == "All") {
        	for (var i = 0; i < self.items().length; i++) {
        		if (locations[i].marker){
        		locations[i].marker.setVisible(true)
        		}
        	}
            return self.items() ;
        } else {
        	return ko.utils.arrayFilter(self.items(), function(i) {
        		i.marker.setVisible(false);
                if
                	(i.category == filter){
                	i.marker.setVisible(true)
                }
                return i.category == filter; 
            });
        }
    });
}
ko.applyBindings(new viewModel());

// Function that uses the foursquare api to return an ajax request with the name , rating and picture of a restuarant 
function fourSquareInfo(marker){
	var apiURL = 'https://api.foursquare.com/v2/venues/';
	var foursquareClientID = 'SYQPAQPQ33AFQWCFSOLSDQL0GE4R415YWUNLOB1U3GIVXCGC'
	var foursquareSecret ='EKRFYYDNG4ORCPDIBIBZRZ2DIXWTO25CO1PV3BNKHBJKTEMA';
	var foursquareVersion = '20170326';
	var venueFoursquareID = marker.id;
	var foursquareURL = apiURL + venueFoursquareID + '?client_id=' + foursquareClientID +  '&client_secret=' + foursquareSecret +'&v=' + foursquareVersion;

	$.ajax({
	  url: foursquareURL, 
	  }).done(function(data) {
	  	var val = data.response.venue.bestPhoto;
	    var rating = data.response.venue.rating;
	    var name = data.response.venue.name;
	    var image = '<img src =' +'"'+val.prefix + '200x100' + val.suffix+ '">'			
	    if (infowindow.marker != marker) {
	          infowindow.marker = marker;
	          for (var i = 0; i < locations.length; i++) {
	        		if (locations[i].marker){
	        		locations[i].marker.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png")
	        		}
	        	} 
	        infowindow.setContent('<h3>'+name+'</h3>'+"FourSquare Rating:" +rating.toString() +'<div>' +image+'</div>' );
	        infowindow.open(map, marker);
	        marker.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
	        // Make sure the marker property is cleared if the infowindow is closed.
	        infowindow.addListener('closeclick', function() {
		        infowindow.marker = null;
		        marker.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
		    });
		};
		}).fail(function(error){
			alert('FourSquare api was unable to load.')
	}); 

}

function googleerror(){
	alert('Google maps did not manage to load')
	}
