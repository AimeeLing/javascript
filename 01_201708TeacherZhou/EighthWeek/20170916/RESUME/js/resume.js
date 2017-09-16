//->如果一个页面中需要滑动出阿里,我们需要阻止页面默认滑动的行为
//->例如:
$(document).on("touchstart touchmove touchend", function (e) {
    e.preventDefault();
}, false);

let loadingRender = (function () {

    //->需要预先加载的所有图片;
    let imgList = ['img/icon.png',
        'img/music.svg',
        'img/zf_concatAddress.png',
        'img/zf_concatInfo.png',
        'img/zf_concatPhone.png',
        'img/zf_course.png',
        'img/zf_course1.png',
        'img/zf_course2.png',
        'img/zf_course3.png',
        'img/zf_course4.png',
        'img/zf_course5.png',
        'img/zf_course6.png',
        'img/zf_cube1.png',
        'img/zf_cube2.png',
        'img/zf_cube3.png',
        'img/zf_cube4.png',
        'img/zf_cube5.png',
        'img/zf_cube6.png',
        'img/zf_cubeBg.jpg',
        'img/zf_cubeTip.png',
        'img/zf_emploment.png',
        'img/zf_messageArrow1.png',
        'img/zf_messageArrow2.png',
        'img/zf_messageChat.png',
        'img/zf_messageKeyboard.png',
        'img/zf_messageLogo.png',
        'img/zf_messageStudent.png',
        'img/zf_outline.png',
        'img/zf_phoneBg.jpg',
        'img/zf_phoneDetail.png',
        'img/zf_phoneListen.png',
        'img/zf_phoneLogo.png',
        'img/zf_return.png',
        'img/zf_style1.jpg',
        'img/zf_style2.jpg',
        'img/zf_style3.jpg',
        'img/zf_styleTip1.png',
        'img/zf_styleTip2.png',
        //'img/zf_teacher100.png', /*没有这张图片,无法加载完成,loading不会消失,已经做了相关的处理;*/
        'img/zf_teacher1.png',
        'img/zf_teacher2.png',
        'img/zf_teacher3.jpg',
        'img/zf_teacher4.png',
        'img/zf_teacher5.png',
        'img/zf_teacher6.png',
        'img/zf_teacherTip.png'];

    //->两个元素
    let $loading = $(".loading"),
        $already = $loading.find(".already");

    let n = 0,
        m = imgList.length,
        timer = null,
        isEnter = false;

    //->加载图片,计算加载量
    function loadImg() {
        $.each(imgList, function (index, item) {
            //->this: 当前循环的这一项;每张图片的地址
            let oImg = new Image;
            oImg.src = item;
            oImg.onload = function () {
                ++n;
                $already.css("width", n / m * 100 + "%");
                if (n >= m) {
                    setTimeout(() => {
                        //->加载完成,loading消失,phone操作;
                        if (isEnter) return;
                        isEnter = true;
                        clearTimeout(timer);
                        $loading.remove();
                        phoneRender.init();
                    }, 2000);//所有操作都延迟2s再消失
                }
            };
        });
    }


    return {
        init: function () {
            $loading.css("display", "block");
            loadImg();
            /*无法加载完成,loading不会消失的相关处理如下*/
            //->给一个限定的时间(超过10s,如果有个别图片无法加载(已经加载一半以上了),我们也直接进入到下一个操作了)
            timer = setTimeout(() => {
                if (n < m && n >= m / 2) {
                    if (isEnter) return;
                    isEnter = true;
                    $already.css("width", "100%");
                    setTimeout(() => {
                        $loading.remove();
                        phoneRender.init();
                    }, 2000);
                }
            }, 10000);//10s
        }
    }
})();

/*--phone--*/
//以后phone做什么事情就写到这里来;
let phoneRender = (function () {
    let $phone = $(".phone"),
        $listen = $phone.find(".listen"),
        $listenTouch = $listen.find(".touch"),
        $detail = $phone.find(".detail"),
        $detailTouch = $detail.find(".touch"),
        $time = $phone.find("span");

    let bellAudio = $("#bellAudio")[0],
        sayAudio = $("#sayAudio")[0];

    function listenTouch() {
        $listenTouch.singleTap(function () {//singleTap: 单击
            bellAudio.pause();
            $(bellAudio).remove();

            $listen.remove();
            $detail.css("transform", "translateY(0)");

            //->让面板出来之后,
            $detail.on("webkitTransitionEnd", function () {
                //->transition动画结束的时候(JS中控制css3,只写一套加前缀的即可);
                //->让time显示
                $time.css("display", "block");

                //->播放say音乐;
                sayAudio.play();
                watchTime();//监听
            });
        });
    }

    let watchTimer = null;

    function watchTime() {
        watchTimer = setInterval(() => {
            //->this: 上级作用域中的this是谁,箭头函数中的this就是谁;
            var curTime = sayAudio.currentTime,
                durTime = sayAudio.duration;
            if (curTime >= durTime) {
                //->已经播放的时间大于等于总时间,说明播放完成,播放完成之后执行以下
                message();
                return;
            }
            var minute = Math.floor(curTime / 60),
                second = Math.ceil(curTime - minute * 60);
            minute < 10 ? minute = "0" + minute : null;
            second < 10 ? second = "0" + second : null;
            $time.html(minute + ":" + second);
        }, 1000);
    }

    function message() {
        clearInterval(watchTime);
        sayAudio.pause();
        $(sayAudio).remove();
        $phone.remove();
        messageRender.init();
    }

    return {
        init: function () {
            $phone.css("display", "block");

            //->paly bell
            bellAudio.play();

            //->listen touch
            listenTouch();

            //->detail touch
            $detailTouch.singleTap(message);//singleTap: 单击;

        }
    }
})();


