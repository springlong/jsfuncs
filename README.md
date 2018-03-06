# 关于jsfuncs

jsfuncs是一个从工作中、学习中整理总结编写的实用函数库，方便以后需要的时候拿来使用。

## 类型判断

1. [typecheck.js](./scripts/typecheck.js) 提供了`.isStr()`、 `.isNumeric()`、 `.isFunction()`、 `.isArray()`、 `.isArrayLike()`、 `.isDate()`、 `.isPlainObject()`、 `.isEmptyObject()`、 `.isWindow()` 等常用类型判断。
 
## String对象

1. [String.prototype.trim()](./scripts/String.js) 去除目标字符串首尾两端的所有空格，并作为新字符串返回。
1. [String.prototype.includes(search, position)](./scripts/String.js) 判断目标字符串中是否存在检索字符串。
1. [String.prototype.startsWith(search, position)](./scripts/String.js) 判断目标字符串是否以检索字符串开头。
1. [String.prototype.endsWith(search, position)](./scripts/String.js) 判断目标字符串是否以检索字符串结束。
1. [String.prototype.repeat(count)](./scripts/String.js) 返回目标字符串重复连接的结果（原字符串不受影响）。
1. [String.prototype.padStart(targetLen, padStr)](./scripts/String.js) 使用填充字符串对目标字符进行前置填充以达到指定长度（原字符串不受影响）。
1. [String.prototype.padEnd(targetLen, padStr)](./scripts/String.js) 使用填充字符串对目标字符进行末尾填充以达到指定长度（原字符串不受影响）。

## Number类型 & Math对象

1. [Number.prototype.toFixed()](./scripts/Number&Math.js#L2) 修复由于JS浮点数精度的问题导致在某些数值的情况下得不到正确的结果。
2. [random(min, max)](./scripts/Number&Math.js#L66) 随机生成位于min~max之间的整数（包括min和max本身）。

