/**
 * common.js 定义的普通函数
 * 函数 调用才能使用 因此,此文件不能加 window.onload
 * 我们应该在 html 页面使用window.onload
 * 如果是一个单独的js文件,它是处理业务逻辑,并不是函数的声明,我们需要加 window.onload
 */

/**
 * ele 事件源,它是一个元素,给谁身上绑定就写谁
 * type 事件类型 (参数例如 : click , mouseover)
 * handler 监听器 ,是一个函数 , 写的时候不能带括号(带括号就错了)
 */


function addEvent( ele , type , handler ) {
	// 判断 你当前这个浏览器 -> 是否识别 addEventlistener
	if( ele.addEventListener ) {
		//标准浏览器 帮我绑定事件
		ele.addEventListener( type , handler);
	}else if( ele.attachEvent ){
		//ie8 帮我绑定事件
		ele.attachEvent( 'on' + type , handler);
	}else {
		// 最古老的浏览器 -> ele.onclick = function();
		ele['on'+type] = handler;
	}
}



/**
 * ele 事件源,它是一个元素,给谁身上绑定就写谁
 * type 事件类型 (参数例如 : click , mouseover)
 * handler 监听器 ,是一个函数 , 写的时候不能带括号(带括号就错了)
 */

function removeEvent( ele , type , handler ) {
	// 判断 你当前这个浏览器 -> 是否识别 addEventlistener
	if( ele.removeEventListener ) {
		//标准浏览器 帮我绑定事件
		ele.removeEventListener( type , handler);
	}else if( ele.detachEvent ){
		//ie8 帮我绑定事件
		ele.detachEvent( 'on' + type , handler);
	}else {
		// 最古老的浏览器 -> ele.onclick = function();
		ele['on'+type] = null;
	}
}

/**
 * 补充: 自己写上 获取嵌入式css样式的兼容函数
 * window.getComputedStyle     元素.currentStyle
 */
/*
	封装兼容函数: 获取浏览器计算出来的样式
	应该将此函数写在 common.js
	el , element 传入需要获取的元素
 */

function getStyle(el){
	var elStyle;   //兼容所有浏览器的计算后的样式
	if(window.getComputedStyle){   //标准浏览器
		elStyle = window.getComputedStyle(el);
	}else{   //IE低版本浏览器
		elStyle = el.currentStyle;
	}

	return elStyle;
}