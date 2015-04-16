/**
 *
 * 单记录表单分页
 */
function efFormPage(blockId,formId,divId){
    this.blockId = blockId;
    this.formId = formId;
    this.divId = divId;
    this.isAjax = false;

    var pagebar = this;
    this.ui = {
        init:function(){
            this.generateTable();
            this.controlButtons();
            this.addEvents();
        },
        generateTable:function(){
            var tr = this.tr;
            this.table.append(tr);
            $.each(this.buttons,function(index){
                tr.append($("<td width=12/>").append($(this)));
            });
            tr.append($("<td  width='14'/>").append(this.input));
            tr.append($("<td  width='16'/>").append(this.jumpPage));
            if(pagebar.getCount()>0){
                tr.append($("<td nowrap/>").html("共"+pagebar.getCount()+"条记录"));
            }else{
                tr.append($("<td nowrap/>").html("共0条记录"));
            }

        },
        controlButtons:function(){
            //跳转到第一页按钮控制
            if(pagebar.getCount()>0&&(pagebar.getOffset()>0)){
                $(this.buttons.firstButton).attr("src",efico.get("efgrid.pageFirst"));
            }else{
                $(this.buttons.firstButton).attr("src",efico.get("efgrid.pageFirstDisabled"));
            }
            //向前按钮控制
            if(pagebar.getCount()>0&&(pagebar.getOffset()>=pagebar.getLimit())){
                $(this.buttons.prevButton).attr("src",efico.get("efgrid.pagePrevious"));
            }else{
                $(this.buttons.prevButton).attr("src",efico.get("efgrid.pagePreviousDisabled"));
            }
            //向后按钮控制
            if(pagebar.getCount()>0&&(pagebar.getOffset()+pagebar.getLimit()<pagebar.getCount())){
                $(this.buttons.nextButton).attr("src",efico.get("efgrid.pageNext"));
            }else{
                $(this.buttons.nextButton).attr("src",efico.get("efgrid.pageNextDisabled"));
            }
            //跳转到最后一页按钮控制
            if(pagebar.getCount()>0&&(pagebar.getOffset()+pagebar.getLimit())<pagebar.getCount()){
                $(this.buttons.lastButton).attr("src",efico.get("efgrid.pageLast"));
            }else{
                $(this.buttons.lastButton).attr("src",efico.get("efgrid.pageLastDisabled"));
            }
            //记录条数赋值
            if(pagebar.getCount()>0){
                this.input.attr("value",(pagebar.getOffset()+1));
            }else{
                this.input.attr("value",0);
            }

        },addEvents:function(){
            var uiproxy = this;
            //添加跳转事件
            this.buttons.firstButton.click(function(){
                if(pagebar.getCount()>0&&(pagebar.getOffset()>0)){
                    pagebar.setOffset(0);
                    pagebar.submit();
                }
            });
            this.buttons.prevButton.click(function(){
                if(pagebar.getCount()>0&&(pagebar.getOffset()>=pagebar.getLimit())){
                    pagebar.setOffset( pagebar.getOffset()-1);
                    pagebar.submit();
                }
            });
            this.buttons.nextButton.click(function(){
                if(pagebar.getCount()>0&&(pagebar.getOffset()+pagebar.getLimit()<pagebar.getCount())){
                    pagebar.setOffset( pagebar.getOffset()+1);
                    pagebar.submit();
                }
            });
            this.buttons.lastButton.click(function(){
                if(pagebar.getCount()>0&&(pagebar.getOffset()+pagebar.getLimit()<pagebar.getCount())){
                    pagebar.setOffset( pagebar.getCount()-1);
                    pagebar.submit();
                }
            });
            this.jumpPage.click(function(){
                if(pagebar.getCount()>0){
                    var offset = parseInt(uiproxy.input.attr("value"||"0"));
                    if(offset>pagebar.getCount()){
                        pagebar.setOffset( pagebar.getCount()-1);
                    }else if(offset<=0){
                        pagebar.setOffset(0);
                    }else{
                        pagebar.setOffset(offset-1);
                    }
                    pagebar.submit();
                }
            });
        }
    };
    this.ui.table = $("<table/>");
    this.ui.tr = $("<tr/>");
    this.ui.input = $("<input type='text' style='width:25px'/>");
    this.ui.buttons = {};
    this.ui.buttons.firstButton = $('<img style="cursor: pointer;">');
    this.ui.buttons.prevButton = $('<img style="cursor: pointer;">');
    this.ui.buttons.nextButton = $('<img style="cursor: pointer;">');
    this.ui.buttons.lastButton = $('<img style="cursor: pointer;">');
    this.ui.jumpPage = $('<img style="cursor: pointer;" src='+efico.get("efgrid.jumpPage")+'>');

}

