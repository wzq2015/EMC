package com.baosight.iplat4j.ee.dm.service;

import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.common.ed.domain.TEDFA00;
import com.baosight.iplat4j.common.ed.domain.TEDFA01;
import com.baosight.iplat4j.common.ee.domain.Tee16;
import com.baosight.iplat4j.core.FrameworkInfo;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceEEDM23 extends ServiceEPBase {

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		return query(inInfo);
	}
	
	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		Tee16 Tee16 = new Tee16();
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "tee16.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, Tee16);

		EiInfo outInfo = super.query(inInfo, true);
		
		return outInfo;
	}
	
	public EiInfo queryGroup(EiInfo inInfo) {

		TEDFA00 tedfa00 = new TEDFA00();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EDFA00.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, tedfa00);

		EiInfo outInfo = super.query(inInfo, true);
		String showtype = inInfo.getString("showtype");
		if(showtype!=null&&showtype.equals("genSubgGid")){
			genSubGridData(outInfo.getBlock("result"));
		}
		return outInfo;
	}
	
	private void genSubGridData(EiBlock block){
		List list = block.getRows();
		for(int i=0;i<list.size();i++){
			Map map = (Map)list.get(i);
			String form_ename = (String)map.get("form_ename");
			EiInfo info =  new EiInfo();
			info.setCell("inqu_status",0,"form_ename", form_ename.toUpperCase());
			info = querySub(info);
			EiBlock subBlock = info.getBlock("result");
			if(subBlock!=null){
				map.put("$subBlock", subBlock);
			}
		}
	}
	
	private EiInfo querySub(EiInfo inInfo) {

		TEDFA01 tedfa01 = new TEDFA01();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EDFA01.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, tedfa01);

		EiInfo outInfo = super.query(inInfo, true);

		return outInfo;
	}
	
}
