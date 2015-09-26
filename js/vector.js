function Vector(x, y, z) {
    this.x = typeof x !== 'undefined' ? x: null;
    this.y = typeof y !== 'undefined' ? y: null;
    this.z = typeof z !== 'undefined' ? z: null;
}

Vector.prototype.mag = function() {
    return Math.sqrt( this.dot(this) );
}

Vector.prototype.add = function(vec) { 
    var x = this.x + vec.x; 
    var y = this.y + vec.y;
    var z = this.z + vec.z;
    
    return new Vector(x, y, z);
}

Vector.prototype.subtract = function(vec) {
    return this.add( vec.multiply(-1) );
}

Vector.prototype.dot = function(vec) {
    return ( (this.x * vec.x) + (this.y * vec.y) + (this.z * vec.z) );
}

Vector.prototype.cross = function(vec) {
    var x = (this.y * vec.z) - (this.z * vec.y);
    var y = (this.z * vec.x) - (this.x * vec.z);
    var z = (this.x * vec.y) - (this.y * vec.x);

    return new Vector(x, y, z);
}

Vector.prototype.multiply = function(scalar) {
    var x = scalar * this.x;
    var y = scalar * this.y;
    var z = scalar * this.z;

    return new Vector(x, y, z);
}
