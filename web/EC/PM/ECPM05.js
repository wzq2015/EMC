
 function upload(){
	var logoSeq=document.getElementById("logoSeq").value;
	document.forms[0].action += "&logoSeq="+logoSeq;
   	if(check()&&checkSize()){
		document.forms[0].submit();  
		ef.get("uploadTable").style.display="none";
		ef.get("uploadFileIframe").style.display="block";
	}
}
/*
	按照图片比例显示对应高度
*/
function checkImg(){
	var filespec=document.getElementById("myfile").value;
    var fso, f;
    var maxsize=50*1024*1024;//定义允许文件的大小，单位B
    fso = new ActiveXObject("Scripting.FileSystemObject");
 
    if (fso.FileExists(filespec))   {
            f = fso.GetFile(filespec);
    } else {
            alert("该文件不存在！");
            return false;
    }
}

//文件上传前的判断
function check(){
	var logoSeq=document.getElementById("logoSeq").value;
	if(logoSeq.trim()==""){
		alert("logo序号不能为空");
		return false;
	}
    var  fileName=getFileName();
	if(fileName!=false){
	   var fileLength=efutils.getTotalBytes(fileName);
	   if(fileLength>255){
	      alert("文件名长度不能超过255个字节");
	      return false;
	   }
	   
	   if(!checkSuffix()){
	      return false;
		}	   
	    return true;
	}else{
	    alert("文件路径不可为空");
	    return false;
	}

}
//文件上传前的大小判断
function checkSize(){
   var filespec=document.getElementById("myfile").value;
   var fso, f;
   var maxsize=1*1024*1024;//定义允许文件的大小，单位B
   fso = new ActiveXObject("Scripting.FileSystemObject");
 
   if (fso.FolderExists(filespec)) {
      f = fso.GetFolder(filespec);
    } else if (fso.FileExists(filespec))   {
            f = fso.GetFile(filespec);
        }   else   {
            alert("该文件不存在！");
            return false;
    }
   if(f.size>maxsize)
    {  
        alert("上传文件大小不可超过1M");
        return false;
    }
   return true;

  
}
//获取文件名，不包含路径
function getFileName(){
  var fileName=document.getElementById("myfile").value;
  fileName=fileName.trim();
  if(fileName!=''){
  var index1=fileName.lastIndexOf('/');
  var index2=fileName.lastIndexOf('\\');
  var index=0;
  if(index1!=-1)
     index=index1;
   if(index2!=-1&&index2>index1)
     index=index2;
     if(index==0){
       alert("上传文件路径不正确");
       return false;
       }
   else
        fileName=fileName.substring(index+1);
  		return fileName;
	}else{
		return false;
    }
}
//判断后缀名是否正确
function checkSuffix(){
   var fileName=getFileName();
   if(fileName!=false){
      var index=fileName.lastIndexOf(".");
      var suffix='';
   //若该文件有后缀名
      if(index!=-1&&index!=fileName.length-1){
         suffix=fileName.substring(index+1);
         suffix=suffix.toLowerCase();
       }
       
      if(checkImage(suffix)==false){
      		return false;
      }else{
      	return true;
      }
   
   }else{
   		alert("该文件没有后缀名");
   		return false;
   }
}

 //是否符合图片类型文档的后缀名
 function checkImage(suffix){
   if(suffix=="jpg"||suffix=="gif"||suffix=="png"||suffix=="bmp"){
      return true;
    }else{
      alert("请上传图片类型文件(.jpg,.gif,.png,.bmp)");
      return false;
    }
 }
 
 efform_onPopupReturn = function(winId, obj){
	window.returnValue=obj;
	window.close();
 }

