/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;
 
    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0,50,50);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {

    render(context: CanvasRenderingContext2D) {
        context.font = "20px Arial";
        context.fillStyle = '#000000';
        context.fillText('120', 0, 20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 50;
rect.height = 300;
rect.color = '#00FF00'
rect.x = 100;
rect.y = 170;

var rect2 = new Rect();
rect2.width = 50;
rect2.height = 70;
rect2.x = 100;
rect2.y = 0;
rect2.color = '#00FF00'

var rect3 = new Rect();
rect3.width = 50;
rect3.height = 150;
rect3.x = 300;
rect3.y = 0;
rect3.color = '#00FF00'

var rect4 = new Rect();
rect4.width = 50;
rect4.height = 150;
rect4.x = 300;
rect4.y = 250;
rect4.color = '#00FF00'

var text = new TextField();
text.x = 200;
text.y = 50;
var bitmap = new Bitmap();
bitmap.source = 'bird.jpg';
bitmap.x = 200;
bitmap.y = 100;

//渲染队列
var renderQueue = [rect, rect2,rect3,rect4,text,bitmap];
//资源加载列表
var imageList = ['bird.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


