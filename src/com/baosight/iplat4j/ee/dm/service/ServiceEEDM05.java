/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.common.ee.domain.TEEDM02;
import com.baosight.iplat4j.common.ee.domain.TEEDM03;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.dm.utils.EEDMUtils;
import com.baosight.iplat4j.el.PlatMessageLogger;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * 演示Tab控件使用service
 * @author wangyuqiu
 *
 */
public class ServiceEEDM05 extends ServiceEPBase {

	private static String COMPANY_COUNTRY_CODE = "inqu_status-0-companyCountryCode";
	private static String COUNTRY_CODE = "inqu_status-0-countryCode";
	
	/**
	 * 初始化函数
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		TEEDM03 teedm03 = new TEEDM03();
		EiInfo outInfo = super.initLoad(inInfo, teedm03);
		outInfo.addBlock(EEDMUtils.generateBlock("continents",new TEEDM02(),"teedm02.query"));
		return outInfo;
	}
	/**
	 * 查询功能函数
	 */
	public EiInfo query(EiInfo inInfo){
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM03.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, new TEEDM03());
		EiInfo outInfo = super.query(inInfo,true);
		outInfo.addBlock(EEDMUtils.generateBlock("continents",new TEEDM02(),"teedm02.query"));
		return outInfo;
	}
	/**
	 * 查询公司信息函数
	 * @param inInfo
	 * @return
	 */
	public EiInfo queryCompany(EiInfo inInfo){
		inInfo.set(COUNTRY_CODE, inInfo.get(COMPANY_COUNTRY_CODE));
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM01.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, new TEEDM01());
		EiInfo outInfo = super.query(inInfo,true);
		return outInfo;
	}
	/**
	 * 删除国家信息函数
	 */
	public EiInfo delete(EiInfo inInfo) {
		TEEDM03 teedm03 = new TEEDM03();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm03.eiMetadata);
		inInfo.set(EiConstant.sqlName, "teedm03.delete");
		super.delete(inInfo);
		return query(inInfo);
	}	
	
	/**
	 * 删除公司信息函数
	 * @param inInfo
	 * @return
	 */
	public EiInfo deleteCompany(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm01.eiMetadata);
		inInfo.set(EiConstant.sqlName, "teedm01.delete");
		super.delete(inInfo);
		return queryCompany(inInfo);
	}	

	/**
	 * 插入国家信息
	 */
	public EiInfo insert(EiInfo inInfo) {
		TEEDM03 teedm03 = new TEEDM03();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm03.eiMetadata);
		PlatMessageLogger.logMessage(EPResource.EP_1000, new String[] {
				"dd", "新增" });
		int i = 0;
		for (i = 0; i < inInfo.getBlock(EiConstant.resultBlock).getRowCount(); i++) {
			teedm03.fromMap(inInfo.getBlock(EiConstant.resultBlock).getRow(i));
			dao.update("teedm03.insert", teedm03);
		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), "新增" });
		return query(inInfo);
	}	
	
	/**
	 * 插入公司信息
	 * @param inInfo
	 * @return
	 */
	public EiInfo insertCompany(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm01.eiMetadata);
		PlatMessageLogger.logMessage(EPResource.EP_1000, new String[] {
				"dd", "新增" });
		int i = 0;
		for (i = 0; i < inInfo.getBlock(EiConstant.resultBlock).getRowCount(); i++) {
			teedm01.fromMap(inInfo.getBlock(EiConstant.resultBlock).getRow(i));
			dao.update("teedm01.insert", teedm01);
		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), "新增" });
		return queryCompany(inInfo);
	}
	
	/**
	 * 更新国家信息
	 */
	public EiInfo update(EiInfo inInfo) {
		TEEDM03 teedm03 = new TEEDM03();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm03.eiMetadata);
		int i = 0;
		for (i = 0; i < inInfo.getBlock(EiConstant.resultBlock).getRowCount(); i++) {
			teedm03.fromMap(inInfo.getBlock(EiConstant.resultBlock).getRow(i));
			dao.update("teedm03.update", teedm03);
		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), "更新" });
		return query(inInfo);
	}	

	/**
	 * 更新公司信息
	 * @param inInfo
	 * @return
	 */
	public EiInfo updateCompany(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm01.eiMetadata);
		int i = 0;
		for (i = 0; i < inInfo.getBlock(EiConstant.resultBlock).getRowCount(); i++) {
			teedm01.fromMap(inInfo.getBlock(EiConstant.resultBlock).getRow(i));
			dao.update("teedm01.update", teedm01);
		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), "更新" });
		return queryCompany(inInfo);
	}

}
