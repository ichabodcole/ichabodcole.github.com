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
  var moreBtn  = document.getElementById('more-btn');
  var aboutBtn = document.getElementById('about-btn');
  var aboutPanel = document.getElementById('about-panel');

  // Custom Events
  var aboutClick = new CustomEvent('aboutClick', {bubbles: true});
  var moreClick  = new Event('moreClick');
  console.log("bubbles?", aboutClick.bubbles);

  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  function onAboutClick (e) {
    e.preventDefault();
    aboutPanel.dispatchEvent(aboutClick);
  }

  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  // moreBtn.addEventListener('click', onMoreClick, false)
  aboutBtn.addEventListener('click', onAboutClick, false);

  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
   **********************************/

  return app;

})(ichaBlog || {});