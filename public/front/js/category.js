$(function () {

    //1.一进入页面，发送请求，获取一级分类数据
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        dataType: "json",
        success: function (info) {
            console.log(info);

            var htmlStr = template("leftTpl", info);
            $(".lt_category_left ul").html(htmlStr);
            renderById(info.rows[0].id);
        }
    });

    //3.给左边所有的a添加点击事件
    $(".lt_category_left").on("click", "a", function () {

        $(".lt_category_left a").removeClass("current");
        $(this).addClass("current");

        var id = $(this).data("id");
        renderById(id);
    })



    // 2.根据一级分类id, 动态渲染右侧二级分类
    function renderById(id) {

        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                id: id
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("rightTpl", info);
                $(".lt_category_right ul").html(htmlStr);
            }
        })
    }


})