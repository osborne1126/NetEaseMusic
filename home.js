//tabs切换
  $('.tabs').on('click','li', function(e){  
  	//console.log(1)
   	let $li = $(e.currentTarget)  //被点击的元素，监听的元素，就是我要的元素
   	let index = $li.index()  //获取下标
   	$li.addClass('active').siblings().removeClass('active')  //点击的元素添加active,其他所有邻居移除active
   	$('.tab-content').children().eq(index)
   	   .addClass('active').siblings().removeClass('active')  //在.tab-content 孩子元素中查找对应的元素，添加active，其他所有邻居元素移除active
   })



/*    av初始化，已复制在av.js中被引用
var APP_ID = '7luz4eKHS2G2BKH25SbReBFD-gzGzoHsz';
var APP_KEY = 'WQXU6aT2rRBIwtB8Ki5x8KdC';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
}); */




//leancloud 获取最新音乐
let $olSongs = $('ol#songs')
var query = new AV.Query('Song');
/*query.find().then(function (results) {   //比较查询 之前用的
  //console.log(results)  */
var cql = 'select * from Song';/* where hot = true';*/   //CQL 查询
  AV.Query.doCloudQuery(cql).then(function (data) {
    
 	$('#loading').remove()    //数据加载成功后loading移除 
    var results = data.results;   // results 即为查询结果，它是一个 AV.Object 数组
    for(var i=0; i<results.length;i++){
 		//console.log(results[i].attributes)
 		let song = results[i].attributes
 		let li = `
  		
    <li>
  		<a href="./song.html?id=${results[i].id}"> 
				<h3>${song.name}
           <span>${song.reMark}</span>
        </h3>
				<p>
					<svg class="icon icon-sq">
						<use xlink:href="#icon-sq"></use>
					</svg>
					${song.singer} - ${song.album}
				</p>
				<a class="playButton" href="#">
					<svg class="icon icon-play">
            <use xlink:href="#icon-play-circled"></use>
          </svg>
        </a>
      </a>
		</li>

	   	`
 		  $olSongs.append(li)
    	}
 	  }, function (error) {
 	  	alert('获取最新音乐失败')
  });


/* //上传歌曲
var SongObject = AV.Object.extend('Song');  //选择表名
var songObject = new SongObject();   //生成一条数据
songObject.save({
  name: '80000' ,  //数据里面的内容
  singer: 'PRC巴音汗',
  url:'http://oz3p5w9wm.bkt.clouddn.com/80000.mp3'
}).then(function(object) {
  alert('保存成功!');
}) */


 /*//上传歌单
var PlaylistObject = AV.Object.extend('Playlist');  //选择表名
var playlistObject = new PlaylistObject();   //生成一条数据
playlistObject.save({
  musicListName: '「华语」哭泣使人乞讨，思念使人奔跑' ,  //数据里面的内容
  volume: '48.3万',
  url:'http://p1.music.126.net/3LbMYwTiQD5U3MCSgDPgdA==/109951163035317628.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp'
}).then(function(object) {
  alert('保存成功!');
}) */



