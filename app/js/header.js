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

  // Dom elments
  var moreBtn    = document.getElementById('more-btn');
  var aboutBtn   = document.getElementById('about-btn');
  var aboutPanel = document.getElementById('about-panel');
  var morePanel  = document.getElementById('more-panel');
  var buttons    = [moreBtn, aboutBtn];

  // Custom Events
  var aboutClick = new CustomEvent('aboutClick', {bubbles: true});
  var moreClick  = new CustomEvent('moreClick', {bubbles: true});

  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  function setNavButtonsHoverClass (classString) {
    buttons.forEach(function(element, index, array){
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
    aboutPanel.dispatchEvent(aboutClick);
    disableButtons();
  }

  function onMoreClick (e) {
    e.preventDefault();
    e.stopPropagation();
    morePanel.dispatchEvent(moreClick);
    disableButtons();
  }

  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  document.addEventListener('closeClick', enableButtons, false);

  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
   **********************************/

  enableButtons()
  return app;

})(ichaBlog || {});