efFormPage.prototype.paint = function(){
    $("#"+this.divId).append(this.ui.table);
    this.ui.init();
}

efFormPage.prototype.show = function(){
    this.paint();
}

efFormPage.prototype.setEiInfo = function(eiInfo){
    this.eiInfo = eiInfo;
    this.getCount();
    this.getLimit();
    this.getOffset();
}

efFormPage.prototype.getEiInfo = function(){
    return this.eiInfo;
}

efFormPage.prototype.getCount = function(){
    var count =parseInt(this.eiInfo.getBlock(this.blockId).getAttr()["count"]||"0");
    this.setCount(count);
    return count;
}

efFormPage.prototype.setCount = function(value){
    this.eiInfo.getBlock(this.blockId).getAttr()["count"] = value;
}

efFormPage.prototype.getLimit = function(){
    var limit = parseInt(this.eiInfo.getBlock(this.blockId).getAttr()["limit"]||1);
    this.setLimit(limit);
    return limit;
}

efFormPage.prototype.setLimit = function(value){
    this.eiInfo.getBlock(this.blockId).getAttr().limit = value;
}

efFormPage.prototype.getOffset = function(){
    var offset = parseInt(this.eiInfo.getBlock(this.blockId).getAttr()["offset"]||"0");
    this.setOffset(parseInt(offset));
    return offset;
}

efFormPage.prototype.setOffset = function(value){
    this.eiInfo.getBlock(this.blockId).getAttr()["offset"] = value;
}

efFormPage.prototype.setMethodName = function(methodName){
    this.methodName = methodName;
    this.eiInfo.getBlock(this.blockId).getAttr()["methodName"] = methodName;
}

efFormPage.prototype.submit = function(){
    this.ui.controlButtons();
    var pageBar = this;
    var info = new EiInfo();
    var block = this.eiInfo.getBlock(pageBar.blockId);
    block = new EiBlock(block.getBlockMeta());
    info.addBlock(block);
    info.setByNodeObject( document.forms[0] );
    block.setAttr( this.eiInfo.getBlock(pageBar.blockId).getAttr());
    if(this.isAjax){
        EiCommunicator.send( pageBar.serviceName, pageBar.methodName ,info, {
            onSuccess : function(eiInfo) {
                // Ajax提交成功后回调
                efform.fillDiv("ef_region_"+pageBar.blockId,eiInfo);
            },
            onFail: function(eMsg) {
                alert("Error occured on call service: " + eMsg);
            }
        });
    }else{
        this.appendParams();
        document.forms[0].submit();
    }
}

efFormPage.prototype.appendParams = function(){
    if(this.methodName){
        ef.get("methodName").value = this.methodName;
    }
    $("#"+this.divId).append($(this.buildParams()));
}

efFormPage.prototype.buildParams = function(){
    var inner_html = [];
    var blockId = this.blockId;

    var str_trmp = "<INPUT type='hidden' value='" + this.getOffset() + "' " +
            "name = '" + blockId + EF_FORMDATA_SPLIT + "offset'>";
    inner_html.push(str_trmp);

    str_trmp = "<INPUT type='hidden' " + "value='-1' " +
            "name = '" + blockId + EF_FORMDATA_SPLIT + "count'>";
    inner_html.push(str_trmp);

    str_trmp = "<INPUT type='hidden' " + "value='" + this.getLimit() + "' " +
            "name = '" + blockId + EF_FORMDATA_SPLIT + "limit'>";
    inner_html.push(str_trmp);

    str_trmp = "<INPUT type='hidden' " + "value='true'" +
            "name = '" + blockId + EF_FORMDATA_SPLIT + "showCount'>";
    inner_html.push(str_trmp);
    return inner_html.join("");
}

efFormPage.prototype.setAjax = function(value){
    this.isAjax = value;
}

efFormPage.prototype.setServiceName = function(serviceName){
    this.serviceName = serviceName;
    this.eiInfo.getBlock(this.blockId).getAttr()["serviceName"] = serviceName;
}

efFormPage.prototype.destroy = function(){
    this.eiInfo = null;
    this.ui = null;
}





