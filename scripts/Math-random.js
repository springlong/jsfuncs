
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

