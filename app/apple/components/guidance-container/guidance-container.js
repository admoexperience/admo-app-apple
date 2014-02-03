GuidanceContainer = Component.create({
  name: 'guidance-container',
  source: User.head,
  optimalPosition: {x:720,z:1400},
  optimalRadius: {x:150,z:150},

  shown: function(){
    var self = this;
    this.addTimeout('initMenu', function(){
      self.element.css({opacity:1});
    },30);
  },

  update:function(){

    this.updateTrackedUser();

    var deltaX = Math.abs(this.source.x - 1920/2);
    var deltaZ = Math.abs(this.source.z - this.optimalPosition.z);

    if((deltaX<this.optimalRadius.x)&&(deltaZ<this.optimalRadius.z)&&(AdmoApp.currentState==3)){
      this.inPosition();
    }
    else{
      this.checkState();
    }

  },

  inPosition: function(){
  },

  updateTrackedUser:function(){

    var self = this;

    //get centre point for dynamic element on screen
    var objectWidth = parseInt(this.subElm(".human-image").css("width"));
    var objectHeight = parseInt(this.subElm(".human-image").css("height"));

    /****
    linear equation for determining kinect.x coordinates relative to the width of the transposed div
    ****/
    var zVars = {x1 : 400,x2 : 4000, y1 : 300, y2 : 1500};
    var m1 = (zVars.y2 - zVars.y1)/(zVars.x2 - zVars.x1);
    var c1 = zVars.y1 - zVars.x1*m1;

    var xVars = {x1 : 0,x2 : 1920, y1 : -300, y2 : 2220};
    var m2 = (xVars.y2 - xVars.y1)/(xVars.x2 - xVars.x1);
    var c2 = xVars.y1 - xVars.x1*m2;

    var aVars = {x1 : 0,x2 : 1920, y1 : 40, y2 : -40};
    var m3 = (aVars.y2 - aVars.y1)/(aVars.x2 - aVars.x1);
    var c3 = aVars.y1 - aVars.x1*m3;

    var plainX = m2*User.head.x + c2;
    var plainY = m1*User.head.z + c1;
    var humanX = plainX - objectWidth/2;
    var humanY = plainY- objectHeight/2;

    var angle = m3*User.head.x + c3;

    this.subElm(".human-image").css({left:humanX,top:humanY, 'transform':'rotate(' + angle + 'deg)'});


  },
  hidden: function(){
    this.element.css({opacity:0});
  },
  //check state and change what is showing onscreen
  checkState:function(){
    var self = this;

    if((AdmoApp.currentState==1)||(AdmoApp.currentState==2)){
      this.subElm('.guidance-element').css({opacity:0});
      this.subElm('.video-container').css({opacity:1});
    }
    else if(AdmoApp.currentState==3){
      this.subElm('.guidance-element').css({opacity:1});
      this.subElm('.video-container').css({opacity:0});
    }
  },
});
