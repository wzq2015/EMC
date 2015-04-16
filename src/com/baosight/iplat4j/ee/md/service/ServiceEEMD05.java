package com.baosight.iplat4j.ee.md.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ed.util.CodesetBiz;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ee.md.domain.EEMD05;

public class ServiceEEMD05 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEMD05.class);

	/** 
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) 
	{
		EiInfo outInfo = super.initLoad(inInfo, "result", new EEMD05());
		
		return outInfo;
	}

	/**
	 * delete
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) 
	{
		super.delete(inInfo, "EEMD05.delete", null, false, "result" );	
		EiInfo outInfo = super.query(inInfo, "EEMD05.query", new EEMD05(),
			false, null, "inqu_status", "result", "result");
		return outInfo;	
	}
	
	/**
	 * insert
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) 
	{
		super.insert(inInfo, "EEMD05.insert", null, false, "result" );
		EiInfo outInfo = super.query(inInfo, "EEMD05.query", new EEMD05(),
			false, null, "inqu_status", "result", "result");
		return outInfo;	
	}
	
	/**
	 * query
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) 
	{
		EiInfo outInfo = super.query(inInfo, "EEMD05.query", new EEMD05(),
			false, null, "inqu_status", "result", "result");
		return outInfo;	
	}
	
	/**
	 * update
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) 
	{
		super.update(inInfo, "EEMD05.update", null, false, "result" );
		EiInfo outInfo = super.query(inInfo, "EEMD05.query", new EEMD05(),
			false, null, "inqu_status", "result", "result");
		return outInfo;	
	}
	


}
