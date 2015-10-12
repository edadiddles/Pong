function Ball() {
    this.pos = new Vector;

    this.vel = new Vector;

    this.img = new Image;

    this.maxVelocity = 3500; 
}

Ball.prototype.setPosition = function(x,y,z) {
    this.pos.x = typeof x !== 'undefined' ? x : null;
    this.pos.y = typeof y !== 'undefined' ? y : null;
    this.pos.z = typeof z !== 'undefined' ? z : null;
}

Ball.prototype.setVelocity = function(x,y,z) {
    this.vel.x = typeof x !== 'undefined' ? x : null;
    this.vel.y = typeof y !== 'undefined' ? y : null;
    this.vel.z = typeof z !== 'undefined' ? z : null;
}

Ball.prototype.setImage = function(src) {
    this.img.src = typeof src !== 'undefined' ? src : null;
}

Ball.prototype.reset = function() {
    var angle = Math.random() * Math.PI;

    if(angle < Math.PI/2)
        angle -= Math.PI/4;
    else
        angle += Math.PI/4;

    this.setPosition(board.width/2, board.height/2);
    this.setVelocity(1000 * Math.cos(angle), 1000 * Math.sin(angle));
}

Ball.prototype.diameter = function() {
    return this.img.height;
}

Ball.prototype.update = function() {
    var v = this.vel.multiply(1/maxFPS);
    this.pos = this.pos.add(v);


    // Collision with paddles
    if(this.pos.x < player.width() && (this.pos.y + this.diameter()/2 >= player.pos.y && this.pos.y + this.diameter()/2 < player.pos.y + player.height()))
        this.vel.x *= -1.05;
    
    if(this.pos.x + this.diameter() > computer.pos.x && (this.pos.y + this.diameter()/2 >= computer.pos.y && this.pos.y + this.diameter()/2 <= computer.pos.y + player.height()))
        this.vel.x *= -1.05;


    // Score
    if(this.pos.x < 0)
        this.reset();

    if(this.pos.x + this.diameter() > board.width)
        this.reset();


    // Collision with walls
    if(this.pos.y < 0)
         this.vel.y *= -1;

    if(this.pos.y + this.diameter() > board.height)
        this.vel.y *= -1;


    // Set maximum velocity
    if(this.vel.mag() > this.maxVelocity)
       this.setVelocity(this.maxVelocity * Math.cos(this.vel.angle()), this.maxVelocity * Math.sin(this.vel.angle()));
        
}

Ball.prototype.draw = function(ctx) {
   ctx.drawImage(this.img, this.pos.x, this.pos.y) 
}
