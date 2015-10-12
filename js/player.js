function Player() {
    document.onmousemove = this.mouseEvent.bind(this);
}

Player.prototype = new Paddle();

Player.prototype.mouseEvent = function(event) {
    this.pos.y = event.clientY - this.height()/2;

    if(this.pos.y < 0)
        this.pos.y = 0;

    if(this.pos.y > canvas.height - this.height())
        this.pos.y = canvas.height - this.height();
}
