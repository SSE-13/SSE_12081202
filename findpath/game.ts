module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
        }
        render(context: CanvasRenderingContext2D) {
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                     if(this.grid.getNode(i,j).walkable == false){
                        context.fillStyle = '#000000'; 
                     }
                     if(this.grid.getNode(i,j).walkable == true){
                        context.fillStyle = '#0000FF';
                     }
                       context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                       context.strokeRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                       
                }
            }
                       context.closePath();
        }

    }

    export class BoyShape extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {

        public path
        public step=1;
        public width=GRID_PIXEL_WIDTH;
        public height=GRID_PIXEL_HEIGHT;
        
        public run(grid:astar.Grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            this.path = findpath._path;
            this.x=grid.startNode.x*this.width;
            this.y=grid.startNode.y*this.height;    
            console.log(this.path);
            console.log(grid.toString());
        }

        public onTicker(duringTime) {
          
            var targetx = this.path[this.step].x * this.width;
            var targety = this.path[this.step].y * this.height;
              if (this.x < targetx) {
                 if (this.x + this.vx * duringTime < targetx){                      
                     this.x= this.x + this.vx * duringTime;
                 }
                 else{
                     this.x=targetx;
                     }
              }
              if (this.y < targety) {
                  if (this.y + this.vy * duringTime < targety) {
                      this.y=this.y + this.vy * duringTime;
                 }
                 else{                      
                     this.y= targety ;
                     } 
              }
              if (this.x == targetx && this.y == targety) {
                  this.step += 1;
              }
          
        console.log(this.x,this.y,this.step);
        }
    }
}




var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);


var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);