# 关于jsfuncs

jsfuncs是一个从工作中、学习中整理总结编写的实用函数库，方便以后需要的时候拿来使用。

## 类型判断

1. [typecheck.js](./scripts/typecheck.js) 提供了`.isStr()`、`.isNumeric()`、`.isFunction()`、`.isArray()`、`.isArrayLike()`、`.isDate()`、`.isPlainObject()`、`.isEmptyObject()`、`.isWindow()`等常用类型判断，[demo文件](//htmlpreview.github.io/?https://github.com/springlong/jsfuncs/blob/master/demo/typecheck.html)。

## Number类型 & Math对象

1. [Number.prototype.toFixed()](./scripts/Number.prototype.toFixed.js) 修复 `Number.prototype.toFixed()` 由于JS浮点数精度的问题导致在某些数值的情况下得不到正确的结果。
2. [random(min, max)](./scripts/Math-random.js) 随机生成位于min~max之间的整数（包括min和max本身）。

