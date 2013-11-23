var ichaBlog = (function(app){

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/

  var headerOffset = 15;
  // DOM Elements
  var container = document.querySelector('.container');
  var article   = document.querySelector('article');
  var header    = document.querySelector('header');
  //
  var mq = window.matchMedia('(max-width: 35em)');


  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  // Content Background Freezing
  /**********************************/

  // This gets called when an overlay panel opens
  function freezeContent () {
    container.style.opacity = "0.3";
    document.body.style.overflow = 'hidden';
  }

  function unfreezeContent () {
    container.style.opacity = "1";
    document.body.style.overflow = 'auto';
  }


  // Header / Content Margin Updating
  /**********************************/
  function getHeaderHeight (){
    return header.offsetHeight;
  }

  function removeHeaderMarginFromContent() {
    article.style.marginTop = headerOffset + "px";
  }

  function addHeaderMarginToContent() {
    article.style.marginTop = getHeaderHeight() + headerOffset + "px";
  }

  // if we hit the media query stop remove the resize listener
  // and set the content margin to 0. If we leave the media query
  // adjust the header and add the resize listener back.
  function onMatchMedia(mq) {
    if (mq.matches) {
      removeHeaderMarginFromContent();
      window.removeEventListener('resize', windowResize);
    } else {
      addHeaderMarginToContent();
      window.addEventListener('resize', windowResize);
    }
  }

  // On resize set the content margin to the size of the header
  function windowResize (e) {
    window.requestAnimationFrame(addHeaderMarginToContent);
  }


  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  // These listens to events dispatched from the about and close buttons
  document.addEventListener('aboutClick', freezeContent);
  document.addEventListener('moreClick', freezeContent);
  document.addEventListener('closeClick', unfreezeContent);

  // This fires when the media query is met or left.
  mq.addListener(onMatchMedia);


  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
  ***********************************/

  // Do an initial media query check to set up
  // the header and resize listener.
  onMatchMedia(mq);

  return ichaBlog;

})(ichaBlog || {});


