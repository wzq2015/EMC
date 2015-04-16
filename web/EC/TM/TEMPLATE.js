var href=location.href;
href=href.replace("edit_1_plus_1","");
setTimeout("sleep()",2000);
function sleep(){
	if(document.getElementById('button1')==null)
	{
		creatPreviewButtton();
	}
}
/*在页面右上方创建一个预览按钮*/
function creatPreviewButtton(){
	sWidth=document.body.offsetWidth-20;
	sHeight=document.body.scrollHeight;
	msgw=10;msgh=10;
	var msgObj=document.createElement("div");
	msgObj.setAttribute("id","msgDiv");
	msgObj.setAttribute("align","center");
	msgObj.style.position="absolute";
	msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
	msgObj.style.border="0px solid ";
	msgObj.style.width=msgw + "px";
	msgObj.style.height=msgh + "px";
	msgObj.style.top="0";
	document.body.appendChild(msgObj);
	var button=document.createElement("h4");
	button.setAttribute("align","right");
	button.setAttribute("valign","bottom");
	button.style.margin="0";
	button.innerHTML='<input id="button1" type="button" value="预 览" title="点击进行页面预览" style="background-color:#ff0000;border-color:#000000; border-style:solid;border:20px;height:26px; width:65px;color:#FFFFFF; font-size:9pt;cursor:hand;">&nbsp;&nbsp;&nbsp;';
	document.getElementById("msgDiv").appendChild(button);
	document.getElementById("button1").onclick = function(){
		window.open(href,"","top=0,left=0,menubar=yes,toolbar=yes,resizable=yes,status=yes,scrollbars=yes,width="+screen.width+",height="+screen.availHeight+"");
	}

}