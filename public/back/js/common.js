$(function () {
    //开启进度条
    // NProgress.start();
    // 关闭进度条
    // NProgress.done();

    $(document).ajaxStart(function () {
        NProgress.start();
    })
    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 1000)
    })



})