var Home = {
  CITY_KEY: 'finder.city',
  ZOOM_KEY: 'finder.zoom',
  LOCATION_KEY: 'finder.location',

  initMap: function initMap() {
    var startLocation = { lat: 53.00, lng: -3.00 };
    var hasStart;
    if(window.localStorage.hasOwnProperty(this.LOCATION_KEY)) {
      var startLocation = JSON.parse(window.localStorage.getItem(this.LOCATION_KEY));
      var hasStart = true;
    }
    var startZoom = window.localStorage.hasOwnProperty(this.ZOOM_KEY) ?
      window.localStorage.getItem(this.ZOOM_KEY) :
      8;

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom:   startZoom,
      center: startLocation,
    });

    if(!hasStart) {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
          var pos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          this.setMap(pos);
          this.map.setZoom(11);
          this.getCityForCoords(pos, function(city) {
            window.localStroage.setItem(this.CITY_KEY, city);
          });
        }.bind(this), function() {
          this.showCityCard();
        }.bind(this));
      } else {
        this.showCityCard();
      }
    }

    $("[data-search-btn='true']").click(this.toggleCityCard.bind(this));
  },

  toggleCityCard: function toggleCityCard() {
    this.showingCityCard ? this.hideCityCard() : this.showCityCard();
  },
  showCityCard: function showCityCard() {
    this.showingCityCard = true;
    $("[data-city-card='true']").removeClass('none');

    $("[data-city-input='true']").keypress(function(e) {
      if(e.which === 13) this.adjustMapForCity();
    }.bind(this));
    $("[data-city-submit='true']").click(this.adjustMapForCity.bind(this));
  },
  hideCityCard: function hideCityCard() {
    this.showingCityCard = false;
    $("[data-city-card='true']").addClass('none');

    $("[data-city-input='true']").off('keypress');
    $("[data-city-submit='true']").off('click');
  },

  adjustMapForCity: function adjustMapForCity() {
    var cityVal = $("[data-city-input='true']").val();

    this.getCoordsForCity(cityVal, function(coords) {
      window.localStorage.setItem(this.CITY_KEY, cityVal);
      this.setMap(coords);
      this.hideCityCard();
    }.bind(this));
  },

  setMap: function setMap(coords) {
    window.localStorage.setItem(this.LOCATION_KEY, JSON.stringify(coords));
    this.map.setCenter(coords);
  },

  getCoordsForCity: function getCoordsForCity(city, cb) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: city }, function(results, status) {
      if(status === google.maps.GeocoderStatus.OK) {
        cb({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      } else {
        this.displayError("Error retrieving coordinates for city " + city);
      }
    }.bind(this));
  },
  getCityForCoords: function getCityForCoords(coords, cb) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: coords }, function(results, status) {
      if(status === google.maps.GeocoderStatus.OK) {
        debugger;
      } else {
        this.displayError("Error retrieving city for coordinates " + coords);
      }
    }.bind(this));
  },

  displayError: function displayError(msg) {
    alert("There was an error: " + msg + "\nPlease contact dev.warsribe@gmail.com with this message. Thanks!");
  }
}