var ichaBlog = (function(app){

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/

  var shadowWidth = 10;
  var transitionTime = 0.6;
  var panelOffsetRatio = 1;
  // DOM elements
  var closeAboutBtn = document.querySelector('#about-panel .panel-close-btn');
  var aboutPanel    = document.getElementById('about-panel');

  // Custom Events
  var closeClickEvent = new CustomEvent('closeClick', { bubbles: true });
  var openPanelEvent  = new CustomEvent('openPanel', { bubbles: true });

  var mq = window.matchMedia('(max-width: 35em)');

  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  function getPanelWidth(panel){
    return panel.offsetWidth + shadowWidth;
  }

  function openAboutPanel(){
    aboutPanel.style.transition = transitionTime + "s left";
    aboutPanel.style.left = '0';
    document.dispatchEvent(openPanelEvent);
  }

  function closeAboutPanel(){
    var panelWidth  = getPanelWidth(aboutPanel);
    aboutPanel.style.left = (-panelWidth * panelOffsetRatio) + 'px';
    document.dispatchEvent(closeClickEvent);
  }

  function onMatchMedia (mqe) {
    if (mqe.matches) {
      panelOffsetRatio = 1.5;
    } else {
      panelOffsetRatio = 1;
    }
  }

  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  closeAboutBtn.addEventListener('click', closeAboutPanel, false);
  aboutPanel.addEventListener('aboutClick', openAboutPanel, false);
  mq.addListener(onMatchMedia);

  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
  ***********************************/

  closeAboutPanel();
  onMatchMedia(mq);

  return app;

})(ichaBlog || {});