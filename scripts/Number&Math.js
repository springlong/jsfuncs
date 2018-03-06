
// 修复 Number.prototype.toFixed()
// Number.prototype.toFixed() 内部是采用乘除法计算的方式来保留小数位的，由于JS浮点数精度的问题，在某些数值的情况下得不到正确的结果
// 修复问题：(321.775).toFixed(2) = 321.77
// 问题症结：321.775*100 = 32177.499999999996
// 
// 在实现过程中，由于考虑不全面，导致了新的问题（现已修复）：
// (162.70).toFixed(2) = 162.69 
// (51.11+93.6).toFixed(2) = 144.70
// 
// 修复方式：避免浮点数使用乘除法，采用字符串拼接的方式来保留指定小数位
// ==========================================================================================================================
Number.prototype.toFixed = function(length) {

    length = Math.abs(length) || 0;

    var lessZero = this < 0,
        absNum = Math.abs(this),
        strNum = '' + absNum,
        start = strNum.indexOf('.'),
        times = Math.pow(10, length),
        lastNumIndex = start + length + 1,
        isNeedAdd = start !== -1 && strNum.substring(lastNumIndex, lastNumIndex + 1) >= 5,
        temp, intergerNum;

    // absNum仅保留指定小数位，且转换为整数
    if(start !== -1) {
        absNum = strNum.substring(0, lastNumIndex);
        intergerNum = parseInt(absNum.replace('.', ''));
    }

    // 四舍五入，转换为整数进行加1，避免小数加法造成精度丢失
    if(isNeedAdd) {
        temp = intergerNum + 1;
        temp = temp/times;
    }else{
        temp = absNum;
    }

    // 转换为字符串
    temp += '';

    var startIndex = temp.indexOf('.'),
        strNumBeforeDotted = temp.replace(/\.\d*$/, ''),
        strNumAfterDotted = startIndex === -1 ? '' : temp.substring(startIndex + 1),
        lenAterDotted = strNumAfterDotted.length;

    // 补全末尾的0满足长度
    for(var i = 0, e = length - lenAterDotted; i < e; i++) {
        strNumAfterDotted += '0';
    }

    // 如果小数位数过长则需要截取
    if(length < lenAterDotted) {
        strNumAfterDotted = strNumAfterDotted.substring(0, len gth);
    }

    // 拼接结果
    if(strNumAfterDotted !== '') {
        strNumAfterDotted = '.' + strNumAfterDotted;
    }
    return (lessZero ? '-' : '') + strNumBeforeDotted + strNumAfterDotted;
};


/**
 * 随机生成位于min~max之间的整数（包括min和max本身）
 * 如果有一方参数不是数字，则最终结果返回0。
 * 在执行操作之前，将对两个参数进行比较，较大的值作为max，较小的值作为min。
 * @param  {Number} min 最小值
 * @param  {Number} max 最大值
 * @return {Number}
 */
function random (min, max) {
    
    if(isNaN(min) || isNaN(max)) return 0;
    if(min > max){
        var exchange = min;
        min = max;
        max = exchange;
    }
    return Math.round(Math.random()*(max - min) + min);
}

 