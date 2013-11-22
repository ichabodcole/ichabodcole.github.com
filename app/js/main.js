var ichaBlog = (function(app){

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/

  // DOM Elements
  var container = document.querySelector('.container');
  var article   = document.querySelector('article');
  var header    = document.querySelector('header');

  /**********************************
    **                            **
     *      Utils Functions       *
    **                            **
   **********************************/

  function getHeaderHeight (){
    return header.offsetHeight;
  }

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

  function addHeaderMarginToContent() {
    article.style.marginTop = getHeaderHeight() + "px";
  }

  function windowResize (e) {
    addHeaderMarginToContent();
  }

  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  document.addEventListener('aboutClick', freezeContent);
  document.addEventListener('closeClick', unfreezeContent);
  window.addEventListener('resize', windowResize);

  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
  ***********************************/

  addHeaderMarginToContent();

})(ichaBlog || {});


