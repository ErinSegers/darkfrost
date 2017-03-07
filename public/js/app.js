var hourlyWidget = new Vue ({
  el: '#hourly',
  data: {
    summary: "It's goin' to rain!",
    icon: 'clear-night',
    range: 0,
    hours: [],
    latitude: 29.1,
    longitude: -81.4
  },
  methods: {
    getHourlyIcon: function(iconString){
      return `/images/${iconString}.png`;
    },
    getDate: function(seconds){
      var date = new Date(seconds * 1000);
      var month = date.getMonth();
      var year = date.getFullYear();
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      return `${month + 1}/${day}/${year} ${hour}:${minutes < 9 ? '0' + minutes : minutes}`; //months start counting at 0, so 2 is March
    },
    // getMainIcon: function(){
    //   return `/images/${this.icon}.png`;
    // },
    getHourlyWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
          .then(function(response){
            var hourlyData = response.data.hourly;
            this.summary = hourlyData.summary;
            this.icon = hourlyData.icon;
            this.hours = hourlyData.data
          }.bind(this))
          .catch(function(err){
            console.log(err);
          });
    },
    rangeUp: function(){
      this.range = this.range + 12;
    },
    rangeDown: function(){
      this.range = this.range - 12;
    },
    updateWeather: function(){
      this.getHourlyWeather(this.latitude, this.longitude);
    }
  },
  created: function(){
    this.getHourlyWeather(29.1, -84.1);
  }
});

var currentlyWidget = new Vue({
  el: '#currently',
  data: {
    location: 'Gainesville, FL',
    time: 1000000,
    summary: 'clear-day',
    icon: 'clear-day',
    apparentTemperature: 75.4,
    precipProbability: 0.30,
    humidity: 0.45,
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    },
    getLocation: function(location){
      var locUrl = `/location/${this.location}`;
      console.log(locUrl);
      axios.get(locUrl)
          .then(function(response){
            var data = response.data.results[0];
            this.lat = data.geometry.location.lat;
            this.lon = data.geometry.location.lng;
            this.getWeather(this.lat, this.lon);
          }.bind(this))
          .catch(function(err){
            console.log(err);
          })
    },
    getWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      console.log(url);
      axios.get(url)
          .then(function(response){
            var data = response.data.currently;
            this.time = data.time;
            this.summary = data.summary;
            this.icon = data.icon;
            this.apparentTemperature = Math.round(data.apparentTemperature);
            this.precipProbability = data.precipProbability;
            this.humidity = data.humidity;
          }.bind(this))
          .catch(function(err){
            console.log(err);
          });
    }
  },
  created: function(){
    this.getLocation('Gainesville, FL');
  }
});

var dailyWidget = new Vue({
  el: '#daily',
  data: {
    summary: 'partly-cloudy',
    icon: 'partly-cloudy',
    sunTimes: [],
    latitude: 29.1,
    longitude: -81.4
  },
  methods: {
    iconUrl: function(iconString){
      return `/images/${iconString}.png`;
    },
    getWeather: function(lat, lon){
      var url = `/weather/${lat},${lon}`;
      axios.get(url)
          .then(function(response){
            var daily = response.data.daily;
            this.summary = daily.summary;
            this.icon = daily.icon;
            this.sunTimes = daily.data;
          }.bind(this))
          .catch(function(err){
            console.log(err);
          })
    },
    updateWeather: function(){
      this.getWeather(this.latitude, this.longitude);
    }
  },
  created: function(){
    this.getWeather(29.1, -81.4);
  }
});

var minutelyWidget = new Vue({
  el: '#minutely',
  data: {
    summary: 'breezy',
  },
  created: function(){
    axios.get('/weather/29.1,-81.4')
        .then(function(response){
          var minutely = response.data.minutely;
          minutelyWidget.summary = minutely.summary;
        })
        .catch(function(err){
          console.log(err);
        })
  }
});
