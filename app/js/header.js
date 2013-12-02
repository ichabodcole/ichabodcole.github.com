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

  var scroller   = app.scroller;
  var lastScroll = 0;
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

  function getScrollDirection (fuzzyUp, fuzzyDown) {
    var dir, newScroll;
    fuzzyUp = fuzzyUp || 0;
    fuzzyDown = fuzzyDown || fuzzyUp;
    newScroll = document.body.scrollTop;

    if(newScroll > (lastScroll + fuzzyDown)) {
      dir = 'down';
    } else if (newScroll < (lastScroll - fuzzyUp)){
      dir = 'up';
    }
    lastScroll = newScroll;
    return dir;
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
  function isBelowOffset (scroller, offset) {
    if (scroller.scroll > offset) {
      return true;
    }
    return false;
  }

  function isDownAndBelowOffset (scroller, offset){
    if (scroller.direction === 'down' && isBelowOffset(scroller, offset)) {
      return true;
    }
    return false;
  }

  function isDownAndAboveSpeed(scroller, speed) {
    if (scroller.direction === 'down' && Math.abs(scroller.speed) > speed) {
      return true;
    }
    return false;
  }

  function isUpAndAboveOffset(scroller, offset) {
    if (scroller.direction === 'up' && !isBelowOffset(scroller, offset)) {
      return true;
    }
    return false;
  }

  function isUpAndAboveSpeed (scroller, speed) {
    if (scroller.direction === 'up' && Math.abs(scroller.speed) > speed) {
      return true;
    }
    return false;
  }

  function onScroll (e) {
    window.requestAnimationFrame(function(){
      scroller.update();
      headerOffset = getHeaderHeight() - (getHeaderHeight() * 0.2);

      if(isDownAndBelowOffset(scroller, headerOffset) && viewState === true) {
        hideHeader();
      }

      if(isUpAndAboveOffset(scroller, headerOffset) && viewState === false) {
        showHeader();
      }

      if (isUpAndAboveSpeed(scroller, 15)
        && isBelowOffset(scroller, headerOffset)
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