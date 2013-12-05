var Scrollemetry = (function() {
  /*
  * Scrollemetry © Cole Reed 2013
  * v0.1.0
  */

  // START CUSTOMEVENT POLYFILL
  /***************************************/
  // This is a polyfill to add the CustomEvent DOM API to ie 9 & 10
  // For more info and the original code see the below link.
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   };

  // This "try" keeps PhantomJs from zeroing out tests.
  try {
    CustomEvent.prototype = window.CustomEvent.prototype;
  } catch (err) {
    console.log('Your browser does not support the CustomEvent API', err);
  }
  window.CustomEvent = CustomEvent;
  /***************************************/
  // END CUSTOMEVENT POLYFILL

  function Scrollemetry (el) {
    this.el          = el;
    this._lastScroll = 0;
    this._direction  = null;
    this._speed      = 0;
    this._scroll     = 0;
    this._markers    = [];
  }

  // Scrollemetry.prototype.
  Scrollemetry.prototype = function (){

    // Private functions
    var _dispatchEvent = function (marker){
      // CustomEvent is a DOM method
      var e = new CustomEvent(marker.id, {detail:marker});
      this.el.dispatchEvent(e);
    }

    , _markerExists = function (id) {
      var index = this._markers.map(function(element, index){
        if(element.id === id) {
          return index;
        }
      });
      return index[0];
    }

    , _updateMarkers = function () {
      var _self = this;
      this._markers.forEach(function(element, index, array) {
        if(_self._scroll >= element.scrollPosition && element.past === false) {
          element.past = true;
          // set the correct scope for the private dispatchEvent function.
          _dispatchEvent.call(_self, element);
        } else if (_self._scroll < element.scrollPosition && element.past === true){
          element.past = false;
          _dispatchEvent.call(_self, element);
        }
      });
    }

    // API methods
    , addMarker = function (id, scrollPosition) {
      var index, marker;
      // Create a marker object
      marker = { id:id, scrollPosition:scrollPosition, past:false };
      // markerExists is a private method,
      // must use the call method to pass the correct "this" scope
      index = _markerExists.call(this, id);

      if(index === void(0)) {
        this._markers.push(marker);
      }else {
        this._markers[index] = marker;
      }
    }

    , getMarkerById = function (id) {
      var marker = this._markers.filter(function(element) {
        return element.id === id;
      });
      return marker[0];
    }

    , update = function (scroll) {
      this._scroll = scroll;
      this._speed  = this._scroll - this._lastScroll;

      if(this._scroll > this._lastScroll){
        this._direction = 'down';
      } else if (this._scroll < this._lastScroll){
        this._direction = 'up'
      } else {
        this._direction = null;
      }
      // Set the correct this context
      _updateMarkers.call(this);
      this._lastScroll = this._scroll;
    }

    // Getters
    , speed = function () {
      return this._speed;
    }

    , direction = function () {
      return this._direction;
    }

    , scroll = function () {
      return this._scroll;
    }

    , markers = function () {
      return this._markers;
    }

    , lastScroll = function () {
      return this._lastScroll;
    }

    return {
      speed: speed,
      direction: direction,
      scroll: scroll,
      markers: markers,
      lastScroll: lastScroll,
      addMarker: addMarker,
      getMarkerById: getMarkerById,
      update: update
    }
  }();

  return Scrollemetry;
})();