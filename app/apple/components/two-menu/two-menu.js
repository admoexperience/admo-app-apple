TwoMenu = Component.create({
  name: 'two-menu',

  buttonAttr:{
    offsetLeft:{x:-400, y:200},
    offsetRight:{x:400, y:200},
  },
  buttonLeft: null,
  buttonRight: null,

  source: User.head,

  shown: function(){
    var self = this;

    this.addTimeout('initMenu', function(){
      self.element.css({opacity:1});
    },30);

    var r = setTimeout(function(){
      //self.buttonLeft.element.css({opacity:0});
      self.buttonLeft.drawingReady = false;

      //self.buttonRight.element.css({opacity:0});
      self.buttonRight.drawingReady = false;

      self.initComponent();
    }, 5000);

  },

  hidden: function(){
    this.element.css({opacity:0});
  },

  initComponent: function(){
    this.buttonLeft.element.css({opacity:1});
    this.buttonLeft.drawingReady = true;

    this.buttonRight.element.css({opacity:1});
    this.buttonRight.drawingReady = true;
  },

  update: function(){
    var xLeft = this.source.x + this.buttonAttr.offsetLeft.x;
    var yLeft = this.source.y + this.buttonAttr.offsetLeft.y;
    this.buttonLeft.source = {x: xLeft, y: yLeft};

    var xRight = this.source.x + this.buttonAttr.offsetRight.x;
    var yRight = this.source.y + this.buttonAttr.offsetRight.y;
    this.buttonRight.source = {x: xRight, y: yRight};
  },

  proceed: function(selection){
  },

  init: function(){
    var self = this;

    this.buttonLeft = null;
    this.buttonLeft = CircularButton.create({
      image: '/apple/images/4-menu/button.png',
      circleClass:'circle-menu',
      textClass:'text-menu',
      text:'Explore iPhone',
      source:{x:510 ,y:750},
      arcAttributes:{r:100, x:100, y:100, rotation:220, scope:360, max:280, thickness:20 , wallThickness:7},
      speed:3,

      dynamicPositioning:true,
      textOffset:{before:"0px,0px", after:"0px,70px", x:0, y:15},
      containerColour: '#25a3fe',
      proceed:function(){
        self.proceed('explore');
      },
    });
    this.addComponent(this.buttonLeft);

    this.buttonRight = null;
    this.buttonRight = CircularButton.create({
      image: '/apple/images/4-menu/button.png',
      circleClass:'circle-menu',
      textClass:'text-menu',
      text:'Colour Explosion',
      source:{x:510 ,y:750},
      arcAttributes:{r:100, x:100, y:100, rotation:220, scope:360, max:280, thickness:20 , wallThickness:7},
      speed:3,

      dynamicPositioning:true,
      textOffset:{before:"0px,0px", after:"0px,70px", x:0, y:15},
      containerColour: '#25a3fe',
      proceed:function(){
        self.proceed('colour');
      },
    });
    this.addComponent(this.buttonRight);
  },

});
