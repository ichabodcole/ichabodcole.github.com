var ichaBlog = (function(app){

  /**********************************
    **                            **
     *         Variables          *
    **                            **
   **********************************/

  var headerOffset = 15;
  // DOM Elements
  var container = document.querySelector('.container');
  var article   = document.querySelector('article');
  var header    = document.querySelector('header');
  // Custom Events
  var containerClick = new CustomEvent('containerClick', {bubbles:true});
  // matchMedia objects
  var mq = window.matchMedia('(max-width: 35em)');


  /**********************************
    **                            **
     *         Functions          *
    **                            **
   **********************************/

  // Content Background Freezing
  /**********************************/
  //
  function onContainerClick(){
    document.dispatchEvent(containerClick);
  }

  function changeBodyOverflow (value){
    // This setTimeout is necessary, do to a bug in Firefox.
    // This was also a pain in the ass to debug!
    // Below is a link referencing the same problem on stackoverflow
    // http://stackoverflow.com/questions/13626412/firefox-transitions-breaking-when-parent-overflow-is-changed
    setTimeout(function(){
      document.body.style.overflow = value;
    }, 25);
  }

  // This gets called when an overlay panel opens
  function freezeContent () {
    container.style.opacity = 0.3;
    changeBodyOverflow('hidden');
    container.addEventListener('click', onContainerClick, false);
  }

  function unfreezeContent () {
    container.style.opacity = 1;
    changeBodyOverflow('auto');
    container.removeEventListener('click', onContainerClick, false);
  }


  // Header / Content Margin Updating
  /**********************************/
  function getHeaderHeight (){
    return header.offsetHeight;
  }

  function removeHeaderMarginFromContent() {
    article.style.marginTop = headerOffset + 'px';
  }

  function addHeaderMarginToContent() {
    article.style.marginTop = getHeaderHeight() + headerOffset + 'px';
  }

  // if we hit the media query stop remove the resize listener
  // and set the content margin to 0. If we leave the media query
  // adjust the header and add the resize listener back.
  function onMatchMedia(mq) {
    if (mq.matches) {
      removeHeaderMarginFromContent();
      window.removeEventListener('resize', windowResize);
    } else {
      addHeaderMarginToContent();
      window.addEventListener('resize', windowResize);
    }
  }

  // On resize set the content margin to the size of the header
  function windowResize (e) {
    window.requestAnimationFrame(addHeaderMarginToContent);
  }

  // Possible? (ie may not be able to access script tags)
  // polyfill for ie vs firefox text grabbing.
  function setElementText(element, value){
    if(element.innerText){
      element.innerText = value;
    } else {
      element.textContent = value;
    }
  }

  // Gets the title and subtitle from a template,
  // then injects them into the header.
  function injectTitleInfo () {

    var titleElement    = document.querySelector('header .post-title h1');
    var subTitleElement = document.querySelector('header .post-title h2');

    var title    = app.pageTitle;
    var subtitle = app.pageSubtitle;

    // If the subtitle is empty remove the html element.
    if (subtitle === ''){
      subTitleElement.parentNode.removeChild(subTitleElement);
    } else {
      setElementText(subTitleElement, '~ ' + subtitle + ' ~');
    }

    setElementText(titleElement, title);
  }

  /**********************************
    **                            **
     *      Events Listeners      *
    **                            **
   **********************************/

  // These listens to events dispatched from the about and close buttons
  document.addEventListener('aboutClick', freezeContent);
  document.addEventListener('moreClick', freezeContent);
  document.addEventListener('closeClick', unfreezeContent);

  // This fires when the media query is met or left.
  mq.addListener(onMatchMedia);


  /**********************************
    **                            **
     *       On Load Events       *
    **                            **
  ***********************************/
  // Inject the title and subtitle into the header.
  injectTitleInfo();
  // Do an initial media query check to set up
  // the header and resize listener.
  onMatchMedia(mq);

  return ichaBlog;

})(ichaBlog || {});


