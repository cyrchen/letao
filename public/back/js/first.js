$(function () {

    var currentPage = 1;
    var pageSize = 5;
    rander();

    function rander() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("firstTpl", info);
                $('tbody').html(htmlStr);

                // 1.分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        rander();
                    }
                })
            }
        })
    }

    //2.点击添加按钮，显示模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");
    });

    //3.表单校验功能
    $("#form").bootstrapValidator({
        // 配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    })

    // 4. 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 提交
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $("#form").serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $("#addModal").modal("hide");
                    currentPage = 1;
                    rander();
                    $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })


})