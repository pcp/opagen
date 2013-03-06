/*!
* passgen.js by @blog_man
* Copyright 2013 Patric Pendelin
* http://www.apache.org/licenses/LICENSE-2.0.txt
*
* =Usage
* passwort[] = Passgen(seed).generate();
* passwort[] = Passgen.generate();
*
*/
;(function(){

var Hash = Whirlpool,
    random = Math.random,
    floor = Math.floor,
    seed = 'dfsdf4ew5r347543c89w()78tn565 ref3gcxr=)X)R$)%RZ37g3w';

/*
 XKCDPassgen Class
*/
function XKCDPassgen(seed){ // @param String
  this.seed = (seed ? seed : this.seed);
}

function passgen_get_hash(seed){ // @param String:
                                 // @return Hashstring:
  return Hash(seed);
}
XKCDPassgen.prototype.get_hash = passgen_get_hash;

function passgen_generate_index(count // @param size of index:
                    ){
  var hash = passgen_get_hash(this.seed);
  var from = floor(random()*(hash.length-8));
  var random_number = parseInt(hash.substr(from, 8), 16);
  var index = random_number % count;
  return floor((index < 0) ? index * -1 : index);
}
XKCDPassgen.prototype.random = passgen_generate_index;

function passgen_generate(word_list){
  var password = [];
  for(i = 0; i < 4; i++){
    password.push(word_list[passgen_generate_index(word_list.length)]);
  }
  return password;
}
XKCDPassgen.prototype.generate = passgen_generate;

Passgen = XKCDPassgen;

})();
