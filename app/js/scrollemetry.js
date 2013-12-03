var ichaBlog = (function(app) {

  function Scrollemetry () {
    this.lastScroll = 0;
    this.direction  = null;
    this.speed      = 0;
    this.scroll     = 0;
    this.markers    = [];
  }

  // Scrollemetry.prototype.

  Scrollemetry.prototype = function (){

    var addMarker = function (id, scrollPosition) {
      var index, marker;
      // Create a marker object
      marker = { id:id, scrollPosition:scrollPosition, past:false };
      // markerExists is a private method,
      // must use the call method to pass the correct "this" scope
      index = markerExists.call(this, id);

      if(index === void(0)) {
        this.markers.push(marker);
      }else {
        this.markers[index] = marker;
      }
    }

    , markerExists = function (id) {
      var index = this.markers.map(function(element, index){
        if(element.id === id) {
          return index;
        }
      });
      return index[0];
    }

    , getMarkerById = function (id) {
      var marker = this.markers.filter(function(element) {
        return element.id === id;
      });
      return marker[0];
    }

    , updateMarkersPastProp = function () {
    //   this.markers.forEach(function(element, index, array) {
    //     if(this.scroll > element.position) {
    //       element.past = true;
    //     } else {
    //       element.past = false;
    //     }
    //   });
    }

    , update = function () {
    //   this.scroll = document.body.scrollTop;
    //   this.updateMarkers();

    //   if (this.scroll > this.lastScroll) {
    //     this.direction = 'down';
    //   } else {
    //     this.direction = 'up';
    //   }

    //   this.speed = this.scroll - this.lastScroll;
    //   this.lastScroll = this.scroll;
    }

    return {
      addMarker: addMarker,
      getMarkerById: getMarkerById,
      update: update
    }
  }();

  app.scroller = Scrollemetry;
  return app;

})(ichaBlog || {});