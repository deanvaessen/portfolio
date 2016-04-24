function xx(){
//--oude code hierbeneden !WIP!
    var content_div = document.getElementById('portfolio__loadhook'),
    portfoliooverview = "portfolio.html",
    content_iframe = document.getElementById("section__portfolio__iframe"),
    section__portfolio = document.getElementById('section__portfolio'),
    fadediv = document.getElementById('portfolio__loadhook'),
    fadeOutLeft = ' fadeOutLeft ';

    if(window.portfoliooverviewactivation){ 
      //Don't do this if I still have a portfolio item active, but do do it on initial pageload (state is true on load)
      //roll up the iframe
      content_iframe = document.getElementById("section__portfolio__iframe");
      document.getElementById('section__portfolio__iframe').height = "0px";
      document.getElementById('blog__iframe').height = "0px"; //also roll this one up on initial load

      // Remove the page
      var portfolioiframecontent = "clear.html"; 
      content_iframe.src = portfolioiframecontent;
      activatePreIframeLoadState(); //continue to load the portfolio overview
    }
    else if (landingpageactivation){ .
      //Do I want to activate the landing page?

      //roll up the iframe
      content_iframe = document.getElementById("blog__iframe");
      document.getElementById('blog__iframe').height = "0px";

      // Remove the page
      var blogiframecontent = "clear.html"; 
      content_iframe.src = blogiframecontent;
      activatePreIframeLoadState(); //continue to load the landing page

    }
    else if(blogactivation){
      blogactivation = false;
      //roll up the iframe
      var content_iframe = document.getElementById("section__portfolio__iframe");
      document.getElementById('section__portfolio__iframe').height = "0px";

      // Remove the previous page
      var portfolioiframecontent = "clear.html"; 
      content_iframe.src = portfolioiframecontent;
      document.getElementById('blog__iframe').height = "0px"; //roll up first to prevent page jump
      //Parameters for the iFrame handling
      /*                  initiateButtonclicked = true;*/ //[20-04]
      listenforiframeloaded = true;
      blogiframelisten = true;
      portfolioiframelisten = false;

      document.getElementById('blog').style.display = "flex";

      $("#landingpage").fadeOut(1000, function() {
      $(blog__loadingspinner).fadeIn(700, function(){

      loadBlog();
      });

      document.getElementById('blog__loadingspinner').style.display = "flex";
      });
    }
    else{ 
      //Instead, if I still have an item loaded, wait for the animation to play out, go back and deload the iFrame and then load what you need (like portfolio overview)
      $('.iframe').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      function(e) {
        if(listenendslideout){
          console.log("Slideout done!");
          document.getElementById('section__portfolio__iframe').height = "0px";


          if (blogactivationfromportfolio){ 
            //Comes in here when the portfolio item is active and I click on blog
            window.portfoliooverviewactivation = false;
            listenendslideout = false;
            portfolioiframeactive = false;
            blogactivation = true;
            deLoadIframes();
          }

          else if(portfolioiframeactive){
            window.portfoliooverviewactivation = true;
            listenendslideout = false;
            portfolioiframeactive = false;
            deLoadIframes();
          }

          else if (blogiframeactive){
            $("#blog__iframe").removeClass('animated--slow fadeOutLeft');
            blogiframeactive = false;
            listenendslideout = false;
            landingpageactivation = true;
            deLoadIframes();
          }
        } 
      });
    }
  }



  

//temp
     setTimeout(function(){
     }, 400); 