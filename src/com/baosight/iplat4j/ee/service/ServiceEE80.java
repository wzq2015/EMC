package com.baosight.iplat4j.ee.service;

import java.math.BigDecimal;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.domain.Transfer;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEE80 extends ServiceEPBase {

	public EiInfo initLoad(EiInfo inInfo) {
		return query(inInfo);

	}

	public EiInfo query(EiInfo inInfo) {
		Transfer bean = new Transfer();
		
		EiInfo outInfo = new EiInfo();
		outInfo.addBlock("result").setBlockMeta(bean.eiMetadata);
		
		//添加测试数据
		for(int i =0; i< 5; i++) 
		{
			bean.setAmount(new BigDecimal(i));
			bean.setDescription("测试数据" + i);
			bean.setDestinationaccount("目的帐户" + i);
			bean.setSourceaccount("源帐户" + i);
			bean.setTransferid("ID" + i);
			
			outInfo.addRow("result", bean.toMap());
			
		}
		
		return outInfo;

	}

}