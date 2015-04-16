
/**
 * 新增按钮执行的操作
 * 
 */
button_f1_onclick = function(){ //新增
	
	var inInfo = new EiInfo();
	var userId = ef.get("inqu_status-0-userId").value;
	inInfo.set("userId",userId);
	EiCommunicator.send("ES26","query", inInfo, null, false,false);
	if (ajaxEi != null) {
			if(ajaxEi.get("user_status")=="user_exist_iplat"){
				alert(getI18nMessages("label.ESUserAlreadyExist","该用户在系统中已经存在")+"【"+userId+"】");
				ajaxEi = null;
				ef.get("inqu_status-0-userId").select();
				return;
			}
					
	}	
	
	
	
	if(efvalidateDiv("ef_region_result")){
		//ef.get("methodName").value="insert";
		//document.forms[0].submit();	
		var info = new EiInfo();
		info.setByNodeObject( document.forms[0] );

		EiCommunicator.send("ES261", "insert", info, null);
	}
} 

/**
 * 输入框失去焦点的校验
 * @param {} node
 * @param {} needAlert
 * @param {} notNeedFocus
 * @return {Boolean}
 */
function efvalidateObjectNode(node, needAlert,notNeedFocus)
{
	if(node == null)
	{ 
		alert(getI18nMessages("label.ESShouldPointToANode","需指定一个节点"));
		return false;
	}
	var currentObj = node;
	if(currentObj.type=="textarea" || currentObj.type=="text" ||currentObj.type=="select-one")
	{
		var validate = new efvalidator();
		validate.setRegexType( currentObj["validateType"]!=null?
			currentObj["validateType"] : "" );
		validate.setRegex( currentObj["regex"]!=null?
			currentObj["regex"]:null );
		validate.setNullable( currentObj["nullable"]!=null?
			currentObj["nullable"]: true );
		validate.setMaxLength( currentObj["maxLength"]!=null?
			currentObj["maxLength"]: Number.MAX_VALUE );
		validate.setMinLength( currentObj["minLength"]!=null?
			currentObj["minLength"]: 0 );
		validate.setErrorPrompt( currentObj["errorPrompt"]!=null?
			currentObj["errorPrompt"]:"" );	
		try
		{		

			if(currentObj.style.display == "none" || currentObj.style.visibility =="hidden")
		   		return true;
		   	else 
		   		validate.validate(currentObj.value)	
		} 
		catch(ex)
		{
		    if(needAlert != false){
		    	ef.get(node.id+"-prompt").style.backgroundColor="red";
		      //alert("校验出错，原因为[" + ex.message + "]");
		    }
		    if(!!notNeedFocus == false)  {
			    	currentObj.focus();
		    		if(currentObj.type=="textarea" || currentObj.type=="text")
			    		currentObj.select();
		    	}
	
		    return false;
		}
	}
	ef.get(node.id+"-prompt").style.backgroundColor="white";
	

	return true ;
}	

button_checkUser_onclick = function(){

				var inInfo = new EiInfo();
				var userId = ef.get("inqu_status-0-userId").value;

				if(!efvalidateObjectNode(ef.get("inqu_status-0-userId"),true,true)){
					efform.setStatus(-1,getI18nMessages("label.ESUserIdRestraint","用户名只能是256位英文字母或者数字字符。"));
					return ;
				}
				
				inInfo.set("userId",userId);
	
				EiCommunicator.send("ES26","query", inInfo, null, false,false);
				if (ajaxEi != null) {
					if(ajaxEi.get("user_status")=="user_exist_iplat"){
						efform.setStatus(-1,getI18nMessages("label.ESUserAlreadyExist","该用户在系统中已经存在")+"【"+userId+"】");
						ajaxEi = null;
						//ef.get("inqu_status-0-userId").select();

					}else{
						efform.setStatus(0,getI18nMessages("label.ESUserNotExist","该用户在系统中不存在，可以创建")+"【"+userId+"】");
					}
					
				}
				
}


