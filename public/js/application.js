"use strict";

$(document).ready(function() {

  var myLatLng = new google.maps.LatLng(21.3000, -157.8167);
  var map;
  var markers = [];

  var initialize = function() {
    var mapOptions = {
        zoom: 6,
        center: myLatLng
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  };
  google.maps.event.addDomListener(window, 'load', initialize);


  $("#city").on('submit', function(event) {
    event.preventDefault();
    //clear out the markers
    if (markers.length > 0) {
      for (var i=0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
      markers = [];
    }

    var request = $.ajax({
                  url: '/breweries',
                  type: 'post',
                  dataType: 'json',
                  data: $(this).serialize()
    });

    request.error(function(response){
      console.log("THIS IS ERROR STATE");
    });

      request.done(function(response){
        $("#brew").empty();

          for(var i=0; i<response.breweries.length; i++) {
            $("#brew").append('<li>'+response.breweries[i][0]+'</li>')

            myLatLng = new google.maps.LatLng(response.breweries[i][1], response.breweries[i][2]);
            // mapOptions = {
            //   zoom: 6,
            //   center: myLatLng
            // };
            //
            // var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                position: myLatLng,
                animation: google.maps.Animation.DROP,
                map: map,
                title: response.breweries[i][0]
            });
            markers.push(marker) //store all markers in an array

            marker.addListener('click', function() {
              // infowindow.setContent(response.breweries[i][0]); //This doesn't work bc this code is run on a Click event.
              infowindow.setContent(this.title);
              infowindow.open(map, this);
            });
          }
          map.setCenter(myLatLng);
          map.setZoom(11);
      });
  });

}); //end doc ready
