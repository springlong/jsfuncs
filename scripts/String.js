
/**
 * @file        String对象的兼容处理
 * @author      龙泉 <yangtuan2009@126.com>
 */

(function(){

    var strPro = String.prototype;

    /**
     * 去除目标字符串首尾两端的所有空格，并作为新字符串返回
     * 该方法在ECMAScript5中被提出，目前在IE6~8中不被支持
     * @return {String}
     */
    strPro.trim === undefined && (strPro.trim = function() {
        return this.replace(/^\s*|\s*$/g, '');
    });

    /**
     * 判断目标字符串中是否存在检索字符串
     * 该方法在ECMAScript6中被提出, 浏览器支持：Chrome 41+、Firefox 40+、Safari 9+，IE不支持
     * @param  {String} search    需要检索的字符串
     * @param  {Number} [position] 指定开始查找的索引位置，默认为0（非正数情况一律默认为0）
     * @return {Boolean}          
     */
    strPro.includes === undefined && (strPro.includes = function(search, position) {
        return typeof(search) === 'string' && this.indexOf(search, position) >= 0;
    });

    /**
     * 判断目标字符串是否以检索字符串开头
     * 该方法在ECMAScript6中被提出, 浏览器支持：Chrome 59+、Firefox 17+
     * @param  {String} search    需要检索的字符串
     * @param  {Number} [position] 指定本次检索中“目标字符串”的起始位置，默认为0（非正数情况一律默认为0）
     * @return {Boolean}          
     */
    strPro.startsWith === undefined && (strPro.startsWith = function(search, position) {
        // 当position参数大于0时，实际上是将该索引位置及后续的所有字符作为新的“目标字符串”后再做判断
        return typeof(search) === 'string' && this.substring(position).indexOf(search) == 0;
    });

    /**
     * 判断目标字符串是否以检索字符串结束
     * 该方法在ECMAScript6中被提出, 浏览器支持：Chrome 59+、Firefox 17+
     * @param  {String} search    需要检索的字符串
     * @param  {Number} [position] 指定本次检索中“目标字符串”的结束位置，默认为原字符串的长度（当该值小于1时，将返回false）
     * @return {Boolean}          
     */
    strPro.endsWith === undefined && (strPro.endsWith = function(search, position) {
        // 当指定了position参数时，实际上是将该索引位置之前的所有字符作为新的“目标字符串”后再做检索判断
        return typeof(search) === 'string' && new RegExp(search + '$').test(position === undefined ? this : this.substring(0, position));
    });

    /**
     * 返回目标字符串重复连接指定次数后的新字符串
     * 如果参数为空或者为0，则返回空字符串。
     * 如果参数为数字字符串，则作为数字处理。
     * 该方法在ECMAScript6中被提出, 浏览器支持：Chrome 41+、Firefox 24+、Safari 9+
     * @param  {Number} count 指明需要重复连接的次数
     * @return {String}
     */
    strPro.repeat === undefined && (strPro.repeat = function(count) {
        return isNaN(count = Number(count)) ? '' : new Array(count + 1).join(this);
    });

    /**
     * 返回 使用填充字符串对目标字符进行前置填充达到指定长度 后的新字符串
     * 该方法在ECMAScript 2017中被提出, 浏览器支持：Chrome 57+、Firefox 48+、Safari 10+、Edge 15+，IE不支持
     * @param  {Number} targetLen 目标长度，默认为目标字符串的长度，如果指定的长度小于目标字符串的长度，则返回原目标字符串
     * @param  {String} padStr 填充字符串，默认使用空格进行填充，如果填充字符串太长使得填充后的字符串长度超过了目标长度，则只保留最左侧的填充部分，其它部分会被截断
     * @return {String}
     */
    strPro.padStart === undefined && (strPro.padStart = function(targetLen, padStr) {
        return returnPadStr(this, 'start', targetLen, padStr);
    });

    /**
     * 返回 使用填充字符串对目标字符进行末尾填充达到指定长度 后的新字符串
     * 该方法在ECMAScript 2017中被提出, 浏览器支持：Chrome 57+、Firefox 48+、Safari 10+、Edge 15+，IE不支持
     * @param  {Number} targetLen 目标长度，如果指定的长度小于目标字符串的长度，则返回原目标字符串
     * @param  {String} padStr 填充字符串，默认使用空格进行填充，如果填充字符串太长使得填充后的字符串长度超过了目标长度，则只保留最左侧的填充部分，其它部分会被截断
     * @return {String}
     */
    strPro.padEnd === undefined && (strPro.padEnd = function(targetLen, padStr) {
        return returnPadStr(this, 'end', targetLen, padStr);
    });

    /**
     * 填充字符以使目标字符串达到指定长度
     * @param  {String} oldStr    目标字符串
     * @param  {String} dir       填充的方向，"start"——前置填充，"end"——末尾填充
     * @param  {Number} targetLen 目标显示长度
     * @param  {String} strPad     填充字符串
     * @return {String}           字符串填充后的结果
     */
    function returnPadStr(oldStr, dir, targetLen, strPad) {

        var oldLen = oldStr.length, appendStr = '', appendLen;

        targetLen = Number(targetLen) || 0;
        strPad = strPad || ' ';

        if(oldLen < targetLen) {
            appendLen = targetLen - oldLen;
            appendStr = new Array(Math.floor(appendLen / strPad.length) + 2).join(strPad);
            appendStr = appendStr.substring(0, appendLen);   
                     
            return dir === 'start' ? (appendStr + oldStr) : (oldStr + appendStr);
        }

        return oldStr.toString();
    }

})();

 