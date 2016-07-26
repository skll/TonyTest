//实现动态显示返回顶部功能
$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $("#back-to-top").fadeIn(500);
        }
        else {
            $("#back-to-top").fadeOut(500);
        }
    });
    //点击按钮后跳回顶部
    $("#back-to-top").click(function() {
        $("body,html").animate({ scrollTop: 0 }, 1000);
        return false;
    });
});