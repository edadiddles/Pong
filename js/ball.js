function Ball() = function() {
    this.pos = new Vector;

    this.vel = new Vector;

    this.img = new Image;  
}

Ball.prototype.setPosition = function(x,y,z) {
    this.pos.x = typeof x !== 'undefined' ? pos.x: null;
    this.pos.y = typeof y !== 'undefined' ? pos.y: null;
    this.pos.z = typeof z !== 'undefined' ? pos.z: null;
}

Ball.prototype.setVelocity = function(x,y,z) {
    this.vel.x = typeof x !== 'undefined' ? vel.x: null;
    this.vel.y = typeof y !== 'undefined' ? vel.y: null;
    this.vel.z = typeof z !== 'undefined' ? vel.z: null;
}

Ball.prototype.setImage = function(src) {
    this.img.src = typeof src !== 'undefined' ? img.src: null;
}

Ball.prototype.update = function() {
    var v = this.vel.multiply(   1/60   );
    this.pos = this.pos.add(v);
}

Ball.prototype.draw() = function() {}