/*--message--*/
let messageRender = (function () {
    let $message = $(".message"),
        musicAudio = $("#musicAudio")[0],
        $wrapper = $message.find(".wrapper"),
        $messageList = $wrapper.find("li"),
        $keyboard = $message.find(".keyboard"),
        $text = $keyboard.find(".text"),
        $submit = $keyboard.find(".submit");

    let autoTimer = null,
        step = -1,
        initTranslateY = 0;

    function messageMove() {
        let $cur = $messageList.eq(++step);
        //->显示每条消息
        $cur.css({
            transform: "translateY(0)",
            opacity: 1
        });
        //->当第3条消息完成(transition动画完成了),展示键盘;此时停止自动出消息;
        if (step === 2) {
            clearInterval(autoTimer);
            //->当我们需要操作两个样式执行过渡动画,事件被执行两次(webkitTransitionEnd: 有几个样式需要执行过渡动画,事件就会被触发执行几次)

            //->保证只执行一次;
            let fn = function () {
                $(this).off("webkitTransitionEnd", fn);//(this): cur
                keyboard();
            };
            $cur.on("webkitTransitionEnd", fn);
            /*()=>{
             //->this: 上级作用域中的this是谁,这里的this就是谁;
             //->箭头函数没有自己的主体,继承父级;
             }*/
        }

        //->从第五条展示开始,消息列表要整体上移了(当前这条消息高度的基础上+10是上移的距离);
        if (step >= 4) {
            initTranslateY -= $cur[0].offsetHeight + 10;
            $wrapper.css("transform", "translateY(" + initTranslateY + "px)");
        }

        ///->结束: 结束音频,干掉当前页,进入下一个页面
        if (step >= $messageList.length - 1) {
            clearInterval(autoTimer);
            musicAudio.pause();
            $(musicAudio).remove();
            setTimeout(() => {
                $message.remove();
                cubeRender.init();
            }, 2000)
        }
    }

    function keyboard() {
        //->让键盘显示
        $keyboard.css("transform", "translateY(0)");

        //->显示文字: 文字打印机
        //->JQ中的"one"方法也是绑定事件,只不是只绑定一次而已,触发一次后自动把绑定的方法移除;
        $keyboard.one("webkitTransitionEnd", () => {
            let str = "都学了啊,可我还是找不到好工作!",
                textTimer = null,
                n = -1;
            textTimer = setInterval(() => {
                if (n >= str.length - 1) {
                    clearInterval(textTimer);
                    //->不仅如此,当文字打印时显示提交按钮
                    $submit.css("display", "block");
                    return;
                }
                let textVal = $text.html();
                textVal += str[++n];
                $text.html(textVal);
            }, 100);
        });
    }

    //->给"发送"绑定事件
    function submitEvent() {
        $submit.singleTap(function () {
            $text.html("");
            $keyboard.css("transform", "translateY(3.7rem)");

            messageMove();
            autoTimer = setInterval(messageMove, 1500);
        });
    }


    return {
        init: function () {
            $message.css("display", "block");
            musicAudio.play();
            autoTimer = setInterval(messageMove, 1500);
            submitEvent();
        }
    }
})();

/*-- cube--*/
//=>移动端设备中的浏览器或者是微信等,当手指滑动的时候都会有一些属于自己的默认行为(浏览器滑动有切换页卡的默认行为),为了保证我们的滑动能正常,我们需要阻止这些默认行为
$(document).on("touchstart touchmove touchen",function (e) {
    e.preventDefault();
});

let cubeRender = (function () {
    let $cube = $(".cube"),
        $box = $cube.children("ul");

    //->记录起始的旋转角度,每一次的欢动都是在上一次角度基础上继续旋转的
    $box.attr({//->JQ中的attr记录的都是字符串
        rotateX: -30,
        rotateY: 45
    });

    function start(e) {
        //->记录手指的坐标位置
        // console.log(e);
        let point = e.changedTouches[0];
        $(this).attr({
            strX: point.pageX,
            strY: point.pageY,
            changeX: 0,
            changeY: 0,
            isMove: false
        });
    }

    function move(e) {
        let point = e.changedTouches[0];
        //->用当前值-起始值
        let changeX = point.pageX - $(this).attr("strX"),//->得到的结果是字符串,
            changeY = point.pageY - $(this).attr("strY");
        if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
            $(this).attr({
                changeX: changeX,
                changeY: changeY,
                isMove: true
            });
        }


    }

    function end(e) {
        let isMove = $(this).attr("isMOve");
        if (isMove !== "true") return;

        let changeX = parseFloat($(this).attr("changeX")),
            changeY = parseFloat($(this).attr("changeY")),
            rotateX = parseFloat($(this).attr("rotateX")),
            rotateY = parseFloat($(this).attr("rotateY"));
        rotateX = rotateX - changeY/3;//->滑动多少,除以3/1
        rotateY = rotateY + changeX/3;
        $(this).css("transform",`scal(0.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    }

    return {
        init: function () {
            $cube.css("display", "block");
            $box.on("touchstart", start)
                .on("touchstart", move)
                .on("touchstart", end).find("li").tap(function () {
                    //->ZP中提供了一些快捷的移动操作方法: tap,singleTap,doubleTap,longTap,swipe,swipeLeft/Right/Top/Bottom...
                    //->获取它的索引
                let index =$(this).index();
                //->有了索引,打开详情页....

            });//->.tap: 点击;
        }
    }
})();


// loadingRender.init();
// loadingRender.init();
// phoneRender.init();
// messageRender.init();
cubeRender.init();

