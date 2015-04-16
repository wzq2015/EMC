<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<link href="../EF/EF.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript"">
  var CONTEXT_PATH = ".."; 
</script>
<script type="text/javascript" src="../EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="../EF/iplat-ui-2.0.js"></script>

<script type="text/javascript">

    function OnLoad(){
      var dialog = window.parent;      
      dialog.InnerDialogLoaded();
      dialog.disableNext(true);
      dialog.disableFinish(false);  
    }
    
    function validate(){    
    	var errors = [];
      	var file = $("input[type=file]").val(); 
		var fso = new ActiveXObject("Scripting.FileSystemObject");  
		if( !fso.FileExists(file) )
		{
	        errors.push("上传文件为空或者不存在!");
		}
		
		var _expmax = $("input[id=expmax]").val();
		
		var validate = new efvalidator();
		validate.setRegexType("positive_integer");
		validate.setMaxLength(2);
		validate.setNullable(false);
		try{
		  var ret = validate.validate( _expmax );
		}catch(ex){
		  errors.push("打印异常数必须为正整数(最长为两位，且不可为空)");
		}  		
		
    	return errors;
    }
    
    function onFinish(){
      var dialog = window.parent; 
      var impT = dialog.properties()["DataType"];      
      var _encoding = $("select[id=encoding]").val();
      var _erropt = $("select[id=erropt]").val();
      var _expmax = $("input[id=expmax]").val();
      document.forms[0].action = "../ES/AX/upload.jsp?im=INTER_RESOURCE" + "&encoding=" + _encoding + "&erropt=" + _erropt + "&expmax=" + _expmax;
      document.forms[0].submit();
    }
    
    function setMessage(msg){
      var _msg = msg.replace( /<br>/g, "\n" );      
      $("#hintArea").val( _msg ); 
    }

</script>
</head>

<body onload="OnLoad()" style="overflow: hidden">
  <iframe name='iframeUpload' width="0" frameBorder="0" height="0" scrolling="no"></iframe>
  <form method="POST" action="upload.jsp" target="iframeUpload" enctype="multipart/form-data">
<p><strong>* 上传文件的编码必须和选择的编码对应, 否则会有乱码问题</strong></p>
<p><strong>* 请根据服务器的配置, 酌情设置打印异常的个数</strong></p>
<p><strong style="color: red;">* ★
进行导入操作之前，请先<a target="_blank"
	href="<%=contextpath%>/ES/AX/SetIESafeMode.html">设置IE安全模式</a></strong></p>
<form id="exportForm" name="exportForm" method="POST" action="<%=listUrl%>">
<div id="p" style="width:100%,height:100%"></div>
   <p/>
    <table width="80%">      
      	<tr>
      		<td nowrap>上传文件: </td>
	        <td>
	          <input type="file" name="uploadFile" size="80" class='inputField'>			
	        </td>	        
	    </tr>      		
      		
      <tr>
      	  <td nowrap> 文件编码: </td>
		  <td>
		    <select id="encoding" class="pulldown" size="1" name="encoding">		      		      
		      <option value="GBK">&nbsp;GBK&nbsp;</option>
		      <option value="UTF-8">&nbsp;UTF-8&nbsp;</option>
		    </select>
		  </td>
      </tr> 
      
      <tr>
        <table>
          <tr>
            <td>出错处理:</td>
            <td width="50">		     
		     <select id="erropt" class="pulldown" size="1" name="erropt">		      		      
		      <option value="QUIT">&nbsp;出错结束&nbsp;</option>
		      <option value="RESM">&nbsp;忽略错误&nbsp;</option>
		     </select>
		    </td>
		    <td>&nbsp;&nbsp;</td>
		    <td>打印异常数:</td>
		    <td>
		      <div id = "ef_region_edit">		    
                <input id="expmax" name="expmax" type='text' size='10' class='inputField' validateType="positive_integer" value="5" />
              </div>
		    </td>		    
          </tr>
        </table>
		  
      </tr>	    
    </table>    
    
    <br/>
    
    <table width="80%">      
      <tr>
        <td colspan=2>
          <hr width=100% size=2 color=#505050 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"/>   
        </td>
      </tr>
          
      <tr>      
        <td width="10%" nowrap>
           处理结果:           
        </td>
        <td></td>
      </tr>
      
      <tr>              
        <td colspan="2">
          <div id="hint">
            <textarea id="hintArea" name="hintArea" wrap="virtual" cols="120" rows="15"></textarea>
          </div>
        </td>
      </tr>
    </table>
    
  </form>
</body>
</html>
