var isAuthSuccess=false;
efform_onload = function() {
	//efform.hideFormHead();		
	//$("#ef_tab_y").children('br').remove();
	//$('#efFormStatus').remove();
	//$('#_efFormGuide').remove();
	$('#ef_region_auth').hide();
	//adtree.expand();
}


function treeNodeInitializer(node) {
	if(node.isAuth=='1')
	node.type( new checkItemType(true) );
	else
	node.type( new checkItemType(false) );
}

var adtree = new eiTreeModel('EW020000');
function configTree(tree) {
	tree.nodeInitializer = treeNodeInitializer;
	tree.param=$('#identity').val();;
}
function configADTree(tree) {
	tree.nodeInitializer = treeNodeInitializer;
	tree.param=$('#identity').val();
}
function configCFTree(tree) {
	tree.nodeInitializer = treeNodeInitializer;
	tree.param=$('#identity').val();
}
function configCUTree(tree) {
	tree.nodeInitializer = treeNodeInitializer;
	tree.param=$('#identity').val();
}
function getADTree() {
	return adtree;
}

var cutree = new eiTreeModel('EW020001');
function getCUTree() {
	return cutree;
}


var cftree = new eiTreeModel('EW020002');
function getCFTree() {
	return cftree;
}

function findADTreeNode(id) {
	var tree = getADTree();
	if (!id)
		return tree._rootNode;
	var q = [];
	q.push(tree._rootNode);
	while (q.length > 0) {
		var n = q.pop();
		if (n.label() == id)
			return n;
		if (n.leaf())
			continue;
		var children = n.getChildNodes(); 
		for (var i=0; i<children.length; i++)
			q.push(children[i]);
	}
	return null;
}

function button_select_onclick() {
	var options={'width':650,'height':450,'params':'efHeadTail=none'};
	dialog('选择角色', 'EW0201',options);
	
}

function button_cancel_onclick() {
	 button_query_onclick();
}

function button_query_onclick() {
	adtree = new eiTreeModel('EW020000');
	adtree = new EFTree(adtree, "adtree", "流程目录", "", "1");
	configADTree(adtree);
	$('#adtree').empty();
	$('#adtree').append(adtree.render());
	//adtree.depth="6";
	adtree.expand();

	cutree = new eiTreeModel('EW020001');
	cutree = new EFTree(cutree, "cutree", "流程目录", "", "1");
	configCUTree(cutree);
	$('#cutree').empty();
	$('#cutree').append(cutree.render());
	//cutree.depth="6";
	cutree.expand();
	
    cftree = new eiTreeModel('EW020002');
	cftree = new EFTree(cftree, "cftree", "流程目录", "", "1");
	configCFTree(cftree);
	$('#cftree').empty();
	$('#cftree').append(cftree.render());
	//cftree.depth="6";
	cftree.expand();
	$('#ef_region_auth').show();
}

button_confirm_onclick = function() 
{
  var sel = getADSelectionCates();
  saveCategoryPermission(sel,"POST","T_CAT_AD");
  sel = getCUSelectionCates();
  saveCategoryPermission(sel,"POST","T_CAT_CU");
  sel = getCFSelectionCates();
  saveCategoryPermission(sel,"POST","T_CAT_CF");
  if(isAuthSuccess)
  alert("角色["+$('#identityDesc').val()+"]权限配置成功!");
}
function saveCategoryPermission(sel,userType,objectType){

  document.getElementById("inqu_status-0-authorize").value = sel;    
 // efgrid.submitForm( "ef_grid_c", "es","ES50","delete", true );
    var info = new EiInfo();
    var blk = create_block('inqu_status', ['authorize']);
    var row = [];
    row.push(sel);
    blk.addRow(row);
	info.addBlock(blk);
	
	blk = create_block('result', ['clazz', 'identity', 'desc']);
	row = [];
	row.push(userType);
	row.push($('#identity').val());
	row.push($('#identityDesc').val());
	blk.addRow(row);
	info.addBlock(blk);
	info.setAttr({"objectType":objectType,"subjectName":$('#identity').val()});
	//info.setAttr("subjectName",$('#identity').val());
	EiCommunicator.send('EW02', 'saveCategoryPermissions', info, {
				onSuccess : function(outInfo) {
                 isAuthSuccess=true;
				},
				onFail : function(message) {
					alert(message);
				}
			}, false, false);
}
function create_block(blkid, columns) {
	var meta = new EiBlockMeta(blkid);
	for (var i=0; i<columns.length; i++)
		meta.addMeta(new EiColumn(columns[i]));
	return new EiBlock(meta);
}

function getADSelectionCates(){
  var auths = [];
  var _selectedItems = adtree.getChecked();
  for( var i=0; i<_selectedItems.length; i++ ){   
    auths.push("T_CAT_AD|");
    auths.push(_selectedItems[i]);
    auths.push(",");
  }
  return auths.join('');
}
function getCUSelectionCates(){
  var auths = [];
  var _selectedItems = cutree.getChecked();
  for( var i=0; i<_selectedItems.length; i++ ){   
    auths.push("T_CAT_CU|");
    auths.push(_selectedItems[i]);
    auths.push(",");
  }
  return auths.join('');
}
function getCFSelectionCates(){
  var auths = [];
  var _selectedItems = cftree.getChecked();
  for( var i=0; i<_selectedItems.length; i++ ){   
    auths.push("T_CAT_CF|");
    auths.push(_selectedItems[i]);
    auths.push(",");
  }
  return auths.join('');
}
function dialog(title, form, options) {
	var src = window.location.pathname + '?efFormEname=' + form;
	if (options && options.params)
		src += '&' + options.params;
	$('body').append($('<div style="display:none"/>')
			.attr({id: form, title: title}));
			
//		var iframe = $("<iframe>").attr("src", src).attr({id: form, title: title}).css({height : '100%', width : '100%'});
//       iframe.appendTo("body");
//		$("#"+form).appendTo("form:eq(0)");
	$('#' + form).dialog({
		autoOpen : true,
		modal : true,
		height : options && options.height ? options.height : 600,
		width : options && options.width ? options.width : 800,
		zIndex : 9999,
		resizable: false,
		close: function(event, ui) {
			$(event.target).dialog("destroy").remove();
			if (options && options.onclose)
				options.onclose(event, ui);
		}
	});
	
	//IE9 Iframe在DOM移动一次 加载js就会失败
	$('#' + form).append(
			$('<iframe frameborder= "0" />')
			.attr('src', src)
			.css({height : '100%', width : '100%'}));
}

function closeDialog(name) {
	var dia = $('#' + name);
	dia.dialog('close');
}
 