// leancloud 获取推荐歌单
  let $olPlaylists = $('ol#playlists')
  var query66 = new AV.Query('Playlist');
  query66.find().then(function (results) {
    $('#loading').remove()    //数据加载成功后loading移除 
    for( var i = 0; i < results.length; i++){
      let musicList = results[i].attributes
      let li = `
      <li>
      <a href="./playlist.html?id=${results[i].id}">
          <div class="cover">
              <img src="${musicList.url}" alt="封面">
            <div class="amount">
                <svg class="icon icon-listen" aria-hidden="true">
                  <use xlink:href="#icon-listen"></use>
                </svg>
              <span>${musicList.volume}</span>
            </div>
          </div>
          <p>${musicList.musicListName}</p>
      </a>
      </li>
      `
      $olPlaylists.append(li)
    }
  }, function (error) {
    alert('获取歌单失败')
  });



  // leancloud 获取热门音乐排行
  let $olhotSongs = $('ol#hotsongs')
  var queryhot = new AV.Query('Song');
  var cqltrue = 'select * from Song ';/*where hot = true';*/
  AV.Query.doCloudQuery(cqltrue).then(function (data) {
    $('#loading').remove()    //数据加载成功后loading移除 
    var results = data.results;
    // let array = results;
    for( var i = 0; i < results.length; i++){
      let song = results[i].attributes
      if(i<3){
        let li = `
        <li>
          <a href="./song.html?id=${results[i].id}">
            <div class="num hotnum">${[i+1]}</div>
            <h3>
               ${song.name}
               <span>${song.reMark}</span>
            </h3>
            <p>
               <svg class="icon icon-sq" aria-hidden="true">
                  <use xlink:href="#icon-sq"></use>
                </svg>
              ${song.singer} - ${song.album}
            </p>
            <div class="playButton" href="#">
              <svg class="icon icon-play" aria-hidden="true">
                 <use  xlink:href="#icon-play"></use>
              </svg>
            </div>
          </a>
        </li>
      `
      $olhotSongs.append(li)
      }else{
        let li = `
        <li>
          <a href="./song.html?id=${results[i].id}">
            <div class="num">${[i+1]}</div>
            <h3>
               ${song.name}
               <span>${song.reMark}</span>
            </h3>
            <p>
              <svg class="icon icon-sq" aria-hidden="true">
                 <use xlink:href="#icon-sq"></use>
              </svg>
              ${song.singer} - ${song.album}
            </p>
            <div class="playButton" href="#">
              <svg class="icon icon-play" aria-hidden="true">
               <use  xlink:href="#icon-play"></use>
              </svg>
            </div>
          </a>
        </li>
      `
      $olhotSongs.append(li)
      }
    }
  }, function (error) {
    alert('获取热门歌曲失败')
  });





// leancloud 获取搜索结果
let timer=null

$('input#search').on('input',function(e){    //搜索监听
	if (timer){            //搜索设置闹钟 
	window.clearTimeout(timer)
	}
	timer = setTimeout(function(){
	   //console.log('时间到')
	    timer=null      //

	let $input = $(e.currentTarget)
	let value = $input.val().trim()  //trim有空格删掉
	//console.log(value)
	if(value===''){return $('#searchResult').empty()}    //value为空时不搜索
	var query1 = new AV.Query('Song');
    query1.contains('name', value);
    var query2 = new AV.Query('Song')
    query2.contains('singer', value);
    var query = AV.Query.or(query1,query2)
    query.find().then(function(results){
    	//console.log(result)
    	//console.log(results)
    	$('#searchResult').empty()    //清空上次显示结果
    	if(results.length === 0){
    		//console.log(1)
    		$('#searchResult').html('没有结果')
    	}else{
    		//console.log(2)
    		for(var i=0;i<results.length;i++){
    			let song = results[i].attributes
    			//console.log(song)
    			let li = `
    			  <li data-id="${results[i].id}">
                <svg class="icon" aria-hidden="true">
                   <use xlink:href="#icon-search"></use>
                </svg>
    			    <a href="./song.html?id=${results[i].id}">
    			       ${song.name} - ${song.singer}
    			    </a>
    			  </li>
    			`
    			$('#searchResult').append(li)
    		}	
    	}
    })

	},400) 
	
})


/*
//热门搜索
  $('.hotSearchItem').on('click', function (e) {
    let text = e.target.innerText
    
  })
*/



 //搜索效果
    var $searchValue = $('#search')
    var $searchCont = $('#searchCont') 
    var $searchContSpan = $('#searchCont > span')
    var holder = $('label.holder')
    var hotSearch = $('section#hotsearch')
    var searchClose = $('#searchclose')
    $($searchValue).on("input", function(){ 
      $searchContSpan.text($searchValue.val())
        holder.addClass('hide');
        $searchCont.removeClass('hide');
        hotSearch.removeClass('actiove').addClass('hide');
        searchClose.removeClass('hide');
        if($searchValue.val().length===0){
          searchEmpty()
        }
    })
    $(searchClose).on("click", function(){
      searchEmpty()
     })
     function searchEmpty(){
      $searchValue.val("");
      holder.removeClass('hide');
      $searchCont.addClass('hide');
      hotSearch.removeClass('hide').addClass('actiove');
      searchClose.addClass('hide');
      $('#searchResult').empty()
     }


