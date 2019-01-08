# 关于jsfuncs

jsfuncs是一个从工作中、学习中整理总结编写的实用函数库，方便以后需要的时候拿来使用或者起到参考价值。


## 类型判断

### [typecheck.js](./scripts/typecheck.js)

提供了`.isStr()`、 `.isNumeric()`、 `.isFunction()`、 `.isArray()`、 `.isArrayLike()`、 `.isDate()`、 `.isPlainObject()`、 `.isEmptyObject()`、 `.isWindow()` 等常用类型判断。



## Object对象

针对Object对象的ES5、ES6及后续版本新增的实用功能和函数进行的pollyfill。

同时对以往项目中用于Object对象操作的自定义函数也进行了相关汇总。

1. [Object.create (proto, propertiesObject)](./scripts/object.js)<br>(ES5) 创建一个具有指定原型的新对象并返回。

1. [Object.getPrototypeOf (obj)](./scripts/object.js#L36)<br>(ES5) 返回目标对象的原型。

1. [Object.is (x, y)](./scripts/object.js#L52)<br>(ES6) 判断两个值是是否是相同的值，与严格等于的区别在于：NaN和NaN同值相等，+0和-0不相等。

1. [Object.keys (obj)](./scripts/object.js#L71)<br>(ES5) 返回目标对象所有可遍历属性的键名所组成的数组。

1. [Object.values (obj)](./scripts/object.js#L98)<br>(ES2017) 返回目标对象所有可遍历属性的键值所组成的数组。

1. [Object.entries (obj)](./scripts/object.js#L122)<br>(ES2017) 返回目标对象所有可遍历属性的键值对数组所组成的数组。

1. [Object.assign (target, sources)](./scripts/object.js#L146)<br>(ES6) 将来自一个或多个源对象中的所有可枚举的属性值复制到目标对象，并返回目标对象。该方法执行的是浅拷贝，相同属性的值将被后来者覆盖，而不会处理子级对象成员的合并。

1. [extend (deep, target, sources)](./scripts/object.js#L191)<br>(自定义函数) 将来自一个或多个源对象中的所有可枚举的属性值复制到目标对象，并返回目标对象。该方法可根据deep参数决定是否需要进行数组和对象的深度拷贝。

1. [countObjectSize (obj)](./scripts/object.js#L256)<br>(自定义函数) 统计目标对象的私有成员的个数，非Object类型返回0。在支持ES5的IE8+等浏览器中可以通过`Object.keys(obj).length`取得结果。

1. [each (obj)](./scripts/object.js#L278)<br>(自定义函数) 遍历目标对象或数组，针对每个私有成员执行回调函数，回调函数返回false则终止遍历。与for-in语句不同的是，该方法将不会遍历从prototype继承的成员。



## String对象

针对String对象的ES5、ES6及后续版本新增的实用函数进行的pollyfill。

同时对以往项目中用于字符串操作的自定义函数也进行了相关汇总。

1. [String.prototype.trim ()](./scripts/string.js)<br>(ES5) 去除目标字符串首尾两端的所有空格，并作为新字符串返回。

1. [String.prototype.includes (search, position)](./scripts/string.js#L20)<br>(ES6) 判断目标字符串中是否存在检索字符串。

1. [String.prototype.startsWith (search, position)](./scripts/string.js#L31)<br>(ES6) 判断目标字符串是否以检索字符串开头。

1. [String.prototype.endsWith (search, position)](./scripts/string.js#43)<br>(ES6) 判断目标字符串是否以检索字符串结束。

1. [String.prototype.repeat (count)](./scripts/string.js#L55)<br>(ES6) 返回目标字符串重复连接指定次数后的新字符串。

1. [String.prototype.padStart (targetLen, padStr)](./scripts/string.js#L67)<br>(ES2017) 返回使用填充字符串对目标字符进行前置填充达到指定长度后的新字符串。

1. [String.prototype.padEnd (targetLen, padStr)](./scripts/string.js#L78)<br>(ES2017) 返回使用填充字符串对目标字符进行末尾填充达到指定长度后的新字符串。

1. [getByteLen (str)](./scripts/string.js#L118)<br>(自定义函数) 返回目标字符串的字节长度，一个汉字等于2个字节。



## Array对象

针对Array对象的ES5、ES6及后续版本新增的实用函数进行的pollyfill。

同时对以往项目中用于数组操作的自定义函数也进行了相关汇总。

1. [Array.isArray (source)](./scripts/array.js#L190)<br>(ES5) 判断一个对象的值是否是一个数组（Array类型）。

1. [Array.prototype.indexOf (search, fromIndex)](./scripts/array.js)<br>(ES5) 返回需要检索的值在数组中第一次出现的索引位置，不存在则返回-1。

1. [Array.prototype.filter (callback, thisArg)](./scripts/array.js#L35)<br>(ES5) 遍历数组，筛选出回调函数返回ture的那些元素所组成的新数组并返回。

1. [Array.prototype.map (callback, thisArg)](./scripts/array.js#L68)<br>(ES5) 遍历数组，将回调函数返回的值组成新的数组并返回。

1. [Array.prototype.forEach (callback, thisArg)](./scripts/array.js#L97)<br>(ES5) 遍历数组，为每一个元素执行一次回调函数。

1. [Array.prototype.every (callback, thisArg)](./scripts/array.js#L125)<br>(ES5) 遍历数组，如果每一次回调函数都返回true，那么结果为true，否则为false。

1. [Array.prototype.some (callback, thisArg)](./scripts/array.js#L158)<br>(ES5) 遍历数组，如果有一次回调函数返回true，那么结果就为true，如果全部返回false则结果为false。

1. [Array.from (source, callback, thisArg)](./scripts/array.js#L251)<br>(ES6) 将ArrayLike类型转换为真正的数组，如果对非ArrayLike进行处理则返回空数组。

1. [Array.of ()](./scripts/array.js#L294)<br>(ES6) 将函数的参数列表构成数组并返回。

1. [Array.prototype.find (callback, thisArg)](./scripts/array.js#L304)<br>(ES6) 遍历数组，将第一次回调函数结果为true的当前项的值返回，如果回调函数结果都为false则返回undefined。

1. [Array.prototype.findIndex (callback, thisArg)](./scripts/array.js#L336)<br>(ES6) 遍历数组，将第一次回调函数结果为true的当前项的值返回，如果回调函数结果都会false则返回-1。

1. [Array.prototype.fill (value, start, end)](./scripts/array.js#L368)<br>(ES6) 使用一个固定的值对数组中从起始位置到结束位置内的全部元素进行填充（不包含结束位置）（原数组值将变更）。

1. [Array.prototype.copyWithin (target, start, end)](./scripts/array.js#L397)<br>(ES6) 复制数组内部从起始位置到结束位置之间的数据（不包含结束位置）到数组的另一个目标位置，原数组的内容将变更但不修改其大小，最后返回原数组。

1. [Array.prototype.includes (search, fromIndex)](./scripts/array.js#L436)<br>(ES2016) 返回数据中是否存在检索的值，如果是则返回true，否则返回false。

1. [Array.unique (arr)](./scripts/array.js#L200)<br>(自定义扩展) 返回目标数组去重后所组成的新数组（仅支持值引用的值，不排序，原数组的值不受影响）。

1. [Array.remove (arr, val)](./scripts/array.js#L227)<br>(自定义扩展) 删除数组中指定的元素值，并返回原数组（原数组中的值将会受到影响）。



## Number类型 & Math对象

针对数值相关的函数处理。

1. [Number.prototype.toFixed ()](./scripts/number-math.js#L2)<br>(ES3) 修复由于JS浮点数精度的问题导致在某些数值的情况下得不到正确的结果。

1. [randomInt (min, max)](./scripts/number-math.js#L66)<br>(自定义函数) 随机生成位于min~max之间的整数（包括min和max本身）。

1. [commafy (num)](./scripts/number-math.js#L86)<br>(自定义函数) 将目标数值转换为千分位表示法。



## Date对象

### [easydate.js](https://github.com/springlong/easydate.js/blob/master/src/easydate.js)

这是一款简易实用的JavaScript日期时间处理工具！

提供了日期输出的格式化，以及日期时间的加减计算、时差计算、条件判断、链式操作等功能。

一些实用的功能操作通过 `easydate.isValid()`、 `easydate.isLeapYear()`、 `easydate.getWeekth()`、 `easydate.getMonthDays()`、 `easydate.diff()`等静态方法进行便捷调用。

该js作为单独的第三方插件进行使用，点击查看 [更多文档内容](https://github.com/springlong/easydate.js)。



## 浏览器cookie

### [cookie.js](https://github.com/springlong/cookie.js/blob/master/src/cookie.js)

对cookie的增删改查封装函数：`cookie(name, [value, [options]])`。

该js作为单独的第三方插件进行使用，点击查看 [更多文档内容](https://github.com/springlong/cookie.js)。




## 浏览器事件

### [event.js](./scripts/event.js)

兼容IE非标准事件模型的方法封装，对事件绑定、解除绑定、DOMReady事件（DomContentLoaded）、事件对象做了兼容处理。并对老版本Chrome、Safari等浏览器的mouseenter、mouseleave事件提供了支持。该脚本对外提供 `bindEvent()`、 `removeEvent()`、 `bindReady()` 三个方法。

1. [bindEvent (ele, name, handler, capture)](./scripts/event.js)<br> 为目标元素添加事件绑定。

1. [removeEvent (ele, name, handler, capture)](./scripts/event.js#L58)<br> 移除目标元素的事件绑定。

1. [bindReady (handler)](./scripts/event.js#L82)<br> DOM树加载完成时即执行通过bindReady添加的处理程序。
