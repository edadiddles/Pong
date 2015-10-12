function Computer() {
    this.threshold = 50;
}

Computer.prototype = new Paddle();

Computer.prototype.update = function() {
    if(this.pos.y < 0)
        this.pos.y = 0;
    if(this.pos.y > canvas.height - this.height())
        this.pos.y = canvas.height - this.height();


    if(this.pos.y + this.height()/2 > ball.pos.y + this.threshold)
        this.pos.y -= 10;

    if(this.pos.y + this.height()/2 < ball.pos.y - this.threshold)
        this.pos.y += 10;
         
}
