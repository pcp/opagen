  function generate_index(seed, index){
    var m = new MersenneTwister(Whirlpool(seed));
    return Math.floor( m.random()*index);
  }
  function generate_index(seed, index){
    var m = new MersenneTwister(Whirlpool(seed));

    return Math.floor( m.random()*index);
    
  //  ran = generate_index(generate_unique_userident());

    //return Math.floor(MersenneTwister(Whirlpool(seed)).random()*index);
  }

  function generate_index2(count /*@param size of index*/
                    ){
    var hash = Whirlpool(generate_unique_userident());
    var from = Math.floor(Math.random()*(hash.length-8));
    var random_number = parseInt(hash.substr(from, 8), 16);
    var index = random_number % count;
    return Math.floor((index < 0) ? index * -1 : index);
  }
  

function test(index, count){
    var index_list = [];
    $('#debug').append('Whirlpool wtf<br />');
    for(i = 0; i < index; i++){
      index_list[i] = 0;
    }
    for(i = 0; i < count; i++){
      index_list[generate_index2(index)]++;
      //$('#debug').append('randnum:'+random_number+' index:'+index+'<br />');
    }
    var s = 0;
    for(i = 0; i < index; i++){
      p = (100*index_list[i])/count;
      s += index_list[i]*p;
      $('#debug').append('i:'+i+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ index_list[i] +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ p  +'%<br />');
    }    
    $('#debug').append('Meridian:'+s/count+'%<br />');
  }
  function test2(index, count){
    var index_list = [];
    $('#debug').append('MersenneTwister<br />');
    for(i = 0; i < index; i++){
      index_list[i] = 0;
    }
    var m = new MersenneTwister(Whirlpool(generate_unique_userident()));
    for(i = 0; i < count; i++){
      ran = generate_index(generate_unique_userident());
      index_list[ran]++;
      //$('#debug').append('randnum:'+random_number+' index:'+index+'<br />');
    }
    var s = 0;
    for(i = 0; i < index; i++){
      p = (100*index_list[i])/count;
      s += index_list[i]*p;
      $('#debug').append('i:'+i+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ index_list[i] +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ p  +'%<br />');
    }
    $('#debug').append('Meridian:'+s/count+'%<br />');
  }
