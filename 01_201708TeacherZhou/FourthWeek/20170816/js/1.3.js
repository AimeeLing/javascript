/*
* 同步和异步编程:(JS中大部分操作都是同步编程)
*   //->每当执行一句或者一段JS代码,其实都是在完成一个任务(任务执行分为两种模式:1.自上而下;2.上面任务没完成,先一个任务也可以接着做;)
*
*   1.同步编程: 上一个任务没有完成,下一个任务不能执行(可以理解为: 任务是自上而下逐一执行的);
*   2.异步编程: 上一个任务没有彻底完成(完成一半),下一个任务先去执行,等把下面的任务完成后,才会返回头执行上面没有彻底完成的任务;
*
*   =>JS是单线程的编程语言: 它脑子里只有一根弦,一次只能处理一件事;
*   =>JS中大部分操作都是同步编程;
* */



//-------------------------------------------------------同步的案例:while循环死循环的模式
// //->能打印"No"?: 条件恒成立,死循环,不能打印"No";
// //->当前这个while循环是死循环,当前这件任务永远无法完成,而循环的操作是同步编程(这件事完不成,以后的事都无法完成)
// var n = 1;
// while (n === 1){
//     console.log("Ok");
// }
// console.log("No");//->这个"No"永远不会被打印;如果"No"下有其他代码,其他代码也不会执行




//-----------------------------------------------------------异步的案例: 定时器
//->定时器是异步编程

//========================================定时器的时间是: 1s(1000)
// //->定时器时间是1s(1000)
// //->打印顺序: 先打印12,后打印13;原理如下:
// /*
// * 这个定时器的任务: 设置一个定时器,1s后执行匿名函数;
// * //->这个定时器如果按照同步理解: 首先设置一个定时器,然后等待,此时什么都不能做,1s后把函数执行,才能执行其他的任务;(这是错误的,这个定时器不是按照同步理解的;是按照异步理解);
// * //->这个定时器是按照异步理解: 首先设置定时器,但我们不会去等待到时间再去做其他事情,在这个阶段我们首先会把下面的任务逐一去完成,当下面任务完成后,我们再返回头看定时器的等待时间是否到达,到达则执行匿名函数,如果没到继续等待;(这个才是定时器的正确的理解思想);
// *
// * */
// var n = 12;
// setInterval(function () {
//     n++;
//     //console.log(n);//->2.再打印13;
// },1000);
// console.log(n);//->1.先打印12;



//========================================定时器的时间: 0s(0)
// //->定时器时间是0s(0),不是立马执行;
// //->定时器的时间因子设置为零,也不是立马执行,每一个浏览器都有一个最小的反应时间(预估测试值: google最小的反应时间是5-6ms IE最小反应时间是10-13ms,一般设置最小值设置为17ms"性能会更好一些";有很多类库的定时器时间都写的17,也有部分用的13;),当我们设置的时间小于这个值,浏览器也是按照最小的时间处理的 =>也就是说,设置一个定时器,怎么着也要等一会执行,此时不等,继续执行下面的任务...
// var n = 12;
// setTimeout(function () {
//     n++;
//     //console.log(n);//->2.再打印13;
// },0);//->因为浏览器有最小反应时间,既是设置为0,也不起作用;(不同的浏览器,最小的反应时间不同;具体如上为你做解释;)
// console.log(n);//->1.先打印12;



//========================================测试浏览器的最小反应时间
// //->测试浏览器的最小反应时间
// var n = 12;
// var sTime = new Date();
// setTimeout(function () {
//     var endTime = new Date();
//     console.log(endTime - sTime);//->测试浏览器的最小反应时间
//     console.log(++n);
// },0);



//========================================定时器到达时间不一定执行
// //->通过这个例子说明一个问题: 我们给定时器设置一个时间,到达时间定时器不一定执行;(因为设置一个定时器不等;它继续执行下面的任务);设置一个定时器,总要等一段时间再执行,此阶段我们不等,继续执行下面的任务,但是由于JS的单线程的,一次只能处理一件事情,下面的任务没完成,不管定时器是否到达设定的时间,也要把下面任务完成后,才能反回头执行定时器里面的内容;
// var n = 12;
// setTimeout(function () {
//     console.log(++n);//->2.再打印13;
// },0);
// for (var i = 0; i < 100000000; i++) {
//
// }
// console.log(n);//->1.先打印12;



