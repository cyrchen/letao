$(function () {


    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("tmp", info);
                $('tbody').html(htmlStr);

                // 1.分页插件
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    //2.点击启用禁用按钮，显示模态框
    $("tbody").on("click", ".btn", function () {
        $("#userModal").modal("show");
        // 获取用户id
        currentId = $(this).parent().data("id");
        //   获取需要修改的状态
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

    });

    //3.点击模态框确认按钮，完成用户的启用禁用
    $("#submitBtn").click(function () {
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $("#userModal").modal("hide");
                    render();
                }
            }
        })

    })

})