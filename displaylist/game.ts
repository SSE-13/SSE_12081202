module game {


}

var human = new render.DisplayObjectContainer();
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var trunk = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();


head.source = "head.png";
trunk.source = "trunk.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";

humanContainer.addChild(human);
human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(head);
human.addChild(trunk);

var renderCore = new render.RenderCore();

renderCore.start(human, [
    "head.png", 
    "trunk.png",
    "left_arm.png",
    "right_arm.png", 
    "left_leg.png", 
    "right_leg.png"
    ]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x += this.vx*duringTime;
         this.rotation += Math.PI;

    }
}

var ticker = new Ticker();
var body = new HumanBody(human);
body.vx = 10;
body.y = 200; 
ticker.start([body]);
