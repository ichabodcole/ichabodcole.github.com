var ichaBlog = (function(app){

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/
  var shadowWidth = 10;
  // DOM elements
  var closeAboutBtn = document.querySelector('#about-panel .panel-close-btn');
  var aboutPanel    = document.getElementById('about-panel');

  // Custom Events
  var closeClickEvent = new CustomEvent('closeClick', { bubbles: true });
  var openPanelEvent  = new CustomEvent('openPanel', { bubbles: true });

  /**********************************
    **                            **
     *      Utils Functions       *
    **                            **
   **********************************/

  function getPanelWidth(panel){
    return panel.offsetWidth + shadowWidth;
  }

  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  function openAboutPanel(){
    aboutPanel.style.transition = "0.5s left";
    aboutPanel.style.left = '0';
    document.dispatchEvent(openPanelEvent);
  }

  function closeAboutPanel(){
    var panelWidth  = getPanelWidth(aboutPanel);
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
  aboutPanel.style.transition = "0s left";

  return app;

})(ichaBlog || {});