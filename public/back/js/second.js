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
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage = page;
                        rander();
                    }
                });
            }
        })
    }


    //2.点击添加分类，显示模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");
        //发送请求
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("dropdownTpl", info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })


    // 3.给下拉菜单添加选中功能
    $(".dropdown-menu").on("click", "a", function () {
        var txt = $(this).text();
        $("#dropdownText").text(txt);

        var id = $(this).data("id");
        $('[name="categoryId"]').val(id);

        $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

    });

    // 4.调用fileUpload 方法, 发送文件上传请求
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            console.log(data);
            var result = data.result;
            var picUrl = result.picAddr;
            $("#imgBox img").attr("src", picUrl);

            $('[name="brandLogo"]').val(picUrl);
            $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");

        }
    })

    // 5.添加表单校验
    $("#form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            },
        }
    })



})