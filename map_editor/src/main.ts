
import * as fs from 'fs';



function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;

    return mapData;
}

function writeFlie() {
    var map_path = __dirname + "/map.json";
    var obj = JSON.stringify({map:mapData});
    var jfkj = fs.writeFileSync(map_path,obj,"utf-8");
    
    

}

function createMapEditor() {

    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);

            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;

}


function onTileClick(tile: editor.Tile) {

    var tileWalkable = mapData[tile.ownedRow][tile.ownedCol];
    if(tileWalkable == 1){
        tileWalkable = 0;
    }
    else if(tileWalkable == 0){
        tileWalkable = 1;
    }
    mapData[tile.ownedRow][tile.ownedCol] = tileWalkable;
    tile.setWalkable(tileWalkable);

}

var container = new render.DisplayObjectContainer();
var button = new render.Rect();
container.addChild(button);
button.x = 300;
button.y = 100;
button.width = 100;
button.height = 50;
button.color = "#0080FF";

var textButton = new render.TextField();
container.addChild(textButton);
textButton.text = "保存";
textButton.x = 330;
textButton.y = 110;

function onButtonClick(button:render.Rect) {
    writeFlie();
    console.log("click");
}


var mapData = readFile();

var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
eventCore.register(button,events.displayObjectRectHitTest,onButtonClick);

var editor = createMapEditor();
container.addChild(editor);
renderCore.start(container);



