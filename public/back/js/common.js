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
  });


  $(function () {
      // 1.左侧二级切换功能
      $("#category").click(function () {
          $(this).next().stop().slideToggle();
      })

      // 2.左侧菜单切换功能
      $(".lt_topbar .icon_left").click(function () {
          $(".lt_aside").toggleClass("hidemenu");
          $(".lt_topbar").toggleClass("hidemenu");
          $(".lt_main").toggleClass("hidemenu");
      })

      // 3.公共退出功能
      $(".lt_topbar .icon_right").click(function () {
          $("#logoutModal").modal("show");
      });
      $("#logoutBtn").click(function () {
          $.ajax({
              type: "get",
              url: "/employee/employeeLogout",
              dataType: "json",
              success: function (info) {
                  console.log(info);
                  if (info.success) {
                      location.href = "login.html";
                  }
              }
          })
      })




  })