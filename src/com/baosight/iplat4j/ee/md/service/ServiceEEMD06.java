package com.baosight.iplat4j.ee.md.service;

import java.util.List;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ed.util.CodesetBiz;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ee.md.domain.EEMD01;

public class ServiceEEMD06 extends ServiceEPBase {


	private static final Logger logger = Logger.getLogger(ServiceEEMD01.class);

	/** 
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) 
	{	
		EiInfo outInfo = new EiInfo();
		outInfo.addBlock( getCodeOfformType() );
		outInfo.addBlock( getCodeOfformStyle() );
		return outInfo;
	}

	/**
	 * delete
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) 
	{
			super.delete(inInfo, "EEMD01.delete" );	
		EiInfo outInfo = super.query(inInfo, "EEMD01.query", new EEMD01());	
			return outInfo;	
	}
	
	/**
	 * insert
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) 
	{
			super.insert(inInfo, "EEMD01.insert" );
		EiInfo outInfo = super.query(inInfo, "EEMD01.query", new EEMD01());
			return outInfo;	
	}
	
	/**
	 * query
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) 
	{
			EiInfo outInfo = super.query(inInfo, "EEMD01.query", new EEMD01());
			return outInfo;	
	}
	
	/**
	 * update
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) 
	{
			super.update(inInfo, "EEMD01.update" );
		EiInfo outInfo = super.query(inInfo, "EEMD01.query", new EEMD01());
			return outInfo;	
	}
	


	/**
	 * 返回小代码名称为 "iplat.ed.formType" 的EiBlock 
	 * @return EiBlock 
	 */
	private EiBlock getCodeOfformType()
	{
		EiBlock block = new EiBlock( "iplat.ed.formType" );
		
		CodesetBiz codeBiz = (CodesetBiz) SpringApplicationContext.getBean("codesetBiz");
		List list = codeBiz.getCodeSet( "iplat.ed.formType", "");
		
		EiColumn eiColumn = new EiColumn( "label" );
		eiColumn.setType( "C" );
		block.addMeta( eiColumn );
		
		eiColumn = new EiColumn( "value" );
		eiColumn.setType( "C" );
		block.addMeta( eiColumn );
		
		block.setRows( list );
		return block;
	}


	/**
	 * 返回小代码名称为 "iplat.ed.formStyle" 的EiBlock 
	 * @return EiBlock 
	 */
	private EiBlock getCodeOfformStyle()
	{
		EiBlock block = new EiBlock( "iplat.ed.formStyle" );
		
		CodesetBiz codeBiz = (CodesetBiz) SpringApplicationContext.getBean("codesetBiz");
		List list = codeBiz.getCodeSet( "iplat.ed.formStyle", "");
		
		EiColumn eiColumn = new EiColumn( "label" );
		eiColumn.setType( "C" );
		block.addMeta( eiColumn );
		
		eiColumn = new EiColumn( "value" );
		eiColumn.setType( "C" );
		block.addMeta( eiColumn );
		
		block.setRows( list );
		return block;
	}


}

