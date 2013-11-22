var ichaBlog = (function(app){

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/

  // DOM Elements
  var container = document.querySelector('.container');

  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  function freezeContent () {
    container.style.opacity = "0.3";
    document.body.style.overflow = 'hidden';
  }

  function unfreezeContent () {
    container.style.opacity = "1";
    document.body.style.overflow = 'auto';
  }

  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  document.addEventListener('aboutClick', freezeContent);
  document.addEventListener('closeClick', unfreezeContent);
  container.style.transition = "0.25s opacity";


})(ichaBlog || {});


