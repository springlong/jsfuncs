
/**
 * @file        Array对象的兼容处理
 * @author      龙泉 <yangtuan2009@126.com>
 */

(function(){

    var arrayPro = Array.prototype;


    var arrayPrototype = Array.prototype;
    arrayPrototype.indexOf === undefined && (arrayPrototype.indexOf = function(val, fromIndex)
    {
        //返回目标数组中参数val的值第一次出现所在的索引位置，不存在则返回-1。（返回类型：Number）
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        //参数val：（类型：Object）需要检索的值
        //参数fromIndex：（类型：Number，可选）指定开始查找的索引位置（为负数时表示从倒数第几个开始检索）
        var result = -1,
            len = this.length,
            i = typeof fromIndex === "number" ? (fromIndex >= 0 ? fromIndex : len + fromIndex) : 0;

        for(i = (i < 0 ? 0 : i); i < len; i++)
        {
            if(this[i] === val)
            {
                result = i;
                break;
            }
        }
        return result;
    });
    arrayPrototype.filter === undefined && (arrayPrototype.filter = function(func)
    {
        //筛选出原数组中符合条件（即回调函数返回ture时）的所有元素，并以数组形式返回。
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        //回调函数：function(item, i){}
        //回调函数-参数item：当前项的值；
        //回调函数-参数i：当前项的索引值；
        //回调函数-this：window对象；
        var result = [],
            len = this.length,
            i = 0,
            item;

        for(; i < len; i++)
        {
            if(func(item = this[i], i))
            {
                result.push(item);
            }
        }

        return result;
    });
    arrayPrototype.map === undefined && (arrayPrototype.map = function(func)
    {
        //遍历目标数组中的每一个元素，并执行回调函数，最终将回调函数返回的值组合成新的数组返回。
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        //回调函数：function(item, i){}
        //回调函数-参数item：当前项的值；
        //回调函数-参数i：当前项的索引值；
        //回调函数-this：window对象；
        var i = 0, len = this.length, result = [];
        for(; i < len; )
        {
            result[i] = func(this[i], i++);
        }
        return result;
    });
    arrayPrototype.forEach === undefined && (arrayPrototype.forEach = function(func)
    {
        //遍历目标数组中的每一个元素，并执行回调函数。
        //该方法在ECMAScript5中被提出，目前在IE6~8中不被支持。
        //回调函数：function(item, i){}
        //回调函数-参数item：当前项的值；
        //回调函数-参数i：当前项的索引值；
        //回调函数-this：window对象；
        var i = 0, len = this.length;
        for(; i < len; )
        {
            func(this[i], i++);
        }
    });


    // Array对象的扩展
    // --------------------------------------------------------------------------------------------------------------
    Array.unique = function(arr)
    {
        //返回目标数组去除重复值之后所组成的新数组（不排序，原数组的值不受影响）。
        //该方法在最新版的ECMAScript6中依旧不被支持。
        //参数arr：（类型：Array）需要操作的数组对象
        var output = [],  //最终输出结果
            result = {},  //用于结果判断
            i = 0,
            len = arr.length,
            num;

        for(; i < len; )
        {
            num = arr[i++];
            if(result[num] === undefined)
            {
                result[num] = 1;     //使用1来表示目标结果已加入新的数组中
                output.push(num);    //保存唯一值
            }
        }
        return output;
    };
    Array.remove = function(arr, val)
    {
        //删除原数组中与参数val的值相等的所有元素，并返回原数组（原数组中的值将会受到影响）。
        //该方法在最新版的ECMAScript6中依旧不被支持。
        //参数arr：（类型：Array）需要操作的数组对象
        //参数val：（类型：Object）需要删除的元素值；
        var idx;

        while((idx = arr.indexOf(val)) !== -1)
        {
            arr.splice(idx, 1);
        }
        return arr;
    };
    Array.toArray = function(value)
    {
        return Array.prototype.slice.call(value);  //IE6~8不支持该种方式转换NodeList，但可以转换JavaScript对象
    }
    Array.asc = function(a, b){ return a > b ? 1 : -1; }; //升序
    Array.desc = function(a, b){ return a < b ? 1: -1; }; //降序
        
})();

