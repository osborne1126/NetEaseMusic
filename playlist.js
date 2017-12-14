
//简介icon-down显示隐藏
var $pltagsIntro = $('#pltagsIntro');
var $plToggleSvg = $('#pltagsToggle > svg')
$($pltagsIntro).click(function(){
    $pltagsIntro.toggleClass('plIntroHide')
    $plToggleSvg.toggleClass('flipy')
});  


//从leancloud获取歌单列表
let $olplSongs = $('ol#plsongs')
var queryplaylist = new AV.Query('Song');
var cql = 'select * from Song'; /* where hot != true';*/
AV.Query.doCloudQuery(cql).then(function (data) {
  $('#loading').remove()    //数据加载成功后loading移除 
      var results = data.results;
      for( var i = 0; i < results.length; i++){
        let song = results[i].attributes
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
                        <use xlink:href="#icon-play-circled"></use>
                    </svg>
                </div>
            </a>
        </li>
        `
    $olplSongs.append(li)
    }
}, function (error) {
console.log('获取最新音乐出错')
});


//从地址栏获取当前歌单
function getParameterByName(name,url){
        if(!url) url = window.location.href;
        name = name.replace(/[\[\]]/g,"\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if(!results) return null;
        if(!results[2]) return ' ';
        return decodeURIComponent(results[2].replace(/\+/g," "));
    }

    let id = getParameterByName('id');
    var $fromCover = $('#fromCover')
    var $plTopbg = $('#plTopbg')
    var $fromTitle = $('#fromTitle')
    var query123 = new AV.Query('Playlist');
    query123.get(id).then(function (song) {
        let {url,musicListName,avatar,uploader,volume} = song.attributes
        let cover = `
            <div class="superscript">歌单</div>
            <div class="amount">
                <svg class="icon icon-listen" aria-hidden="true">
                    <use xlink:href="#icon-listen"></use>
                </svg>
               <span>${volume}</span>
            </div>
            <img src="${url}" alt="歌单封面">
        `
        let bg = `
            <div class="plTopbg" style="background:url(${url}) no-repeat;"></div>
        `
        let fromtitle = `
            <h2>${musicListName}</h2>
            <div class="avatar">
                <a href="#">
                    <img src="${avatar}" alt="上传者头像">
                    <span>${uploader}</span>
                </a>
            </div>
        `
        $fromCover.append(cover)
        $plTopbg.append(bg)
        $fromTitle.append(fromtitle)
    }, function (error) {
        alert('出错了')
    });
