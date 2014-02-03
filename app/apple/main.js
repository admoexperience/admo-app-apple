'use strict';

//AdmoApp.addJavaScript('apple/data/data.json');

AdmoApp.MainCtrl = function($scope) {

    //Global components that are shared across screens.
    //Careful care should be made to ONLY use these as needed
    //Generally this should only be used for consistent background elements
    var silhouette = UserVector.create();

    var staticHtml = StaticHtml.createHtml('<div class="backdrop"></div>');

    var globalComponents = GlobalComponents.create({
      components:[staticHtml, silhouette]
    });

    /**********GUIDANCE SCREEN***************/
    var guidance = GuidanceContainer.create({
      inPosition:function(){
        AdmoApp.setScreen(AdmoApp.Screens.startScreen);
      },
    });

    AdmoApp.Screens.guidanceScreen = Screen.create({
      components:[guidance],
      shown: function(){
        silhouette.hideSilhouette();
      },
    });
    /**********GUIDANCE SCREEN***************/

    /**********START SCREEN***************/
    var start = StartContainer.create({
      proceed:function(){
        AdmoApp.setScreen(AdmoApp.Screens.menuScreen);
      },
    });

    AdmoApp.Screens.startScreen = Screen.create({
      components:[start],
      shown: function(){
        silhouette.scaleVector(1);
      },
    });
    /**********START SCREEN***************/

    /**********MENU SCREEN***************/
    var menu = TwoMenu.create({
      proceed: function(selection){

        if(selection == 'explore'){
          AdmoApp.setScreen(AdmoApp.Screens.phoneScreen);
        }
        else{
          AdmoApp.setScreen(AdmoApp.Screens.colourScreen);
        }
      },
    });

    AdmoApp.Screens.menuScreen = Screen.create({
      components:[menu],
      shown: function(){
        silhouette.scaleVector(1);
      }
    });
    /**********MENU SCREEN***************/

    /**********SLIDE CAROUSEL SCREEN***************/
    var slideCarousel = SlidingCarousel.create({
      proceed:function(){
        AdmoApp.setScreen(AdmoApp.Screens.menuScreen);
      },
    });

    AdmoApp.Screens.phoneScreen = Screen.create({
      components:[slideCarousel],
      shown: function(){
        silhouette.scaleVector(0.65);
      },
    });
    /**********SLIDE CAROUSEL SCREEN***************/

    /**********COLOUR CAROUSEL SCREEN***************/
    var colourCarousel = ColourCarousel.create({
      proceed:function(){
        AdmoApp.setScreen(AdmoApp.Screens.menuScreen);
      },
    });


    AdmoApp.Screens.colourScreen = Screen.create({
      components:[colourCarousel],
      shown: function(){
        silhouette.scaleVector(0.65);
      }
    });
    /**********COLOUR CAROUSEL SCREEN***************/

    /**********STATE SCREEN HANDLER***************/

    AdmoApp.stateChanged = function(oldState, newState) {
      if( oldState == 3 && (newState==2 || newState==1)){
        AdmoApp.setScreen(AdmoApp.Screens.guidanceScreen);
      }

      if (oldState == 3 && newState != 3){
        //User has gone out of view stop the users session
         Stats.endSession();
      }
    };

    AdmoApp.swipeGesture = function(swipeGesture) {
      colourCarousel.swipeCarousel(swipeGesture);
      slideCarousel.swipeCarousel(swipeGesture);
    };

    AdmoApp.imageFrame = function(image) {
      silhouette.drawVector(image);
    };

    /**********STATE SCREEN HANDLER***************/
    AdmoApp.setGlobalComponents(globalComponents);

    AdmoApp.init();

    //Init the AdmoApp
    AdmoApp.angularScope = $scope;

    //Set the default screen for the app (ie the starting screen.)
    AdmoApp.setScreen(AdmoApp.Screens.startScreen);

};
