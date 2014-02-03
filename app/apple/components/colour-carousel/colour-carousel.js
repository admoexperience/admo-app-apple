ColourCarousel = Component.create({
  name: 'colour-carousel',
  indexLeft: null,
  indexMiddle: null,
  indexRight: null,
  swipeReady: false,

  buttonAttr:{
    source:{x:1300 ,y:800},
    offset:{x:0, y:0},
  },
  button: null,
  source: User.head,

  data: ['/apple/images/5-explore-color/phone-1.png',
          '/apple/images/5-explore-color/phone-2.png',
          '/apple/images/5-explore-color/phone-3.png',
          '/apple/images/5-explore-color/phone-4.png',
          '/apple/images/5-explore-color/phone-5.png'],

  colours:['#f4f5f6',
            '#fdeb75',
            '#a0ec6f',
            '#ff8282',
            '#59c6fe'],

  shown: function(){
    console.log(this.data);
    // set indexes
    this.indexLeft = this.data.length-1;
    this.indexMiddle = 0;
    this.indexRight = 1;

    // load middle div data
    this.subElm('.middle .content').css({'background-image': 'url(' + this.data[0] + ')'});
    this.subElm('.middle .background').css({'background-color': this.colours[0]});

    // load two side divs data
    this.preloadOffscreenDivs();
    this.positionIndexItems();

    var self = this;

    this.addTimeout('initMenu', function(){
      self.element.css({opacity:1});
    },30);

    var r = setTimeout(function(){
      self.swipeReady = false;
      self.button.element.css({opacity:0});
      self.button.drawingReady = false;

      self.swipeTutorial();
      //self.initComponent();
    }, 1000);

  },

  hidden: function(){
    this.element.css({opacity:0});
  },
/*
  update: function(){
    var x = this.source.x + this.buttonAttr.offset.x;
    var y = this.source.y + this.buttonAttr.offset.y;

    if(this.button.drawingReady) {
      this.button.source = {x: x, y: y};
    }

  },
*/
  swipeCarousel: function(swipe){
    if(this.swipeReady){
      if(swipe == "SwipeToLeft"){
        this.slideIndex('left');
        this.slideItems('left');
      }
      else{
        this.slideIndex('right');
        this.slideItems('right');
      }
    }
  },

  slideIndex:function(direction){

    var previousIndex = this.indexMiddle+1;

    if(direction == 'right'){
      this.indexMiddle = this.indexMiddle-1;
    }
    else if(direction == 'left'){
      this.indexMiddle = this.indexMiddle+1;
    }

    if (this.indexMiddle < 0){
      this.indexMiddle = this.data.length-1;
    }
    if (this.indexMiddle == this.data.length){
      this.indexMiddle = 0;
    }

    this.indexLeft = this.indexMiddle-1;
    this.indexRight = this.indexMiddle+1;

    if (this.indexLeft < 0){
      this.indexLeft = this.data.length-1;
    }
    if (this.indexLeft == this.data.length){
      this.indexLeft = 0;
    }

    if (this.indexRight < 0){
      this.indexRight = this.data.length-1;
    }
    if (this.indexRight == this.data.length){
      this.indexRight = 0;
    }
    this.updateProgressDotsColour(previousIndex, this.indexMiddle+1);
  },

  updateProgressDotsColour:function(previousIndex, newIndex){
    this.subElm('.index-item' + (previousIndex-1)).removeClass('button-selected');//css({"background-color":"#383a40",'transform':'scale(1)', opacity:0.5});
    this.subElm('.index-item' + (newIndex-1)).addClass('button-selected');//css({"background-color":"#f2f2f2",'transform':'scale(1.2)', opacity:1});
  },

  positionIndexItems: function(){
    var width = 1920;
    var spacing = 60;
    var radius = 35/2;
    var self = this;

    for(var t=0 ; t<this.data.length ; t++){
      var posX = (width - spacing * (this.data.length - 1))/2 + spacing * t - radius;
      this.subElm('.index-item' + t).css({left:posX});
    }

    this.addTimeout('index', function(){
      self.subElm('.index-items').addClass('index-item-animate');
      this.subElm('.index-item0').addClass('button-selected');
    },500);

  },

  slideItems: function(direction){
    var self = this;
    this.swipeReady = false;

    var leftDiv = this.subElm('.frame.left');;
    var midDiv = this.subElm('.frame.middle');
    var rightDiv = this.subElm('.frame.right');

    this.subElm('.frame').removeClass('left middle right');

    if(direction == 'right'){

      midDiv.addClass('animate');
      leftDiv.addClass('animate');

      rightDiv.addClass('left');
      midDiv.addClass('right');
      leftDiv.addClass('middle');

    }
    else if(direction == 'left'){

      midDiv.addClass('animate');
      rightDiv.addClass('animate');

      rightDiv.addClass('middle');
      midDiv.addClass('left');
      leftDiv.addClass('right');

    }

    var t = setTimeout(function(){
      self.subElm('.frame').removeClass('animate');

      var r = setTimeout(function(){
        self.swipeReady = true;
        self.preloadOffscreenDivs();
      }, 100);
    }, 1000);

  },

  swipeTutorial: function(){
    var self = this;

    this.subElm('.swipe-container .hand').css({left:1180});
    this.subElm('.swipe-container').transition({opacity:1},750, function(){
      self.subElm('.swipe-container .hand').transition({opacity:1},1000, function(){
        self.subElm('.swipe-container .hand').transition({left:520},1500, function(){

          self.subElm('.swipe-container').transition({opacity:0},500, function(){
            self.initComponent();
          });

        });
      });
    });

  },

  initComponent: function(){
    this.swipeReady = true;
    this.subElm('.frame.middle .container').css({top:0});
    this.button.element.css({opacity:1});
    this.button.drawingReady = true;
  },

  preloadOffscreenDivs:function(){
    var itemLeft = this.data[this.indexLeft];
    var itemRight = this.data[this.indexRight];

    this.subElm('.left .content').css({'background-image': 'url(' + itemLeft + ')'});
    this.subElm('.left .background').css({'background-color': this.colours[this.indexLeft]});

    this.subElm('.right .content').css({'background-image': 'url(' + itemRight + ')'});
    this.subElm('.right .background').css({'background-color': this.colours[this.indexRight]});
  },

  proceed:function(){

  },

  init: function(){
    var self = this;
    this.button = null;

    this.button = CircularButton.create({
      image: '/apple/images/5-explore-color/back-grey.png',
      circleClass:'circle-back',
      textClass:'text-start',
      text:' ',
      source:self.buttonAttr.source,
      arcAttributes:{r:100, x:100, y:100, rotation:220, scope:360, max:280, thickness:20 , wallThickness:7},
      speed:3,

      dynamicPositioning:false,
      textOffset:{before:"0px,0px", after:"0px,70px", x:0, y:15},

      scale:0.65,
      scaleOffset:{x:336, y:378},
      containerColour: '#989898',
      proceed:function(){
        self.proceed();
      },

    });

    this.addComponent(this.button);

  },

});
