package com.baosight.iplat4j.ee.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.common.ed.domain.TEDFA00;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.util.PlatUtils;

public class ServiceEE04 extends ServiceEPBase {
	/**
	  * 获取前N个按钮最多的页面
	  * @param inInfo
	  * @return
	  */
	 public EiInfo getRecords(EiInfo inInfo) {
	  String num = inInfo.getString("num");
	  int num_int = Integer.parseInt(num);
	  EiBlock block = new EiBlock("recourds");
	  
	  //设置头信息
	  EiBlockMeta eiMetadata = new EiBlockMeta();
	  eiMetadata.addMeta(new EiColumn("SEQ"));
	  eiMetadata.addMeta(new EiColumn("FORM_ENAME"));
	  eiMetadata.addMeta(new EiColumn("FORM_CNAME"));
	  eiMetadata.addMeta(new EiColumn("BUTTON_NUM"));
	  block.addBlockMeta(eiMetadata);
	  
	  //获取数据
	  List list = dao.query("EE04.queryList", new HashMap());
	  List resultList = new ArrayList();
	  for(int i=0;i<list.size()&&i<num_int;i++){
	   Map tempMap = (Map)list.get(i);
	   Map map = new HashMap();
	   map.put("form_ename", tempMap.get("FORM_ENAME"));
	   List tempList = dao.query("tedfa00.query", map);
	   if(tempList!=null && tempList.size()>0){
	    TEDFA00 edfa00 = (TEDFA00)tempList.get(0);
	    tempMap.put("SEQ", i+1);
	    tempMap.put("FORM_CNAME", edfa00.getForm_cname());
	   }
	   resultList.add(tempMap);
	  }
	  block.setRows(resultList);
	  
	  EiInfo outInfo = new EiInfo();
	  outInfo.addBlock(block);
	  //设置返回结果集
	  outInfo.set(EiConstant.funcReturnBlock, "recourds");
	  return outInfo;
	 }
	 
	 /**
	  * 获取
	  * @param inInfo
	  * @return
	  */
	 public EiInfo getCreator(EiInfo inInfo) {
	  EiInfo outInfo = new EiInfo();
	  //设置单个返回值
	  outInfo.set(EiConstant.funcReturnValue, PlatUtils.getUserId());
	  return outInfo;
	 }
}
