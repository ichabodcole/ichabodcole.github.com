/**********************************
  **                            **
   *        HEADER CODE         *
  **                            **
 **********************************/

var ichaBlog = (function(app){

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/

  var scroller   = new Scrollemetry(document);
  var viewState  = true;
  // Dom elments
  var header     = document.querySelector('header');
  var moreBtn    = document.getElementById('more-btn');
  var aboutBtn   = document.getElementById('about-btn');
  var buttons    = [moreBtn, aboutBtn];

  // Custom Events
  var aboutClick = new CustomEvent('aboutClick', {bubbles: true});
  var moreClick  = new CustomEvent('moreClick', {bubbles: true});
  //
  var mq = window.matchMedia('(max-width: 35em)');

  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  function setNavButtonsHoverClass (classString) {
    buttons.forEach(function(element) {
      element.getElementsByTagName('span')[0].className = classString;
    });
  }

  function disableButtons () {
    setNavButtonsHoverClass('disabled');
    moreBtn.removeEventListener('click', onMoreClick, false);
    aboutBtn.removeEventListener('click', onAboutClick, false);
  }

  function enableButtons() {
    setNavButtonsHoverClass('');
    moreBtn.addEventListener('click', onMoreClick, false);
    aboutBtn.addEventListener('click', onAboutClick, false);
  }

  function onAboutClick (e) {
    e.preventDefault();
    e.stopPropagation();
    document.dispatchEvent(aboutClick);
    disableButtons();
  }

  function onMoreClick (e) {
    e.preventDefault();
    e.stopPropagation();
    document.dispatchEvent(moreClick);
    disableButtons();
  }

  function getHeaderHeight (){
    return header.offsetHeight;
  }

  function showHeader () {
    header.style.top = 0;
    viewState = true;
  }

  function hideHeader () {
    header.style.top = -(getHeaderHeight() + 50) + 'px';
    viewState = false;
  }

  // Scroll checking functions
  function isBelowOffset (scroll, offset) {
    if (scroll > offset) {
      return true;
    }
    return false;
  }

  function isDownAndBelowOffset (scrollDir, scroll, offset){
    if (scrollDir === 'down' && isBelowOffset(scroll, offset)) {
      return true;
    }
    return false;
  }

  function isDownAndAboveSpeed(scrollDir, scrollSpeed, speed) {
    if (scrollDir === 'down' && Math.abs(scrollSpeed) > speed) {
      return true;
    }
    return false;
  }

  function isUpAndAboveOffset(scrollDir, scroll, offset) {
    if (scrollDir === 'up' && !isBelowOffset(scroll, offset)) {
      return true;
    }
    return false;
  }

  function isUpAndAboveSpeed (scrollDir, scrollSpeed, speed) {
    if (scrollDir === 'up' && Math.abs(scrollSpeed) > speed) {
      return true;
    }
    return false;
  }

  function onScroll (e) {
    window.requestAnimationFrame(function(){
      var scroll = scroller.scroll(),
          scrollSpeed = scroller.speed(),
          scrollDirection = scroller.direction(),
          headerOffset = getHeaderHeight() - (getHeaderHeight() * 0.2);

      scroller.update(document.body.scrollTop);

      if(isDownAndBelowOffset(scrollDirection, scroll, headerOffset) && viewState === true) {
        hideHeader();
      }

      if(isUpAndAboveOffset(scrollDirection, scroll, headerOffset) && viewState === false) {
        showHeader();
      }

      if (isUpAndAboveSpeed(scrollDirection, scrollSpeed, 15)
        && isBelowOffset(scroll, headerOffset)
        && viewState === false) {
        showHeader();
      }
    });
  }

  function onMatchMedia (mqe) {
    if (mqe.matches) {
      document.removeEventListener('scroll', onScroll, false);
      showHeader();
    } else {
      document.addEventListener('scroll', onScroll, false);
    }
  }

  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  document.addEventListener('closeClick', enableButtons, false);
  mq.addListener(onMatchMedia);

  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
   **********************************/

  onMatchMedia(mq);
  enableButtons();
  return app;

})(ichaBlog || {});