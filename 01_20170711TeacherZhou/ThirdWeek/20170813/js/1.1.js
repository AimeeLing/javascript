//->获取上一个哥哥元素节点
//->getPrev
function prev(curEle) {
    if("previousElementSibling" in curEle){
        //->兼容走if
        return curEle.previousElementSibling;
    }
    //->不兼容写循环
    var p = curEle.previousElementSibling;
    while (p && p.nodeType !== 1){
        //->哥哥节点存在,但是还不是元素节点,我们基于当前的哥哥继续向上找即可
        p = p.previousSibling;
    }
    return p;
}


//->获取下一个弟弟元素节点
//->getNext
function next(curEle) {
    if("nextElementSibling" in curEle){
        //->兼容走if
        return curEle.nextElementSibling;
    }
    //->不兼容写循环
    var n = curEle.nextSibling;
    while (n && n.nodeType !== -1){
        n = n.nextSibling;
    }
    return n;
}


//->获取所有的哥哥元素节点
//->getPrevAll
function prevAll(curEle) {
    //->基于但钱的元素一直向上查找,直到找到头为止;在查找的过程中,我们把所有是元素节点存起来;
    var ary = [],
        p = curEle.previousSibling;
    while (p){
        if(p.nodeType === 1){
            //ary.push(p);//-> [li#li3, li#li2, li#li1]
            ary.unshift(p);//->[li#li1, li#li2, li#li3]
        }
        p = p.previousSibling;
    }
    return ary;
}


//->获取所有的弟弟元素节点
//->getNextAll
function nextAll(curEle) {
    var ary = [],
        n = curEle.nextSibling;
    while (n){
        if(n.nodeType === 1){
            ary.push(n);
        }
        n = n.nextSibling;
    }
    return ary;
}


///->获取有的兄弟元素节点
//->getSiblings
function siblings(curEle) {
    //->兄弟: 所有的哥哥 + 所有的弟弟
    return prevAll(curEle).concat(nextAll(curEle));
}



//->获取当前元素的索引
//->getIndex
function index(curEle) {
    //->它有几个哥哥,它的索引就是几
    return prevAll(curEle).length;
}


//->获取当前容器的第一个元素子节点;
//->getFirstChild
function firstChild(curEle) {
    //->先找第一个子节点,看是否为元素,如果不是元素,继续找它的弟弟节点,一直找到元素节点为止;
    var f = curEle.firstChild;
    while (f && f.nodeType !== 1){
        f = f.firstChild;
    }
    return f;
}


//->获取当前容器的最后一个元素子节点
//->getLastChild
function lastChild(curEle) {
    var l = curEle.lastChild;
    while (l && l.nodeType !== 1){
        l = l.previousSibling;
    }
    return l;
}






















