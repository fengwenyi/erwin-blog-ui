let layerFormLogin;

layui.use(['form', 'layer'], function(){
    let form = layui.form;

    $('#mobile-header').load('../common/mobile-header.html')

    // 刷新用户状态
    // refreshUserStatus()

    //监听提交
    form.on('submit(form-login)', function (data) {
        let param = JSON.stringify(data.field)
        login(param)
        return false
    });


    // print myself introduction
    printMyselfIntroduction()
})

// 登录
function login(data) {
    $.ajax({
        // 请求方式
        type: "post",
        // 请求的媒体类型
        contentType: "application/json",
        // 请求地址
        url: "/api-index/auth/login",
        // 数据，json字符串
        data: data,
        //请求成功
        success: function (result) {
            if (result.success) {
                layer.msg('登录成功')

                // 修改用户登录状态
                userLogin()

                // 保存token
                setToken(result.data.token)

                // 获取用户个人信息
                getUserPersonInfo()
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
}

// 刷新用户状态
function refreshUserStatus() {
    // 判断是否有登录
    let userLoginStatus = getLoginStatus()
    if (userLoginStatus === 'true') {
        let avatar = getUserAvatar()
        let nickname = getUserNickname()
        let html = '<a href="/view/user/index"><img class="avatar" src="' + avatar + '"/></a>'
            + '<span class="nickname">' + nickname + '</span>'
            + '<span class="text-btn logout-text-tip" onclick="onClickLogout()">[退出]</span>';
        $('#box-user').html(html)
    } else {
        let html = '<span class="text-btn login-text-tip" onclick="onClickOpenLoginBox()">登录</span>'
            + '<a class="a-goto-link a-goto-register" target="_blank" href="/view/auth/register">注册</a>';
        $('#box-user').html(html)
    }
}

// 打开登录盒子
function onClickOpenLoginBox() {
    layerFormLogin = layer.open({
        type: 1,
        title: 'Please sign in',
        skin: 'layui-layer-demo', //样式类名
        closeBtn: 1, //不显示关闭按钮
        anim: 1,
        shade: [0.8],
        area: ['450px', ''],
        shadeClose: true, //开启遮罩关闭
        content: $('.box-login-form')
    });
}
// 打开移动端登录盒子
function onClickOpenMobileLoginBox() {
    layerFormLogin = layer.open({
        type: 1,
        title: 'Please sign in',
        skin: 'layui-layer-demo', //样式类名
        closeBtn: 1, //不显示关闭按钮
        anim: 1,
        shade: [0.8],
        area: ['350px', ''],
        shadeClose: true, //开启遮罩关闭
        content: $('.box-login-form')
    });
}

function onClickGotoRegister() {
    window.location.href='../auth/register.html'
}

function getUserPersonInfo() {
    let token = getToken()
    $.ajax({
        // 请求方式
        type: "get",
        // 请求的媒体类型
        contentType: "application/json",
        header: 'token=' + token,
        // 请求地址
        url: "/api-index/user/person-info",
        // 数据，json字符串
        data: {},
        //请求成功
        success: function (result) {
            if (result.success) {
                let avatar = result.data.headUrl
                let nickname = result.data.nickname
                let uid = result.data.uid
                let email = result.data.email
                let sex = result.data.sex
                let city = result.data.city

                setUserNickname(nickname)
                setUserAvatar(avatar)

                // 刷新用户状态
                refreshUserStatus()

                // 提示登录成功
                layer.msg('登录成功')

                // 关闭登录框
                layer.close(layerFormLogin)
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
}

// 退出登录
function onClickLogout() {
    let token = getToken()
    $.ajax({
        // 请求方式
        type: "get",
        // 请求的媒体类型
        contentType: "application/json",
        header: 'token=' + token,
        // 请求地址
        url: "/admin/auth/logout",
        // 数据，json字符串
        data: {},
        //请求成功
        success: function (result) {
            if (result.success) {
                layer.msg('退出成功')

                // 注销登录标记
                userLogout()

                // 清除 token
                clearToken()

                // 清除用户信息
                clearUserInfo()

                // 刷新用户状态
                refreshUserStatus()
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
}

// 打印自我介绍
function printMyselfIntroduction() {
    const html ='你好，欢迎来到我的个人网站！'
                    + '\n我是冯文议，是一名Java Coder。'
                    + '\n我的工作是程序设计与软件开发。'
                    + '\n同时，我也在写开源软件，如：JavaLib、api-result。'
                    + '\n除此之外，'
                    + '\n我也有其他一些爱好，'
                    + '\n看电影、听音乐、玩游戏、旅行。'
                    + '\n快来和我交个朋友吧。'
                    + '\n记得在社交平台上关注我哦！！！'
                    ;
    console.log(html)
}
