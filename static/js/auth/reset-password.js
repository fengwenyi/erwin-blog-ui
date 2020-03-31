$('#header').load('../common/header.html')
$('#footer').load('../common/footer.html')

layui.use(['layer', 'form'], function () {
    let form = layui.form

    $("#btn-send-verify-code-disabled").hide();

    //监听提交
    form.on('submit(form-register)', function (data) {

        // 校验两次输入的密码是否一致
        let password = $('input[name="password"]').val();
        let confirmPassword = $('input[name="confirm-password"]').val();
        if (password !== confirmPassword) {
            layer.msg('密码不一致');
            return false;
        }

        let param = JSON.stringify(data.field)
        $.ajax({
            // 请求方式
            type: "post",
            // 请求的媒体类型
            contentType: "application/json",
            // 请求地址
            url: "/api-index/auth/register",
            // 数据，json字符串
            data: param,
            //请求成功
            success: function (result) {
                // console.log(result);
                if (result.success) {
                    layer.msg('注册成功')
                } else {
                    layer.msg(result.message)
                }
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
        return false;
    });
});

// 点击 发送验证码 按钮
function onClickSendVerifyCode() {
    let email = $('input[name="email"]').val();
    if (isEmpty(email)) {
        layer.msg('邮箱不能空');
        return;
    }
    getVerifyCode(email);
    $("#btn-send-verify-code").hide();
    $("#btn-send-verify-code-disabled").show();
    let count = 59;
    let s = setInterval(btnSendVerifyCountDown, 1000);

    // 发送按钮 倒计时
    function btnSendVerifyCountDown() {

        $("#btn-send-verify-code-disabled").text('发送验证码（' + count + '）');
        if (count < 0) {
            $("#btn-send-verify-code").show();
            $("#btn-send-verify-code-disabled").hide();
            clearInterval(s);
        }
        count--;
    }
}


// 获取验证码
function getVerifyCode(email) {
    $.ajax({
        // 请求方式
        type: "get",
        // 请求的媒体类型
        contentType: "application/json",
        // 请求地址
        url: "/api-index/auth/verify-code",
        // 数据，json字符串
        data: 'email=' + email,
        //请求成功
        success: function (result) {
            // console.log(result);
            // layer.msg('友链申请提交成功')
            if (result.success) {
                layer.msg('验证码发送成功，请查询邮箱')
            } else {
                console.error(result.message)
            }
        },
        //请求失败，包含具体的错误信息
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
