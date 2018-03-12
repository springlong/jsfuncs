
/**
 * @file        Object对象的兼容处理
 * @author      龙泉 <yangtuan2009@126.com>
 */

(function(){


    /**
     * 创建一个具有指定原型的新对象并返回
     * 该方法在ECMAScript5中被提出，IE6~8不支持！
     * @param  {Object} proto   创建新对象使用的原型对象
     * @param  {Object} [propertiesObject]   设置新对象的私有属性，该参数对应Object.defineProperties()
     * @return {Object}
     */
    !Object.create && (Object.create = function(proto, propertiesObject) {

        if(typeof proto !== 'object' && typeof proto !== 'function') {
            throw new Error('Object prototype may only be an Object or null: ' + proto);
        }

        if(propertiesObject !== undefined) {
            throw new Error('This browser\'s implementation of Object.create is a shim and doesn\'t support a second argument.');
        }

        // 需要注意：
        // 因为使用“.prototype =...”后,constructor会改变为“=...”的那个constructor
        // 所以在使用Object.create实现继承后往往需要重新指定 .constructor 为自身
        function fn() {}
        fn.prototype = proto;
        return new fn();
    });


    /**
     * 返回目标对象的原型
     * 该方法在ECMAScript5中被提出，IE6~8不支持！
     * @param  {Object} obj   需要返回原型的目标对象
     * @return {Object}
     */
    !Object.getPrototypeOf && (Object.getPrototypeOf = function(obj) {

        if(obj == null) {
            throw new Error('Cannot convert undefined or null to object');
        }

        return '__proto__' in obj ? obj['__proto__'] : obj.constructor.prototype;
    });


    /**
     * 判断两个值是是否是相同的值，与严格等于的区别在于：NaN和NaN同值相等，+0和-0不相等。
     * 该方法在ECMAScript6中被提出，浏览器支持：Chrome 30+、Firefox 22+、Safari 9+、Edge+，IE不支持
     * @param  {AnyType} [x]   需要比较的第一个值。
     * @param  {AnyType} [y]   需要比较的第二个值。
     * @return {Boolean}
     */
    !Object.is && (Object.is = function(x, y) {
        if(x === y) {
            // 处理+0和-0不相等的情况
            // 1 / +0 = Infinity
            // 1 / -0 = -Infinity
            return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
    });


    /**
     * 返回目标对象所有可遍历属性的键名所组成的数组
     * 该方法在ECMAScript5中被提出，IE6~8不支持！
     * @param  {Object} obj   目标对象
     * @return {Array}
     */
    !Object.keys && (Object.keys = function(obj) {

        var name, arr = [];

        if(obj == null) {
            throw new Error('Cannot convert undefined or null to object');
        }
        else if(typeof obj === 'object' || typeof obj === 'function'){
            for(name in obj) {
                // 低版本IE浏览器的有些对象不继承Object的hasOwnProperty方法
                // 所以需要通过.call的形式调用
                if(Object.prototype.hasOwnProperty.call(obj, name)){
                    arr.push(name);
                }
            }
        }
        return arr;
    });


    /**
     * 返回目标对象所有可遍历属性的键值所组成的数组
     * 该方法在ECMAScript 2017中被提出，浏览器支持：Chrome 54+、Firefox 47+、Safari 10.1+、Edge+，IE不支持
     * @param  {Object} obj   目标对象
     * @return {Array}
     */
    !Object.values && (Object.values = function(obj) {

        var name, arr = [];

        if(obj == null) {
            throw new Error('Cannot convert undefined or null to object');
        }
        else if(typeof obj === 'object' || typeof obj === 'function'){
            for(name in obj) {
                if(Object.prototype.hasOwnProperty.call(obj, name)){
                    arr.push(obj[name]);
                }
            }
        }
        return arr;
    });


    /**
     * 返回目标对象所有可遍历属性的键值对数组所组成的数组
     * 该方法在ECMAScript 2017中被提出，浏览器支持：Chrome 54+、Firefox 47+、Safari 10.1+、Edge+，IE不支持
     * @param  {Object} obj   目标对象
     * @return {Array}
     */
    !Object.entries && (Object.entries = function(obj) {

        var name, arr = [];

        if(obj == null) {
            throw new Error('Cannot convert undefined or null to object');
        }
        else if(typeof obj === 'object' || typeof obj === 'function'){
            for(name in obj) {
                if(Object.prototype.hasOwnProperty.call(obj, name)){
                    arr.push([name, obj[name]]);
                }
            }
        }
        return arr;
    });


    /**
     * 将来自一个或多个源对象中的所有可枚举的属性值复制到目标对象，并返回目标对象
     * 该方法执行的是浅拷贝，相同属性的值将被后来者覆盖，而不会处理子级对象成员的合并
     * 该方法在ECMAScript6中被提出，浏览器支持：Chrome 45+、Firefox 34+、Safari 9+、Edge+，IE不支持
     * @param  {Object} target   目标对象
     * @param  {Object} ...sources   一个或多个源对象
     * @return {Object}
     */
    !Object.assign && (Object.assign = function(target, sources) {

        if(target == null) {
            throw new Error('Cannot convert undefined or null to object');
        }

        // 将基本类型转换为对象
        var args = Array.prototype.slice.call(arguments);
        args[0] = Object(args[0]);

        return extend.apply(undefined, args);
    });


    /**
     * 将来自一个或多个源对象中的所有可枚举的属性值复制到目标对象，并返回目标对象
     * 该方法可根据deep参数决定是否需要进行数组和对象的深度拷贝
     * @param  {Boolean} [deep]   是否执行深度拷贝，默认为false
     * @param  {Object} target    目标对象
     * @param  {Object} ...sources 一个或多个源对象
     */
    function extend () {

        var name, sourceItem, targetItem, collection, isPlainObject,
            args = arguments,
            argLen = args.length,   // 参数的长度
            target = args[0],       // 需要扩展成员的目标对象
            deep = false,           // 是否进行深度合并
            index = 1;         // 扩展的成员从哪个索引参数开始

        if(typeof args[0] === 'boolean'){
            deep = args[0];
            target = args[1];
            index = 2;
        }
        else if(argLen === 1){
            return args[0];
        }

        // 判断类型是否为：通过{}或者new Object()创建的对象（就是指除内置对象和HTML对象外的自定义对象）
        isPlainObject = function (value) {
            return value && Object.prototype.toString.call(value).toLowerCase() === '[object object]'
                && value.toString().toLowerCase() === "[object object]";
        };

        // 将需要扩展的成员加入到目标对象
        for(; index < argLen; index++){

            collection = args[index];

            for(name in collection){ // 该语句对null、undefined、数字、布尔值不会执行遍历操作

                if(Object.prototype.hasOwnProperty.call(collection, name)) {

                    sourceItem = collection[name];
                    targetItem = target[name];

                    // 只针对PlainObject对象和数组进行深度拷贝
                    if(deep && ((isPlainObject(sourceItem) && isPlainObject(targetItem)) || 
                                (sourceItem instanceof Array && targetItem instanceof Array))) {
                        target[name] = extend(deep, targetItem, sourceItem);
                    }
                    else {
                        // null和undefined也将被处理
                        target[name] = sourceItem;
                    }
                }
            }
        }

        // 将被扩展后的目标对象返回
        return target;
    }

    window.extend = extend;

})();

