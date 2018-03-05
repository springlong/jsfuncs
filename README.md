# 关于jsfuns

jsfuns是一个从工作中、学习中整理总结编写的实用函数库，方便以后需要的时候拿来使用。

## Number类型

* [toFixed.js](./scripts/toFixed.js) 修复 Number.prototype.toFixed()，该函数内部是采用乘除法计算的方式来保留小数位的，由于JS浮点数精度的问题，在某些数值的情况下得不到正确的结果。