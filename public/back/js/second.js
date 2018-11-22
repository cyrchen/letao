$(function () {

    var currentPage = 1;
    var pageSize = 5;

    rander();

    function rander() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("secondTpl", info);
                $("tbody").html(htmlStr);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size) ,
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage = page;
                        rander();
                    }
                });
            }
        })
    }

})