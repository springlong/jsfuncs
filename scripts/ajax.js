
//Ajax跨域请求
/*=================================================================
 *实现原理：1. 这里的跨域请求应用的是JSONP协议，所有的Ajax请求均通过script元素进行加载，从而避免XmlHttpRequest协议不可跨域的局限性；
 *          2. 在浏览器端请求服务器的目标URL时，需要传递一个参数用来表示回调函数的名称。该名称通常为callback，例如：http://www.studytest.com/jsonptest/?a=1&b=2&callback=jsonphandle）；
 *          3. 服务器在收到浏览器端的请求并处理完毕后，数据通常以JSON格式进行返回，例如：{"a":1, "b":2}；
 *          4. 服务器在将结果返回给浏览器端时，会对回调函数名称的参数进行判断。如果存在则以函数调用的形式进行返回，如：jsonphandle({"a":1, "b":2})；否则将直接返回JSON数据。
 *---------------------
 *作者：龙泉
 *QQ：569320261
 *---------------------
 *参数说明：
 *1. url: （类型：string，必备）请求的url地址，回调函数的名称使用=?代替
 *2. charset：（类型：string，可选）文件编码，默认为utf-8（如果没有特殊需求需要设置为gb2312或者gbk的话，可以不设置该参数，脚本会自动进行判断处理。）
 *3. callback：（类型：fcuntion，必备）回调函数
 *==================================================*/
function getJSON(url, charset, callback)
{
    /*变量以及参数的处理*/
    var callName, script, head = document.getElementsByTagName("head")[0];
    if(typeof(charset) !== "string")
    {
        //如果charset参数类型为字符串，则表示为编码指定，否则为回调函数
        callback = charset;
        charset = "utf-8";
    }

    /*添加全局回调函数*/
    callName = "jsonpcallback_" + new Date().getTime();
    window[callName] = callback;

    /*script标签属性配置*/
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("charset", charset);
    script.setAttribute("async", "true");
    script.setAttribute("src", url.replace("=?", "=" + callName));

    /*script加载完毕后销毁相关数据*/
    if("onload" in script)
    {
        //标准模式（IE9+、Firefox、Chrome、Safari、Opera
        script.onload = function()
        {
            head.removeChild(this);
            delete window[callName];
        }
    }
    else
    {
        //IE6/7/8
        script.onreadystatechange = function()
        {
            var state = this.readyState;
            if(state === "loaded" || state === "complete")
            {
                head.removeChild(this);
                window[callName] = null; //无法使用delete进行删除
            }
        }
    }

    /*建立script请求*/
    head.appendChild(script);
}

