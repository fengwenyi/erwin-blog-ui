
$('#header').load('../common/header.html')
$('#footer').load('../common/footer.html')


layui.use('element', function(){
	var element = layui.element;

	//…
});

// 打开评论盒子
function onClickOpenEditPersonalInfoBox() {
	layerFormLogin = layer.open({
		type: 1,
		title: 'Edit Your Personal Info',
		skin: 'layui-layer-demo', //样式类名
		closeBtn: 1, //不显示关闭按钮
		anim: 1,
		shade: [0.8],
		area: ['450px', ''],
		shadeClose: true, //开启遮罩关闭
		content: $('#pop-form-box')
	});
}
// 打开评论盒子
function onClickOpenMobileEditPersonalInfoBox() {
	layerFormLogin = layer.open({
		type: 1,
		title: 'Edit Your Personal Info',
		skin: 'layui-layer-demo', //样式类名
		closeBtn: 1, //不显示关闭按钮
		anim: 1,
		shade: [0.8],
		area: ['350px', ''],
		shadeClose: true, //开启遮罩关闭
		content: $('#pop-form-box')
	});
}



function onClickOpenSelectHead(){
	return  $("#input-file-head").click();
}

$(function () {
	$('#input-file-head').change(function () {
		//    ②如果value不为空，调用文件加载方法
		if($(this).val() !== ""){
			layer.msg('开始上传文件')
		}
	})
})

//③创建fileLoad方法用来上传文件
function fileLoad(ele){
	//④创建一个formData对象
	let formData = new formData();
	//⑤获取传入元素的val
	let name = $(ele).val();
	//⑥获取files
	let files = $(ele)[0].files[0];
	//⑦将name 和 files 添加到formData中，键值对形式
	formData.append("file", files);
	formData.append("name", name);
	$.ajax({
		url: "test.php",
		type: 'POST',
		data: formData,
		processData: false,// ⑧告诉jQuery不要去处理发送的数据
		contentType: false, // ⑨告诉jQuery不要去设置Content-Type请求头
		beforeSend: function () {
			//⑩发送之前的动作
			alert("我还没开始发送呢");
		},
		success: function (responseStr) {
			//11成功后的动作
			alert("成功啦");
		}
		,
		error : function (responseStr) {
			//12出错后的动作
			alert("出错啦");
		}
	});
}
