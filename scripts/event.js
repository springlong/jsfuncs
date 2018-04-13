
(function(visitor){

  // ready事件处理程序的集合
  var readyList = [];


  /**
   * 为目标元素添加事件绑定。
   * 兼容IE的非标准事件模型，以及老版本Chrome、Safari等浏览器对mouseenter、mouseleave事件的支持。
   * @param  {Element|window|document} ele    元素节点
   * @param  {String} name    事件名称
   * @param  {Function} handler 事件处理程序
   * @param  {Boolean} [capture=false] 是否进行事件捕捉
   * @return {Function}         事件处理程序
   */
  visitor.bindEvent = function (ele, name, handler, capture) {

    var callback;

    // 确保参数有效性
    if(!supportEvent(ele) || typeof handler !== 'function') return;

    // 兼容mouseenter和mouseleave事件（Chrome30+、Safari 7+、Firefox 10+、IE5.5+）
    // 这两个事件不会发生冒泡，鼠标在子级元素的移动不会触发父级元素的相关事件
    if(/mouseenter|mouseleave/i.test(name) && !('onmouseenter' in ele)) {

      name = name === 'mouseenter' ? 'mouseover' : 'mouseout';

      callback = function(ev) {
        ev = eventCompatible(ev);

        // 修复子元素的冒泡行为：判断鼠滑行为不来自自身或者子元素
        if(!ele.contains(ev.relatedTarget)) {
          if(handler.call(ev.target, ev) === false) {
            ev.preventDefault();  // 返回false取消默认行为
          }
        }
      };
    }else{
      // 通过中转实现各浏览器下this与事件对象的兼容性
      callback = function(ev) {
        ev = eventCompatible(ev);
        if(handler.call(ev.target, ev) === false) {
          ev.preventDefault();  // 返回false取消默认行为
        }
      };
    }

    document.addEventListener ?
      ele.addEventListener(name, callback, capture) :
      ele.attachEvent('on' + name, callback);

    return callback;
  };


  /**
   * 移除目标元素的事件绑定。
   * 兼容IE的非标准事件模型，以及老版本Chrome、Safari等浏览器对mouseenter、mouseleave事件的支持。
   * @param  {Element|window|document} ele    元素节点
   * @param  {String} name    事件名称
   * @param  {Function} handler 事件处理程序
   * @param  {Boolean} [capture=false] 是否进行事件捕捉
   * @return {undefined}
   */
  visitor.removeEvent = function (ele, name, handler, capture) {

    // 确保参数有效性
    if(!supportEvent(ele)) return;

    if(/mouseenter|mouseleave/i.test(name) && !('onmouseenter' in ele)) {
      name = name === 'mouseenter' ? 'mouseover' : 'mouseout';
    }

    document.removeEventListener ?
      ele.removeEventListener(name, handler, capture) :
      ele.detachEvent('on' + name, handler);
  };


  /**
   * DOM树加载完成时即执行通过bindReady添加的处理程序。
   * 通过该方式添加的处理程序可以在形成完整的DOM树之后就触发，而不需要像load事件那样在所有页面元素全部加载完毕后才会触发，
   * 可以在页面下载的早期就添加事件处理程序，这意味着用户能够尽早地与页面进行交互。
   * @param  {Function} handler 需要绑定的处理程序
   * @return {undefined}
   */
  visitor.bindReady = function (handler) {

    // 确保参数有效性
    if(typeof handler !== 'function') return;

    // 如果添加处理程序时DOM树已经加载完毕，那么1毫秒后自动执行（之所以使用定时器，是为了实现异步执行）
    var readyState = document.readyState;
    if(readyState === 'interactive' || readyState === 'complete') {
      return setTimeout(handler, 1);
    }

    // 添加处理程序列表
    readyList.push(handler);

    // 仅当第一次添加处理程序时才进行DomContentLoaded事件的监测。
    if(readyList.length === 1) {
      DomContentLoaded();
    }
  };


  /**
   * 目标元素是否支持绑定事件
   * @param  {AnyType} ele 目标元素
   * @return {Boolean}
   */
  function supportEvent(ele) {
    return (ele && ele.nodeType === 1) || (ele === ele.window) || (ele === document);
  }


  /**
   * DomContentLoaded事件的兼容处理
   */
  function DomContentLoaded () {

    // 标准事件模型（IE9+、Chrome、Safari、Firefox、Opera）
    if(document.addEventListener) {
      document.addEventListener('DOMContentLoaded', doReady, false);
      return;
    }

    // 兼容IE6、7、8，原理是因为在IE浏览器中DOM未加载完成时调用doScroll方法，会产生异常。
    // 参考地址：http://javascript.nwbox.com/IEContentLoaded/
    var checkReady = function() {
      try {
        document.documentElement.doScroll('left');
      } catch(e) {
        setTimeout(checkReady, 10);
        return;
      }
      doReady();
    }
    checkReady();
  }


  /**
   * 执行readyList列表
   */
  function doReady() {

    for(var i = 0, len = readyList.length; i < len; i++) {
      // readyList被执行时，this指向document
      readyList[i].call(document);
    }

    document.removeEventListener &&
      document.removeEventListener('DOMContentLoaded', doReady, false);
  }


  /**
   * 事件对象的兼容处理
   * @param  {Object} ev 浏览器提供的事件对象
   * @return {Object}   兼容后的事件对象
   */
  function eventCompatible (ev) {

    ev = ev || window.event;

    var type = ev.type,
      target = ev.target || ev.srcElement,
      compatible = {

        // 事件类型，即事件的名称，如：click、dblclick、mouseover
        type: type,

        // 事件目标，即用户的操作是基于哪一个目标元素进行的
        target : target,

        // Ctrl键是否按下
        ctrlKey: ev.ctrlKey,

        // Shift键是否按下
        shiftKey: ev.shiftKey,

        // Alt键是否按下
        altKey: ev.altKey,

        // 防止事件冒泡
        stopPropagation: function() {
          'stopPropagation' in ev ? ev.stopPropagation() : (ev.cancelBubble  = true);
        },

        // 取消默认行为
        preventDefault: function() {
          'preventDefault' in ev ? ev.preventDefault() : (ev.returnValue = false);
        },

        // 指向原生事件对象
        originalEvent: ev
      };

    // 鼠标事件
    if(/mouse|click/gi.test(type)) {

      // 作用于鼠标事件, 对于mouseover而言表示从哪个DOM元素进来，而对于mouseout而言则表示鼠标着落在那个DOM元素
      compatible.relatedTarget = ev.relatedTarget === undefined ? (type === 'mouseover' ? ev.fromElement : ev.toElement) : ev.relatedTarget;

      // 鼠标相对于目标元素的X轴坐标位置（由于offsetX和offsetY并没有被加入标准，所以Firefox浏览器并不支持这两个属性）
      compatible.offsetX = ev.offsetX === undefined ? (ev.clientX - target.getBoundingClientRect().left) : ev.offsetX;

      // 鼠标相对于目标元素的Y轴坐标位置
      compatible.offsetY = ev.offsetY === undefined ? (ev.clientY - target.getBoundingClientRect().top) : ev.offsetY;

      // 鼠标相对于文档显示区的X轴坐标位置
      compatible.clientX = ev.clientX;

      // 鼠标相对于文档显示区的Y轴坐标位置
      compatible.clientY = ev.clientY;

      // 鼠标相对于整个页面的X轴坐标位置（pageX和pageY在IE6/7/8中没有得到支持）
      compatible.pageX = ev.pageX === undefined ? (document.documentElement.scrollLeft + event.clientX) : ev.pageX;

      // 鼠标相对于整个页面的Y轴坐标位置
      compatible.pageY = ev.pageY === undefined ? (document.documentElement.scrollTop + event.clientY) : ev.pageY;

      // 鼠标相对于屏幕的X坐标位置
      compatible.screenX = ev.screenX;

      // 鼠标相对于屏幕的Y坐标位置
      compatible.screenY = ev.screenY;

      // 判断鼠标所按的是哪个键（0—左键；1—中间键；2—右键）
      if(document.implementation.hasFeature('MouseEvents', '2.0')) {
        compatible.button = ev.button;
      } else {
        // 在非标准的IE6/7/8事件模型下，按键有7个值
        switch(ev.button)
        {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            compatible.button =  0;
            break;
          case 2:
          case 6:
            compatible.button =  2;
            break;
          case 4:
            compatible.button =  1;
            break;
        }
      }
    }
    // 键盘按键事件的兼容性处理
    else if(/key/gi.test(type)) {
      compatible.keyCode = ev.keyCode === 0 ? ev.charCode : ev.keyCode; // 键盘按键的键码值
    }

    return compatible;
  }


  // HTMLElement.prototype.contains兼容处理
  // --------------------------------------------------------------------------------------------------------------
  if(typeof HTMLElement !== 'undefined' &&  HTMLElement.prototype.contains === undefined) {
    HTMLElement.prototype.contains = function (element) {
      // 判断当前元素节点的子节点中是存在目标节点，如果是则返回true，否则返回false（同一元素进行比较时将返回true）
      // 该方法在IE6+中均已支持，在较老版本的Firefox、Chrome、Opera浏览器中未被支持
      // 注意：如果目标参数是一个非DOM对象，那么在IE6~8、Firefox、Presto版Opera浏览器中将导致错误异常
      while(element) {
        if(element === this) return true;
        element = element.parentNode;
      }
      return false;
    };
  }

})(window);

