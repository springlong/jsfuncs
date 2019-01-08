
// 常用类型判断
var type = {

  /**
   * 判断类型是否为：DOM节点（包括元素节点、文本节点、注释节点、文档节点、文档片段节点）
   * @param  {任意类型}  value 需要判断的值
   * @return {Boolean}       是/否
   */
  isDom: function(value) {
    return value && value.nodeType !== undefined;
  },

  /**
   * 判断类型是否为：元素节点（即HTML标签元素）
   * @param  {任意类型}  value 需要判断的值
   * @return {Boolean}       是/否
   */
  isElement: function(value) {
    return value && value.nodeType === 1;
  },

  /**
   * 判断类型是否为：字符串
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isStr: function(value) {
    return typeof(value) === "string";
  },

  /**
   * 判断类型是否为：一个有效的字符串（即非全空格成员）
   * @param  {String} value 需要检索的值
   * @return {Boolean}      是/否
   */
  isValidStr: function(value) {
    return typeof(value) === "string" && !/^\s*$/.test(value);
  },

  /**
   * 判断类型是否为：有效数字
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isNumeric: function(value) {
    return this.type(value) === "number" && !isNaN(value);
  },

  /**
   * 判断类型是否为：函数
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isFunction: function(value) {
    return this.type(value) === "function";
  },

  /**
   * 判断类型是否为：数组
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isArray: function(value) {
    return this.type(value) === "array";
  },

  /**
   * 判断类型是否为：“数组”（即包含length值，且该值为数字类型）
   * <br />注意：window对象的length属性为当前窗口中frames的数量（包括IFRAMES），不作为“数组”进行处理。
   * <br />注意：function对象的length属性为参数的数量，不作为“数组”进行处理。
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isArrayLike: function(value) {
    return value != null && !this.isWindow(value) && !this.isFunction(value) && typeof(value.length) === "number";
  },

  /**
   * 判断类型是否为：日期
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isDate: function(value) {
    return this.type(value) === "date";
  },

  /**
   * 判断类型是否为：日期字符串，如“2012-03-26”
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isDateStr: function(value) {
    return typeof(value) === "string" && !isNaN(Date.parse(value.replace(/-/g, "/")))
  },

  /**
   * 判断类型是否为：通过{}或者new Object()创建的对象（就是指除内置对象和HTML对象外的自定义对象）
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isPlainObject: function(value) {
    return this.type(value) === "object" && value.toString().toLowerCase() === "[object object]";
  },

  /**
   * 判断类型是否为：一个空对象（即不包含任何成员）
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isEmptyObject: function(value) {
    var name;
    if(this.isArrayLike(value)) return value.length < 1;
    for(name in value){
      if (Object.prototype.hasOwnProperty.call(value, name)) {
        return false;
      }
    }
    return true;
  },

  /**
   * 判断类型是否为：一个window对象（当前窗口或者一个iframe）
   * @param  {任意类型} value 需要判断的值
   * @return {Boolean}        是/否
   */
  isWindow: function(value) {
    return value != null && value == value.window;
  },

  /**
   * 获取值的类型字符串
   * <br />各种类型返回的字符串结果如下：
   * <br />数字(含NaN)：   number
   * <br />字符串：        string
   * <br />ture/false：    boolean
   * <br />null：          null
   * <br />undefined：     undefined
   * <br />数组：          array
   * <br />函数：          function
   * <br />JSON：          object
   * <br />日期对象：      date
   * <br />数学对象：      math
   * <br />正则：          regexp
   * <br />window：
   * <br />    IE6/7/8:    object
   * <br />    chrome：    global
   * <br />    safari:     domwindow
   * <br />    其他：      window
   * <br />document.body:
   * <br />    IE6/7/8:    object
   * <br />    其他：      htmlbodyelement
   * @param  {任意类型} value 需要判断值
   * @return {String}         类型名称
   */
  type: function(value) {
    return value == null ?
      String(value) :
      new RegExp("\\[object\\s+(.*)\\]").exec(Object.prototype.toString.call(value).toLowerCase())[1];
  }
};

