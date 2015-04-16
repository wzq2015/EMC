/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.common.ee.domain.TEEDM03;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author ranyunqian
 *
 */
public class ServiceEEDM07 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM07.class);
	
	private final String COMPANY_QUERY_BLOCK_ID = "company_inqu_status";
	private final String COMPANY_RESULT_BLOCK_ID = "company";

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		TEEDM03 teedm03 = new TEEDM03();
		EiInfo outInfo = super.initLoad(inInfo, teedm03);

		//在EiInfo中添加从表的block块，设置好列信息并添加一空行
		TEEDM01 teedm01 = new TEEDM01();
		EiBlock eiBlock = outInfo.addBlock(COMPANY_RESULT_BLOCK_ID);
		eiBlock.setBlockMeta(teedm01.eiMetadata);	
		eiBlock.addRow(teedm01);
		
		//读取查询条件中combox的洲信息
		List continentList = dao.query("teedm02.query", null);
		outInfo.addBlock("continent").setRows(continentList);
		
		return outInfo;
	}

	/**
	 * 查询国家信息
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		TEEDM03 teedm03 = new TEEDM03();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM03.queryByContinent");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm03);
	
		EiInfo outInfo = super.query(inInfo, true);
		
		List continentList = dao.query("teedm02.query", null);
		outInfo.addBlock("continent").setRows(continentList);

		return outInfo;
	}
	
	/**
	 * 删除国家记录
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		TEEDM03 teedm03 = new TEEDM03();
		inInfo.getBlock("result").setBlockMeta(teedm03.eiMetadata);
		
		super.delete(inInfo, "teedm03.delete");
		return query(inInfo); //删除记录后重新查询刷新显示页面
	}
	
	/**
	 * 删除公司记录
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo deleteCompany(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock(COMPANY_RESULT_BLOCK_ID).setBlockMeta(teedm01.eiMetadata);
		
		super.delete(inInfo, "teedm01.delete","company");
		return queryCompany(inInfo); //删除记录后重新查询刷新显示页面
	}

	/**
	 * 修改国家记录
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		TEEDM03 teedm03 = new TEEDM03();
		inInfo.getBlock("result").setBlockMeta(teedm03.eiMetadata);

		int i = 0;
		//要修改的数据存储在"result"Block块中
		EiBlock eiBlock = inInfo.getBlock("result");
		
		int rowcount = eiBlock.getRowCount();		
		for (i = 0; i < rowcount; i++) {
			teedm03.fromMap(eiBlock.getRow(i));
			//逐条记录修改
			dao.update("teedm03.update", teedm03);
		}
		
		inInfo.setMsgByKey(EPResource.EP_1000, new String[]{String.valueOf(i),"修改"});

		return query(inInfo);
	}

	/**
	 * 修改公司记录
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo updateCompany(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock(COMPANY_RESULT_BLOCK_ID).setBlockMeta(teedm01.eiMetadata);

		int i = 0;
		//要修改的数据存储在"company"Block块中
		EiBlock eiBlock = inInfo.getBlock("company");
		
		int rowcount = eiBlock.getRowCount();		
		for (i = 0; i < rowcount; i++) {
			teedm01.fromMap(eiBlock.getRow(i));
			//逐条记录修改
			dao.update("teedm01.update", teedm01);
		}
		
		inInfo.setMsgByKey(EPResource.EP_1000, new String[]{String.valueOf(i),"修改"});

		return queryCompany(inInfo);
	}

	/**
	 * 添加国家记录
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		TEEDM03 teedm03 = new TEEDM03();
		inInfo.getBlock("result").setBlockMeta(teedm03.eiMetadata);

		int i = 0;
        //要添加的数据存储在"result"Block块中
		EiBlock eiBlock = inInfo.getBlock("result");
		int rowcount = eiBlock.getRowCount();
		
		for (i = 0; i < rowcount; i++) {
			teedm03.fromMap(eiBlock.getRow(i));
           //逐条记录添加
			dao.update("teedm03.insert", teedm03);
		}
		
		inInfo.setMsgByKey(EPResource.EP_1000, new String[]{String.valueOf(i),"插入"});

		return query(inInfo);
	}

	/**
	 * 添加公司记录
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insertCompany(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock(COMPANY_RESULT_BLOCK_ID).setBlockMeta(teedm01.eiMetadata);

		int i = 0;
        //要添加的数据存储在"company"Block块中
		EiBlock eiBlock = inInfo.getBlock("company");
		int rowcount = eiBlock.getRowCount();
		
		for (i = 0; i < rowcount; i++) {
			teedm01.fromMap(eiBlock.getRow(i));
           //逐条记录添加
			dao.update("teedm01.insert", teedm01);
		}
		
		inInfo.setMsgByKey(EPResource.EP_1000, new String[]{String.valueOf(i),"插入"});

		return queryCompany(inInfo);
	}
	
	/**
	 * 根据主表中的国家代号查询该国家下的所有公司信息
	 * @param包含查询参数的EiInfo
	 * @return 返回根据国家代号查询出的公司记录结果集
	 */
	public EiInfo queryCompany(EiInfo inInfo) {
		
		TEEDM01 teedm01 = new TEEDM01();
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM01.queryByCountry");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm01);
		inInfo.setMethodParam(MethodParamConstants.inDataBlock, COMPANY_RESULT_BLOCK_ID);//inDataBlock保存Grid的翻页等信息
		inInfo.setMethodParam(MethodParamConstants.outDataBlock, COMPANY_RESULT_BLOCK_ID);
		inInfo.setMethodParam(MethodParamConstants.queryBlock, COMPANY_QUERY_BLOCK_ID);
		
		return super.query(inInfo,true);

	}
}
