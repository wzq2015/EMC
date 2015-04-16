var orgTreeModel = new eiTreeModel('EDMD5301');
var buttonOpt = "update";

var formId = "-1";
var formEname = "";
var nTree;

efform_onload = function() {
    efsplitter("leftTree", "leftTreeDiv", "middleSplitter");
    var ef_region_top_buttonbar = new efbuttonbar();
    ef_region_top_buttonbar.paint("ef_region_top");
    enableButtons(false);

    formId = ef.get("formId").value;
    formEname = ef.get("formEname").value;
    var _formCname = ef.get("formCname").value;
    _formCname = decodeURI(_formCname);
    var _text = formEname + "-" + _formCname;
    nTree = new EFTree(orgTreeModel, "nTree", _text);
    configTree(nTree);
    $('#nTree').append(nTree.render());
    nTree._rootNode._label = formEname + "-page";

    $("#ef_region_button").hide();
    $("#ef_region_region").hide();
    $("#ef_region_args").hide();

    efgrid.getGridObject("ef_grid_args").setLimit(100);

    // 弹出框事件
    var sub_grid = efform.getGrid("ef_grid_funcgrid");

    efform.msgDisplayStyle = "alert";
    sub_grid.onRowDblClicked = funcgrid_popup_save_onclick;
}

button_rg_update_onclick = function() {
    if (efvalidateForm(ef.get("EDMD53"))) {
        var info = new EiInfo();
        info.setByNode("ef_region_region");

        var update_callback = {
            onSuccess : function(eiInfo) {

            },
            onFail : function(eMsg) {
                alert("服务调用失败: " + eMsg);
            }
        };

        EiCommunicator.send("EDMD53", "update", info, update_callback, false,
                true);
    }
}

button_cng_btn_onclick = function() {
    $("#ef_region_button").show();
    efbutton.setButtonStatus("BN_UPDATE", true);
    efbutton.setButtonStatus("BN_DELETE", false);
    buttonOpt = "insert";
    efform.clearDiv("ef_region_button");
    $("#button-0-buttonEname").attr("readOnly", false);
}

button_bn_update_onclick = function() {
    if (efvalidateForm(ef.get("EDMD53"))) {
        if (buttonOpt == "update") {
            var info = new EiInfo();
            info.setByNode("ef_region_button");
            info.set("formEname", formEname);

            var update_callback = {
                onSuccess : function(eiInfo) {

                },
                onFail : function(eMsg) {
                    alert("服务调用失败: " + eMsg);
                }
            };

            EiCommunicator.send("EDMD54", "update", info, update_callback,
                    false, true);
        } else if (buttonOpt == "insert") {
            var info = new EiInfo();
            info.setByNode("ef_region_button");
            info.set("formEname", formEname);

            var save_callback = {
                onSuccess : function(eiInfo) {
                    reloadCurrentNode();
                    efform.clearDiv("ef_region_button");
                },
                onFail : function(eMsg) {
                    alert("服务调用失败: " + eMsg);
                }
            };

            EiCommunicator.send("EDMD54", "insert", info, save_callback, false,
                    true);
        } else {

        }
    }
}

button_synchronize_onclick = function() {

    var info = new EiInfo();
    info.set("formEname", formEname);

    var synchronize_callback = {
        onSuccess : function(eiInfo) {
            // var _isFormExist = eiInfo.get( "isFormExist" );
            alert("页面配置信息已同步到平台元数据中");
        },
        onFail : function(eMsg) {
            alert("服务调用失败: " + eMsg);
        }
    };

    EiCommunicator.send("EDMD53", "synchronize", info, synchronize_callback,
            false, true);
}

button_bn_delete_onclick = function() {
    var info = new EiInfo();
    info.setByNode("ef_region_button");

    var delete_callback = {
        onSuccess : function(eiInfo) {
            reloadParentNode();
            efform.clearDiv("ef_region_button");
            enableButtons(false);
        },
        onFail : function(eMsg) {
            alert("服务调用失败: " + eMsg);
        }
    };

    EiCommunicator.send("EDMD54", "delete", info, delete_callback, false, true);
}

button_a_update_onclick = function() {
    // 判断是否选择记录
    var grid = efgrid.getGridObject("ef_grid_args");
    if(grid.getSelectRowsData().length < 1) {
        alert("您没有选择记录进行修改,请选择数据记录");
        return;
    }
    efgrid.submitForm("ef_grid_args", "ed", "EDMD17", "update", true,true);
}

function configTree(tree) {
    tree.emptyNodeAsLeaf = false;
    tree.activeEmptyJudger = false;
    tree.topNodeActive = false;
    tree.nodeInitializer = treeNodeInitializer;
    // tree.initialExpandDepth = 10;
}

function treeNodeInitializer(node) {
    if (node.top()) {
        node.active(true);
        node.textClicked = function() {
            treeNodeClicked(node);
        };
        return;
    }
    ;
    node.textClicked = function() {
        treeNodeClicked(node);
    };
}


