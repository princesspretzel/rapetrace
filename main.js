/*from the GoogleMaps API*/

function initialize() {

  // keys for Parse
  Parse.initialize("UXZTOC2wgxqTO3rI5o3cFhW6sYF7PbWrrRKJD2wv", "6VIcsIVJKVwTuBmq7H6mjkNWXJ9ZFktVz0OZyIaR");

  // load pins
  var Pin = Parse.Object.extend("Pins");
  var query = new Parse.Query(Pin);
  query.exists("lat");
  query.limit(1000);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length);
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        // show pins
        var lat = object.get('lat')
        var lng = object.get('lng')
        var myLatLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          // TODO: make sure updated location is saved
          draggable: true,
          title: 'Click to zoom'
          // icon: 'reddot.svg'
        });
        console.log(object.id + ' - ' + object.get('lat', 'lng'));
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

  // center map on Kansas City, KS
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(39.0997, -94.5783)
  };

  // new google map
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // new marker on click
  google.maps.event.addListener(map, 'click', function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    var myLatLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      // TODO: make sure updated location is saved
      draggable: true,
      title: 'Click to zoom'
      // icon: 'reddot.svg'
    });
    // send pin to Parse
    var pin = new Pin();
    pin.save({lat: myLatLng.lat()+'', lng: myLatLng.lng()+''})
  });

}

google.maps.event.addDomListener(window, 'load', initialize);