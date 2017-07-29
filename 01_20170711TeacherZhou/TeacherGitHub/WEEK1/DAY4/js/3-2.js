// i++：自身基础上加一
// ++i：自身基础上加一
// var i = 2;
// console.log(5 + (i++), i);//->7、3
// i = 2;
// console.log(5 + (++i), i);//->8、3
// i++:在和其它值进行运算的时候，它是先拿原有的值进行运算，运算完成后本身在累加
// ++i:它是先自身累加，拿累加后的结果和其它值进行运算的

//思考题:
// var i = 2;
// console.log(5 + (++i) + (i++) - (i++) - (++i));//->1

//------------------------
var n = 10;
function fn(i) {
    return function (n) {
        console.log(n + (++i));
    }
}
var f = fn(10);
f(1);
f(5);
fn(10)(1);//->先把FN执行(传递10),把FN执行的返回结果(小函数)紧接着在执行(传递1)
fn(10)(5);
