/*//新建AudioContext对象
function audioContextCheck() {
    if (typeof AudioContext !== "undefined") {
        return new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        return new webkitAudioContext();
    } else if (typeof mozAudioContext !== "undefined") {
        return new mozAudioContext();
    } else {
        console.info("The Web Audio API is unavailable");
        return null;
    }
}

//单击播放语音事件
function soundClick(obj) {
    console.info("obj=" + obj);
    var soundUrlArr = obj.href.split("#"); //字符分割
    console.info("soundUrlArr=" + soundUrlArr);
    var soundUrl = soundUrlArr[1];
    console.info("soundUrl=" + soundUrl);
    //创建一个 AudioContext
    var context = audioContextCheck();
    if (context == null) {
        alert('您的浏览器不支持 Web Audio API');
        return;
    }
    //一个新的 XHR 对象
    var xhr = new XMLHttpRequest();
    //请求语音数据
    xhr.open('GET', soundUrl, true);
    //设置响应类型为字节流arraybuffer
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        context.decodeAudioData(xhr.response, function (buffer) {
            console.log("语音数据: %o", xhr.response);
            console.log("语音大小: " + xhr.response.byteLength);
            //播放语音
            playSound(buffer);
        });
    };
    xhr.send();

    //播放语音
    function playSound(buffer) {
        var source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer;                    // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);                           // play the source now
        // note: on older systems, may have to use deprecated noteOn(time);
    }
}*/


//切换播放audio对象
function onChangePlayAudio(obj) {
    if(curPlayAudio){
        if(curPlayAudio!=obj){
            curPlayAudio.currentTime=0;
            curPlayAudio.pause();
            curPlayAudio=obj;
        }
    }else{
        curPlayAudio=obj;
    }
    //console.info("obj=" + obj);
}



