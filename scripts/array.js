
/**
 * @file        Array对象的兼容处理
 * @author      龙泉 <yangtuan2009@126.com>
 */

(function(){

  var arrayPro = Array.prototype, _this = this;


  /**
   * 返回需要检索的值在数组中第一次出现的索引位置，不存在则返回-1。
   * 该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
   * @param  {AnyType} [search]   需要检索的值，不提供参数时为undefined
   * @param  {Number} [fromIndex] 指定开始查找的索引位置，默认值为0，为负数时表示倒数第n个位置（非数值情况下使用Number进行转换）
   * @return {Number}
   */
  !arrayPro.indexOf && (arrayPro.indexOf = function(search, fromIndex) {

    var result = -1,
      len = this.length,
      start = Number(fromIndex),
      i = isNaN(start) ? 0 : (start >= 0 ? start : len + start);

    for(i = (i < 0 ? 0 : i); i < len; i++) {
      if(this[i] === search) {
        return i;
      }
    }
    return result;
  });


  /**
   * 遍历数组，筛选出回调函数返回ture的那些元素所组成的新数组并返回
   * 不限定回调函数的返回值必须为true，只要转换为Boolean后是true即可
   * 该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
   * @param  {Function} callback 回调函数
   * @param  {Object} [thisArg] 回调函数中this的值，默认为window对象
   * @return {Array}
   */
  !arrayPro.filter && (arrayPro.filter = function(callback, thisArg) {

    // 回调函数：function(val, index, arr){}
    // 回调函数-参数val：当前元素的值；
    // 回调函数-参数index：当前元素的索引值；
    // 回调函数-参数arr：被遍历的数组；
    var i = 0, len = this.length, result = [], val;

    if(typeof callback !== 'function') {
      throw new Error(callback + ' is not a function');  // callback必须是函数
    }
    else{
      thisArg = thisArg === undefined ? _this : thisArg;

      for(; i < len; i++) {
        if(callback.call(thisArg, val = this[i], i, this)){
          result.push(val);
        }
      }
    }

    return result;
  });


  /**
   * 遍历数组，将回调函数返回的值组成新的数组并返回
   * @param  {Function} callback 回调函数
   * @param  {Object} [thisArg] 回调函数中this的值，默认为window对象
   * @return {Array}
   */
  !arrayPro.map && (arrayPro.map = function(callback, thisArg) {

    // 回调函数：function(val, index, arr){}
    // 回调函数-参数val：当前元素的值；
    // 回调函数-参数index：当前元素的索引值；
    // 回调函数-参数arr：被遍历的数组；
    var i = 0, len = this.length, result = [];

    if(typeof callback !== 'function') {
      throw new Error(callback + ' is not a function');  // callback必须是函数
    }
    else{
      thisArg = thisArg === undefined ? _this : thisArg;

      for(; i < len; i++){
        result[i] = callback.call(thisArg, this[i], i, this);
      }
    }

    return result;
  });


  /**
   * 遍历数组，为每一个元素执行一次回调函数
   * 该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
   * @param  {Function} callback 回调函数
   * @param  {Object} [thisArg] 回调函数中this的值，默认为window对象
   * @return {undefined}
   */
  !arrayPro.forEach && (arrayPro.forEach = function(callback, thisArg) {

    // 回调函数：function(val, index, arr){}
    // 回调函数-参数val：当前元素的值；
    // 回调函数-参数index：当前元素的索引值；
    // 回调函数-参数arr：被遍历的数组；
    var i = 0, len = this.length;

    if(typeof callback !== 'function') {
      throw new Error(callback + ' is not a function');  // callback必须是函数
    }
    else{
      thisArg = thisArg === undefined ? _this : thisArg;

      for(; i < len; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    }
  });


  /**
   * 遍历数组，如果每一次回调函数都返回true，那么结果为true，否则为false
   * 该方法会进行短路操作，只要某一次回调函数返回false，就会中断后续遍历行为
   * 该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
   * @param  {Function} callback 回调函数
   * @param  {Object} [thisArg] 回调函数中this的值，默认为window对象
   * @return {undefined}
   */
  !arrayPro.every && (arrayPro.every = function(callback, thisArg) {

    // 回调函数：function(val, index, arr){}
    // 回调函数-参数val：当前元素的值；
    // 回调函数-参数index：当前元素的索引值；
    // 回调函数-参数arr：被遍历的数组；
    var i = 0, len = this.length;

    if(typeof callback !== 'function') {
      throw new Error(callback + ' is not a function');  // callback必须是函数
    }
    else{
      thisArg = thisArg === undefined ? _this : thisArg;

      for(; i < len; i++) {
        if(!callback.call(thisArg, this[i], i, this)) {
          return false;
        }
      }

      return true;
    }
  });


  /**
   * 遍历数组，如果有一次回调函数返回true，那么结果就为true，如果全部返回false则结果为false
   * 该方法会进行短路操作，只要某一次回调函数返回true，就会中断后续遍历行为
   * 该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
   * @param  {Function} callback 回调函数
   * @param  {Object} [thisArg] 回调函数中this的值，默认为window对象
   * @return {undefined}
   */
  !arrayPro.some && (arrayPro.some = function(callback, thisArg) {

    // 回调函数：function(val, index, arr){}
    // 回调函数-参数val：当前元素的值；
    // 回调函数-参数index：当前元素的索引值；
    // 回调函数-参数arr：被遍历的数组；
    var i = 0, len = this.length;

    if(typeof callback !== 'function') {
      throw new Error(callback + ' is not a function');  // callback必须是函数
    }
    else{
      thisArg = thisArg === undefined ? _this : thisArg;

      for(; i < len; i++) {
        if(!!callback.call(thisArg, this[i], i, this)) {
          return true;
        }
      }
      return false;
    }
  });


  /**
   * 判断一个对象的值是否是一个数组（Array类型）
   * 该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
   * @return {Boolean}
   */
  !Array.isArray && (Array.isArray = function(source) {
    return Object.prototype.toString.call(source) === '[object Array]';
  });


  /**
   * 返回目标数组去重后所组成的新数组（仅支持值引用的值，不排序，原数组的值不受影响）
   * 该方法不属于ECMAScript规范，为自定义扩展函数
   * @param  {Array} arr 目标数组
   * @return {Array}
   */
  Array.unique = function(arr) {

    var arr = Object.prototype.toString.call(arr) === '[object Array]' ? arr : [],
      output = [],  //最终输出结果
      result = {},  //用于结果判断
      i = 0,
      len = arr.length, value;

    for(; i < len; ) {
      value = arr[i++];

      if(result[value] === undefined) {
        result[value] = 1;     //使用1来表示目标结果已加入新的数组中
        output.push(value);    //保存唯一值
      }
    }

    return output;
  };


  /**
   * 删除数组中指定的元素值，并返回原数组（原数组中的值将会受到影响）。
   * 该方法不属于ECMAScript规范，为自定义扩展函数
   * @param  {Array} arr 目标数组
   * @param  {Object} val 需要删除的元素值
   * @return {Array}
   */
  Array.remove = function(arr, val) {

    var arr = Object.prototype.toString.call(arr) === '[object Array]' ? arr : [],
      index = 0;

    while(index < arr.length) {
      if(arr[index] === val){
        arr.splice(index, 1);
      }else{
        index++;
      }
    }

    return arr;
  };


  /**
   * 将ArrayLike类型转换为真正的数组，如果对非ArrayLike进行处理则返回空数组
   * 支持迭代器的浏览器基本上都原生支持该方法所以该兼容处理不考虑ES6新增的可迭代对象（如Map和Set等）
   * 该方法在ECMAScript6中被提出，浏览器支持：Chrome 45+、Firefox 32+、Safari 9+、Edge，IE不支持
   * @param  {String|Object|NodeList} source 需要转换的原对象
   * @param  {Function} [callback] 如果提供了该参数，新数组中的每个元素都会执行该回调函数
   * @param  {Function} [thisArg] 回调函数中this的值，默认为window对象
   * @return {Array}
   */
  !Array.from && (Array.from = function(source, callback, thisArg) {

    // 回调函数：function(val, index, arr){}
    // 回调函数-参数val：当前元素的值；
    // 回调函数-参数index：当前元素的索引值；
    // 回调函数-参数arr：被遍历的数组；

    var arr = [],
      isFn = typeof callback === 'function',
      i, len;

    thisArg = thisArg === undefined ? _this : thisArg;

    // 不允许为null或undefined
    if(source == null) {
      throw new Error('Cannot convert undefined or null to object');
    }
    // 第二个参数必须是函数
    else if(arguments.length > 1 && !isFn) {
      throw new Error(callback + ' is not a function');
    }
    // ArrayLike
    else if(source) {
      for(i = 0, len = Number(source.length) || 0; i < len; i++) {
        isFn && callback.call(thisArg, source[i], i, this);
        arr[i] = source[i];
      }
      // Array.prototype.slice.call(source);  // IE6~8不支持该种方式转换NodeList和string，但可以转换JavaScript对象
    }

    return arr;
  });


  /**
   * 将函数的参数列表构成数组并返回
   * 该方法在ECMAScript6中被提出，浏览器支持：Chrome 45+、Firefox 25+、Safari 9+、Edge，IE不支持
   * @return {Array}
   */
  !Array.of && (Array.of = function() {
    return [].slice.call(arguments);
  });


  /**
   * 遍历数组，将第一次回调函数结果为true的当前项的值返回，如果回调函数结果都为false则返回undefined
   * 该方法在ECMAScript6中被提出，浏览器支持：Chrome 45+、Firefox 25+、Safari 8+、Edge，IE不支持
   * @param  {Function} callback 回调函数
   * @param  {Object} [thisArg] 回调函数中this的值，默认为window对象
   * @return {Array}
   */
  !arrayPro.find && (arrayPro.find = function(callback, thisArg) {

    // 回调函数：function(val, index, arr){}
    // 回调函数-参数val：当前元素的值；
    // 回调函数-参数index：当前元素的索引值；
    // 回调函数-参数arr：被遍历的数组；
    var i = 0, len = this.length, result = [], val;

    if(typeof callback !== 'function') {
      throw new Error(callback + ' is not a function');  // callback必须是函数
    }
    else{
      thisArg = thisArg === undefined ? _this : thisArg;

      for(; i < len; i++) {
        if(!!callback.call(thisArg, val = this[i], i, this)){
          return val;
        }
      }

      return undefined;
    }
  });


  /**
   * 遍历数组，将第一次回调函数结果为true的当前项的值返回，如果回调函数结果都会false则返回-1
   * 该方法在ECMAScript6中被提出，浏览器支持：Chrome 45+、Firefox 25+、Safari 8+、Edge，IE不支持
   * @param  {Function} callback 回调函数
   * @param  {Object} [thisArg] 回调函数中this的值，默认为window对象
   * @return {Array}
   */
  !arrayPro.findIndex && (arrayPro.findIndex = function(callback, thisArg) {

    // 回调函数：function(val, index, arr){}
    // 回调函数-参数val：当前元素的值；
    // 回调函数-参数index：当前元素的索引值；
    // 回调函数-参数arr：被遍历的数组；
    var i = 0, len = this.length, result = [], val;

    if(typeof callback !== 'function') {
      throw new Error(callback + ' is not a function');  // callback必须是函数
    }
    else{
      thisArg = thisArg === undefined ? _this : thisArg;

      for(; i < len; i++) {
        if(!!callback.call(thisArg, val = this[i], i, this)){
          return i;
        }
      }

      return -1;
    }
  });


  /**
   * 使用一个固定的值对数组中从起始位置到结束位置内的全部元素进行填充（不包含结束位置）（原数组值将变更）
   * 该方法在ECMAScript6中被提出，浏览器支持：Chrome 45+、Firefox 31+、Safari 8+、Edge，IE不支持
   * @param  {AnyType} [value] 填充数组使用的值，默认值为undefined
   * @param  {Number} [start] 起始位置，默认为0，为负数时表示倒数第n个位置（非数值情况下使用Number进行转换）
   * @param  {Number} [end] 结束位置，默认为数组长度，为负数时表示倒数第n个位置（非数值情况下使用Number进行转换）
   * @return {Array}
   */
  !arrayPro.fill && (arrayPro.fill = function(value, start, end) {

    var i = 0,
      len = this.length;

    start = Number(start) || 0;
    start = start < 0 ? len + start : start;
    start = start < 0 ? 0 : start;

    end = end === undefined ? len : (Number(end) || 0);
    end = end < 0 ? len + end : end;
    end = end > len ? len : end;

    for(i = start; i < end; i++) {
      this[i] = value;
    }

    return this;
  });


  /**
   * 复制数组内部从起始位置到结束位置之间的数据（不包含结束位置）到数组的另一个目标位置，原数组的内容将变更但不修改其大小，最后返回原数组
   * 该方法在ECMAScript6中被提出，浏览器支持：Chrome 45+、Firefox 32+、Safari 9+、Edge 12+，IE不支持
   * @param  {Number} [target] 目标位置
   * @param  {Number} [start] 起始位置，默认为0，为负数时表示倒数第n个位置（非数值情况下使用Number进行转换）
   * @param  {Number} [end] 结束位置，默认为数组长度，为负数时表示倒数第n个位置（非数值情况下使用Number进行转换）
   * @return {Array}
   */
  !arrayPro.copyWithin && (arrayPro.copyWithin = function(target, start, end) {

    var i = 0,
      len = this.length,
      copy = this.slice(),
      targetEnd, counter = 0;

    start = Number(start) || 0;
    start = start < 0 ? len + start : start;
    start = start < 0 ? 0 : start;

    end = end === undefined ? len : (Number(end) || 0);
    end = end < 0 ? len + end : end;
    end = end > len ? len : end;

    target = Number(target) || 0;
    target = target < 0 ? len + target : target;
    target = target < 0 ? 0 : target;

    targetEnd = target + (end - start);
    targetEnd = targetEnd > len ? len : targetEnd;

    for(i = target; i < targetEnd; i++) {
      this[i] = copy[start + counter];
      counter++;
    }

    return this;
  });


  /**
   * 返回数据中是否存在检索的值，如果是则返回true，否则返回false
   * 该方法在ECMAScript 2016中被提出，浏览器支持：Chrome 47+、Firefox 43+、Safari 9+、Edge 14+，IE不支持
   * @param  {AnyType} [search]   需要检索的值，默认值为undefined
   * @param  {Number} [fromIndex] 指定开始查找的索引位置，默认值为0，为负数时表示倒数第n个位置（非数值情况下使用Number进行转换）
   * @return {Number}
   */
  !arrayPro.includes && (arrayPro.includes = function(search, fromIndex) {

    var len = this.length,
      start = Number(fromIndex),
      i = isNaN(start) ? 0 : (start >= 0 ? start : len + start);

    for(i = (i < 0 ? 0 : i); i < len; i++) {
      if(this[i] === search || (typeof search === 'number' && isNaN(search) && typeof this[i] === 'number' && isNaN(this[i]))) {
        return true;
      }
    }
    return false;
  });

})();

