//如何获取id
	function getParameterByName(name,url){     
		if(!url) url = window.location.href;
		name = name.replace(/[\[\]]/g,"\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if(!results) return null;
		if(!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g," "));
	}


//播放暂停歌曲
    let /*var*/ id = getParameterByName('id');
    //console.log(id)
  var query = new AV.Query('Song');    //看文档获取歌曲id
  query.get(id).then(function (song) {           //zuihou ()
  	//console.log(song)
  	let {url,name,lyric,cover} = song.attributes   //播放歌曲,歌词
  	$('.song-description > h1').text(name)   //歌名引入到<h1>标签   ////
  	let video = document.createElement('video')
  	video.src = url
  
  video.oncanplay=function(){    //页面加载后自动播放
  	video.play()    //媒体api 播放歌曲
		//console.log(lyric)
		$('.circle ').addClass('playing')  //添加旋转cd动画
    // $('.needle').addClass('play') 
	}

	$('.icon-pause').on('touchstart',function(){    //当暂停时音乐停止
		  video.pause()
			$('.circle ').removeClass('playing')
			//$('.needle').removeClass('play')
	})
	$('.icon-play').on('touchstart',function(){    //点击播放从新播放
		  video.play()
			$('.circle ').addClass('playing')
			//$('.needle').addClass('play')
	}) 
	    
  	
    
 	//let hash = {}
  	let array = []            //分析歌词，获取
  	let parts = lyric.split('\n')      
  	parts.forEach(function(string,index){    //旧方法for(var i=0;i<parts.length)	//console.log(string)
  		let xxx = string.split(']')
  		//console.log(xxx)
  		xxx[0] = xxx[0].substring(1)
  		//console.log(xxx)
  		let regex = /(\d+):([\d.]+)/      //用正则把时间转换为秒
  		let matches = xxx[0].match(regex)
  		let minute = +matches[1]
  		let seconds = +matches[2]

  		array.push({
  			time:minute*60+seconds,
  			lyric:xxx[1]
  		})
  	})
  	//console.log(parts)
  	//console.log(array)



//从leancloud 获取当前页面歌曲数据
   let id = getParameterByName('id');/**/

var $deSname = $("#des-name");
var $playCover = $("#playCover");
var $pagebg = $("#pagebg");
var querysong = new AV.Query("Song");
query.get(id).then(
  function(song) {
    let { name, singer, cover } = song.attributes;
    let h2 = `
        <span>${name}</span>
        <span>-</span>
        <small>${singer}</small>
              `
    let img = `
        <img src="${cover}" alt="封面">
              `
    let bg = `
        <div class="pagebg" style="background:url(${cover}) no-repeat center;"></div> 
              `

    $deSname.append(h2);
    $playCover.append(img);
    $pagebg.append(bg);
  },
  function(error) {
    alert("获取歌曲失败");
  }
);


//把歌词添加到页面上
   let $lyric = $('.lyric')     //歌词引入到<p>标签
    array.map(function(object){
      if(!object){return} 
      let $scroll = $(".scroll");   //
      let $p = $('<p/>')     
      $p.attr('data-time', object.time).text(object.lyric)
      /*//$p.appendTo($lyric.children('.lines'))*/
      $p.appendTo($scroll)
    })


  	setInterval(function(){    //匹配时间
  		//console.log(video.currentTime)
      let $scrolls = $(".scroll>p");   //
  		let current = video.currentTime
      let $whichLine;      //
  		for(let i=0;i<array.length;i++){
        let currentLineTime = $scrolls.eq(i).attr("data-time");
        let nextLineTime = $scrolls.eq(i + 1).attr("data-time");
  			if(i === array.length - 1){
  				//console.log(array[i].lyric)
          $whichLine = $scrolls.eq(i);
  			}else
  			 /*//if(array[i].time <= current && array[i+1].time > current){ */
          if(array[i + 1] != undefined && currentLineTime <= current && nextLineTime > current){ 
  				      //console.log(array[i].lyric)   /*打印歌词 */
          $whichLine = $scrolls.eq(i);
  				break;
  			}
  		}


    if($whichLine){    //歌词滚动
			$whichLine.addClass('active').prev().removeClass('active')  //当前歌词高亮
			let top = $whichLine.offset().top
			let scrollTop = $('.scroll').offset().top
      let delta = top - scrollTop - $('.lyric').height()/3 
			$('.scroll').css('transform',`translateY(-${delta}px)`)
	    }

  	},500)

  })
    