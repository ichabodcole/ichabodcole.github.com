(function () {
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
})();