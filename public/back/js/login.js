$(function () {


    //1.表单校验

    $("#form").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在2到6之间"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须在6到12之间"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    });


    //2. 注册表单校验成功事件, 在事件中阻止默认成功的表单提交
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("#form").serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    location.href = "index.html";
                }
                if (info.error === 1000) {
                    $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
                }
                if (info.error === 1001) {
                    $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
                }
            }
        })
    });


    //3.重置功能
    $('[type="reset"]').click(function () {

        // 重置状态
        // resetForm 如果传 true  表示内容和状态都重置
        //           不传参,      只重置状态
        $('#form').data("bootstrapValidator").resetForm();

    })

})