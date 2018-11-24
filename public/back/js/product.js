$(function () {

    var picArr = [];

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

    // 2.显示添加模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
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

    //3.通过事件委托给下拉框a添加点击事件
    $(".dropdown-menu").on("click", "a", function () {
        var txt = $(this).text();
        $("#dropdownText").text(txt);
    })

    //4.文件上传 
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            // console.log(data.result);

            var picObj = data.result;
            picArr.unshift(picObj);
            var picUrl = picObj.picAddr;
            $("#imgBox").prepend('<img src="' + picUrl + '" style="width:100px;">');

            if (picArr.length > 3) {
                picArr.pop();
                $('#imgBox img:last-of-type').remove();
            }
            console.log(picArr);
            if (picArr.length === 3) {
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
        }
    });

    //5.配置表单校验
    $("#form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: "商品库存格式，必须是非零开头的数字"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "尺码格式，必须是xx-xx"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传3张图片'
                    }
                }
            },
        }
    })

})