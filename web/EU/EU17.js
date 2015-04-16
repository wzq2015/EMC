var _meta = new EiBlockMeta("result");
var _keyCol = new EiColumn("key");
_keyCol.descName = "参数名称";
_keyCol.pos = 0;
_meta.addMeta(_keyCol);
var _valueCol = new EiColumn("value");
_valueCol.descName = "参数值";
_valueCol.pos = 1;
_meta.addMeta(_valueCol);

button_query_onclick = function() {
	sendCommand();
}
ajax_callback = {
	onSuccess : function(eiInfo) {
		var foundResult = false;
		var blockId = "result";
		for ( var block in eiInfo.blocks) {
			if (!foundResult) {
				blockId = block;
				foundResult = true;
			}
			if (block == "result") {
				blockId = "result";
				break;
			}
		}
		if (!foundResult) {
			var block = new EiBlock(_meta);
			eiInfo.addBlock(block);

			for ( var attr in eiInfo.extAttr) {
				switch (attr) {
				case "remoteHostAddress":
				case "funcId":
				case "remoteHostAddress":
				case "serviceName":
				case "funcPara":
				case "methodName":
				case "funcReturnValue":
					continue;
				default:
					block.addRow([ attr, eiInfo.get(attr) ]);
				}

			}
		}

		var ef_grid = efform.getGrid("ef_grid_result");
		ef_grid.blockId = blockId;
		ef_grid.refresh(eiInfo);
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}

function sendCommand() {

	var info = new EiInfo();
	info.setByNode("ef_region_remote");

	EiCommunicator.send("EU17", "call", info, ajax_callback);
}