//============================不知道啥意思的一段代码
// //不知道啥意思的一段代码:
// var starTime = new Date();
// for (var i = 0; i < 100000000; i++) {
//
// }
// var endTime = new Date();
// console.log(endTime - starTime);//->通过性能测试,我们发现在google下循环一亿次大概需要300ms左右
// console.log(n);


//============================一次都不会输出,死循环的案例
// //->
// var n = 12;
// setTimeout(function () {
//     console.log(++n);
// },0);
// while(1===1){
//
// }
// console.log(n);


//============================
// //->这个案例说明一个问题: 当同步的任务彻底完成后,开始返回头看之前设置的定时器是否到时间,到时间的给予执行;如果有好几个定时器都到时间了,会把最先达到时间的定时器先执行(因为在设置定时器的时候,浏览器会把用时最短的定时器优先排在队列的前面);
// //->打印顺序: 2  1  3
// setTimeout(function () {
//     console.log(1);
// },100);//->2.第二次打印1;
//
// setTimeout(function () {
//     console.log(2);
// },0);//->1.先打印2;
//
// var st = new Date();
// for (var i = 0; i < 100000000; i++) {
//     console.log(new Date() - st);//->反应时间的计算
// }
// setTimeout(function () {
//     console.log(3);
// },10);//->3.第三次打印3;



//============================
// //->
// //->打印顺序: 1  2  3
// setTimeout(function () {
//     console.log(1);
// },1);//->1.先打印1;
//
// setTimeout(function () {
//     console.log(2);
// },0);//->2.第二次打印2;
//
// var st = new Date();
// for (var i = 0; i < 100000000; i++) {
//     console.log(new Date() - st);
// }
// setTimeout(function () {
//     console.log(3);
// },10);//->3.第三次打印3;





//============================
// //->这个案例说明: 执行2的时候,1已经到时间了,所以会第二个打印1,第三个打印3
// //->打印顺序: 2  1  3
// setTimeout(function () {
//     console.log(1);
// },100);//->2.第二次打印1;
//
// setTimeout(function () {
//     console.log(2);
//     for (var i = 0; i < 100000000; i++) { }
// },0);//->1.先打印2;
//
// var st = new Date();
// for (var i = 0; i < 100000000; i++) {
//     console.log(new Date() - st);
// }
// setTimeout(function () {
//     console.log(3);
// },10);//->3.第三次打印3;



//============================
// //->这个案例说明: 执行2的时候,3已经到时间了,所以会第二个打印3,第三个打印1
// //->打印顺序: 2  3  1
// setTimeout(function () {
//     console.log(1);
// },100);//->第三次
//
// setTimeout(function () {
//     console.log(2);
//     for (var i = 0; i < 100000000; i++) { }
// },0);//->第一次
//
// var st = new Date();
// for (var i = 0; i < 100000000; i++) {  }
// console.log(new Date() - st);
// setTimeout(function () {
//     console.log(3);//第二次
// },10);//->3.第三次打印3;






//-----------------------------------------------------------事件绑定: 异步编程
// //->所有的事件绑定都是异步编程
// var n = 12;
// document.body.onclick = function () {
//     console.log(++n);//->打印顺序,第二次打印: 13
// };
// console.log(n);//->打印顺序,第一次打印: 12



//=================================
// //->案例验证: 事件绑定也是异步编程
// //->打印顺序:  No  Ok
// var oImg = new Image;
// oImg.src= "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png";
// oImg.onload =function () {
//     console.log("Ok");//->打印顺序,第二次打印: Ok
// };
// console.log("No");//->打印顺序,第一次打印: No



//===========================================
// //->案例验证: 事件绑定也是异步编程
// var oImg = new Image;
// oImg.src= "http://imgsrc.baidu.com/imgad/pic/item/267f9e2f07082838b5168c32b299a9014c08f1f9.jpg";
// oImg.onload =function () {
//     console.log("图片加载成功");
// };
// oImg.onerror = function () {
//     console.log("图片加载失败");//->打印顺序,第二次打印: "图片加载失败"
// };
// console.log("当前图片加载中,客官请稍等...");//->打印顺序,第一次打印: "当前图片加载中,客官请稍等..."



//-----------------------------------------------------------AJAX: 异步编程
// //=>AJAX中我们可以开启异步编程(AJAX有同步也有异步)
// var xhr = new XMLHttpRequest;
// xhr.open("GET","地址",false);//->false: 同步; true: 或者不写都是异步;



