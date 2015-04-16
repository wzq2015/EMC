/*
 * EF
 * Copyright(c) 2006, Jack Slocum.
 * 
 * This code is licensed under BSD license. Use it as you wish, 
 * but keep this copyright intact.
 */


efresource=function(){this.international=true;this.resource={};this.prototype=new Object();}
efresource.prototype.setResource=function(resource){this.resource=resource;}
efresource.prototype.get=function(key){return this.resource[key];}
efresource.prototype.set=function(key,value){this.resource[key]=value;}
efresource.prototype.getInternationalValue=function(key,defaultvalue){var value=this.get(key);if(value!=undefined){return value;}
var info=new EiInfo();info.set("interkey",key);info.set("defaultvalue",defaultvalue);EiCommunicator.send("ED11","getI18nMessages",info,resourcecallback,false);}
efresource.prototype.getInternationalValues=function(keys){var info=new EiInfo();info.set("keys",keys);EiCommunicator.send("ED11","getMultiResources",info,multicallback,false);}
var resource=new efresource();resourcecallback={onSuccess:function(eiInfo){var key=eiInfo.get("interkey");var value=eiInfo.get("value");resource.set(key,value);},onFail:function(eMsg){}}
multicallback={onSuccess:function(eiInfo){var i18n=eiInfo.getBlock("i18nResources").getAttr();for(var key in i18n){resource.set(key,i18n[key]);}},onFail:function(eMsg){}}
getI18nMessages=function(){if(arguments.length>0&&arguments.length<3){var key=arguments[0];var defaultvalue=arguments[1];if(defaultvalue==undefined){defaultvalue="";}
if(efresource.config!=undefined&&efresource.config.INTERNATIONAL!=undefined&&efresource.config.INTERNATIONAL=="true"){resource.getInternationalValue(key,defaultvalue);return resource.get(key);}
else{return defaultvalue;}}else if(arguments.length==3){var key=arguments[0];var args=arguments[1];var defaultvalue=arguments[2];if(defaultvalue==undefined){defaultvalue="";}
if(efresource.config!=undefined&&efresource.config.INTERNATIONAL!=undefined&&efresource.config.INTERNATIONAL=="true"){resource.getInternationalValue(key,defaultvalue);return replaceParams(resource.get(key),args);}
else{return defaultvalue;}}else{alert("Incorrect arguments in getI18nMessages()");}}
function replaceParams(string,replacements){return string.replace(/\{(\d+)\}/g,function(){return replacements[arguments[1]];});}

function JSON2String(obj){if(typeof obj=="number"){return isFinite(obj)?String(obj):"null";}
if(typeof obj=="boolean"){return String(obj);}
if(typeof obj=="date"){function f(n){return n<10?'0'+n:n;}
return'"'+obj.getFullYear()+'-'+
f(obj.getMonth()+1)+'-'+
f(obj.getDate())+'T'+
f(obj.getHours())+':'+
f(obj.getMinutes())+':'+
f(obj.getSeconds())+'"';}
if(typeof obj=="array"||obj instanceof Array){var a=['['],b,i,l=obj.length,v;function pa(s){if(b){a.push(',');}
a.push(s);b=true;}
for(i=0;i<l;i+=1){v=obj[i];switch(typeof v){case'undefined':case'function':case'unknown':break;case'object':default:pa(JSON2String(v));}}
a.push(']');return a.join('');}
if(typeof obj=="string"||obj instanceof String){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};if(/["\\\x00-\x1f]/.test(obj)){return'"'+obj.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return'\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"';}
return'"'+obj+'"';}
if(typeof obj=="object"){var a=['{'],b,k,v;function p(s){if(b){a.push(',');}
a.push(JSON2String(k),':',s);b=true;}
for(k in obj){if(obj.hasOwnProperty(k)){v=obj[k];switch(typeof v){case'undefined':case'function':case'unknown':break;case'object':default:p(JSON2String(v));}}}
a.push('}');return a.join('');}}
function IsInteger(strInteger){var newPar=/^(-|\+)?\d+$/;return newPar.test(strInteger);}
function GetServiceUrl(tar){return"/POR/"+tar;}
function GetJSONBlock(eiinfo,name){return eiinfo.getBlock(name);}
function GetJSONData(eiinfo,name){return GetJSONBlock(eiinfo,name).getRows();}
function GetJSONColDefine(eiinfo,name){var metas=eiinfo.getBlock(name).getBlockMeta().getMetas();columns=[];for(var key in metas){var eiCol=metas[key];var col={};col.key=key;col.name=eiCol.getName();col.descName=eiCol.getDescName();col.primaryKey=eiCol.isPrimaryKey();col.isNotNull=eiCol.isNotNull();col.maxLength=eiCol.getMaxLength();col.editor=eiCol.getEditor();col.regex=eiCol.getRegex();col.formatter=eiCol.getFormatter();col.type=eiCol.getType();col.multiService=eiCol.get("multiselectservice");col.multiCol=eiCol.get("multiselectcol");col.list=eiCol.get("list");col.helpMessage=eiCol.get("HELP");this.columns.push(col);}
return columns;}
function GetJSONParam(eiinfo,name){return GetJSONBlock(eiinfo,name).attributes;}

var CONTEXT_PATH=CONTEXT_PATH?CONTEXT_PATH:".";function AbstractEi(){this.extAttr={};};AbstractEi.prototype.get=function(prop){return this.extAttr[prop];};AbstractEi.prototype.set=function(prop,value){this.extAttr[prop]=value;};AbstractEi.prototype.getAttr=function(){return this.extAttr;};AbstractEi.prototype.setAttr=function(sAttr){this.extAttr=sAttr;};function EiColumn(name){this.pos=-1;this.name=name;this.descName="";this.type="C";this.regex=null;this.formatter=null;this.editor="text";this.minLength=0;this.maxLength=Number.MAX_VALUE;this.primaryKey=false;this.nullable=true;this.visible=true;this.readonly=false;this.displayType="text";this.errorPrompt=null;this.dateFormat=null;this.defaultValue="";this.validateType=null;this.width=96;this.height=18;this.align="left";this.blockName=null;this.sourceName=null;this.labelProperty=null;this.valueProperty=null;this.extAttr={};};EiColumn.prototype=new AbstractEi;function EiBlockMeta(sBlockId){this.blockId=sBlockId;this.metas={};this.extAttr={};this.colCount=0;}
EiBlockMeta.prototype=new AbstractEi;EiBlockMeta.prototype.setDesc=function(sDesc){this.desc=sDesc;};EiBlockMeta.prototype.getDesc=function(){return this.desc;};EiBlockMeta.prototype.addMeta=function(sEiColumn){if(sEiColumn instanceof EiColumn){this.metas[sEiColumn.name]=sEiColumn;if(sEiColumn.pos<0)
sEiColumn.pos=this.colCount;this.colCount++;}else{throw new Error("Can NOT add as an EiColumn");}};EiBlockMeta.prototype.getMeta=function(sName){return this.metas[sName];};EiBlockMeta.prototype.removeMeta=function(sName){delete this.metas[sName];};EiBlockMeta.prototype.getBlockId=function(){return this.blockId;};EiBlockMeta.prototype.getMetas=function(){return this.metas;};function EiBlock(blockId){if(typeof blockId=="string"){this.meta=new EiBlockMeta(blockId);}else if(blockId instanceof EiBlockMeta){this.meta=blockId;}else{throw new Error("Can NOT create block");};this.rows=new Array();this.colCount=0;this.extAttr={};};EiBlock.prototype=new AbstractEi;EiBlock.prototype.getBlockMeta=function(){return this.meta;};EiBlock.prototype.setBlockMeta=function(sBlockMeta){this.meta=sBlockMeta;};EiBlock.prototype.addRow=function(sRow){if(sRow==null){this.rows.push({});}else{this.rows.push(sRow);}};EiBlock.prototype.getRows=function(){return this.rows;};EiBlock.prototype.setCell=function(sRowNo,sColName,sValue){var pos=this.getBlockMeta().getMeta(sColName).pos;while(typeof(this.rows[sRowNo])=="undefined")this.addRow(null);this.rows[sRowNo][pos]=sValue;};EiBlock.prototype.getCell=function(sRowNo,sColName){var column=this.getBlockMeta().getMeta(sColName);if(column){var pos=this.getBlockMeta().getMeta(sColName).pos;return this.rows[sRowNo][pos];}else{return"";}};EiBlock.prototype.getCellByPos=function(sRowNo,sColPos){return this.rows[sRowNo][sColPos];};EiBlock.prototype.getMappedArray=function(obj){var cols=this.getBlockMeta().getMetas();var row=new Array();for(var col in cols){var pos=this.getBlockMeta().getMeta(col).pos;row[pos]=obj[col];}
return row;};EiBlock.prototype.getMappedObject=function(row){var cols=this.getBlockMeta().getMetas();var t=new Object();for(var key in cols){var col=cols[key];t[col.name]=row[col.pos];}
return t;};EiBlock.prototype.getMappedRows=function(){var ret=new Array();for(var i=0;i<this.rows.length;i++){var row=this.rows[i];var m=this.getMappedObject(row);ret.push(m);}
return ret;};EiBlock.prototype.clone=function(){return this;}
function EiInfo(sName){this.name=null;this.msg=null;this.msgKey=null;this.status=null;this.descName=null;this.blocks={};this.extAttr={};if(typeof sName=="string"){this.name=sName;}}
EiInfo.prototype=new AbstractEi;EiInfo.prototype.getName=function(){return this.name;};EiInfo.prototype.setName=function(sName){this.name=sName;};EiInfo.prototype.setMsg=function(sMsg){this.msg=sMsg;};EiInfo.prototype.getMsg=function(){return this.msg;};EiInfo.prototype.setMsgKey=function(sMsgKey){this.msgKey=sMsgKey;};EiInfo.prototype.getMsgKey=function(){return this.msgKey;};EiInfo.prototype.setDetailMsg=function(sMsg){this.detailMsg=sMsg;};EiInfo.prototype.getDetailMsg=function(){return this.detailMsg;};EiInfo.prototype.setStatus=function(s){this.status=s;};EiInfo.prototype.getStatus=function(){return this.status;};EiInfo.prototype.setDescName=function(sDescName){this.descName=sDescName;};EiInfo.prototype.getDescName=function(){return this.descName;};EiInfo.prototype.addBlock=function(sBlock){this.blocks[sBlock.getBlockMeta().getBlockId()]=sBlock;};EiInfo.prototype.getBlock=function(sBlockId){return this.blocks[sBlockId];};EiInfo.prototype.getBlocks=function(){return this.blocks;};EiInfo.prototype.set=function(){if(arguments.length==2){AbstractEi.prototype.set.apply(this,arguments);return;}
var sBlock=arguments[0];if(typeof(this.blocks[sBlock])=="undefined"){this.blocks[sBlock]=new EiBlock(sBlock);}
if(arguments.length==3){this.blocks[sBlock].set(arguments[1],arguments[2]);return;}
if(arguments.length==4){if(typeof(this.blocks[sBlock].getBlockMeta().getMeta(arguments[2]))=="undefined"){var cc=new EiColumn(arguments[2]);cc.pos=this.blocks[sBlock].colCount++;this.blocks[sBlock].getBlockMeta().addMeta(cc);}
this.blocks[sBlock].setCell(arguments[1],arguments[2],arguments[3]);return;}}
EiInfo.prototype.setById=function(id_in){this.setByNameValue(id_in,ef.get(id_in).value);}
EiInfo.prototype.setByNameValue=function(id_in,v){var idArray=id_in.split("-");if(idArray.length==3)return this.set(idArray[0],idArray[1],idArray[2],v);if(idArray.length==2)return this.set(idArray[0],idArray[1],v);if(idArray.length==1)return this.set(idArray[0],v);}
EiInfo.prototype.setByNode=function(node_id_in)
{this.setByNodeObject(ef.get(node_id_in));}
EiInfo.prototype.setByNodeObject=function(node_in)
{var cbs=new Object();var nodes=node_in.getElementsByTagName("input");for(var i=0;i<nodes.length;i++)
{if(nodes[i].type=="radio"&&!nodes[i].checked)
continue;if(nodes[i].type=="checkbox"){if(cbs[nodes[i].name]===undefined)
cbs[nodes[i].name]='';if(nodes[i].checked)
if(cbs[nodes[i].name].length==0)
cbs[nodes[i].name]=nodes[i].value;else
cbs[nodes[i].name]=cbs[nodes[i].name]+','+nodes[i].value;continue;}
this.setByNameValue(nodes[i].name,nodes[i].value);}
for(var cbname in cbs)
this.setByNameValue(cbname,cbs[cbname]);nodes=node_in.getElementsByTagName("select");for(var i=0;i<nodes.length;i++)
{if(nodes[i].options.length>0)
this.setByNameValue(nodes[i].name,nodes[i].options[nodes[i].selectedIndex].value);}
var nodes=node_in.getElementsByTagName("textarea");for(var i=0;i<nodes.length;i++){this.setByNameValue(nodes[i].name,nodes[i].value);}}
var EiInfoJsonConstants={ATTRIBUTES:"attr",EIINFO_NAME:"name",EIINFO_DESC_NAME:"descName",EIINFO_MESSAGE:"msg",EIINFO_MESSAGE_KEY:"msgKey",EIINFO_DETAIL_MESSAGE:"detailMsg",EIINFO_STATUS:"status",EIINFO_BLOCKS:"blocks",BLOCK_META:"meta",BLOCK_META_DESC:"desc",BLOCK_META_COLUMNLIST:"columns",BLOCK_META_COLUMNPOS:"columnPos",BLOCK_DATA:"rows"};function formatNative(obj){var str=JSON2String(obj);return str;}
function isAvailable(obj)
{if(obj===undefined){return false;};if(obj===null){return false;}
if(obj===""){return false;};return true;}
function EiInfo2Json(){};EiInfo2Json.prototype.EiInfo2JsonString=function(sEiInfo){var a=['{'];var appendComma;if(isAvailable(sEiInfo.getName())){a.push(EiInfoJsonConstants.EIINFO_NAME,':',formatNative(sEiInfo.getName()));appendComma=true;}
if(isAvailable(sEiInfo.getDescName())){if(appendComma){a.push(',');};a.push(EiInfoJsonConstants.EIINFO_DESC_NAME,':',formatNative(sEiInfo.getDescName()));appendComma=true;}
if(isAvailable(sEiInfo.getAttr())){if(appendComma){a.push(',');};a.push(EiInfoJsonConstants.ATTRIBUTES,':',formatNative(sEiInfo.getAttr()));appendComma=true;}
if(appendComma){a.push(',');};a.push(EiInfoJsonConstants.EIINFO_BLOCKS,':{');var blocks=sEiInfo.getBlocks();var b;for(var iKey in blocks){var block=blocks[iKey];if(b){a.push(',');}
a.push(iKey,':',EiInfo2Json.prototype.EiBlock2JsonString(block));b=true;}
a.push('}}');return a.join('');};EiInfo2Json.prototype.EiBlock2JsonString=function(sBlock){var a=['{'];a.push(EiInfoJsonConstants.ATTRIBUTES,':',formatNative(sBlock.getAttr()));a.push(',',EiInfoJsonConstants.BLOCK_META,':',EiInfo2Json.prototype.EiBlockMeta2JsonString(sBlock.getBlockMeta()));a.push(',',EiInfoJsonConstants.BLOCK_DATA,':[');var rows=sBlock.getRows();var b;for(var i=0;i<rows.length;i++){var row=rows[i];if(b){a.push(',');}
a.push('[');var columns=sBlock.getBlockMeta().getMetas();var c;for(var jKey in columns){var column=columns[jKey];if(c){a.push(',');};a.push(formatNative(row[column.pos]));c=true;}
b=true;c=false
a.push(']');}
a.push(']}');return a.join('');};EiInfo2Json.prototype.EiBlockMeta2JsonString=function(sBlockMeta){var a=['{'];var appendComma;if(isAvailable(sBlockMeta.getDesc())){a.push(EiInfoJsonConstants.BLOCK_META_DESC,':',formatNative(sBlockMeta.getDesc()));appendComma=true;}
if(isAvailable(sBlockMeta.getAttr())){if(appendComma){a.push(',');};a.push(EiInfoJsonConstants.ATTRIBUTES,':',formatNative(sBlockMeta.getAttr()));appendComma=true;}
if(appendComma){a.push(',');};a.push(EiInfoJsonConstants.BLOCK_META_COLUMNLIST,':[');var columns=sBlockMeta.getMetas();var b;for(var iKey in columns){var column=columns[iKey];if(b){a.push(',');}
a.push(EiInfo2Json.prototype.EiColumn2JsonString(column));b=true;}
a.push(']}');return a.join('');};EiInfo2Json.prototype.EiColumn2JsonString=function(sColumn){var a=['{'];a.push('name',':',formatNative(sColumn.name));a.push(',');a.push('descName',':',formatNative(sColumn.descName));a.push('}');return a.join('');}
function Json2EiInfo(){};Json2EiInfo.prototype.parseString=function(sJson){var eiJson=eval("("+sJson+")");Json2EiInfo.prototype.parseJson(eiJson);}
Json2EiInfo.prototype.parseJsonObject=function(eiJson){var eiInfo=new EiInfo();var value=eiJson[EiInfoJsonConstants.EIINFO_NAME];if(isAvailable(value)){eiInfo.setName(value);}
var value=eiJson[EiInfoJsonConstants.EIINFO_DESC_NAME];if(isAvailable(value)){eiInfo.setDescName(value);}
var value=eiJson[EiInfoJsonConstants.EIINFO_MESSAGE];if(isAvailable(value)){eiInfo.setMsg(value);}
var value=eiJson[EiInfoJsonConstants.EIINFO_MESSAGE_KEY];if(isAvailable(value)){eiInfo.setMsgKey(value);}
var value=eiJson[EiInfoJsonConstants.EIINFO_DETAIL_MESSAGE];if(isAvailable(value)){eiInfo.setDetailMsg(value);}
var value=eiJson[EiInfoJsonConstants.EIINFO_STATUS];if(isAvailable(value)){eiInfo.setStatus(value);}
var value=eiJson[EiInfoJsonConstants.ATTRIBUTES];if(isAvailable(value)){eiInfo.setAttr(value);}
var value=eiJson[EiInfoJsonConstants.EIINFO_BLOCKS];if(isAvailable(value)){for(var bIds in value){var block=Json2EiInfo.prototype.parseBlock(bIds,value[bIds]);eiInfo.addBlock(block);}}
return eiInfo;};Json2EiInfo.prototype.parseBlock=function(sId,blockJson){var block;var value=blockJson[EiInfoJsonConstants.BLOCK_META];if(isAvailable(value)){var blockMeta=Json2EiInfo.prototype.parseBlockMeta(sId,value);block=new EiBlock(blockMeta);}else{block=new EiBlock(sId);}
var value=blockJson[EiInfoJsonConstants.ATTRIBUTES];if(isAvailable(value)){block.setAttr(value);}
var value=blockJson[EiInfoJsonConstants.BLOCK_DATA];if(isAvailable(value)){block.rows=value;}
return block;}
Json2EiInfo.prototype.parseBlockMeta=function(sId,blockJson){var blockMeta=new EiBlockMeta(sId);var value=blockJson[EiInfoJsonConstants.BLOCK_META_DESC];if(isAvailable(value)){blockMeta.setDesc(value);}
var value=blockJson[EiInfoJsonConstants.ATTRIBUTES];if(isAvailable(value)){blockMeta.setAttr(value);}
var value=blockJson[EiInfoJsonConstants.BLOCK_META_COLUMNLIST];if(isAvailable(value)){for(var i=0;i<value.length;i++){var column=Json2EiInfo.prototype.parseColumn(value[i]);blockMeta.addMeta(column);}}
return blockMeta;}
Json2EiInfo.prototype.parseColumn=function(blockJson){var column=new EiColumn(blockJson.name);for(var iKey in blockJson){var columnValue=blockJson[iKey];if(columnValue.replace)
columnValue=columnValue.replace(/'/g,"&#39;");eval("column."+iKey+"='"+columnValue+"'");}
return column;}
var ajaxEi=new EiInfo();var EiCommunicator={send:function(sService,sMethod,sEiInfo,sCallback,hasForm,ajaxMode,noloading){if(efgrid.config!=undefined&&efgrid.config.SESSION_TIMEOUT!=undefined){if('function'==typeof(checkTimeOut))
{if(checkTimeOut())
{if(sCallback!=null&&typeof(sCallback)=="object"){if(typeof(sCallback.onFail)=="function")
sCallback.onFail("前台操作超时",-2);}
return;}}}
var modalWin=null;var resizeFunc=null;if(document.forms.length>0&&!noloading){resizeFunc=window.onresize;window.onresize=null;modalWin=new EFModalWindow('iplat-progressWindow');modalWin.showProgressBar();}
if(hasForm!=false){efform.setStatus(999,"["+sService+"."+sMethod+"]调用执行中...");}
if(ajaxMode!=true)ajaxMode=false;var jsonEi=EiInfo2Json.prototype.EiInfo2JsonString(sEiInfo);$.ajax({type:"POST",async:ajaxMode,url:CONTEXT_PATH+"/EiService",data:{service:sService,method:sMethod,eiinfo:jsonEi},dataType:"json",success:function(msg)
{ajaxEi=Json2EiInfo.prototype.parseJsonObject(msg);var r=ajaxEi.get("redirect");if(r!=null){self.location=r;}else{if(hasForm!=false){efform.setStatus(ajaxEi.status,ajaxEi.msg,ajaxEi.msgKey);efform.setDetailMsg(ajaxEi.detailMsg);}
if((typeof(sCallback)=="object")&&(sCallback!=null)){if(typeof(sCallback.onSuccess)=="function")sCallback.onSuccess(ajaxEi);}}
if(modalWin!=null){modalWin.hide();window.onresize=resizeFunc;}},error:function(xmlR,status,e)
{ajaxEi=null;var detailMsg=xmlR.responseText.split("$$$")[1];if(hasForm!=false){efform.setStatus(-1,"["+sService+"."+sMethod+"]"+getI18nMessages("ef.CallFailed","调用失败，原因")+"["+xmlR.responseText.split("$$$")[0]+"]");efform.setDetailMsg(detailMsg);}else{if(sCallback!=null&&typeof(sCallback)=="object"){if(typeof(sCallback.onFail)=="function")
sCallback.onFail(xmlR.responseText.split("$$$")[0],status,e);}}
if(modalWin!=null){modalWin.hide();window.onresize=resizeFunc;}}});},sendFuncCall:function(funcId,inInfo,callback){inInfo.set("funcId",funcId);EiCommunicator.send("EPFunc","call",inInfo,callback,false);},$send:function(sUrl,sContent,sCallback){if('function'==typeof(checkTimeOut))
{if(checkTimeOut())
{return;}}
$.ajax({type:"POST",async:false,url:sUrl,data:sContent,dataType:"json",success:function(msg){ajaxEi=Json2EiInfo.prototype.parseJsonObject(msg);sCallback.onSuccess(ajaxEi);},error:function(xmlR,status,e){sCallback.onFail(xmlR,status,e);}});}};

function cookie(ctx){this.context=ctx;if(document.cookie.length){this.cookies=' '+document.cookie;}}
cookie.prototype.setCookie=function(key,value){var uKey=this.context+key;document.cookie=uKey+"="+escape(value);}
cookie.prototype.getCookie=function(key){var uKey=this.context+key;if(this.cookies){var start=this.cookies.indexOf(' '+uKey+'=');if(start==-1){return null;}
var end=this.cookies.indexOf(";",start);if(end==-1){end=this.cookies.length;}
end-=start;var cookie=this.cookies.substr(start,end);return unescape(cookie.substr(cookie.indexOf('=')+1,cookie.length-cookie.indexOf('=')+1));}
else{return null;}}

var ef_version="2.0.10";var isNS=(typeof document.implementation!='undefined')&&(typeof document.implementation.createDocument!='undefined');var isIE=(typeof window.ActiveXObject!='undefined');var EF_SPLIT="__";var EF_FORMDATA_SPLIT="-";var EF_CR_IDENTIFIER="??";var EF_CR_HTML_IDENTIFIER="&para;&para;";var EF_IMAGES_PATH=CONTEXT_PATH+"/EF/Images/";var ef_validator_regexes=new Object();var ef_validator_errormsg=new Object();var EF_MSG={ROW:"ef.Row",COL:"ef.Col",FIX_COLUMN:"ef.FixColumn",DATA_COLUMN:"ef.DataColumn",SUBMIT_CONFIRM:"ef.SubmitConfirm",FROM:"ef.From",TO:"ef.To",TOGETHER:"ef.Together"};var EF_ERROR_MSG={VALIDATE_ERROR:"ef.DataCheckError",GRID_DIV_NOT_FOUND:"ef.GridDivNotFound",CELL_NOT_EDITABLE:"ef.UnitNotEdited"};var winMap=new Object();var winCount=0;efError=function(c,m){Error(m);this.errorCode=c;this.errorMsg=m;}
efError.prototype=new Error;efError.prototype.getCode=function(){return this.errorCode;}
efError.prototype.getMessage=function(){return this.errorMsg;}
if(![].indexOf){Array.prototype.indexOf=function(obj){for(var i=this.length;i--&&this[i]!==obj;);return i;}}
if(!"".trim){String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");}}

efico=function(){}
efico.get=function(ico_name)
{str=ico_name.split(".");model=str[0];name=str[1];return efico[model][name][0]+efico[model][name][1];}
efico.getName=function(ico_name){str=ico_name.split(".");model=str[0];name=str[1];return efico[model][name][1];}
efico.setNodeIcoUrl=function(node_id,ico_name){var node=document.getElementById(node_id);node.style.background='url('+efico.get(ico_name)+')';}
efico.setImageSrc=function(node_id,ico_name){var node;if(typeof node_id=="object")
node=node_id;else
node=window.document.getElementById(node_id);node.onload=null;node.src=efico.get(ico_name);}
efico.efregion={"expand":[EF_IMAGES_PATH,"efregion_expand.gif"],"collapse":[EF_IMAGES_PATH,"efregion_collapse.gif"],"clear":[EF_IMAGES_PATH,"efregion_clear.gif"],"save":[EF_IMAGES_PATH,"efregion_save.gif"],"load":[EF_IMAGES_PATH,"efregion_load.gif"],"delete":[EF_IMAGES_PATH,"ef_pop_up_delete.gif"]}
efico.efpage={"divHeadLine":[EF_IMAGES_PATH,"bgline01.gif"],"menuDivBgImg":[EF_IMAGES_PATH,"bgline02.gif"],"topDivBgImg":[EF_IMAGES_PATH,"ef_top_bg.gif"],"changePwd":[EF_IMAGES_PATH,"ChangePwd.png"],"changePwdOn":[EF_IMAGES_PATH,"ChangePwd-on.png"],"logOut":[EF_IMAGES_PATH,"LogOut.png"],"logOutOn":[EF_IMAGES_PATH,"LogOut-on.png"],"popUpWinInact":[EF_IMAGES_PATH,"pop_up_win_inact.gif"],"popUpWindow":[EF_IMAGES_PATH,"pop_up_window.gif"],"popUpWinInactOn":[EF_IMAGES_PATH,"pop_up_win_inact-on.gif"],"popUpWindowOn":[EF_IMAGES_PATH,"pop_up_window-on.gif"],"middleSplitter":[EF_IMAGES_PATH,"splitter_bg.jpg"]}
efico.efgrid={"pageSum":[EF_IMAGES_PATH,"efgrid_sum_page.png"],"totalSum":[EF_IMAGES_PATH,"efgrid_sum_total.png"],"pagingCount":[EF_IMAGES_PATH,"efgrid_paging_count.gif"],"addRow":[EF_IMAGES_PATH,"efgrid_add_row.gif"],"jumpPage":[EF_IMAGES_PATH,"efgrid_jump_page.gif"],"pageFirst":[EF_IMAGES_PATH,"efgrid_page_first.gif"],"pagePrevious":[EF_IMAGES_PATH,"efgrid_page_previous.gif"],"pageNext":[EF_IMAGES_PATH,"efgrid_page_next.gif"],"pageLast":[EF_IMAGES_PATH,"efgrid_page_last.gif"],"pageFirstDisabled":[EF_IMAGES_PATH,"efgrid_page_first_disabled.gif"],"pagePreviousDisabled":[EF_IMAGES_PATH,"efgrid_page_previous_disabled.gif"],"pageNextDisabled":[EF_IMAGES_PATH,"efgrid_page_next_disabled.gif"],"pageLastDisabled":[EF_IMAGES_PATH,"efgrid_page_last_disabled.gif"],"newForm":[EF_IMAGES_PATH,"ef_new_form.gif"],"blueDivider":[EF_IMAGES_PATH,"efbuttonbar_blue_divider.gif"],"gridBlueDivider":[EF_IMAGES_PATH,"efgrid_blue_divider.gif"],"gridBlueDivider2":[EF_IMAGES_PATH,"efgrid_blue_divider2.gif"],"columnSortAscend":[EF_IMAGES_PATH,"efcolumn_sort_ascend.gif"],"columnSortDecend":[EF_IMAGES_PATH,"efcolumn_sort_decend.gif"],"columnSortFlage":[EF_IMAGES_PATH,"efcolumn_sort_flage.gif"],"customColumn":[EF_IMAGES_PATH,"efgrid_custom_column.gif"],"frontAsc":[EF_IMAGES_PATH,"efgrid_front_asc.gif"],"frontBlank":[EF_IMAGES_PATH,"efgrid_front_blank.gif"],"frontDesc":[EF_IMAGES_PATH,"efgrid_front_desc.gif"],"pageJump":[EF_IMAGES_PATH,"efgrid_page_jump.jpg"]}
efico.eftab={"tab1":[EF_IMAGES_PATH,"tab1.gif"],"tab1Bottom":[EF_IMAGES_PATH,"tab1_bottom.gif"],"tab2":[EF_IMAGES_PATH,"tab2.gif"],"tab2Bottom":[EF_IMAGES_PATH,"tab2_bottom.gif"],"tab3":[EF_IMAGES_PATH,"tab3.gif"],"tab3Bottom":[EF_IMAGES_PATH,"tab3_bottom.gif"],"tabLeft":[EF_IMAGES_PATH,"tab-left.gif"],"tabRight":[EF_IMAGES_PATH,"tab-right.gif"],"tabHouseBg":[EF_IMAGES_PATH,"tag_house_bg.gif"],"tabHouseOff":[EF_IMAGES_PATH,"tag_house_off.gif"],"tabHouseOn":[EF_IMAGES_PATH,"tag_house_on.gif"],"tabBtn":[EF_IMAGES_PATH,"btn.gif"],"tabClose":[EF_IMAGES_PATH,"tab-close.gif"],"tabBtnLeft":[EF_IMAGES_PATH,"btnleft.gif"],"tabBtnRight":[EF_IMAGES_PATH,"btnright.gif"],"efformClose":[EF_IMAGES_PATH,"close.gif"]}
efico.efmenu={"arrowDown":[EF_IMAGES_PATH,"efmenu_arrowdown.png"],"arrowRight":[EF_IMAGES_PATH,"efmenu_arrowright.png"],"arrowRight2":[EF_IMAGES_PATH,"efmenu_arrowright2.png"]}
efico.eftree={"blank":[EF_IMAGES_PATH,"eftree_blank.png"],"cu":[EF_IMAGES_PATH,"eftree_cu.gif"],"file":[EF_IMAGES_PATH,"eftree_file.png"],"folderIcon":[EF_IMAGES_PATH,"eftree_foldericon.png"],"treeImgI":[EF_IMAGES_PATH,"eftree_i.png"],"treeImgL":[EF_IMAGES_PATH,"eftree_l.png"],"treeImgLminus":[EF_IMAGES_PATH,"eftree_lminus.jpg"],"treeImgLplus":[EF_IMAGES_PATH,"eftree_lplus.jpg"],"openFolderIcon":[EF_IMAGES_PATH,"eftree_openfoldericon.png"],"treeImgT":[EF_IMAGES_PATH,"eftree_t.png"],"treeImgTminus":[EF_IMAGES_PATH,"eftree_tminus.png"],"treeImgTplus":[EF_IMAGES_PATH,"eftree_tplus.png"],"treeImgForum":[EF_IMAGES_PATH,"forum.gif"],"treeImgGroup":[EF_IMAGES_PATH,"group.gif"],"treeImgActv":[EF_IMAGES_PATH,"shw_tree_actv.gif"],"treeImgInActv":[EF_IMAGES_PATH,"shw_tree_inactv.gif"],"padUp":[EF_IMAGES_PATH,"eftree_padUp.gif"],"padDown":[EF_IMAGES_PATH,"eftree_padDown.gif"]}
efico.efportlet={"close":[EF_IMAGES_PATH,"eview_close.gif"],"closeHover":[EF_IMAGES_PATH,"eview_close_hover.gif"],"config":[EF_IMAGES_PATH,"eview_config.gif"],"configHover":[EF_IMAGES_PATH,"eview_config_hover.gif"],"expand":[EF_IMAGES_PATH,"eview_expand.gif"],"expandHover":[EF_IMAGES_PATH,"eview_expand_hover.gif"],"maximize":[EF_IMAGES_PATH,"eview_maximize.gif"],"maximizeHover":[EF_IMAGES_PATH,"eview_maximize_hover.gif"],"minimize":[EF_IMAGES_PATH,"eview_minimize.gif"],"minimizeHover":[EF_IMAGES_PATH,"eview_minimize_hover.gif"],"noexpand":[EF_IMAGES_PATH,"eview_noexpand.gif"],"noexpandHover":[EF_IMAGES_PATH,"eview_noexpand_hover.gif"]}
efico.efcalendar={"closeImg":[EF_IMAGES_PATH,"efcalendar_close.gif"],"dividerImg":[EF_IMAGES_PATH,"efcalendar_divider.gif"],"drop1Img":[EF_IMAGES_PATH,"efcalendar_drop1.gif"],"drop2Img":[EF_IMAGES_PATH,"efcalendar_drop2.gif"],"iconImg":[EF_IMAGES_PATH,"efcalendar_icon.gif"],"left1Img":[EF_IMAGES_PATH,"efcalendar_left1.gif"],"left2Img":[EF_IMAGES_PATH,"efcalendar_left2.gif"],"right1Img":[EF_IMAGES_PATH,"efcalendar_right1.gif"],"right2Img":[EF_IMAGES_PATH,"efcalendar_right2.gif"]}
efico.efcalendarSpan={"closeImg":[EF_IMAGES_PATH,"efcalendar_close.gif"],"dividerImg":[EF_IMAGES_PATH,"efcalendar_divider.gif"],"drop1Img":[EF_IMAGES_PATH,"efcalendar_drop1.gif"],"drop2Img":[EF_IMAGES_PATH,"efcalendar_drop2.gif"],"iconImg":[EF_IMAGES_PATH,"efcalendar_icon.gif"],"left1Img":[EF_IMAGES_PATH,"efcalendar_left1.gif"],"left2Img":[EF_IMAGES_PATH,"efcalendar_left2.gif"],"right1Img":[EF_IMAGES_PATH,"efcalendar_right1.gif"],"right2Img":[EF_IMAGES_PATH,"efcalendar_right2.gif"]}
efico.efform={"normal":[EF_IMAGES_PATH,"efform_status_green.gif"],"alert":[EF_IMAGES_PATH,"efform_status_yellow.gif"],"error":[EF_IMAGES_PATH,"efform_status_red.gif"],"loading":[EF_IMAGES_PATH,"efform_status_loading.gif"],"close":[EF_IMAGES_PATH,"efform_close.gif"],"help":[EF_IMAGES_PATH,"efform_help.gif"],"print":[EF_IMAGES_PATH,"efform_prnt_avail.gif"],"full":[EF_IMAGES_PATH,"efform_full_screen.gif"],"tofull":[EF_IMAGES_PATH,"efform_tofull_screen.gif"],"dev":[EF_IMAGES_PATH,"efform_ico_dev.gif"],"run":[EF_IMAGES_PATH,"efform_ico_run.gif"],"ajaxLoader":[EF_IMAGES_PATH,"ajax-loader.gif"],"ajaxLoading":[EF_IMAGES_PATH,"ajax-loading.gif"],"bg01":[EF_IMAGES_PATH,"bg01.jpg"],"btn":[EF_IMAGES_PATH,"btn.gif"],"btnAfresh":[EF_IMAGES_PATH,"btn_afresh.gif"],"btnLogin":[EF_IMAGES_PATH,"btn_login.gif"],"closeDialog":[EF_IMAGES_PATH,"close_dialog.gif"],"closeWindow":[EF_IMAGES_PATH,"close_window.jpg"],"efBbgline01":[EF_IMAGES_PATH,"ef_b_bgline01.jpg"],"efCascadeSelectDown":[EF_IMAGES_PATH,"ef_cascade_select_down.jpg"],"efCascadeSelectOn":[EF_IMAGES_PATH,"ef_cascade_select_on.jpg"],"efExportPdf":[EF_IMAGES_PATH,"ef_export_pdf.jpg"],"efExportXls":[EF_IMAGES_PATH,"ef_export_xls.jpg"],"efImgList":[EF_IMAGES_PATH,"ef_list.gif"],"efLogoCommon":[EF_IMAGES_PATH,"ef_logo_common.jpg"],"efLogoIplat":[EF_IMAGES_PATH,"ef_logo_iplat.jpg"],"efPopupWindow":[EF_IMAGES_PATH,"ef_pop_up_window.gif"],"efQueryDy":[EF_IMAGES_PATH,"ef_query_dy.gif"],"efQueryDynamic":[EF_IMAGES_PATH,"ef_query_dynamic.gif"],"efQuerySimple":[EF_IMAGES_PATH,"ef_query_simple.gif"],"efImgTemp":[EF_IMAGES_PATH,"ef_temp.gif"],"efImgTopbg":[EF_IMAGES_PATH,"ef_top_bg.jpg"],"efImgTopRightbg":[EF_IMAGES_PATH,"ef_top_rightbg.jpg"],"return":[EF_IMAGES_PATH,"efform_return.gif"],"statusLoading":[EF_IMAGES_PATH,"efform_status_loading.gif"],"bottomLeft":[EF_IMAGES_PATH,"efframe_bottom_left.jpg"],"templateBottom":[EF_IMAGES_PATH,"template-bottom.jpg"],"efframeLeft":[EF_IMAGES_PATH,"efframe_left.jpg"],"efframeRight":[EF_IMAGES_PATH,"efframe_right.jpg"],"efframeBottomMiddle":[EF_IMAGES_PATH,"efframe_bottom_middle.jpg"],"efframeBottomRight":[EF_IMAGES_PATH,"efframe_bottom_right.jpg"],"efframeMainMenuBg":[EF_IMAGES_PATH,"efframe_mainmenubg.gif"],"efframeMenuDown":[EF_IMAGES_PATH,"efframe_menudown.gif"],"efframeMenuUp":[EF_IMAGES_PATH,"efframe_menuup.gif"],"imgImax":[EF_IMAGES_PATH,"i_max.gif"],"imgImin":[EF_IMAGES_PATH,"i_min.gif"],"imgInormal":[EF_IMAGES_PATH,"i_normal.gif"],"imgIcoDown":[EF_IMAGES_PATH,"ico_down.gif"],"imgIcoUp":[EF_IMAGES_PATH,"ico_up.gif"],"imgKey":[EF_IMAGES_PATH,"key.gif"],"imgRole":[EF_IMAGES_PATH,"role.gif"],"imgSpacer":[EF_IMAGES_PATH,"spacer.gif"],"imgSplitterBg":[EF_IMAGES_PATH,"splitter_bg.gif"],"templateBottom":[EF_IMAGES_PATH,"template-bottom.gif"],"templateTop":[EF_IMAGES_PATH,"template-top.gif"],"imgUser":[EF_IMAGES_PATH,"user.gif"],"imgVgrabber":[EF_IMAGES_PATH,"vgrabber.gif"]}
efico.efreport={"efFalseClear":[EF_IMAGES_PATH,"ef_false.png"],"efImgFunction":[EF_IMAGES_PATH,"ef_function.png"],"efDetail":[EF_IMAGES_PATH,"ef_detail.png"],"efImgFind":[EF_IMAGES_PATH,"ef_find.png"],"efImgHelp":[EF_IMAGES_PATH,"ef_help.png"],"efCommand":[EF_IMAGES_PATH,"ef_command.png"],"efDefine":[EF_IMAGES_PATH,"ef_define.png"],"efPageDistanceDown":[EF_IMAGES_PATH,"ef_pageDistance_down.jpg"],"efPageDistanceTop":[EF_IMAGES_PATH,"ef_pageDistance_top.jpg"],"efImgPrint":[EF_IMAGES_PATH,"ef_print.png"],"efImgPrintConfig":[EF_IMAGES_PATH,"ef_print_config.png"],"efImgPrintHorizontal":[EF_IMAGES_PATH,"ef_print_horizontal.jpg"],"efImgPrintVertical":[EF_IMAGES_PATH,"ef_print_vertical.jpg"],"efImgRight":[EF_IMAGES_PATH,"ef_right.png"],"efImgSave":[EF_IMAGES_PATH,"ef_save.png"]}
efico.personalStyle={"imgFootBg07":[EF_IMAGES_PATH,"foot_bg07.gif"],"imgBtnBg":[EF_IMAGES_PATH,"btn_bg.gif"],"imgMainBg07":[EF_IMAGES_PATH,"main_bg07.gif"],"imgThbg07":[EF_IMAGES_PATH,"thbg07.gif"],"imgTitBg07":[EF_IMAGES_PATH,"tit_bg07.gif"]}

efutils=function(){}
efutils.getValidateRegex=function(name){return ef_validator_regexes[name];}
efutils.getTotalBytes=function(str){if(str==null||str=="")return 0;var totalCount=0;for(i=0;i<str.length;i++){if(str.charCodeAt(i)>127)
totalCount+=2;else
totalCount++;}
return totalCount;}
efutils.trimString=function(str){if(str instanceof Array||str instanceof Object){return JSON2String(str);}
return(str==null)?"":str.trim();}
efutils.formatHtmlCharacter=function(str){str=efutils.trimString(str);str=str.replace(/\#/g,"&#35;");str=str.replace(/\&/g,"&#38;");str=str.replace(/\</g,"&#60;");str=str.replace(/\>/g,"&#62;");str=str.replace(/\?/g,"&#63;");return str;}
efutils.replaceString=function(str,regx1,value1,regx2,value2){var temp=str.split(regx1);for(var i=0;i<temp.length;i++)
temp[i]=temp[i].replace(regx2,value2);return temp.join(value1);}
efutils.isEmpty=function(m){for(var key in m)
return false;return true;}
efutils.getImageUrl=function(name){return EF_IMAGES_PATH+name;}
efutils.copyArray=function(a){var copy=[];for(var i=0;i<a.length;i++)
copy.push(a[i]);return copy;}
efutils.replaceCR=function(str_value,replace_str){if(!isAvailable(replace_str))
replace_str=EF_CR_IDENTIFIER;str_value=efutils.trimString(str_value);var index=str_value.indexOf("\r\n");while(index!=-1){str_value=str_value.substring(0,index)+replace_str+str_value.substring(index+2);index=str_value.indexOf("\r\n");}
return str_value;}
efutils.maxInGrid=function(gridID,columnName){var grid=efgrid.getGridObject(gridID);var length=grid.blockData.rows.length;var t=grid.blockData.getBlockMeta().getMeta(columnName).type;var max=grid.blockData.getCell(0,columnName);var current;for(var i=1;i<length;i++){current=grid.blockData.getCell(i,columnName);if(efutils.compareContent(current,max,t)>0){max=current;}}
return max;}
efutils.minInGrid=function(gridID,columnName){var grid=efgrid.getGridObject(gridID);var length=grid.blockData.rows.length;var t=grid.blockData.getBlockMeta().getMeta(columnName).type;var min=grid.blockData.getCell(0,columnName);var current;for(var i=1;i<length;i++){current=grid.blockData.getCell(i,columnName);if(efutils.compareContent(current,min,t)<0){min=current;}}
return min;}
efutils.sortGird=function(gridID,columnName,isAsceding){var grid=efgrid.getGridObject(gridID);var length=grid.blockData.rows.length;isAsceding=(isAsceding.toLowerCase()==='true');var t=grid.blockData.getBlockMeta().getMeta(columnName).type;efutils.quicksort(grid,columnName,t,0,length-1,isAsceding);grid.refresh();}
efutils.quicksort=function(grid,columnName,columnType,start,end,isAsceding){if(start<end){var pos=efutils.partition(grid,columnName,columnType,start,end,isAsceding);efutils.quicksort(grid,columnName,columnType,start,pos-1,isAsceding);efutils.quicksort(grid,columnName,columnType,pos+1,end,isAsceding);}}
efutils.partition=function(grid,columnName,columnType,start,end,isAsceding){var pivot=grid.blockData.getCell(start,columnName);var j=start;var iTemp;var compareTemp;for(var i=start+1;i<=end;i++){iTemp=grid.blockData.getCell(i,columnName);compareTemp=efutils.compareContent(iTemp,pivot,columnType);if(compareTemp<0&&isAsceding||compareTemp>0&&(!isAsceding))
efutils.swapLine(grid,++j,i);}
efutils.swapLine(grid,j,start);return j;}
efutils.swapLine=function(grid,i,j){var temp=grid.blockData.rows[i];grid.blockData.rows[i]=grid.blockData.rows[j];grid.blockData.rows[j]=temp;var tempStatus=grid.rowStatus[i];grid.rowStatus[i]=grid.rowStatus[j];grid.rowStatus[j]=tempStatus;}
efutils.compareContent=function(i,j,t){if(t.toLowerCase()==='c'){return i.localeCompare(j);}else if(t.toLowerCase()==='n'){i=parseFloat(i);j=parseFloat(j);return i-j;}else{alert('Comparison not support this type: '+t);return undefined;}}
efutils.getCssStyle=function(rulsName){for(var i=document.styleSheets.length-1;i>=0;i--){var rules;if(document.styleSheets[i].cssRules){rules=document.styleSheets[i].cssRules;}else{rules=document.styleSheets[i].rules;}
for(var j=0;j<rules.length;j++){if(rules[j].selectorText==rulsName){return rules[j].style;}}}}
efutils.showPageButton=function(buttonData){for(i=0;t=buttonData[i];i++){button_ename=t[0];button_cname=t[1];button_status=t[2];button_node=ef.get("button_"+button_ename);if(!button_node)
continue;var _cname=button_node.getAttribute("cname");if(!!_cname&&_cname!="")
button_cname=_cname;button_node.setAttribute("buttonStatus",button_status);efbutton.newButton(button_node,button_ename,button_cname,null);}}

var domLayout={_isIE:navigator.appName=="Microsoft Internet Explorer",_isFF:navigator.appName=="Netscape",getBorderLeft:function(el){if(domLayout._isIE){return el.clientLeft};return parseInt(window.getComputedStyle(el,null).getPropertyValue("border-left-width"));},getInnerLeft:function(el){if(el==null)return 0;if(domLayout._isIE&&el==document.body||domLayout._isFF&&el==document.documentElement)return 0;return domLayout.getLeft(el)+domLayout.getBorderLeft(el);},getLeft:function(el){if(el==null)return 0;return el.offsetLeft+domLayout.getInnerLeft(el.offsetParent);},getBorderTop:function(el){if(domLayout._isIE){return el.clientTop};return parseInt(window.getComputedStyle(el,null).getPropertyValue("border-top-width"));},getInnerTop:function(el){if(el==null)return 0;if(domLayout._isIE&&el==document.body||domLayout._isFF&&el==document.documentElement)return 0;return domLayout.getTop(el)+domLayout.getBorderTop(el);},getTop:function(el){if(el==null)return 0;return el.offsetTop+domLayout.getInnerTop(el.offsetParent);},getOuterRect:function(el){return{left:domLayout.getLeft(el),top:domLayout.getTop(el),width:el.offsetWidth,height:el.offsetHeight};},getDocumentRect:function(){var _width=0;var _height=0;if(domLayout._isIE){_width=document.body.clientWidth;_height=document.body.clientHeight;}else{_width=window.innerWidth;_height=window.innerHeight;};return{left:0,top:0,width:_width,height:_height};},getScrollPos:function(el){var _left=0;var _top=0;if(domLayout._isIE){_left=document.body.scrollLeft;_top=document.body.scrollTop;}else{_left=window.pageXOffset;_top=window.pageYOffset;};return{left:_left,top:_top};},_border:{borderLeft:1,borderRight:1,borderTop:1,borderBottom:1},_padding:{paddingLeft:-5,paddingRight:-6,paddingTop:-2,paddingBottom:-2},_shaddow:{shadowLeft:0,shadowRight:0,shadowTop:0,shadowBottom:0},postionWithRel:function(el,relEl,hor,sBorder,sPadding,sShaddow){var border=(sBorder==undefined)?domLayout._border:sBorder;var padding=(sPadding==undefined)?domLayout._padding:sPadding;var shaddow=(sShaddow==undefined)?domLayout._shaddow:sShaddow;var _left=0;var _top=0;var piRect=relEl;if(relEl.left==null||relEl.top==null||relEl.width==null||relEl.height==null){piRect=domLayout.getOuterRect(relEl);}
var menuRect=domLayout.getOuterRect(el);var docRect=domLayout.getDocumentRect();var scrollPos=domLayout.getScrollPos();if(!hor){if(piRect.left+menuRect.width-scrollPos.left<=docRect.width)
_left=piRect.left;else if(docRect.width>=menuRect.width)
_left=docRect.width+scrollPos.left-menuRect.width;else
_left=scrollPos.left;if(piRect.top+piRect.height+menuRect.height<=docRect.height+scrollPos.top)
_top=piRect.top+piRect.height;else if(piRect.top-menuRect.height>=scrollPos.top)
_top=piRect.top-menuRect.height;else if(docRect.height>=menuRect.height)
_top=docRect.height+scrollPos.top-menuRect.height;else
_top=scrollPos.top;}else{if(piRect.top+menuRect.height-border.borderTop-padding.paddingTop<=docRect.height+scrollPos.top)
_top=piRect.top-border.borderTop-padding.paddingTop;else if(piRect.top+piRect.height-menuRect.height+border.borderTop+padding.paddingTop>=0)
_top=piRect.top+piRect.height-menuRect.height+border.borderBottom+padding.paddingBottom+shaddow.shadowBottom;else if(docRect.height>=menuRect.height)
_top=docRect.height+scrollPos.top-menuRect.height;else
_top=scrollPos.top;if(piRect.left+piRect.width+menuRect.width+padding.paddingRight+border.borderRight-border.borderLeft+shaddow.shadowRight<=docRect.width+scrollPos.left)
_left=piRect.left+piRect.width+padding.paddingRight+border.borderRight-border.borderLeft;else if(piRect.left-menuRect.width-padding.paddingLeft-border.borderLeft+border.borderRight+shaddow.shadowRight>=0)
_left=piRect.left-menuRect.width-padding.paddingLeft-border.borderLeft+border.borderRight+shaddow.shadowRight;else if(docRect.width>=menuRect.width)
_left=docRect.width+scrollPos.left-menuRect.width;else
_left=scrollPos.left;}
el.style.left=_left+"px";el.style.top=_top+"px";return{left:_left,top:_top};}}

var ef_form_init_time=new Date();var ef_form_validate_message=new Object();var ef_grids=new Object();var ef_config=new Object();var __DEBUG=false;var __DEBUG_MSG=[];ef=function(){}
ef.getNodeById=function(node_id){var node_get=ef.get(node_id);if(!node_get)
alert("ID["+node_id+"] not exist");return node_get;}
ef.get=function(node_id){var node_get=document.getElementById(node_id);return node_get;}
ef.debug=function(msg){ef.log("[DEBUG] - "+msg);}
ef.toggleDivDisplay=function(divId){var node=ef.get(divId);if(node.style.display=="none")
node.style.display="block";else
node.style.display="none";}
ef.info=function(msg){ef.log("[INFO] - "+msg);}
ef.log=function(msg){if(__DEBUG)
__DEBUG_MSG.push(msg);}
efform=function(){}
var efform_submit_flag=false;efform.submit=function(formSubmit){efform_submit_flag=true;formSubmit.submit();}
efform.onload=function(){var ef_form_load_time=new Date();ef.debug("ef("+ef_version+") form took: "+
(ef_form_load_time.getTime()-ef_form_init_time.getTime()).toString()
+"ms to load");efform.setFormTitle();document.oncontextmenu=new Function("return false");if(isIE)
efform._clientWidth=document.body.clientWidth;if(typeof efform_onload=="function"){try{efform_onload();}catch(ex){efgrid.processException(ex,"Callback to efform_onload failed")}}
try{if(__eiInfo!=undefined&&__eiInfo.status<0&&efform.msgDisplayStyle=="alert")
EFAlert("status_code:"+document.getElementById("_eiMsgKey").innerHTML+"\nmsg:"+document.getElementById("_eiMsg").innerHTML);}catch(ex){}}
efform.setFormTitle=function(){try{if(efutils.trimString(window.document.title)==""){window.document.title=ef.get("efFormEname").value+"/"+ef.get("efFormCname").value+"["+window.location.host+"]";}}catch(ex){}}
efform.setPageTitle=function(title){ef.get("pageTitle").innerText=title;}
efform.hideFormHead=function(){ef.get("ef_form_head").style.display='none';}
efform.repaint=function(){ef_form_init_time=new Date();for(var key in ef_grids){if(key!="_ef_grid_subgrid"&&(typeof ef_grids[key].paint!='undefined'))
ef_grids[key].paint();}
var ef_form_load_time=new Date();ef.debug("ef("+ef_version+") form took: "+
(ef_form_load_time.getTime()-ef_form_init_time.getTime())+"ms to load");}
efform.alertTime=function(msg_info){var ef_form_load_time=new Date();ef.debug(msg_info+(ef_form_load_time.getTime()-ef_form_init_time.getTime()));}
if(isIE){efform.RESIZE_INTERVAL=300;efform.RESIZE_SCALE=1;}
efform.init=function(){window.onload=efform.onload;window.onresize=function(){if(isIE){if(Math.abs(document.body.clientWidth-efform._clientWidth)<efform.RESIZE_SCALE)
return;efform._clientWidth=document.body.clientWidth;efform._resizeTime=new Date();if(!efform._resizeInterval)
efform._resizeInterval=setInterval("efform._resize()",efform.RESIZE_INTERVAL);}else{efform.repaint();}};}
efform._resize=function(){if(new Date()-efform._resizeTime>efform.RESIZE_INTERVAL){clearInterval(efform._resizeInterval);efform._resizeInterval=undefined;efform.repaint();}}
efform.setStatus=function(status_code,msg,msgKey){var img_node=ef.get("__eiStatusImg");if(!img_node)return;if(status_code==0){img_node.src=efico.get("efform.normal");}else if(status_code<0){img_node.src=efico.get("efform.error");}else if(status_code>0){img_node.src=efico.get("efform.alert");}
if(status_code<0&&efform.msgDisplayStyle=="alert")
EFAlert("status_code:"+status_code+"\n msg:"+msg);if(!msgKey)msgKey="";ef.get("_eiStatusImg").setAttribute("efFormStatus",status_code);ef.get("_eiMsgKey").innerText=msgKey;ef.get("_eiMsg").innerHTML=msg;}
efform.getAllGridIDs=function(){var grid_ids=[];for(var key in ef_grids){if(key!="_ef_grid_subgrid")
grid_ids.push(key);}
return grid_ids;}
efform.addGrid=function(grid){ef_grids[grid.gridId]=grid;}
efform.getGrid=function(grid_id){var grid=ef_grids[grid_id];if(!isAvailable(grid))
throw new Error("Grid with id ["+grid_id+"] not exists!");return grid;}
efform._removeGrid=function(grid_id){delete ef_grids[grid_id];}
efform.clearDiv=function(div_id){try{var div_node=document.getElementById(div_id);efform.clearInputField(div_node);}catch(exception){alert(exception.message);}}
efform.clearInputField=function(node){if(node.tagName=="SELECT")
node.selectedIndex=node.options.length>0?0:-1;switch(node.tagName){case"INPUT":switch(node.type){case"text":case"file":case"password":break;case"checkbox":case"radio":node.checked=false;default:return;}
case"TEXTAREA":node.value="";break;case"SELECT":node.selectedIndex=(node.options.length>0)?0:-1;break;default:for(var i=0;i<node.childNodes.length;i++)
efform.clearInputField(node.childNodes[i]);}}
efform.hasErrorMessage=function(){for(var key in ef_form_validate_message)
return true;return false;}
efform.showErrorMessage=function(){var ei_message=document.getElementById("ei_message");if(!ei_message)return;if(efform.hasErrorMessage()){var message=[];ei_message.style.color="red";for(var key in ef_form_validate_message)
message.push("* "+ef_form_validate_message[key]);ei_message.innerText=message.join('\t');}else{ei_message.style.color="";ei_message.innerText="";}}
efform.setSelectDiv=function(selectID)
{if($.browser.msie)
{var selectWidth=document.getElementById(selectID).style.width;var containedDivID="div_"+selectID;$('#'+containedDivID).css('width',selectWidth.toString());}}
efform.setErrorStyle=function(node,msg,status)
{if(node==null)return;if(!status)
{node.style.borderColor="red";node.style.borderStyle="solid";node.style.borderWidth="1px";node.title=msg;}
else
{node.style.borderColor="";node.style.borderStyle="";node.title=msg;}}
efform.getErrorMessage=function(){if(efform.hasErrorMessage()){var message=[];var i=0;for(var key in ef_form_validate_message)
{if(i!=0)message.push("\n");else i=1;message.push("* "+ef_form_validate_message[key]);}
return message.join('');}
return"";}
efform.clearErrorMessage=function(){for(var key in ef_form_validate_message)
delete ef_form_validate_message[key];var ei_message=document.getElementById("ei_message");if(!ei_message)return;ei_message.style.color="";ei_message.innerText="";}
efform.windowOnError=function(msg,url,line){if(__DEBUG){throw new Error(msg);}else{alert("javascript exception: "+msg);return true;}}
efform.togglenav=function(nav)
{try{if(isAvailable(__DEBUG))
efdebugger.show();}catch(ex){}}
efform.formRefresh=function(){}
efform.formPrint=function(){}
efform.getSubGridDiv=function(){var div_id="ef_subgrid";var div_node=document.getElementById(div_id);if(!div_node)
div_node=efform.createDivWindow(div_id,"efwindow");return div_node;}
efform.getSubDiv=function(div_id){if(div_id==null||div_id==undefined||div_id=="")return;var div_node=document.getElementById(div_id);if(!div_node)
div_node=efform.createDivWindow(div_id,"efwindow");return div_node;}
efform.createDivWindow=function(div_id,styleClassName){var ef_subwindow=document.getElementById(div_id);if(ef_subwindow)
throw new Error("Element with id ["+div_id+"] already exists!");ef_subwindow=document.createElement("div");ef_subwindow.id=div_id;ef_subwindow.className=styleClassName;ef_subwindow.style.overflow="hidden";ef_subwindow.style.display="none";ef_subwindow.innerHTML="&nbsp;"
document.forms[0].appendChild(ef_subwindow);return ef_subwindow;}
efform.showSubGridWindow=function(component_id,eiInfo)
{var component=document.getElementById(component_id);if(!component)return;var div_node=efform.getSubGridDiv();var column_new=div_node.efDisplayCol;var column_old=div_node.efDisplayingCol;if(column_old!=null&&column_old==column_new){efwindow.show(component,div_node.id,"fixed");return;}
if(!(column_new instanceof efSubgridColumn))
return;div_node.efDisplayingCol=column_new;var inner_html=[];inner_html.push("<TABLE cellspacing='0' cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;"+getI18nMessages("ef.Select","请选择")+"&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();'><TD colspan=2>");inner_html.push("<div id='_ef_grid_subgrid' title='"+column_new.getCname()+"' style='overflow:hidden;width:400px;height:280px;'></div>");inner_html.push("</TD></TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();'>");inner_html.push("<TD class='containerFooter' colspan='2' align='right'>");inner_html.push("<input class='buttonClass' type='button' value='"+getI18nMessages("ef.Save","保存")+"' onclick='efform.subgrid_save_onclick();' />");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join("");var style_config=new Object();style_config["operationBar"]="false";var sub_grid=new efgrid(column_new.getBlockName(),"_ef_grid_subgrid");var custom_cols={"index":{},"metas":[]};sub_grid.setEnable(false);sub_grid.setReadonly(false);sub_grid.setAjax(true);sub_grid.setAutoDraw(true);sub_grid.setServiceName(column_new.getServiceName());sub_grid.setQueryMethod(column_new.getQueryMethod());sub_grid.setCustomColumns(custom_cols);if(typeof(eiInfo)=="undefined"){sub_grid.setData(_getEi());}else{sub_grid.setData(eiInfo);}
sub_grid.setStyle(style_config);sub_grid.paint();efwindow.show(component,div_node.id,"fixed");}
efform.showTextAreaWindow=function(component_id){var component=document.getElementById(component_id);if(!component)return;var div_node=efform.getSubGridDiv();var show_value=component.value;var index=show_value.indexOf(EF_CR_IDENTIFIER);while(index!=-1){show_value=show_value.substring(0,index)+"\r\n"+show_value.substring(index+2);index=show_value.indexOf(EF_CR_IDENTIFIER);}
var inner_html=[];inner_html.push("<TABLE cellspacing='0' cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;"+getI18nMessages("ef.Detail","详情")+"&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();' ><TD colspan=2>");inner_html.push("<textarea wrap=\"hard\" rows=10 cols=50 id=\"subwindow_textarea\" >"+show_value+"</textarea>");inner_html.push("</TD></TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();'><TD colspan=2 align=center>");inner_html.push("<input class=\"buttonClass\" type=\"button\" value=\""+getI18nMessages("ef.Save","保存")+"\" onclick='efform.textarea_save_onclick();' />");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join("");efwindow.show(component,div_node.id,"fixed");}
efform.showSubTreeWindow=function(component_id,treeModel,treeDivId,sText,refresh,configFunc){if((typeof component_id)=="string")
var component=document.getElementById(component_id);else
component=component_id;if(!component)return;var div_node=efform.getSubDiv("ef_subTree"+treeDivId);if((refresh==true)||(div_node.innerHTML=="&nbsp;"))
{var inner_html=[];inner_html.push("<TABLE cellspacing='0'  cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;"+getI18nMessages("ef.Detail","详情")+"&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR><TD colspan=2>");inner_html.push("<DIV style='overflow:auto;height:280;width:200'><DIV id='"+treeDivId+"'/></DIV>");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join("");var tree=new EFTree(treeModel,treeDivId,sText);eval(configFunc+"(tree)");$('#'+treeDivId).append(tree.render());}
efwindow.show(component,div_node.id,"fixed");}
efform.showPopupWindow=function(popupContentId,input_id){var component=document.getElementById(input_id);if(!component)return;var div_node=efform.getSubDiv(popupContentId);div_node.relativePopupParent=component;if(component.nextSibling!=null)efwindow.show(component.nextSibling,div_node.id,"fixed");else efwindow.show(component,div_node.id,"fixed");}
efform.showPopupGridWindow=function(popupContentId,input_id,visibleColumnNames,visibleColumnDisplayNames,valueProperty,labelProperty,popType,backFillColumnIds,backFillFieldIds){var component=document.getElementById(input_id);if(!component)return;var div_node=efform.getSubDiv(popupContentId);var ajax_callback={onSuccess:function(eiInfo){var currentEiinfo=_getEi();currentEiinfo.addBlock(eiInfo.getBlock(fieldId))
sub_grid.setData(currentEiinfo);sub_grid.paint();div_node.relativePopupParent=component;if(component.nextSibling!=null)efwindow.show(component.nextSibling,div_node.id,"fixed");else efwindow.show(component,div_node.id,"fixed");showComponent=component;},onFail:function(eMsg){alert("failure："+eMsg);}}
var fieldId=popupContentId.substring(9);var sub_grid;if(div_node.innerHTML=="&nbsp;")
{var inner_html=[];inner_html.push("<TABLE cellspacing='0' cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;"+getI18nMessages("ef.Select","请选择")+"&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();'><TD colspan=2>");inner_html.push("<div id=ef_grid_"+fieldId+" style='overflow:hidden;width:400px;height:280px;'></div>");inner_html.push("</TD></TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();'>");inner_html.push("<TD class='containerFooter' colspan='2' align='right'>");inner_html.push("<input class='buttonClass' type='button' value='"+getI18nMessages("ef.Save","保存")
+"' onclick=\"efform.popGrid_save_onclick('ef_grid_"
+fieldId+"','"+valueProperty+"','"+labelProperty+"','"+popType+"','"+backFillColumnIds
+"','"+backFillFieldIds+"');\" />");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join("");var style_config=new Object();sub_grid=new efgrid(fieldId,"ef_grid_"+fieldId);div_node.gridObject=sub_grid;var custom_cols={"index":{},"metas":[]};var columns=visibleColumnNames.split(",");var columndescs=visibleColumnDisplayNames.split(",");for(var i=0;i<columns.length;i++)
{custom_cols["index"][columns[i]]=i;custom_cols["metas"][i]=new Object();custom_cols["metas"][i]["name"]=columns[i];custom_cols["metas"][i]["descName"]=columns[i];if(columndescs!=null&&columndescs!=""&&columndescs.length>i)
custom_cols["metas"][i]["descName"]=columndescs[i];custom_cols["metas"][i]["primaryKey"]=false;custom_cols["metas"][i]["sort"]=false;custom_cols["metas"][i]["pos"]=i;}
sub_grid.setEnable(false);sub_grid.setReadonly(false);sub_grid.setAjax(true);sub_grid.setAutoDraw(false);sub_grid.setCustomColumns(custom_cols);sub_grid.setStyle(style_config);sub_grid.setServiceName("EDCMUtils");sub_grid.setQueryMethod("getCodesetEiInfo");sub_grid.onGridSubmit=function(info)
{info.set("codesetCode",fieldId)
if(typeof(popupGrid_beforeDisplay)=="function")
popupGrid_beforeDisplay(fieldId,popType,info,sub_grid);};sub_grid.onRowDblClicked=function(){efform.popGrid_save_onclick("ef_grid_"+fieldId,valueProperty,labelProperty,popType,backFillColumnIds,backFillFieldIds);}
var ei_info=new EiInfo();ei_info.set("codesetCode",fieldId);if(typeof(popupGrid_beforeDisplay)=="function")
popupGrid_beforeDisplay(fieldId,popType,ei_info,sub_grid);EiCommunicator.send("EDCMUtils","getCodesetEiInfo",ei_info,ajax_callback);}
else
{sub_grid=div_node.gridObject;sub_grid.onRowDblClicked=function(){efform.popGrid_save_onclick("ef_grid_"+fieldId,valueProperty,labelProperty,popType,backFillColumnIds,backFillFieldIds);}
var ei_info=new EiInfo();ei_info.set("codesetCode",fieldId);var needRefresh=false;if(typeof(popupGrid_beforeDisplay)=="function")
needRefresh=popupGrid_beforeDisplay(fieldId,popType,ei_info,sub_grid);if(needRefresh)
EiCommunicator.send("EDCMUtils","getCodesetEiInfo",ei_info,ajax_callback);else
{if(component.nextSibling!=null)efwindow.show(component.nextSibling,div_node.id,"fixed");else efwindow.show(component,div_node.id,"fixed");}}}
efform.popGrid_save_onclick=function(gridId,valueProperty,labelProperty,popType,backFillColumnIds,backFillFieldIds){var sub_grid=efform.getGrid(gridId);var index=sub_grid.getCurrentRowIndex();if(index<0){alert(getI18nMessages("ef.NotSelect","未选择记录"));return;}
var row=sub_grid.getBlockData().getRows()[index];var div_node=efform.getSubGridDiv();var cell_value=sub_grid.getBlockData().getCell(index,valueProperty);if(labelProperty!=undefined||labelProperty!=""&&showComponent.tagName=='INPUT')
{var cell_label=sub_grid.getBlockData().getCell(index,labelProperty);showComponent.nextSibling.value=cell_label;showComponent.value=cell_value;}
var columnIds=backFillColumnIds.split(",");var fieldIds=backFillFieldIds.split(",");if(columnIds.length>0&&fieldIds.length>0)
{var ef_grid=null;var block=null;row_index=null;if(popType=="popupGrid")
{var ef_grid=efgrid.getEfGridNode(showComponent).efgrid;var block=ef_grid.blockData;var row_index=showComponent.parentNode.parentNode.parentNode.rowIndex;}
for(var i=0;i<fieldIds.length;i++)
{if(columnIds.length<i+1)continue;if(popType=="popupInput")
{var field=document.getElementById(fieldIds[i]);if(field!=null)
{field.value=sub_grid.getBlockData().getCell(index,columnIds[i]);}}
else if(popType=="popupGrid")
{var sValue=sub_grid.getBlockData().getCell(index,columnIds[i]);block.setCell(row_index,fieldIds[i],sValue);}}
if(popType=="popupGrid")
{for(var i=1;i<ef_grid.getColCount(TYPE_FIX);i++)
{var column=ef_grid.getColumn(i,TYPE_DATA);for(var j=0;j<fieldIds.length;j++)
{if(fieldIds[j].equals(column.customSetting.name))
ef_grid.refreshCell(row_index,i,TYPE_FIX);}}
for(var i=0;i<ef_grid.getColCount(TYPE_DATA);i++)
{var column=ef_grid.getColumn(i,TYPE_DATA);for(var j=0;j<fieldIds.length;j++)
{if(fieldIds[j]==column.customSetting.name)
ef_grid.refreshCell(row_index,i,TYPE_DATA);}}}}
efwindow.hide();if(typeof(popupGrid_afterDisplay)=="function")
popupGrid_afterDisplay(gridId.substring(8),popType,sub_grid);}
efform.subgrid_onmouseover=function(){if(event.srcElement.tagName!='TD')
return;var td_node=event.srcElement;if(td_node&&efgrid.getRowIndex(td_node.parentNode)>0)
td_node.parentNode.className='rowHighlight';}
efform.subgrid_onmouseout=function(){if(event.srcElement.tagName!='TD')
return;var td_node=event.srcElement;if(td_node&&efgrid.getRowIndex(td_node.parentNode)>0)
td_node.parentNode.className='tableRow'+(efgrid.getRowIndex(td_node.parentNode)&1);}
efform.textarea_save_onclick=function(){var text_area=document.getElementById("subwindow_textarea");var cell_value="";if(text_area)
cell_value=text_area.innerText;efwindow.setValue(cell_value);}
efform.subgrid_save_onclick=function(){var sub_grid=efform.getGrid("_ef_grid_subgrid");var index=sub_grid.getCurrentRowIndex();if(index<0){alert(getI18nMessages("ef.NotSelect","未选择记录"));return;}
var div_node=efform.getSubGridDiv();var column=div_node.efDisplayingCol;var cell_value=sub_grid.getBlockData().getCell(index,column.getValueProperty());var labelProperty=column.getLabelProperty();if(labelProperty!=undefined&&labelProperty!=""&&showComponent.tagName=='INPUT')
{var cell_label=sub_grid.getBlockData().getCell(index,labelProperty);showComponent.nextSibling.value=cell_label;var row_index=showComponent.parentNode.parentNode.parentNode.rowIndex;var block=efgrid.getEfGridNode(showComponent).efgrid.blockData;if(block.meta.metas[labelProperty]!=undefined)
block.rows[row_index][block.meta.metas[labelProperty].pos]=cell_label;}
efwindow.setValue(cell_value);if(typeof subgrid_save_onclick=="function"){try{subgrid_save_onclick(sub_grid.gridId,cell_value);}catch(ex){efgrid.processException(ex,"Callback to subgrid_save_onclick failed");}}}
efform.subgrid_rebuild=function(){var div_node=efform.getSubGridDiv();div_node.efDisplayingCol=null;}
efform.showMultiselectWindow=function(component_id,columnEname){var component=document.getElementById(component_id);var grid_node=efgrid.getEfGridNode(component);var ef_grid=grid_node.efgrid;var column=ef_grid.getColumnByName(columnEname);if(!isAvailable(component))return;var div_node=efform.getSubGridDiv();var show_value=component.value;var selectedItems=show_value.split(",");for(var i=0;i<selectedItems.length;i++){selectedItems[i]=selectedItems[i].trim();}
var index=show_value.indexOf(EF_CR_IDENTIFIER);while(index!=-1){show_value=show_value.substring(0,index)+"\r\n"+show_value.substring(index+2);index=show_value.indexOf(EF_CR_IDENTIFIER);}
var labels=[];var columnListValue=column.columnListValue;var columnListLabel=column.columnListLabel;if(columnListValue&&columnListValue.length>0){for(var i=0;i<columnListValue.length;i++){var checked=" ";var label=columnListLabel[i];var value=columnListValue[i];var display_value=getDisplayValue(column,label,value);if(contains(selectedItems,columnListValue[i])){checked="checked";}
labels.push("<li style='list-style:none;border-bottom:1px solid #EEE;'><label><input rel='"+columnListValue[i]+"' type='checkbox' "+checked+"/>"+display_value+"</label></li>");}}else{for(var i=0;i<selectedItems.length;i++){labels.push("<li style='list-style:none;'><label><input rel='"+selectedItems[i]+"' type='checkbox' checked/>"+selectedItems[i]+"</label></li>");}}
var inner_html=[];inner_html.push("<TABLE cellspacing='0' cellpadding='1' width='300px'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;"+getI18nMessages("ef.Detail","详情")+"&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();' ><TD colspan=2>");var multiSelectOption="<ul id='gridCellMultiSelectUl' style='margin:0;padding-left:0;border-bottom:1px solid #DDD;height:150px;'>"+labels.join("")+"</ul>";inner_html.push(multiSelectOption);inner_html.push("</TD></TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();'><TD colspan=2 align=center>");inner_html.push("<input class=\"buttonClass\" type=\"button\" value=\""+getI18nMessages("ef.Save","保存")+"\" onclick='efform.multiselect_save_onclick();' />");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join("");efwindow.show(component,div_node.id,"fixed");}
function getDisplayValue(column,label,value){var format_str=column.getFormatString();if(isAvailable(format_str)){if(!isAvailable(label)){for(var i=0;i<columnListValue.length;i++){if(columnListValue[i]==value){label=columnListLabel[i];break;}}
if(i>=columnListValue.length){value=columnListValue[0];label=columnListLabel[0];}}
return efutils.replaceString(format_str,"#valueString#",value,/\#labelString#/g,label);}else{if(label==null){for(var i=0;i<columnListValue.length;i++){if(columnListValue[i]==value){label=columnListLabel[i];break;}}
if(i>=columnListValue.length)
label=columnListLabel[0];}
return label;}}
function contains(arr,obj){var i=arr.length;while(i--){if(arr[i]===obj){return true;}}
return false;}
efform.multiselect_save_onclick=function(){var cell_value=[];$("#gridCellMultiSelectUl li label input:checked").each(function(){cell_value.push($(this).attr("rel"));});efwindow.setValue(cell_value.join(","));};efform.nullfunction=function(){}
efform.evalFunction=function(functionName){try{var func=eval(functionName);if(typeof(func)=="function"){var args=[];for(var i=1;i<arguments.length;i++)
args.push(arguments[i]);func.apply(this,args);}}catch(ex){}}
efform.setNewWindowStyle=function(style_string){ef_config["NEW_WINDOW"]=style_string;}
efform.setGridCurrentRowStyle=function(style_string){ef_config["GRID_CURRENT_ROW"]=style_string;}
efform.getGridCurrentRowStyle=function(){var style_string=ef_config["GRID_CURRENT_ROW"];return isAvailable(style_string)?style_string:'tableCurrentRow';}
efform.newWindow=function(input_id,grid_id,row_index,col_index){var component=document.getElementById(input_id);if(!component)return;var url="about:blank";try{url=efgrid_getNewWindowUrl(grid_id,row_index,col_index,component.value);}catch(exception){alert("efgrid_getNewWindowUrl"+getI18nMessages("ef.FormNotDefineAndInvalid","未定义或参数错误"));return;}
var style_string=isAvailable(ef_config["NEW_WINDOW"])?ef_config["NEW_WINDOW"]:"dialogWidth:400px; dialogHeight:300px;resizable:yes";var returnValue=window.showModalDialog(url,"",style_string);if(!returnValue||!returnValue["value"]){alert(getI18nMessages("ef.FormNotDefine","返回值未定义!"));return;}
efgrid.setCellValue(input_id,returnValue["value"],returnValue["label"]);}
efform.openNewForm=function(form_ename,para_list,is_maximum){var load_time=new Date();var load_label=form_ename+load_time.getTime();para_list=efutils.trimString(para_list);var url=CONTEXT_PATH+"/DispatchAction.do?efFormEname="+form_ename;if(para_list!="")url+="&"+para_list;var openPara="toolbar=no,location=no,directories=no,status=yes,menubar=no,resizable=yes,scrollbars=yes,";if(is_maximum==true){openPara+="width="+(screen.availWidth-10)+",height="+(screen.availHeight-30)+",top=0,"+"left=0";}else{openPara+="width=900,height=600,top="+
((screen.availHeight-600)/2)+",left="+((screen.availWidth-900)/2);}
return window.open(url,load_label,openPara);}
efform._getMessageBoxDiv=function(){var div_id="ef_msgbox";var div_node=document.getElementById(div_id);if(!div_node)
div_node=efform.createDivWindow(div_id,"efwindow");return div_node;}
efform.showMessageBox=function(msg){var div_node=efform._getMessageBoxDiv();var inner_html=[];inner_html.push("<TABLE cellspacing='0' cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;"+getI18nMessages("ef.Error","错误")+"&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get("efform.close")+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();' ><TD colspan=2>");inner_html.push("<textarea wrap='soft' readonly rows=5 cols=20>"+msg+"</textarea>");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join('');if(typeof event!="undefined"){efwindow.show(event.srcElement,div_node.id,true);if(typeof efform_messageBox_endShow=="function"){try{efform_messageBox_endShow(event.srcElement,div_node);}catch(ex){efgrid.processException(ex,"Callback to efform_messageBox_endShow failed");}}}}
efform.hideDiv=function(div_id)
{var div_node=document.getElementById(div_id);if(isAvailable(div_node)&&div_node.tagName=="DIV")
{div_node.style.display='none';}
else
{efform.showMessageBox("Div with id["+div_id+"] not found!");}}
efform.showDiv=function(div_id)
{var div_node=document.getElementById(div_id);if(isAvailable(div_node)&&div_node.tagName=="DIV")
{div_node.style.display='block';}
else
{efform.showMessageBox("Div with id["+div_id+"] not found!");}}
efform.getSystemAjaxCallback=function(node_id)
{return{onSuccess:function(eiInfo)
{efform.fillDiv(node_id,eiInfo);},onFail:function(eMsg)
{alert(getI18nMessages("ef.ServiceFailed","服务调用失败: ")+eMsg);}};}
efform.fillDiv=function(div_id,eiInfo,isAllNode)
{var node=document.getElementById(div_id);if(!isAvailable(node))
{alert("Node with id["+node_id+"] not found!");return;}
efform.fillNode(node,eiInfo,isAllNode);}
efform.fillNode=function(node,eiInfo,isAllNode)
{if(!node.childNodes||node.childNodes.length<=0)
{var cell_value=efform._getValue(node,eiInfo,isAllNode);if(cell_value===null)
{return;}
if((node.tagName=="INPUT"&&node.type!="button"))
{node.value=cell_value;}
if(node.tagName=="TEXTAREA")
{node.value=cell_value;}
return;}
else if(node.tagName=="TEXTAREA")
{var cell_value=efform._getValue(node,eiInfo,isAllNode);if(cell_value===null)
{return;}
node.value=cell_value;return;}
else if(node.tagName=="SELECT")
{var cell_value=efform._getValue(node,eiInfo,isAllNode);if(cell_value===null)
{return;}
node.selectedIndex=0;for(var i=0;i<node.options.length;i++)
{if(node.options[i].value==cell_value)
{node.selectedIndex=i;break;}}}
else
{for(var i=0;i<node.childNodes.length;i++)
{try
{efform.fillNode(node.childNodes[i],eiInfo,isAllNode);}catch(exception)
{}}}}
efform._getValue=function(node,eiInfo,isAllNode)
{if(!isAvailable(node.name))
return null;var idArray=node.name.split("-");if(idArray.length==3){try
{var block=eiInfo.getBlock(idArray[0]);if(!isAvailable(block))
return"";return efutils.trimString(block.getCell(idArray[1],idArray[2]));}
catch(exception)
{return"";}}
if(true==isAllNode){if(2==idArray.length){var block=eiInfo.getBlock(idArray[0]);if(!isAvailable(block))
return"";return efutils.trimString(block.get(idArray[1]));}else if(1==idArray.length){return efutils.trimString(eiInfo.get(idArray[0]));}}}
efform.getNavigationBar=function(bar_id)
{var bar=ef_nav_bars[bar_id];if(!isAvailable(bar))
throw new Error("Navigation bar with id ["+bar_id+"] not exists!");return bar;}
function efgrid_onRowDblClicked(gridId,row_index){if(gridId=="_ef_grid_subgrid"){var sub_grid=efform.getGrid("_ef_grid_subgrid");var index=sub_grid.getCurrentRowIndex();if(index<0){alert(getI18nMessages("ef.NotSelect","未选择记录"));return;}
var div_node=efform.getSubGridDiv();var column=div_node.efDisplayingCol;var cell_value=sub_grid.getBlockData().getCell(index,column.getValueProperty());var labelProperty=column.getLabelProperty();if(labelProperty!=undefined&&labelProperty!=""&&showComponent.tagName=='INPUT')
{var cell_label=sub_grid.getBlockData().getCell(index,labelProperty);showComponent.nextSibling.value=cell_label;var row_index=showComponent.parentNode.parentNode.parentNode.rowIndex;var block=efgrid.getEfGridNode(showComponent).efgrid.blockData;if(block.meta.metas[labelProperty]!=undefined)
block.rows[row_index][block.meta.metas[labelProperty].pos]=cell_label;}
efwindow.setValue(cell_value);}}
function efgrid_onExport_modleXls(gridId){window.showModalDialog("DispatchAction.do?efFormEname=EDFA7002",[window,gridId],"dialogWidth:320px;dialogHeight:393px;resizable:yes;help:no;");}
efform.getFormStatus=function()
{return ef.get("_eiStatusImg").getAttribute("efFormStatus");}
efform.getMsgKey=function()
{return ef.get("_eiMsgKey").innerText;}
efform.getMsg=function()
{return ef.get("_eiMsg").innerText;}
efform.getDetailMsg=function()
{return ef.get("_eiDetailMsg").innerText;}
efform.setDetailMsg=function(detailMsg)
{if(!ef.get("_eiDetailMsg"))return;ef.get("_eiDetailMsg").innerText=detailMsg;}
efform.EFPopupInput_onDeleteButtonClick=function(cellLabelName,cellName)
{if(typeof(popupInput_onClickDeleteButton)=="function"){popupInput_onClickDeleteButton(cellLabelName,cellName);return;}
ef.get(cellLabelName).value="";ef.get(cellName).value="";}

var button_functions=new Object();efbutton=function(){}
efbutton.newButton=function(in_node,button_ename,button_cname,image_name){in_node.align="center";in_node.noWrap=true;in_node.buttonEname=button_ename;in_node.buttonCname=button_cname;in_node.id="button_"+button_ename;var temp_html="";if(button_ename!=null){temp_html+="<span style='CURSOR: hand;' onclick=\"efbutton.onClickButton('"
+button_ename
+"', '"
+button_cname
+"');\" >"
+"&nbsp;"
+button_cname+"&nbsp;</span>";}
if(image_name!=null){temp_html+="&nbsp<IMG src='"+efico.get(image_name)+"'>&nbsp";}
in_node.innerHTML="<b class='b1'></b><div class='content'>"+temp_html
+"</div><b class='b2'></b>";if(image_name==null){button_functions[button_ename.toLowerCase()]=in_node.children[1].firstChild.onclick;}
efbutton.setButtonStatusByNode(in_node,button_ename,true);}
efbutton.onClickButton=function(button_ename,button_cname){var button_id=button_ename.toLowerCase();var func_name="button_"+button_id+"_onclick";try{ef.get("efCurButtonEname").value=button_id.toUpperCase();}catch(ex){}
if(eval("typeof "+func_name)=="function"){efbutton.setButtonStatus(button_id,false);efform.setStatus(999,getI18nMessages("ef.RunButton","执行按钮")+"["
+button_cname+"]...");eval(func_name+"(); ");if(efform_submit_flag==false){efbutton.resetButton(button_id,button_cname);}}else{alert(getI18nMessages("ef.ButtonNoEvent","没有为按钮定义事件！"));}}
efbutton.resetButton=function(button_ename,button_cname){efbutton.setButtonStatus(button_ename,true);var div_img=ef.get("_eiStatusImg");if(!div_img)
return;var efform_status=div_img.getAttribute("efFormStatus");if(efform_status==999){efform.setStatus(0,getI18nMessages("ef.FinishRunButton","结束执行按钮")
+"["+button_cname+"]");}}
efbutton.setButtonStatus=function(button_id,button_status){var in_node=ef.get("button_"+button_id.toUpperCase());efbutton.setButtonStatusByNode(in_node,button_id,button_status);}
efbutton.setButtonStatusByNode=function(in_node,button_id,button_status){if(!isAvailable(in_node)){throw new Error("Button with ename:["+button_id+"] not exists!");}
var buttonAuthStatus=in_node.getAttribute("buttonStatus");if(button_status==false){if(efbutton.config!=undefined&&efbutton.config.HIDE_FORBIDDEN!=undefined&&efbutton.config.HIDE_FORBIDDEN=="true"){in_node.className="buttonHide";}else{in_node.className="buttonDisabled";in_node.title="["+in_node.buttonCname+']'
+getI18nMessages("ef.ButtonForbid","按钮被禁用！");in_node.firstChild.href="javascript:alert('"
+getI18nMessages("ef.ButtonForbid","按钮被禁用！")+"');";in_node.children[1].firstChild.onclick=efform.nullfunction;}}else{if(buttonAuthStatus=="0"){if(efbutton.config!=undefined&&efbutton.config.HIDE_NOAUTH!=undefined&&efbutton.config.HIDE_NOAUTH=="true"){in_node.className="buttonHide";}else{in_node.className="buttonDisabled";in_node.title="["+in_node.buttonCname+']'
+getI18nMessages("ef.ButtonNoAuthority","您没有权限使用！");in_node.style.textDecoration="line-through";in_node.firstChild.href="javascript:alert('"
+getI18nMessages("ef.ButtonNoAuthority","您没有权限使用！")
+"');"
in_node.children[1].firstChild.onclick=efform.nullfunction;}}else{in_node.className="buttonRegular";in_node.title="["+in_node.buttonCname+']'
+getI18nMessages("ef.Button","按钮");in_node.firstChild.href="#";in_node.children[1].firstChild.onclick=button_functions[button_id.toLowerCase()];}}}
efbutton.newNavButton=function(grid,action,in_node,image_name,image_id){in_node.align="center";in_node.noWrap=true;var temp_html="&nbsp<IMG id='"+image_id+"' src='"
+efico.get(image_name)+"'";temp_html+=" onmouseover=\"this.style.cursor='pointer';\" onclick='"
+action+"(\""+grid.gridId+"\");'";temp_html+=">&nbsp";in_node.innerHTML=temp_html;}
efbutton.newDisabledNavButton=function(in_node,image_name,image_id){in_node.align="center";in_node.noWrap=true;in_node.innerHTML="&nbsp<IMG id='"+image_id+"' src='"
+efico.get(image_name)+"'>&nbsp";}
efbutton.newNavTextButton=function(grid,action,in_node,button_text,disabled){in_node.align="center";in_node.noWrap=true;if(disabled){in_node.innerHTML="<span>&nbsp;"+button_text+"&nbsp;</span>";}else{var temp_html="<A href='#' onclick='"+action+"(\""+grid.gridId
+"\");'>";temp_html+="&nbsp;"+button_text+"&nbsp;</A>";in_node.innerHTML=temp_html;}}
efbutton.newImgButton=function(img_id,img_name,img_title,action,para){var inner_html="<IMG id=\""+img_id+"\" title=\""+img_title
+"\" onmouseover=\"this.style.cursor='pointer';\" "+"onclick=\""
+action+"('"+para+"')\" "+"src=\""+efico.get(img_name)
+"\" >";return inner_html;}

function efbuttonbar(){this.buttonId=null;this.buttonData=null;this.buttonCount=0;this.paint=function(paint_div_id){var paintDivElement=ef.get(paint_div_id);if(!paintDivElement){return;}
var _region_node=ef.get(paint_div_id.replace("__buttonbar",""));if(!_region_node){return;}
var ef_button_t=document.createElement("table");ef_button_t.cellSpacing=3;ef_button_t.cellPadding=0;ef_button_t.width="100%";ef_button_t.border=0;ef_button_t.insertRow(0);var cell_now=ef_button_t.rows[0].insertCell(0);var buttonBarAlign=_region_node.getAttribute("efRegionButtonBarAlign");if("center"==buttonBarAlign)
cell_now.width="50%";else if("left"!=buttonBarAlign)
cell_now.width="100%";var i=0;for(var i=0;i<this.buttonCount;i++){if(this.buttonData[i][0]==" ")
continue;cell_now=ef_button_t.rows[0].insertCell(i+1);cell_now.setAttribute("buttonStatus",this.buttonData[i][2]);var button_ename=this.buttonData[i][0];var button_cname=this.buttonData[i][1];efbutton.newButton(cell_now,button_ename,button_cname,null);}
if(this.buttonCount==1&&this.buttonData[0][0]==" ")
cell_now=ef_button_t.rows[0].insertCell(1);else
cell_now=ef_button_t.rows[0].insertCell(this.buttonCount+1);if("center"==buttonBarAlign)
cell_now.width="50%";else if("left"==buttonBarAlign)
cell_now.width="100%";ef_button_t.efbuttonbar=this;paintDivElement.appendChild(ef_button_t);}}

var IFCALENDARSHOW=false;ef_calendar=function(){this.startAt=1;this.dateSlt;this.mtSlt;this.yrSlt;this.csobj;this.omonthSelect;this.odateSelect;this.ctlToPlaceValue;this.dateFormat;this.ctlNow;this.bPageLoaded=false;this.today=new Date();this.dateNow=this.today.getDate();this.mtNow=this.today.getMonth();this.yrNow=this.today.getYear();this.mtName=new Array("1","2","3","4","5","6","7","8","9","10","11","12");this.dayName=new Array(getI18nMessages("ef.CalendarMon","一"),getI18nMessages("ef.CalendarTues","二"),getI18nMessages("ef.CalendarWed","三"),getI18nMessages("ef.CalendarThurs","四"),getI18nMessages("ef.CalendarFriday","五"),getI18nMessages("ef.CalendarSat","六"),getI18nMessages("ef.CalendarSun","日"));this.dom=document.getElementById;this.ie=document.all;}
ef_calendar.prototype.init=function(){var domain=this;if(!this.ie)this.yrNow+=1900;if(ef.get("ef_calendar")==null){var node=document.createElement("DIV");var _iframe="";if($.browser.msie){_iframe="<iframe src='javascript:false'style='position:absolute;visibility:inherit;top:0px;left:0px;width:215px;z-index:-1;filter=\"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\";'></iframe>";}
node.id="ef_calendar";node.innerHTML="<div onclick='IFCALENDARSHOW=true' id='calendar' style='z-index:+999;position:absolute;visibility:hidden;'><table border=0 width=180 style='border-width:1;border-style:solid;border-color:#a0a0a0;' bgcolor='#ffffff'>"
+"<tr ><td><table border=0 width='100%'><tr style='background-image: url("+efico.get("efpage.divHeadLine")+");'><td><font color='#ffffff'><B><span id='caption'></span></B></font></td>"
+"<td align=right ><a id='ef_calendar_close' href='javascript:' onclick='hideCalendar()'>"
+"<IMG SRC='"+efico.get('efcalendar.closeImg')+"' WIDTH='15' HEIGHT='13' BORDER='0' ALT='"+getI18nMessages("ef.CalendarClose","关闭")+"'></a></td></tr></table></td></tr><tr><td><span id='content'></span></td></tr>"
+"<tr bgcolor=#dddddd><td style='padding:1px' align=center><span id='lblToday'></span></td></tr>"
+"</table>"+_iframe+"</div>";document.body.appendChild(node);}
ef.get("ef_calendar_close").onclick=function(){domain.hideCalendar()};this.csobj=(this.dom)?ef.get("calendar").style:this.ie?document.all.calendar:document.calendar;this.hideCalendar();ef.get("lblToday").innerHTML="<a id='ef_calendar_clear' href='javascript:' style='color:black'>["+getI18nMessages("ef.CalendarClear","清空")+"]</a>&nbsp;&nbsp;"
+"<span style='color:black'>"+getI18nMessages("ef.CalendarToday","今天")+"</span>"+"<a id='ef_calendar_today' style='color:black' href='javascript:'>"
+this.yrNow+getI18nMessages("ef.CalendarYear","年")+this.mtName[this.mtNow].substring(0,3)+getI18nMessages("ef.CalendarMonth","月")+this.dateNow+getI18nMessages("ef.CalendarDay","日 ")
+getI18nMessages("ef.CalendarWeek","周")+this.dayName[(this.today.getDay()-this.startAt==-1)?6:(this.today.getDay()-this.startAt)]+"</a>";ef.get("ef_calendar_clear").onclick=function(){domain.closeCalendar("clear")};ef.get("ef_calendar_today").onclick=function(){domain.dateSlt=domain.dateNow;domain.mtSlt=domain.mtNow;domain.yrSlt=domain.yrNow;domain.closeCalendar();};YMmsg="<span style='font-size:11px;font-weight:Bold;color:#505050;text-align:center;'>";YMStyle="style='cursor:pointer;font-size:11px;text-align: center;'";SpanLeftSytle="style='cursor:pointer;background-color:#fff6a6;'";sH1="<span id='ef_calendar_spanLeft'"+SpanLeftSytle+" >&nbsp<IMG id='changeLeft' SRC='"+efico.get("efcalendar.left1Img")+"'  BORDER=0>&nbsp</span>&nbsp;";sH1+="<span id='ef_calendar_spanRight' "+SpanLeftSytle+" >&nbsp<IMG id='changeRight' SRC='"+efico.get("efcalendar.right1Img")+"'  BORDER=0>&nbsp</span>&nbsp";sH1+="<span id='spanYear' "+YMStyle+"></span>"+YMmsg+getI18nMessages("ef.CalendarYear","年")+"</span>"+"<span id='spanMonth' "+YMStyle+"></span>"+YMmsg+getI18nMessages("ef.CalendarMonth","月")+"</span>";ef.get("caption").innerHTML=sH1;this.bPageLoaded=true;ef.get("ef_calendar_spanLeft").onclick=function(){domain.decMonth();};ef.get("ef_calendar_spanRight").onclick=function(){domain.incMonth();};}
ef_calendar.prototype.hideCalendar=function(){if(this.csobj!=null)this.csobj.visibility="hidden";}
ef_calendar.prototype.padZero=function(num){return(num<10)?'0'+num:num;}
ef_calendar.prototype.constructDate=function(d,m,y)
{sTmp=this.dateFormat;sTmp=sTmp.replace("dd","<e>");sTmp=sTmp.replace("d","<d>");sTmp=sTmp.replace("<e>",this.padZero(d));sTmp=sTmp.replace("<d>",d);sTmp=sTmp.replace("mmmm","<p>");sTmp=sTmp.replace("mmm","<o>");sTmp=sTmp.replace("mm","<n>");sTmp=sTmp.replace("m","<m>");sTmp=sTmp.replace("<m>",m+1);sTmp=sTmp.replace("<n>",this.padZero(m+1));sTmp=sTmp.replace("<o>",this.mtName[m]);sTmp=sTmp.replace("yyyy",y);return sTmp.replace("yy",this.padZero(y%100));}
ef_calendar.prototype.closeCalendar=function(type){this.hideCalendar();if(type=="clear")
this.ctlToPlaceValue.value="";else
this.ctlToPlaceValue.value=this.constructDate(this.dateSlt,this.mtSlt,this.yrSlt);var callback=this.ctlToPlaceValue.getAttribute("callback");if(callback){try{eval(callback)(this.ctlToPlaceValue.value);}catch(exception){}}}
ef_calendar.prototype.incMonth=function(){this.mtSlt++;if(this.mtSlt>11){this.mtSlt=0;this.yrSlt++;}
this.constructCalendar();}
ef_calendar.prototype.decMonth=function(){this.mtSlt--;if(this.mtSlt<0){this.mtSlt=11;this.yrSlt--;}
this.constructCalendar();}
ef_calendar.prototype.WeekNbr=function(n){yr=n.getFullYear();mt=n.getMonth()+1;if(this.startAt==0)
day=n.getDate()+1;else
day=n.getDate();var a=Math.floor((14-mt)/12);y=yr+4800-a;m=mt+12*a-3;var b=Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400);J=day+Math.floor((153*m+2)/5)+365*y+b-32045;d4=(((J+31741-(J%7))%146097)%36524)%1461;L=Math.floor(d4/1460);d1=((d4-L)%365)+L;week=Math.floor(d1/7)+1;return week;}
ef_calendar.prototype.constructCalendar=function(){var domain=this;var aNumDays=Array(31,0,31,30,31,30,31,31,30,31,30,31);var datemsg;var startDate=new Date(this.yrSlt,this.mtSlt,1);var endDate;if(this.mtSlt==1)
{endDate=new Date(this.yrSlt,this.mtSlt+1,1);endDate=new Date(endDate-(24*60*60*1000));numDaysInMonth=endDate.getDate();}else
numDaysInMonth=aNumDays[this.mtSlt];datePointer=0;dayPointer=startDate.getDay()-this.startAt;if(dayPointer<0)
dayPointer=6;sH="<table  border=0 style='background-color:#f7f8fd;color:#505050;border-top:1px solid #999999;border-left:1px solid #999999;border-right:1px solid #999999;padding-left:6px;padding-right:6px;padding-bottom:6px;' cellpadding=1 cellspacing=0><tr>";sH+="<td width=15 > <b>"+getI18nMessages("ef.CalendarWeek","周")+"</b></td><td width=1 rowspan=7 bgcolor='#d0d0d0' style='padding:0px'><img src='"+efico.get('efcalendar.dividerImg')+"' width=1></td>";for(i=0;i<7;i++){sH+="<td width='15' align='right'><b>&nbsp;&nbsp;"+this.dayName[i]+"</b></td>";}
sH+="</tr><tr>";sH+="<td align=right>"+this.WeekNbr(startDate)+"&nbsp;</td>";for(var i=1;i<=dayPointer;i++)
sH+="<td>&nbsp;</td>";for(datePointer=1;datePointer<=numDaysInMonth;datePointer++)
{dayPointer++;sStyle="cursor:pointer;text-decoration:none;color:black;font-size:11px;";if((datePointer==this.odateSelect)&&(this.mtSlt==this.omonthSelect)&&(this.yrSlt==this.oyearSelect))
sStyle+="border-style:solid;border-width:1px;border-color:#a0a0a0;";sHint="";var regexp=/\"/g;sHint=sHint.replace(regexp,"&quot;");datemsg="id='ef_calendar_date"+datePointer+"' selectDate='"+datePointer+"'onmousemove='this.style.backgroundColor=\"#d2eaf6\";' onmouseout='this.style.backgroundColor=\"#f7f8fd\";' ";if((datePointer==this.dateNow)&&(this.mtSlt==this.mtNow)&&(this.yrSlt==this.yrNow))
sH+="<td align=right style='cursor:pointer;font-family:verdana,arial,helvetica,sans-serif;font-size:11px;'>"+"<b><span "+datemsg+" title=\""+sHint+"\"><font color=#ff0000 >&nbsp;"+datePointer+"</font>&nbsp;</span></b>";else if(dayPointer%7==(this.startAt*-1)+1)
sH+="<td align=right >"+"<b><span "+datemsg+" title=\""+sHint+"\" style='"+sStyle+"'>&nbsp;<font color=#909090>"+datePointer+"</font>&nbsp;</span></b>";else
sH+="<td align=right >"+"<b><span "+datemsg+" title=\""+sHint+"\" style='"+sStyle+"' >&nbsp;"+datePointer+"&nbsp;</span></b>";sH+="";if((dayPointer+this.startAt)%7==this.startAt){sH+="</tr><tr>";if(datePointer<numDaysInMonth)
{sH+="<td align=right>"+(this.WeekNbr(new Date(this.yrSlt,this.mtSlt,datePointer+1)))+"&nbsp;</td>";}}}
ef.get("content").innerHTML=sH;for(datePointer=1;datePointer<=numDaysInMonth;datePointer++){ef.get("ef_calendar_date"+datePointer).onclick=function(){domain.dateSlt=this.getAttribute("selectDate");domain.closeCalendar();};}
ef.get("spanMonth").innerHTML="<input id='ef_calendar_monthInput' type='text' class='inputField' style='width:20px' value='"+this.mtName[this.mtSlt]+"'>";ef.get("spanYear").innerHTML="<input id='ef_calendar_yearInput' type='text' class='inputField' style='width:40px' value='"+this.yrSlt+"'>";ef.get("ef_calendar_yearInput").onblur=function(){if(domain.validateYear(this.value))domain.constructCalendar();else{this.focus();this.select();}};ef.get("ef_calendar_yearInput").onkeypress=function(e){var event=window.event||e;if(event.keyCode!=13)return true;else if(domain.validateYear(this.value))domain.constructCalendar();else return false;};ef.get("ef_calendar_monthInput").onblur=function(){if(domain.validateMonth(this.value))domain.constructCalendar();else{this.select();this.focus();}};ef.get("ef_calendar_monthInput").onkeypress=function(e){var event=window.event||e;if(event.keyCode!=13)return true;else if(domain.validateMonth(this.value))domain.constructCalendar();else return false;};}
ef_calendar.prototype.validateMonth=function(month){if(isNaN(parseInt(month))||parseInt(month)<1||parseInt(month)>12){alert(getI18nMessages("ef.CalendarMonthInvalid","月份输入不正确，请重新输入！"));return false;}
else{this.mtSlt=parseInt(month)-1;return true;}}
ef_calendar.prototype.validateYear=function(year){if(isNaN(parseInt(year))||parseInt(year)<0){alert(getI18nMessages("ef.CalendarYearInvalid","年份输入不正确，请重新输入！"));return false;}
else{this.yrSlt=parseInt(year);return true;}}
ef_calendar.prototype.show=function(ctl,ctl2,ft,rightPosition){var leftpos=0;var toppos=0;if(this.bPageLoaded)
{if(this.csobj.visibility=="hidden"){this.ctlToPlaceValue=ctl2;this.dateFormat=ft;ftChars=[" ","/",".","-",""];for(var k=0;k<ftChars.length;k++){ftChar=ftChars[k];aFormat=ft.split(ftChar);if(aFormat.length>=3)
break;}
tokensChanged=0;aData=ctl2.value.split(ftChar);for(i=0;i<3;i++)
{if((aFormat[i]=="d")||(aFormat[i]=="dd"))
{this.dateSlt=parseInt(aData[i],10);tokensChanged++;}
else if((aFormat[i]=="m")||(aFormat[i]=="mm"))
{this.mtSlt=parseInt(aData[i],10)-1;tokensChanged++;}
else if(aFormat[i]=="yyyy")
{this.yrSlt=parseInt(aData[i],10);tokensChanged++;}
else if(aFormat[i]=="mmm")
{for(j=0;j<12;j++)
{if(aData[i]==this.mtName[j])
{this.mtSlt=j;tokensChanged++;}}}}
if((tokensChanged!=3)||isNaN(this.dateSlt)||isNaN(this.mtSlt)||isNaN(this.yrSlt))
{this.dateSlt=this.dateNow;this.mtSlt=this.mtNow;this.yrSlt=this.yrNow;if(ctl2.value.length==8){var valuestr=ctl2.value;var nanflage=false;for(var i=0;i<valuestr.length;i++){if(valuestr.charAt(i)<'0'||valuestr.charAt(i)>'9')
nanflage=true;}
aData=[ctl2.value.substring(0,4),ctl2.value.substring(4,6),ctl2.value.substring(6,8)];this.dateSlt=parseInt(aData[2],10);this.mtSlt=parseInt(aData[1],10)-1;this.yrSlt=parseInt(aData[0],10);if(this.mtSlt>=12||nanflage){this.dateSlt=this.dateNow;this.mtSlt=this.mtNow;this.yrSlt=this.yrNow;}}}
this.odateSelect=this.dateSlt;this.omonthSelect=this.mtSlt;this.oyearSelect=this.yrSlt;aTag=ctl;scrollTopValue=0;if($.browser.msie){do{aTag=aTag.offsetParent;scrollTopValue=aTag.scrollTop;leftpos+=(aTag.offsetLeft-aTag.scrollLeft);toppos+=(aTag.offsetTop-aTag.scrollTop);}while(aTag.tagName!="BODY");toppos+=scrollTopValue;}else{do{aTag=aTag.offsetParent;scrollTopValue+=aTag.scrollTop;leftpos+=(aTag.offsetLeft-aTag.scrollLeft);toppos+=(aTag.offsetTop-aTag.scrollTop);}while(aTag.tagName!="BODY");toppos-=scrollTopValue;}
if(ctl.offsetLeft+leftpos<=210&&!rightPosition)
leftpoint=210+ctl.offsetLeft+leftpos;else if(!rightPosition)
leftpoint=ctl.offsetLeft+leftpos;if(ctl.offsetLeft+leftpos+210>=aTag.offsetWidth&&rightPosition)
leftpoint=ctl.offsetLeft+leftpos-210;else if(rightPosition)
leftpoint=ctl.offsetLeft+leftpos;this.csobj.left=leftpoint+(rightPosition?0:(-210));this.csobj.top=ctl.offsetTop+toppos+ctl.offsetHeight+2;this.constructCalendar(1,this.mtSlt,this.yrSlt);this.csobj.visibility=(this.dom||this.ie)?"visible":"show";IFCALENDARSHOW=true;IFCALENDARSPANSHOW=false;}
else
{this.hideCalendar();if(this.ctlNow!=ctl){efcalendar(ctl,ctl2,ft,rightPosition);}}
this.ctlNow=ctl;}}
function efcalendar(ctl,ctl2,ft,rightPosition){var calendar=new ef_calendar();calendar.init();calendar.show(ctl,ctl2,ft,rightPosition);}
function createCalendar(id)
{}
efcalendar_show=function(control_source,id)
{efcalendar_click(control_source,id);}
document.onclick=function hidecal2(){if(!IFCALENDARSHOW)
{if(ef.get("calendar"))
ef.get("calendar").style.visibility="hidden";}
IFCALENDARSHOW=false;if(!IFCALENDARSPANSHOW)
{if(ef.get("calendarSpan"))
ef.get("calendarSpan").style.visibility="hidden";}
IFCALENDARSPANSHOW=false;}

var IFCALENDARSPANSHOW=false;ef_calendarSpan=function(){this.startSAt=1;this.dateSSlt;this.mtSSlt;this.yrSSlt;this.csobj;this.m_somonthSelect;this.m_sodateSelect;this.m_sctlToPlaceValue;this.dateFormat;this.ctlNow;this.bPageLoaded=false;this.today=new Date();this.dateNow=this.today.getDate();this.mtNow=this.today.getMonth();this.yrNow=this.today.getYear();this.mtName=new Array("1","2","3","4","5","6","7","8","9","10","11","12");this.dayName=new Array(getI18nMessages("ef.CalendarMon","一"),getI18nMessages("ef.CalendarTues","二"),getI18nMessages("ef.CalendarWed","三"),getI18nMessages("ef.CalendarThurs","四"),getI18nMessages("ef.CalendarFriday","五"),getI18nMessages("ef.CalendarSat","六"),getI18nMessages("ef.CalendarSun","日"));this.dom=document.getElementById;this.ie=document.all;this.dateESlt;this.mtESlt;this.yrESlt;this.m_eomonthSelect;this.m_eodateSelect;this.m_ectlToPlaceValue;}
ef_calendarSpan.prototype.init=function(){var domain=this;if(!this.ie)this.yrNow+=1900;if(ef.get("ef_calendarSpan")==null){var node=document.createElement("DIV");var _iframe="";if($.browser.msie){_iframe="<iframe src='javascript:false'style='position:absolute;visibility:inherit;top:0px;left:0px;width:215px;z-index:-1;filter=\"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\";'></iframe>";}
node.id="ef_calendarSpan";node.innerHTML="<div onclick='IFCALENDARSPANSHOW=true' id='calendarSpan' style='z-index:+999;position:absolute;visibility:hidden;'>"
+" <table border=0 width=360 style='border-width:1;border-style:solid;border-color:#a0a0a0;' bgcolor='#ffffff'>"
+"<tr >"
+"<td>"
+"<table border=0>"
+"<tr style='background-image: url("+efico.get("efpage.divHeadLine")+");'>"
+"<td width='100%' ><font color='#ffffff'><B><span id='captionStartDate'></span></B></font>"
+"</td>"
+"</tr>"
+"</table>"
+"</td>"
+"<td>"
+"<table border=0 >"
+"<tr style='background-image: url("+efico.get("efpage.divHeadLine")+");'>"
+"<td align=left width='95%'><font color='#ffffff'><B><span id='captionEndDate'></span></B></font>"
+"</td>"
+"<td align=right ><a id='ef_calendarSpan_close' href='javascript:' onclick='hideCalendar()'>"
+"<IMG SRC='"+efico.get('efcalendarSpan.closeImg')+"' WIDTH='15' HEIGHT='13' BORDER='0' ALT='"+getI18nMessages("ef.CalendarClose","关闭")+"'>"
+"</a>"
+"</td>"
+"</tr>"
+"</table>"
+"</td>"
+"</tr>"
+"<tr>"
+"<td><span id='contentStartDate'></span>"
+"<td><span id='contentEndDate'></span>"
+"</td>"
+"</tr>"
+"<tr bgcolor=#dddddd><td style='padding:1px' align=center colspan=2><span id='lblSpanToday'></span></td></tr>"
+"</table>"
+_iframe+"</div>";document.body.appendChild(node);}
ef.get("ef_calendarSpan_close").onclick=function(){domain.hideCalendar()};this.csobj=(this.dom)?ef.get("calendarSpan").style:this.ie?document.all.calendar:document.calendar;this.hideCalendar();ef.get("lblSpanToday").innerHTML="<a id='ef_calendarSpan_clear' href='javascript:' style='color:black'>["+getI18nMessages("ef.CalendarClear","清空")+"]</a>&nbsp;&nbsp;"
+"<span style='color:black'>"+getI18nMessages("ef.CalendarToday","今天")+"</span>"+"<a id='ef_calendarSpan_today' style='color:black' href='javascript:'>"
+this.yrNow+getI18nMessages("ef.CalendarYear","年")+this.mtName[this.mtNow].substring(0,3)+getI18nMessages("ef.CalendarMonth","月")+this.dateNow+getI18nMessages("ef.CalendarDay","日 ")
+getI18nMessages("ef.CalendarWeek","周")+this.dayName[(this.today.getDay()-this.startSAt==-1)?6:(this.today.getDay()-this.startSAt)]+"</a>";ef.get("ef_calendarSpan_clear").onclick=function(){domain.closeCalendar("clear")};ef.get("ef_calendarSpan_today").onclick=function(){domain.dateSSlt=domain.dateNow;domain.mtSSlt=domain.mtNow;domain.yrSSlt=domain.yrNow;domain.dateESlt=domain.dateNow;domain.mtESlt=domain.mtNow;domain.yrESlt=domain.yrNow;domain.closeCalendar();};YMmsg="<span style='font-size:11px;font-weight:Bold;color:#505050;text-align:center;'>";YMStyle="style='cursor:pointer;font-size:11px;text-align: center;'";SpanLeftSytle="style='cursor:pointer;background-color:#fff6a6;'";sH1="<span id='ef_calendarStart_spanLeft'"+SpanLeftSytle+" >&nbsp<IMG id='changeLeft' SRC='"+efico.get("efcalendarSpan.left1Img")+"'  BORDER=0>&nbsp</span>&nbsp;";sH1+="<span id='ef_calendarStart_spanRight' "+SpanLeftSytle+" >&nbsp<IMG id='changeRight' SRC='"+efico.get("efcalendarSpan.right1Img")+"'  BORDER=0>&nbsp</span>&nbsp";sH1+="<span id='spanStartYear' "+YMStyle+"></span>"+YMmsg+getI18nMessages("ef.CalendarYear","年")+"</span>"+"<span id='spanStartMonth' "+YMStyle+"></span>"+YMmsg+getI18nMessages("ef.CalendarMonth","月")+"</span>";ef.get("captionStartDate").innerHTML=sH1;sH2="<span id='ef_calendarEnd_spanLeft'"+SpanLeftSytle+" >&nbsp<IMG id='changeLeft' SRC='"+efico.get("efcalendarSpan.left1Img")+"'  BORDER=0>&nbsp</span>&nbsp;";sH2+="<span id='ef_calendarEnd_spanRight' "+SpanLeftSytle+" >&nbsp<IMG id='changeRight' SRC='"+efico.get("efcalendarSpan.right1Img")+"'  BORDER=0>&nbsp</span>&nbsp";sH2+="<span id='spanEndYear' "+YMStyle+"></span>"+YMmsg+getI18nMessages("ef.CalendarYear","年")+"</span>"+"<span id='spanEndMonth' "+YMStyle+"></span>"+YMmsg+getI18nMessages("ef.CalendarMonth","月")+"</span>";ef.get("captionEndDate").innerHTML=sH2;this.bPageLoaded=true;ef.get("ef_calendarStart_spanLeft").onclick=function(){domain.sDecMonth();};ef.get("ef_calendarStart_spanRight").onclick=function(){domain.sIncMonth();};ef.get("ef_calendarEnd_spanLeft").onclick=function(){domain.eDecMonth();};ef.get("ef_calendarEnd_spanRight").onclick=function(){domain.eIncMonth();};}
ef_calendarSpan.prototype.hideCalendar=function(){if(this.csobj!=null)this.csobj.visibility="hidden";}
ef_calendarSpan.prototype.padZero=function(num){return(num<10)?'0'+num:num;}
ef_calendarSpan.prototype.constructDate=function(d,m,y)
{sTmp=this.dateFormat;sTmp=sTmp.replace("dd","<e>");sTmp=sTmp.replace("d","<d>");sTmp=sTmp.replace("<e>",this.padZero(d));sTmp=sTmp.replace("<d>",d);sTmp=sTmp.replace("mmmm","<p>");sTmp=sTmp.replace("mmm","<o>");sTmp=sTmp.replace("mm","<n>");sTmp=sTmp.replace("m","<m>");sTmp=sTmp.replace("<m>",m+1);sTmp=sTmp.replace("<n>",this.padZero(m+1));sTmp=sTmp.replace("<o>",this.mtName[m]);sTmp=sTmp.replace("yyyy",y);return sTmp.replace("yy",this.padZero(y%100));}
ef_calendarSpan.prototype.closeCalendar=function(type){if(type=="clear")
{this.m_sctlToPlaceValue.value="";this.m_ectlToPlaceValue.value="";}
else
{this.m_sctlToPlaceValue.value=this.constructDate(this.dateSSlt,this.mtSSlt,this.yrSSlt);this.m_ectlToPlaceValue.value=this.constructDate(this.dateESlt,this.mtESlt,this.yrESlt);}
var callback=this.m_sctlToPlaceValue.getAttribute("callback");if(callback){try{eval(callback)(this.m_sctlToPlaceValue.value);}catch(exception){}}
var callback2=this.m_ectlToPlaceValue.getAttribute("callback");if(callback2){try{eval(callback2)(this.m_ectlToPlaceValue.value);}catch(exception){}}}
ef_calendarSpan.prototype.sIncMonth=function(){this.mtSSlt++;if(this.mtSSlt>11){this.mtSSlt=0;this.yrSSlt++;}
this.constructStartCalendar();}
ef_calendarSpan.prototype.eIncMonth=function(){this.mtESlt++;if(this.mtESlt>11){this.mtESlt=0;this.yrESlt++;}
this.constructEndCalendar();}
ef_calendarSpan.prototype.sDecMonth=function(){this.mtSSlt--;if(this.mtSSlt<0){this.mtSSlt=11;this.yrSSlt--;}
this.constructStartCalendar();}
ef_calendarSpan.prototype.eDecMonth=function(){this.mtESlt--;if(this.mtESlt<0){this.mtESlt=11;this.yrESlt--;}
this.constructEndCalendar();}
ef_calendarSpan.prototype.WeekNbr=function(n){yr=n.getFullYear();mt=n.getMonth()+1;if(this.startSAt==0)
day=n.getDate()+1;else
day=n.getDate();a=Math.floor((14-mt)/12);y=yr+4800-a;m=mt+12*a-3;b=Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400);J=day+Math.floor((153*m+2)/5)+365*y+b-32045;d4=(((J+31741-(J%7))%146097)%36524)%1461;L=Math.floor(d4/1460);d1=((d4-L)%365)+L;week=Math.floor(d1/7)+1;return week;}
ef_calendarSpan.prototype.constructStartCalendar=function(){var domain=this;var aNumDays=Array(31,0,31,30,31,30,31,31,30,31,30,31);var datemsg;var startDate=new Date(this.yrSSlt,this.mtSSlt,1);var endDate;if(this.mtSSlt==1)
{endDate=new Date(this.yrSSlt,this.mtSSlt+1,1);endDate=new Date(endDate-(24*60*60*1000));numDaysInMonth=endDate.getDate();}else
numDaysInMonth=aNumDays[this.mtSSlt];datePointer=0;dayPointer=startDate.getDay()-this.startSAt;if(dayPointer<0)
dayPointer=6;sH="<table  border=0 style='background-color:#f7f8fd;color:#505050;border-top:1px solid #999999;border-left:1px solid #999999;border-right:1px solid #999999;padding-left:6px;padding-right:6px;padding-bottom:6px;' cellpadding=1 cellspacing=0><tr>";sH+="<td width=15 > <b>"+getI18nMessages("ef.CalendarWeek","周")+"</b></td><td width=1 rowspan=7 bgcolor='#d0d0d0' style='padding:0px'><img src='"+efico.get('efcalendarSpan.dividerImg')+"' width=1></td>";for(i=0;i<7;i++){sH+="<td width='15' align='right'><b>&nbsp;&nbsp;"+this.dayName[i]+"</b></td>";}
sH+="</tr><tr>";sH+="<td align=right>"+this.WeekNbr(startDate)+"&nbsp;</td>";for(var i=1;i<=dayPointer;i++)
sH+="<td>&nbsp;</td>";for(datePointer=1;datePointer<=numDaysInMonth;datePointer++)
{dayPointer++;sStyle="cursor:pointer;text-decoration:none;color:black;font-size:11px;";if((datePointer==this.m_sodateSelect)&&(this.mtSSlt==this.m_somonthSelect)&&(this.yrSSlt==this.oyearSelect))
sStyle+="border-style:solid;border-width:1px;border-color:#a0a0a0;";sHint="";var regexp=/\"/g;sHint=sHint.replace(regexp,"&quot;");datemsg="id='ef_calendarStart_date"+datePointer+"' selectDate='"+datePointer+"'onmousemove='this.style.backgroundColor=\"#d2eaf6\";' onmouseout='this.style.backgroundColor=\"#f7f8fd\";' ";if((datePointer==this.dateNow)&&(this.mtSSlt==this.mtNow)&&(this.yrSSlt==this.yrNow))
sH+="<td align=right style='cursor:pointer;font-family:verdana,arial,helvetica,sans-serif;font-size:11px;'>"+"<b><span "+datemsg+" title=\""+sHint+"\"><font color=#ff0000 >&nbsp;"+datePointer+"</font>&nbsp;</span></b>";else if(dayPointer%7==(this.startSAt*-1)+1)
sH+="<td align=right >"+"<b><span "+datemsg+" title=\""+sHint+"\" style='"+sStyle+"'>&nbsp;<font color=#909090>"+datePointer+"</font>&nbsp;</span></b>";else
sH+="<td align=right >"+"<b><span "+datemsg+" title=\""+sHint+"\" style='"+sStyle+"' >&nbsp;"+datePointer+"&nbsp;</span></b>";sH+="";if((dayPointer+this.startSAt)%7==this.startSAt){sH+="</tr><tr>";if(datePointer<numDaysInMonth)
{sH+="<td align=right>"+(this.WeekNbr(new Date(this.yrSSlt,this.mtSSlt,datePointer+1)))+"&nbsp;</td>";}}}
ef.get("contentStartDate").innerHTML=sH;for(datePointer=1;datePointer<=numDaysInMonth;datePointer++){ef.get("ef_calendarStart_date"+datePointer).onclick=function(){domain.dateSSlt=this.getAttribute("selectDate");domain.closeCalendar();};}
ef.get("spanStartMonth").innerHTML="<input id='ef_scalendar_monthInput' type='text' class='inputField' style='width:20px' value='"+this.mtName[this.mtSSlt]+"'>";ef.get("spanStartYear").innerHTML="<input id='ef_scalendar_yearInput' type='text' class='inputField' style='width:40px' value='"+this.yrSSlt+"'>";ef.get("ef_scalendar_yearInput").onblur=function(){if(domain.validateSYear(this.value))domain.constructStartCalendar();else{this.focus();this.select();}};ef.get("ef_scalendar_yearInput").onkeypress=function(e){var event=window.event||e;if(event.keyCode!=13)return true;else if(domain.validateSYear(this.value))domain.constructStartCalendar();else return false;};ef.get("ef_scalendar_monthInput").onblur=function(){if(domain.validateSMonth(this.value))domain.constructStartCalendar();else{this.select();this.focus();}};ef.get("ef_scalendar_monthInput").onkeypress=function(e){var event=window.event||e;if(event.keyCode!=13)return true;else if(domain.validateSMonth(this.value))domain.constructStartCalendar();else return false;};}
ef_calendarSpan.prototype.constructEndCalendar=function(){var domain=this;var aNumDays=Array(31,0,31,30,31,30,31,31,30,31,30,31);var datemsg;var startDate=new Date(this.yrESlt,this.mtESlt,1);var endDate;if(this.mtESlt==1)
{endDate=new Date(this.yrESlt,this.mtESlt+1,1);endDate=new Date(endDate-(24*60*60*1000));numDaysInMonth=endDate.getDate();}else
numDaysInMonth=aNumDays[this.mtESlt];datePointer=0;dayPointer=startDate.getDay()-this.startSAt;if(dayPointer<0)
dayPointer=6;sH="<table  border=0 style='background-color:#f7f8fd;color:#505050;border-top:1px solid #999999;border-left:1px solid #999999;border-right:1px solid #999999;padding-left:6px;padding-right:6px;padding-bottom:6px;' cellpadding=1 cellspacing=0><tr>";sH+="<td width=15 > <b>"+getI18nMessages("ef.CalendarWeek","周")+"</b></td><td width=1 rowspan=7 bgcolor='#d0d0d0' style='padding:0px'><img src='"+efico.get('efcalendarSpan.dividerImg')+"' width=1></td>";for(i=0;i<7;i++){sH+="<td width='15' align='right'><b>&nbsp;&nbsp;"+this.dayName[i]+"</b></td>";}
sH+="</tr><tr>";sH+="<td align=right>"+this.WeekNbr(startDate)+"&nbsp;</td>";for(var i=1;i<=dayPointer;i++)
sH+="<td>&nbsp;</td>";for(datePointer=1;datePointer<=numDaysInMonth;datePointer++)
{dayPointer++;sStyle="cursor:pointer;text-decoration:none;color:black;font-size:11px;";if((datePointer==this.m_eodateSelect)&&(this.mtESlt==this.m_somonthSelect)&&(this.yrSSlt==this.oyearSelect))
sStyle+="border-style:solid;border-width:1px;border-color:#a0a0a0;";sHint="";var regexp=/\"/g;sHint=sHint.replace(regexp,"&quot;");datemsg="id='ef_calendarEnd_date"+datePointer+"' selectDate='"+datePointer+"'onmousemove='this.style.backgroundColor=\"#d2eaf6\";' onmouseout='this.style.backgroundColor=\"#f7f8fd\";' ";if((datePointer==this.dateNow)&&(this.mtESlt==this.mtNow)&&(this.yrSSlt==this.yrNow))
sH+="<td align=right style='cursor:pointer;font-family:verdana,arial,helvetica,sans-serif;font-size:11px;'>"+"<b><span "+datemsg+" title=\""+sHint+"\"><font color=#ff0000 >&nbsp;"+datePointer+"</font>&nbsp;</span></b>";else if(dayPointer%7==(this.startSAt*-1)+1)
sH+="<td align=right >"+"<b><span "+datemsg+" title=\""+sHint+"\" style='"+sStyle+"'>&nbsp;<font color=#909090>"+datePointer+"</font>&nbsp;</span></b>";else
sH+="<td align=right >"+"<b><span "+datemsg+" title=\""+sHint+"\" style='"+sStyle+"' >&nbsp;"+datePointer+"&nbsp;</span></b>";sH+="";if((dayPointer+this.startSAt)%7==this.startSAt){sH+="</tr><tr>";if(datePointer<numDaysInMonth)
{sH+="<td align=right>"+(this.WeekNbr(new Date(this.yrESlt,this.mtESlt,datePointer+1)))+"&nbsp;</td>";}}}
ef.get("contentEndDate").innerHTML=sH;for(datePointer=1;datePointer<=numDaysInMonth;datePointer++){ef.get("ef_calendarEnd_date"+datePointer).onclick=function(){domain.dateESlt=this.getAttribute("selectDate");domain.closeCalendar();};}
ef.get("spanEndMonth").innerHTML="<input id='ef_ecalendar_monthInput' type='text' class='inputField' style='width:20px' value='"+this.mtName[this.mtESlt]+"'>";ef.get("spanEndYear").innerHTML="<input id='ef_ecalendar_yearInput' type='text' class='inputField' style='width:40px' value='"+this.yrESlt+"'>";ef.get("ef_ecalendar_yearInput").onblur=function(){if(domain.validateEYear(this.value))domain.constructEndCalendar();else{this.focus();this.select();}};ef.get("ef_ecalendar_yearInput").onkeypress=function(e){var event=window.event||e;if(event.keyCode!=13)return true;else if(domain.validateEYear(this.value))domain.constructEndCalendar();else return false;};ef.get("ef_ecalendar_monthInput").onblur=function(){if(domain.validateEMonth(this.value))domain.constructEndCalendar();else{this.select();this.focus();}};ef.get("ef_ecalendar_monthInput").onkeypress=function(e){var event=window.event||e;if(event.keyCode!=13)return true;else if(domain.validateEMonth(this.value))domain.constructEndCalendar();else return false;};}
ef_calendarSpan.prototype.validateSMonth=function(month){if(isNaN(parseInt(month))||parseInt(month)<1||parseInt(month)>12){alert(getI18nMessages("ef.CalendarMonthInvalid","月份输入不正确，请重新输入！"));return false;}
else{this.mtSSlt=parseInt(month)-1;return true;}}
ef_calendarSpan.prototype.validateEMonth=function(month){if(isNaN(parseInt(month))||parseInt(month)<1||parseInt(month)>12){alert(getI18nMessages("ef.CalendarMonthInvalid","月份输入不正确，请重新输入！"));return false;}
else{this.mtESlt=parseInt(month)-1;return true;}}
ef_calendarSpan.prototype.validateSYear=function(year){if(isNaN(parseInt(year))||parseInt(year)<0){alert(getI18nMessages("ef.CalendarYearInvalid","年份输入不正确，请重新输入！"));return false;}
else{this.yrSSlt=parseInt(year);return true;}}
ef_calendarSpan.prototype.validateEYear=function(year){if(isNaN(parseInt(year))||parseInt(year)<0){alert(getI18nMessages("ef.CalendarYearInvalid","年份输入不正确，请重新输入！"));return false;}
else{this.yrESlt=parseInt(year);return true;}}
ef_calendarSpan.prototype.show=function(ctl,ctl2,ctl3,ft,rightPosition){var leftpos=0;var toppos=0;if(this.bPageLoaded)
{if(this.csobj.visibility=="hidden"){this.m_sctlToPlaceValue=ctl2;this.m_ectlToPlaceValue=ctl3;this.dateFormat=ft;ftChars=[" ","/",".","-",""];for(var k=0;k<ftChars.length;k++){ftChar=ftChars[k];aFormat=ft.split(ftChar);if(aFormat.length>=3)
break;}
tokensChanged=0;aData=ctl2.value.split(ftChar);bData=ctl3.value.split(ftChar);for(i=0;i<3;i++)
{if((aFormat[i]=="d")||(aFormat[i]=="dd"))
{this.dateSSlt=parseInt(aData[i],10);this.dateESlt=parseInt(bData[i],10);tokensChanged++;}
else if((aFormat[i]=="m")||(aFormat[i]=="mm"))
{this.mtSSlt=parseInt(aData[i],10)-1;this.mtESlt=parseInt(bData[i],10)-1;tokensChanged++;}
else if(aFormat[i]=="yyyy")
{this.yrSSlt=parseInt(aData[i],10);this.yrESlt=parseInt(bData[i],10);tokensChanged++;}
else if(aFormat[i]=="mmm")
{for(j=0;j<12;j++)
{if(aData[i]==this.mtName[j])
{this.mtSSlt=j;tokensChanged++;}}}}
if((tokensChanged!=3)||isNaN(this.dateSSlt)||isNaN(this.mtSSlt)||isNaN(this.yrSSlt))
{this.dateSSlt=this.dateNow;this.mtSSlt=this.mtNow;this.yrSSlt=this.yrNow;this.dateESlt=this.dateNow;this.mtESlt=this.mtNow;this.yrESlt=this.yrNow;if(ctl2.value.length==8){var valuestr=ctl2.value;var nanflage=false;for(var i=0;i<valuestr.length;i++){if(valuestr.charAt(i)<'0'||valuestr.charAt(i)>'9')
nanflage=true;}
aData=[ctl2.value.substring(0,4),ctl2.value.substring(4,6),ctl2.value.substring(6,8)];this.dateSSlt=parseInt(aData[2],10);this.mtSSlt=parseInt(aData[1],10)-1;this.yrSSlt=parseInt(aData[0],10);if(this.mtSSlt>=12||nanflage){this.dateSSlt=this.dateNow;this.mtSSlt=this.mtNow;this.yrSSlt=this.yrNow;}}}
if((tokensChanged!=3)||isNaN(this.dateESlt)||isNaN(this.mtESlt)||isNaN(this.yrESlt))
{this.dateESlt=this.dateNow;this.mtESlt=this.mtNow;this.yrESlt=this.yrNow;if(ctl3.value.length==8){var valuestr=ctl3.value;var nanflage=false;for(var i=0;i<valuestr.length;i++){if(valuestr.charAt(i)<'0'||valuestr.charAt(i)>'9')
nanflage=true;}
aData=[ctl3.value.substring(0,4),ctl3.value.substring(4,6),ctl3.value.substring(6,8)];this.datEeSlt=parseInt(aData[2],10);this.mtESlt=parseInt(aData[1],10)-1;this.yrESlt=parseInt(aData[0],10);if(this.mtESlt>=12||nanflage){this.dateESlt=this.dateNow;this.mtESlt=this.mtNow;this.yrESlt=this.yrNow;}}}
this.m_sodateSelect=this.dateSSlt;this.m_somonthSelect=this.mtSSlt;this.m_soyearSelect=this.yrSSlt;this.m_eodateSelect=this.dateESlt;this.m_eomonthSelect=this.mtESlt;this.m_eoeyearSelect=this.yrESlt;aTag=ctl;scrollTopValue=0;if($.browser.msie){do{aTag=aTag.offsetParent;scrollTopValue=aTag.scrollTop;leftpos+=(aTag.offsetLeft-aTag.scrollLeft);toppos+=(aTag.offsetTop-aTag.scrollTop);}while(aTag.tagName!="BODY");toppos+=scrollTopValue;}else{do{aTag=aTag.offsetParent;scrollTopValue+=aTag.scrollTop;leftpos+=(aTag.offsetLeft-aTag.scrollLeft);toppos+=(aTag.offsetTop-aTag.scrollTop);}while(aTag.tagName!="BODY");toppos-=scrollTopValue;}
if(ctl.offsetLeft+leftpos<=210&&!rightPosition)
leftpoint=210+ctl.offsetLeft+leftpos;else if(!rightPosition)
leftpoint=ctl.offsetLeft+leftpos;if(ctl.offsetLeft+leftpos+210>=aTag.offsetWidth&&rightPosition)
leftpoint=ctl.offsetLeft+leftpos-210;else if(rightPosition)
leftpoint=ctl.offsetLeft+leftpos;this.csobj.left=leftpoint+(rightPosition?0:(-210));this.csobj.top=ctl.offsetTop+toppos+ctl.offsetHeight+2;this.constructStartCalendar(1,this.mtSSlt,this.yrSSlt);this.constructEndCalendar(1,this.mtESlt,this.yrESlt);this.csobj.visibility=(this.dom||this.ie)?"visible":"show";IFCALENDARSPANSHOW=true;IFCALENDARSHOW=false;}
else
{this.hideCalendar();if(this.ctlNow!=ctl){efcalendarSpan(ctl,ctl2,ctl3,ft,rightPosition);}}
this.ctlNow=ctl;}}
function efcalendarSpan(ctl,ctl2,ctl3,ft,rightPosition){var calendarSpan=new ef_calendarSpan();calendarSpan.init();calendarSpan.show(ctl,ctl2,ctl3,ft,rightPosition);}

efColumn=function(){this.init();}
var COLUMN_CONSTANT={defaultWidth:96,defaultHeight:18};var CUSTOM_ATTR_NAME={enable:true,serviceName:true,queryMethod:true};efColumn.prototype.init=function(){this.sortType="-";this.columnListValue=[];this.columnListLabel=[];this.eiColumn=null;this.customSetting=null;this.columnType=0;this.validator=null;this.existinmeta=true;this.pos=-1;}
efColumn.prototype.prepareData=function(eiinfo){return;}
efColumn.prototype.getColumnType=function(){return this.columnType;}
efColumn.prototype.setEiMeta=function(customed,ei_c){this.customSetting=customed;this.pos=ei_c.pos;this.eiColumn=ei_c;this.validator=efvalidator.build(customed,ei_c);}
efColumn.prototype.getWidth=function(){var w=this.customSetting["width"];if(!isAvailable(w))
w=this.eiColumn.width;if(!isAvailable(w)||w<=0){w=COLUMN_CONSTANT["defaultWidth"];this.setWidth(w);}
return w;}
efColumn.prototype.set=function(n,v)
{var attr=this.customSetting["attr"];if(!isAvailable(attr)){attr=new Object();this.customSetting["attr"]=attr;}
if(n==="attr"){for(var key in v)
attr[key]=v[key];return;}
if(isAvailable(CUSTOM_ATTR_NAME[n])){attr[n]=v;return;}
this.customSetting[n]=v;}
efColumn.prototype.setWidth=function(w){this.set("width",eval(w));}
efColumn.prototype.getHeight=function()
{var h=this.customSetting["height"];if(!isAvailable(h))
h=this.eiColumn.height;if(!isAvailable(h)||h<=0){h=COLUMN_CONSTANT["defaultHeight"];this.setHeight(h);}
return eval(h);}
efColumn.prototype.setHeight=function(h){this.set("height",eval(h));}
efColumn.prototype.getAlign=function(){return this.customSetting["align"]!=null?this.customSetting["align"]:this.eiColumn.align;}
efColumn.prototype.getEname=function(){return this.eiColumn.name;}
efColumn.prototype.getCname=function(){return this.customSetting["descName"]!=null?this.customSetting["descName"]:this.eiColumn.descName;}
efColumn.prototype.isVisible=function(){var v=this.customSetting["visible"]!=null?this.customSetting["visible"]:this.eiColumn.visible;return isAvailable(v)?eval(v):true;}
efColumn.prototype.isReadonly=function(){var v=this.customSetting["readonly"]!=null?this.customSetting["readonly"]:this.eiColumn.readonly;return isAvailable(v)?eval(v):false;}
efColumn.prototype.getDisplayType=function(){return this.customSetting["displayType"]!=null?this.customSetting["displayType"]:this.eiColumn.displayType;}
efColumn.prototype.getFormatString=function(){return this.customSetting["formatter"]!=null?this.customSetting["formatter"]:this.eiColumn.formatter;}
efColumn.prototype.getDateFormatString=function(){return this.customSetting["dateFormatString"]!=null?this.customSetting["dateFormatString"]:this.eiColumn.dateFormatString;}
efColumn.prototype.getDateFormat=function(){return this.customSetting["dateFormat"]!=null?this.customSetting["dateFormat"]:this.eiColumn.dateFormat;}
efColumn.prototype.getDefaultValue=function(){return this.customSetting["defaultValue"]!=null?this.customSetting["defaultValue"]:this.eiColumn.defaultValue;}
efColumn.prototype.getSourceName=function(){return this.customSetting["sourceName"]!=null?this.customSetting["sourceName"]:this.eiColumn.sourceName;}
efColumn.prototype.getBlockName=function(){return this.customSetting["blockName"]!=null?this.customSetting["blockName"]:this.eiColumn.blockName;}
efColumn.prototype.getLabelProperty=function(){return this.customSetting["labelProperty"]!=null?this.customSetting["labelProperty"]:this.eiColumn.labelProperty;}
efColumn.prototype.getValueProperty=function(){return this.customSetting["valueProperty"]!=null?this.customSetting["valueProperty"]:this.eiColumn.valueProperty;}
efColumn.prototype.isEnable=function(){var enable=true;var attr=this.customSetting["attr"];if(isAvailable(attr)&&isAvailable(attr["enable"]))
enable=eval(attr["enable"]);return enable;}
efColumn.prototype.canPersonal=function(){var canPersonal=true;var attr=this.customSetting["canPersonal"];if(isAvailable(this.customSetting)&&isAvailable(attr))
canPersonal=eval(attr);return canPersonal;}
efColumn.prototype.getSumType=function(){var sumType="none";var attr=this.customSetting["sumType"];if(isAvailable(this.customSetting)&&isAvailable(attr))
sumType=attr;return sumType;}
efColumn.prototype.getValidator=function(){return this.validator;}
efColumn.prototype.getEditNodeValue=function(node){return node.value;}
efColumn.prototype.genCellDisplayNode=function(col_value,grid_id,row_index,col_index){var html=this.genCellNode(col_value,grid_id,row_index,col_index);var div_node=document.createElement("div");div_node.innerHTML=html;var node=div_node.firstChild;div_node.removeChild(node);var message=this.vallidateCell(row_index,col_index,col_value,grid_id);if(message!="")
efform.setErrorStyle(node,message,false);else
efform.setErrorStyle(node,"",true);return node;}
efColumn.prototype.genCellNode=function(col_value,grid_id,row_index,col_index,enable,checked){var display_type=this.getDisplayType();var display_value=this.getFormattedDisplay(col_value);if(this.customSetting.editor=="subgrid"||this.customSetting.editor=="popup")
display_value=this.getDisplayCellValue(grid_id,row_index,display_value);var innerHtml=this.genBaseInnerHtml(display_type,col_value,display_value,grid_id,row_index,col_index,enable,checked);var div_html="";var div_align=this.getAlign();if(div_align&&div_align!="left"){div_html="<div efVal=''  class='efgrid-cell' align='"+this.getAlign()+"' style='width:"+(this.getWidth())+"px' >"+innerHtml+"</div>";}
else{div_html="<div efVal=''  class='efgrid-cell'  style='width:"+(this.getWidth())+"px' >"+innerHtml+"</div>";}
if(grid_id=="efgrid_config_sub_grid"){var grid=efgrid.getGridObject(grid_id);var columnEname=grid.getColumn(col_index,TYPE_DATA).getEname();var canPersonal=grid.getCellValue(row_index,0,TYPE_DATA,true);var canHtml=canPersonal=="false"?"disabled=true":"";switch(columnEname){case"isFix":div_html="";if(display_value=='true'){div_html="<div align=center "+canHtml+"><input hidefocus='-1'  type='checkbox' checked onclick='efgrid.subcgrid.setFix("+row_index+","+col_index+",this.checked);'/></div>";}else{div_html="<div align=center "+canHtml+"><input hidefocus='-1' type='checkbox' onclick='efgrid.subcgrid.setFix("+row_index+","+col_index+",this.checked)'/></div>";}
break;case"isVisible":div_html="";if(display_value=='true'){div_html="<div align=center "+canHtml+"><input hidefocus='-1' type='checkbox' checked onclick='efgrid.subcgrid.setVisible("+row_index+","+col_index+",this.checked);'/></div>";}else{div_html="<div align=center "+canHtml+"><input hidefocus='-1' type='checkbox' onclick='efgrid.subcgrid.setVisible("+row_index+","+col_index+",this.checked)'/></div>";}
break;}
return div_html;}else if(this.columnType==TYPE_DATA&&typeof(efgrid_onCellDisplayReady)=="function"){var customed=efgrid_onCellDisplayReady(div_html,row_index,col_index,col_value,display_value,grid_id);if(isAvailable(customed)){if(customed.trim().toLocaleLowerCase().indexOf("<div")!=0)
div_html=$('<div>').append($(div_html).html(customed)).html();else
div_html=customed;}}else if(this.columnType==TYPE_FIX&&typeof(efgrid_onFixCellDisplayReady)=="function"){var customed=efgrid_onFixCellDisplayReady(div_html,row_index,col_index,col_value,display_value,grid_id);if(isAvailable(customed)){if(customed.trim().toLocaleLowerCase().indexOf("<div")!=0)
div_html=$('<div>').append($(div_html).html(customed)).html();else
div_html=customed;}}
return div_html;}
efColumn.prototype.genBaseInnerHtml=function(display_type,col_value,display_value,grid_id,row_index,col_index,enable,checked){if(display_type=="text")return display_value;var html="";var callback=(this.columnType==TYPE_FIX)?"efgrid_onFixCellClick":"efgrid_onDataCellClick";switch(display_type){case"text":html=display_value;break;case"checkbox":html="<input hidefocus='-1' type='checkbox' "
+(enable?"":"disabled=true ")
+(checked?"checked":"")+"/>";break;case"hyperlink":col_value=efutils.replaceCR(col_value," ");html="<a href='#' onclick=\"efform.evalFunction('"+callback+"', '"+grid_id+"', "
+row_index+", "+col_index+", '"+col_value+"');return false;\">"+display_value+"</a>";break;case"textbutton":col_value=efutils.replaceCR(col_value," ");html="<input class='buttonClass' type='button' value='"+display_value+"' onclick=\"efform.evalFunction('"+callback+"', '"
+grid_id+"', "+row_index+", "+col_index+", '"+col_value+"');\"/>";break;case"image":html="<span><img src='"+col_value+"' onclick=\"efform.evalFunction('"+callback+"', '"+grid_id+"', "
+row_index+", "+col_index+", '"+col_value+"');\"/></span>";break;default:html=display_value;break;}
return html;}
efColumn.prototype.vallidateCell=function(row_index,col_index,col_value,grid_id){var message="";var key="key_"+row_index+"_"+col_index;var gridDiv=document.getElementById(grid_id).firstChild;if(this.getColumnType()==TYPE_FIX){key="fix_"+key;message=getI18nMessages(EF_MSG["FIX_COLUMN"],"固定列");}else{key="data_"+key;message=getI18nMessages(EF_MSG["DATA_COLUMN"],"数据列");}
try{if(this.validator)
this.validator.validate(col_value);if(ef_form_validate_message[key]!=null)
delete ef_form_validate_message[key];if(!efform.hasErrorMessage())
gridDiv.title=gridDiv.parentNode.title;else
gridDiv.title=efform.getErrorMessage();return"";}catch(ex){var msg=ex.message;message+="["+col_index+"]"+getI18nMessages(EF_MSG["ROW"],"行")+"["+row_index+"]"
+getI18nMessages(EF_ERROR_MSG["VALIDATE_ERROR"],"数据验证错误")+":"+msg;ef_form_validate_message[key]=message;gridDiv.title=efform.getErrorMessage();return msg;}}
efColumn.prototype.getHeaderHTML=function(readonly,enableColumnSetter){var innerHtml="";sorttype=this.sortType.toLowerCase();if(this.getDisplayType()=="checkbox"){innerHtml="<input hidefocus='-1' type='checkbox'"
+(readonly?"disabled=true":"")+"/>";}else{switch(sorttype){case"a":innerHtml="<IMG SRC='"+efico.get("efgrid.columnSortAscend")+"' >";break;case"d":innerHtml="<IMG SRC='"+efico.get("efgrid.columnSortDecend")+"' >";break;case"":innerHtml="";break;}}
var columnSetterString="";if(enableColumnSetter)
columnSetterString="oncontextmenu='efgrid.divData.onHeaderRightClick(event)' columnId='"+this.customSetting.name+"' ";if(sorttype=="")
return"<div "+columnSetterString+" align='center' style='width:"+this.getWidth()+"px;cursor:hand;text-decoration:underline'>"+this.getCname()+innerHtml+"</div>";else if(sorttype=="a"||sorttype=="d")
return"<div "+columnSetterString+" align='center' style='width:"+this.getWidth()+"px;cursor:hand;'>"+this.getCname()+innerHtml+"</div>";else
return"<div "+columnSetterString+" align='center'  style='width:"+this.getWidth()+"px' >"+this.getCname()+innerHtml+"</div>";}
efColumn.prototype.getFormattedDisplay=function(value,label){value=efutils.replaceCR(value,"&nbsp;");var format_str=this.getFormatString();var dateFormat_str=this.getDateFormatString();if(format_str!=null){var validator=ef_validator_regexes["number"];if(validator.test(value))
return efformat.formatFloat(value,format_str);}else if(dateFormat_str!=null){return efformat.formatDate(value,dateFormat_str);}
return label?label:value;}
efColumn.prototype.getEditNode=function(div_node,newline){var row_index=div_node.parentNode.parentNode.rowIndex;var col_index=div_node.parentNode.cellIndex;var grid_node=efgrid.getEfGridNode(div_node);if(!this.isEnable()||(this.isReadonly()&&!newline)){if(efgrid.config==undefined||undefined==efgrid.config.READONLY_PROMPT||efgrid.config.READONLY_PROMPT=="true"){if(!grid_node||grid_node.efgrid.getStyleSetting(STYLE_CONSTANT["READONLY_PROMPT"])!="false")
efform.showMessageBox(getI18nMessages(EF_ERROR_MSG["CELL_NOT_EDITABLE"],"该单元格无法编辑"));}
return null;}
if(!grid_node)return div_node;var ef_grid=grid_node.efgrid;var value=ef_grid.getCellValue(row_index,col_index,this.getColumnType());div_node.innerHTML=this.getEditNodeHtml(div_node,value);return div_node;}
efColumn.prototype.getEditNodeHtml=function(div_node,value){var inner_html="<input type='text' class='inputField' "+"onchange = 'efgrid.cellChange(event);' value='"+value.replace(/'/g,"&#39;")+"' "
+"style='width:"+this.getWidth()+"px' />";return inner_html;}
efTextColumn=function(){efColumn.call(this);}
efTextColumn.prototype=new efColumn;efComboColumn=function(){efColumn.call(this);}
efComboColumn.prototype=new efColumn;efComboColumn.prototype.prepareData=function(eiinfo){this.columnListValue=[];this.columnListLabel=[];var source_name=this.getSourceName();var attrs=this.customSetting["attr"];var source_list=attrs?attrs[source_name]:null;if(isAvailable(source_list)){for(var i=0;i<source_list.length;i++){this.columnListValue.push(source_list[i]["value"]);this.columnListLabel.push(source_list[i]["label"]);}}
var blockName=this.getBlockName();if(!isAvailable(blockName))
return;var block=eiinfo.getBlock(blockName);if(!isAvailable(block))
throw new Error("Block with id:["+blockName+"] not exists in eiinfo!")
var valuePro=this.getValueProperty();var metas=block.getBlockMeta().getMetas();if(!isAvailable(metas[valuePro]))
return;var labelPro=this.getLabelProperty();if(!isAvailable(labelPro)||!isAvailable(metas[labelPro]))
labelPro=valuePro;for(var i=0;i<block.getRows().length;i++){this.columnListValue.push(block.getCell(i,valuePro));this.columnListLabel.push(block.getCell(i,labelPro));}
return;}
efComboColumn.prototype.getDefaultValue=function(){return this.columnListValue[0];}
efComboColumn.prototype.getEditNodeValue=function(node){if(node.selectedIndex<0)
return node.options.length>0?node.options[0].value:"";return node.options[node.selectedIndex].value;}
efComboColumn.prototype.getFormattedDisplay=function(value,label){var format_str=this.getFormatString();if(isAvailable(format_str)){if(!isAvailable(label)){for(var i=0;i<this.columnListValue.length;i++){if(this.columnListValue[i]==value){label=this.columnListLabel[i];break;}}
if(i>=this.columnListValue.length){value=this.columnListValue[0];label=this.columnListLabel[0];}}
return efutils.replaceString(format_str,"#valueString#",value,/\#labelString#/g,label);}
if(label==null){for(var i=0;i<this.columnListValue.length;i++){if(this.columnListValue[i]==value){label=this.columnListLabel[i];break;}}
if(i>=this.columnListValue.length)
label=this.columnListLabel[0];}
return label;}
efComboColumn.prototype.getEditNodeHtml=function(div_node,value){var opts=[];if(this.columnListValue&&this.columnListValue.length>0){var has_selected=false;for(var i=0;i<this.columnListValue.length;i++){var selected=" ";if(value==this.columnListValue[i]){selected="selected";has_selected=true;}
var display_value=this.getFormattedDisplay(this.columnListValue[i],this.columnListLabel[i]);opts.push("<option value='"+this.columnListValue[i]+"' "+selected+">"+display_value+"</option>");}}else{opts.push("<option selected value='"+value+"'>"+value+"</option>");}
var style_str=(this.getMaxWidth()*15<this.getWidth())?"style='width:"+this.getWidth()+"px' ":" ";var innerHtml="<select class='pulldown' "+style_str+">"+opts.join("")+"</select>";return innerHtml;}
efComboColumn.prototype.getMaxWidth=function(){var w=0;for(var i=0;i<this.columnListValue.length;i++){var option_str=this.getFormattedDisplay(this.columnListValue[i],this.columnListLabel[i]);var option_w=efutils.getTotalBytes(option_str);if(option_w>w)
w=option_w;}
return w;}
efDateColumn=function(){efColumn.call(this);}
efDateColumn.prototype=new efColumn;efDateColumn.prototype.getEditNodeHtml=function(div_node,value){div_node.style.verticalAlign="top";if(isNS)
div_node.style.position="relative";var html_str="<input type='text' id='date_input' class='inputField' ";html_str+=" callback='efDateColumn._calendarCallback' value='"+value+"' style='width:"+this.getWidth()+"px' />";var img_left=div_node.parentNode.offsetWidth-16;html_str+="<img style='position: absolute; top:2px; left:"+img_left+"px' src='"+efico.get("efcalendar.iconImg")+"' "
+"onClick=\"efcalendar(this, date_input, \'"+this.getDateFormat()+"\',false);\">";return html_str;}
efDateColumn._calendarCallback=function(date_value){efgrid.setCellValue("date_input",date_value);}
efSubgridColumn=function(){efColumn.call(this);}
efSubgridColumn.prototype=new efColumn;efSubgridColumn.prototype.getServiceName=function(){var v="";var attr=this.customSetting["attr"];if(isAvailable(attr)&&isAvailable(attr["serviceName"]))
v=attr["serviceName"];return v;}
efSubgridColumn.prototype.getQueryMethod=function(){var v="null_method";var attr=this.customSetting["attr"];if(isAvailable(attr)&&isAvailable(attr["queryMethod"]))
v=attr["queryMethod"];return v;}
efSubgridColumn.prototype.prepareData=function(eiinfo){var blockName=this.getBlockName();this.subgridBlock=eiinfo.blocks[blockName];if(!isAvailable(this.subgridBlock))
throw new Error("Block with id:["+blockName+"] not exists in eiinfo!")
var valuePro=this.getValueProperty();return;}
efSubgridColumn.prototype.getEditNodeHtml=function(div_node,value){if(isNS)div_node.style.position="relative";var window_node=efform.getSubGridDiv();window_node.efDisplayCol=this;value=value.replace(/"/g,"&quot;");var html_str="";var labelPropertyString=this.customSetting.labelProperty;if(labelPropertyString==undefined||labelPropertyString=="")
{html_str="<input type='text' id='subgrid_input' class='inputField' ";html_str+=" value=\""+value+"\" style=\"width:"+(this.getWidth())+"px\"/>";}
else
{var grid=efgrid.getEfGridNode(div_node).efgrid;var row_index=div_node.parentNode.parentNode.rowIndex;var block=grid.blockData;var labelValue=value;if(block.meta.metas[labelPropertyString]!=undefined)
{labelValue=block.rows[row_index][block.meta.metas[labelPropertyString].pos];if(labelValue==null)labelValue="";}
html_str="<input type='text' id='subgrid_input' class='inputField' readonly ";html_str+=" value=\""+value+"\" style=\"display:none\"/>";html_str+="<input type='text' id='subgrid_label' class='inputField' readonly ";html_str+=" value=\""+labelValue+"\" style=\"width:"+(this.getWidth())+"px\"/>";}
var img_left=div_node.parentNode.offsetWidth-16;html_str+="<img style='position: absolute; top:2px; left:"+img_left+"px; cursor:pointer' src='"+efico.get("efform.efPopupWindow")+"' onclick=\"efform.showSubGridWindow('subgrid_input');\" />";return html_str;}
efSubgridColumn.prototype.getDisplayCellValue=function(gridId,row_index,oldValue){if(this.customSetting.labelProperty!=undefined&&this.customSetting.labelProperty!="")
{var block=efgrid.getGridObject(gridId).blockData;if(block.meta.metas[this.customSetting.labelProperty]!=undefined)
{var labelValue=block.rows[row_index][block.meta.metas[this.customSetting.labelProperty].pos];}
else
{var currentEditNode=efgrid.getGridObject(gridId).cellOriginEditNode;if(currentEditNode!=null)
{var inputNodes=currentEditNode.childNodes;if(inputNodes!=null&&inputNodes.length>2)
labelValue=inputNodes[1].value;}}
if(labelValue==null)labelValue="";return labelValue;}
return oldValue;}
efTextareaColumn=function(){efColumn.call(this);}
efTextareaColumn.prototype=new efColumn;efTextareaColumn.prototype.getEditNodeHtml=function(div_node,value){if(isNS)div_node.style.position="relative";var cell_value=efutils.replaceCR(value);var window_node=efform.getSubGridDiv();window_node.efDisplayingCol=null;cell_value=cell_value.replace(/"/g,"&quot;")
var html_str="<input type='text' id='area_input' class='inputField' ";html_str+=" callback=\"efgrid.setCellValue('area_input',\" value=\""+cell_value+"\" style=\"width:"+(this.getWidth())+"px\"/>";var img_left=div_node.parentNode.offsetWidth-16;html_str+="<img style='position: absolute; top:2px; left:"+img_left+"px' src='"+efico.get("efform.efPopupWindow")+"' onclick=\"efform.showTextAreaWindow('area_input');\" />";return html_str;}
efMultiselectColumn=function(){efColumn.call(this);}
efMultiselectColumn.prototype=new efColumn;efMultiselectColumn.prototype.getFormattedDisplay=function(value,label){var returnValue=label?label:value;if(returnValue==null||returnValue.trim()==""){returnValue=getI18nMessages("ef.InputPrompt","请选择...");}
var valueArray=returnValue.split(',');var displayValue="";for(var i=0;i<valueArray.length;i++){var value_i=valueArray[i];var j=getValueIndexFromList(value_i,this.columnListValue);if(i>0){displayValue+=",";}
if(j!=-1){displayValue+=this.columnListLabel[j];}else{displayValue+=value_i;}}
return displayValue;}
function getValueIndexFromList(value,valueList){for(var i=0;i<valueList.length;i++){if(valueList[i]==value){return i;}}
return-1;}
efMultiselectColumn.prototype.prepareData=efComboColumn.prototype.prepareData;efMultiselectColumn.prototype.getMaxWidth=efComboColumn.prototype.getMaxWidth;efMultiselectColumn.prototype.getEditNodeHtml=function(div_node,value){if(isNS)div_node.style.position="relative";var cell_value=efutils.replaceCR(value);var window_node=efform.getSubGridDiv();window_node.efDisplayingCol=null;cell_value=cell_value.replace(/"/g,"&quot;")
var html_str="<input readonly type='text' id='area_input' class='inputField' onclick=\"efform.showMultiselectWindow('area_input', '"+this.getEname()+"');\" ";html_str+=" callback=\"efgrid.setCellValue('area_input',\" value=\""+cell_value+"\" style=\"width:"+(this.getWidth())+"px\"/>";var img_left=div_node.parentNode.offsetWidth-16;html_str+="<img style='position: absolute; top:2px; left:"+img_left+"px' src='"+efico.get("efform.efPopupWindow")+"' onclick=\"efform.showMultiselectWindow('area_input', '"+this.getEname()+"');\" />";return html_str;}
efNewwindowColumn=function(){efColumn.call(this);}
efNewwindowColumn.prototype=new efColumn;efNewwindowColumn.prototype.getEditNodeHtml=function(div_node,value){if(isNS)div_node.style.position="relative";var grid_node=efgrid.getEfGridNode(div_node);var ef_grid=grid_node.efgrid;if(!ef_grid)return div_node.innerHtml;var row_index=div_node.parentNode.parentNode.rowIndex;var col_index=div_node.parentNode.cellIndex;var html_str="<input type='text' id='newwindow_input' class='inputField' value='"+value+"' style='width:"+(this.getWidth())+"px'/>";var img_left=div_node.parentNode.offsetWidth-16;html_str+="<img style='position: absolute; top:2px; left:"+img_left+"px' src='"+efico.get("efgrid.newForm")+"' onclick=\"efform.newWindow('newwindow_input','"
+ef_grid.gridId+"',"+row_index+","+col_index+");\" />";return html_str;}
efPopupColumn=function(){efColumn.call(this);}
efPopupColumn.prototype=new efColumn;efPopupColumn.prototype.getEditNodeHtml=function(div_node,value){if(isNS)div_node.style.position="relative";div_node.efDisplayCol=this;var grid_node=efgrid.getEfGridNode(div_node);var ef_grid=grid_node.efgrid;if(!ef_grid)return div_node.innerHtml;var row_index=div_node.parentNode.parentNode.rowIndex;var col_index=div_node.parentNode.cellIndex;var labelPropertyString=this.customSetting.labelProperty;if(labelPropertyString==undefined||labelPropertyString=="")
{html_str="<input type='text' id='popup_input' class='inputField' ";html_str+=" value=\""+value+"\" style=\"width:"+(this.getWidth())+"px\"/>";}
else
{var grid=efgrid.getEfGridNode(div_node).efgrid;var row_index=div_node.parentNode.parentNode.rowIndex;var block=grid.blockData;var labelValue=value;if(block.meta.metas[labelPropertyString]!=undefined)
{labelValue=block.rows[row_index][block.meta.metas[labelPropertyString].pos];if(labelValue==null)labelValue="";}
html_str="<input type='text' id='popup_input' class='inputField' readonly ";html_str+=" value=\""+value+"\" style=\"display:none\"/>";html_str+="<input type='text' id='popup_label' class='inputField' readonly ";html_str+=" value=\""+labelValue+"\" style=\"width:"+(this.getWidth())+"px\"/>";}
var img_left=div_node.parentNode.offsetWidth-16;html_str+="<img style='position: absolute; top:2px; left:"+img_left+"px' src='"+efico.get("efgrid.newForm");if(this.customSetting.popupType==""||this.customSetting.popupType==null)
{html_str+="' onclick=\"efform.showPopupWindow('"+this.customSetting.contentDivId+"','popup_input');\" />";}
else
{html_str+="' onclick=\"efform.showPopupGridWindow('"+this.customSetting.contentDivId+"','popup_input','"
+this.customSetting.visibleColumnNames+"','"+this.customSetting.visibleColumnDisplayNames+"','"+this.customSetting.valueProperty+"','"
+this.customSetting.labelProperty+"','popupGrid','"+this.customSetting.backFillColumnIds+"','"+this.customSetting.backFillFieldIds+"');\" />";}
return html_str;}
efPopupColumn.prototype.getDisplayCellValue=function(gridId,row_index,oldValue){if(this.customSetting.labelProperty!=undefined&&this.customSetting.labelProperty!="")
{var block=efgrid.getGridObject(gridId).blockData;if(block.meta.metas[this.customSetting.labelProperty]!=undefined)
{var labelValue=block.rows[row_index][block.meta.metas[this.customSetting.labelProperty].pos];}
else
{var currentEditNode=efgrid.getGridObject(gridId).cellOriginEditNode;if(currentEditNode!=null)
{var inputNodes=currentEditNode.childNodes;if(inputNodes!=null&&inputNodes.length>2)
labelValue=inputNodes[1].value;}}
if(labelValue==null)labelValue="";return labelValue;}
return oldValue;}
efPopupColumn.prototype.init=function(){this.contentDivId=null;this.fieldId=null;this.popupType=null;this.visibleColumnNames=null;this.visibleColumnDisplayNames=null;this.backFillColumnIds=null;this.backFillFieldIds=null;}
efPopupColumn.transferDataToParent=function(popupId,value,label)
{var showComponent=document.getElementById(popupId).relativePopupParent;if(showComponent!=undefined&&showComponent!=null)
showComponent.value=value;var popupParentSibling=showComponent.nextSibling;if(popupParentSibling!=undefined&&popupParentSibling!=null)
popupParentSibling.value=label;var row_index=showComponent.parentNode.parentNode.parentNode.rowIndex;try{var column=showComponent.parentNode.efDisplayCol;var ef_grid=efgrid.getEfGridNode(showComponent).efgrid;var block=ef_grid.blockData;var labelProperty=column.getLabelProperty();if(labelProperty!=undefined||labelProperty!=""&&showComponent.tagName=='INPUT')
{if(block.meta.metas[labelProperty]!=undefined)
block.rows[row_index][block.meta.metas[labelProperty].pos]=label;}}catch(e){}
efwindow.hide();}
efColumn.getColumnObject=function(div_node,t){var cell_pos=div_node.parentNode.cellIndex;var grid_node=efgrid.getEfGridNode(div_node);if(!grid_node)return null;var grid=grid_node.efgrid;if(!grid)return null;return grid.getColumn(cell_pos,t);}
efColumn.build=function(customed,eicol,eiinfo){if(customed==null)customed=new Object();var ef_c=customed["column"];if(ef_c==null){var edit_type=(customed["editor"]!=null)?customed["editor"]:eicol.editor;switch(edit_type){case"text":ef_c=new efTextColumn();break;case"date":ef_c=new efDateColumn();break;case"combo":ef_c=new efComboColumn();break;case"subgrid":ef_c=new efSubgridColumn();break;case"textarea":ef_c=new efTextareaColumn();break;case"newwindow":ef_c=new efNewwindowColumn();break;case"popup":ef_c=new efPopupColumn();break;case"multiselect":ef_c=new efMultiselectColumn();break;default:ef_c=new efTextColumn();break;}}
var pk=(customed["primaryKey"]!=null)?customed["primaryKey"]:eicol.primaryKey;if(pk){ef_c.columnType=1;customed["visible"]=true;customed["displayType"]="hyperlink";}
var sort=customed["sort"];ef_c.sortType=(sort!==undefined)?(sort?"":"-"):(pk?"":"-");ef_c.setEiMeta(customed,eicol);ef_c.prepareData(eiinfo);return ef_c;}

efColumnGroup=function(){this.init();}
efColumnGroup.prototype.init=function(){this.columnType=0;}
efColumnGroup.prototype.getColumnType=function(){return this.columnType;}
efColumnGroup.prototype.getWidth=function(){var w=this.customSetting["width"];if(!isAvailable(w))
w=this.eiColumn.width;if(!isAvailable(w)||w<=0){w=COLUMN_CONSTANT["defaultWidth"];this.setWidth(w);}
return w;}
efColumnGroup.prototype.set=function(n,v)
{var attr=this.customSetting["attr"];if(!isAvailable(attr)){attr=new Object();this.customSetting["attr"]=attr;}
if(n==="attr"){for(var key in v)
attr[key]=v[key];return;}
if(isAvailable(CUSTOM_ATTR_NAME[n])){attr[n]=v;return;}
this.customSetting[n]=v;}
efColumnGroup.prototype.setWidth=function(w){this.set("width",eval(w));}
efColumnGroup.prototype.getHeight=function()
{var h=this.customSetting["height"];if(!isAvailable(h))
h=this.eiColumn.height;if(!isAvailable(h)||h<=0){h=COLUMN_CONSTANT["defaultHeight"];this.setHeight(h);}
return eval(h);}
efColumnGroup.prototype.setHeight=function(h){this.set("height",eval(h));}
efColumnGroup.prototype.getAlign=function(){return this.customSetting["align"]!=null?this.customSetting["align"]:this.eiColumn.align;}
efColumnGroup.prototype.getEname=function(){return this.eiColumn.name;}
efColumnGroup.prototype.getCname=function(){return this.customSetting["descName"]!=null?this.customSetting["descName"]:this.eiColumn.descName;}
efColumnGroup.prototype.isVisible=function(){var v=this.customSetting["visible"]!=null?this.customSetting["visible"]:this.eiColumn.visible;return isAvailable(v)?eval(v):true;}
efColumnGroup.prototype.build=function(customed){if(customed==null)customed=new Object();var pk=(customed["primaryKey"]!=null)?customed["primaryKey"]:false;if(pk=="true"){this.columnType=1;}
this.customSetting=customed;this.pos=customed.pos;}

efformat=function()
{}
efformat.formatFloat=function(value,mask)
{var reg=/%$/;if(reg.exec(mask)=='%')
{return efformat.formatPercent(value,mask);}
return efformat.formatNumber(value,mask);}
efformat.formatPercent=function(value,format)
{if(value==null||!ef_validator_regexes["number"].test(value))return value;var reg=/%$/;var result=0;if(reg.exec(format)=='%')
result=efformat._multiply(value,100);var decNum=efformat.numOfDecFormat(format);result=efformat.decimal(result,decNum);result=result.toString();if(result.indexOf(".")==-1)
{result+=".";for(var i=0;i<decNum;i++)
result+="0";}
return result+"%";}
efformat.numOfDecFormat=function(format)
{var dec_dig=0;var before_dot=true;for(var i=0;i<format.length;i++){var c=format.charAt(i);if(c=="#"||c=="0"){if(!before_dot)
dec_dig++;}else{if(c==".")before_dot=false;}}
return dec_dig;}
efformat.decimal=function(num,v)
{var vv=Math.pow(10,v);return Math.round(num*vv)/vv;}
efformat.IsDateFormatter=function(format)
{return(format.indexOf("yy")>-1)||(format.indexOf("MM")>-1)||(format.indexOf("dd")>-1)||(format.indexOf("HH")>-1)||(format.indexOf("mm")>-1)||(format.indexOf("ss")>-1)||(format.indexOf("SSS")>-1);}
efformat.formatDate=function(number,format)
{return efform._dateParseToString(efform._stringParseToDate(number),format);}
efform._stringParseToDate=function(num,rawFormat)
{if(num==undefined)return null;var raw_format="";if(rawFormat)
raw_format=rawFormat;else{if(num.length==14&&ef_validator_regexes["number"].test(num))
raw_format="yyyyMMddhhmmss";else if(num.length==17&&ef_validator_regexes["number"].test(num))
raw_format="yyyyMMddhhmmssSSS";else if(num.length==8&&ef_validator_regexes["number"].test(num))
raw_format="yyyyMMdd";else if(num.length>=8&&num.length<=10)
{if(num.indexOf("-")>0)
raw_format="yyyy-MM-dd";else if(num.indexOf("/")>0)
raw_format="yyyy/MM/dd";}}
if(raw_format==""){return num;}
var date=new Object();var y_index=raw_format.indexOf("yyyy");var M_index=raw_format.indexOf("MM");var d_index=raw_format.indexOf("dd");var h_index=raw_format.indexOf("hh");var m_index=raw_format.indexOf("mm");var s_index=raw_format.indexOf("ss");var ss_index=raw_format.indexOf("SSS");if(y_index>-1)
date["yyyy"]=num.substring(y_index,y_index+4);else
date["yyyy"]="0000";if(M_index>-1)
date["MM"]=num.substring(M_index,M_index+2);else
date["MM"]="00";if(d_index>-1)
date["dd"]=num.substring(d_index,d_index+2);else
date["dd"]="00";if(h_index>-1)
date["hh"]=num.substring(h_index,h_index+2);else
date["hh"]="00";if(m_index>-1)
date["mm"]=num.substring(m_index,m_index+2);else
date["mm"]="00";if(s_index>-1)
date["ss"]=num.substring(s_index,s_index+2);else
date["ss"]="00";if(ss_index>-1)
date["SSS"]=num.substring(ss_index,ss_index+3);else
date["SSS"]="000";return date;}
efform._dateParseToString=function(date,format)
{if(date==undefined||format==undefined)return"";if(typeof date=="string")return date;var y_index=format.indexOf("yyyy");var M_index=format.indexOf("MM");var d_index=format.indexOf("dd");var h_index=format.indexOf("hh");var m_index=format.indexOf("mm");var s_index=format.indexOf("ss");var ss_index=format.indexOf("SSS");var retDateString=new Array();for(var i=0;i<format.length;i++)
{if(format.charAt(i)=="y"&&format.charAt(i+1)=="y"&&format.charAt(i+2)=="y"&&format.charAt(i+3)=="y")
{retDateString.push(date["yyyy"]);i=i+3;}
else if(format.charAt(i)=="M"&&format.charAt(i+1)=="M")
{retDateString.push(date["MM"]);i++;}
else if(format.charAt(i)=="d"&&format.charAt(i+1)=="d")
{retDateString.push(date["dd"]);i++;}
else if(format.charAt(i)=="h"&&format.charAt(i+1)=="h")
{retDateString.push(date["hh"]);i++;}else if(format.charAt(i)=="m"&&format.charAt(i+1)=="m")
{retDateString.push(date["mm"]);i++;}else if(format.charAt(i)=="s"&&format.charAt(i+1)=="s")
{retDateString.push(date["ss"]);i++;}else if(format.charAt(i)=="S"&&format.charAt(i+1)=="S"&&format.charAt(i+2)=="S")
{retDateString.push(date["SSS"]);i=i+2;}else
retDateString.push(format.charAt(i));}
return retDateString.join("");}
efformat.formatNumber=function(number,format)
{var isNegative=(number<0);if(isNegative)number=-number;var arr_f=new Array();var arr_rep_index=new Array();var before_dot=true;var dec_dig=0;for(var i=0;i<format.length;i++){var c=format.charAt(i);if(c=="#"||c=="0"){var len=arr_f.push("");arr_rep_index.push(len-1)
if(!before_dot)dec_dig++;}else{arr_f.push(c);if(c==".")before_dot=false;}}
number=Math.round(number*Math.pow(10,dec_dig)).toString();var j=number.length-1;for(var i=arr_rep_index.length-1;i>-1;i--){if(j>-1){arr_f[arr_rep_index[i]]=number.charAt(j);j--;}else{for(var k=arr_rep_index[0];k<=arr_rep_index[i]+1;k++){if(arr_f[k]==",")arr_f[k]="";}
break;}}
if(j>-1){var mixValue=new Array();if(isNegative)mixValue.push("-");mixValue.push(number.substring(0,j+1));mixValue.push(arr_f[arr_rep_index[0]]);arr_f[arr_rep_index[0]]=mixValue.join("");}
var count=0;for(i=arr_f.length-1;count<dec_dig;count++,i--)
{if(arr_f[i]=="")
arr_f[i]="0";}
var retv=arr_f.join("");if(retv.charAt(0)==".")retv="0"+retv;if(isNegative)retv="-"+retv;return retv;}
efformat._formatInput=function(element1)
{var value=element1.value;if(value==undefined||value=="")return"";var format_str=element1.formatter;var dateFormat_str=element1.dateFormat;if(format_str!=null&&format_str!=""){var validator=ef_validator_regexes["number"];if(validator.test(value))
return efformat.formatFloat(value,format_str);}else if(dateFormat_str!=null&&dateFormat_str!=""){return efformat.formatDate(value,dateFormat_str);}
return value;}
efformat._changeStatus=function(element1,element2,needFormat)
{element1.style.display="none";element2.style.display="block";if(needFormat)
element2.value=efformat._formatInput(element1);else
element2.focus();}
efformat.initFormatDiv=function(inputId,format_str,dateFormat_str)
{var element=document.getElementById(inputId);element.style.display="none";element.formatter=format_str;element.dateFormat=dateFormat_str;var format_input=document.getElementById(inputId+"_formatInput");if(!element.readOnly)format_input.onclick=function(){efformat._changeStatus(format_input,element,false)};if(!element.readOnly)element.onblur=function(){efformat._changeStatus(element,format_input,true)};element.onpropertychange=function(){format_input.value=efformat._formatInput(element);};format_input.readOnly=true;if(!element.readOnly)format_input.style.background="#F5F6F8";format_input.value=efformat._formatInput(element);format_input.className="inputField";}
efformat._basicFormat=function(value,mask,action,param)
{var xmlDoc;var xslDoc;var v='<formats><format><value>'+value+'</value><mask>'+mask
+'</mask></format></formats>';xmlDoc=efformat._parseXML(v);var x;if(isIE)
x='<xsl:stylesheet xmlns:xsl="uri:xsl">'
else
x='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">';x+='<xsl:template match="/">';if(isIE)
{x+='<xsl:eval>'+action+'('+value+',"'+mask+'"';if(param)x+=','+param;x+=')</xsl:eval>';}
else
x+='<xsl:value-of select="format-number('+value+',\''+mask+'\')" />';x+='</xsl:template></xsl:stylesheet>';xslDoc=efformat._parseXML(x);var s;if(isIE)
s=xmlDoc.transformNode(xslDoc)
else
{var processor=new XSLTProcessor();processor.importStylesheet(xslDoc);var result=processor.transformToFragment(xmlDoc,xmlDoc);var xmls=new XMLSerializer();s=xmls.serializeToString(result);}
return s;}
efformat._multiply=function(arg1,arg2)
{arg1=String(arg1);var i=arg1.length-arg1.indexOf(".")-1;i=(i>=arg1.length)?0:i;arg2=String(arg2);var j=arg2.length-arg2.indexOf(".")-1;j=(j>=arg2.length)?0:j;return arg1.replace(".","")*arg2.replace(".","")/Math.pow(10,i+j);}
efformat._getXMLDOM=function()
{if(null==efformat._XMLDOM)
efformat._XMLDOM=new ActiveXObject("Microsoft.XMLDOM");return efformat._XMLDOM;}
efformat._XMLDOM=null;efformat._parseXML=function(st)
{var result;if(isIE)
{result=efformat._getXMLDOM();result.loadXML(st);}
else
{var parser=new DOMParser();result=parser.parseFromString(st,"text/xml");}
return result;}

var TYPE_FIX=1;var TYPE_DATA=0;var LIMIT_ALL=-999999;var STYLE_CONSTANT={OPERTATION_BAR:"operationBar",NAVIGATION_BAR:"navigationBar",TOOL_BAR:"toolBar",SORTABLE:"sortable",SHOW_COUNT:"showCount",INIT_SELECT:"initSelect",KEY_EVENT:"keyEvent",CHECK_NEWLINE:"checkNewLine",PERSONAL_BAR:"personalBar",MODELXLS_BAR:"modelXlsBar"}
function efgrid(id,paint_id){this.blockId=id;this.gridId=paint_id;this.init();efform.addGrid(this);}
efgrid.getFuncDiv=function(grid_node){var gridId=grid_node.parentNode.id;var lFuncDivId=gridId+EF_SPLIT+"lfunc_div";var funcDivId=gridId+EF_SPLIT+"func_div";if(!!ef.get(funcDivId))
return ef.get(funcDivId);else
return ef.get(lFuncDivId);}
efgrid.getCornerDiv=function(grid_node){return grid_node.rows[1].cells[0].firstChild;}
efgrid.getFixDiv=function(grid_node){var gridId=grid_node.parentNode.id;var fixDivId=gridId+EF_SPLIT+"fix_div";return ef.getNodeById(fixDivId);}
efgrid.getHeadDiv=function(grid_node){var gridId=grid_node.parentNode.id;var headDivId=gridId+EF_SPLIT+"head_div";return ef.getNodeById(headDivId);}
efgrid.getDataDiv=function(grid_node){var gridId=grid_node.parentNode.id;var grid=efgrid.getGridObject(gridId);var dataDivId=gridId+EF_SPLIT+"data_div";return ef.getNodeById(dataDivId);}
efgrid._saveOldCell=function(old_node,grid){var old_row_index=old_node.parentNode.parentNode.rowIndex;var old_col_index=old_node.parentNode.cellIndex;var col_obj=grid.getColumn(old_col_index,grid.cellOriginNodeType);var cell_value=col_obj.getEditNodeValue(old_node.firstChild);efgrid.setCurrentValue(old_node,cell_value,(cell_value!=grid.cellOriginNodeValue));cell_value=grid.getCellValue(old_row_index,old_col_index,grid.cellOriginNodeType);var parent_node=old_node.parentNode;parent_node.innerHtml="";parent_node.removeChild(old_node);parent_node.appendChild(col_obj.genCellDisplayNode(cell_value,grid.gridId,old_row_index,old_col_index));grid.cellOriginEditNode=null;grid.cellOriginNodeValue="";}
efgrid._setEditNodeEvent=function(div_node){var edit_node=div_node.firstChild;if(edit_node){if(edit_node.tagName=="SELECT"){var selectedIndex=eval(edit_node.selectedIndex);edit_node.selectedIndex=(selectedIndex<0)?0:selectedIndex;if(isIE)
window.setTimeout(function(){edit_node.focus()},10);}
if(!edit_node.onkeydown)
edit_node.onkeydown=efgrid.cellChange;if(!edit_node.onchange)
edit_node.onchange=efgrid.cellChange;if(!edit_node.disabled&&edit_node.style.display!="none"){edit_node.focus();if(isAvailable(edit_node.select))
edit_node.select();}}}
efgrid._genEditNode=function(grid,div_node,data_type){if(!grid.isEnable()||grid.isReadonly())
return;var row_index=div_node.parentNode.parentNode.rowIndex;var col_index=div_node.parentNode.cellIndex;var newline=grid.isNewLine(row_index);if(data_type==TYPE_FIX&&!newline)
return;if(typeof efgrid_onBeforeCellEditNodeDisplay=="function"){try{if(efgrid_onBeforeCellEditNodeDisplay(grid.gridId,row_index,col_index,data_type)==false)
return;}catch(ex){efgrid.processException(ex,"Callback to efgrid_onBeforeCellEditNodeDisplay failed");}}
var column=grid.getColumn(col_index,data_type);div_node=grid.getCellDivNode(row_index,col_index,data_type);div_node=column.getEditNode(div_node,newline);if(!div_node)
return null;if(typeof efgrid_onCellEditNodeDisplayReady=="function"){try{var cell_value=grid.getCellValue(row_index,col_index,data_type);efgrid_onCellEditNodeDisplayReady(grid.gridId,row_index,col_index,cell_value,data_type,div_node);}catch(exception){efgrid.processException(exception);}}
div_node=grid.getCellDivNode(row_index,col_index,data_type);efgrid._setEditNodeEvent(div_node);grid.cellOriginEditNode=div_node;grid.cellOriginNodeType=data_type;grid.cellOriginNodeValue=grid.getCellValue(row_index,col_index,data_type);}
efgrid.cellClick=function(data_type,event,dbclick){var div_node=event.srcElement||event.target;if(div_node.tagName=="A")
div_node=div_node.parentNode;if(div_node.tagName!="DIV")
return;var grid_node=efgrid.getEfGridNode(div_node);var grid=grid_node.efgrid;if(!grid)
return;var not_cell=(div_node.getAttribute("efVal")==null);var row_index=0,col_index=0;if(!not_cell){row_index=div_node.parentNode.parentNode.rowIndex;col_index=div_node.parentNode.cellIndex;}
var old_node=grid.cellOriginEditNode;if((old_node)&&(old_node==div_node))
return;if(old_node)
efgrid._saveOldCell(old_node,grid);if(not_cell)
return;var table_node=grid.getGridTableNode();var fixDiv=efgrid.getFixDiv(table_node);var fixTable=fixDiv.firstChild;var dataDiv=efgrid.getDataDiv(table_node);var dataTable=dataDiv.firstChild;div_node=(data_type==TYPE_FIX)?fixTable.rows[row_index].childNodes[col_index].firstChild:dataTable.rows[row_index].childNodes[col_index].firstChild;if(!grid.isRowChecked(row_index)){grid.setCurrentRowIndex(row_index,dbclick);if(TYPE_DATA==0&&grid.getColumn(col_index,TYPE_DATA)!=undefined&&grid.getColumn(col_index,TYPE_DATA).customSetting.editor=="textarea"){var component=grid.getCellDivNode(row_index,col_index,TYPE_DATA);var div_node=efform.getSubGridDiv();var show_value=component.innerHTML;var index=show_value.indexOf(EF_CR_IDENTIFIER);while(index!=-1){show_value=show_value.substring(0,index)+"\r\n"
+show_value.substring(index+2);index=show_value.indexOf(EF_CR_IDENTIFIER);}
var inner_html=[];inner_html.push("<TABLE cellspacing='0' cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;"
+getI18nMessages("ef.GridDetail","详情")+"&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"
+efico.get('efcalendar.closeImg')
+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();' ><TD colspan=2>");inner_html.push("<textarea wrap=\"hard\" rows=8 cols=30 id=\"subwindow_textarea\" >"
+show_value+"</textarea>");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join("");efwindow.show(component,div_node.id);}}else
efgrid._genEditNode(grid,div_node,data_type);}
efgrid.cellChange=function(e){var event=window.event||e;var tag_node=event.srcElement||event.target;var div_node=tag_node;if(div_node.tagName=="INPUT"||div_node.tagName=="input")
div_node=div_node.parentNode;if(div_node.tagName=="SELECT"||div_node.tagName=="select")
div_node=div_node.parentNode;if(div_node.tagName!="DIV")
return;var col_index=div_node.parentNode.cellIndex;var row_index=div_node.parentNode.parentNode.rowIndex;var grid_node=efgrid.getEfGridNode(tag_node);if(!grid_node)
return;var grid=grid_node.efgrid;if(!grid)
return;var old_node=grid.cellOriginEditNode;if(!((old_node)&&(old_node==div_node)))
return;var switched=efgrid._cellKeydown(grid,row_index,col_index,event);if(switched)
return false;var div_cell_column=grid.getColumn(col_index,grid.cellOriginNodeType);var cell_value=div_cell_column.getEditNodeValue(tag_node);efgrid.setCurrentValue(grid.cellOriginEditNode,cell_value);}
efgrid._getSelectedGridData=function(grid_node){var inner_html=[];var grid=grid_node.efgrid;var blockId=grid.blockId;var metas=grid.getBlockData().getBlockMeta().getMetas();for(var i=0,k=0;i<grid.getRowCount();i++){if(!grid.isRowChecked(i))
continue;for(var key in metas){var column_name=metas[key].name;var param_name=blockId+EF_FORMDATA_SPLIT+k
+EF_FORMDATA_SPLIT+column_name;var cell_value=efutils.trimString(grid.getBlockData().getCell(i,column_name));cell_value=(cell_value=="")?((grid.supportNull)?"":" "):cell_value.replace(/'/g,"&#39;");var str_trmp="<INPUT type='hidden' "+"value='"+cell_value
+"' "+"name = '"+param_name+"'>";inner_html.push(str_trmp);}
k++;}
return inner_html.join('');}
efgrid._getSelectedData=function(id_in,include_selected_data){var ef_div_submit=document.createElement("div");ef_div_submit.id=id_in+"_submit";var in_node=document.getElementById(id_in);var grid_node=in_node.firstChild;ef_div_submit.innerHTML+=efgrid._getGridMetadata(grid_node);if(include_selected_data){ef_div_submit.innerHTML+=efgrid._getSelectedGridData(grid_node);}
return ef_div_submit;}
efgrid._getGridMetadata=function(grid_node){var inner_html=[];var grid_obj=grid_node.efgrid;var blockId=grid_obj.blockId;var str_trmp="<INPUT type='hidden' value='"+grid_obj.getOffset()+"' "
+"name = '"+blockId+EF_FORMDATA_SPLIT+"offset'>";inner_html.push(str_trmp);str_trmp="<INPUT type='hidden' "+"value='-1' "+"name = '"+blockId
+EF_FORMDATA_SPLIT+"count'>";inner_html.push(str_trmp);str_trmp="<INPUT type='hidden' "+"value='"+grid_obj.getShowCount()
+"' "+"name = '"+blockId+EF_FORMDATA_SPLIT+"showCount'>";inner_html.push(str_trmp);str_trmp="<INPUT type='hidden' "+"value='"+grid_obj.getLimit()+"' "
+"name = '"+blockId+EF_FORMDATA_SPLIT+"limit'>";inner_html.push(str_trmp);str_trmp="<INPUT type='hidden' "+"value='"+grid_obj.getOrderBy()
+"' "+"name = '"+blockId+EF_FORMDATA_SPLIT+"orderBy'>";inner_html.push(str_trmp);return inner_html.join("");}
efgrid.getEfGridNode=function(in_node){var node_now=in_node;while(node_now.tagName!="TABLE"){if(node_now.parentNode==null){node_now=null;break;}else{node_now=node_now.parentNode;}}
if(node_now==null)
return null;var in_id=node_now.id;var pos_at=in_id.indexOf(EF_SPLIT);if(pos_at>0)
in_id=in_id.substring(0,pos_at);return document.getElementById(in_id+EF_SPLIT+"grid_table");}
efgrid.getRowIndex=function(inTr){if(inTr.rowIndex&&inTr.rowIndex>=0)
return inTr.rowIndex;var rows=inTr.parentNode.childNodes;for(var i=0,l=rows.length;i<l;i++){if(inTr==rows[i])
return i;}
return-1;}
efgrid.findEventCell=function(inTarget){if(!inTarget)
return null;if(inTarget.tagName=='TABLE')
return null;while(inTarget.tagName!='TD'&&inTarget.parentNode)
inTarget=inTarget.parentNode;if((inTarget.tagName=='TD')){var ef_grid_main_table=inTarget.getAttribute("efGridTopTable");if(ef_grid_main_table==null)
return inTarget;}
return null;}
efgrid.getGridObject=function(grid_id){return efform.getGrid(grid_id);}
efgrid.setCurrentValue=function(div_node,cell_value,invoke_callback){cell_value=efutils.trimString(cell_value);var index=cell_value.indexOf(EF_CR_IDENTIFIER);while(index!=-1){cell_value=cell_value.substring(0,index)+"\r\n"
+cell_value.substring(index+2);index=cell_value.indexOf(EF_CR_IDENTIFIER);}
var grid_node=efgrid.getEfGridNode(div_node);var grid=grid_node.efgrid;if(!grid)
return;var row_index=div_node.parentNode.parentNode.rowIndex;var col_index=div_node.parentNode.cellIndex;grid.setCellValue(row_index,col_index,cell_value,grid.cellOriginNodeType);if(!invoke_callback)
return;try{if(grid.cellOriginNodeType==TYPE_FIX){if(typeof efgrid_onFixCellSaved=="function")
efgrid_onFixCellSaved(grid.gridId,row_index,col_index,cell_value);}else{if(typeof efgrid_onDataCellSaved=="function")
efgrid_onDataCellSaved(grid.gridId,row_index,col_index,cell_value);}}catch(ex){var callback=(grid.cellOriginNodeType==TYPE_FIX)?"onFixCellSaved":"onDataCellSaved";efgrid.processException(ex,"Callback to efgrid_"+callback
+" failed");}}
efgrid.setReturnValue=function(edit_node,cell_value,cell_label){edit_node.value=cell_value;var div_node=edit_node.parentNode;if(div_node.tagName!="DIV"&&div_node.tagName!="div")
return;efgrid.setCurrentValue(div_node,cell_value);}
efgrid.setCellValue=function(edit_node_id,cell_value,cell_label){var edit_node=document.getElementById(edit_node_id);efgrid.setReturnValue(edit_node,cell_value,cell_label);}
efgrid.submitForm=function(id_in,package_name,service_name,method_name,include_selected_data,check,need_callback){if(!isAvailable(check))
check=false;var grid=efform.getGrid(id_in);var selcount=grid.getCheckedRowCount();if(selcount<=0&&check){if(!confirm(getI18nMessages(EF_MSG["SUBMIT_CONFIRM"],"未选中任何记录，确定要提交吗？")))
return;}
var grid_ids=[];grid_ids.push(id_in);efgrid._submitFormData(grid_ids,package_name,service_name,method_name,include_selected_data,include_selected_data,true,need_callback);}
efgrid.submitInqu=function(id_in,package_name,service_name,method_name){var grid=efform.getGrid(id_in);grid.setOffset(0);efgrid.submitInquWithMeta(id_in,package_name,service_name,method_name);}
efgrid.submitInquWithMeta=function(id_in,package_name,service_name,method_name){efform.clearErrorMessage();var grid_ids=[];grid_ids.push(id_in);efgrid._submitFormData(grid_ids,package_name,service_name,method_name,false,true,false,false);}
efgrid.submitAllGridsData=function(package_name,service_name,method_name){var grid_ids=efform.getAllGridIDs();efgrid._submitFormData(grid_ids,package_name,service_name,method_name,true,true,true);}
efgrid.submitGridsData=function(grid_ids,package_name,service_name,method_name){efgrid._submitFormData(grid_ids,package_name,service_name,method_name,true,true,true);}
efgrid._addSelectedData=function(block,grid){var blockData=grid.getBlockData();var colCount=grid.getColCount(TYPE_DATA)+grid.getColCount(TYPE_FIX)
+grid.getInvisibleColCount();for(var i=0;i<grid.getRowCount();i++){if(grid.isRowChecked(i)){var row=blockData.getRows()[i];for(var j=0;j<row.length;j++){row[j]=efutils.trimString(row[j]);if(row[j]=="")
row[j]=(grid.supportNull)?"":" ";}
block.addRow(row);}}}
efgrid._submitFormData=function(grid_ids,package_name,service_name,method_name,include_selected_data,include_metadata,need_validate,need_callback){if(!isAvailable(need_callback))
need_callback=true;if(!isAvailable(grid_ids)||!(grid_ids instanceof Array)){alert("Invalid grid id array");return;}
if(need_validate){for(var i=0;i<grid_ids.length;i++){var grid=efform.getGrid(grid_ids[i]);var message=grid.validateAll();if(message!=null&&message!=""){efform.setErrorStyle(grid.getGridTableNode(),message,false);EFAlert(message);return;}}}
var submit_data=true;if(need_callback&&typeof efgrid_onGridSubmit=="function"){try{submit_data=efgrid_onGridSubmit();}catch(ex){efgrid.processException(ex,"Callback to efgrid_onGridSubmit failed");}}
if(submit_data===false){return;}
if(grid_ids.length==1&&efform.getGrid(grid_ids[0]).ajax){var grid=efform.getGrid(grid_ids[0]);if(grid.cellOriginEditNode!=null)
efgrid._saveOldCell(grid.cellOriginEditNode,grid);var info=new EiInfo();info.setByNodeObject(document.forms[0]);var block=info.getBlock(grid.blockId);if(!isAvailable(block)){block=new EiBlock(grid.getBlockData().getBlockMeta());info.addBlock(block);}
block.setAttr(grid.getBlockData().getAttr());block.set("orderBy",grid.getOrderBy());if(include_selected_data){efgrid._addSelectedData(block,grid);}
if(!isAvailable(service_name))
service_name=grid.serviceName;if(!isAvailable(method_name))
method_name=grid.queryMethod;if(typeof grid.onGridSubmit=="function"){try{grid.onGridSubmit(info);}catch(ex){efgrid.processException(ex,"Callback to onGridSubmit failed");}}
EiCommunicator.send(service_name,method_name,info,{onSuccess:function(eiInfo){if(typeof efgrid_onAjaxSubmitSuccess=="function"){try{efgrid_onAjaxSubmitSuccess(grid.gridId,service_name,method_name,eiInfo);}catch(ex){efgrid.processException(ex,"Callback to efgrid_onAjaxSubmitSuccess failed");}}else{var ef_grid=efform.getGrid(grid_ids[0]);ef_grid.refresh(eiInfo);}},onFail:function(eMsg){alert("Error occured on call service: "+eMsg);}});}else{if(isAvailable(package_name))
ef.get("packageName").value=package_name;if(isAvailable(service_name))
ef.get("serviceName").value=service_name;if(isAvailable(method_name))
ef.get("methodName").value=method_name;if(include_metadata){for(var i=0;i<grid_ids.length;i++){var grid=efform.getGrid(grid_ids[i]);if(grid.cellOriginEditNode!=null)
efgrid._saveOldCell(grid.cellOriginEditNode,grid);var ef_div_submit=efgrid._getSelectedData(grid_ids[i],include_selected_data);var in_div=document.getElementById(grid_ids[i]);if(!ef.get(grid_ids[i]+"_submit"))
in_div.appendChild(ef_div_submit);}}
efform.submit(document.forms[0]);}}
efgrid.setRowDisplayStyle=function(grid_id,row_index,style_classname){var grid=efform.getGrid(grid_id);if(row_index<0||row_index>=grid.getRowCount())
return;grid._rowStyle[row_index]=style_classname;var table_node=grid.getGridTableNode();efgrid.divData.setRowStyle(table_node,row_index,style_classname);}
efgrid.setDisplayStyle=function(grid_id,row_index,col_index,style_name,style_value,column_type){if(TYPE_FIX!=column_type)
column_type=TYPE_DATA;var index=(column_type==TYPE_FIX)?0:1;var grid=efform.getGrid(grid_id);switch(grid.toolBarPosition){case"bottom":var cell_table=grid.getGridTableNode().rows[1].cells[index].lastChild;break;case"top":var cell_table=grid.getGridTableNode().rows[2].cells[index].lastChild;break;case"both":break;}
var cell_node=cell_table.firstChild.firstChild.childNodes[row_index].childNodes[col_index];if(cell_node)
cell_node.firstChild.style[style_name]=style_value;else
ef.debug("["+new Date().getTime()+"] Grid cell["+row_index+","
+col_index+"] not found!");}
efgrid._cellKeydown=function(grid,row_index,col_index,event){if(grid.getStyleSetting(STYLE_CONSTANT["KEY_EVENT"])==="false")
return false;switch(event.keyCode){case 9:var direct=event.shiftKey?1:2;return efgrid._shiftCell(grid,row_index,col_index,direct);case 10:case 13:var direct=event.ctrlKey?(event.shiftKey?4:8):(event.shiftKey?1:2);return efgrid._shiftCell(grid,row_index,col_index,direct);case 38:if(grid.getColumn(col_index,grid.cellOriginNodeType)instanceof efComboColumn)
return false;return efgrid._shiftCell(grid,row_index,col_index,4);case 40:if(grid.getColumn(col_index,grid.cellOriginNodeType)instanceof efComboColumn)
return false;return efgrid._shiftCell(grid,row_index,col_index,8);default:return false;}}
efgrid._shiftCellNode=function(grid,row_index,col_index,direct,col_type,next_dir){if(col_type==undefined)
col_type=grid.cellOriginNodeType;else
grid.cellOriginNodeType=col_type;var table_node=grid.getGridTableNode();var table_div=(col_type==TYPE_DATA)?efgrid.getDataDiv(table_node):efgrid.getFixDiv(table_node);var table=table_div.firstChild;while(true){if(direct<4){col_index+=(direct==1)?-1:1;if(col_index<0){if(col_type==TYPE_DATA){return efgrid._shiftCellNode(grid,row_index,grid.getColCount(TYPE_FIX),direct,TYPE_FIX);}else{return efgrid._shiftCellNode(grid,row_index,grid.getColCount(TYPE_DATA)
-1,4,TYPE_DATA,1);}}else if(col_index>grid.getColCount(col_type)-1){if(col_type==TYPE_FIX){return efgrid._shiftCellNode(grid,row_index,-1,direct,TYPE_DATA);}else{return efgrid._shiftCellNode(grid,row_index,0,8,TYPE_FIX,2);}}
var column=grid.getColumn(col_index,col_type);var isCheckCol=(!col_index&&(col_type==TYPE_FIX)&&(column.getDisplayType()=="checkbox"));if(column.isEnable()&&!isCheckCol&&(grid.isNewLine(row_index)||(col_type!=TYPE_FIX&&!column.isReadonly()))){return(table.rows[row_index].childNodes[col_index].firstChild);}}else{row_index+=(direct==4)?-1:1;if(row_index<0){if(col_index==0){col_type=!col_type+0;col_index=grid.getColCount(col_type);}
return efgrid._shiftCellNode(grid,grid.getRowCount(),col_index-1,direct,col_type);}else if(row_index>grid.getRowCount()-1){if(col_index==grid.getColCount(col_type)-1){col_type=!col_type+0;col_index=-1;}
return efgrid._shiftCellNode(grid,-1,col_index+1,direct,col_type);}
if(grid.isRowChecked(row_index)){var column=grid.getColumn(col_index,col_type);var isCheckCol=(!col_index&&(col_type==TYPE_FIX)&&(column.getDisplayType()=="checkbox"));if(column.isEnable()&&!isCheckCol&&(grid.isNewLine(row_index)||(col_type!=TYPE_FIX&&!column.isReadonly()))){return table.rows[row_index].childNodes[col_index].firstChild;}else{return efgrid._shiftCellNode(grid,row_index,col_index,next_dir||direct,col_type);}}}}}
efgrid._shiftCell=function(grid,row_index,col_index,direct){if(isAvailable(grid.cellOriginEditNode))
efgrid._saveOldCell(grid.cellOriginEditNode,grid);var div_node=efgrid._shiftCellNode(grid,row_index,col_index,direct);if(div_node!=null){efgrid._genEditNode(grid,div_node,grid.cellOriginNodeType);return true;}
return false;}
efgrid.exportToModleXLS=function(grid_id){if(typeof efgrid_onExport_modleXls=="function"){try{efgrid_onExport_modleXls(grid_id);}catch(ex){efgrid.processException(ex,"Callback to efgrid_onBeforeCellEditNodeDisplay failed");}}}
efgrid.exportToXLS=function(grid_id){var grid=efgrid.getGridObject(grid_id);grid.exportData("xls");}
efgrid.exportToPDF=function(grid_id){var grid=efgrid.getGridObject(grid_id);grid.exportData("pdf");}
efgrid.processException=function(ex,msg){var msg=(msg?msg:"Exception occurred")+": "+ex.message;ef.debug("["+new Date().getTime()+"] "+msg);alert(msg);}
efgrid.addGridsSelectedData=function(grid_ids,info){if(!isAvailable(grid_ids)||!(grid_ids instanceof Array)){alert("Invalid grid id array");return;}
for(var i=0;i<grid_ids.length;i++){var grid=efform.getGrid(grid_ids[i]);var block=info.getBlock(grid.blockId);if(!isAvailable(block)){block=new EiBlock(grid.getBlockData().getBlockMeta());info.addBlock(block);}
block.setAttr(grid.getBlockData().getAttr());block.set("orderBy",grid.getOrderBy());efgrid._addSelectedData(block,grid);}}

efgrid.divCorner=function(){}
efgrid.divCorner.paintHead=function(efGridIn,paintId,widthNow,columnCount,gridColumn,fixCol){var col_count=columnCount*2;var headTable="<TABLE class='tableColumn' id='"
+efGridIn.gridId+EF_SPLIT+paintId+"' "
+"cellspacing = 0 cellpadding = 0 style='table-layout:fixed; height:"+(efGridIn.hasColumnGroups?2*efGridIn.rowHeight:efGridIn.rowHeight)+"px' "+(efGridIn.hasColumnGroups?"":("cols="+col_count))+">";var inner_html_td="";var add_html_td="";var firsr_html_td="";if(efGridIn.hasColumnGroups){var rawColumnGroups=[];if(!fixCol)
rawColumnGroups=efGridIn.dataColumnGroups;else
rawColumnGroups=efGridIn.fixColumnGroups;var groupColumns=[];for(var i=0;i<rawColumnGroups.length;i++){groupColumns[i]=rawColumnGroups[i].customSetting.columnIds.split(",")}
var div_w=2;var cusor_1=0;for(var k=0;k<columnCount;k++){var cell_first="";var cell_a="";var cell_b="";if(groupColumns.length>cusor_1&&groupColumns[cusor_1][0]==gridColumn[k].getEname()){var addCellWidth=0;var colSpan=groupColumns[cusor_1].length*2-1;for(var j=0;j<groupColumns[cusor_1].length;j++){cell_first+="<td style='width:"+(gridColumn[k].getWidth()-1)+"px'></td><td  style ='width:"+div_w+"px' ></td>";addCellWidth+=gridColumn[k].getWidth()-1;cell_b+="<td headSplit='0' style='border-style:solid;border-width:1px 0px;border-color:white;width:"+(gridColumn[k].getWidth()-1)+"px'"+" tdIndex='"+k+"' >"
+gridColumn[k].getHeaderHTML(efGridIn.readonly,efGridIn.enableColumnSetter)+"</td>";if(j<groupColumns[cusor_1].length-1){cell_b+="<td headSplit='1' tdIndex='"+k+"' style='width:"+div_w+"px' "+(!fixCol?" style='cursor:e-resize;background:white' >":">")+"<IMG  SRC='"+efico.get("efgrid.gridBlueDivider")+"' ></td>";addCellWidth+=div_w;k++;}}
cell_a+="<td headSplit='0' colspan='"
+colSpan+"' tdIndex='"+k+"' style='width:"+addCellWidth+"px' ><div align='center' >"
+rawColumnGroups[cusor_1].customSetting.descName+"</div></td>";cell_a+="<td headSplit='1' rowSpan='2' tdIndex='"+k+"' style='width:"
+div_w+"px' "+(!fixCol?" style='cursor:e-resize;background:white'>":">")
+"<IMG  SRC='"+efico.get("efgrid.gridBlueDivider2")+"' ></td>";cusor_1++;}
else{cell_a+="<td headSplit='0' rowspan='2' tdIndex='"+k+"' style='width:"
+(gridColumn[k].getWidth()-1)+"px' >"+gridColumn[k].getHeaderHTML(efGridIn.readonly,efGridIn.enableColumnSetter)+"</td>";cell_a+="<td headSplit='1' rowspan='2' tdIndex='"+k+"' style='width:"
+div_w+"px; "+(!fixCol?"cursor:e-resize;background:white'>":"'>")
+"<IMG SRC='"+efico.get("efgrid.gridBlueDivider2")+"' ></td>";cell_first+="<td style='width:"+(gridColumn[k].getWidth()-1)+"px' ></td><td   style ='width:"+div_w+"px' ></td>";}
firsr_html_td+=cell_first;add_html_td+=cell_a;inner_html_td+=cell_b;}
if(!fixCol){firsr_html_td+="<td style='width:18px' /><td />";add_html_td+="<td  style='width:18px' rowspan='2' >&nbsp;</td><td rowspan='2' >&nbsp;</td>";}
headTable+="<TR style='height:0px'>"+firsr_html_td+"</TR>"+"<TR >"+add_html_td+"</TR>"+"<TR >"+inner_html_td+"</TR></TABLE>";}
else{for(var k=0;k<columnCount;k++){var div_w=2;var cell_i="";cell_i+="<td headSplit='0' style= 'width:"+(gridColumn[k].getWidth()-1)+"px'>"+gridColumn[k].getHeaderHTML(efGridIn.readonly,efGridIn.enableColumnSetter)+"</td>";cell_i+="<td headSplit='1' style= 'width:"+div_w+"px;"+(!fixCol?" cursor:e-resize; '>":"'>")+"<IMG  SRC='"+efico.get("efgrid.gridBlueDivider")+"' ></td>";inner_html_td+=cell_i;}
headTable+="<TR class=tableColumnHeadings>";headTable+=inner_html_td;if(!fixCol)
headTable+="<td style='width:18px' >&nbsp;</td><td style='width:100%'>&nbsp;</td>";headTable+="</TR></TABLE>";}
return headTable;};efgrid.divCorner.buildCornerDiv=function(grid){ef.debug("["+new Date().getTime().toString()+"]build row 1-1(Fix Head) start.");var headTableHtml=efgrid.divCorner.paintHead(grid,"corner_table",grid.leftWidth,grid.getColCount(TYPE_FIX),grid.getColumns(TYPE_FIX),true);var cornerDivHtml="<div style='width:"+grid.leftWidth+";height:"+(this.hasColumnGroups?2*this.rowHeight:this.rowHeight)+"'"+" id="+grid.gridId+EF_SPLIT+"corner_div onclick='efgrid.divCorner.onclick(event)'>"+
headTableHtml+"</div>";ef.debug("["+new Date().getTime().toString()+"]build row 1-1(Fix Head) finish.");return cornerDivHtml;}
efgrid.divCorner.onclick=function(event){var srcElement=event.srcElement||event.target;if(srcElement.tagName!="INPUT"){var grid_node=efgrid.getEfGridNode(srcElement);if(!grid_node)return;var grid=grid_node.efgrid;if(!grid)return;var node_now=srcElement;if(node_now.tagName=="IMG")
node_now=srcElement.parentNode;if(node_now.tagName=="DIV")
node_now=node_now.parentNode;var headSplit=node_now.getAttribute("headSplit");var not_sortable=(grid.getStyleSetting(STYLE_CONSTANT["SORTABLE"])==="false");if(headSplit=="0"&&!not_sortable){var cell_pos=node_now.cellIndex/2;var col=grid.getColumn(cell_pos,TYPE_FIX);efgrid.divHead.sort(grid_node,col);return;}}
var ef_grid_whole_table=efgrid.getEfGridNode(srcElement);var grid=ef_grid_whole_table.efgrid;var cont=true;if(typeof efgrid_onSelectAllClicked=="function"){try{var r=efgrid_onSelectAllClicked(grid.gridId,srcElement.parentNode);if(isAvailable(r))cont=r;}catch(ex){efgrid.processException(ex,"Callback to efgrid_onSelectAllClicked failed");}}
if(cont)
efgrid.divFix.setRowsStatus(ef_grid_whole_table,srcElement.checked);}

efgrid.divData=function(){}
efgrid.divData.buildFixDataDiv=function(grid){var html=[];var col_count=grid.getColCount(TYPE_DATA);ef.debug("["+new Date().getTime().toString()+"]build row 2-2(Data) start.");var data_table_node="<TABLE class='tableColumn' id='"+
grid.gridId+EF_SPLIT+"data_table' hidefocus "+"style='table-layout:fixed;' cellspacing = 1 cellpadding = 1 cols="+
(col_count+1)+">";var fix_table_node="<TABLE class='tableColumn' id='"+
grid.gridId+EF_SPLIT+"fix_table' hidefocus "+"STYLE='table-layout:fixed;' cellspacing = 1 cellpadding = 1>";var inner_html=[];inner_html.push("<div style='overflow:scroll;width:");inner_html.push(grid.rightWidth+"px;height:"+grid.bottomHeight+"px';");inner_html.push(" id="+grid.gridId+EF_SPLIT+"data_div ");inner_html.push(" onscroll='efgrid.divData.onscroll(event)'");inner_html.push(" onclick='efgrid.divData.onclick(event)'");inner_html.push(" ondblclick='efgrid.divData.ondblclick(event)'");inner_html.push(" oncontextmenu = 'efgrid.divData.oncontextmenu(event)'");inner_html.push(" onmouseover='efgrid.divData.onmouseover(event)'");inner_html.push(" onmouseout='efgrid.divData.onmouseout(event)'");inner_html.push(" onmousemove='efgrid.divHead.onmousemove(event)'>");var fix_inner_html=[];fix_inner_html.push("<div style='overflow:scroll;width:");fix_inner_html.push(grid.leftWidth+"px;height:"+grid.bottomHeight+"px;overflowX:scroll;overflowY:hidden;'");fix_inner_html.push(" id="+grid.gridId+EF_SPLIT+"fix_div ");fix_inner_html.push(" onclick='efgrid.divFix.onclick(event)'");fix_inner_html.push(" ondblclick='efgrid.divFix.ondblclick(event)'");fix_inner_html.push(" oncontextmenu = 'efgrid.divFix.oncontextmenu(event)'");fix_inner_html.push(" onmousedown='efgrid.divData.onmousedown(event)' ");fix_inner_html.push(" onmouseup='efgrid.divData.onmouseup(event)' ");fix_inner_html.push(" onmouseover='efgrid.divData.onmouseover(event)'");fix_inner_html.push(" onmouseout='efgrid.divData.onmouseout(event)'>");var blockData=new EiBlock(grid.blockData.meta.blockId);var blockMeta=blockData.meta;grid.displayBlock=blockData;if(grid.showModel==""){fix_inner_html.push(fix_table_node);inner_html.push(data_table_node);var _rowCount=grid.getRowCount();var _colFixCount=grid.getColCount(TYPE_FIX);var _isEnable=grid.isEnable();var _tr="<TR class=rowHighlight>";var c_tr="<TR class='"+efform.getGridCurrentRowStyle()+"'>";for(var i=0;i<_rowCount;i++){var checked_line=((!grid.readonly)&&((grid.rowStatus[i]&2)!=0));var n_tr="<TR class=tableRow"+(i&1)+">";if(checked_line){inner_html.push(_tr);fix_inner_html.push(_tr);}
else if(i==grid.getCurrentRowIndex()){inner_html.push(c_tr);fix_inner_html.push(c_tr);}
else{inner_html.push(n_tr);fix_inner_html.push(n_tr);}
for(var j=0;j<_colFixCount;j++){var column=grid.fixedColumns[j];var col_str="<TD ";col_str+="style ='width:"+column.getWidth()+"px;' ";var fixValue=column.genCellNode(grid.getTFCellValue(i,j),grid.gridId,i,j,_isEnable,checked_line);var pos=column.customSetting.pos;if(typeof(grid.autoDraw)!=undefined&&(grid.autoDraw=="true"||grid.autoDraw=="yes"))
{pos=column.pos;}
if(pos>=0)
{var name=column.customSetting.name;var tempEiColumn=new EiColumn(name+pos);tempEiColumn.descName=column.eiColumn.descName;tempEiColumn.pos=pos;blockMeta.addMeta(tempEiColumn);blockData.setCell(i,column.customSetting.name+pos,column.getFormattedDisplay(grid.getTFCellValue(i,j)));}
col_str+=" >"+
fixValue+"</TD>";fix_inner_html.push(col_str);}
fix_inner_html.push("</TR>");for(var j=0;j<col_count;j++){var column=grid.dataColumns[j];var col_str="<TD nowrap";col_str+=" style='width:"+column.getWidth()+"px' ";var dataValue=column.genCellNode(grid.getTDCellValue(i,j),grid.gridId,i,j,_isEnable);var pos=column.customSetting.pos;if(typeof(grid.autoDraw)!=undefined&&(grid.autoDraw=="true"||grid.autoDraw=="yes")){pos=column.pos;}
if(pos>=0)
{var name=column.customSetting.name;var tempEiColumn=new EiColumn(name+pos);tempEiColumn.descName=column.eiColumn.descName;tempEiColumn.pos=pos;blockMeta.addMeta(tempEiColumn);blockData.setCell(i,column.customSetting.name+pos,column.getFormattedDisplay(grid.getTDCellValue(i,j)));}
col_str+=">"+dataValue+"</TD>";inner_html.push(col_str);}
inner_html.push("<TD width=100%><div>&nbsp;</div></TD></TR>");}
inner_html.push("</TABLE></div>");fix_inner_html.push("</TABLE></div>");html[0]=fix_inner_html.join('');html[1]=inner_html.join('');}else if(grid.showModel=="quickshow"){html[0]=fix_inner_html.join('')+grid.getFixHtml()+"</div>";html[1]=inner_html.join('')+grid.getDataHtml()+"</div>";}
return html;};efgrid.divData.buildGroupDetailDataDiv=function(grid){var html=[];var groupRows=new Array();var col_count=grid.getColCount(TYPE_DATA);var _rowCount=grid.getRowCount();var _colFixCount=grid.getColCount(TYPE_FIX);var _isEnable=grid.isEnable();var _doubleClickString="";if(grid.rowDetailDivID!="")
_doubleClickString="ondblclick='efgrid.onRowDoubleClicked(event)'";var first_data_row_html=[];var first_fix_row_html=[];for(var i=0;i<_rowCount;i++){var row_data_html=[];var row_fix_html=[];var _tr="<TR "+_doubleClickString+" rawRowIndex="+i+" class=rowHighlight>";var c_tr="<TR "+_doubleClickString+" rawRowIndex="+i+" class='"+efform.getGridCurrentRowStyle()+"'>";var cellValue=grid.getCellMappingValueByColumnName(i,grid.groupField);if(groupRows[cellValue+"_fix"]==undefined)
{groupRows[groupRows.length]=cellValue;groupRows[cellValue+"_fix"]=new Array();groupRows[cellValue+"_data"]=new Array();}
var checked_line=((!grid.readonly)&&((grid.rowStatus[i]&2)!=0));var n_tr="<TR "+_doubleClickString+"  rawRowIndex="+i+" class=tableRow"+(i&1)+">";if(checked_line){row_data_html.push(_tr);row_fix_html.push(_tr);}
else if(i==grid.getCurrentRowIndex()){row_data_html.push(c_tr);row_fix_html.push(c_tr);}
else{row_data_html.push(n_tr);row_fix_html.push(n_tr);}
if(i==0)
{if($.browser.msie)
{first_data_row_html.push("<TR style='height:0px'>");first_fix_row_html.push("<TR style='height:0px'>");}
else
{first_data_row_html.push("<TR style='height:0px'>");first_fix_row_html.push("<TR style='height:0px'>");}}
for(var j=0;j<_colFixCount;j++){var column=grid.fixedColumns[j];var col_str="<TD ";col_str+=" style=width:"+column.getWidth()+"px' ";col_str+=" >"+
column.genCellNode(grid.getTFCellValue(i,j),grid.gridId,i,j,_isEnable,checked_line)+"</TD>";row_fix_html.push(col_str);if(i==0)first_fix_row_html.push(col_str);}
row_fix_html.push("<TD width=100%><div>&nbsp;</div></TD></TR>");if(i==0)first_fix_row_html.push("<TD width=100%><div>&nbsp;</div></TD></TR>");for(var j=0;j<col_count;j++){var column=grid.dataColumns[j];var col_str="<TD nowrap";col_str+=" style ='width:"+column.getWidth()+"px' ";col_str+=">"+column.genCellNode(grid.getTDCellValue(i,j),grid.gridId,i,j,_isEnable)+"</TD>";row_data_html.push(col_str);if(i==0)first_data_row_html.push("<TD  style='width:"+column.getWidth()+"px' ><div style='width:"+column.getWidth()+"px'/></TD>");}
row_data_html.push("<TD width=100%><div>&nbsp;</div></TD></TR>");if(i==0)first_data_row_html.push("<TD width=100%><div>&nbsp;</div></TD></TR>");if(grid.rowDetailDivID!="")
{row_fix_html.push("<TR style='display:none;' class='rowDetail' ><TD style='padding-left:12px' colspan='"+_colFixCount+"'></TD></TR>");row_data_html.push("<TR style='display:none' class='rowDetail' ><TD style='padding-left:12px' colspan='"+col_count+"'></TD><TD width=100%><div>&nbsp;</div></TD></TR>");}
groupRows[cellValue+"_fix"][groupRows[cellValue+"_fix"].length]=row_fix_html.join('');groupRows[cellValue+"_data"][groupRows[cellValue+"_data"].length]=row_data_html.join('');}
var div_data_inner_html="<DIV style='overflow:visiable;width:"+
grid.rightWidth+"px;height:"+grid.bottomHeight+"px';"+" id="+grid.gridId+EF_SPLIT+"data_div "+" onscroll='efgrid.divData.onscroll(event)'"+" onclick='efgrid.divData.onclick(event)'"+" ondblclick='efgrid.divData.ondblclick(event)'"+" oncontextmenu = 'efgrid.divData.oncontextmenu(event)'"+" >"+"<TABLE class='tableColumn' id='"+
grid.gridId+EF_SPLIT+"data_table' hidefocus "+"style='table-layout:fixed;' cellspacing = 1 cellpadding = 1 cols="+
(col_count+1)+">";var div_fix_inner_html="<DIV style='overflow:visiable;width:"+
grid.leftWidth+"px;height:"+grid.bottomHeight+"px;overflowX:scroll;overflowY:hidden;'"+" id="+grid.gridId+EF_SPLIT+"fix_div "+" onclick='efgrid.divFix.onclick(event)'"+" ondblclick='efgrid.divFix.ondblclick(event)'"+" oncontextmenu = 'efgrid.divFix.oncontextmenu(event)'"+" onmousedown='efgrid.divData.onmousedown(event)' "+" onmouseup='efgrid.divData.onmouseup(event)' "+">"+"<TABLE class='tableColumn' id='"+
grid.gridId+EF_SPLIT+"fix_table' hidefocus "+"STYLE='table-layout:auto;' cellspacing = 1 cellpadding = 1>";div_fix_inner_html+=first_fix_row_html.join('');div_data_inner_html+=first_data_row_html.join('');for(var i=0;i<groupRows.length;i++)
{if(grid.groupField!="")
{div_fix_inner_html+="<TR class='rowGroupHeader' ><TD colspan='"+(_colFixCount+1)+"'><DIV onclick='efgrid.divData.onRowGroupHeaderClicked(event)' "+"style='font-weight:bold;border-style: solid;border-width:0px 0px 2px 0px;border-color:#99bbe8'> - "+
groupRows[i]+"</DIV></TD></TR>";div_data_inner_html+="<TR class='rowGroupHeader' ><TD colspan='"+(col_count+1)+"'><DIV onclick='efgrid.divData.onRowGroupHeaderClicked(event)' "+"style='font-weight:bold;border-style: solid;border-width:0px 0px 2px 0px;border-color:#99bbe8;'>"+"<img style='float:left;margin:0px 5px 0px 1px' src='./EF/Images/group-collapse.gif' > "+
groupRows[i]+"</DIV></TD><TD width=100%><div>&nbsp;</div></TD></TR>"}
for(var j=0;j<groupRows[groupRows[i]+"_fix"].length;j++)
{div_fix_inner_html+=groupRows[groupRows[i]+"_fix"][j];div_data_inner_html+=groupRows[groupRows[i]+"_data"][j];}}
div_fix_inner_html+="</TABLE></DIV>";div_data_inner_html+="</TABLE></DIV>";html[0]=div_fix_inner_html;html[1]=div_data_inner_html;return html;}
efgrid.onRowDoubleClicked=function(event){var srcElement=event.srcElement||event.target;var id_in=srcElement.id;var grid_node=efgrid.getEfGridNode(srcElement);if(!grid_node)return;var grid=grid_node.efgrid;if(!grid)return;var currentRow=null;if(srcElement.tagName=="DIV")
currentRow=srcElement.parentNode.parentNode;else if(srcElement.tagName=="TR")
currentRow=srcElement;else
return;if(currentRow.mark==undefined)currentRow.mark=0;if(currentRow.nextSibling.style.display=="none")
{$(currentRow.nextSibling).show("fast");currentRow.nextSibling.mark=1;}
else
{$(currentRow.nextSibling).hide("fast");currentRow.nextSibling.mark=0;}
var tempBlock=grid.eiinfo.blocks[grid.blockId];var eiinfo=new EiInfo();var block=new EiBlock(grid.blockId);block.setBlockMeta(tempBlock.getBlockMeta());var allRows=currentRow.parentNode.rows;block.addRow(tempBlock.rows[currentRow.rawRowIndex]);eiinfo.addBlock(block);efform.fillDiv(grid.rowDetailDivID,eiinfo);if(grid._rowDetailDiv!=null&&currentRow.nextSibling.children[0].innerHTML=="")
{currentRow.nextSibling.children[0].innerHTML=grid._rowDetailDiv.innerHTML;}}
efgrid.divData.onRowGroupHeaderClicked=function(event){var div_node=event.srcElement||event.target;if(div_node.nodeName=="IMG")div_node=div_node.parentNode;var expandTrNode=div_node.parentNode.parentNode;if(expandTrNode==undefined)return;if(expandTrNode.mark==undefined)expandTrNode.mark=1;if(expandTrNode.mark==1)
{var nextNode=expandTrNode.nextSibling;while(nextNode!=undefined&&nextNode.className!=undefined&&nextNode.className!="rowGroupHeader")
{nextNode.style.display="none";var nextNode=nextNode.nextSibling;}
div_node.childNodes[0].src="./EF/Images/group-expand.gif";expandTrNode.mark=0;}else
{var nextNode=expandTrNode.nextSibling;while(nextNode!=undefined&&nextNode.className!=undefined&&nextNode.className!="rowGroupHeader")
{if(!(nextNode.className=="rowDetail"&&(nextNode.mark==undefined||nextNode.mark==0)))
nextNode.style.display="block";var nextNode=nextNode.nextSibling;}
div_node.childNodes[0].src="./EF/Images/group-collapse.gif";expandTrNode.mark=1;}}
efgrid.divData.onclick=function(event,dbclick){return efgrid.cellClick(0,event,dbclick);}
efgrid.divData.ondblclick=function(event){return efgrid.divData.onclick(event,true);}
efgrid.divData.onscroll=function(event){var target=event.srcElement||event.target;var ef_grid_whole_table=efgrid.getEfGridNode(target);var fixDiv=efgrid.getFixDiv(ef_grid_whole_table);var headDiv=efgrid.getHeadDiv(ef_grid_whole_table);var dataDiv=efgrid.getDataDiv(ef_grid_whole_table);if(ef_grid_whole_table.efgrid.needSum()){var sumDiv=efgrid.getSumDataDiv(ef_grid_whole_table);sumDiv.scrollLeft=dataDiv.scrollLeft;}
headDiv.scrollLeft=dataDiv.scrollLeft;fixDiv.scrollTop=dataDiv.scrollTop;}
efgrid.divData.setRowStyle=function(ef_grid_whole_table,row_index,style_classname){var fixDiv=efgrid.getFixDiv(ef_grid_whole_table);var fixTable=fixDiv.firstChild;var dataDiv=efgrid.getDataDiv(ef_grid_whole_table);var dataTable=dataDiv.firstChild;var grid=ef_grid_whole_table.efgrid;if(row_index<0||row_index>=grid.getRowCount())return;fixTable.rows[row_index].className=style_classname;dataTable.rows[row_index].className=style_classname;}
efgrid.divData.onmouseover=function(event){var event_node=event.srcElement||event.target;var target=efgrid.findEventCell(event_node);if(target){var ef_grid_whole_table=efgrid.getEfGridNode(target);if(ef_grid_whole_table){var grid=ef_grid_whole_table.efgrid;var row_index=target.parentNode.rowIndex;if(!grid.isRowChecked(row_index)&&row_index!=grid.getCurrentRowIndex())
efgrid.divData.setRowStyle(ef_grid_whole_table,target.parentNode.rowIndex,'tableRowSelector');}}}
efgrid.divData.onmouseout=function(event){var target=efgrid.findEventCell(event.srcElement||event.target);if(target){var ef_grid_whole_table=efgrid.getEfGridNode(target);if(ef_grid_whole_table){var grid=ef_grid_whole_table.efgrid;var row_index=target.parentNode.rowIndex;if(grid.isRowChecked(row_index))
efgrid.divData.setRowStyle(ef_grid_whole_table,row_index,'rowHighlight');else if(row_index==grid.getCurrentRowIndex())
efgrid.divData.setRowStyle(ef_grid_whole_table,row_index,efform.getGridCurrentRowStyle());else
efgrid.divData.setRowStyle(ef_grid_whole_table,row_index,grid._rowStyle[row_index]);}}}
efgrid.divData.newRows=null;efgrid.divData.onmousedown=function(event){var target=efgrid.findEventCell(event.srcElement||event.target);if(target){var ef_grid_whole_table=efgrid.getEfGridNode(target);if(ef_grid_whole_table){var grid=ef_grid_whole_table.efgrid;var row_index=target.parentNode.rowIndex;if(grid.isRowChecked(row_index)){efgrid.divData.newRows=row_index;}else{efgrid.divData.newRows=null;}}}}
efgrid.divData.oncontextmenu=function(event){efgrid.rightmenu.show(event,TYPE_DATA);}
efgrid.divData.onHeaderRightClick=function(event){efgrid.headerRightMenu.show(event,TYPE_FIX);}
efgrid.divData.onmouseup=function(event){var target=efgrid.findEventCell(event.srcElement||event.target);if(target){var ef_grid_whole_table=efgrid.getEfGridNode(target);if(ef_grid_whole_table){var grid=ef_grid_whole_table.efgrid;var row_index=target.parentNode.rowIndex;if(!grid.isRowChecked(row_index)&&efgrid.divData.newRows!=null){from_index=efgrid.divData.newRows;efgrid.divData.newRows=new Array();efgrid.divData.newRowStatus=new Array();count=grid.getRowCount();if(from_index<row_index)
row_index+=1;for(i=0;i<row_index;i++){if(!grid.isRowChecked(i)){efgrid.divData.newRows.push(grid.getRowData(i));efgrid.divData.newRowStatus.push(grid.rowStatus[i]);}}
startCheckedCount=efgrid.divData.newRows.length;efgrid.divData.newRows=efgrid.divData.newRows.concat(grid.getSelectRowsData());endCheckedCount=efgrid.divData.newRows.length;for(i=0;i<count;i++){if(grid.isRowChecked(i))
efgrid.divData.newRowStatus.push(grid.rowStatus[i]);}
for(i=row_index;i<count;i++){if(!grid.isRowChecked(i)){efgrid.divData.newRows.push(grid.getRowData(i));efgrid.divData.newRowStatus.push(grid.rowStatus[i]);}}
for(i=count-1;i>=0;i--)
grid.removeRow(i);grid.addRowData(efgrid.divData.newRows);grid.rowStatus=efgrid.divData.newRowStatus;for(i=startCheckedCount;i<=endCheckedCount-1;i++)
grid.setRowChecked(i,true);grid.refresh();efgrid.divData.newRows=null;efgrid.divData.newRowStatus=null;}}}}
efgrid.divData.refreshRowStyle=function(ef_grid_whole_table,row_index)
{var fixDiv=efgrid.getFixDiv(ef_grid_whole_table);var fix_div_table=fixDiv.firstChild;var dataDiv=efgrid.getDataDiv(ef_grid_whole_table);var dataTable=dataDiv.firstChild;var grid=ef_grid_whole_table.efgrid;if(grid.isRowChecked(row_index))
efgrid.divData.setRowStyle(ef_grid_whole_table,row_index,'rowHighlight');else if(row_index==grid.getCurrentRowIndex())
efgrid.divData.setRowStyle(ef_grid_whole_table,row_index,efform.getGridCurrentRowStyle());else
efgrid.divData.setRowStyle(ef_grid_whole_table,row_index,grid._rowStyle[row_index]);}
efgrid.divData.changeChoiceStatus=function(ef_grid_whole_table,row_index,in_row_status){var dataDiv=efgrid.getDataDiv(ef_grid_whole_table);var dataTable=dataDiv.firstChild;var grid=ef_grid_whole_table.efgrid;if(row_index>=dataTable.rows.length)return;if(in_row_status)
grid.rowStatus[row_index]|=2;else
grid.rowStatus[row_index]&=253;efgrid.divData.refreshRowStyle(ef_grid_whole_table,row_index);}
efgrid.divData.resize=function(grid_node){var dataDiv=efgrid.getDataDiv(grid_node);var dataTable=dataDiv.firstChild;var grid=grid_node.efgrid;for(var j=0;j<grid.getRowCount();j++){if(dataTable.rows.length>0){for(var t=0;t<grid.getColCount(TYPE_DATA);t++){if(dataTable.rows[j].className=="rowGroupHeader"||dataTable.rows[j].className=="rowDetail"||dataTable.rows[j].cells[t]==undefined)continue;dataTable.rows[j].cells[t].style.width=grid.getColumn(t,TYPE_DATA).getWidth()+"px";var _divNode=dataTable.rows[j].cells[t].firstChild;if(!!_divNode){if(!!_divNode.style){_divNode.style.width=grid.getColumn(t,TYPE_DATA).getWidth()+"px";}}}}}}

efgrid.divFix=function(){}
efgrid.divFix.calcFixWidth=function(grid){var sum=0;for(var i=0;i<grid.getColCount(TYPE_FIX);i++)
sum+=(grid.getColumn(i,TYPE_FIX).getWidth()-1);return sum+grid.getColCount(TYPE_FIX)*(2)+1;}
efgrid.divFix.onclick=function(event,dbclick){var srcElement=event.srcElement||event.target;if(srcElement.tagName=="INPUT"&&srcElement.getAttribute("type")=="checkbox"){var ef_grid_whole_table=efgrid.getEfGridNode(srcElement);var fixDiv=efgrid.getFixDiv(ef_grid_whole_table);var grid=ef_grid_whole_table.efgrid;var row_node=srcElement.parentNode.parentNode.parentNode;if(typeof efgrid_onRowCheckboxClicked=="function"){try{efgrid_onRowCheckboxClicked(grid.gridId,row_node.rowIndex,srcElement.parentNode);}catch(ex){efgrid.processException(ex,"Callback to efgrid_onRowCheckboxClicked failed");}}
efgrid.divData.changeChoiceStatus(ef_grid_whole_table,row_node.rowIndex,srcElement.checked);if(typeof efgrid_afterRowCheckboxClicked=="function"){try{efgrid_afterRowCheckboxClicked(grid.gridId,row_node.rowIndex,srcElement.parentNode);}catch(ex){efgrid.processException(ex,"Callback to efgrid_afterRowCheckboxClicked failed");}}}else{efgrid.cellClick(1,event,dbclick);}}
efgrid.divFix.ondblclick=function(event){efgrid.divFix.onclick(event,true);}
efgrid.divFix.oncontextmenu=function(event){efgrid.rightmenu.show(event,TYPE_FIX);}
efgrid.divFix.isRowChecked=function(ef_grid_whole_table,in_row_id){var grid=ef_grid_whole_table.efgrid;return grid.isRowChecked(in_row_id);}
efgrid.divFix.setRowsStatus=function(ef_grid_whole_table,row_status){var fixDiv=efgrid.getFixDiv(ef_grid_whole_table);var grid=ef_grid_whole_table.efgrid;var fix_div_table=fixDiv.firstChild;for(var i=0;i<fix_div_table.rows.length;i++){var cell_node=fix_div_table.rows[i].cells[0].firstChild.firstChild;if(cell_node.tagName!="INPUT")return false;cell_node.checked=row_status;if(row_status)
grid.rowStatus[i]|=2;else
grid.rowStatus[i]&=253;efgrid.divData.changeChoiceStatus(ef_grid_whole_table,i,cell_node.checked);}}

efgrid.divFunc=function()
{}
efgrid.divFunc.buildLFuncDiv=function(grid)
{var funcDivHtml="<div style='height:"+grid.rowHeight+"' "+"id="
+grid.gridId+EF_SPLIT+"lfunc_div >"
+efgrid.divFunc._buildPersonalBar(grid)+"</div>";ef.debug("["+new Date().getTime().toString()+"]build row 0 finish.");return funcDivHtml;}
efgrid.divFunc.buildFuncDiv=function(grid)
{var table_html=[];table_html.push("<table "+" id='"+grid.gridId+EF_SPLIT+"func_table' ");table_html.push("class='ef-grid-functable' cellspacing=1 >");table_html.push("<tr>");table_html.push("<td></td>");var isFuncNull=false;if(!grid.isLazyLoad())
{var OperationBar=efgrid.divFunc._buildOperationBar(grid);var ToolBar=efgrid.divFunc._buildToolBar(grid);var ModelXlsBar=efgrid.divFunc._buildModelXlsBar(grid);var PersonalBar=efgrid.divFunc._buildPersonalBar(grid);var NavigationBar=efgrid.divFunc._buildNavigationBar(grid);table_html.push(OperationBar);table_html.push(ToolBar);table_html.push(ModelXlsBar);table_html.push(PersonalBar);table_html.push(NavigationBar);if(NavigationBar===""&&OperationBar===""&&ToolBar===""&&ModelXlsBar===""&&PersonalBar===""&&grid.buttonBarId==="")
isFuncNull=true;}
else
{var PersonalBar=efgrid.divFunc._buildPersonalBar(grid);table_html.push(PersonalBar);if(PersonalBar===""&&grid.buttonBarId==="")
isFuncNull=true;}
table_html.push("</tr></table>");var buttonbarHtml="<div style='float:right; ' align='right' id='ef_grid_"
+grid.buttonBarId.toLowerCase()+EF_SPLIT+"buttonbar"+"'></div>";var funcDivHtml="<div "+"id='"+grid.gridId+EF_SPLIT+"func_bar_div' class='ef-grid-func'><div "+"id='"+grid.gridId+EF_SPLIT+"func_div' style='float:left; width:auto; height:auto' class='ef-grid-funcdiv'>"
+table_html.join('')+"</div>"+buttonbarHtml+"</div>";ef.debug("["+new Date().getTime().toString()+"]build row 0 finish.");if(isFuncNull==true)
return"";return funcDivHtml;}
efgrid.divFunc._buildPersonalBar=function(grid)
{var show=true;if(show&&grid.getStyleSetting(STYLE_CONSTANT["PERSONAL_BAR"])==="true")
return"<TD><IMG SRC=\""+efico.get("efgrid.gridBlueDivider")
+"\" ></TD> <td><IMG SRC=\""
+efico.get("efgrid.customColumn")
+"\" onmouseover=\"this.style.cursor='pointer';\" onclick=efgrid.subcgrid.show(this,\""
+grid.gridId+"\")></td>";else
return" ";}
efgrid.divFunc.isBuildOperationBar=function(grid)
{var showOprationBar=grid.isEnable()&&!grid.isReadonly();if(grid.getStyleSetting(STYLE_CONSTANT["OPERTATION_BAR"])==="false")
showOprationBar=false;return showOprationBar;}
efgrid.divFunc.isBuildNavigationBar=function(grid)
{var showOprationBar=grid.isEnable()&&!grid.isReadonly();if(grid.getStyleSetting(STYLE_CONSTANT["NAVIGATION_BAR"])==="false")
showOprationBar=false;return showOprationBar;}
efgrid.divFunc._buildOperationBar=function(grid)
{if(!efgrid.divFunc.isBuildOperationBar(grid))
return"";var html=[];html.push("<TD><IMG SRC=\""+efico.get("efgrid.gridBlueDivider")
+"\" ></TD>");html.push("<td>"
+efbutton.newImgButton(grid.gridId+"_new_row_img","efgrid.addRow",getI18nMessages("ef.AddRow","增加新行"),"efpage.newRecord",grid.gridId)+"</td>");return html.join('');}
efgrid.divFunc._buildToolBar=function(grid)
{var html=[];if(grid.getStyleSetting(STYLE_CONSTANT["TOOL_BAR"])==="true")
{html.push("<TD><IMG SRC=\""+efico.get("efgrid.gridBlueDivider")
+"\" ></TD>");html.push("<td>"+efbutton.newImgButton(grid.gridId+"_export_xls","efform.efExportXls",getI18nMessages("ef.ExportExcel","导出到Excel"),"efgrid.exportToXLS",grid.gridId)+"</td>");}
return html.join('');}
efgrid.divFunc._buildModelXlsBar=function(grid)
{var html=[];if(grid.getStyleSetting(STYLE_CONSTANT["MODELXLS_BAR"])==="true")
{html.push("<TD><IMG SRC=\""+efico.get("efgrid.gridBlueDivider")
+"\" ></TD>");html.push("<td>"
+efbutton.newImgButton(grid.gridId+"_export_modelXls","efform.efExportXls",getI18nMessages("ef.ExportExcelfromModel","从模板导出xls文件"),"efgrid.exportToModleXLS",grid.gridId)+"</td>");}
return html.join('');}
efgrid.divFunc._buildNavigationBar=function(grid)
{if(grid.getStyleSetting(STYLE_CONSTANT["NAVIGATION_BAR"])==="false")
return"";var html=[];html.push("<td><table><tr>");var tempTD=document.createElement("td");var count=grid.getCount();var offset=grid.getOffset();var limit=grid.getLimit();if(limit==LIMIT_ALL)
{efbutton.newDisabledNavButton(tempTD,"efgrid.pageFirstDisabled",grid.gridId+"_first");html.push(tempTD.outerHTML);tempTD=document.createElement("td");efbutton.newDisabledNavButton(tempTD,"efgrid.pagePreviousDisabled",grid.gridId+"_previous");html.push(tempTD.outerHTML);tempTD=document.createElement("td");efbutton.newDisabledNavButton(tempTD,"efgrid.pageNextDisabled",grid.gridId+"_next");html.push(tempTD.outerHTML);tempTD=document.createElement("td");efbutton.newDisabledNavButton(tempTD,"efgrid.pageLastDisabled",grid.gridId+"_last");html.push(tempTD.outerHTML);}
else
{if(count>=0&&offset>0)
efbutton.newNavButton(grid,"efpage.goFirst",tempTD,"efgrid.pageFirst",grid.gridId+"_first");else
efbutton.newDisabledNavButton(tempTD,"efgrid.pageFirstDisabled",grid.gridId+"_first");html.push(tempTD.outerHTML);tempTD=document.createElement("td");if(offset>0)
efbutton.newNavButton(grid,"efpage.goPrevious",tempTD,"efgrid.pagePrevious",grid.gridId+"_previous");else
efbutton.newDisabledNavButton(tempTD,"efgrid.pagePreviousDisabled",grid.gridId+"_previous");html.push(tempTD.outerHTML);tempTD=document.createElement("td");if((grid.getRowCount()>=limit)&&(count<0||(offset+limit<count)))
efbutton.newNavButton(grid,"efpage.goNext",tempTD,"efgrid.pageNext",grid.gridId+"_next");else
efbutton.newDisabledNavButton(tempTD,"efgrid.pageNextDisabled",grid.gridId+"_next");html.push(tempTD.outerHTML);tempTD=document.createElement("td");if(count>=0&&(offset+limit<count))
efbutton.newNavButton(grid,"efpage.goLast",tempTD,"efgrid.pageLast",grid.gridId+"_last");else
efbutton.newDisabledNavButton(tempTD,"efgrid.pageLastDisabled",grid.gridId+"_last");html.push(tempTD.outerHTML);}
html.push("</tr></table></td>");html.push("<TD><IMG SRC=\""+efico.get("efgrid.gridBlueDivider")
+"\" ></TD>");html.push("<td><div style='overflow:hidden'>");html.push("<INPUT class=smallinputField size=3 value='");html.push((offset/limit+1)+"' id='"+grid.gridId+"_jumpto' >");html.push("</div></td>");html.push("<td>"
+efbutton.newImgButton(grid.gridId+"_jump_img","efgrid.jumpPage",getI18nMessages("ef.JumpPage","按页跳转"),"efpage.jumpTo",grid.gridId)+"</td>");html.push("<TD><IMG SRC=\""+efico.get("efgrid.gridBlueDivider")
+"\" ></TD>");html.push("<td><div style='overflow:hidden;align=center;zIndex=10'>");html.push("<select id ='"+grid.gridId
+"_limit' class=pulldownSmall style='zIndex:10' ");html.push("onchange='efpage.limit(\""+grid.gridId+"\")'>");html.push("<option value=10 "+((limit==10)?"selected":"")
+">10</option>");html.push("<option value=20 "+((limit==20)?"selected":"")
+">20</option>");html.push("<option value=50 "+((limit==50)?"selected":"")
+">50</option>");html.push("<option value=100 "+((limit==100)?"selected":"")
+">100</option>");if(grid.canPageAll){html.push("<option value="+LIMIT_ALL+" "
+((limit==LIMIT_ALL)?"selected":"")+">"
+getI18nMessages("ef.PageAll","全部")+"</option>");}
html.push("</select>"+"</div></td>");var count_disabled=(grid.getStyleSetting(STYLE_CONSTANT["SHOW_COUNT"])==="false");var all_record_count="?";var count_checked="";if(count>=0){all_record_count=""+count;count_checked="checked";}else if(grid.getRowCount()<limit&&grid.getRowCount()>0){all_record_count=""+(offset+grid.getRowCount());}
var show_count=(count>=0);grid.setShowCount(show_count);html.push("<td ><input id ='"+grid.gridId+"_count' type=\'checkbox\' ");html.push(count_disabled?" disabled ":(show_count?"checked":""));html.push(" onclick='efpage.setShowCount(\"");html.push(grid.gridId+"\");'  />"+"</td>");html.push("<td>"+"&nbsp;"+getI18nMessages(EF_MSG["FROM"],"从")
+"&nbsp;"+(grid.getRowCount()>0?(offset+1):offset));html.push("&nbsp;"+getI18nMessages(EF_MSG["TO"],"至")+"&nbsp;"
+(offset+grid.getRowCount())+"&nbsp;");if(all_record_count=="?")
html.push(getI18nMessages(EF_MSG["TOGETHER"],"共")+"&nbsp;<IMG src='"
+efico.get("efgrid.pagingCount")+"'></td>");else
html.push(getI18nMessages(EF_MSG["TOGETHER"],"共")+"&nbsp;"
+all_record_count+"</td>");return html.join('');}

efgrid.divHead=function(){};efgrid.divHead.buildHeadDiv=function(grid){var headTableHtml=efgrid.divCorner.paintHead(grid,"head_table","auto",grid.getColCount(TYPE_DATA),grid.getDataColumns());var headDivHtml="<div style='overflow:hidden;width:"
+grid.rightWidth+"px;height:"+grid.rowHeight+"px'"+" id="+grid.gridId+EF_SPLIT+"head_div "+"onmousedown='efgrid.divHead.onmousedown(event)' "+"onmouseup='efgrid.divHead.onmouseup(event)' "+"onmousemove='efgrid.divHead.onmousemove(event)' "+"onmouseout='efgrid.divHead.onmouseout(event)' "+"ondblclick='efgrid.divHead.ondblclick(event)' "+" ondrag='return false' onselectstart='return false' >"+headTableHtml+"</div>";if(grid.hasColumnGroups)
headDivHtml="<div style='overflow:hidden;width:"
+grid.rightWidth+"px;height:"+2*grid.rowHeight+"px'"+" id="+grid.gridId+EF_SPLIT+"head_div "+"onmousedown='efgrid.divHead.onmousedown(event)' "+"onmouseup='efgrid.divHead.onmouseup(event)' "+"onmousemove='efgrid.divHead.onmousemove(event)' "+"onmouseout='efgrid.divHead.onmouseout(event)' "+">"+headTableHtml+"</div>";return headDivHtml;};efgrid.divHead.onmousedown=function(event){var srcElement=event.srcElement||event.target;ef.log("mouse click["+srcElement.tagName+"|"
+srcElement.id+"]"+event.screenX);if((srcElement.tagName!="IMG")&&(srcElement.tagName!="DIV")&&(srcElement.tagName!="TD"))
return;var grid_node=efgrid.getEfGridNode(srcElement);if(!grid_node)return;var grid=grid_node.efgrid;if(!grid)return;var node_now=srcElement;if(node_now.tagName=="IMG")
node_now=srcElement.parentNode;if(node_now.tagName=="DIV")
node_now=node_now.parentNode;var headSplit=node_now.getAttribute("headSplit");var not_sortable=(grid.getStyleSetting(STYLE_CONSTANT["SORTABLE"])==="false");if(headSplit=="0"&&!not_sortable){var cell_pos=(node_now.tdIndex!=undefined)?node_now.tdIndex:(node_now.cellIndex/2);var col=grid.getColumn(cell_pos,TYPE_DATA);efgrid.divHead.sort(grid_node,col);return;}
if(headSplit=="1"){grid.colResizeStatus=1;grid.colOriginIndex=(node_now.tdIndex!=undefined)?(node_now.tdIndex*2+1):node_now.cellIndex;grid.colOriginPosX=event.screenX;grid.colOriginPosY=event.screenY;ef.log("resize start!");}};efgrid.divHead.onmousemove=function(event){var srcElement=event.srcElement||event.target;var id_in=srcElement.id;var grid_node=efgrid.getEfGridNode(srcElement);if(!grid_node)return;var grid=grid_node.efgrid;if(!grid)return;var headDiv=efgrid.getHeadDiv(grid_node);var event_cell=efgrid.findEventCell(srcElement);if(grid.colResizeStatus==null){if((event_cell!=null)&&(event_cell.tagName=="TD")){if(event_cell.getAttribute("headSplit")==0)
event_cell.className="columnHighlight";}
return;}
var pos_x=event.screenX;var pos_y=event.screenY;var minus_px=pos_x-grid.colOriginPosX;ef.log("minus["+minus_px+"]");if(Math.abs(minus_px)<2)return;var cell_index_1=(grid.colOriginIndex-1)/2;var col=grid.getColumn(cell_index_1,TYPE_DATA);var w=col.getWidth();if(w+minus_px<25)return;col.setWidth(w+minus_px);efgrid.divHead.resize(grid_node,minus_px);grid.colOriginPosX=pos_x;grid.colOriginPosY=pos_y;};efgrid.divHead.onmouseup=function(event){var grid_node=efgrid.getEfGridNode(event.srcElement||event.target);if(!grid_node)return;var grid=grid_node.efgrid;if(!grid)return;ef.log("mouse up");if(grid.colResizeStatus){var headDiv=efgrid.getHeadDiv(grid_node);efgrid.divHead.resize(grid_node);efgrid.divData.resize(grid_node);if(grid.needSum())
efgrid.divSum.resize(grid_node);grid._setScrollStyle();grid.colResizeStatus=null;}};efgrid.divHead.onmouseout=function(event){var srcElement=event.srcElement||event.target;var grid_node=efgrid.getEfGridNode(srcElement);if(!grid_node)return;var ef_grid=grid_node.efgrid;if(!ef_grid)return;var event_cell=efgrid.findEventCell(srcElement);if((event_cell!=null)&&(event_cell.tagName=="TD")){if(event_cell.getAttribute("headSplit")==0)
event_cell.className="";}};efgrid.divHead.ondblclick=function(event){var srcElement=event.srcElement||event.target;var srcTdNode=null;var srcImageNode=null
if(srcElement.tagName==="IMG")
{srcTdNode=srcElement.parentNode;srcImageNode=srcElement;}
else if(srcElement.tagName==="TD")
{srcTdNode=srcElement;srcImageNode=srcElement.firstChild;}
if(srcTdNode===null&&srcImageNode===null){return;}
var grid_node=efgrid.getEfGridNode(srcElement);var grid=grid_node.efgrid;var headDiv=efgrid.getHeadDiv(grid_node);var dataDiv=efgrid.getDataDiv(grid_node);var dataTable=dataDiv.firstChild;var headTextDiv=srcTdNode.previousSibling;var index=(srcTdNode.cellIndex-1)/2;var maxWidth=0;for(var i=0;i<grid.getRowCount();i++)
{var currentCellWidth=dataTable.rows[i].cells[index].firstChild.scrollWidth;maxWidth=(maxWidth<currentCellWidth)?currentCellWidth:maxWidth;}
headTextDiv.style.width=maxWidth+"px";grid.getColumn(index,TYPE_DATA).customSetting["width"]=maxWidth;efgrid.divHead.resize(grid_node);efgrid.divData.resize(grid_node);if(grid.sumType!="none")
efgrid.divSum.resize(grid_node);grid._setScrollStyle();};efgrid.divHead.resize=function(grid_node,inc_width){var headDiv=efgrid.getHeadDiv(grid_node);var headTable=headDiv.firstChild;var origWidth=parseInt($(headTable).css("width"));if(inc_width&&!isNaN(origWidth))
$(headTable).css("width",origWidth+inc_width);var grid=grid_node.efgrid;for(var j=0;j<grid.getColCount(TYPE_DATA);j++)
{headTable.rows[0].cells[j*2].style.width=(grid.getColumn(j,TYPE_DATA).getWidth()-1)+"px";if(headTable.rows[0].cells[j*2].firstChild)
{headTable.rows[0].cells[j*2].firstChild.style.width=(grid.getColumn(j,TYPE_DATA).getWidth()-1)+"px";}};};efgrid.divHead.sort=function(grid_node,col){var grid=grid_node.efgrid;if(!grid||!col||!col.existinmeta)return;switch(col.sortType){case"d":col.sortType="";break;case"a":col.sortType="d";break;case"":col.sortType="a";break;default:return;}
if(col.columnType==TYPE_DATA){var headDiv=efgrid.getHeadDiv(grid_node);var width=$(headDiv.firstChild).css("width");var div_node=document.createElement("div");div_node.innerHTML=efgrid.divHead.buildHeadDiv(grid,headDiv.style.width,headDiv.style.height);headDiv.innerHTML=div_node.firstChild.innerHTML;if(width!="auto"){headDiv=efgrid.getHeadDiv(grid_node);$(headDiv.firstChild).css("width",width);}}else{var cornerDiv=efgrid.getCornerDiv(grid_node);cornerDiv.outerHTML=efgrid.divCorner.buildCornerDiv(grid);}
if(grid.ajax&&grid.getRowCount()>1)
efgrid.submitInqu(grid.gridId);return;};

efgrid.prototype.init=function(){this.autoDraw=false;this.ajax=false;this.frontSort=false;this.lazyLoadAble=false;this.useBuffer=true;this.showModel="";this.sumType="none";this.rowStatus=null;this.readonly=false;this.enable=true;this.customCols=null;this.originCustomCols=null;this.xlsExportMode=null;this.buttonBarId="";this.buttonBarPosition="bottom";this.colResizeStatus=null;this.colOriginIndex=0;this.colOriginPosX=0;this.colOriginPosY=0;this.cellEditNode=null;this.cellOriginEditNode=null;this.cellOriginNodeType=-1;this.cellOriginNodeValue="";this.blockData=null;this.dataColumns=null;this.dataColumnsSQ=null;this.invisibleColumns=null;this.fixedColumns=null;this.displayBlock=null;this.fixedColumnsSQ=null;this.leftWidth=0;this.rightWidth=0;this.rowHeight=this.getRowHeight();this.bottomHeight=0;this._currentRow=-1;this.dataHtml=null;this.fixHtml=null;this.toolBarPosition="top";this.menuData=new absTreeModel();this.addMenuItem("",{label:"ascending",parent:"",text:getI18nMessages("ef.GridAscend","升序"),leaf:"1",imgSrc:efico.get("efgrid.frontAsc")});this.addMenuItem("",{label:"descending",parent:"",text:getI18nMessages("ef.GridDescend","降序"),leaf:"1",imgSrc:efico.get("efgrid.frontDesc")});this.bufferRows=[];this.timer=null;this.scrollLastPos=-1;this.columnGroups=[];this.dataColumnGroups=[];this.fixColumnGroups=[];this.hasColumnGroups=false;this.enableColumnSetter=false;this.groupField="";this.rowDetailDivID="";this._rowDetailDiv=null;this.onRowClicked=null;this.canPageAll=false;this.supportNull=false;this.isSubGrid=false;}
efgrid.prototype.getRowHeight=function(){var csstableRow0=efutils.getCssStyle('.tableRow0');if(isAvailable(csstableRow0)){var lineHeight=efutils.getCssStyle('.tableRow0').rowHeight;}
if(!isAvailable(lineHeight))
lineHeight="18px";lineHeight=parseInt(lineHeight.substring(0,lineHeight.toUpperCase().indexOf('PX')));return lineHeight;}
efgrid.prototype.setAjax=function(v){this.ajax=v;}
efgrid.prototype.setFrontSort=function(v){this.frontSort=v;}
efgrid.prototype.setShowModel=function(v){this.showModel=v;}
efgrid.prototype.setDataHtml=function(data){this.dataHtml=data;}
efgrid.prototype.getDataHtml=function(data){return this.dataHtml;}
efgrid.prototype.setFixHtml=function(fix){this.fixHtml=fix;}
efgrid.prototype.getFixHtml=function(fix){return this.fixHtml;}
efgrid.prototype.setGroupField=function(groupField){this.groupField=groupField;if((typeof groupField)=="string"&&groupField!="")
this.enableColumnSetter=true;}
efgrid.prototype.getGroupField=function(){return this.groupField;}
efgrid.prototype.setEnableColumnSetter=function(v){this.enableColumnSetter=isAvailable(v)?eval(v):false;}
efgrid.prototype.getEnableColumnSetter=function(){return this.enableColumnSetter;}
efgrid.prototype.setRowDetailDivID=function(rowDetailDivID){this.rowDetailDivID=rowDetailDivID;this._rowDetailDiv=document.getElementById(this.rowDetailDivID);}
efgrid.prototype.getRowDetailDivID=function(){return this.rowDetailDivID;}
efgrid.prototype.setAutoDraw=function(v){this.autoDraw=v;}
efgrid.prototype.setCustomColumns=function(custom_cols){this.customCols=custom_cols;}
efgrid.prototype.setJsonData=function(eiJson){var eiinfo=Json2EiInfo.prototype.parseJsonObject(eiJson);this.setData(eiinfo);}
efgrid.prototype.setStyle=function(style_config){this.styleConfig=style_config;}
efgrid.prototype.getStyleSetting=function(key){return isAvailable(this.styleConfig)?this.styleConfig[key]:null;}
efgrid.prototype.setCanPageAll=function(v){this.canPageAll=v;}
efgrid.prototype.setSupportNull=function(v){this.supportNull=v;}
efgrid.prototype.setXlsExportMode=function(mode){this.xlsExportMode=mode;}
efgrid.prototype.setButtonBarId=function(id){this.buttonBarId=id;}
efgrid.prototype.setButtonBarPosition=function(mode){this.buttonBarPosition=mode;}
efgrid.prototype.setData=function(eiinfo){this.eiinfo=eiinfo;this.dataColumns=[];this.invisibleColumns=[];this.fixedColumns=[];this.blockData=eiinfo.getBlock(this.blockId);if(!isAvailable(this.blockData)){efform._removeGrid(this.gridId);throw new Error("Block with id:["+this.blockId
+"] not exists in request!");}
var choose=new EiColumn("_rowcheck");choose.primaryKey=false;choose.descName="";choose.displayType=this.isEnable()?"checkbox":"text";choose.visible=true;choose.readonly=false;var ef_c=this.buildColumn(choose,choose);ef_c.setWidth(this.isEnable()?20:1);this.fixedColumns.push(ef_c);var metas=this.blockData.getBlockMeta().getMetas();if(!this.customCols)
this.customCols={};var customIndex=this.customCols["index"]?this.customCols["index"]:{};var customMeta=this.customCols["metas"]?this.customCols["metas"]:[];var groupIndex=this.customCols["groupIndex"]?this.customCols["groupIndex"]:{};var columnGroups=this.customCols["columnGroups"]?this.customCols["columnGroups"]:[];if(this.autoDraw!="no"&&(""+this.autoDraw)!="false"){customKeys=[];for(var key in metas){var index=customIndex[key];var custom_setting=(index!==undefined)?customMeta[eval(index)]:metas[key];ef_c=this.buildColumn(custom_setting,metas[key],eiinfo);if(index!=null){customKeys.push(key);}
this.getColumns(ef_c.getColumnType(),ef_c.isVisible()).push(ef_c);}
if(this.autoDraw!="override"){for(var key in customIndex){if(customKeys.indexOf(key)>=0)
continue;var index=customIndex[key];var ei_c=new EiColumn(key);ei_c.descName=customMeta[eval(index)]["descName"];ei_c.pos=this.blockData.getBlockMeta().colCount;this.blockData.getBlockMeta().addMeta(ei_c);for(var j=0;j<this.blockData.getRows().length;j++)
this.blockData.setCell(j,key,((this.supportNull)?"":" "));ef_c=this.buildColumn(customMeta[eval(index)],ei_c,eiinfo);ef_c.existinmeta=false;this.getColumns(ef_c.getColumnType(),ef_c.isVisible()).push(ef_c);}}}else{for(var i=0;i<customMeta.length;i++){var custom_setting=customMeta[i];var key=custom_setting["name"];var origin_setting=metas[key];if(!isAvailable(metas[key])){origin_setting=new EiColumn(key);if(isAvailable(custom_setting["descName"]))
origin_setting.descName=custom_setting["descName"];origin_setting.pos=this.blockData.getBlockMeta().colCount;this.blockData.getBlockMeta().addMeta(origin_setting);for(var j=0;j<this.blockData.getRows().length;j++)
this.blockData.setCell(j,key,((this.supportNull)?"":" "));}
ef_c=this.buildColumn(custom_setting,origin_setting,eiinfo);ef_c.existinmeta=isAvailable(metas[key]);this.getColumns(ef_c.getColumnType(),ef_c.isVisible()).push(ef_c);}
for(var i=0;i<columnGroups.length;i++){var ef_c=new efColumnGroup();ef_c.build(columnGroups[i]);this.columnGroups[this.columnGroups.length]=ef_c;if(ef_c.columnType==1){this.fixColumnGroups[this.fixColumnGroups.length]=ef_c;}else{this.dataColumnGroups[this.dataColumnGroups.length]=ef_c;}}
if(this.columnGroups!=null&&this.columnGroups.length>0)
this.hasColumnGroups=true;}
if(this.fixedColumnsSQ!=null&&null!=this.dataColumnsSQ){_fixed=[];_data=[];_fixed.push(this.fixedColumns[0]);for(i=0;c=this.fixedColumnsSQ[i++];){for(j=0;t=this.fixedColumns[j++];){if(!!t.customSetting&&t.customSetting["name"]==c){_fixed.push(t);}}}
this.fixedColumns=_fixed;for(i=0;c=this.dataColumnsSQ[i++];){for(j=0;t=this.dataColumns[j++];){if(!!t.customSetting&&t.customSetting["name"]==c){_data.push(t);}}}
this.dataColumns=_data;}
this.serviceSetting(eiinfo);this._clearRowState();this._clearStyle();this.setOrderBy(this.getProp("orderBy",""));}
efgrid.prototype.setServiceName=function(sName){this.serviceName=sName;}
efgrid.prototype.setQueryMethod=function(sName){this.queryMethod=sName;}
efgrid.prototype.serviceSetting=function(eiinfo){if(!isAvailable(this.serviceName))
this.serviceName=eiinfo.get("serviceName");}
efgrid.prototype.getCurrentRowIndex=function(){return this._currentRow;}
efgrid.prototype.setCurrentRowIndex=function(row_index,dbclick){if(row_index<0||row_index>=this.getRowCount())
return;if(this._currentRow!=row_index){var table_node=this.getGridTableNode();efgrid.divData.setRowStyle(table_node,row_index,this.isRowChecked(row_index)?"rowHighlight":efform.getGridCurrentRowStyle());if(this._currentRow>=0&&!this.isRowChecked(this._currentRow)){efgrid.divData.setRowStyle(table_node,this._currentRow,this._rowStyle[this._currentRow]);}
this._currentRow=row_index;if(typeof efgrid_onRowClicked=="function"){try{efgrid_onRowClicked(this.gridId,row_index);}catch(ex){efgrid.processException(ex,"Callback to efgrid_onRowClicked failed");}}
if(typeof this.onRowClicked=="function"){try{this.onRowClicked(this.gridId,row_index);}catch(ex){efgrid.processException(ex,"Callback to onRowClicked failed");}}}else if(dbclick==true){if(typeof efgrid_onRowDblClicked=="function"){try{efgrid_onRowDblClicked(this.gridId,row_index);}catch(ex){efgrid.processException(ex,"Callback to efgrid_onRowDblClicked failed");}}
if(this.onRowDblClicked!=undefined&&typeof this.onRowDblClicked=="function"){try{this.onRowDblClicked();}catch(ex){efgrid.processException(ex,"Callback to this.onRowDblClicked failed");}}}}
efgrid.prototype.getCheckedRows=function(){var rows=[];for(var i=0;i<this.rowStatus.length;i++){if(this.isRowChecked(i))
rows.push(i);}
return rows;}
efgrid.prototype.getCheckedRowCount=function(){return this.getCheckedRows().length;}
efgrid.prototype.getSelectRowsData=function(){var rows=[];for(var i=0;i<this.rowStatus.length;i++){if(this.isRowChecked(i))
rows.push(this.getRowData(i));}
return rows;}
efgrid.prototype.getRowData=function(row_index){var rowData=new Object();if(row_index>=0&&row_index<this.blockData.getRows().length){var metas=this.blockData.getBlockMeta().getMetas();for(var key in metas)
rowData[key]=this.blockData.getCell(row_index,key);}
return rowData;}
efgrid.prototype.addRowData=function(rowData,clear){if(!isAvailable(rowData)||!isAvailable(rowData.length))
return;var metas=this.blockData.getBlockMeta().getMetas();var row_index=this.blockData.getRows().length;if(clear==undefined||clear)
this._clearSelect();for(var i=0;i<rowData.length;i++,row_index++){this.blockData.addRow();for(var key in metas){if(isAvailable(rowData[i][key]))
this.blockData.setCell(row_index,key,rowData[i][key]);}
this.rowStatus.push(3);this._rowStyle.push("tableRow"+((this.getRowCount()+1)&1));}
this.refresh();}
efgrid.prototype._clearStyle=function(){this._rowStyle=[];var rowCount=this.blockData.getRows().length;for(var i=0;i<rowCount;i++)
this._rowStyle[i]='tableRow'+(i&1);}
efgrid.prototype._clearSelect=function(){var rowCount=this.blockData.getRows().length;for(var i=0;i<rowCount;i++)
this.rowStatus[i]&=0xFD;}
efgrid.prototype._clearRowState=function(){this.rowStatus=[];var rowCount=this.blockData.getRows().length;for(var i=0;i<rowCount;i++)
this.rowStatus[i]=0;}
efgrid.prototype.getBlockData=function(){return this.blockData;}
efgrid.prototype.buildColumn=function(custom_col,original_col,eiinfo){return efColumn.build(custom_col,original_col,eiinfo);}
efgrid.prototype.getAllColumns=function(){return this.fixedColumns.concat(this.dataColumns).concat(this.invisibleColumns);}
efgrid.prototype.getDataColumns=function(){return this.getColumns(TYPE_DATA,true);}
efgrid.prototype.getColumns=function(t,visible){if(TYPE_FIX==t)
return this.fixedColumns;return visible?this.dataColumns:this.invisibleColumns;}
efgrid.prototype.getProp=function(name,defaultValue){var value=this.getBlockData().getAttr()[name];return(value===null||value===undefined)?defaultValue:value;}
efgrid.prototype.setProp=function(name,v){this.getBlockData().getAttr()[name]=v;}
efgrid.prototype.getOffset=function(){var v=eval(this.getProp("offset",0));this.setOffset(v);return v;}
efgrid.prototype.setOffset=function(v){this.setProp("offset",v);}
efgrid.prototype.getLimit=function(){var v=eval(this.getProp("limit",10));this.setLimit(v);return v;}
efgrid.prototype.setLimit=function(v){this.setProp("limit",v);}
efgrid.prototype.getCount=function(){return eval(this.getProp("count",-1));}
efgrid.prototype.setCount=function(v){this.setProp("count",v);}
efgrid.prototype.getTotalPageCount=function(){var count=this.getCount();var limit=this.getLimit();if(count==0||limit==LIMIT_ALL)
return 1;if(count<0)
return Number.MAX_VALUE;var mod=count%limit;var pages=(count-mod)/limit;return(count%limit==0)?pages:pages+1;}
efgrid.prototype.isReadonly=function(){return this.readonly;}
efgrid.prototype.setReadonly=function(v){this.readonly=isAvailable(v)?eval(v):false;}
efgrid.prototype.isEnable=function(){return this.enable;}
efgrid.prototype.setEnable=function(v){this.enable=isAvailable(v)?eval(v):true;}
efgrid.prototype.getCellValue=function(row,col,t,invisible){var column=invisible?this.getInvisibleColumn(col):this.getColumn(col,t);var rows=this.getBlockData().rows
var v=null;if(rows.length>row)
v=rows[row][column.pos];return isAvailable(v)?efutils.trimString(v):"";}
efgrid.prototype.getTDCellValue=function(row,col){var column=this.dataColumns[col];var v=this.blockData.rows[row][column.pos];return isAvailable(v)?efutils.trimString(v):"";}
efgrid.prototype.getTFCellValue=function(row,col){var column=this.fixedColumns[col];var v=this.blockData.rows[row][column.pos];return isAvailable(v)?efutils.trimString(v):"";}
efgrid.prototype.getCellValueByColumnName=function(row,ename){var allColumns=this.getAllColumns();var column;var v;for(var i=0;i<allColumns.length;i++){if(allColumns[i].getEname()==ename){column=allColumns[i];}}
if(isAvailable(column)){if(isAvailable(this.getBlockData().rows[row])){v=this.getBlockData().rows[row][column.pos];}else{return"";}}
return isAvailable(v)?efutils.trimString(v):"";}
efgrid.prototype.getCellMappingValueByColumnName=function(row,ename){var allColumns=this.getAllColumns();var column;var v;for(var i=0;i<allColumns.length;i++){if(allColumns[i].getEname()==ename){column=allColumns[i];}}
if(isAvailable(column)){v=this.getBlockData().rows[row][column.pos];}
var retValue=isAvailable(v)?efutils.trimString(v):"";if(retValue!=""&&column.columnListValue.length>0){for(var k=0;k<column.columnListValue.length;k++){if(column.columnListValue[k]==retValue){retValue=column.columnListLabel[k];break;}}}
return retValue;}
efgrid.prototype.setCellValue=function(row,col,v,t){if(!isAvailable(v))
v="";else
v=efutils.trimString(v);if(!isAvailable(v))
v=(this.supportNull)?"":" ";var column=this.getColumn(col,t);var blockmeta=this.blockData.getBlockMeta();if(!isAvailable(blockmeta.getMeta(column.getEname()))){column.pos=blockmeta.colCount;blockmeta.addMeta(column.eiColumn);}
this.getBlockData().setCell(row,column.getEname(),v);}
efgrid.prototype.getRowCount=function(){return this.getBlockData().getRows().length;}
efgrid.prototype.getColCount=function(t){return(t==TYPE_FIX)?this.fixedColumns.length:this.dataColumns.length;}
efgrid.prototype.getInvisibleColCount=function(){return this.invisibleColumns.length;}
efgrid.prototype.getColumn=function(index,t){return this.getColumns(t,true)[index];}
efgrid.prototype.getColumnByName=function(ename){var allColumns=this.getAllColumns();for(var i=0;i<allColumns.length;i++){if(allColumns[i].getEname()==ename){var column=allColumns[i];return column;}}
return null;}
efgrid.prototype.getInvisibleColumn=function(index){return this.getColumns(TYPE_DATA,false)[index];}
efgrid.prototype.calcColsWidth=function(){var sum=0;for(var i=0;i<this.getColCount(TYPE_DATA);i++)
sum+=this.getColumn(i,TYPE_DATA).getWidth();return sum;}
efgrid.prototype.calcTableWidth=function(){return this.calcColsWidth()+this.getColCount(TYPE_DATA)+1;}
efgrid.prototype.paint=function(){if(this.cellOriginEditNode!=null)
efgrid._saveOldCell(this.cellOriginEditNode,this);this.cellEditNode=null;this.cellOriginEditNode=null;this.cellOriginNodeValue="";this.cellOriginNodeType=-1;efform.clearErrorMessage();if(this._currentRow<0)
{if(this.getStyleSetting(STYLE_CONSTANT["INIT_SELECT"])==="true"&&this.blockData.getRows().length>0)
{this._currentRow=0;}}
if(typeof efgrid_onBeforeGridDisplay=="function")
{try
{efgrid_onBeforeGridDisplay(this.gridId);}
catch(ex)
{efgrid.processException(ex,"Callback to efgrid_onBeforeGridDisplay failed");}}
var paint_div_id=this.gridId;var paintDivElement=document.getElementById(paint_div_id);if(!paintDivElement)
{alert(getI18nMessages(EF_ERROR_MSG["GRID_DIV_NOT_FOUND"],"欲显示的efgrid对象必须置于有效<Div>元素中！"));return-1;}
var w_total=paintDivElement.style.width?parseInt(paintDivElement.style.width):parseInt(paintDivElement.scrollWidth);if(w_total>document.body.clientWidth)
w_total=document.body.clientWidth-20;this.leftWidth=efgrid.divFix.calcFixWidth(this);this.rightWidth=w_total-this.leftWidth;var h_total=paintDivElement.style.height?parseInt(paintDivElement.style.height):parseInt(paintDivElement.clientHeight);if(h_total<50)
h_total=300;this.bottomHeight=h_total-this.rowHeight*2;if(efgrid.divFunc.isBuildNavigationBar(this))
this.bottomHeight-=10;if(!this.isEnable()||!!this.readonly)
this.bottomHeight-=10;if(this.hasColumnGroups)
this.bottomHeight-=this.rowHeight;var sumTR="";if(this.needSum()){if(this.getRenderSumType()=="all")
{height=this.rowHeight*2;this.sumDivRowCount=2;}else
{height=this.rowHeight;this.sumDivRowCount=1;}
height+=5;this.bottomHeight-=height;this.sumDivHeight=height;var sumHtml=efgrid.divSum.buildSumDiv(this);sumTR="<TR efGridTopTable=1 height="+(this.sumDivHeight)+">"
+"  <TD efGridTopTable=1>"+sumHtml[0]+"</TD>"
+"  <TD efGridTopTable=1 colspan=2>"+sumHtml[1]+"</TD>"
+"</TR>";}
if(this.isLazyLoad())
{this.rightWidth=this.rightWidth-21;this.setShowCount(true);this.setLimit(parseInt((this.bottomHeight-10)/(this.rowHeight+3)));var scrollClientHeight=this.bottomHeight+this.rowHeight;var scrollDivHeight=Math.floor(scrollClientHeight/8)*this.getCount();if(scrollDivHeight<scrollClientHeight)
scrollDivHeight=scrollClientHeight-20;var scrollHtml="<DIV id='"+this.gridId+EF_SPLIT+"scroll_div' "
+"style='height:"+scrollClientHeight
+";overflow-y:scroll' "
+"onscroll='var grid = efgrid.getGridObject( \""+this.gridId
+"\" );grid.onScroll();wsug(event, grid.getScrollTooltip())' "
+"onmouseout='wsug(event, 0)'>"+"<DIV  style='height:"
+scrollDivHeight+"'></DIV>"+"</DIV>";}
var funcDivHtml=efgrid.divFunc.buildFuncDiv(this);var LFuncDivHtml=efgrid.divFunc.buildLFuncDiv(this);var cornerDivHtml=efgrid.divCorner.buildCornerDiv(this);var headDivHtml=efgrid.divHead.buildHeadDiv(this);if(this.groupField!=""||this.rowDetailDivID!="")
{var groupHtml=efgrid.divData.buildGroupDetailDataDiv(this);var grid_table_html="<TABLE id='"+this.gridId+EF_SPLIT
+"grid_table' class='tableBorder' style='table-layout:fixed;width:"+w_total+"px' border=0 cellspacing=0 cellpadding=0 cols=2>"
+"<col  style='width:"+this.leftWidth+"px' ><col style='width:"+this.rightWidth+"px '>";grid_table_html+="<TR class=tableHeader efGridTopTable=1><td></td><TD  efGridTopTable=1 align=left>"+funcDivHtml+"</TD></TR>"
+"<TR class=tableColumnHeader efGridTopTable=1  style='height:"
+(this.hasColumnGroups?2*this.rowHeight:this.rowHeight)
+"px;' ><TD efGridTopTable=1>"
+cornerDivHtml
+"</TD><TD efGridTopTable=1>"
+headDivHtml
+"</TD>"
+(this.isLazyLoad()?(" <TD rowspan=2>"+scrollHtml+"</TD>"):"")+"</TR>"+"<TR efGridTopTable=1 height="
+this.bottomHeight+">"+"  <TD efGridTopTable=1>"
+groupHtml[0]+"</TD>"+"  <TD efGridTopTable=1>"
+groupHtml[1]+"</TD>"+"</TR>"+sumTR+"</TABLE>";paintDivElement.innerHTML=grid_table_html;if(this.buttonBarId&&this.buttonBarId!=""){var func=eval("paintButtonBar_"+this.gridId);func();}
var grid_table=paintDivElement.firstChild;grid_table.efgrid=this;this._setScrollStyle();var tableCornerDiv=document.getElementById("ef_grid_result__corner_div");var tableHeadDiv=document.getElementById(this.gridId+"__head_div");document.getElementById("ef_grid_result__corner_div").style.display="none";document.getElementById("ef_grid_result__fix_div").style.display="none";var tableDiv=document.getElementById(this.gridId+"__grid_table");var left_colGroup=tableDiv.firstChild.firstChild;var right_colGroup=tableDiv.firstChild.lastChild;right_colGroup.style.width=(w_total-2)+"px";if($.browser.msie){tableHeadDiv.style.width=(w_total-3)+"px";tableCornerDiv.style.width="1px";left_colGroup.style.width="1px";this.rightWidth=w_total-3;this.leftWidth=1;}else{tableHeadDiv.style.width=(w_total-2)+"px";tableCornerDiv.style.width="0px";left_colGroup.style.width="0px";this.rightWidth=w_total-2;this.leftWidth=0;}
return;}
var html=efgrid.divData.buildFixDataDiv(this);var grid_table_html="<TABLE id='"+this.gridId+EF_SPLIT
+"grid_table' "
+"class='tableBorder' style='table-layout:fixed; width="
+w_total+"px' border=0 cellspacing=0 cellpadding=0 cols=2>"
+"<col style='width:"+this.leftWidth+"px' /><col  style='width:"
+this.rightWidth+"px' >";if(this.isSubGrid)
{grid_table_html+="<TR class=tableHeader efGridTopTable=1><TD colspan =2 efGridTopTable=1 align=left>"+funcDivHtml
+"</TD></TR>"
+"<TR class=tableColumnHeader efGridTopTable=1  style='height:"
+(this.hasColumnGroups?2*this.rowHeight:this.rowHeight)
+"px;' >"
+"  <TD efGridTopTable=1>"
+cornerDivHtml
+"</TD>"
+"  <TD efGridTopTable=1>"
+headDivHtml
+"</TD>"
+(this.isLazyLoad()?(" <TD rowspan=2>"+scrollHtml+"</TD>"):"")+"</TR>"+"<TR efGridTopTable=1 height="
+this.bottomHeight+">"+"  <TD efGridTopTable=1>"+html[0]
+"</TD>"+"  <TD efGridTopTable=1>"+html[1]+"</TD>"+"</TR>"
+sumTR+"</TABLE>";}
else
{switch(this.toolBarPosition){case"top":grid_table_html+="<TR class=tableHeader efGridTopTable=1><TD colspan = 2 efGridTopTable=1 align=left>"+funcDivHtml
+"</TD></TR>"
+"<TR class=tableColumnHeader efGridTopTable=1  style='height:"
+(this.hasColumnGroups?2*this.rowHeight:this.rowHeight)
+"px;' >"
+"  <TD efGridTopTable=1>"
+cornerDivHtml
+"</TD>"
+"  <TD efGridTopTable=1>"
+headDivHtml
+"</TD>"
+(this.isLazyLoad()?(" <TD rowspan=2>"+scrollHtml+"</TD>"):"")+"</TR>"+"<TR efGridTopTable=1  style='height:"
+this.bottomHeight+"px;' >"+"  <TD efGridTopTable=1>"+html[0]
+"</TD>"+"  <TD efGridTopTable=1>"+html[1]+"</TD>"+"</TR>"+sumTR+"</TABLE>";break;case"bottom":grid_table_html+="<TR class=tableColumnHeader efGridTopTable=1  style='height:"
+(this.hasColumnGroups?2*this.rowHeight:this.rowHeight)
+"px;' >"
+"  <TD efGridTopTable=1>"
+cornerDivHtml
+"</TD>"
+"  <TD efGridTopTable=1>"
+headDivHtml
+"</TD>"
+(this.isLazyLoad()?(" <TD rowspan=2>"+scrollHtml+"</TD>"):"")+"</TR>"+"<TR efGridTopTable=1 style='height:"
+this.bottomHeight+"px;' >"+"  <TD efGridTopTable=1>"+html[0]
+"</TD>"+"  <TD efGridTopTable=1>"+html[1]+"</TD>"+"</TR>"
+"<TR class=tableHeader efGridTopTable=1><TD colspan = 2 efGridTopTable=1 align=left>"+funcDivHtml
+"</TD></TR>"+sumTR+"</TABLE>";break;}}
paintDivElement.innerHTML=grid_table_html;if(this.buttonBarId&&this.buttonBarId!=""){var func=eval("paintButtonBar_"+this.gridId);func();}
this._resizeHeader(paintDivElement.firstChild);var grid_table=paintDivElement.firstChild;grid_table.efgrid=this;this._setScrollStyle();if(paintDivElement.id=="efgrid_config_sub_grid"){var grid=efgrid.getGridObject("efgrid_config_sub_grid");var rowCount=grid.getRowCount();for(var i=0;i<rowCount;i++){var canPersonal=grid.getCellValue(i,0,TYPE_DATA,true);if(canPersonal=="false")
efgrid.setRowDisplayStyle(paintDivElement.id,i,"show");}}else if(typeof efgrid_onGridDisplayReady=="function"){try{efgrid_onGridDisplayReady(paintDivElement);}catch(ex){efgrid.processException(ex,"Callback to efgrid_onGridDisplayReady failed");}}
ef.debug("["+new Date().getTime()+"] build grid finish");this.showModel="";if(this.isLazyLoad()&&this.scrollLastPos!=-1)
this.getScrollDivNode().scrollTop=this.scrollLastPos;};efgrid.prototype._addErroMsgContent=function(){var errorMsgContent=document.getElementById(this.gridId
+"_errorMsgContent");var gridContent=document.getElementById(this.gridId);if(errorMsgContent==undefined||errorMsgContent==null){errorMsgContent=document.createElement("div");errorMsgContent.style.position="absolute";errorMsgContent.style.display="none";errorMsgContent.id=this.gridId+"_errorMsgContent";errorMsgContent.innerHTML="<table><tr><td style='width:4px;height:4px;background:red' "
+"onmouseover='this.parentNode.nextSibling.firstChild.nextSibling.style.display=\"block\";' "
+"onmouseout='this.parentNode.nextSibling.firstChild.nextSibling.style.display=\"none\"' ></td> "
+"<td></td></tr><tr><td></td> "
+"<td id='"
+this.gridId
+"_errorMsgContent' style='display:none;border-style:solid;border-width:1px'></td> "
+"</tr></table>";document.body.appendChild(errorMsgContent);}
errorMsgContent.style.pixelLeft=gridContent.offsetLeft;errorMsgContent.style.pixelTop=gridContent.offsetTop;return errorMsgContent;}
efgrid.prototype._setScrollStyle=function(){var grid_table=this.getGridTableNode();var fixDiv=efgrid.getFixDiv(grid_table);var dataDiv=efgrid.getDataDiv(grid_table);if(this.rightWidth<eval(this.calcColsWidth())){fixDiv.style.overflowX="scroll";dataDiv.style.overflowX="scroll";}else{fixDiv.style.overflowX="hidden";dataDiv.style.overflowX="hidden";}
fixDiv.style.overflowY="hidden";dataDiv.style.overflowY="scroll";if(this.isLazyLoad())
dataDiv.style.overflowY="hidden";}
efgrid.prototype.getShowCount=function(){return eval(this.getBlockData().get("showCount"));}
efgrid.prototype.setShowCount=function(v){this.getBlockData().set("showCount",v);}
efgrid.prototype.setOrderBy=function(order_by){if(!order_by)
return;var col_order=order_by.split(",");for(var i=0;i<col_order.length;i++){var order_param=col_order[i].split(" ");if(order_param.length!=2)
continue;for(var j=0;j<this.getColCount(TYPE_FIX);j++){if(this.getColumn(j,TYPE_FIX).getEname()==order_param[0]){this.getColumn(j,TYPE_FIX).sortType=(order_param[1]=="desc")?"d":"a";break;}}
for(var j=0;j<this.getColCount(TYPE_DATA);j++){if(this.getColumn(j,TYPE_DATA).getEname()==order_param[0]){this.getColumn(j,TYPE_DATA).sortType=(order_param[1]=="desc")?"d":"a";break;}}}}
efgrid.prototype.getOrderBy=function(){var fix_order_by=this._getTypedOrderBy("",TYPE_FIX);return this._getTypedOrderBy(fix_order_by,TYPE_DATA);}
efgrid.prototype._getTypedOrderBy=function(order_by,type){for(var i=0;i<this.getColCount(type);i++){var col=this.getColumn(i,type);if(!col.existinmeta)
continue;if(col.sortType&&col.sortType!="-"){if(order_by!="")
order_by+=",";order_by+=col.getEname();order_by+=(col.sortType=="d")?" desc":" asc";}}
return order_by;}
efgrid.prototype.newLine=function(copy){var unchecked=(this.getStyleSetting(STYLE_CONSTANT["CHECK_NEWLINE"])==="false");if(isAvailable(copy)&&copy){var row_count=this.getRowCount();var rows=this.getCheckedRows();for(var i=0;i<rows.length;i++){if(!unchecked)
this.rowStatus[rows[i]]&=0xFD;var row=efutils.copyArray(this.getBlockData().getRows()[rows[i]]);this._rowStyle.push("tableRow"+(row_count&1));this.getBlockData().addRow(row);this.rowStatus.push(unchecked?1:3);row_count++;}}else{var row=[];for(var i=1;i<this.getColCount(TYPE_FIX);i++){var column=this.getColumn(i,TYPE_FIX);if(column.pos>=0)
row[column.pos]=column.getDefaultValue();}
for(var i=0;i<this.getColCount(TYPE_DATA);i++){var column=this.getColumn(i,TYPE_DATA);if(column.pos>=0)
row[column.pos]=column.getDefaultValue();}
for(var i=0;i<this.getInvisibleColCount();i++){var column=this.getInvisibleColumn(i);if(column.pos>=0)
row[column.pos]=column.getDefaultValue();}
var rows=this.getCheckedRows();for(var i=0;i<rows.length;i++){if(!unchecked)
this.rowStatus[rows[i]]&=0xFD;}
this._rowStyle.push("tableRow"+(this.getRowCount()&1));this.getBlockData().addRow(row);this.rowStatus.push(unchecked?1:3);}}
efgrid.prototype.setRowChecked=function(row,checked){if(row<0||row>=this.getRowCount())
return;if(checked)
this.rowStatus[row]|=2;else
this.rowStatus[row]&=0xFD;}
efgrid.prototype.isRowChecked=function(row){if(row<0||row>=this.getRowCount())
return false;return(this.rowStatus[row]&2)!=0;}
efgrid.prototype.isNewLine=function(row){if(row<0||row>=this.getRowCount())
return false;return(this.rowStatus[row]&1)!=0;}
efgrid.prototype.validateAll=function(){var message="";for(var i=0;i<this.getRowCount();i++){if(!this.isRowChecked(i))
continue;for(var j=0;j<this.getColCount(TYPE_DATA);j++){var column=this.getColumn(j,TYPE_DATA);try{column.getValidator().validate(this.getCellValue(i,j,TYPE_DATA));}catch(ex){message+=getI18nMessages(EF_MSG["DATA_COLUMN"],"数据列")
+"["
+j
+"]"
+getI18nMessages(EF_MSG["ROW"],"行")
+"["
+i
+"]"
+getI18nMessages(EF_ERROR_MSG["VALIDATE_ERROR"],"数据验证错误")+":"+ex.message+"\n";ef_form_validate_message["data_key_"+i+"_"+j]=message;efform.setErrorStyle(this.getCellDivNode(i,j,TYPE_DATA),ex.message,false);}}
for(var j=1;j<this.getColCount(TYPE_FIX);j++){var column=this.getColumn(j,TYPE_FIX);try{column.getValidator().validate(this.getCellValue(i,j,TYPE_FIX));}catch(ex){message+=getI18nMessages(EF_MSG["FIX_COLUMN"],"固定列")
+"["
+j
+"]"
+getI18nMessages(EF_MSG["ROW"],"行")
+"["
+i
+"]"
+getI18nMessages(EF_ERROR_MSG["VALIDATE_ERROR"],"数据验证错误")+":"+ex.message+"\n";ef_form_validate_message["fix_key_"+i+"_"+j]=message;efform.setErrorStyle(this.getCellDivNode(i,j,TYPE_FIX),ex.message,false);}}}
return message;}
efgrid.prototype.getGridTableNode=function(){return document.getElementById(this.gridId+EF_SPLIT+"grid_table");}
efgrid.prototype.getCellDivNode=function(row_index,col_index,data_type){var table_node=this.getGridTableNode();var fixDiv=efgrid.getFixDiv(table_node);var fixTable=fixDiv.firstChild;var dataDiv=efgrid.getDataDiv(table_node);var dataTable=dataDiv.firstChild;if(data_type==TYPE_FIX)
return fixTable.rows[row_index].childNodes[col_index].firstChild;else
return dataTable.rows[row_index].childNodes[col_index].firstChild;}
efgrid.prototype.refreshCell=function(row_index,col_index,data_type){if(row_index<0||row_index>=this.getRowCount())
return;if(col_index<0||col_index>=this.getColCount(data_type))
return;var table_node=this.getGridTableNode();var fixDiv=efgrid.getFixDiv(table_node);var fixTable=fixDiv.firstChild;var dataDiv=efgrid.getDataDiv(table_node);var dataTable=dataDiv.firstChild;var div_node;if(data_type==TYPE_FIX)
div_node=fixTable.rows[row_index].childNodes[col_index].firstChild;else
div_node=dataTable.rows[row_index].childNodes[col_index].firstChild;var column=this.getColumn(col_index,data_type);var cell_value=this.getCellValue(row_index,col_index,data_type);var parent_node=div_node.parentNode;var new_node=column.genCellDisplayNode(cell_value,this.gridId,row_index,col_index);if(div_node==this.cellOriginEditNode){new_node=column.getEditNode(div_node,this.isNewLine(row_index));if(!new_node)
return;efgrid._setEditNodeEvent(new_node);this.cellOriginEditNode=new_node;this.cellOriginNodeValue=cell_value;}
parent_node.innerHtml="";parent_node.removeChild(div_node);parent_node.appendChild(new_node);}
efgrid.prototype.refreshRow=function(row_index){if(row_index<0||row_index>=this.getRowCount())
return;var table_node=this.getGridTableNode();var fixDiv=efgrid.getFixDiv(table_node);var fixTable=fixDiv.firstChild;var div_node=fixTable.rows[row_index].childNodes[0].firstChild;div_node.firstChild.checked=this.isRowChecked(row_index);for(var i=1;i<this.getColCount(TYPE_FIX);i++)
this.refreshCell(row_index,i,TYPE_FIX);for(var i=0;i<this.getColCount(TYPE_DATA);i++)
this.refreshCell(row_index,i,TYPE_DATA);}
efgrid.prototype.refresh=function(eiinfo){this.cellEditNode=null;this.cellOriginEditNode=null;this.cellOriginNodeType=-1;this.cellOriginNodeValue="";if(isAvailable(eiinfo)){var meta=eiinfo.getBlock(this.blockId).getBlockMeta();var repaintHead=isAvailable(meta);if(repaintHead){this.setData(eiinfo);}else{meta=this.blockData.getBlockMeta();this.blockData=eiinfo.getBlock(this.blockId);this.blockData.setBlockMeta(meta);}
this._clearRowState();if(this.getStyleSetting(STYLE_CONSTANT["INIT_SELECT"])==="true"&&this.blockData.getRows().length>0)
this._currentRow=0;else
this._currentRow=-1;this._clearStyle();}
var grid_table=this.getGridTableNode();var div_node=document.createElement("div");var funcDiv=efgrid.getFuncDiv(grid_table);if(this.isLazyLoad())
div_node.innerHTML=efgrid.divFunc.buildLFuncDiv(this);else
div_node.innerHTML=efgrid.divFunc.buildFuncDiv(this);funcDiv.innerHTML=div_node.firstChild.innerHTML;div_node.innerHTML=efgrid.divCorner.buildCornerDiv(this);var conerDiv=efgrid.getCornerDiv(grid_table);conerDiv.innerHTML=div_node.firstChild.innerHTML;if(this.groupField!=""||this.rowDetailDivID!=""){var groupHtml=efgrid.divData.buildGroupDetailDataDiv(this);var fix_div_node=document.createElement("div");fix_div_node.innerHTML=groupHtml[0];var fixDiv=efgrid.getFixDiv(grid_table);fixDiv.innerHTML=fix_div_node.firstChild.innerHTML;var data_div_node=document.createElement("div");data_div_node.innerHTML=groupHtml[1];var dataDiv=efgrid.getDataDiv(grid_table);dataDiv.innerHTML=data_div_node.firstChild.innerHTML;if(this.needSum()){var sumHtml=efgrid.divSum.buildSumDiv(this);var sum_div_node=document.createElement("div");sum_div_node.innerHTML=sumHtml[0];var sumFixDiv=efgrid.getSumFixDiv(grid_table);sumFixDiv.innerHTML=sum_div_node.firstChild.innerHTML;var sumDataDiv=efgrid.getSumDataDiv(grid_table);var sumData_div_node=document.createElement("div");sumData_div_node.innerHTML=sumHtml[1];sumDataDiv.innerHTML=sumData_div_node.firstChild.innerHTML;}
if(repaintHead){div_node.innerHTML=efgrid.divHead.buildHeadDiv(this);var dataDiv=efgrid.getHeadDiv(grid_table);dataDiv.innerHTML=div_node.firstChild.innerHTML;this._resizeHeader(grid_table);}
this._setScrollStyle();if(grid_table.parentNode.id=="efgrid_config_sub_grid"){var grid=efgrid.getGridObject("efgrid_config_sub_grid");var rowCount=grid.getRowCount();for(var i=0;i<rowCount;i++){var canPersonal=grid.getCellValue(i,0,TYPE_DATA,true);if(canPersonal=="false")
efgrid.setRowDisplayStyle(grid_table.parentNode.id,i,"show");}}else if(typeof efgrid_onGridDisplayReady=="function"){try{efgrid_onGridDisplayReady(grid_table.parentNode);}catch(ex){efgrid.processException(ex,"Callback to efgrid_onGridDisplayReady failed");}}
return;}
var html=efgrid.divData.buildFixDataDiv(this);var fix_div_node=document.createElement("div");fix_div_node.innerHTML=html[0];var fixDiv=efgrid.getFixDiv(grid_table);fixDiv.innerHTML=fix_div_node.firstChild.innerHTML;var data_div_node=document.createElement("div");data_div_node.innerHTML=html[1];var dataDiv=efgrid.getDataDiv(grid_table);dataDiv.innerHTML=data_div_node.firstChild.innerHTML;if(this.needSum()){var sumHtml=efgrid.divSum.buildSumDiv(this);var sum_div_node=document.createElement("div");sum_div_node.innerHTML=sumHtml[0];var sumFixDiv=efgrid.getSumFixDiv(grid_table);sumFixDiv.innerHTML=sum_div_node.firstChild.innerHTML;var sumDataDiv=efgrid.getSumDataDiv(grid_table);var sumData_div_node=document.createElement("div");sumData_div_node.innerHTML=sumHtml[1];sumDataDiv.innerHTML=sumData_div_node.firstChild.innerHTML;}
if(repaintHead){div_node.innerHTML=efgrid.divHead.buildHeadDiv(this);var dataDiv=efgrid.getHeadDiv(grid_table);dataDiv.innerHTML=div_node.firstChild.innerHTML;this._resizeHeader(grid_table);}
this._setScrollStyle();if(grid_table.parentNode.id=="efgrid_config_sub_grid"){var grid=efgrid.getGridObject("efgrid_config_sub_grid");var rowCount=grid.getRowCount();for(var i=0;i<rowCount;i++){var canPersonal=grid.getCellValue(i,0,TYPE_DATA,true);if(canPersonal=="false")
efgrid.setRowDisplayStyle(grid_table.parentNode.id,i,"show");}}else if(typeof efgrid_onGridDisplayReady=="function"){try{efgrid_onGridDisplayReady(grid_table.parentNode);}catch(ex){efgrid.processException(ex,"Callback to efgrid_onGridDisplayReady failed");}}
grid_table.title=grid_table.parentNode.title;}
efgrid.prototype._resizeHeader=function(grid_table){var headTable=efgrid.getHeadDiv(grid_table).firstChild;var dataTable=efgrid.getDataDiv(grid_table).firstChild;var width=parseInt($(dataTable).css("width"));if(!isNaN(width)&&width>0)
$(headTable).css("width",width+18);}
efgrid.prototype.removeRow=function(row_index){if(row_index<0||row_index>=this.getRowCount()){alert("Illegal row index:["+row_index+"]");return;}
this.blockData.getRows().splice(row_index,1);this.rowStatus.splice(row_index,1);this._rowStyle.splice(row_index,1);}
efgrid.prototype.isFixedColumn=function(name)
{for(var i=0;i<this.fixedColumns.length;i++)
{if(this.fixedColumns[i].customSetting.name==name)
{return true;}}
return false;}
efgrid.prototype.getFixedColumnPos=function(name)
{for(var i=0;i<this.fixedColumns.length;i++)
{if(this.fixedColumns[i].customSetting.name==name)
{return i;}}
return-100;}
efgrid.prototype.getDataColumnPos=function(name)
{for(var i=0;i<this.dataColumns.length;i++)
{if(this.dataColumns[i].customSetting.name==name)
{return i;}}
return-100;}
efgrid.prototype.getCustomColumnPos=function(name)
{for(var i=0;i<this.customCols.metas.length;i++)
{if(this.customCols.metas[i].name==name)
{return i;}}
return-100;}
efgrid.prototype.xlsExportValue=function(eiinfo)
{eiinfo.addBlock(this.displayBlock);}
efgrid.prototype.exportData=function(file_type){var eiinfo=new EiInfo();if(this.xlsExportMode=='')
{if(efgrid.config!=undefined&&efgrid.config.XLS_EXPORT_MODE!=undefined&&efgrid.config.XLS_EXPORT_MODE=="value")
{this.xlsExportValue(eiinfo);}
else
{eiinfo.addBlock(this.getBlockData());}}
else if(this.xlsExportMode=='value')
{this.xlsExportValue(eiinfo);}
else
{eiinfo.addBlock(this.getBlockData());}
var export_form=document.forms["_eiExportForm"];if(export_form!=null)
document.body.removeChild(export_form);export_form=document.createElement("form");export_form.setAttribute("id","_eiExportForm");export_form.setAttribute("method","POST");export_form.setAttribute("target","_blank");export_form.setAttribute("action","export");var input_node=document.createElement("input");input_node.setAttribute("type","hidden");input_node.setAttribute("name","_eiExportFlag");input_node.setAttribute("value","true");export_form.appendChild(input_node);input_node=document.createElement("input");input_node.setAttribute("type","hidden");input_node.setAttribute("name","_eiExportFiletype");input_node.setAttribute("value",file_type);export_form.appendChild(input_node);input_node=document.createElement("input");input_node.setAttribute("type","hidden");input_node.setAttribute("name","_eiExportBlockname");input_node.setAttribute("value",this.blockId);export_form.appendChild(input_node);input_node=document.createElement("input");input_node.setAttribute("type","hidden");input_node.setAttribute("name","_eiExportData");input_node.setAttribute("value",EiInfo2Json.prototype.EiInfo2JsonString(eiinfo));export_form.appendChild(input_node);document.body.appendChild(export_form);export_form.submit();}
efgrid.prototype.setToolBarPosition=function(pos){if(pos=="bottom"||pos=="top"){this.toolBarPosition=pos;}}
efgrid.prototype.setIsSubGrid=function(v){this.isSubGrid=v;}

efpage=function(){}
efpage.goFirst=function(grid_id){var grid=efform.getGrid(grid_id);grid.setOffset(0);efpage.submitMetadata(grid);}
efpage.goPrevious=function(grid_id){var grid=efform.getGrid(grid_id);var offset=grid.getOffset();if(offset>0)
grid.setOffset(offset-grid.getLimit());efpage.submitMetadata(grid);}
efpage.goNext=function(grid_id){var grid=efform.getGrid(grid_id);var offset=grid.getOffset();if((offset/grid.getLimit()+1)<grid.getTotalPageCount())
grid.setOffset(offset+grid.getLimit());efpage.submitMetadata(grid);}
efpage.goLast=function(grid_id){var grid=efform.getGrid(grid_id);grid.setOffset((grid.getTotalPageCount()-1)*grid.getLimit());efpage.submitMetadata(grid);}
efpage.limit=function(grid_id){var limit=document.getElementById(grid_id+"_limit");var grid=efform.getGrid(grid_id);if(grid){grid.setOffset(0);grid.setLimit(eval(limit.options[limit.selectedIndex].value));efpage.submitMetadata(grid);}}
efpage.jumpTo=function(grid_id){var jumpto=document.getElementById(grid_id+"_jumpto");var topage=0;try{var validator=ef_validator_regexes["positive_integer"];if(validator.test(jumpto.value))
topage=eval(jumpto.value);}catch(exception){topage=0;}
var grid=efform.getGrid(grid_id);if(grid){if(topage<=0){alert(ef_validator_errormsg["positive_integer"]);}else{grid.setOffset((topage-1)*grid.getLimit());efpage.submitMetadata(grid);}}}
efpage.newRecord=function(grid_id){var grid=efform.getGrid(grid_id);if(grid){var copy=false;if(typeof(efgrid_onAddNewRow)=="function"){try{if(efgrid_onAddNewRow(grid_id)===false)
return;}catch(ex){}}
var selcount=grid.getCheckedRowCount();if(selcount>0)
copy=confirm("["+selcount+"]"+　getI18nMessages("ef.GridRowsCopy","条记录被选中，将它们复制为新记录吗？"));grid.newLine(copy);if(typeof(efgrid_afterAddNewRow)=="function"){try{efgrid_afterAddNewRow(grid_id)}catch(ex){}}
grid.refresh();var grid_table=document.getElementById(grid_id+EF_SPLIT+"grid_table");var dataDiv=efgrid.getDataDiv(grid_table);dataDiv.scrollTop=dataDiv.scrollHeight;var rows=grid.getCheckedRows();for(var i=0;i<rows.length;i++){if(grid.isNewLine(rows[i])){grid.cellOriginNodeType=TYPE_FIX;efgrid._shiftCell(grid,rows[i],0,2);break;}}}}
efpage.setShowCount=function(grid_id){var count_check=document.getElementById(grid_id+"_count");var grid=efform.getGrid(grid_id);grid.setShowCount(count_check.checked);if(!count_check.checked){efpage._disableNavButton(grid,"first");efpage._disableNavButton(grid,"last");}
grid.setCount(-1);}
efpage.submitMetadata=function(grid){efform.clearErrorMessage();var grid_ids=[];grid_ids.push(grid.gridId);efgrid._submitFormData(grid_ids,null,null,grid.queryMethod,false,true,false);}
efpage._disableNavButton=function(grid,button_name){var img_node=document.getElementById(grid.gridId+"_"+button_name);img_node.src=EF_IMAGES_PATH+"efgrid_page_"+button_name+"_disabled.gif";img_node.onclick=efform.nullfunction;img_node.onmouseover=efform.nullfunction;}

efgrid.subcgrid=function(){}
efgrid.subcgrid.show=function(node,gridId){var grid=efgrid.getGridObject(gridId);var idStr=gridId+"_config_sub_div";subDiv=ef.get(idStr);if(null==subDiv||undefined==subDiv){subDiv=document.createElement("div");subDiv.id=idStr;subDiv.className="efwindow";subDiv.style.overflow="hidden";subDiv.style.display="none";var inner_html=[];inner_html.push("<TABLE cellspacing='0' cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;"+getI18nMessages("ef.GridConfig","配置信息")+"&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR ><TD colspan=2>");inner_html.push("<div id=\"efgrid_config_sub_grid\" title='"+getI18nMessages("ef.GridConfig","配置信息")+"' style='overflow:hidden;width:500px;height:200px;'></div>");inner_html.push("</TD></TR>");inner_html.push("<TR >");inner_html.push("<TD class='containerFooter' colspan='2' align='right'>");inner_html.push("<input class='buttonRegular' type='button' value='"+getI18nMessages("ef.GridInit","初始化")+"' onclick='efgrid.subcgrid._default(\""+gridId+"\")' />");inner_html.push("<IMG SRC='"+efico.get("efgrid.blueDivider")+"' >");inner_html.push("<input class='buttonRegular' type='button' value='"+getI18nMessages("ef.GridRefresh","刷新")+"' onclick='efgrid.subcgrid._apply(\""+gridId+"\")' />");inner_html.push("<IMG SRC='"+efico.get("efgrid.blueDivider")+"' >");inner_html.push("<input class='buttonRegular' type='button' value='"+getI18nMessages("ef.GridSave","保存")+"' onclick='efgrid.subcgrid.ensure(\""+gridId+"\")' />");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");subDiv.innerHTML=inner_html.join('');document.body.appendChild(subDiv);}
var info=new EiInfo();var block=new EiBlock("result");info.addBlock(block);var blockMeta=new EiBlockMeta("result");var meta=new EiColumn("name");meta.descName=getI18nMessages("ef.GridColumnEname","列英文名");meta.pos=0;meta.width=120;meta.readonly=true;blockMeta.addMeta(meta);meta=new EiColumn("descName");meta.descName=getI18nMessages("ef.GridColumnName","列中文名");meta.pos=1;meta.width=100;blockMeta.addMeta(meta);meta=new EiColumn("isFix");meta.descName=getI18nMessages("ef.GridFixColumn","固定列")+"<input  type='checkbox' id='testcheck'  onclick=efgrid.subcgrid.setAllFix(this)>";meta.pos=2;meta.width=80;meta.readonly=true;blockMeta.addMeta(meta);meta=new EiColumn("isVisible");meta.descName=getI18nMessages("ef.GridVisibleColumn","可见列")+"<input  type='checkbox' id='testcheck'  onclick=efgrid.subcgrid.setAllVisible(this)>";meta.pos=3;meta.width=80;meta.readonly=true;blockMeta.addMeta(meta);meta=new EiColumn("width");meta.descName=getI18nMessages("ef.GridColumnWidth","列宽");meta.pos=4;meta.width=60;meta.validateType="nonnegative_integer";meta.nullable=false;blockMeta.addMeta(meta);block.setBlockMeta(blockMeta);meta=new EiColumn("canPersonal");meta.descName=getI18nMessages("ef.GridCanPersonal","能否个性化");meta.pos=5;meta.width=60;meta.visible=false;blockMeta.addMeta(meta);block.setBlockMeta(blockMeta);var _fixColCount=grid.getColCount(TYPE_FIX);var _dataColCount=grid.getColCount(TYPE_DATA);var _invisibleColCount=grid.getInvisibleColCount();var i=1;for(i=1;i<_fixColCount;i++){var column=grid.fixedColumns[i];block.setCell(i-1,"name",column.getEname());block.setCell(i-1,"descName",column.getCname());block.setCell(i-1,"isFix","true");block.setCell(i-1,"isVisible","true");block.setCell(i-1,"width",column.getWidth()+"");block.setCell(i-1,"canPersonal",column.canPersonal()+"");}
for(j=0;j<_dataColCount;j++){var column=grid.dataColumns[j];block.setCell(j+i-1,"name",column.getEname());block.setCell(j+i-1,"descName",column.getCname());block.setCell(j+i-1,"isFix","false");block.setCell(j+i-1,"isVisible","true");block.setCell(j+i-1,"width",column.getWidth()+"");block.setCell(j+i-1,"canPersonal",column.canPersonal()+"");}
var cpCount=0;for(h=0;h<_invisibleColCount;h++){var column=grid.invisibleColumns[h];if(!column.canPersonal()){cpCount++;continue;}
block.setCell(h+j+i-1-cpCount,"name",column.getEname());block.setCell(h+j+i-1-cpCount,"descName",column.getCname());block.setCell(h+j+i-1-cpCount,"isFix","false");block.setCell(h+j+i-1-cpCount,"isVisible","false");block.setCell(h+j+i-1-cpCount,"width",column.getWidth()+"");block.setCell(h+j+i-1-cpCount,"canPersonal",column.canPersonal()+"");}
var subGrid=new efgrid("result","efgrid_config_sub_grid");var custom_cols={"index":{},"metas":[]};subGrid.setEnable(true);subGrid.setReadonly(false);subGrid.setAjax(true);subGrid.setAutoDraw(true);subGrid.setServiceName("");subGrid.setQueryMethod("");subGrid.setCustomColumns(custom_cols);subGrid.setData(info);subGrid.setStyle({"navigationBar":"false","operationBar":"false"});subGrid.paint();efwindow.show(node,subDiv.id);}
efgrid.subcgrid.setVisible=function(row_index,col_index,flage){var grid=efgrid.getGridObject("efgrid_config_sub_grid");if(flage){grid.setCellValue(row_index,col_index,"true",TYPE_DATA);grid.refreshCell(row_index,col_index,TYPE_DATA);}else{grid.setCellValue(row_index,col_index,"false",TYPE_DATA);grid.setCellValue(row_index,col_index-1,"false",TYPE_DATA);grid.refreshCell(row_index,col_index,TYPE_DATA);grid.refreshCell(row_index,col_index-1,TYPE_DATA);}}
efgrid.subcgrid.setAllVisible=function(node,gridId){var grid=efgrid.getGridObject("efgrid_config_sub_grid");rowCount=grid.getRowCount();for(var i=0;i<rowCount;i++){data=grid.getRowData(i);if(data["canPersonal"]=="true"){efgrid.subcgrid.setVisible(i,3,node.checked);}}}
efgrid.subcgrid.setAllFix=function(node,gridId){var grid=efgrid.getGridObject("efgrid_config_sub_grid");rowCount=grid.getRowCount();for(var i=0;i<rowCount;i++){data=grid.getRowData(i);if(data["canPersonal"]=="true"){efgrid.subcgrid.setFix(i,2,node.checked);}}}
efgrid.subcgrid.setFix=function(row_index,col_index,flage){var grid=efgrid.getGridObject("efgrid_config_sub_grid");if(flage){grid.setCellValue(row_index,col_index,"true",TYPE_DATA);grid.setCellValue(row_index,col_index+1,"true",TYPE_DATA);grid.refreshCell(row_index,col_index,TYPE_DATA);grid.refreshCell(row_index,col_index+1,TYPE_DATA);}else{grid.setCellValue(row_index,col_index,"false",TYPE_DATA);grid.refreshCell(row_index,col_index,TYPE_DATA);}}
efgrid.subcgrid._default=function(gridId){efwindow.hide();efgrid.subcgrid.deleteInfo(gridId);var grid=efgrid.getGridObject(gridId);grid.customCols=cloneObject(grid.originCustomCols);grid.dataColumnsSQ=null;grid.fixedColumnsSQ=null;grid.setData(grid.eiinfo);grid.paint();}
efgrid.subcgrid._apply=function(gridId){efgrid.subcgrid.ensure(gridId,true,true);}
efgrid.subcgrid.ensure=function(gridId,flage,isHide){var grid=efgrid.getGridObject(gridId);var subGrid=efgrid.getGridObject("efgrid_config_sub_grid");var message=subGrid.validateAll();if(message!=null&&message!=""){alert(message);return;}
if(!isHide)
efwindow.hide();var customCols=grid.customCols;var eiinfo=grid.eiinfo;var metas=grid.blockData.getBlockMeta().getMetas();grid.dataColumnsSQ=[];grid.fixedColumnsSQ=[];rowCount=subGrid.getRowCount();for(i=0;i<rowCount;i++){data=subGrid.getRowData(i);if(eval(data["isFix"])){grid.fixedColumnsSQ.push(data["name"]);}else if(eval(data["isVisible"])){grid.dataColumnsSQ.push(data["name"]);}
efgrid.subcgrid.setPersonalAttr(customCols,metas,data,gridId);}
if(!flage)
efgrid.subcgrid.saveInfo(subGrid.eiinfo,ef.get("efFormEname").value,gridId);grid.setData(eiinfo);grid.paint();}
efgrid.subcgrid.saveInfo=function(eiinfo,formEname,gridId){eiinfo.set("formEname",formEname);eiinfo.set("gridId",gridId);EiCommunicator.send("EDFA60","save",eiinfo,null,false);}
efgrid.subcgrid.setPersonalAttr=function(customCols,meta,data,gridId){var customIndex=customCols["index"]?customCols["index"]:{};var customMeta=customCols["metas"]?customCols["metas"]:[];var index=customIndex[data["name"]];var custom_setting=(index!==undefined)?customMeta[eval(index)]:meta[data["name"]];var grid=efgrid.getGridObject(gridId);var _origin=grid.originCustomCols;var _customIndex=_origin["index"]?_origin["index"]:{};var _customMeta=_origin["metas"]?_origin["metas"]:[];var _index=_customIndex[data["name"]];var _custom_setting=(_index!==undefined)?_customMeta[eval(_index)]:meta[data["name"]];if(custom_setting instanceof EiColumn){custom_setting.visible=eval(data["isVisible"]);custom_setting.primaryKey=eval(data["isFix"]);custom_setting.width=eval(data["width"]);customIndex[data["name"]]=customMeta.length;var _custom={};_custom["name"]=data["name"];_custom["primaryKey"]=eval(data["isFix"]);_custom["visible"]=eval(data["isVisible"]);_custom["width"]=eval(data["width"]);_custom["attr"]={"enable":true};_custom["pos"]=customMeta.length;_custom["descName"]=data["descName"];customMeta[customMeta.length]=_custom;}else if(!!custom_setting){custom_setting["primaryKey"]=eval(data["isFix"]);custom_setting["visible"]=eval(data["isVisible"]);custom_setting["width"]=eval(data["width"]);custom_setting["descName"]=data["descName"];if(data["isFix"]=="false"){custom_setting["displayType"]=_custom_setting["displayType"];}}}
efgrid.subcgrid.deleteInfo=function(gridId){var info=new EiInfo();info.setByNameValue("inqu_status-0-formEname",ef.get("efFormEname").value);info.setByNameValue("inqu_status-0-gridId",gridId);EiCommunicator.send("EDFA60","deleteInfo",info,null,false);}
efgrid.prototype.setPersonalColumns=function(custom_cols,eiinfo){var block=eiinfo.getBlock(this.blockId);var metas=block.getBlockMeta().getMetas();var info=new EiInfo();info.setByNameValue("inqu_status-0-formEname",ef.get("efFormEname").value);info.setByNameValue("inqu_status-0-gridId",this.gridId);EiCommunicator.send("EDFA60","queryInfo",info,null,false);if(null!=ajaxEi){blk=ajaxEi.getBlock("result");rowCount=blk.getRows().length;if(rowCount>0){this.dataColumnsSQ=[];this.fixedColumnsSQ=[];}
for(i=0;i<rowCount;i++){data=blk.getMappedObject(blk.rows[i]);if(eval(data["columnIsfix"])){this.fixedColumnsSQ.push(data["columnEname"]);}else if(eval(data["columnIsvisible"])){this.dataColumnsSQ.push(data["columnEname"]);}
_data={};for(var key in data){switch(key){case"columnEname":_data["name"]=data[key];break;case"columnCname":_data["descName"]=data[key];break;case"columnIsfix":_data["isFix"]=data[key];break;case"columnIsvisible":_data["isVisible"]=data[key];break;case"columnWidth":_data["width"]=data[key];break;default:break;}}
efgrid.subcgrid.setPersonalAttr(custom_cols,metas,_data,this.gridId);}}}
function cloneObject(jsonObj){var buf;if(jsonObj instanceof Array){buf=[];var i=jsonObj.length;while(i--){buf[i]=cloneObject(jsonObj[i]);}
return buf;}else if(jsonObj instanceof Object){buf={};for(var k in jsonObj){buf[k]=cloneObject(jsonObj[k]);}
return buf;}else{return jsonObj;}}

efgrid.prototype.addMenuItem=function(parent,data){var flage=false;for(var key in data){if(key=="imgSrc")
flage=true;}
if(!flage){data["imgSrc"]=efico.get("efgrid.frontBlank");}
this.menuData.addChild(parent,data);}
efgrid.headerRightMenu=function(){}
efgrid.headerRightMenu.show=function(event,data_type){var div_node=event.srcElement||event.target;if(div_node.tagName=="A")
div_node=div_node.parentNode;if(div_node.tagName!="DIV")return;var grid_node=efgrid.getEfGridNode(div_node);if(grid_node){var grid=grid_node.efgrid;if(!grid)return;var menuDiv=null;var menuDiv=ef.get("efgrid_rightMenu_div");if(menuDiv==undefined||menuDiv==null){menuDiv=document.createElement("DIV");menuDiv.className="ef-menu";menuDiv.style.width="60";}
var columnId=div_node.attributes["columnId"].value;menuDiv.innerHTML="<a href='#' efgridid='"+grid.gridId+"' columnId='"+columnId+"' onclick='efgrid.headerRightMenu.onGroupLinkClick(event)'>"+"<img style='border:0;' src='./EF/Images/group-by.gif' >&nbsp;&nbsp;分组</a>";var menu=menuDiv;menu.id="efgrid_rightMenu_div";document.body.appendChild(menu);menu.style.left=event.clientX;menu.style.top=event.clientY;menu.style.display="block";menu.style.visibility="visible";document.body.onclick=function(){if(!!ef.get("efgrid_rightMenu_div"))
ef.get("efgrid_rightMenu_div").style.display="none";}}}
efgrid.headerRightMenu.onGroupLinkClick=function(event)
{var div_node=event.srcElement||event.target;if(div_node.tagName=="IMG")
div_node=div_node.parentNode;if(div_node.tagName!="A")return;var columnId=div_node.attributes["columnId"].value;var gridId=div_node.attributes["efgridid"].value;var grid=efgrid.getGridObject(gridId);grid.groupField=columnId;grid.paint();}
efgrid.rightmenu=function(){}
efgrid.rightmenu.show=function(event,data_type){var div_node=event.srcElement||event.target;if(div_node.tagName=="A")
div_node=div_node.parentNode;if(div_node.tagName!="DIV")return;var grid_node=efgrid.getEfGridNode(div_node);if(grid_node){var grid=grid_node.efgrid;if(!grid)return;if(grid.frontSort==false)return;var not_cell=(div_node.getAttribute("efVal")==null);var row_index=0,col_index=0;if(!not_cell){row_index=div_node.parentNode.parentNode.rowIndex;col_index=div_node.parentNode.cellIndex;var divNode=ef.get("efgrid_rightMenu_div");if(!!divNode){divNode.parentNode.removeChild(divNode);}
var nMenu=new EFMenu(grid.menuData,"rightMenu","rightMenu");nMenu.hoverExpand=function(n){return true;}
nMenu.textClicked=function(node){var data=node.data();var menu_name="gridmenu_"+node.label()+"_onclick";if(eval("typeof "+menu_name)=="function"){eval(menu_name+"(\""+grid.gridId+"\",\""+node._label+"\","+row_index+","+col_index+","+data_type+"); ");}};nMenu._horizental=false;nMenu.render();var menu=nMenu._rootNode._jMenuDIV.get(0);menu.id="efgrid_rightMenu_div";document.body.appendChild(menu);var iframe=$("#efgrid_rightMenu_div").find("iframe").get(0);iframe.style.width=menu.offsetWidth;iframe.style.height=menu.offsetHeight;var redge=document.body.clientWidth-event.clientX;var bedge=document.body.clientHeight-event.clientY;if(redge<menu.offsetWidth)
{menu.style.left=document.body.scrollLeft+event.clientX-menu.offsetWidth}
else
{menu.style.left=document.body.scrollLeft+event.clientX
menu.style.display="block";}
if(bedge<menu.offsetHeight)
{menu.style.top=document.body.scrollTop+event.clientY-menu.offsetHeight}
else
{menu.style.top=document.body.scrollTop+event.clientY
menu.style.display="block";}
document.body.onclick=function(){if(!!ef.get("efgrid_rightMenu_div"))
ef.get("efgrid_rightMenu_div").style.display="none";}}}}
gridmenu_ascending_onclick=function(gridId,label,row_index,col_index,data_type){var grid=efgrid.getGridObject(gridId);var eicolumn=grid.getColumn(col_index,data_type);efutils.sortGird(gridId,eicolumn.getEname(),"true");}
gridmenu_descending_onclick=function(gridId,label,row_index,col_index,data_type){var grid=efgrid.getGridObject(gridId);var eicolumn=grid.getColumn(col_index,data_type);efutils.sortGird(gridId,eicolumn.getEname(),"false");}

efgrid.prototype.isLazyLoad=function(){return this.lazyLoad;}
efgrid.prototype.setLazyLoad=function(v){this.lazyLoad=v;this.enable=false;this.ajax=false;this.readonly=true;this.frontSort=false;}
efgrid.prototype.isUseBuffer=function(){return this.useBuffer;}
efgrid.prototype.setUseBuffer=function(v){this.useBuffer=v;}
efgrid.prototype.getScrollDivNode=function(){return ef.get(this.gridId+EF_SPLIT+"scroll_div");}
efgrid.prototype.setDataFromBuffer=function(offset){if(!isAvailable(offset))
offset=0;offset=parseInt(offset);var limit=this.getLimit();var last_line_num=offset+limit-1;if(this.bufferRows[last_line_num]==null){var page_num=parseInt((last_line_num)/limit);this.loadRowsToBuffer(page_num);}
if(this.bufferRows[offset]==null){var page_num=parseInt((offset)/limit);this.loadRowsToBuffer(page_num);}
var rows=this.getBlockData().getRows();for(i=0;i<limit;i++)
rows[i]=this.bufferRows[offset+i];if(!this.isUseBuffer())
this.bufferRows=[];this.setOffset(offset);}
efgrid.prototype.loadRowsToBuffer=function(page_num){var grid_id=this.gridId;var info=new EiInfo();info.setByNodeObject(document.forms[0]);var block=info.getBlock(this.blockId);if(!isAvailable(block)){block=new EiBlock(this.getBlockData().getBlockMeta());info.addBlock(block);}
block.setAttr(this.getBlockData().getAttr());block.set("orderBy",this.getOrderBy());block.set("offset",page_num*this.getLimit());block.set("limit",this.getLimit());block.set("showCount",false);service_name=this.serviceName;method_name=this.queryMethod;EiCommunicator.send(service_name,method_name,info,{onSuccess:function(eiInfo){var ef_grid=efform.getGrid(grid_id);ef_grid.setBufferRows(page_num,eiInfo);ef_grid.setShowCount(true);},onFail:function(eMsg){alert("Error occured on call service: "+eMsg);}});}
efgrid.prototype.setBufferRows=function(page_num,ei_info){var ei_block=ei_info.getBlock(this.blockId);var offset=page_num*this.getLimit();var rows=ei_block.getRows();for(i=0;i<rows.length;i++){this.bufferRows[offset+i]=rows[i];}}
efgrid.prototype.onScroll=function(){var timestamp=new Date().getTime().toString();if(this.timer==null){ef.debug("[onScroll "+timestamp+"]start timer");this.timer=setInterval('var grid = efgrid.getGridObject( \"'+this.gridId+'\" );grid.onScrollTime();',500);this.scrollLastPos=this.getScrollDivNode().scrollTop;}else{ef.debug("[onScroll "+timestamp+"]do nothing");}}
efgrid.prototype.onScrollTime=function(){var timestamp=new Date().getTime().toString();var curPos=this.getScrollDivNode().scrollTop
if(this.scrollLastPos==curPos){ef.debug("[onScrollTime "+timestamp+"]stop timer, do job");clearInterval(this.timer);this.timer=null;this.setDataFromBuffer(this.calculateOffset());this.refresh();}else{ef.debug("[onScrollTime "+timestamp+"]do nothing");this.scrollLastPos=curPos;}}
efgrid.prototype.calculateOffset=function(){var scrollDiv=this.getScrollDivNode();var scrollHeight=scrollDiv.scrollHeight;var clientHeight=scrollDiv.clientHeight;var scrollTop=scrollDiv.scrollTop;var count=this.getCount();var limit=this.getLimit();if(count<=limit)
return 0;return parseInt((count-limit)*scrollTop/(scrollHeight-clientHeight));}
efgrid.prototype.getScrollTooltip=function(){return(this.calculateOffset()+1)+"/"+this.getCount();}
function wsug(e,str){var oThis=arguments.callee;if(!oThis.sug){var div=document.createElement('div'),css='top:0; left:0; position:absolute; z-index:100; visibility:hidden';div.style.cssText=css;div.setAttribute('style',css);var sug=document.createElement('div'),css='font:normal 12px/16px "宋体"; white-space:nowrap; color:#666; padding:3px; position:absolute; left:0; top:0; z-index:10; background:#f9fdfd; border:1px solid #0aa';sug.style.cssText=css;sug.setAttribute('style',css);var dr=document.createElement('div'),css='position:absolute; top:3px; left:3px; background:#333; filter:alpha(opacity=50); opacity:0.5; z-index:9';dr.style.cssText=css;dr.setAttribute('style',css);var ifr=document.createElement('iframe'),css='position:absolute; left:0; top:0; z-index:8; filter:alpha(opacity=0); opacity:0';ifr.style.cssText=css;ifr.setAttribute('style',css);div.appendChild(ifr);div.appendChild(dr);div.appendChild(sug);div.sug=sug;document.body.appendChild(div);oThis.sug=div;oThis.dr=dr;oThis.ifr=ifr;div=dr=ifr=sug=null;}
if(!str){oThis.sug.style.visibility='hidden';document.onmousemove=null;return;}
var e=e||window.event,obj=oThis.sug,dr=oThis.dr,ifr=oThis.ifr;obj.sug.innerHTML=str;var w=obj.sug.offsetWidth,h=obj.sug.offsetHeight,dw=document.documentElement.clientWidth||document.body.clientWidth;dh=document.documentElement.clientHeight||document.body.clientHeight;var st=document.documentElement.scrollTop||document.body.scrollTop,sl=document.documentElement.scrollLeft||document.body.scrollLeft;var left=e.clientX+sl+17+w<dw+sl&&e.clientX+sl+15||e.clientX+sl-8-w,top=e.clientY+st+17+h<dh+st&&e.clientY+st+17||e.clientY+st-5-h;obj.style.left=left+10+'px';obj.style.top=top+10+'px';dr.style.width=w+'px';dr.style.height=h+'px';ifr.style.width=w+3+'px';ifr.style.height=h+3+'px';obj.style.visibility='visible';document.onmousemove=function(e){var e=e||window.event,st=document.documentElement.scrollTop||document.body.scrollTop,sl=document.documentElement.scrollLeft||document.body.scrollLeft;var left=e.clientX+sl+17+w<dw+sl&&e.clientX+sl+15||e.clientX+sl-8-w,top=e.clientY+st+17+h<dh+st&&e.clientY+st+17||e.clientY+st-5-h;obj.style.left=left+'px';obj.style.top=top+'px';}}

efgrid.prototype.setSumType=function(v){this.sumType=v;}
efgrid.prototype.getSumType=function(v){return this.sumType;}
efgrid.prototype.needSum=function(){if(this.getSumType()!="none")
return true;if(this.getSumType()=="none"){for(i=0;column=this.fixedColumns[i++];){if(column.getSumType()!="none")
return true;}
for(i=0;column=this.dataColumns[i++];){if(column.getSumType()!="none")
return true;}}
return false;}
efgrid.prototype.getRenderSumType=function(){if(this.getSumType()!="none"){return this.getSumType();}else if(this.getSumType()=="none"){var fixStr="";for(i=0;column=this.fixedColumns[i++];){if(column.getSumType()!="none")
fixStr+=column.getSumType();}
var dataStr="";for(i=0;column=this.dataColumns[i++];){if(column.getSumType()!="none")
dataStr+=column.getSumType();}
var str=dataStr+fixStr;if(str.indexOf("all")!=-1)
return"all";if(str.indexOf("page")!=-1&&str.indexOf("total")!=-1)
return"all";if(str.indexOf("page")!=-1&&str.indexOf("total")==-1)
return"page";if(str.indexOf("page")==-1&&str.indexOf("total")!=-1)
return"total";return"none";}}
efgrid.divSum=function(){}
efgrid.divSum.buildSumDiv=function(grid){var html=[];var col_count=grid.getColCount(TYPE_DATA);ef.debug("["+new Date().getTime().toString()+"]build sum row start.");var data_table_node="<TABLE class='tableColumn' id='"+
grid.gridId+EF_SPLIT+"sum_data_table' hidefocus "+"style='table-layout:fixed;' cellspacing = 1 cellpadding = 1 cols="+
(col_count+1)+">";var fix_table_node="<TABLE class='tableColumn' id='"+
grid.gridId+EF_SPLIT+"sum_fix_table' hidefocus "+"style='table-layout:fixed;' cellspacing = 1 cellpadding = 1>";var inner_html=[];inner_html.push("<div style='overflow:hidden;width:");inner_html.push(grid.rightWidth+";height:"+(grid.sumDivHeight)+";overflowX:scroll;overflowY:hidden;'");inner_html.push(" id="+grid.gridId+EF_SPLIT+"sum_data_div >");var fix_inner_html=[];fix_inner_html.push("<div style='overflow:hidden;width:");fix_inner_html.push(grid.leftWidth+";height:"+(grid.sumDivHeight)+";overflowX:hidden;overflowY:hidden;'");fix_inner_html.push(" id="+grid.gridId+EF_SPLIT+"sum_fix_div>");fix_inner_html.push(fix_table_node);inner_html.push(data_table_node);var _rowCount=grid.sumDivRowCount;var _colFixCount=grid.getColCount(TYPE_FIX);var _isEnable=grid.isEnable();var _tr="<TR class=tableRow";for(var i=0;i<_rowCount;i++){inner_html.push(_tr+(i&1)+">");fix_inner_html.push(_tr+(i&1)+">");for(var j=0;j<col_count;j++){var column=grid.dataColumns[j];var renderType=efgrid.divSum.getColRenderType(grid,TYPE_DATA,j);var col_str="<TD ";if(i==0)
col_str+=" width="+column.getWidth()+"";col_str+=">"+efgrid.divSum.genDisplayColumn(grid,i,j,TYPE_DATA,renderType)+"</TD>";inner_html.push(col_str);}
inner_html.push("<TD width=100%><div>&nbsp;</div></TD></TR>");for(var j=0;j<_colFixCount;j++){var column=grid.fixedColumns[j];var renderType=efgrid.divSum.getColRenderType(grid,TYPE_FIX,j);var col_str="<TD ";if(i==0)
col_str+="width="+column.getWidth()+" ";col_str+=" >"+efgrid.divSum.genDisplayColumn(grid,i,j,TYPE_FIX,renderType)+"</TD>";fix_inner_html.push(col_str);}
fix_inner_html.push("</TR>");}
inner_html.push("</TABLE></div>");fix_inner_html.push("</TABLE></div>");html[0]=fix_inner_html.join('');html[1]=inner_html.join('');return html;}
efgrid.divSum.getColRenderType=function(grid,type,col_index){var column=grid.getColumn(col_index,type);if(column.eiColumn.type.toLowerCase()=="c")
return"none";if(grid.getSumType()!="none"&&column.eiColumn.type.toLowerCase()=="n"){return grid.getSumType();}else if(grid.getSumType()=="none"&&column.eiColumn.type.toLowerCase()=="n"){var customRenderType=column.getSumType();return customRenderType;}}
efgrid.divSum._calculatePageSum=function(grid,colEname){var count=grid.getRowCount();var sum=0;var PN=1000000;var validator=ef_validator_regexes["number"];for(var i=0;i<count;i++){var cellValue=grid.blockData.getCell(i,colEname);if(validator.test(cellValue))
sum+=parseFloat(cellValue)*PN;}
return sum/PN;}
efgrid.divSum.genDisplayColumn=function(grid,row_index,col_index,type,renderType){if(type==TYPE_FIX&&col_index==0){if(grid.getRenderSumType()=="all"){if(row_index==0){return"<div efVal=''><img alt='"+getI18nMessages("ef.GridSubTotal","小计")+"' src="+efico.get("efgrid.pageSum")+" /></div>";}else if(row_index==1){return"<div efVal=''><img alt='"+getI18nMessages("ef.GridSumTotal","总计")+"' src="+efico.get("efgrid.totalSum")+" /></div>";}}else if(grid.getRenderSumType()=="total"){return"<div efVal=''><img alt='"+getI18nMessages("ef.GridSumTotal","总计")+"' src="+efico.get("efgrid.totalSum")+" /></div>";}else if(grid.getRenderSumType()=="page"){return"<div efVal=''><img alt='"+getI18nMessages("ef.GridSubTotal","小计")+"' src="+efico.get("efgrid.pageSum")+" /></div>";}}
var column=grid.getColumn(col_index,type);var totalSum=grid.blockData.get("columnTotalSum");var colFmtStr=column.getFormatString();var colEname=column.getEname();if(renderType=="none"){sumValue="";}else if(renderType=="all"){if(row_index==0){sumValue=efgrid.divSum._calculatePageSum(grid,colEname);}else if(row_index==1){sumValue=!!totalSum?(!!totalSum[colEname]?totalSum[colEname]:""):"";}}else if(renderType=="page"){if(row_index==0){sumValue=efgrid.divSum._calculatePageSum(grid,colEname);}else if(row_index==1){sumValue="";}}else if(renderType=="total"){if(row_index==0){sumValue="";if(grid.sumDivRowCount==1)
sumValue=!!totalSum?(!!totalSum[column.getEname()]?totalSum[column.getEname()]:""):"";}else if(row_index==1){sumValue=!!totalSum?(!!totalSum[column.getEname()]?totalSum[column.getEname()]:""):"";}}
var displaySumValue=sumValue;if(colFmtStr!=null&&""!=sumValue){displaySumValue=efformat.formatFloat(sumValue,colFmtStr);}
var div_html="";var div_align=column.getAlign();if(div_align&&div_align!="left")
div_html="<div efVal='' align='"+div_align+"'><b>"+displaySumValue+"</b></div>";else
div_html="<div efVal=''><b>"+displaySumValue+"</b></div>";if(type==TYPE_DATA&&typeof(efgrid_onSumCellDisplayReady)=="function"){var customed=efgrid_onSumCellDisplayReady(div_html,row_index,col_index,sumValue,displaySumValue,grid.gridId,renderType);if(isAvailable(customed))
div_html=customed;}else if(type==TYPE_FIX&&typeof(efgrid_onSumFixCellDisplayReady)=="function"){var customed=efgrid_onSumFixCellDisplayReady(div_html,row_index,col_index,sumValue,displaySumValue,grid.gridId,renderType);if(isAvailable(customed))
div_html=customed;}
return div_html;}
efgrid.divSum.resize=function(grid_node){var sumDataDiv=efgrid.getSumDataDiv(grid_node);var sumDataTable=sumDataDiv.firstChild;var grid=grid_node.efgrid;for(var j=0;j<grid.getColCount(TYPE_DATA);j++){if(sumDataTable.rows.length>0)
sumDataTable.rows[0].cells[j].width=grid.getColumn(j,TYPE_DATA).getWidth();}}
efgrid.getSumDataDiv=function(grid_node){return grid_node.rows[3].cells[1].lastChild;}
efgrid.getSumFixDiv=function(grid_node){return grid_node.rows[3].cells[0].lastChild;}

efregion=function()
{}
efregion.showTitle="yes";efregion.buttonBarPosition="bottom";efregion.showLostRegions=function()
{if(document.forms.length==0)return;var nodes=document.forms.item(0).childNodes;for(var i=0;i<nodes.length;i++)
{if(nodes[i].tagName=="DIV"&&nodes[i].id.indexOf("ef_region_")==0&&(nodes[i].className==""||nodes[i].className=="shadow"))
{efregion.show(nodes[i].id);}}}
efregion.show=function(region_id)
{var region_node=document.getElementById(region_id);if(!region_node)return;if(region_node.className=="shadow")
{if(efregion.showTitle=="yes")
{ef.getNodeById(region_id+"_title").innerText=region_node.title;}
return;}
region_node.className="shadow";region_node.setAttribute("efRegionShow",true);region_node.style.overflow="hidden";ef_div_head=document.createElement("div");ef_div_head.id=region_id+EF_SPLIT+"head";ef_div_head.style.width="100%";var position="bottom";if(efregion.buttonBarPosition=='')
{if(efregion.config!=undefined&&efregion.config.BUTTON_POSITION!=undefined)
position=efregion.config.BUTTON_POSITION;}
else
{position=efregion.buttonBarPosition;}
var innerHtml="<table class='containerHeader' id='containerOuter' cellspacing=1 cellpadding=1 width='100%'>"
+"<tr><td width=100%  >"+"&nbsp;"+
efbutton.newImgButton(region_id+"_toggle_img","efregion.collapse",getI18nMessages("ef.RunRegionFold","区域折叠"),"efregion.toggleShow",region_id)+"&nbsp;<span id='"+region_id+"_title' class='regionTitle' >"+region_node.title+"</span>&nbsp;"+"</td>";if(position=="top")
{innerHtml+="<td  id='"+region_id+EF_SPLIT+"buttonbar"+"'>"+"</td>";}
var showClear=region_node.getAttribute("efRegionShowClear");if(showClear=="true")
{innerHtml+="<td id='"+region_id+"_imgbutton'>"+efbutton.newImgButton(region_id+"_clear_img","efregion.clear",getI18nMessages("ef.RunRegionClear","清除区域数据"),"efform.clearDiv",region_id)+"</td>";}
var showSave=region_node.getAttribute("efRegionSave");if(showSave=="true"){this.region_id=region_id;innerHtml+="<td id='"+region_id+"_imgbutton'>"
+efbutton.newImgButton(region_id+"_save_img","efregion.save","保存查询条件","efregion.saveQueryCondition",region_id)+"</td>";innerHtml+="<td id='"+region_id+"_imgbutton'>"
+efbutton.newImgButton(region_id+"_load_img","efregion.load","读取保存条件","efregion.loadQueryCondition",region_id)+"</td>";}
innerHtml+="</tr></table>";ef_div_head.innerHTML=innerHtml;if(position=="bottom")
{var ef_div_tail=document.createElement("div");ef_div_tail.id=region_id+EF_SPLIT+"tail";ef_div_tail.style.width="100%";var innerHtml="<div id='"+region_id+EF_SPLIT+"buttonbar"+"'></div>";ef_div_tail.innerHTML=innerHtml;region_node.appendChild(ef_div_tail);}
for(var i=0;i<region_node.childNodes.length;i++)
{var node_temp=region_node.childNodes[i];if(node_temp.tagName!="DIV")continue;node_temp.className="containerBody";}
region_node.insertBefore(ef_div_head,region_node.firstChild);if(efregion.showTitle=="no")
{ef_div_head.style.display="none";}
else
{ef_div_head.style.display="";}}
efregion.setTitle=function(sDivId,sTitle)
{ef.get(sDivId+"_title").innerText=sTitle;ef.get(sDivId+"_title").title=sTitle;}
efregion.toggleShow=function(sDivId)
{if(efregion.showTitle=="no")
return;var sDiv=document.getElementById(sDivId);var region_show_status=sDiv.getAttribute("efRegionShow");var display_style_now="none";if((region_show_status==null)||(eval(region_show_status)==true))
{region_show_status=false;display_style_now="none";}
else
{region_show_status=true;display_style_now="block";}
for(var i=0;i<sDiv.childNodes.length;i++)
{var node_temp=sDiv.childNodes[i];if(node_temp==sDiv.firstChild)continue;if(node_temp.tagName!="DIV")continue;node_temp.style.display=display_style_now;}
var node=ef.get(sDivId+"_toggle_img");if(display_style_now=="none")
{sDiv.setAttribute("efRegionShow",false);node.src=efico.get("efregion.expand");}
else
{sDiv.setAttribute("efRegionShow",true);node.src=efico.get("efregion.collapse");}}
efregion.loadQueryCondition=function(region_id){var component=document.getElementById(region_id+"_save_img");if(!component)return;var div_node=efform.getSubDiv("ef_region_load");if((div_node.innerHTML=="&nbsp;"))
{var inner_html=[];inner_html.push("<TABLE cellspacing='0'  cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;请选取查询条件&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR><TD colspan=2>");inner_html.push("<DIV style='overflow:auto;height:200;width:330'><div id = '"+region_id+"_query_condition_master' style='overflow: auto;height:300px;'/></DIV>");inner_html.push("</TD></TR>");inner_html.push("<TR><TD colspan=2>");inner_html.push("<DIV style='overflow:auto;height:200;width:330'><div id = '"+region_id+"_query_condition_detail' style='overflow: auto;height:300px;'/></DIV>");inner_html.push("</TD></TR>");inner_html.push("<TR>");inner_html.push("<TD class='containerFooter' colspan='2' align='center'>");inner_html.push("<INPUT class='inputField' id='table_inqu_status-0-searchSeq' type='hidden' name='table_inqu_status-0-searchSeq' value='' />");inner_html.push("<INPUT class='inputField' id='inqu_status-0-pageNo' type='hidden' name='inqu_status-0-pageNo' value='"+ef.get("efFormEname").value+"' />");inner_html.push("<input class='buttonClass' type='button' value='"+getI18nMessages("ef.Query","查询")+"' onclick='efgrid.submitInqu( \""+region_id+"_query_condition_master\", \"ed\",\"EDSQ02\",\"query\");' />");inner_html.push("&nbsp<IMG SRC='"+efico.get("efgrid.blueDivider")+"' >&nbsp");inner_html.push("<input class='buttonClass' type='button' value='"+getI18nMessages("ef.Load","载入")+"' onclick=\"efregion.efregion_load_onclick('"+region_id+"');\" />");inner_html.push("&nbsp<IMG SRC='"+efico.get("efgrid.blueDivider")+"' >&nbsp");inner_html.push("<input class='buttonClass' type='button' value='"+getI18nMessages("ef.Update","修改")+"' onclick='efgrid.submitForm( \""+region_id+"_query_condition_master\", \"ed\",\"EDSQ02\",\"update\",true);' />");inner_html.push("&nbsp<IMG SRC='"+efico.get("efgrid.blueDivider")+"' >&nbsp");inner_html.push("<input class='buttonClass' type='button' value='"+getI18nMessages("ef.Delete","删除")+"' onclick='efgrid.submitForm( \""+region_id+"_query_condition_master\", \"ed\",\"EDSQ02\",\"delete\",true);' />");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join("");var __ei={"msg":"","msgKey":"ep.2001","detailMsg":"","status":0,"attr":{"efFormStyle":" ","efFormCname":"查询条件名维护","efFormButtonDesc":"{\"msg\":\"\",\"msgKey\":\"\",\"detailMsg\":\"\",\"status\":0,\"blocks\":{\"INQU\":{\"meta\":{\"columns\":[{\"pos\":0,\"name\":\"button_ename\",\"descName\":\"按钮英文名\",\"primaryKey\":true},{\"pos\":1,\"name\":\"button_cname\",\"descName\":\"按钮中文\"},{\"pos\":2,\"name\":\"button_status\",\"descName\":\" \"}]},\"rows\":[[\"QUERY\",\"查询\",\"1\"]]},\"RESULT\":{\"meta\":{\"columns\":[{\"pos\":0,\"name\":\"button_ename\",\"descName\":\"按钮英文名\",\"primaryKey\":true},{\"pos\":1,\"name\":\"button_cname\",\"descName\":\"按钮中文\"},{\"pos\":2,\"name\":\"button_status\",\"descName\":\" \"}]},\"rows\":[[\"LOAD\",\"载入\",\"1\"],[\"UPDATE\",\"修改\",\"1\"],[\"DELETE\",\"删除\",\"1\"]]},\"RESULT1\":{\"meta\":{\"columns\":[{\"pos\":0,\"name\":\"button_ename\",\"descName\":\"按钮英文名\",\"primaryKey\":true},{\"pos\":1,\"name\":\"button_cname\",\"descName\":\"按钮中文\"},{\"pos\":2,\"name\":\"button_status\",\"descName\":\" \"}]},\"rows\":[[\" \",\" \",\"1\"]]}}}","efCurButtonEname":null,"efFormPopup":null,"efFormEname":"EDSQ02","efCurFormEname":"EDSQ02","packageName":null,"serviceName":"EDSQ02","methodName":"initLoad","efFormLoadPath":"/ED/SQ/EDSQ02.jsp"},"blocks":{"result1":{"meta":{"columns":[{"pos":0,"name":"searchSeq","descName":"查询名索引号","type":"N","fieldLength":8,"primaryKey":true},{"pos":1,"name":"elementId","descName":"元素ID","primaryKey":true},{"pos":2,"name":"elementValue","descName":"元素值"}]},"rows":[["0"," "," "]]},"result":{"meta":{"columns":[{"pos":0,"name":"searchSeq","descName":"查询名索引号","type":"N","fieldLength":8,"primaryKey":true},{"pos":1,"name":"userId","descName":"用户标识"},{"pos":2,"name":"pageNo","descName":"页面号"},{"pos":3,"name":"searchName","descName":"查询名称"}]},"rows":[["0"," "," "," "]]}}};var __eiInfo=Json2EiInfo.prototype.parseJsonObject(__ei);var __grid_result=new efgrid("result",region_id+"_query_condition_master");var custom_cols={"index":{"userId":0,"pageNo":1,"searchName":2,"searchSeq":3},"metas":[{"name":"userId","descName":"用户名","primaryKey":false,"readonly":true,"sumType":"none","sort":true,"attr":{"enable":true},"pos":0},{"name":"pageNo","descName":"页面号","primaryKey":false,"readonly":true,"sumType":"none","sort":true,"attr":{"enable":true},"pos":1},{"name":"searchName","descName":"查询条件名","primaryKey":false,"nullable":false,"sumType":"none","sort":true,"attr":{"enable":true},"pos":2},{"name":"searchSeq","descName":"查询名索引号","primaryKey":false,"visible":false,"sumType":"none","attr":{"enable":true},"pos":3}],"groupIndex":{},"columnGroups":[]};__grid_result.onRowClicked=function(grid_id,row_index){if(grid_id==region_id+"_query_condition_master")
{grid=efgrid.getGridObject(region_id+"_query_condition_master");var searchSeq=grid.getCellValue(row_index,0,TYPE_DATA,true);ef.get("table_inqu_status-0-searchSeq").value=searchSeq;efgrid.submitInqu(region_id+"_query_condition_detail","ED","EDSQ02","getSearchInfo");}}
__grid_result.setEnable(true);__grid_result.setReadonly(false);__grid_result.setAjax(true);__grid_result.setAutoDraw('no');__grid_result.setServiceName("");__grid_result.setQueryMethod("query");__grid_result.setCustomColumns(custom_cols);__grid_result.setData(__eiInfo);__grid_result.setStyle({"operationBar":"false","toolBar":"true"});__grid_result.paint();var __grid_result1=new efgrid("result1",region_id+"_query_condition_detail");var custom_cols={"index":{"elementId":0,"elementValue":1},"metas":[{"name":"elementId","descName":"元素ID","primaryKey":false,"readonly":true,"width":200,"sumType":"none","attr":{"enable":true},"pos":0},{"name":"elementValue","descName":"元素值","primaryKey":false,"readonly":true,"sumType":"none","attr":{"enable":true},"pos":1}],"groupIndex":{},"columnGroups":[]};__grid_result1.setEnable(false);__grid_result1.setReadonly(false);__grid_result1.setAjax(true);__grid_result1.setAutoDraw('no');__grid_result1.setServiceName("");__grid_result1.setQueryMethod("getSearchInfo");__grid_result1.setCustomColumns(custom_cols);__grid_result1.setData(__eiInfo);__grid_result1.setStyle({"operationBar":"false","toolBar":"true"});__grid_result1.paint();efgrid.submitInqu(region_id+"_query_condition_master","ed","EDSQ02","query");}
efwindow.show(component,div_node.id,"fixed");}
efregion.saveQueryCondition=function(region_id){var component=document.getElementById(region_id+"_save_img");if(!component)return;var div_node=efform.getSubDiv("ef_region_save");if((div_node.innerHTML=="&nbsp;"))
{var inner_html=[];inner_html.push("<TABLE cellspacing='0'  cellpadding='1'>");inner_html.push("<TR>");inner_html.push("<TD align='left' id='containerOuter'>&nbsp;请输入查询条件&nbsp;</TD>");inner_html.push("<TD align='right' id='containerOuter'><IMG src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></TD>");inner_html.push("</TR>");inner_html.push("<TR><TD colspan=2>");inner_html.push("<DIV style='overflow:auto;height:25;width:150'><input type='text' id='"+region_id+"_iplat4jSName' name='"+region_id+"iplat4jSName' value='' class='inputField' /></DIV>");inner_html.push("</TD></TR>");inner_html.push("<TR>");inner_html.push("<TD class='containerFooter' colspan='2' align='center'>");inner_html.push("<input class='buttonClass' type='button' value='"+getI18nMessages("ef.Save","保存")+"' onclick=\"efregion.efregion_save_onclick('"+region_id+"');\" />");inner_html.push("</TD></TR>");inner_html.push("</TABLE>");div_node.innerHTML=inner_html.join("");}
efwindow.show(component,div_node.id,"fixed");}
efregion.efregion_save_onclick=function(region_id)
{var iplat4jSName=document.getElementById(region_id+"_iplat4jSName").value;if(iplat4jSName.trim()=='')
{alert("请输入查询条件名");return;}
var info=new EiInfo();info.setByNode(region_id);info.set("iplat4jSName",iplat4jSName);var efFormEname=ef.get("efFormEname").value;info.set("efFormEname",efFormEname);EiCommunicator.send("EDSQ01","saveQuery",info,efregion.efregion_save_callback,false,true);efwindow.hide();}
efregion.efregion_save_callback={onSuccess:function(eiInfo){var info=eiInfo.get("info");if(info=='update')
alert("修改查询条件成功");else if(info=='insert')
alert("新增查询条件成功");},onFail:function(eMsg){alert("failure");}}
efregion.efregion_load_onclick=function(region_id){var grid=efgrid.getGridObject(region_id+"_query_condition_master");var num=grid.getCheckedRowCount();if(num>1){alert("只能选择一个查询条件");}else if(num<1){alert("请选择查询条件");}else if(num==1){var rows=grid.getCheckedRows();var searchSeq=grid.getCellValue(rows[0],0,TYPE_DATA,true);var info=new EiInfo();info.set("searchSeq",searchSeq);efregion.efregion_load_callback.region_id=region_id;EiCommunicator.send("EDSQ02","getSearch",info,efregion.efregion_load_callback,false,true);efwindow.hide();}}
efregion.efregion_load_callback={onSuccess:function(eiInfo){efform.fillDiv(this.region_id,eiInfo,true);},onFail:function(eMsg){alert("failure");}}

eftab=function(){}
eftab.show=function(tab_id,action){var jqTab=$("#"+tab_id);jqTab.get(0).setAttribute("Callback",action);jqTab.get(0).setAttribute("CallbackIndex","0");var _scroll=(jqTab.attr("scroll")=="true");var _tabWidthSame=(jqTab.attr("tabWidthSame")=="true");var tabDivs=$(">div",jqTab);var tabs=[];for(var i=0;i<tabDivs.length;i++){var tabDiv=tabDivs[i];var _id=$(tabDiv).attr("id");var _title=$(tabDiv).attr("title");var _frmSrc=$(tabDiv).attr("eftabSrc");var _html=$(tabDiv).html();var _newFrame=$(tabDiv).attr("efRemember");var _share=(_newFrame=="yes");var _height=$(tabDiv).attr("eftabHeight");var _switchAffterCallBack=$(tabDiv).attr("switchAffterCallBack");if(_height==null){_height="100%";}
var jsElems=$(">script",tabDiv);var item={switchAffterCallBack:_switchAffterCallBack,id:_id,title:_title,closed:false,icon:'',domNode:tabDiv,load:_frmSrc,height:_height,share:_share,callback:function(item){return eftab.click(tab_id,item);}};item.index=i;tabs.push(item);$(tabDiv).remove();}
if(jqTab.width()!=0&&tabDivs.length*80>jqTab.width()){_scroll=true;}
var width=jqTab.attr("eftabWidth");if(width==null){if(_scroll){width=jqTab.width();}else{width="100%";}}
var tabCtl=jqTab.Tab({items:tabs,width:width,tabcontentWidth:width,tabScroll:_scroll,tabWidth:80,tabHeight:25,tabScrollWidth:10,tabClassDiv:'benma_ui_tab',tabClass:'benma_ui_tab',tabClassClose:'tab_close',tabClassOn:'tab_item',tabClassInner:'tab_item',tabClassInnerLeft:'tab_item1',tabClassInnerMiddle:'tab_item2',tabClassInnerRight:'tab_item3',tabClassText:'text',tabClassScrollLeft:'scroll-left',tabClassScrollRight:'scroll-right',tabWidthSame:_tabWidthSame});tabCtl.setDivNode(jqTab);jqTab.get(0).setAttribute("TabCtrl",tabCtl);jqTab.get(0).setAttribute("CallbackIndex","1");return tabCtl;};eftab.click=function(tab_id,item){var jqTab=$("#"+tab_id);var jqDom=jqTab.get(0);var prevNode=jqDom.NowNode;jqDom.setAttribute("PrevNode",prevNode);jqDom.setAttribute("NowNode",item);var cf=jqDom.getAttribute("Callback");var index=jqDom.getAttribute("CallbackIndex");if(index=="0")
return;if(cf!=null){try{var func=eval(cf)(prevNode==null?-1:prevNode.index,item.index);if(func!=false){eftab_getSrc(item,jqDom);}
return func;}catch(exception){eftab_getSrc(item,jqDom);var sError="";for(var i in exception)
sError+=i+":"+exception[i]+"\n";}}else{eftab_getSrc(item,jqDom);}}
function eftab_getSrc(item,jqDom){if((!!item.load&&item.load.length>0)&&!item.share){var tab_item=$("#"+item.id,jqDom);var _src=tab_item.attr("eftabSrc");if(!!_src){item.load=_src;}}}
function eftab_hidden(tab_id,index){var jqTab=$("#"+tab_id);var tabCtrl=jqTab.get(0).TabCtrl;return tabCtrl.hideItem(index);}
function eftab_show(tab_id,index){var jqTab=$("#"+tab_id);var tabCtrl=jqTab.get(0).TabCtrl;return tabCtrl.showItem(index);}
function eftab_current(tab_id){return efRoundIframeGetDestinationIndex(tab_id);}
function efRoundDivTabChange_option(tab_id,index,action){var dstIdx=efRoundIframeGetDestinationIndex(tab_id);var jqTab=$("#"+tab_id);var tabCtrl=jqTab.get(0).TabCtrl;if(action!=null)
if(action(dstIdx,index)==false)
return;tabCtrl.clickTab(index,true);}
function efRoundIframechange_option(tab_id,index,action){var dstIdx=efRoundIframeGetDestinationIndex(tab_id);var jqTab=$("#"+tab_id);var tabCtrl=jqTab.get(0).TabCtrl;if(action!=null)
if(action(dstIdx,index)==false)
return;setEfTabSrcWithIframe(jqTab,index);tabCtrl.clickTab(index,true);}
function setEfTabSrcWithIframe(jqTab,index){var tabCtrl=jqTab.get(0).TabCtrl;var _item=tabCtrl.getItemWithNum(index);if((_item.load!=null||_item.load.length>0)&&!_item.share){var _src=getEfTabDivAttr(jqTab,_item.id,"eftabSrc");if(!!_src){_item.load=_src;}}}
function getEfTabDivAttr(jqTab,_id,_attr){var tab_item=$("#"+_id,jqTab);return tab_item.attr(_attr);}
function efRoundIframeGetIframe(tab_id,currentIndex){var jqTab=$("#"+tab_id);var tabCtrl=jqTab.get(0).TabCtrl;return tabCtrl.getIframe(currentIndex);}
function efRoundIframeGetSourceIndex(tab_id){var jqDom=$("#"+tab_id).get(0);var tabCtrl=jqTab.get(0).PrevNode;if(prevNode==null)
return-1;return prevNode.index;}
function efRoundIframeGetDestinationIndex(tab_id){var jqDom=$("#"+tab_id).get(0);var prevNode=jqDom.NowNode;return prevNode.index;}
function eftab_ReloadIframeWithoutNum(tab_id,_num,_path){var jqTab=$("#"+tab_id);var tabCtrl=jqTab.get(0).TabCtrl;var _item=tabCtrl.getItemWithNum(_num);_item.load=_path;}
function eftab_ReloadIframeWithId(tab_id,_id,_path){var jqTab=$("#"+tab_id);var tabCtrl=jqTab.get(0).TabCtrl;var _item=tabCtrl.getItemWithId(_id);_item.load=_path;}

function EFTreeTemplate(sModel,sLabel,sText){this._model=sModel;this._label=sLabel;this._text=sText;this._depth=null;}
EFTreeTemplate.prototype.depth=function(v){if(v===undefined){return this._depth;}
this._depth=v;}
EFTreeTemplate.prototype.getNode=function(lb){var l=new Array();var tlb=lb;l.push(tlb);do{var p=this._model.getParent(tlb);if(p!=null){tlb=p.label;l.push(p.label);}}while(p!=null)
var nd=l.pop();var node=this._rootNode;while(nd!=undefined){node=node.getChildNode(nd);nd=l.pop();}
return node;}
EFTreeTemplate.prototype.render=function(){}
function EFTTNode(sTree,sParent,sLabel,sText,sLeaf,sData){this._tree=sTree;this._parent=sParent;this._label=sLabel;this._text=sText;this._leaf=sLeaf;this._data=sData;this._opened=false;this._childNodes=[];this._status=-1;}
EFTTNode.prototype.label=function(v){if(v===undefined){return this._label;}
this._label=v;}
EFTTNode.prototype.text=function(v){if(v===undefined){return this._text;}
this._text=v;}
EFTTNode.prototype.leaf=function(v){if(v===undefined){return this._leaf;}
this._leaf=v;}
EFTTNode.prototype.data=function(v){if(v===undefined){return this._data;}
this._data=v;}
EFTTNode.prototype.open=function(v){if(v===undefined){return this._opened;}
this._opened=v;}
EFTTNode.prototype.status=function(){return this._status;}
EFTTNode.prototype.parent=function(){return this._parent;}
EFTTNode.prototype.tree=function(){return this._tree;}
EFTTNode.prototype.top=function(){return(this._parent==null);}
EFTTNode.prototype.virtual=function(){return(this._label==null);}
EFTTNode.prototype.depth=function(){var depth=0;var treeItem=this;while(!treeItem.top()){depth++;treeItem=treeItem._parent;}
return depth;}
EFTTNode.prototype.addChild=function(sNode){this._childNodes.push(sNode);}
EFTTNode.prototype.getChildNodes=function(){var td=this._tree.depth();if(td!=null&&td<this.depth()+1){return new Array();}
this.load();return this._childNodes;}
EFTTNode.prototype.getChildNode=function(lb){var children=this.getChildNodes();for(var i=0;i<children.length;i++){var child=children[i];if(child.label()===lb){return child;}}
return null;}
EFTTNode.prototype.load=function(force){if(force||this._status===-1){this._status=0;this._childNodes=new Array();var children=new Array();if(this._label===null){children=this.tree()._model.getTopNodes(this.tree());}else{children=this.tree()._model.getChildren(this._label,this.tree());}
for(var i=0;i<children.length;i++){var sub=this._createChildNode(children[i]);this._childNodes.push(sub);}
this._status=1;}}
EFTTNode.prototype._createChildNode=function(child){alert("_createChildNode NOT implemented");}
EFTTNode.prototype.expand=function(){this._opened=true;this.load();this.render();}
EFTTNode.prototype.collapse=function(){this._opened=false;this.render();}
EFTTNode.prototype.render=function(){alert("render NOT implemented");}

function treeModel(){this.listerners=[];}
treeModel.prototype.getTopNodes=function(){}
treeModel.prototype.getChildren=function(p){}
treeModel.prototype.getParent=function(p){alert('getParent NOT implemented');}
treeModel.prototype.addListener=function(l){this.listerners.push(l);}
treeModel.prototype.notify=function(e,param){for(var i in this.listerners){var l=this.listerners[i];l.accept(e,param);}}
function eiTreeModel(s){this.queryBlockName="inqu_status";this.resultBlockName="result";this.methodQuery="query";this.keyOffset="offset";this.keyCount="limit";this.base=treeModel;this.base();this.service=s;this._cache={};}
eiTreeModel.prototype=new treeModel();eiTreeModel.prototype.getTopNodes=function(tree){return this.getChildren("$",tree);}
eiTreeModel.prototype.getChildren=function(p,tree){var cached=this._cache[p];if(isAvailable(cached)){return cached;}
var host=this;var queryCallBack={onSuccess:function(ei){var blocks=ei.getBlocks();for(var name in blocks){var _block=blocks[name];var rows=_block.getMappedRows();host._cache[name]=rows;}},onFail:function(xmlR,status,e){alert("ERROR");}};var queryMeta=new EiBlockMeta(this.queryBlockName);var column=new EiColumn("node");column.pos=0;queryMeta.addMeta(column);var queryBlock=new EiBlock(queryMeta);queryBlock.addRow([p+""]);var blocka=new EiBlock(this.resultBlockName);var eiinfo=new EiInfo();if(tree&&tree.param!=null)
{eiinfo.extAttr.param=tree.param;}
eiinfo.addBlock(queryBlock);eiinfo.addBlock(blocka);EiCommunicator.send(this.service,this.methodQuery,eiinfo,queryCallBack,false);var ret=this._cache[p];if(isAvailable(ret)){delete this._cache[p];return ret;}else{return new Array();}}
eiTreeModel.prototype.getParent=function(p){var ret=null;var host=this;var queryCallBack={onSuccess:function(ei){var block=ei.getBlock(p);if(block!=null){var rows=block.getMappedRows();ret=rows[0];}},onFail:function(msg){alert("ERROR");}};var queryMeta=new EiBlockMeta(this.queryBlockName);var column=new EiColumn("node");column.pos=0;queryMeta.addMeta(column);var queryBlock=new EiBlock(queryMeta);queryBlock.addRow([p+""]);var blocka=new EiBlock(this.resultBlockName);var eiinfo=new EiInfo();eiinfo.addBlock(queryBlock);eiinfo.addBlock(blocka);EiCommunicator.send(this.service,"queryParent",eiinfo,queryCallBack,false);return ret;}
function tagTreeModel(loc){this.resultBlockName="result";this.base=treeModel;this.base();this._loc=loc;this.idK="label";this.parentK="parent";this._parentC={};}
tagTreeModel.prototype=new treeModel();tagTreeModel.prototype.getTopNodes=function(){return this.getChildren("$");}
tagTreeModel.prototype.getChildren=function(p){var ret=new Array();var host=this;var queryCallBack={onSuccess:function(ei){var _block=ei.getBlock(p);if(_block!=null){ret=_block.getMappedRows();}},onFail:function(msg){alert("ERROR");}};EiCommunicator.$send(this._loc+"&PARTNUMBER="+p,"",queryCallBack);return ret;}
tagTreeModel.prototype.getParent=function(p){var host=this;var cached=this._parentC[p];if(isAvailable(cached)){return cached;}
var queryCallBack={onSuccess:function(ei){var blocks=ei.getBlocks();for(var _n in blocks){var _block=blocks[_n];var rows=_block.getMappedRows();if(isAvailable(rows[0])){host._parentC[_n]=rows[0];}}},onFail:function(msg){alert("ERROR");}};EiCommunicator.$send(this._loc+"&PARENT=true&PARTNUMBER="+p,"",queryCallBack);return this._parentC[p];}
function xmlTreeModel(s){this.base=treeModel;this.base();this.nodes={};this.parseXML(s);}
xmlTreeModel.prototype=new treeModel();xmlTreeModel.prototype.getTopNodes=function(){return this.getChildren("");}
xmlTreeModel.prototype.getChildren=function(p){var cached=this.nodes[p];if(isAvailable(cached)){return cached;}
var em=new Array();return em;}
xmlTreeModel.prototype.addChild=function(p,node){var children=this.getChildren(p);children.push(node);this.nodes[p]=children;}
xmlTreeModel.prototype.parseXML=function(sSrc){var oXmlDoc=null;if(window.ActiveXObject){oXmlDoc=new ActiveXObject("Microsoft.XMLDOM");oXmlDoc.async="true";oXmlDoc.loadXML(sSrc);}else{var parser=new DOMParser();oXmlDoc=parser.parseFromString(sSrc,"text/xml");}
var root=oXmlDoc.documentElement;this._parseXMLNode("",root);}
xmlTreeModel.prototype._parseXMLNode=function(p,oNode){var cs=oNode.childNodes;var len=cs.length;for(var i=0;i<len;i++){var oNode=cs[i];if(oNode.tagName=="tree"){var tNode={};for(var k=0;k<oNode.attributes.length;k++){var l=oNode.attributes[k].nodeName;var v=oNode.attributes[k].nodeValue;tNode[l]=v;}
this.addChild(p,tNode);this._parseXMLNode(tNode["label"],oNode);}}}
function absTreeModel(){this.base=treeModel;this.base();this.childs={};this.nodes={};}
absTreeModel.prototype=new treeModel();absTreeModel.prototype.getTopNodes=function(){return this.getChildren("");}
absTreeModel.prototype.getChildren=function(p){var cached=this.childs[p];if(isAvailable(cached)){return cached;}
var em=new Array();return em;}
absTreeModel.prototype.getParent=function(m){var nd=this.nodes[m];if(nd!=null){var p=this.nodes[nd.parent];return p;}
return null;}
absTreeModel.prototype.addChild=function(p,node){var children=this.getChildren(p);children.push(node);this.childs[p]=children;this.nodes[node.label]=node;}

EFMenuImagePath=EF_IMAGES_PATH;var EFMenuConfig={nextIcon:efico.get("efmenu.arrowRight"),disabledNextIcon:efico.get("efmenu.arrowRight2"),downIcon:efico.get("efmenu.arrowDown"),delay:200,useHover:false,onTextClick:false};function EFMenu(sModel,sLabel,sText){this.base=EFTreeTemplate;this.base(sModel,sLabel,sText);this._horizental=true;this._width=100;this._rootNode=null;this._selected=null;this._showTimeout=null;this._hideTimeout=null;this.textClicked=null;this.hoverExpand=null;this.menuItemClicked=null;}
EFMenu.prototype=new EFTreeTemplate();EFMenu.prototype.width=function(v){if(v==undefined){return this._width;}
this._width=v;}
EFMenu.prototype.render=function(){if(this._rootNode==null){this._rootNode=new EFMenuItem(this,null,null,this._text,false,null);this._rootNode._opened=true;}
return this._rootNode._renderSubMenu(this._horizental);}
EFMenu.prototype.setSelected=function(node){this._selected=node;}
function EFMenuItem(sTree,sParent,sLabel,sText,sLeaf,sData){this.base=EFTTNode;this.base(sTree,sParent,sLabel,sText,sLeaf,sData);this._horizental=false;this._userHover=this._getUserHover();this._jItemDIV=null;this._jMenuDIV=null;this._needRender=true;}
EFMenuItem.prototype=new EFTTNode();EFMenuItem.prototype._getUserHover=function(){var menu=this.tree();if(menu.hoverExpand!=null){var u=menu.hoverExpand(this);if(isAvailable(u)){return u;}}
return EFMenuConfig.useHover;}
EFMenuItem.prototype._onTextClick=function(){var menu=this.tree();if(menu.menuItemClicked!=null){var c=menu.menuItemClicked(this);if(isAvailable(c)){return c;}}
return EFMenuConfig.onTextClick;}
EFMenuItem.prototype.onTextClicked=function(){var menu=this.tree();if(this._parent._parent==null)
{if(menu.menuItemClicked!=null){menu.menuItemClicked.removeClass('ef-munu-bar-onTextClicked');}
$(this).removeClass();$(this._jItemDIV).addClass('ef-munu-bar-onTextClicked');menu.menuItemClicked=this._jItemDIV;}
else if(this.leaf()){var rootNode=this._parent;while(rootNode._parent._parent!=null){rootNode=rootNode._parent;}
if(menu.menuItemClicked!=null){menu.menuItemClicked.removeClass('ef-munu-bar-onTextClicked');}
$(rootNode).removeClass();$(rootNode._jItemDIV).addClass('ef-munu-bar-onTextClicked');menu.menuItemClicked=rootNode._jItemDIV;}
if(!this._userHover){if(this._opened){this.collapse();}else{this.expand();}}
if(menu.textClicked!=null){menu.textClicked(this);}}
EFMenuItem.prototype.onMouseOver=function(){var menu=this.tree();menu.setSelected(this);if(this._userHover){this.expand();}}
EFMenuItem.prototype.onMouseOut=function(){var menu=this.tree();if(this._userHover){var host=menu._rootNode;menu._hideTimeout=window.setTimeout(function(){host.collapse();},EFMenuConfig.delay);}}
EFMenuItem.prototype.collapse=function(){this._needRender=this._opened;this._hidesubs();if(this._label!=null){this._opened=false;this.render();}}
EFMenuItem.prototype.expand=function(){var menu=this.tree();if(menu._showTimeout!=null)window.clearTimeout(menu._showTimeout);if(menu._hideTimeout!=null)window.clearTimeout(menu._hideTimeout);this.load();if(this._label!=null){if(this._parent instanceof EFMenuItem)
this._parent._hidesubs();this._needRender=this._opened?false:true;this._opened=true;this.render();}}
EFMenuItem.prototype._hidesubs=function(){for(var i=0;i<this._childNodes.length;i++){var _node=this._childNodes[i];_node.collapse();}}
EFMenuItem.prototype._createChildNode=function(child){return new EFMenuItem(this.tree(),this,child['label'],child['text'],child['leaf']=="1",child);}
EFMenuItem.prototype._renderSubMenu=function(hor){var horizental=hor|false;var menu=this.tree();var children=this.getChildNodes();if(children.length>0){if(this._jMenuDIV==null){this._jMenuDIV=$("<div>");if(horizental){this._jMenuDIV.toggleClass("ef-menu-bar");}else{this._jMenuDIV.toggleClass("ef-menu");}
this._jMenuDIV.css("visibility","visible");for(var i=0;i<children.length;i++){var child=children[i];child._horizental=horizental;this._jMenuDIV.append(child.render());}}
return this._jMenuDIV.get(0);}else{return null;}}
EFMenuItem.prototype.render=function(){var renderAsLeaf=this._leaf;if(this._jItemDIV==null){this._jItemDIV=$("<a href='#'/>");var instance=this;this._jItemDIV.click(function(){instance.onTextClicked();});this._jItemDIV.mouseover(function(){instance.onMouseOver();});this._jItemDIV.mouseout(function(){instance.onMouseOut();});var imgSrc;if(!!this.data()&&!!this.data()["imgSrc"])
imgSrc="<img style='border:0' src="+this.data()["imgSrc"]+">&nbsp;&nbsp;";if(renderAsLeaf){this._jItemDIV.html((!!imgSrc?imgSrc:"")+this._text);}else{if(this._horizental){var _h=this._text+"<img class='arrow' src=\""+EFMenuConfig.downIcon+"\" align='absmiddle'>";this._jItemDIV.html(_h);}else{var _h="<img class='arrow' src=\""+EFMenuConfig.nextIcon+"\" align='absmiddle'>"+
(!!imgSrc?imgSrc:"")+this._text;this._jItemDIV.html(_h);}}}
if(renderAsLeaf||!this._needRender){return this._jItemDIV.get(0);}
if(this._opened){var divElement=this._renderSubMenu();if(divElement!=null){document.body.appendChild(divElement);domLayout.postionWithRel(divElement,this._jItemDIV.get(0),!this._horizental);}}else{if(this._jMenuDIV!=null){var divElement=this._jMenuDIV.get(0);if(divElement.parentNode!=null){divElement.parentNode.removeChild(divElement);}}}
return this._jItemDIV.get(0);}

EFTreeImagePath=EF_IMAGES_PATH;var EFTreeConfig={rootIcon:efico.get("eftree.folderIcon"),openRootIcon:efico.get("eftree.openFolderIcon"),folderIcon:efico.get("eftree.folderIcon"),openFolderIcon:efico.get("eftree.openFolderIcon"),fileIcon:efico.get("eftree.file"),iIcon:efico.get("eftree.treeImgI"),lIcon:efico.get("eftree.treeImgL"),lMinusIcon:efico.get("eftree.treeImgLminus"),lPlusIcon:efico.get("eftree.treeImgLplus"),tIcon:efico.get("eftree.treeImgT"),tMinusIcon:efico.get("eftree.treeImgTminus"),tPlusIcon:efico.get("eftree.treeImgTplus"),blankIcon:efico.get("eftree.blank")};function EFTree(sModel,sLabel,sText){this.base=EFTreeTemplate;this.base(sModel,sLabel,sText);this._status=0;this._current=null;this._selected=new Object();this.hideRoot=false;this.emptyNodeAsLeaf=false;this.activeEmptyJudger=false;this.nodeInitializer=null;this.initialExpandDepth=null;this.clickableNodeNames=true;this.param=null;this._rootNode=new EFTreeNode(this,null,null,this._text,false,null);this._rootNode.active(false);this._target=this._rootNode;this._jTreeDiv=document.createElement("div");}
EFTree.prototype=new EFTreeTemplate();EFTree.prototype.render=function(){this._jTreeDiv.innerHMTL='';this._target.needRender(true);var rootDom=this._target.render();if(this.hideRoot){this._rootNode.expand();this._jTreeDiv.appendChild(this._target._jTreeChildrenDiv);}else{this._jTreeDiv.appendChild(rootDom);}
if(this.initialExpandDepth!=null&&this.initialExpandDepth>0)
this.autoExpandTree();return this._jTreeDiv;}
EFTree.prototype.autoExpandTree=function(){if(!this.hideRoot){this._rootNode.expand();}
if(this.initialExpandDepth>1){this._rootNode.expandIterative();}}
EFTree.prototype.target=function(t){if(t===undefined){return this._target;}
this._target=t;}
EFTree.prototype.forward=function(lb){var t=this._rootNode.getChildNode(lb);if(t!=null){this._target=t;this.render();}}
EFTree.prototype.backward=function(){var p=this._target.parent();if(p!=null){this._target=p;this.render();}}
EFTree.prototype.status=function(v){if(v===undefined){return this._status;}
this._status=v;}
EFTree.prototype.reload=function(m){this._model=m;this._rootNode.reload();}
EFTree.prototype.rootNode=function(){return this._rootNode;}
EFTree.prototype.expand=function(){this._rootNode.expand();}
EFTree.prototype.collapse=function(){this._rootNode.collapse();}
EFTree.prototype.expandNode=function(lb){var _n=this.getNode(lb);var _t=_n;while(_t!=null){_t.expand();_t=_t.parent();}
return _n;}
EFTree.prototype.getChildNode=function(lb){return this._rootNode.getChildNode(lb);}
EFTree.prototype.getChildNodes=function(){return this._rootNode.getChildNodes();}
EFTree.prototype.setCurrent=function(node){for(var k in this._selected){$(this._selected[k]._jNodeTextDiv).removeClass("ef-tree-item-current");}
this._selected=new Object();if(this._current!=null){$(this._current._jNodeTextDiv).removeClass("ef-tree-item-current");}
if(node._jNodeTextDiv!=null){$(node._jNodeTextDiv).addClass("ef-tree-item-current");}
this._current=node;}
EFTree.prototype.getCurrent=function(){return this._current;}
EFTree.prototype._setSelected=function(node){if(this._current!=null&&(this._current.label()==node.label())){alert("return");return;}
var _lb=node.label();if(this._selected[_lb]){$(node._jNodeTextDiv).removeClass("ef-tree-item-current");delete this._selected[_lb];}else{this._selected[_lb]=node;$(node._jNodeTextDiv).addClass("ef-tree-item-current");}}
EFTree.prototype.getSeleted=function(){var ar=new Array();for(var k in this._selected){ar.push(this._selected[k]);}
return ar;}
function EFTreeNode(sTree,sParent,sLabel,sText,sLeaf,sData){this.base=EFTTNode;this.base(sTree,sParent,sLabel,sText,sLeaf,sData);this._jTreeNodeDIV=null;this._jBlankDiv=null;this._jNodeArchDiv=null;this._jNodeImgDiv=null;this._jTypeDiv=null;this._jNodeTextDiv=null;this._jTreeChildrenDiv=null;this._active=true;this._type=null;this._cIcon=null;this._oIcon=null;this._init=false;this._show=true;this._needRender=true;this._cascadeRender=false;this.menuData=null;}
EFTreeNode.prototype=new EFTTNode();EFTreeNode.prototype.expandIterative=function(){this.expand();if(this.depth()<this.tree().initialExpandDepth-1){var subItems=this._childNodes;for(var k=0;k<subItems.length;k++){subItems[k].expandIterative();}}}
EFTreeNode.prototype.addMenuItem=function(parent,data,func){if(!this.menuData)
this.menuData=new absTreeModel();var flage=false;for(var key in data){if(key=="imgSrc")
flage=true;}
if(!flage){data["imgSrc"]=efico.get("efgrid.frontBlank");}
this.menuData.addChild(parent,data);if(!!func)this.rightMenuFunc=func;}
EFTreeNode.RightMenuData={MenuName:"treeRightMenu"}
EFTreeNode.prototype.genMenuName=function(menuName){this.menuName="eftree_"+EFTreeNode.RightMenuData.MenuName+"_div";return this.menuName;}
EFTreeNode.prototype.rightMenuShow=function(event){if(!this.menuData)return;var host=this;var nMenu=new EFMenu(this.menuData,EFTreeNode.RightMenuData.MenuName,EFTreeNode.RightMenuData.MenuName);nMenu.hoverExpand=function(n){return true;}
nMenu.textClicked=function(node){var data=node.data();try{if(typeof data.func=="function")
data.func(host._label,node._label);}catch(e){alert("函数名定义有误！");}};nMenu._horizental=false;nMenu.render();var menu=nMenu._rootNode._jMenuDIV.get(0);menu.id=this.genMenuName(EFTreeNode.RightMenuData.MenuName);tNode=ef.get(menu.id);if(!!tNode){tNode.parentNode.removeChild(tNode);}
document.body.appendChild(menu);var redge=document.body.clientWidth-event.clientX;var bedge=document.body.clientHeight-event.clientY;if(redge<menu.offsetWidth){menu.style.left=(document.body.scrollLeft+event.clientX-menu.offsetWidth)+"px";}
else{menu.style.left=(document.body.scrollLeft+event.clientX)+"px";menu.style.display="block";}
if(bedge<menu.offsetHeight){menu.style.top=(document.body.scrollTop+event.clientY-menu.offsetHeight)+"px";}
else{menu.style.top=(document.body.scrollTop+event.clientY)+"px";menu.style.display="block";}
document.body.onclick=function(){!!ef.get(host.menuName)?ef.get(host.menuName).style.display="none":"";}}
EFTreeNode.prototype._initialize=function(){if(this.leaf()){this._oIcon=EFTreeConfig.fileIcon;this._cIcon=EFTreeConfig.fileIcon;}else{this._oIcon=EFTreeConfig.openFolderIcon;this._cIcon=EFTreeConfig.folderIcon;}
var _t=this.tree();var d=this.data();for(var key in d){if(typeof this[key]=="undefined"){this[key]=d[key];}}
if(_t.nodeInitializer!=null){_t.nodeInitializer(this);}
this._init=true;}
EFTreeNode.prototype.show=function(v){if(v===undefined){return this._show;}
this._show=v;}
EFTreeNode.prototype.type=function(v){if(v===undefined){return this._type;}
this._type=v;if(this._type!=null){this._type.item=this;}}
EFTreeNode.prototype.active=function(v){if(v===undefined){return this._active;}
this._active=v;}
EFTreeNode.prototype.needRender=function(v){if(v===undefined){return true;}
if(v===undefined){return this._needRender;}
this._needRender=v;}
EFTreeNode.prototype.icon=function(v){if(v===undefined){return this._cIcon;}
this._cIcon=v;}
EFTreeNode.prototype.openIcon=function(v){if(v===undefined){return this._oIcon;}
this._oIcon=v;}
EFTreeNode.prototype.expand=function(){this._needRender=this._opened?false:true;this._opened=true;this.load();this.render();}
EFTreeNode.prototype.collapse=function(){this._needRender=this._opened;this._opened=false;this.render();}
EFTreeNode.prototype._hasnext=function(){if(this.top()){return false;}
var parentItem=this._parent;var subItems=parentItem._childNodes;for(var k=0;k<subItems.length;k++){if(this==subItems[k]){if(k!=subItems.length-1){return true;}else{return false;}}}
return false;}
EFTreeNode.prototype.onArchClicked=function(){if(this._opened){this.collapse();}else{this.expand();}}
EFTreeNode.prototype.onImageClicked=function(){this.onArchClicked();}
EFTreeNode.prototype.textClicked=function(){}
EFTreeNode.prototype.onTextClicked=function(){var tr=this.tree();if(this.tree().clickableNodeNames&&!this.leaf())
this.onArchClicked();switch(tr._status){case 0:tr.setCurrent(this);this.textClicked();break;case 1:tr._setSelected(this);break;}}
EFTreeNode.prototype.textContextMenu=function(node,event){this.rightMenuShow(event);}
EFTreeNode.prototype.onTextContextMenu=function(event){this.textContextMenu(this,event);}
EFTreeNode.prototype._createChildNode=function(child){var node=new EFTreeNode(this.tree(),this,child['label'],child['text'],child['leaf']=="1",child);return node;}
EFTreeNode.prototype.textDom=function(){return this._jNodeTextDiv;}
EFTreeNode.prototype.reload=function(){this.load(true);this.needRender(true);this._hasRendered=false;this.render();}
EFTreeNode.prototype._asLeaf=function(){var renderAsLeaf=this._leaf;if(!this._leaf){if(this._status==1||this._opened){if(this.tree().emptyNodeAsLeaf&&this.getChildNodes().length==0){renderAsLeaf=true;}}else if(this.tree().activeEmptyJudger&&this.getChildNodes().length==0){renderAsLeaf=true;}}
return renderAsLeaf;}
EFTreeNode.prototype._renderSkeleton=function(){var tree=this.tree();if(this._jTreeNodeDIV==null){this._jTreeNodeDIV=document.createElement("div");this._jTreeNodeDIV.className="ef-tree-item";if($.browser.msie){this._jTreeNodeDIV.style.height="100%";}
this._jTreeNodeDIV.nowrap="yes";this._jBlankDiv=document.createElement("span");this._jNodeArchDiv=document.createElement("img");this._jNodeImgDiv=document.createElement("img");this._jNodeTextDiv=document.createElement("a");this._jNodeTextDiv.innerHTML=" "+this._text+"<br/>";if(!this._init){this._initialize();}
if(this._active){this._jNodeTextDiv.href="javascript:void(0)";}
this._jTypeDiv=document.createElement("span");this._jTreeChildrenDiv=document.createElement("div");var instance=this;this._jNodeArchDiv.onclick=function(){instance.onArchClicked();};if(this._active){this._jNodeTextDiv.onclick=function(){instance.onTextClicked();};}
this._jNodeImgDiv.onclick=function(){instance.onImageClicked();};var _jqueryNodeTextDiv=$(this._jNodeTextDiv);_jqueryNodeTextDiv.bind("contextmenu",function(event){instance.onTextContextMenu(event);return false;});}}
EFTreeNode.prototype._renderType=function(){if(!!this._jTypeDiv){this._jTypeDiv.innerHTML='';if(this.type()!=null){var typeDom=this.type().render();this._jTypeDiv.appendChild(typeDom);}}}
EFTreeNode.prototype._renderChildrenType=function(){var children=this._childNodes;for(var i=0;i<children.length;i++){var child=children[i];var childType=child._type;if(!!child._jTypeDiv&&(childType instanceof checkItemType||childType instanceof radioItemType))
child._renderType();child._renderChildrenType();}}
EFTreeNode.prototype._renderIndent=function(){var tree=this.tree();this._jBlankDiv.innerHTML='';var tmpItem=this;for(var j=this.depth();j>tree._target.depth();j--){if(tmpItem._parent!=tree._target&&tmpItem._parent._hasnext()){this._jBlankDiv.innerHTML="<img src="+EFTreeConfig.iIcon+" />"+this._jBlankDiv.innerHTML;}else{this._jBlankDiv.innerHTML="<img src="+EFTreeConfig.blankIcon+" />"+this._jBlankDiv.innerHTML;}
tmpItem=tmpItem._parent;}}
EFTreeNode.prototype._renderChildren=function(opened){this._jTreeChildrenDiv.style.display="none";if(opened){this._jTreeChildrenDiv.style.display="block";if(!this._hasRendered){if(!!this._jTreeChildrenDiv.parentNode){this._jTreeChildrenDiv.parentNode.removeChild(this._jTreeChildrenDiv);this._jTreeChildrenDiv=document.createElement("div");this._jTreeNodeDIV.appendChild(this._jTreeChildrenDiv);}
var children=this.getChildNodes();this._hasRendered=true;for(var i=0;i<children.length;i++){var child=children[i];var cDom=child.render();if(child._show){this._jTreeChildrenDiv.appendChild(cDom);}}}}}
EFTreeNode.prototype._renderIconText=function(asLeaf){var closedIcon=this._cIcon;var openIcon=this._oIcon;this._jNodeTextDiv.innerHTML=" "+this._text+"<br/>";if(asLeaf){if(this._hasnext()){this._jNodeArchDiv.src=EFTreeConfig.tIcon;}else{this._jNodeArchDiv.src=EFTreeConfig.lIcon;}
this._jNodeImgDiv.src=closedIcon;}else{if(this._opened){if(this._hasnext()){this._jNodeArchDiv.src=EFTreeConfig.tMinusIcon;}else{this._jNodeArchDiv.src=EFTreeConfig.lMinusIcon;}
this._jNodeImgDiv.src=openIcon;}else{if(this._hasnext()){this._jNodeArchDiv.src=EFTreeConfig.tPlusIcon;}else{this._jNodeArchDiv.src=EFTreeConfig.lPlusIcon;}
this._jNodeImgDiv.src=closedIcon;}}}
EFTreeNode.prototype.render=function(){this._renderSkeleton();this._renderType()
if(this.needRender()||this._cascadeRender){this.needRender(false);this._cascadeRender=false;}else{this._jTreeNodeDIV.appendChild(this._jBlankDiv);this._jTreeNodeDIV.appendChild(this._jNodeArchDiv);this._jTreeNodeDIV.appendChild(this._jNodeImgDiv);this._jTreeNodeDIV.appendChild(this._jTypeDiv);this._jTreeNodeDIV.appendChild(this._jNodeTextDiv);this._jTreeNodeDIV.appendChild(this._jTreeChildrenDiv);this._renderChildrenType();return this._jTreeNodeDIV;}
this._renderIndent();var asLeaf=this._asLeaf();this._renderIconText(asLeaf);if(!asLeaf){this._renderChildren(this._opened);}
this._jTreeNodeDIV.appendChild(this._jBlankDiv);this._jTreeNodeDIV.appendChild(this._jNodeArchDiv);this._jTreeNodeDIV.appendChild(this._jNodeImgDiv);this._jTreeNodeDIV.appendChild(this._jTypeDiv);this._jTreeNodeDIV.appendChild(this._jNodeTextDiv);this._jTreeNodeDIV.appendChild(this._jTreeChildrenDiv);this._renderChildrenType();return this._jTreeNodeDIV;}
function treeItemType(){this.item=null;}
function checkItemType(pChecked,pCascade){this.checked=false;this.cascade=true;if(pChecked!=null){this.checked=pChecked};if(pCascade!=null){this.cascade=pCascade};this._jqDom=null;}
checkItemType.prototype=new treeItemType;checkItemType.prototype.render=function(){var host=this;var ck="";if(this.checked){ck="checked";}
var t="<input type='checkbox' "+ck+">";var check=$(t);check.click(function(){host.onCheckBoxClicked();});this._jqDom=check;return check.get(0);}
checkItemType.prototype.checkboxClicked=function(cked){}
checkItemType.prototype.onCheckBoxClicked=function(c){var bChecked=!this.checked;this.checkItem(bChecked);var toCheck=this.checkboxClicked(bChecked);};checkItemType.prototype.checkItem=function(bChecked){this.checked=bChecked;this.checkDom(bChecked);var node=this.item;if(this.cascade&&node.open()){for(var i=0;i<node._childNodes.length;i++){var sub=node._childNodes[i];if(sub._type instanceof checkItemType){sub._type.checkItem(bChecked);}}}}
checkItemType.prototype.checkDom=function(bChecked){this.checked=bChecked;this._jqDom.attr("checked",this.checked);};EFTreeNode.prototype.getCheckedChildren=function(recursive){var _selectedItems=[];for(var i=0;i<this.getChildNodes().length;i++){var node=this.getChildNodes()[i];var nodeType=node._type;if(nodeType instanceof checkItemType&&nodeType.checked){_selectedItems[_selectedItems.length]=node;}
if(recursive)
_addSelectedItems(node,_selectedItems,true);}
return _selectedItems;}
EFTreeNode.prototype.getUncheckedChildren=function(recursive){var _selectedItems=[];for(var i=0;i<this.getChildNodes().length;i++){var node=this.getChildNodes()[i];var nodeType=node._type;if(nodeType instanceof checkItemType&&(!nodeType.checked)){_selectedItems[_selectedItems.length]=node;}
if(recursive)
_addSelectedItems(node,_selectedItems,false);}
return _selectedItems;}
EFTree.prototype.getCheckedNods=function(){return this._rootNode.getCheckedChildren(true);}
EFTree.prototype.getChecked=function(){var _selected=[];var nodes=this.getCheckedNods();for(var i=0;i<nodes.length;i++){_selected[_selected.length]=nodes[i].label();}
return _selected;}
function _addSelectedItems(item,_selectedItems,checked){for(var i=0;i<item._childNodes.length;i++){var sub=item._childNodes[i];var subType=sub._type;if(subType instanceof checkItemType&&(subType.checked===checked)){_selectedItems[_selectedItems.length]=sub;}
_addSelectedItems(sub,_selectedItems,checked);}}
function radioItemType(pChecked){this.checked=false;if(pChecked!=null){this.checked=pChecked};this._jqDom=null;}
radioItemType.prototype=new treeItemType;radioItemType.prototype.render=function(){var host=this;var ck="";if(this.checked){ck="checked";this.item.tree().option=this.item;}
var t="<input type='radio' "+ck+">";var check=$(t);check.click(function(){host.onRadioClicked();});this._jqDom=check;return check.get(0);}
radioItemType.prototype.radioboxClicked=function(cked){};radioItemType.prototype.onRadioClicked=function(){var bChecked=!this.checked;this.checkItem(bChecked);this.radioboxClicked(bChecked);}
radioItemType.prototype.checkItem=function(bChecked){var tree=this.item.tree();if(tree.option&&tree.option._label==this.item._label){this.checkDom(false);tree.option=null;}else{if(tree.option){tree.option._type.checkDom(false)};this.checkDom(true);tree.option=this.item;}};radioItemType.prototype.checkDom=function(bChecked){this.checked=bChecked;this._jqDom.attr("checked",this.checked);}
EFTree.prototype.getOption=function(){if(this.option==null){return""};return this.option._label;}

function EFOutLookTree(sModel,sLabel,sText){this.base=EFTree;this.base(sModel,sLabel,sText);this.hideRoot=true;this._rootNode=new EFOutLookTreeNode(this,null,null,this._text,false,null);this._rootNode.active(false);this._target=this._rootNode;this._jTreeDiv=document.createElement("div");}
EFOutLookTree.prototype=new EFTree();EFOutLookTree.prototype.setCurrent=function(node){for(var k in this._selected){$(this._selected[k]._jNodeTextDiv).removeClass("ef-outLookTree-current");}
this._selected=new Object();if(this._current!=null){$(this._current._jNodeTextDiv).removeClass("ef-outLookTree-current");}
if(node._jNodeTextDiv!=null){$(node._jNodeTextDiv).addClass("ef-outLookTree-current");}
this._current=node;}
EFOutLookTree.prototype._setSelected=function(node){if(this._current!=null&&(this._current.label()==node.label())){alert("return");return;}
var _lb=node.label();if(this._selected[_lb]){$(node._jNodeTextDiv).removeClass("ef-outLookTree-current");delete this._selected[_lb];}else{this._selected[_lb]=node;$(node._jNodeTextDiv).addClass("ef-outLookTree-current");}}
function EFOutLookTreeNode(sTree,sParent,sLabel,sText,sLeaf,sData){this.base=EFTreeNode;this.base(sTree,sParent,sLabel,sText,sLeaf,sData);}
EFOutLookTreeNode.prototype=new EFTreeNode();EFOutLookTreeNode.prototype.onArchClicked=function(){if(this!=this.tree()._mycurrent&&!!this.tree()._mycurrent){this.tree()._mycurrent.collapse();this.tree()._mycurrent=null;}
if(this._opened){this.collapse();this.tree()._mycurrent=null;}else{this.expand();this.tree()._mycurrent=this;}}
EFOutLookTreeNode.prototype.onTextClicked=function(){var tr=this.tree();switch(tr._status){case 0:tr.setCurrent(this);this.textClicked(this);break;case 1:tr._setSelected(this);break;}}
EFOutLookTreeNode.prototype._createChildNode=function(child){var node=new EFOutLookTreeNode(this.tree(),this,child['label'],child['text'],child['leaf']=="1",child);return node;}
EFOutLookTreeNode.prototype.onMouseOver=function(){if(this.depth()==2)
this._jNodeTextDiv.childNodes[0].className="ef-outLookTree-hover";var instance=this;if(!this.leaf()){var divNode=ef.get("efgrid_showMenu_div");if(!!divNode){divNode.parentNode.removeChild(divNode);}
var nMenu=new EFMenu(this.tree()._model,"showMenu","showMenu");nMenu._rootNode=new EFMenuItem(nMenu,null,this.data()['label'],this.data()['text'],this.data()['leaf']=="1",this.data());nMenu._rootNode._opened=true;nMenu.hoverExpand=function(n){return true;}
nMenu.textClicked=instance.textClicked;nMenu._horizental=false;nMenu.render();var menu=nMenu._rootNode._jMenuDIV.get(0);menu.id="efgrid_showMenu_div";document.body.appendChild(menu);var iframe=$("#efgrid_showMenu_div").find("iframe").get(0);iframe.style.width=menu.offsetWidth;iframe.style.height=menu.offsetHeight;domLayout.postionWithRel(menu,$(this._jNodeTextDiv).find("img").get(0),false);}}
EFOutLookTreeNode.prototype.onMouseOut=function(){if(this.depth()==2)
this._jNodeTextDiv.childNodes[0].className="ef-outLookTree-item";if(!this.leaf()){var divNode=ef.get("efgrid_showMenu_div");if(!!divNode){}}}
EFOutLookTreeNode.prototype._renderSkeleton=function(){var tree=this.tree();if(this._jTreeNodeDIV==null){this._jTreeNodeDIV=document.createElement("div");this._jTreeNodeDIV.nowrap="yes";this._jNodeTextDiv=document.createElement("div");if(this.depth()==1)
this._jNodeTextDiv.innerHTML=" <div class='ef-outLookTree' ><span>"+this._text+"</span></div>";else{this._jNodeTextDiv.innerHTML=" <div class='ef-outLookTree-item' >"+this._text
+(this.leaf()==false?"&nbsp;<img class='arrow' src=\""+EFMenuConfig.nextIcon+"\" align='absmiddle'>":"")
+"</div>";}
instance=this;if(this.depth()==2){$(this._jNodeTextDiv).mouseover(function(){instance.onMouseOver();});$(this._jNodeTextDiv).mouseout(function(){instance.onMouseOut();});}
if(!this._init){this._initialize();}
if(this._active){this._jNodeTextDiv.href="javascript:void(0)";}
this._jTreeChildrenDiv=document.createElement("div");var instance=this;this._jNodeTextDiv.onclick=function(){if(instance.depth()<2&&instance.leaf()==false){var divNode=ef.get("efgrid_showMenu_div");if(!!divNode)
divNode.style.display="none";instance.onArchClicked();}
else if(instance.depth()==2&&instance.leaf()==true)
instance.onTextClicked();};}}
EFOutLookTreeNode.prototype.render=function(){this._renderSkeleton();if(this.needRender()||this._cascadeRender){this.needRender(false);this._cascadeRender=false;}else{this._jTreeNodeDIV.appendChild(this._jNodeTextDiv);this._jTreeNodeDIV.appendChild(this._jTreeChildrenDiv);return this._jTreeNodeDIV;}
var asLeaf=this._asLeaf();if(!asLeaf){this._renderChildren(this._opened);}
this._jTreeNodeDIV.appendChild(this._jNodeTextDiv);this._jTreeNodeDIV.appendChild(this._jTreeChildrenDiv);return this._jTreeNodeDIV;}

function EFMenuTree(sModel,sLabel,sText){this.base=EFTree;this.base(sModel,sLabel,sText);this.hideRoot=true;this._rootNode=new EFMenuTreeNode(this,null,null,this._text,false,null);this._rootNode.active(false);this._target=this._rootNode;this._jTreeDiv=document.createElement("div");}
EFMenuTree.prototype=new EFTree();EFMenuTree.prototype.setCurrent=function(node){for(var k in this._selected){$(this._selected[k]._jNodeTextDiv).removeClass("ef-outLookTree-current");}
this._selected=new Object();if(this._current!=null){$(this._current._jNodeTextDiv).removeClass("ef-outLookTree-current");}
if(node._jNodeTextDiv!=null){$(node._jNodeTextDiv).addClass("ef-outLookTree-current");}
this._current=node;}
EFMenuTree.prototype._setSelected=function(node){if(this._current!=null&&(this._current.label()==node.label())){alert("return");return;}
var _lb=node.label();if(this._selected[_lb]){$(node._jNodeTextDiv).removeClass("ef-outLookTree-current");delete this._selected[_lb];}else{this._selected[_lb]=node;$(node._jNodeTextDiv).addClass("ef-outLookTree-current");}}
function EFMenuTreeNode(sTree,sParent,sLabel,sText,sLeaf,sData){this.base=EFTreeNode;this.base(sTree,sParent,sLabel,sText,sLeaf,sData);}
EFMenuTreeNode.prototype=new EFTreeNode();EFMenuTreeNode.prototype.onArchClicked=function(){if(this!=this.tree()._mycurrent&&!!this.tree()._mycurrent){this.tree()._mycurrent=null;}
if(this._opened){this.collapse();this.tree()._mycurrent=null;this._jNodeTextDiv.innerHTML=" <div class='ef-outLookTree'><img style='float:right' src='"+efico.get("eftree.padDown")+"' /><span >"+this._text+"</span></div>";}else{this.expandOutLookTab();this.tree()._mycurrent=this;this._jNodeTextDiv.innerHTML=" <div class='ef-outLookTree'><img style='float:right' src='"+efico.get("eftree.padUp")+"' /><span >"+this._text+"</span></div>";}}
EFMenuTreeNode.prototype.expandOutLookTab=function(){this._needRender=this._opened?false:true;this._opened=true;this.renderSubTree();}
EFMenuTreeNode.prototype.renderSubTree=function(){if(this._opened){this._jTreeChildrenDiv.style.display="block";this._jTreeChildrenDiv.style.overflow="hidden";if(!this._hasRendered){var xTree=new EFTree(this.tree()._model,this._label+"_tree","");this.configFun(xTree);xTree._rootNode._label=this._label
xTree.hideRoot=true;var tNode=xTree.render()
this._jTreeChildrenDiv.appendChild(xTree.render());this._hasRendered=true;}}
return this._jTreeNodeDIV;}
EFMenuTreeNode.prototype.configFun=function(nTree){nTree.nodeInitializer=this.tree().nodeInitializer;nTree.depth(this.tree().depth());nTree.emptyNodeAsLeaf=this.tree().emptyNodeAsLeaf;nTree.activeEmptyJudger=this.tree().activeEmptyJudger;nTree.clickableNodeNames=this.tree().clickableNodeNames;nTree.textClicked=this.tree().textClicked;nTree.hoverExpand=this.tree().hoverExpand;nTree.initialExpandDepth=this.tree().initialExpandDepth-1;}
EFMenuTreeNode.prototype.onTextClicked=function(){var tr=this.tree();switch(tr._status){case 0:tr.setCurrent(this);this.textClicked(this);break;case 1:tr._setSelected(this);break;}}
EFMenuTreeNode.prototype._createChildNode=function(child){var node=new EFMenuTreeNode(this.tree(),this,child['label'],child['text'],child['leaf']=="1",child);return node;}
EFMenuTreeNode.prototype._renderSkeleton=function(){var tree=this.tree();if(this._jTreeNodeDIV==null){this._jTreeNodeDIV=document.createElement("div");this._jTreeNodeDIV.nowrap="yes";this._jNodeTextDiv=document.createElement("div");this._jTreeChildrenDiv=document.createElement("div");var instance=this;if(this.depth()==1)
{this._jNodeTextDiv.nowrap="yes";this._jNodeTextDiv.width="100%";this._jNodeTextDiv.innerHTML=" <div class='ef-outLookTree'><img style='float:right'  src='"+efico.get("eftree.padDown")+"' /><span >"+this._text+"</span></div>";}
if(tree.nodeInitializer!=null){tree.nodeInitializer(this);}
this._jNodeTextDiv.onclick=function(){if(instance.leaf()==false)
{instance.onArchClicked();}
else if(instance.leaf()==true)
instance.onTextClicked();};}}
EFMenuTreeNode.prototype.render=function(){this._renderSkeleton();if(this.needRender()||this._cascadeRender){this.needRender(false);this._cascadeRender=false;}else{this._jTreeNodeDIV.appendChild(this._jNodeTextDiv);this._jTreeNodeDIV.appendChild(this._jTreeChildrenDiv);return this._jTreeNodeDIV;}
var asLeaf=this._asLeaf();if(!asLeaf){this._renderChildren(this._opened);}
this._jTreeNodeDIV.appendChild(this._jNodeTextDiv);this._jTreeNodeDIV.appendChild(this._jTreeChildrenDiv);return this._jTreeNodeDIV;}

efvalidator=function()
{this.regexType="";this.regex=null;this.nullable=true;this.maxLength=Number.MAX_VALUE;this.minLength=0;this.errorPrompt="";}
efvalidator.prototype.setRegexType=function(t)
{if(isAvailable(t))
{this.regexType=t;}}
efvalidator.prototype.setRegex=function(ex)
{if(isAvailable(ex))
{this.regex=eval(ex);}}
efvalidator.prototype.getRegex=function()
{if(!isAvailable(this.regex)&&isAvailable(this.regexType))
{return ef_validator_regexes[this.regexType];}
else
{return this.regex;}}
efvalidator.prototype.setNullable=function(v)
{if(isAvailable(v))
{this.nullable=eval(v);}}
efvalidator.prototype.setMaxLength=function(v)
{if(isAvailable(v)&&eval(v)>0)
{this.maxLength=eval(v);}}
efvalidator.prototype.setMinLength=function(v)
{if(isAvailable(v)&&eval(v)>=0)
{this.minLength=eval(v);}}
efvalidator.prototype.setErrorPrompt=function(v)
{if(isAvailable(v))
{this.errorPrompt=efutils.trimString(v);}}
efvalidator.prototype.getErrorMessage=function()
{var message=efutils.trimString(this.errorPrompt);if(message!="")return message;if(isAvailable(this.regexType))
{message=ef_validator_errormsg[this.regexType];}
if(!isAvailable(message))
{message=getI18nMessages("ef.IllegalImportation","输入非法!");}
return message;}
efvalidator.prototype.validate=function(str)
{var error_message=this.getErrorMessage();var err_msg_list="";if(this.nullable&&efutils.trimString(str)=="")
{return;}
if(!this.nullable&&efutils.trimString(str)=="")
{err_msg_list+=getI18nMessages("ef.NotNull","数据不能为空!")+"\n";}
var str_length=efutils.getTotalBytes(str);if(str_length>this.maxLength||str_length<this.minLength)
{err_msg_list+=getI18nMessages("ef.DataMin","数据至少")+" "+this.minLength+" "+getI18nMessages("ef.DataMax","数据至多")
+" "+this.maxLength+" "+getI18nMessages("ef.DataByte","位")+"\n";}
var regex=this.getRegex();if(regex!=null&&!regex.test(str))
{var msg=this.errorPrompt;if(this.regexType!="")
var msg=isAvailable(this.errorPrompt)?ef_validator_errormsg[this.regexType]:"";err_msg_list+=efutils.trimString(msg)+"\n";}
if(this.regexs!=null)
{for(var i=0;i<this.regexs.length;i++)
{if(this.regexs[i]!=null&&!eval(this.regexs[i]).test(str))
{var msgs=(this.errorPrompts!=null&&this.errorPrompts.length>i)?this.errorPrompts[i]:"";err_msg_list+=efutils.trimString(msgs)+"\n"}}
if(err_msg_list.length>0)err_msg_list="\n"+err_msg_list;}
else
{if(err_msg_list.length>0)err_msg_list="\n"+error_message+"\n"+err_msg_list;}
if(err_msg_list.length>0)throw new Error(efutils.trimString(err_msg_list));}
efvalidator.build=function(customed,eicol)
{var validator=new efvalidator();validator.setRegexType($(customed).attr("validateType")!=null?$(customed).attr("validateType"):eicol.validateType);validator.setRegex($(customed).attr("regex")!=null?$(customed).attr("regex"):eicol.regex);validator.setNullable($(customed).attr("nullable")!=null?$(customed).attr("nullable"):eicol.nullable);validator.setMaxLength($(customed).attr("maxLength")!=null?$(customed).attr("maxLength"):eicol.maxLength);validator.setMinLength($(customed).attr("minLength")!=null?$(customed).attr("minLength"):eicol.minLength);validator.setErrorPrompt($(customed).attr("errorPrompt")!=null?$(customed).attr("errorPrompt"):eicol.errorPrompt);return validator;}
efvalidator.addSystemRegex=function(name,reg,errormsg)
{ef_validator_regexes[name]=reg;ef_validator_errormsg[name]=errormsg;}
efvalidator.init=function()
{efvalidator.addSystemRegex("email",/^([_a-z0-9]|[\.]|[\-])+@(([_a-z0-9]|[\-])+\.)+[a-z0-9]+$/i,getI18nMessages("ef.ValidateEmail","非法电子邮件地址"));efvalidator.addSystemRegex("mobile_phone",/^1[358](\d{9})$/,getI18nMessages("ef.ValidateMobilePhone","非法手机号码"));efvalidator.addSystemRegex("postcode",/^(\d{6})$/,getI18nMessages("ef.ValidatePost","非法邮政编码"));efvalidator.addSystemRegex("phone_with_area_code",/^[0-9]{3,4}-[0-9]{3,11}(-[0-9]{0,}){0,1}$/,getI18nMessages("ef.ValidatePhone","非法电话号码"));efvalidator.addSystemRegex("phone_without_area_code",/^[1-9]{1}[0-9]{2,10}$/,getI18nMessages("ef.ValidatePhone","非法电话号码"));efvalidator.addSystemRegex("integer",/^[-]{0,1}[1-9]+[0-9]{0,}$|^[0]{1,1}$/,getI18nMessages("ef.ValidateInt","必须输入整数"));efvalidator.addSystemRegex("positive_integer",/^[1-9]+[0-9]{0,}$/,getI18nMessages("ef.ValidatePositiveInt","必须输入正整数"));efvalidator.addSystemRegex("nonnegative_integer",/^[1-9]+[0-9]{0,}$|^[0]{1,1}$/,getI18nMessages("ef.ValidateNonnegtiveInt","必须输入非负整数"));efvalidator.addSystemRegex("negative_integer",/^-[1-9]+[0-9]{0,}$/,getI18nMessages("ef.ValidateNegtiveInt","必须输入负整数"));efvalidator.addSystemRegex("http_url",/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,getI18nMessages("ef.ValidateHttp","非法http地址"));efvalidator.addSystemRegex("number",/^[-]{0,1}[1-9]+[0-9]{0,}$|^[-]{0,1}[1-9]+[0-9]{0,}[\.][0-9]+$|^[-]{0,1}[0]{0,1}[\.][0-9]+$|^[0]{1,1}$/,getI18nMessages("ef.ValidateNumber","必须输入数字"));efvalidator.addSystemRegex("nonnegative_number",/^[1-9]+[0-9]{0,}$|^[1-9]+[0-9]{0,}[\.][0-9]+$|^[0]{0,1}[\.][0-9]+$|^[0]{1,1}$/,getI18nMessages("ef.ValidateNonnegtiveNumber","必须输入非负数字"));efvalidator.addSystemRegex("positive_number",/^[1-9]+[0-9]{0,}$|^[1-9]+[0-9]{0,}[\.][0-9]+$|^[0]{0,1}[\.][0-9]+$/,getI18nMessages("ef.ValidatePositiveNumber","必须输入正数字"));efvalidator.addSystemRegex("decimal",/^[-]{0,1}[0]{0,1}[\.][0-9]+$/,getI18nMessages("ef.ValidateDecimal","必须输入小数"));efvalidator.addSystemRegex("label",/^[a-z]{1}([a-z0-9]|[_])+$/i,getI18nMessages("ef.ValidateTag","非法的标签名"));efvalidator.addSystemRegex("string",/^([a-z0-9]|[_])+$/i,getI18nMessages("ef.ValidateEnglishString","非法的英文字符串"));efvalidator.addSystemRegex("chinese_string",/^([a-z0-9]|[_]|[\u4E00-\u9FA5])+$/i,getI18nMessages("ef.ValidateChineseString","非法的中文字符串"));efvalidator.addSystemRegex("not_chinese_string",/^[^\u4E00-\u9FA5]*$/i,getI18nMessages("ef.ValidateNonChineseString","包含非法的中文字符串"));efvalidator.addSystemRegex("ip_address",/^([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|25[0-5])([\.]([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|25[0-5])){3}$/,getI18nMessages("ef.ValidateIP","非法的IP地址"));efvalidator.addSystemRegex("text",/^([\w]|[\W])*$/i,getI18nMessages("ef.ValidateString","非法的字符串"));efvalidator.addSystemRegex("mac",/^[0-9a-f]{2}([:][0-9a-f]{2}){5}$|^[0-9a-f]{2}([\-][0-9a-f]{2}){5}$/i,getI18nMessages("ef.ValidateMac","非法的MAC地址"));}
function efvalidateForm(node,needAlert)
{if(node==null)
{alert(getI18nMessages("ef.AssignNode","需指定一个节点"));return false;}
var len=node.elements.length;var mark=true;for(var j=0;j<len;j++)
{if(!efvalidateObj(node.elements[j],needAlert))
mark=false;}
if(mark==false)alert(getI18nMessages("ef.Invalid","校验出错，请检查输入框内的值！"));return mark;}
function efvalidateObj(node,needAlert,notNeedFocus)
{if(node==null)
{alert(getI18nMessages("ef.AssignNode","需指定一个节点"));return false;}
var currentObj=node;if(currentObj.type=="textarea"||currentObj.type=="text"||currentObj.type=="select-one")
{var validate=new efvalidator();validate.setRegexType($(currentObj).attr("validateType")!=null?$(currentObj).attr("validateType"):"");validate.setRegex($(currentObj).attr("regex")!=null?$(currentObj).attr("regex"):null);validate.setNullable($(currentObj).attr("nullable")!=null?$(currentObj).attr("nullable"):true);validate.setMaxLength($(currentObj).attr("maxLength")!=null?$(currentObj).attr("maxLength"):Number.MAX_VALUE);validate.setMinLength($(currentObj).attr("minLength")!=null?$(currentObj).attr("minLength"):0);validate.setErrorPrompt($(currentObj).attr("errorPrompt")!=null?$(currentObj).attr("errorPrompt"):"");if($(currentObj).attr("regex0")!=null)
{var regexs=[];for(var i=0;true;i++)
{if($(currentObj).attr("regex"+i)!=null)
regexs[i]=$(currentObj).attr("regex"+i);else
break;}
validate.regexs=regexs;}
if($(currentObj).attr("errorPrompt0")!=null)
{var errorPrompts=[];for(var i=0;true;i++)
{if($(currentObj).attr("errorPrompt"+i)!=null)
errorPrompts[i]=$(currentObj).attr("errorPrompt"+i);else
break;}
validate.errorPrompts=errorPrompts;}
try
{if(currentObj.style.display=="none"||currentObj.style.visibility=="hidden")
return true;else
validate.validate(currentObj.value);}
catch(ex)
{efform.setErrorStyle(node,getI18nMessages("ef.InvalidReason","校验出错，原因为")+"["+ex.message+"]",false);if(!needAlert==false)
alert(getI18nMessages("ef.InvalidReason","校验出错，原因为")+"["+ex.message+"]");if(!!notNeedFocus==false){currentObj.focus();if(currentObj.type=="textarea"||currentObj.type=="text")
currentObj.select();}
return false;}
efform.setErrorStyle(node,"",true);}
return true;}
function efvalidateDiv(div_id,needAlert,notNeedFocus)
{var flage=true;try
{var div_node=document.getElementById(div_id);flage=efvalidateInputField(div_node,needAlert,notNeedFocus);}
catch(exception)
{alert(exception.message);return false;}
if(flage==false)alert(getI18nMessages("ef.Invalid","校验出错，请检查输入框内的值！"));return flage;}
function efvalidateInputField(node,needAlert,notNeedFocus)
{var flage=true;if((node.tagName=="INPUT"&&node.type!="button")||node.tagName=="TEXTAREA"||node.type=="select-one")
{flage=efvalidateObj(node,needAlert,notNeedFocus);}
else
{for(var i=0;i<node.childNodes.length;i++)
{try
{flage=efvalidateInputField(node.childNodes[i],needAlert,notNeedFocus)&&flage;}
catch(exception)
{}}}
return flage;}
function efvalidateFormInGroup(node,validateGroupName,needAlert)
{if(node==null)
{alert(getI18nMessages("ef.AssignNode","需指定一个节点"));return false;}
var len=node.elements.length;for(var j=0;j<len;j++)
{if(!efvalidateObjInGroup(node.elements[j],validateGroupName,needAlert))
{return false;}}
return true;}
function efvalidateObjInGroup(node,validateGroupName,needAlert,notNeedFocus)
{if(node==null||node.validateGroupName==null||node.validateGroupName==undefined||node.validateGroupName==""||node.validateGroupName!=validateGroupName)return true;return efvalidateObj(node,needAlert,notNeedFocus);}
function efvalidateDivInGroup(div_id,validateGroupName,needAlert,notNeedFocus)
{var flage=true;try
{var div_node=document.getElementById(div_id);flage=efvalidateInputFieldInGroup(div_node,validateGroupName,needAlert,notNeedFocus);}
catch(exception)
{alert(exception.message);return false;}
return flage;}
function efvalidateInputFieldInGroup(node,validateGroupName,needAlert,notNeedFocus)
{var flage=true;if((node.tagName=="INPUT"&&node.type!="button")||node.tagName=="TEXTAREA"||node.type=="select-one")
{flage=efvalidateObjInGroup(node,validateGroupName,needAlert,notNeedFocus);if(flage==false)
return false;}
else
{for(var i=0;i<node.childNodes.length;i++)
{try
{flage=efvalidateInputFieldInGroup(node.childNodes[i],validateGroupName,needAlert,notNeedFocus);if(flage==false)
return false;}
catch(exception)
{}}}
return flage;}

var EFWindowInterval=null;var EFWindow=null;var EFWindows=[];self.onError=null;var currentX=0;var currentY=0;var whichIt=null;var lastScrollX=0;var lastScrollY=0;var showComponent=null;var efwindow_first_show=true;efwindow=function(){}
efwindow._onmousedown=null;efwindow._onmousemove=null;efwindow._onmouseup=null;efwindow.show=function(obj,div_id,center,no_move){showComponent=obj;EFWindow=div_id;var flage=true;for(i=0;c=EFWindows[i];i++){if(c==div_id)
flage=false;}
if(flage)
EFWindows.push(div_id);var window_obj=document.getElementById(EFWindow);window_obj.style.display='block';if(center=="center"){window_obj.style.pixelLeft=(document.body.clientWidth-window_obj.clientWidth)/2;window_obj.style.pixelTop=(document.body.clientHeight-window_obj.clientHeight)/2;}else{var leftpos=0,toppos=0;scrollTopValue=0;aTag=obj;do{aTag=aTag.offsetParent;if(aTag==null&&obj.style.display=="none"&&obj.nextSibling!=null)
aTag=obj.nextSibling.offsetParent;scrollTopValue=aTag.scrollTop;leftpos+=(aTag.offsetLeft-aTag.scrollLeft);toppos+=(aTag.offsetTop-aTag.scrollTop);}while(aTag.tagName!="BODY");if(efwindow_first_show==true){efwindow_first_show=false;}else
toppos+=scrollTopValue;window_obj.style.pixelLeft=obj.offsetLeft+leftpos;window_obj.style.pixelTop=obj.offsetTop+toppos+20;if(window_obj.style.pixelLeft+window_obj.offsetWidth>aTag.offsetWidth){window_obj.style.pixelLeft-=window_obj.style.pixelLeft
+window_obj.offsetWidth-aTag.offsetWidth+20;}}
efShim.openShim(window_obj);if(isNS&&!isIE){window.captureEvents(Event.MOUSEUP|Event.MOUSEDOWN);window.onmousedown=efwindow.grabIt;window.onmousemove=efwindow.moveIt;window.onmouseup=efwindow.dropIt;}else if(isIE){efwindow._onmousedown=document.onmousedown;document.onmousedown=efwindow.grabIt;if(center!="fixed"){efwindow._onmousemove=document.onmousemove;document.onmousemove=efwindow.moveIt;}
efwindow._onmouseup=document.onmouseup;document.onmouseup=efwindow.dropIt;}
if(center!="fixed"&&(isNS||isIE))
EFWindowInterval=window.setInterval("efwindow.heartBeat()",1);}
efwindow.hide=function(){var window_obj=document.getElementById(EFWindow);if(window_obj){window_obj.style.display='none';efShim.closeShim(window_obj);}
if(EFWindows.length>1){var _temp=[];for(i=0;c=EFWindows[i++];){if(EFWindow!=c)
_temp.push(c);}
EFWindows=_temp;EFWindow=EFWindows[EFWindows.length-1];}else{document.onmousedown=efwindow._onmousedown;document.onmouseup=efwindow._onmouseup;if(null!=efwindow._onmousemove)
document.onmousemove=efwindow._onmousemove;}
lastScrollY=lastScrollX=0;}
efwindow.moveToPostion=function(x,y){var window_obj=document.getElementById(EFWindow);if(isIE){window_obj.style.pixelLeft=x;window_obj.style.pixelTop=y;}else if(isNS){window_obj.left=x;window_obj.top=y;}}
efwindow.heartBeat=function(){if(isIE){diffY=document.body.scrollTop;diffX=document.body.scrollLeft;}else if(isNS){diffY=self.pageYOffset;diffX=self.pageXOffset;}
var window_obj=document.getElementById(EFWindow);if(diffY!=lastScrollY){percent=.1*(diffY-lastScrollY);if(percent>0)
percent=Math.ceil(percent);else
percent=Math.floor(percent);if(isIE)
window_obj.style.pixelTop+=percent;else if(isNS)
window_obj.top+=percent;lastScrollY=lastScrollY+percent;}
if(diffX!=lastScrollX){percent=.1*(diffX-lastScrollX);if(percent>0)
percent=Math.ceil(percent);else
percent=Math.floor(percent);if(isIE)
window_obj.style.pixelLeft+=percent;else if(isNS)
window_obj.left+=percent;lastScrollX=lastScrollX+percent;}
efShim.moveTo(window_obj.style.pixelLeft,window_obj.style.pixelTop);}
efwindow.checkFocus=function(x,y){stalkerx=document.getElementById(EFWindow).pageX;stalkery=document.getElementById(EFWindow).pageY;stalkerwidth=5;stalkerheight=5;return((x>stalkerx&&x<(stalkerx+stalkerwidth))&&(y>stalkery&&y<(stalkery+stalkerheight)));}
efwindow.grabIt=function(e){var event=window.event||e;if(event.clientY>document.body.clientHeight||event.clientX>document.body.clientWidth){return true;}
whichIt=event.srcElement||event.target;if(whichIt==null)
return true;while(whichIt.id==undefined||whichIt.id.indexOf(EFWindow)==-1){if("ef_calendar"==whichIt.id)
break;whichIt=whichIt.parentElement||whichIt.parentNode;if(whichIt==null){clearInterval(EFWindowInterval);efwindow.hide();return true;}}
if(event.clientY+document.body.scrollTop-whichIt.offsetTop<20){whichIt.style.pixelLeft=whichIt.offsetLeft;whichIt.style.pixelTop=whichIt.offsetTop;efShim.moveTo(whichIt.style.pixelLeft,whichIt.style.pixelTop);currentX=(event.clientX+document.body.scrollLeft);currentY=(event.clientY+document.body.scrollTop);}else{whichIt=null;}
return true;}
efwindow.moveIt=function(e){var event=window.event||e;if(whichIt==null)
return true;newX=(event.clientX+document.body.scrollLeft);newY=(event.clientY+document.body.scrollTop);distanceX=(newX-currentX);distanceY=(newY-currentY);currentX=newX;currentY=newY;whichIt.style.pixelLeft+=distanceX;whichIt.style.pixelTop+=distanceY;efShim.moveTo(whichIt.style.pixelLeft,whichIt.style.pixelTop);if(whichIt.style.pixelTop<document.body.scrollTop)
whichIt.style.pixelTop=document.body.scrollTop;if(whichIt.style.pixelLeft<document.body.scrollLeft)
whichIt.style.pixelLeft=document.body.scrollLeft;if(whichIt.style.pixelLeft>document.body.offsetWidth
-document.body.scrollLeft-whichIt.style.pixelWidth-20)
whichIt.style.pixelLeft=document.body.offsetWidth
-whichIt.style.pixelWidth-20;if(whichIt.style.pixelTop>document.body.offsetHeight
+document.body.scrollTop-whichIt.style.pixelHeight-5)
whichIt.style.pixelTop=document.body.offsetHeight
+document.body.scrollTop-whichIt.style.pixelHeight-5;event.returnValue=false;return false;}
efwindow.dropIt=function(){whichIt=null;if(isNS&&!isIE)
window.releaseEvents(Event.MOUSEMOVE);return true;}
efwindow.setValue=function(cell_value){if(showComponent.tagName=='INPUT'){var index=cell_value.indexOf("\r\n");while(index!=-1){cell_value=cell_value.substring(0,index)+EF_CR_IDENTIFIER
+cell_value.substring(index+2);index=cell_value.indexOf("\r\n");}
showComponent.value=cell_value;if(showComponent.callback){try{eval(showComponent.callback+"\""+cell_value+"\" )");}catch(exception){}}}
efwindow.hide();}

function EFSubWindow(divId,title,w,h){this.divId=divId;this.div=document.getElementById(divId);this.title=title;this.w=w;this.h=h;this.returnValue;this.bgObj=newBgObj();this.msgObj=newMsgObj(this.div,this.bgObj,this.title,this.w,this.h);this.show=function(isShowModel){this.msgObj.style.display="";if(isShowModel){this.bgObj.style.display="";}}
function onpropertychange(){if(window.returnValue){alert(this.divId);alert(this.returnValue);this.returnValue=window.returnValue;}}
this.hide=function(){this.msgObj.style.display="none";this.bgObj.style.display="none";return this.returnValue;}
function newBgObj(){var iWidth=document.body.clientWidth;var iHeight=document.body.clientHeight;var bgObj=document.createElement("div");bgObj.style.cssText="position:absolute;left:0px;top:0px;width:"
+iWidth
+"px;height:"
+Math.max(document.body.clientHeight,iHeight)
+"px;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000;z-index:101;";document.body.appendChild(bgObj);bgObj.style.display="none";return bgObj;}
function newMsgObj(div,bgObj,title,w,h){var bordercolor="#666699";var bgcolor="#FFFFFF";var iWidth=document.body.clientWidth;var iHeight=document.body.clientHeight;var msgObj=document.createElement("div");msgObj.style.className="bodyBackground";msgObj.style.cssText="position:absolute;font:11px '宋体';top:"
+(iHeight-h)/2+"px;left:"+(iWidth-w)/2
+"px;width:"+w+"px;height:"+h
+"px;text-align:center;border:1px solid "+bordercolor
+";background-color:"+bgcolor
+";padding:1px;line-height:22px;z-index:102;";document.body.appendChild(msgObj);var table=document.createElement("table");msgObj.appendChild(table);table.style.cssText="margin:0px;border:0px;padding:0px;width:100%;";table.cellSpacing=0;var tr=table.insertRow(-1);var titleBar=tr.insertCell(-1);titleBar.style.cssText="padding-left:8px;line-height:15px;text-align:left;font:bold 12px '宋体';color: #505050"
+";border:0px solid #B3B3B3;cursor:move;background-image:url('EF/Images/bgline01.gif');";titleBar.style.width="96%";titleBar.innerHTML="- "+title;var closeBtn=tr.insertCell(-1);closeBtn.style.cssText=titleBar.style.cssText;closeBtn.style.width="4%";closeBtn.innerHTML="<span style='cursor:hand;font-size:14pt;'>×</span>";closeBtn.onclick=function(){msgObj.style.display="none";bgObj.style.display="none";}
var moveX=0;var moveY=0;var moveTop=0;var moveLeft=0;var moveable=false;var docMouseMoveEvent=document.onmousemove;var docMouseUpEvent=document.onmouseup;titleBar.onmousedown=function(){var evt=getEvent();moveable=true;moveX=evt.clientX;moveY=evt.clientY;moveTop=parseInt(msgObj.style.top);moveLeft=parseInt(msgObj.style.left);document.onmousemove=function(){if(moveable){var evt=getEvent();var x=moveLeft+evt.clientX-moveX;var y=moveTop+evt.clientY-moveY;if(x>0&&(x+w<iWidth)&&y>0&&(y+h<iHeight)){msgObj.style.left=x+"px";msgObj.style.top=y+"px";}}};document.onmouseup=function(){if(moveable){document.onmousemove=docMouseMoveEvent;document.onmouseup=docMouseUpEvent;moveable=false;moveX=0;moveY=0;moveTop=0;moveLeft=0;}};}
var msgRow=table.insertRow(-1);var msgBox=msgRow.insertCell(0);msgRow.insertCell(1);msgBox.colSpan="2";msgBox.appendChild(div);div.style.display="";function getEvent(){return window.event||arguments.callee.caller.arguments[0];}
msgObj.style.display="none";return msgObj;}
this.msgObj.onpropertychange=onpropertychange;}

function EFModalWindow(windowID){this.winID=windowID;theBody=document.getElementsByTagName('body')[0];popmask=document.createElement('iframe');popmask.id=this.winID+'_efModalWindowMask';popmask.className='efModalWindowMask';popmask.scrolling='no';popmask.frameborder='0';popcont=document.createElement('div');popcont.id=this.winID+'_efModalWindowContainer';popcont.className='efModalWindowContainer';theBody.appendChild(popmask);theBody.appendChild(popcont);this.popupMask=document.getElementById(this.winID+"_efModalWindowMask");this.popupContainer=document.getElementById(this.winID+"_efModalWindowContainer");this.popupIsShown=false;if(!document.all){document.onkeypress=this.keyDownHandler;}}
EFModalWindow.prototype.setContent=function(content){if(typeof content=="string"){this.popupContainer.innerHTML=content;}else if(typeof content=="object"){this.popupContainer.innerHTML="";this.popupContainer.appendChild(content);}else{alert(getI18nMessages("ef.ParamInvalid","非法参数"));}}
EFModalWindow.prototype.show=function(width,height){thisobj=this;this.popupIsShown=true;EFModalWindow.disableTabIndexes();this.popupMask.style.display="block";this.popupContainer.style.display="block";this.centerPopWin(width,height);this.popupContainer.style.width=width+"px";this.popupContainer.style.height=height+"px";this.setMaskSize();var obj=this;function centerMethodClosure(){obj.centerPopWin();};EFModalWindow.addEvent(window,"resize",centerMethodClosure);EFModalWindow.addEvent(window,"scroll",centerMethodClosure);window.onscroll=centerMethodClosure;}
EFModalWindow.prototype.showProgressBar=function(){this.setContent('<img src='+efico.get("efform.ajaxLoader")+' >');this.show(30,30);}
EFModalWindow.prototype.centerPopWin=function(width,height){if(this.popupIsShown==true){if(width==null||isNaN(width)){width=this.popupContainer.offsetWidth;}
if(height==null){height=this.popupContainer.offsetHeight;}
var theBody=document.getElementsByTagName("body")[0];var scTop=parseInt(EFModalWindow.getScrollTop(),10);var scLeft=parseInt(theBody.scrollLeft,10);this.setMaskSize();var fullHeight=EFModalWindow.getViewportHeight();var fullWidth=EFModalWindow.getViewportWidth();this.popupContainer.style.top=(scTop+((fullHeight-(height))/2))+"px";this.popupContainer.style.left=(scLeft+((fullWidth-width)/2))+"px";}}
EFModalWindow.prototype.setMaskSize=function(){var theBody=document.getElementsByTagName("body")[0];var fullHeight=EFModalWindow.getViewportHeight();var fullWidth=EFModalWindow.getViewportWidth();if(fullHeight>theBody.scrollHeight){popHeight=fullHeight;}else{popHeight=theBody.scrollHeight;}
if(fullWidth>theBody.scrollWidth){popWidth=fullWidth;}else{popWidth=theBody.scrollWidth;}
this.popupMask.style.height=popHeight+"px";this.popupMask.style.width=popWidth+"px";}
EFModalWindow.prototype.hide=function(){this.popupIsShown=false;var theBody=document.getElementsByTagName("body")[0];theBody.style.overflow="";EFModalWindow.restoreTabIndexes();this.popupContainer.style.display="none";this.popupMask.style.display="none";}
EFModalWindow.prototype.keyDownHandler=function(e){if(this.popupIsShown&&e.keyCode==9)
return false;return true;}
var gTabIndexes=new Array();var gTabbableTags=new Array("A","BUTTON","TEXTAREA","INPUT","IFRAME");EFModalWindow.disableTabIndexes=function(){if(document.all){var i=0;for(var j=0;j<gTabbableTags.length;j++){var tagElements=document.getElementsByTagName(gTabbableTags[j]);for(var k=0;k<tagElements.length;k++){gTabIndexes[i]=tagElements[k].tabIndex;tagElements[k].tabIndex="-1";i++;}}}}
EFModalWindow.restoreTabIndexes=function(){if(document.all){var i=0;for(var j=0;j<gTabbableTags.length;j++){var tagElements=document.getElementsByTagName(gTabbableTags[j]);for(var k=0;k<tagElements.length;k++){tagElements[k].tabIndex=gTabIndexes[i];tagElements[k].tabEnabled=true;i++;}}}}
EFModalWindow.addEvent=function(obj,evType,fn){if(obj.addEventListener){obj.addEventListener(evType,fn,false);return true;}else if(obj.attachEvent){var r=obj.attachEvent("on"+evType,fn);return r;}else{return false;}}
EFModalWindow.removeEvent=function(obj,evType,fn,useCapture){if(obj.removeEventListener){obj.removeEventListener(evType,fn,useCapture);return true;}else if(obj.detachEvent){var r=obj.detachEvent("on"+evType,fn);return r;}else{alert("Handler could not be removed");return false;}}
EFModalWindow.getViewportHeight=function(){if(window.innerHeight!=window.undefined)return window.innerHeight;if(document.compatMode=='CSS1Compat')return document.documentElement.clientHeight;if(document.body)return document.body.clientHeight;return undefined;}
EFModalWindow.getViewportWidth=function(){if(window.innerWidth!=window.undefined)return window.innerWidth;if(document.compatMode=='CSS1Compat')return document.documentElement.clientWidth;if(document.body)return document.body.clientWidth;return undefined;}
EFModalWindow.getScrollTop=function(){if(self.pageYOffset)
{return self.pageYOffset;}
else if(document.documentElement&&document.documentElement.scrollTop)
{return document.documentElement.scrollTop;}
else if(document.body)
{return document.body.scrollTop;}
return-1;}
EFModalWindow.getScrollLeft=function(){if(self.pageXOffset)
{return self.pageXOffset;}
else if(document.documentElement&&document.documentElement.scrollLeft)
{return document.documentElement.scrollLeft;}
else if(document.body)
{return document.body.scrollLeft;}
return-1;}

efcascadeselect=function(){alert("EF CascadeSelect");}
efcascadeselect.getDivWindowSubNodeId=function(div_id){if(isAvailable(ef.get(div_id+"subNode")))
return ef.get(div_id+"subNode").id;else
return"";}
efcascadeselect.createDivWindow=function(div_id,styleClassName,title,width,height,flage,button)
{if(null==flage)
flage="";var ef_subwindow=document.getElementById(div_id);if(ef_subwindow)
return ef_subwindow;if(title!=null)
tempTitle=title;else
tempTitle=getI18nMessages("ef.Choose","请选择");if(null!=button)
buttonName=button;else
buttonName=getI18nMessages("ef.Confirm","确定");if(width!=null)
tempWidth=width;else
tempWidth="400px";if(height!=null)
tempHeight=height;else
tempHeight="280px";ef_subwindow=document.createElement("div");ef_subwindow.id=div_id;ef_subwindow.className=styleClassName;var innerStr="<table cellspacing='0' cellpadding='1'> <tr><td align='left' id='containerOuter'>&nbsp;"+tempTitle+"&nbsp;</td>"
+"<td align='right' id='containerOuter'><img src='"+efico.get('efcalendar.closeImg')+"' onclick='efwindow.hide();'/></td>"
+"</tr><tr><td colspan=2>";ef_subwindow.innerHTML=innerStr+"<div id=\""+div_id+"subNode"+"\" style=\"overflow: hidden;width:"+tempWidth+";height:"+tempHeight+";\"></div></td></tr><tr>"
+"<TD class=\"containerFooter\" colspan=2 align=right><input class=\"buttonRegular\" type=\"button\" value="+buttonName
+" onclick='efcascadeselect.ensure_onclick("+flage+");' /></TD></tr></table>";document.body.appendChild(ef_subwindow);ef_ajax_subwindow=document.createElement("div");ef_ajax_subwindow.id=div_id+"_ajax_loading";ef_ajax_subwindow.innerHTML=innerStr+"<div style='width:"+tempWidth+"'><img src='"+efico.get("efform.statusLoading")+"'>"+getI18nMessages("ef.Loading","信息加载中")+".......</div></td></tr></table>";ef_ajax_subwindow.className=styleClassName;document.body.appendChild(ef_ajax_subwindow);return ef_subwindow;}
efcascadeselect.createHiddenField=function(div_id)
{var ef_hiddenField=document.getElementById(div_id);if(ef_hiddenField)
return ef_hiddenField;ef_hiddenField=document.createElement("input");ef_hiddenField.type="text";ef_hiddenField.style.display="none";ef_hiddenField.id=div_id;ef_hiddenField.name=div_id;document.forms[0].appendChild(ef_hiddenField);return ef_hiddenField;}
efcascadeselect.getEiInfo=function(node,id,flage,fixed){var info=new EiInfo();if(null==id){idsNode=document.getElementById("cascadeSelect");id="cascadeSelect";}
else
idsNode=document.getElementById(id);var divWindow=efcascadeselect.createDivWindow("_efselect_divwindow","efwindow");efwindow.show(document.getElementById(node.id),"_efselect_divwindow_ajax_loading",(!!fixed)?"fixed":"");var idsStr=idsNode.getAttribute("cascadeSelectIds");var divWindowId=divWindow.id;var cascadeService=idsNode.getAttribute("cascadeService");var cascadeServiceMethod=idsNode.getAttribute("cascadeServiceMethod");var currentIndex=10000;strArray=idsStr.split(",");for(var index=0;index<strArray.length;index++){info.setById(strArray[index],document.getElementById(strArray[index]).value);if(strArray[index]==node.id)
currentIndex=index;if(index>currentIndex){tempNode=document.getElementById(strArray[index]);if(flage!=false)tempNode.value="";if(null!=tempNode.getAttribute("linkedFiled")){if(flage!=false)document.getElementById(tempNode.getAttribute("linkedFiled")).value="";}}}
var hiddenNode_currentSelectId=efcascadeselect.createHiddenField("currentSelectId");hiddenNode_currentSelectId.value=node.id;var hiddenNode_idsStr=efcascadeselect.createHiddenField("cascade_idsStr");hiddenNode_idsStr.value=idsStr;var hiddenNode_currentSelectIndex=efcascadeselect.createHiddenField("currentSelectIndex");hiddenNode_currentSelectIndex.value=currentIndex;info.set("cascadeService",cascadeService);info.set("cascadeServiceMethod",cascadeServiceMethod);info.set("currentSelectIndex",currentIndex);info.set("cascade_idsStr",idsStr);info.set("currentSelectId",node.id);info.set("divWindowId",divWindowId);EiCommunicator.send(cascadeService,cascadeServiceMethod,info,efcascadeselect.callback,false,true);}
efcascadeselect.callback={onSuccess:function(eiInfo){efcascadeselect.showlist(eiInfo,eiInfo.get("currentSelectId"));},onFail:function(eMsg){alert("failure");}}
efcascadeselect.showlist=function(info,id){var divwindow=document.getElementById(info.get("divWindowId"));efwindow.hide();var style_config=new Object();style_config["operationBar"]="true";var grid=new efgrid(id,divwindow.id+"subNode");var custom_cols={"index":{},"metas":[]};grid.setEnable(false);grid.setReadonly(true);grid.setAjax(true);grid.setAutoDraw(true);grid.setServiceName(info.get("cascadeService"));grid.setQueryMethod(info.get("cascadeServiceMethod"));grid.setCustomColumns(custom_cols);grid.setData(info);grid.setStyle(style_config);for(i=grid.dataColumns.length;i>=1;i--){column=grid.getColumn(i-1,TYPE_DATA);column.set("width",390/grid.dataColumns.length);}
grid.paint();efwindow.show(document.getElementById(id),divwindow.id,"fixed");}
efcascadeselect.ensure_onclick=function(flage){if(flage==false)
efwindow.hide();else{grid_id=efcascadeselect.getDivWindowSubNodeId("_efselect_divwindow")
var grid=efgrid.getGridObject(grid_id);var index=grid.getCurrentRowIndex();if(index<0){alert(getI18nMessages("ef.NotSelect","未选择记录"));return;}
var type=TYPE_DATA;var cellValue=grid.getCellValue(index,0,type);efwindow.setValue(cellValue);linkedId=showComponent.getAttribute("linkedFiled");if(null!=linkedId){var tempNode=document.getElementById(linkedId);if(tempNode.getAttribute("valueIndex")!=null)
tempNode.value=grid.getCellValue(index,parseInt(tempNode.getAttribute("valueIndex")),type);else
tempNode.value=grid.getCellValue(index,1,type);}
try{efcascadeselect_ensure_onclick(showComponent.id);}catch(ex){}}}
function efcascadeselect_ensure_onclick(id){};

var ef_nav_bars=new Object();efNavBar=function(bar_id)
{this._id=bar_id;this._callback=new Object();}
efNavBar.prototype.setGoFirst=function(go_first)
{this._callback["first"]=go_first;}
efNavBar.prototype.setGoPrevious=function(go_pre)
{this._callback["previous"]=go_pre;}
efNavBar.prototype.setGoNext=function(go_next)
{this._callback["next"]=go_next;}
efNavBar.prototype.setGoLast=function(go_last)
{this._callback["last"]=go_last;}
efNavBar.prototype.setButtonStatus=function(button_id,button_status)
{var real_button_id=this._id+"_"+button_id;var node=ef.get(real_button_id);if(!isAvailable(this._callback[button_id])||!isAvailable(node))
{throw new Error("Button with id:["+real_button_id+"] not exists!");}
if(button_status==false)
{node.parentNode.className="buttonDisabled";node.firstChild.src=EF_IMAGES_PATH+"efgrid_page_"+button_id+"_disabled.gif";node.firstChild.onclick=efform.nullfunction;}
else
{node.parentNode.className="buttonRegular";node.firstChild.src=EF_IMAGES_PATH+"efgrid_page_"+button_id+".gif";node.firstChild.onclick=this._callback[button_id];}}
efNavBar.prototype.paint=function()
{var div_node=ef.get(this._id);if(!div_node)
{alert("Div with id:["+this._id+"] not exists!");return;}
var temp_node=document.createElement("td");temp_node.className="buttonRegular";temp_node.align="center";temp_node.noWrap=true;var inner_html=[];inner_html.push("<table cellspacing=1 cellpadding=1><tr>");var temp_html="<div id='"+this._id+"_first'>"
temp_html+="<IMG src='"+efico.get("efgrid.pageFirst")+"'";temp_html+=" onmouseover=\"this.style.cursor='pointer';\" ></div>";temp_node.innerHTML=temp_html;temp_node.firstChild.onclick=this._callback["first"];inner_html.push(temp_node.outerHTML);temp_html="<div id='"+this._id+"_previous'>"
temp_html+="<IMG src='"+EF_IMAGES_PATH+"efgrid_page_previous.gif'";temp_html+=" onmouseover=\"this.style.cursor='pointer';\" ></div>";temp_node.innerHTML=temp_html;temp_node.firstChild.onclick=this._callback["previous"];inner_html.push(temp_node.outerHTML);temp_html="<div id='"+this._id+"_next'>"
temp_html+="<IMG src='"+efico.get("efgrid.pageNext")+"'";temp_html+=" onmouseover=\"this.style.cursor='pointer';\" ></div>";temp_node.innerHTML=temp_html;temp_node.firstChild.onclick=this._callback["next"];inner_html.push(temp_node.outerHTML);temp_html="<div id='"+this._id+"_last'>"
temp_html+="<IMG src='"+efico.get("efgrid.pageLast")+"'";temp_html+=" onmouseover=\"this.style.cursor='pointer';\" ></div>";temp_node.innerHTML=temp_html;temp_node.firstChild.onclick=this._callback["last"];inner_html.push(temp_node.outerHTML);inner_html.push("</tr></table>");div_node.innerHTML=inner_html.join('');ef_nav_bars[this._id]=this;}
efNavBar.buttonOnMouseMove=function()
{this.style.cursor='pointer';}

efShim=function(){}
efShim.openShim=function(div_node)
{if(div_node==null)return;var shim=efShim.getShim(div_node);if(shim==null)shim=efShim.createMenuShim(div_node,efShim.getShimId(div_node));var div_style=div_node.style;div_style.zIndex=200;var style_obj=shim.style;style_obj.width=div_node.offsetWidth;style_obj.height=div_node.offsetHeight;style_obj.top=div_style.top;style_obj.left=div_style.left;style_obj.zIndex=div_style.zIndex-1;style_obj.position="absolute";style_obj.display="block";}
efShim.closeShim=function(div_node)
{if(div_node==null)return;var shim=efShim.getShim(div_node);if(shim)shim.style.display="none";}
efShim.createMenuShim=function(div_node)
{if(div_node==null)return null;var shim=$("<iframe scrolling='no' frameborder='0' style='position:absolute;top:0px;left:0px;display:none'></iframe>").get(0);shim.name=efShim.getShimId(div_node);shim.id=efShim.getShimId(div_node);if(div_node.offsetParent==null||div_node.offsetParent.id=="")
window.document.body.appendChild(shim);else
div_node.offsetParent.appendChild(shim);return shim;}
efShim.getShimId=function(div_node)
{return"ef_shim";}
efShim.moveTo=function(left,top)
{var shim=efShim.getShim(null);if(shim==null)return;shim.style.top=top;shim.style.left=left;}
efShim.getShim=function(div_node)
{return document.getElementById(efShim.getShimId(div_node));}

ef.initLoad=function()
{efform.init();efvalidator.init();}
ef.initLoad();

efsplitter=function(leftTdId,leftDivId,splitterDivId){return new splitter(leftTdId,leftDivId,splitterDivId);}
splitter=function(leftTdId,leftDivId,splitterDivId){this._attachedWindow=new Array();this._leftTd=leftTdId;this._leftDiv=leftDivId;this._splitterDiv=splitterDivId;this._colOriginPosX=0;this._colOriginPosY=0;this._status=0;this.dbClickCount=0;var host=this;ef.get(splitterDivId).style.backgroundColor="#D2D3D4";ef.get(splitterDivId).style.cursor="e-resize";ef.get(splitterDivId).vAlignr="e-middle";ef.get(splitterDivId).width="4px";ef.get(splitterDivId).innerHTML="<Div style=\" background-image:url("+efico.get("efform.imgVgrabber")+");background-repeat:no-repeat;Width:4px;Height:4px; \" />"
ef.get(splitterDivId).onmousedown=function(e){host.mouseDown(e);}
ef.get(splitterDivId).ondblclick=function(){host.dbClickCount++;if(host.dbClickCount%2==1)
ef.get(leftDivId).style.display="none";else
ef.get(leftDivId).style.display="block";host.ondblclick();}
this.catchEvent(window);}
splitter.prototype.catchEvent=function(wind){this._attachedWindow.push(wind);}
splitter.prototype.mouseDown=function(e){var event=window.event||e;var host=this;if(this._status==0){ef.get(this._splitterDiv).style.backgroundColor="#293D6B";for(var i=0;i<this._attachedWindow.length;i++){var wind=this._attachedWindow[i];if($.browser.safari){wind=wind.window;if(wind==undefined)
wind=this._attachedWindow[i].contentWindow;}
wind.document.body._onmousemove=wind.document.body.onmousemove;wind.document.body._onmouseup=wind.document.body.onmouseup;wind.document.body.onmousemove=function(e){var t=e||this.document.parentWindow.event;host.mouseMove(t);}
wind.document.body.onmouseup=function(e){host.mouseUp();}}
this._colOriginPosX=event.screenX;this._colOriginPosY=event.screenY;this._status=1;}}
splitter.prototype.mouseUp=function(){if(this._status==1){ef.get(this._splitterDiv).style.backgroundColor="#D2D3D4";for(var i=0;i<this._attachedWindow.length;i++){var wind=this._attachedWindow[i];if($.browser.safari){wind=wind.window;if(wind==undefined)
wind=this._attachedWindow[i].contentWindow;}
wind.document.body.onmousemove=wind.document.body._onmousemove;wind.document.body.onmouseup=wind.document.body._onmouseup;}
this.onCompleted();this._status=0;}}
splitter.prototype.onCompleted=function(){}
splitter.prototype.mouseMove=function(e){if(this._status==0){return;}
var pos_x=e.screenX;var pos_y=e.screenY;var minus_px=pos_x-this._colOriginPosX;if(Math.abs(minus_px)<2)return;var divResizeWidth=parseInt(ef.get(this._leftDiv).style.width);divResizeWidth=divResizeWidth+minus_px;if(divResizeWidth<0)divResizeWidth=1;ef.get(this._leftDiv).style.width=divResizeWidth;var columnMove=ef.get(this._leftTd);var _tempWith=new String(columnMove.width);if(_tempWith.indexOf("px")!=-1)
_tempWith=_tempWith.substring(0,_tempWith.length-2);var tempWith=eval(_tempWith)+minus_px;if(tempWith<0)tempWith=1;columnMove.width=tempWith;this._colOriginPosX=pos_x;this._colOriginPosY=pos_y;}
splitter.prototype.ondblclick=function(){this.onCompleted();}

EiInfo.prototype.get=function(str){if(!str)
return null;var strArray=str.split("-");if(3==strArray.length){block=this.getBlock(strArray[0]);if(null!=block)
return block.getCell(parseInt(strArray[1]),strArray[2]);else
return null;}else if(2==strArray.length){block=this.getBlock(strArray[0]);if(null!=block)
return block.get(strArray[1]);else
return null;}
return this.extAttr[strArray[0]];}
NODE_TYPE={FORM_TOPNODE:"FormTopNode",FORM_REGION:"FormRegion",FORM_BUTTON:"FormButton",FORM_NESTREGION:"FormNestRegion",FORM_FIELD:"FormField"};NODE_META={FORM_NAME:"formName",CONTROL_NAME:"controlName",CONTROL_TYPE:"controlType",CONTROL_PARENTNAME:"controlParentName",BLOCK_NAME:"blockName",SEQ_NO:"seqNo"};function UIWidget(node,block){this._node=node;this._id=node[NODE_META.CONTROL_NAME];this._type=node[NODE_META.CONTROL_TYPE];this._block=block;this.childWidgets=[];this.parentWidget=null;this._formRender=null;this.META_NAME={FORM_NAME:"formName",CONTROL_NAME:"controlName",CONTROL_ATTR_NAME:"controlAttrName",CONTROL_ATTR_DISPLAYNAME:"controlAttrDisplayName",CONTROL_ATTR_TYPE:"controlAttrType",CONTROL_ATTR_VALUE:"controlAttrValue",CONTROL_ATTR_DESC:"controlAttrDesc",CONTROL_ATTR_CATEGORY:"controlAttrCategory"};}
UIWidget.prototype.callBack=function(){}
UIWidget.prototype.render=function(){}
UIWidget.prototype.bind=function(){}
UIWidget.prototype.putChildWidget=function(UIWidget){this.childWidgets.push(UIWidget);}
UIWidget.prototype.getChildWidget=function(i){return this.childWidgets[i];}
function FormTopNodeWidget(node,block,attr){UIWidget.apply(this,arguments);this._attr=attr;}
FormTopNodeWidget.prototype=new UIWidget("","");FormTopNodeWidget.prototype.render=function(){var formTopNode_html=[];formTopNode_html.push("<div id=\"FormTopDivNode\">");for(var o in this._attr){var value=this._attr[o];if(o=="FormName")
o="form_ename";var hiddenField="<input type=\"hidden\" id=\"inqu_status-0-"+o+"\" name=\"inqu_status-0-"
+o+"\" value=\""+value+"\" class=\"inputField\"></input>";formTopNode_html.push(hiddenField);}
var len=this.childWidgets.length;for(var i=0;i<len;i++){var _node=this.childWidgets[i].render();if(!!_node){formTopNode_html.push(_node);}}
formTopNode_html.push("</div>");return formTopNode_html.join("");}
FormTopNodeWidget.prototype.callBack=function(){var len=this.childWidgets.length;for(var i=0;i<len;i++){this.childWidgets[i].callBack();}}
FormTopNodeWidget.prototype.bind=function(){var block=__uiDataEiInfo.getBlock("result");if(block.rows.length==0){return;}
this._formRender._editStyle="update";var row=block.rows[0];var cols=block.getBlockMeta().getMetas();for(var key in cols){var col=cols[key];try{document.getElementById("inqu_status-0-"+col.name).value=row[col.pos]==null?"":row[col.pos];}catch(e){}}
var len=this.childWidgets.length;for(var i=0;i<len;i++){this.childWidgets[i].bind();}}
function FormRegionWidget(){UIWidget.apply(this,arguments);this._buttonData=[];}
FormRegionWidget.prototype=new UIWidget("","");FormRegionWidget.prototype.bind=function(){var len=this.childWidgets.length;for(var i=0;i<len;i++){this.childWidgets[i].bind();}
return;}
FormRegionWidget.prototype.callBack=function(){efregion.show(this._regionId);var ef_region_result_buttonbar=new efbuttonbar();ef_region_result_buttonbar.buttonCount=this._buttonData.length;ef_region_result_buttonbar.buttonData=this._buttonData;ef_region_result_buttonbar.paint(this._regionId);var len=this.childWidgets.length;for(var i=0;i<len;i++){this.childWidgets[i].callBack();}}
FormRegionWidget.prototype.render=function(){var domNode_html=[];this._regionId="ef_region_"+this._id;domNode_html.push("<div id = \""+this._regionId+"\"  efRegionShowClear=true ");this._param={};for(var i=0;i<this._block.rows.length;i++){var name=this._block.getCell(i,this.META_NAME.CONTROL_ATTR_NAME);var value=this._block.getCell(i,this.META_NAME.CONTROL_ATTR_VALUE);this._param[name]=value;domNode_html.push(" "+name+"="+value+" ");}
if(this._param["IsVisible"]=="False"){domNode_html.push("style=\"display:none\" ");}
domNode_html.push("title=\""+this._param["DisplayName"]+"\">");domNode_html.push("<div id=\"ef_div_"+this._id+"\" style=\"overflow:hidden;width:100%\" >");var len=this.childWidgets.length;for(var i=0;i<len;i++){var _node=this.childWidgets[i].render();if(!!_node)
domNode_html.push(_node);}
domNode_html.push("</div></div>");return domNode_html.join("");}
function FormFieldWidget(){UIWidget.apply(this,arguments);}
FormFieldWidget.prototype=new UIWidget("","");FormFieldWidget.prototype.bind=function(){if(this._param["IsPrimaryKey"]=="True"){var block=__uiDataEiInfo.getBlock("result");if(block.rows.length==0){return;}
var row=block.rows[0];if(row==null)
return;var cols=block.getBlockMeta().getMetas();var col=cols["ID"];try{document.getElementById("inqu_status-0-"+this._id).value=row[col.pos]==null?"":row[col.pos];document.getElementById("inqu_status-0-"+this._id).readOnly=true;}catch(e){}}
var len=this.childWidgets.length;for(var i=0;i<len;i++){this.childWidgets[i].bind();}}
FormFieldWidget.prototype.callBack=function(){var instance=this;if(this._editStyle=="Date"&&!window["efcalendar_click"]){window["efcalendar_click"]=function(control_source,id)
{var node=ef.get(id);efcalendar(control_source,node,'yyyy-mm-dd',true);}
return;}
if(this._editStyle=="ComboGrid"&&!window[this._id+"_combogrid_onclick"]){window[this._id+"_combogrid_onclick"]=function(){var inInfo=new EiInfo();inInfo.setByNode("inqu_status-0-"+instance._id);var bindingInputId="inqu_status-0-"+instance._id;var serviceName="EDFA00";var queryMethod="query";EiCommunicator.send(serviceName,queryMethod,inInfo);if(ajaxEi==null)return;var subGridColumn=new efSubgridColumn();var eiColumn=new EiColumn(bindingInputId);eiColumn.blockName="result";subGridColumn.setEiMeta({},eiColumn);subGridColumn.set("serviceName",serviceName);subGridColumn.set("queryMethod",queryMethod);subGridColumn.set("valueProperty","form_ename");var div=efform.getSubGridDiv();div.efDisplayCol=subGridColumn;efform.showSubGridWindow(bindingInputId,ajaxEi);}
return;}
if(this._editStyle=="ComboTree"&&!window[this._id+"_combotree_onclick"]){window[this._id+"_combotree_onclick"]=function(){alert('hello Tree');}
return;}}
FormFieldWidget.prototype.render=function(){var FormField_html=[];var isParentFormRegion=false;if(this.parentWidget instanceof FormNestRegionWidget){FormField_html.push("<td nowrap>");isParentFormRegion=false;}
if(this.parentWidget instanceof FormRegionWidget){FormField_html.push("<div >");isParentFormRegion=true;}
var DisplayName="";var EditStyle="Text";var IsReadOnly="False";var IsVisible="True";this._param={};for(var i=0;i<this._block.rows.length;i++){var name=this._block.getCell(i,this.META_NAME.CONTROL_ATTR_NAME);var value=this._block.getCell(i,this.META_NAME.CONTROL_ATTR_VALUE);this._param[name]=value;}
FormField_html.push(this._param["DisplayName"]+((isParentFormRegion==false)?"</td>":""));switch(this._param["EditStyle"]){case"Text":if(!isParentFormRegion)
FormField_html.push("<td nowrap><input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"  name=\"inqu_status-0-"+this._id+"\" class=\"inputField\"  ></input></td>");else
FormField_html.push("<input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"  name=\"inqu_status-0-"+this._id+"\" class=\"inputField\"  ></input>");this._editStyle="Text";break;case"TextArea":if(!isParentFormRegion)
FormField_html.push("<td nowrap><textarea  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></textarea></td>");else
FormField_html.push("<input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></input>");this._editStyle="TextArea";break;case"Date":var date_html=[];date_html.push('<input  type="text"'
+'id=\"inqu_status-0-'+this._id+'\" name=\"inqu_status-0-'+this._id+'\" value="" class="inputField">');date_html.push('<img title="日历选择" '
+'src="./EF/Images/efcalendar_icon.gif" '
+'onmouseover="this.style.cursor="hand"" onclick="efcalendar_click(this,\'inqu_status-0-'+this._id+'\');" '
+'style="cursor: pointer; ">');if(!isParentFormRegion)
FormField_html.push("<td nowrap>"+date_html.join('')+"</td>");else
FormField_html.push(date_html.join(''));this._editStyle="Date";break;case"ComboGrid":var ComboGrid_html=[];ComboGrid_html.push('<input  type="text"'
+'id=\"inqu_status-0-'+this._id+'\" name=\"inqu_status-0-'+this._id+'\" value="" class="inputField">');ComboGrid_html.push('<img title="'+DisplayName+'" '
+'src="./EF/Images/ef_pop_up_window.gif" '
+'onmouseover="this.style.cursor="hand"" onclick="'+this._id+'_combogrid_onclick();" '
+'style="cursor: pointer; ">');if(!isParentFormRegion)
FormField_html.push("<td nowrap>"+ComboGrid_html.join('')+"</td>");else
FormField_html.push(ComboGrid_html.join(''));this._editStyle="ComboGrid";break;case"ComboTree":var ComboTree_html=[];ComboTree_html.push('<input  type="text"'
+'id=\"inqu_status-0-'+this._id+'\" name=\"inqu_status-0-'+this._id+'\" value="" class="inputField">');ComboTree_html.push('<img title="'+DisplayName+'" '
+'src="./EF/Images/ef_pop_up_window.gif" '
+'onmouseover="this.style.cursor="hand"" onclick="'+this._id+'_combotree_onclick();" '
+'style="cursor: pointer; ">');if(!isParentFormRegion)
FormField_html.push("<td nowrap>"+ComboTree_html.join('')+"</td>");else
FormField_html.push(ComboTree_html.join(''));this._editStyle="ComboTree";break;case"ComboBox":var opts=[];opts.push("<option selected value='"+"baogang"+"'>"+"宝钢股份公司"+"</option>");opts.push("<option selected value='"+"baoxing"+"'>"+"宝信软件公司"+"</option>");opts.push("<option selected value='"+"baoxing"+"'>"+"宝信软件公司"+"</option>");opts.push("<option selected value='"+"baogang"+"'>"+"宝钢股份公司"+"</option>");opts.push("<option selected value='"+"baogang"+"'>"+"宝钢股份公司"+"</option>");opts.push("<option selected value='"+"baogang"+"'>"+"宝钢股份公司"+"</option>");if(!isParentFormRegion)
FormField_html.push("<td nowrap>"+"<select class='pulldown' "+">"+opts.join("")+"</select>"+"</td>");else
FormField_html.push("<select class='pulldown' "+">"+opts.join("")+"</select>");this._editStyle="ComboBox";break;case"CheckBox":if(!isParentFormRegion)
FormField_html.push("<td nowrap><input  type=\"checkbox\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></input></td>");else
FormField_html.push("<input  type=\"checkbox\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></input>");this._editStyle="CheckBox";break;default:if(!isParentFormRegion)
FormField_html.push("<td nowrap><input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"  class=\"inputField\"  ></input></td>");else
FormField_html.push("<input  type=\"text\"  id=\"inqu_status-0-"+this._id+"\"   name=\"inqu_status-0-"+this._id+"\"   class=\"inputField\"  ></input>");this._editStyle="Text";break;}
if(!isParentFormRegion)
FormField_html.push("</td>");else
FormField_html.push("</div>");return FormField_html.join("");}
function FormButtonWidget(){UIWidget.apply(this,arguments);}
FormButtonWidget.prototype=new UIWidget("","");FormButtonWidget.prototype.bind=function(){var len=this.childWidgets.length;for(var i=0;i<len;i++){this.childWidgets[i].bind();}}
FormButtonWidget.prototype.callBack=function(){var instance=this;window["button_"+this._id.toLowerCase()+"_onclick"]=function()
{var inInfo=new EiInfo();inInfo.setByNode("FormTopDivNode");var method="insert";if(instance._formRender._editStyle=="update")
method="update";EiCommunicator.send("EDDF02",method,inInfo,{onSuccess:function(eiInfo){efform.setStatus(0,"保存信息成功！");},onFail:function(eMsg){efform.setStatus(-1,"保存信息失败！");}});}
return;}
FormButtonWidget.prototype.render=function(){if(this.parentWidget instanceof FormRegionWidget){var buttonData=[];var buttonName="",buttonSeqNo="",buttonDisplayName="";this._param={};for(var i=0;i<this._block.rows.length;i++){var name=this._block.getCell(i,this.META_NAME.CONTROL_ATTR_NAME);var value=this._block.getCell(i,this.META_NAME.CONTROL_ATTR_VALUE);this._param[name]=value;}
buttonData.push(this._param["Name"]);buttonData.push(this._param["DisplayName"]);buttonData.push(this._param["SeqNo"]);this.parentWidget._buttonData.push(buttonData);}}
function FormNestRegionWidget(){UIWidget.apply(this,arguments);}
FormNestRegionWidget.prototype=new UIWidget("","");FormNestRegionWidget.prototype.bind=function(){var len=this.childWidgets.length;for(var i=0;i<len;i++){this.childWidgets[i].bind();}}
FormNestRegionWidget.prototype.callBack=function(){var len=this.childWidgets.length;for(var i=0;i<len;i++){this.childWidgets[i].callBack();}}
FormNestRegionWidget.prototype.render=function(){var columnCount=3;this._param={};for(var i=0;i<this._block.rows.length;i++){var name=this._block.getCell(i,this.META_NAME.CONTROL_ATTR_NAME);var value=this._block.getCell(i,this.META_NAME.CONTROL_ATTR_VALUE);this._param[name]=value;}
this._regionId="ef_nestRegion_"+this._id;var FormNest_html=[];FormNest_html.push("<fieldset id=\""+this._regionId+"\""+((this._param["IsVisible"]=="False")?" style=\"display:none\" ":"")
+"><legend>"+this._param["DisplayName"]+"</legend>");columnCount=parseInt(this._param["ColumnCount"]);if(!columnCount)
columnCount=3;FormNest_html.push("<table id=\"ef_nestRegion_table"+this._id+"\">");var len=this.childWidgets.length;for(var i=0;i<len;i++){if(i%columnCount==0){if(i==0)
FormNest_html.push("<tr>");else
FormNest_html.push("</tr><tr>");}
var _node=this.childWidgets[i].render();if(!!_node)
FormNest_html.push(_node);}
FormNest_html.push("</tr></table></fieldset>");return FormNest_html.join("");}
function EFFormRender(paintId){if(paintId=="")
this._paintNode=window.document.body;else
this._paintNode=document.getElementById(paintId);this.CONSTANT={RESULT:"result",TOPNODE:"topNode"};this.FORM_ATTR={ATTR_ISEXIST:"isExist",ATTR_TYPE:"Type",ATTR_DISPLAYNAME:"DisplayName",ATTR_FORMNAME:"FormName",ATTR_SECONDMODULE:"SecondModule",ATTR_SERVICENAME:"serviceName",ATTR_FIRSTMODULE:"FirstModule",ATTR_USERNAME:"Username",ATTR_SERVICE:"service",ATTR_METHOD:"method",ATTR_PROJECT:"Project",ATTR_RECREATOR:"recCreator",ATTR_METHODNAME:"methodName"};this.parentNode=this._paintNode;this._editStyle="insert";};EFFormRender.prototype.init=function(info){this.eiinfo=info;this.WidgetObjs={};this.generateTree();}
EFFormRender.prototype.generateTree=function(){var result=this.eiinfo.getBlock(this.CONSTANT.RESULT);var resultRows=result.getRows();var count=resultRows.length;for(var i=0;i<count;i++){var node={};node[NODE_META.FORM_NAME]=result.getCell(i,NODE_META.FORM_NAME);node[NODE_META.CONTROL_NAME]=result.getCell(i,NODE_META.CONTROL_NAME);node[NODE_META.CONTROL_TYPE]=result.getCell(i,NODE_META.CONTROL_TYPE);node[NODE_META.CONTROL_PARENTNAME]=result.getCell(i,NODE_META.CONTROL_PARENTNAME);node[NODE_META.BLOCK_NAME]=result.getCell(i,NODE_META.BLOCK_NAME);node[NODE_META.SEQ_NO]=result.getCell(i,NODE_META.SEQ_NO);this.generateWidgetTree(node);}
this.parentNode.appendChild(this.generateUI());this.topUIWidget.bind();this.topUIWidget.callBack();}
EFFormRender.prototype.generateWidgetTree=function(node){var instance=this;switch(node[NODE_META.CONTROL_TYPE]){case NODE_TYPE.FORM_TOPNODE:var attr={};for(var o in this.FORM_ATTR){attr[this.FORM_ATTR[o]]=this.eiinfo.get(this.FORM_ATTR[o]);}
this.topUIWidget=new FormTopNodeWidget(node,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]),attr);this.WidgetObjs[node[NODE_META.CONTROL_NAME]]=this.topUIWidget;this.topUIWidget.parentWidget=null;this.topUIWidget._formRender=instance;break;case NODE_TYPE.FORM_REGION:var formRegion=new FormRegionWidget(node,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]));this.WidgetObjs[node[NODE_META.CONTROL_NAME]]=formRegion;this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]].putChildWidget(formRegion);formRegion.parentWidget=this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]];formRegion._formRender=instance;break;case NODE_TYPE.FORM_BUTTON:var formButton=new FormButtonWidget(node,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]));this.WidgetObjs[node[NODE_META.CONTROL_NAME]]=formButton;this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]].putChildWidget(formButton);formButton.parentWidget=this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]];formButton._formRender=instance;break;case NODE_TYPE.FORM_NESTREGION:var formNest=new FormNestRegionWidget(node,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]));this.WidgetObjs[node[NODE_META.CONTROL_NAME]]=formNest;this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]].putChildWidget(formNest);formNest.parentWidget=this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]];formNest._formRender=instance;break;case NODE_TYPE.FORM_FIELD:var formField=new FormFieldWidget(node,this.eiinfo.getBlock(node[NODE_META.BLOCK_NAME]));this.WidgetObjs[node[NODE_META.CONTROL_NAME]]=formField;this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]].putChildWidget(formField);formField.parentWidget=this.WidgetObjs[node[NODE_META.CONTROL_PARENTNAME]];formField._formRender=instance;break;}}
EFFormRender.prototype.generateUI=function(){var div=document.createElement("div");div.innerHTML=this.topUIWidget.render();return div;}