function treeNodeClicked(node) {

    var nodeData = node.data();
    if (nodeData != null && nodeData != undefined) {
        if (nodeData["type"] == "region") {
            $("#ef_region_region").show();
            $("#ef_region_args").show();
            $("#ef_region_button").hide();
            efbutton.setButtonStatus("RG_UPDATE", true);
            efbutton.setButtonStatus("CNG_BTN", true);

            var info = new EiInfo();
            var nodeLabel = nodeData["label"].split("-");
            if (nodeLabel.length > 0) {
                info.set("regionId", nodeLabel[0]);

                ef.get("inqu_status-0-regionId").value = nodeLabel[0];

                info.set("formEname", formEname);
                info.set("formId", formId);
                var block = new EiBlock("result");
                block.set("limit", "100");
                info.addBlock(block);
                document.getElementById("button-0-regionId").value = nodeLabel[0];
            }

            var ajax_callback = {
                onSuccess : function(eiInfo) {
                    fillSelect(eiInfo);
                    var _resultBlock = eiInfo.getBlock("result");
                    document.getElementById("result-0-id").value = _resultBlock
                            .getCell(0, "id");
                    document.getElementById("result-0-regionEname").value = _resultBlock
                            .getCell(0, "regionEname");
                    document.getElementById("result-0-regionType").value = _resultBlock
                            .getCell(0, "regionType");
                    document.getElementById("result-0-funcId").value = _resultBlock
                            .getCell(0, "funcId");
                    document.getElementById("result-0-funcCname").value = _resultBlock
                            .getCell(0, "funcCname");

                    var argGrid = efgrid.getGridObject("ef_grid_args");
                    if (argGrid != null) {
                        argGrid.refresh(eiInfo);
                    }

                    // 执行一次查询，更改功能配置subgrid中的内容(不同的区域类型可以选择不同的功能配置)
                    button_subgrid_query_onclick();
                    /*
                     * if(eiInfo){
                     * $("#result-0-funcId").click(function(){popGrid(eiInfo)}); }
                     */
                },
                onFail : function(eMsg) {
                    alert("服务调用失败: " + eMsg);
                }
            };

            EiCommunicator.send("EDMD53", "queryRegion", info, ajax_callback);

        } else if (nodeData["type"] == "button") {

            $("#ef_region_region").hide();
            $("#ef_region_args").hide();
            $("#ef_region_button").show();
            $("#button-0-buttonEname").attr("readOnly", true);
            efbutton.setButtonStatus("BN_UPDATE", true);
            efbutton.setButtonStatus("BN_DELETE", true);
            buttonOpt = "update";

            var ajax_callback = {
                onSuccess : function(eiInfo) {
                    var _resultBlock = eiInfo.getBlock("button");
                    document.getElementById("button-0-id").value = _resultBlock
                            .getCell(0, "id");
                    document.getElementById("button-0-buttonEname").value = _resultBlock
                            .getCell(0, "buttonEname").trim();
                    document.getElementById("button-0-buttonCname").value = _resultBlock
                            .getCell(0, "buttonCname").trim();
                    document.getElementById("button-0-validateGroup").value = _resultBlock
                            .getCell(0, "validateGroup").trim();
                    document.getElementById("button-0-nodeSortId").value = _resultBlock
                            .getCell(0, "nodeSortId").trim();
                    document.getElementById("button-0-serviceEname").value = _resultBlock
                            .getCell(0, "serviceEname").trim();
                    document.getElementById("button-0-methodEname").value = _resultBlock
                            .getCell(0, "methodEname").trim();
                    document.getElementById("button-0-buttonCode").value = _resultBlock
                            .getCell(0, "buttonCode").trim();

                },
                onFail : function(eMsg) {
                    alert("服务调用失败: " + eMsg);
                }
            };

            var info = new EiInfo();
            var nodeLabel = nodeData["label"].split("-");
            if (nodeLabel.length > 0) {
                info.set("buttonId", nodeLabel[0]);
            }

            EiCommunicator.send("EDMD54", "queryBtnById", info, ajax_callback);
        } else {
            enableButtons(false);
        }
    }
}

function fillSelect(info) {
}

function clearOpt() {
}

function enableButtons(enable) {
    efbutton.setButtonStatus("BN_UPDATE", enable);
    efbutton.setButtonStatus("BN_DELETE", enable);
    efbutton.setButtonStatus("RG_UPDATE", enable);
    efbutton.setButtonStatus("CNG_BTN", enable);
}

reloadCurrentNode = function() {
    var no = nTree.getCurrent();
    if (no == null) {
        nTree.reload(orgTreeModel);
    } else {
        no.reload();
    }
}

reloadParentNode = function() {
    var no = nTree.getCurrent();
    if (no == null) {
        nTree.reload(orgTreeModel);
    } else {
        if (no._parent != null) {
            no._parent.reload();
        }
    }
}

efform_onPopupReturn = function(formname, rows) {

    var callback = {
        onSuccess : function(eiInfo) {
            reloadCurrentNode();
        },
        onFail : function(eMsg) {
            alert(eMsg);
        }
    };

}

function subgrid_save_onclick(gridId, value) {
    var sub_grid = efform.getGrid("_ef_grid_subgrid");
    var index = sub_grid.getCurrentRowIndex();
    if (index < 0) {
        alert(getI18nMessages("ef.NotSelect", "未选择记录"));
        return;
    }
    var cell_value = sub_grid.getBlockData().getCell(index, "id");
    efwindow.setValue(cell_value);
}

/**
 * 弹出框选择子页面
 */
button_subgrid_query_onclick = function() {
    efgrid.submitInqu("ef_grid_funcgrid", "ed", "EDMD45", "queryFunc");
}

funcgrid_popup_save_onclick = function() {
    var grid = efgrid.getGridObject("ef_grid_funcgrid");
    var index = grid.getCurrentRowIndex();
    if (index < 0) {
        alert(getI18nMessages("ef.NotSelect", "未选择记录"));
        return;
    }
    var cell_value = grid.getBlockData().getCell(index, "id");
    // alert(cell_value);

    var cell_label = grid.getBlockData().getCell(index, "funcCname");

    // 调用efPopupColumn.transferDataToParent 函数，传递值和显示值给弹出的父Cell。
    efPopupColumn.transferDataToParent("ef_Popup", cell_value, cell_label);
}
