$(function () {

    var currentPage = 1;
    var pageSize = 5;
    rander();

    function rander() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("productTpl", info);
                $("tbody").html(htmlStr);
                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        rander();
                    }
                });
            }
        })
    }

    // 添加模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");
    })

})