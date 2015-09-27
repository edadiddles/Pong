function Ball() {
    this.pos = new Vector;

    this.vel = new Vector;

    this.img = new Image;  
}

Ball.prototype.setPosition = function(x,y,z) {
    this.pos.x = typeof x !== 'undefined' ? x: null;
    this.pos.y = typeof y !== 'undefined' ? y: null;
    this.pos.z = typeof z !== 'undefined' ? z: null;
}

Ball.prototype.setVelocity = function(x,y,z) {
    this.vel.x = typeof x !== 'undefined' ? x: null;
    this.vel.y = typeof y !== 'undefined' ? y: null;
    this.vel.z = typeof z !== 'undefined' ? z: null;
}

Ball.prototype.setImage = function(src) {
    this.img.src = typeof src !== 'undefined' ? src: null;
}

Ball.prototype.update = function() {
    var v = this.vel.multiply(   1/60   );
    this.pos = this.pos.add(v);
}

Ball.prototype.draw = function(ctx) {
   ctx.drawImage(this.img, this.pos.x, this.pos.y) 
}
