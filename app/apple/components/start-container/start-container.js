StartContainer = Component.create({
  name: 'start-container',

  buttonAttr:{
    source:{x:1350 ,y:600},
    offset:{x:0, y:0},
  },
  button: null,
  source: User.head,

  shown: function(){
    var self = this;

    this.addTimeout('initMenu', function(){
      self.element.css({opacity:1});
    },30);

    this.addTimeout('phoneAnimate', function(){
      self.subElm('.dynamic-phones').css({top:560});
    },500);

    this.addTimeout('animateDone',function(){
      self.button.drawingReady = true;
      self.subElm('.hover-text').css({width:450, height:250, opacity:1});
    }, 1000);

  },
  hidden: function(){
    this.element.css({opacity:0});
  },
  proceed:function(){

  },

  init: function(){
    var self = this;
    this.button = null;

    this.button = CircularButton.create({
      image: '/apple/images/4-menu/button.png',
      circleClass:'circle-menu',
      textClass:'text-menu',
      text:'Start',
      source:self.buttonAttr.source,
      arcAttributes:{r:100, x:100, y:100, rotation:220, scope:360, max:280, thickness:20 , wallThickness:7},
      speed:3,

      dynamicPositioning:true,
      textOffset:{before:"0px,0px", after:"0px,70px", x:0, y:15},

      containerColour: '#25a3fe',
      loading: function(){
        self.subElm('.hover-text').css({opacity:0});
      },
      unloading: function(){
        self.subElm('.hover-text').css({opacity:1});
      },
      proceed:function(){
        self.proceed();
      },

    });

    this.addComponent(this.button);

  },
});
