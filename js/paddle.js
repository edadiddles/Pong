function Paddle() {
    this.pos = new Vector;
    
    this.img = new Image;
}

Paddle.prototype.setPosition = function(x,y,z) {
    this.pos.x = typeof x !== 'undefined' ? x : null;
    this.pos.y = typeof y !== 'undefined' ? y : null;
    this.pos.z = typeof z !== 'undefined' ? z : null;
}

Paddle.prototype.setImage = function(src) {
    this.img.src = typeof src !== 'undefined' ? src : null;
}

Paddle.prototype.height = function() {
    return this.img.height;
}

Paddle.prototype.width = function() {
    return this.img.width;
}

Paddle.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, this.pos.x, this.pos.y);
}
