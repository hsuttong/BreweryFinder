$(document).ready(function() {

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
      //debugger

      $("#brew").empty();
      for(var i=0; i<response.breweries.length; i++) {
        $("#brew").append('<li>'+response.breweries[i][0]+'</li>')
        var myLatLng = new google.maps.LatLng(response.breweries[i][1], response.breweries[i][2]);
        var mapOptions = {
          zoom: 6,
          center: myLatLng
        };
       // debugger
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: response.breweries[i][0]
        });

      }
    });
  });

  var initialize = function() {
    var myLatLng = new google.maps.LatLng(21.3000, -157.8167);
    var mapOptions = {
      zoom: 6,
      center: myLatLng
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  };
  google.maps.event.addDomListener(window, 'load', initialize);
}); //end doc ready
