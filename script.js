var globalX = window.innerWidth/2;
var globalY = window.innerHeight/2;
let testCube;
function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    testCube = new cube();
}

function draw(){
    background(50);

    fill(255, 0, 0);
    rect(globalX, globalY, 5, 5);

    
    testCube.draw();
    testCube.setPosition(mouseX - globalX, -mouseY + globalY);
}

class cube{
    //global position
    x = 100;
    y = 100;

    //size
    width = 100;
    height = 100;
    depth = 100;

    parallaxFactor = 0.001;

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }    

    setSize(x, y, z){
        this.width = x;
        this.height = y;
        this.depth = z;
    }

    draw(){
        //calculate distance from center of screen
        let deltaX = globalX + this.x;
        let deltaY = globalY - this.y;        
        fill(200);
        if(this.y > 0){
            this.drawTopWall(deltaX, deltaY);
        }
        else{
            this.drawBottomWall(deltaX, deltaY);
        }
        if(this.x > 0){
            this.drawRightWall(deltaX, deltaY);
            this.drawLeftWall(deltaX, deltaY);
        }
        else{
            this.drawLeftWall(deltaX, deltaY);
            this.drawRightWall(deltaX, deltaY);
        }
        if(this.y > 0){
            this.drawBottomWall(deltaX, deltaY);
        }
        else{
            this.drawTopWall(deltaX, deltaY);
        }        
        
        //draw roof
        fill(255);
        rect(deltaX - this.width/2, deltaY - this.height/2, this.width, this.height);


        //draw center dot for debug
        fill(255, 0, 0);
        rect(deltaX, deltaY, 1, 1);
    }

    drawTopWall(deltaX, deltaY){
        //draw top
        quad(
            deltaX - this.width/2,                              deltaY - this.height/2,
            deltaX - this.width/2 - (this.depth * this.x*this.parallaxFactor), deltaY - this.height/2 + (this.depth * this.y*this.parallaxFactor),
            deltaX + this.width/2 - (this.depth * this.x*this.parallaxFactor), deltaY - this.height/2 + (this.depth * this.y*this.parallaxFactor),
            deltaX + this.width/2,                              deltaY - this.height/2,
            );
    }
    drawBottomWall(deltaX, deltaY){
        //draw bottom
        quad(
            deltaX - this.width/2,                              deltaY + this.height/2,
            deltaX - this.width/2 - (this.depth * this.x*this.parallaxFactor), deltaY + this.height/2 + (this.depth * this.y*this.parallaxFactor),
            deltaX + this.width/2 - (this.depth * this.x*this.parallaxFactor), deltaY + this.height/2 + (this.depth * this.y*this.parallaxFactor),
            deltaX + this.width/2,                              deltaY + this.height/2,
            );            
    }
    drawLeftWall(deltaX, deltaY){
        //draw left side
        quad(
            deltaX - this.width/2,                              deltaY + this.height/2, 
            deltaX - this.width/2 - (this.depth * this.x*this.parallaxFactor), deltaY + this.height/2 + (this.depth * this.y*this.parallaxFactor),
            deltaX - this.width/2 - (this.depth * this.x*this.parallaxFactor), deltaY - this.height/2 + (this.depth * this.y*this.parallaxFactor),
            deltaX - this.width/2,                              deltaY - this.height/2
            );
    }
    drawRightWall(deltaX, deltaY){
        //draw right side
        quad(
            deltaX + this.width/2,                              deltaY + this.height/2, 
            deltaX + this.width/2 - (this.depth * this.x*this.parallaxFactor), deltaY + this.height/2 + (this.depth * this.y*this.parallaxFactor),
            deltaX + this.width/2 - (this.depth * this.x*this.parallaxFactor), deltaY - this.height/2 + (this.depth * this.y*this.parallaxFactor),
            deltaX + this.width/2,                              deltaY - this.height/2 
            );
    }
}