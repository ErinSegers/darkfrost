var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    location: 'Gainesville, FL',
    time: 1000000,
    summary: 'clear-day',
    icon: 'clear-day',
    apparentTemperature: 75.4,
    precipProbability: 0.30,
    humidity: 0.45
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    }
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

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    summary: 'partly-cloudy',
    icon: 'partly-cloudy'
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    }
  },
  created: function(){
    axios.get('/weather/29.1,-81.4')
        .then(function(response){
          var daily = response.data.daily;
          dailyWidget.summary = daily.summary;
          dailyWidget.icon = daily.icon;
        })
        .catch(function(err){
          console.log(err);
        })
  }
})
