$(document).ready(function() {

  var myLatLng = new google.maps.LatLng(21.3000, -157.8167);
  var map;

  var initialize = function() {
    // var myLatLng = new google.maps.LatLng(21.3000, -157.8167);
    var mapOptions = {
        zoom: 6,
        center: myLatLng
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  };
  google.maps.event.addDomListener(window, 'load', initialize);


  $("#city").on('submit', function(event) {
    event.preventDefault();

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
            // myLatLng = {lat: response.breweries[i][1], lng: response.breweries[i][2]};
            // console.log(myLatLng);
            // mapOptions = {
            //   zoom: 6,
            //   center: myLatLng
            // };
            //
            // var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            var infowindow = new google.maps.InfoWindow();

            // console.log(response.breweries[i][0]);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: response.breweries[i][0]
            });

            marker.addListener('click', function() {
              console.log("I've been clicked!");
              // infowindow.setContent(response.breweries[i][0]); //This doesn't work bc this code is run on a Click event.
              infowindow.setContent(this.title);
              infowindow.open(map, this);
            });
          }
          // debugger
          map.setCenter(myLatLng);
      });
  });


}); //end doc ready
