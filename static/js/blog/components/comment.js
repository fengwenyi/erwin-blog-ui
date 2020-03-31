
// 打开评论盒子
function onClickOpenCommentBox() {
	layerFormLogin = layer.open({
		type: 1,
		title: 'Comment',
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
function onClickOpenMobileCommentBox() {
	layerFormLogin = layer.open({
		type: 1,
		title: 'Comment',
		skin: 'layui-layer-demo', //样式类名
		closeBtn: 1, //不显示关闭按钮
		anim: 1,
		shade: [0.8],
		area: ['350px', ''],
		shadeClose: true, //开启遮罩关闭
		content: $('#pop-form-box')
	});
}
