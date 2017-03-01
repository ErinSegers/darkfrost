var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    location: 'Gainesville, FL',
    time: 1000000,
    summary: 'Partly cloudy',
    icon: 'partly-cloudy',
    apparentTemperature: 75.4,
    precipProbability: 0.30,
    humidity: 0.45
  },
  created: function(){
    axios.get('/weather/29.1,-81.4') //this is the format we created in index.js
        .then(function(response){
          var data = response.data.currently;
          currentlyWidget.time = data.time;
          currentlyWidget.summary = data.summary;
          currentlyWidget.icon = data.icon;
          currentlyWidget.apparentTemperature = data.apparentTemperature;
          currentlyWidget.precipProbability = data.precipProbability;
          currentlyWidget.humidity = data.humidity;
        })
        .catch(function(err){
          console.log(err);
        });
  }
});
