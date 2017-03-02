// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require materialize-sprockets
//= require chartkick
//= require_tree .

$(document).on('turbolinks:load', function() {
  $('.tooltipped').tooltip({ delay: 50 });
  $(".button-collapse").sideNav();

  setTimeout(function() {
    var chartkickChart = Chartkick.charts["users-chart"];
    if(chartkickChart) {
      var chart = chartkickChart.getChartObject();
      var data = chartkickChart.getData();

      if(chart) {
        google.visualization.events.addListener(chart, 'click', function(data, e) {
          var chartId = Number(/bar#0#(\d*)/.exec(e.targetID)[1]);
          var cityName = data[0].data[chartId][0];
          window.location.href = '/users/search?city=' + encodeURI(cityName);
        }.bind(this, data));

        google.visualization.events.addListener(chart, 'onmouseover', function(e) {
          $('#users-chart').css('cursor', 'pointer');
        });

        google.visualization.events.addListener(chart, 'onmouseout', function(e) {
          $('#users-chart').css('cursor', 'default');
        });
      }
    }
  }, 1000);
});