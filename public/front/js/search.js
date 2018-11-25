/*
 * 功能分析
 * 功能1: 本地历史记录渲染展示
 * 功能2: 清空所有历史记录
 * 功能3: 删除单条历史记录
 * 功能4: 添加搜索历史
 * */

$(function () {

    /*
     * 功能1: 本地历史记录渲染展示
     * 思路:
     *   (1) 从本地读取搜索历史
     *   (2) 读出来的是 jsonStr, 转换成数组
     *   (3) 结合模板引擎渲染
     * */

    render();

    function getHistory() {
        var jsonStr = localStorage.getItem('search_list') || "[]";
        var arr = JSON.parse(jsonStr);
        return arr;
    }

    function render() {
        var arr = getHistory();
        var htmlStr = template("searchTpl", {
            list: arr
        });
        $(".lt_history").html(htmlStr);
    }


    /*
     * 功能2: 清空所有历史记录
     * 思路:
     *   (1) 给清空记录添加点击事件 (事件委托注册)
     *   (2) 利用removeItem清空所有的历史记录
     *   (3) 重新渲染页面
     * */
    $(".lt_history").on("click", ".btn_empty", function () {
        mui.confirm("你确定要清空历史记录嘛?", "温馨提示", ["取消", "确认"], function (e) {
            if (e.index === 1) {
                localStorage.removeItem("search_list");
                render();
            }

        })
    })

    /*
     * 功能3: 删除单条历史记录
     * 思路:
     *   (1) 给所有的删除按钮, 添加点击事件 (事件委托)
     *   (2) 获取存储的下标, 将数组的对应项删除
     *   (3) 将数组转成jsonStr, 存储到本地存储中
     *   (4) 重新渲染
     * */
    $(".lt_history").on("click", ".btn_delete", function () {

        var index = $(this).data("index");

        var arr = getHistory();
        arr.splice(index, 1);
        localStorage.setItem("search_list", JSON.stringify(arr));
        render();

    })

    /*
     * 功能4: 添加历史记录功能
     * 思路:
     *   (1) 给搜索按钮, 添加点击事件
     *   (2) 获取搜索关键字, 添加到数组的最前面 (unshift)
     *   (3) 将数组转成jsonStr, 存储到本地存储中
     *   (4) 重新渲染
     * */
    $(".search_btn").click(function () {
        var key = $('.search_input').val().trim();

        if (key === "") {
            mui.toast("请输入搜索关键字");
            return;
        }

        var arr = getHistory();

        var index = arr.indexOf(key);
        if (index != -1) {
            arr.splice(index, 1);
        }
        if (arr.length >= 10) {
            arr.pop();
        }


        arr.unshift(key);
        localStorage.setItem("search_list", JSON.stringify(arr));
        render();

        $(".search_input").val("");


    })



})