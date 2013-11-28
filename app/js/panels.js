var ichaBlog = (function(app) {

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/

  var shadowWidth = 25;
  var transitionTime = 0.6;
  var panelOffsetRatio = 1;
  // DOM elements
  var closeAboutBtn = document.querySelector('#about-panel .panel-close-btn');
  var closeMoreBtn  = document.querySelector('#more-panel .panel-close-btn');
  var aboutPanel    = document.getElementById('about-panel');
  var morePanel     = document.getElementById('more-panel');

  // Custom Events
  var closeClickEvent = new CustomEvent('closeClick', { bubbles: true });
  var openPanelEvent  = new CustomEvent('openPanel', { bubbles: true });

  var mq = window.matchMedia('(max-width: 35em)');

  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  function getPanelWidth(panel) {
    return panel.offsetWidth + shadowWidth;
  }

  function openAboutPanel() {
    aboutPanel.style.transition = transitionTime + "s left";
    aboutPanel.style.left = 0;
    // document.dispatchEvent(openPanelEvent);
  }

  function openMorePanel() {
    morePanel.style.transition = transitionTime + "s right";
    morePanel.style.right = 0;
    // document.dispatchEvent(openPanelEvent);
  }

  function closePanels() {
    closeAboutPanel();
    closeMorePanel();
  }

  function closeAboutPanel() {
    var panelWidth  = getPanelWidth(aboutPanel);
    aboutPanel.style.left = (-panelWidth * panelOffsetRatio) + 'px';
    document.dispatchEvent(closeClickEvent);
  }

  function closeMorePanel() {
    var panelWidth = getPanelWidth(morePanel);
    morePanel.style.right = (-panelWidth * panelOffsetRatio) + 'px';
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
  closeMoreBtn.addEventListener('click', closeMorePanel, false);
  aboutPanel.addEventListener('aboutClick', openAboutPanel, false);
  morePanel.addEventListener('moreClick', openMorePanel, false);
  document.addEventListener('containerClick', closePanels, false);
  mq.addListener(onMatchMedia);

  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
  ***********************************/

  onMatchMedia(mq);
  closeAboutPanel();
  closeMorePanel();

  return app;

})(ichaBlog || {});