var ichaBlog = (function(app){

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/
  var shadowWidth = 10;
  var transitionTime = 0.6;
  // DOM elements
  var closeAboutBtn = document.querySelector('#about-panel .panel-close-btn');
  var aboutPanel    = document.getElementById('about-panel');

  // Custom Events
  var closeClickEvent = new CustomEvent('closeClick', { bubbles: true });
  var openPanelEvent  = new CustomEvent('openPanel', { bubbles: true });

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
    var panelWidth  = getPanelWidth(aboutPanel) * 1.5;
    aboutPanel.style.left = (-panelWidth) + 'px';
    document.dispatchEvent(closeClickEvent);
  }

  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  closeAboutBtn.addEventListener('click', closeAboutPanel, false);
  aboutPanel.addEventListener('aboutClick', openAboutPanel, false);

  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
  ***********************************/

  closeAboutPanel();

  return app;

})(ichaBlog || {});