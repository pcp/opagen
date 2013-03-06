// @license = public domain

// =Usage
// Number = Xorshift.random();
// 
// var xor128 = Xorshift.init();
// Array = xor128.make(1000000);

(function() {

//var floor = Math.floor,
//    random = Math.random;

// Xorshift Class
function Xor128(x,   // @param Number:
                y,   // @param Number:
                z,   // @param Number:
                w) { // @param Number:
    this.x = (x ? x >>> 0 : 123456789);
    this.y = (y ? y >>> 0 : 362436069);
    this.z = (z ? z >>> 0 : 521288629);
    this.w = (w ? w >>> 0 : 88675123);
}


function Xor128_init() {
    //return new Xor128(floor(random() * 1000000000000));
    return new Xor128(Date.now());
}
Xor128.init = Xor128_init;


function next() { // @return Number:
    var me = this, x = me.x, w = me.w,
        t = x ^ (x << 11);
    
    me.x = me.y = me.z = w;
    return me.w = (w ^ (w >> 19)) ^ (t ^ (t >> 8));
}
Xor128.prototype.next = next;


function make(cnt) { // @param Number:
                     // @return Array[Number]:
    var i = 0, result = [];
    
    for (; i < cnt; ++i) {
        result[i] = this.next();
    }
    return result;
}
Xor128.prototype.make = make;


function Xor128_random() {
    return Xor128_init().make(3)[2] / 4294967296 * 2;
}
Xor128.random = Xor128_random;


Xorshift = Xor128;

})();
