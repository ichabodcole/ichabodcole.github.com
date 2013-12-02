var ichaBlog = (function(app) {

  var scroller = {
    lastScroll: 0,
    direction: null,
    speed: 0,
    scroll: 0,
    markers: [],

    markerExists: function (id) {
      this.markers.forEach(function(element, index, array) {
        if(element.id === id){
          return index;
        }
      });
      return false;
    },

    addMarker: function (id, position) {
      var index, marker
      marker = { id:id, position:position, past:false };
      if (index = markerExists(id) !== false) {
        this.markers[index] = { id:id, position:position, past:false };
      } else {
        this.markers.push(marker);
      }
    },

    updateMarkers: function () {
      this.markers.forEach(function(element, index, array) {
        if(this.scroll > element.position) {
          element.past = true;
        } else {
          element.past = false;
        }
      });
    },

    checkMarker: function (id) {
      this.markers.forEach(function(element, index, array) {
        if(element.id === id) {
          return element;
        }
      });
      return false;
    },

    update: function () {
      this.scroll = document.body.scrollTop;
      this.updateMarkers();

      if (this.scroll > this.lastScroll) {
        this.direction = 'down';
      } else {
        this.direction = 'up';
      }

      this.speed = this.scroll - this.lastScroll;
      this.lastScroll = this.scroll;
    }
  }

  app.scroller = scroller;
  return app;

})(ichaBlog || {});