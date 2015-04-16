/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.common.ee.domain.TEEDM03;
import com.baosight.iplat4j.common.ee.domain.TEEDM04;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.dm.utils.EEDMUtils;
import com.baosight.iplat4j.el.PlatMessageLogger;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * 复杂主从表、明细表
 * @author wangyuqiu
 *
 */
public class ServiceEEDM09 extends ServiceEPBase {

	private static String INQU_COUNTRY_CODE = "inqu_status-0-countryCode";
	private static String COUNTRY_CODE = "countryCode";
	private static String PRODUCT_COMPANY_CODE = "inqu_status-0-productCompanyCode";
	private static String COMPANY_CODE = "inqu_status-0-companyCode";
	
	/**
	 * Service 初始化函数
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();
		EiInfo outInfo = super.initLoad(inInfo, teedm01);
		outInfo.getBlock(EiConstant.resultBlock).setRows(new ArrayList());
		outInfo.addBlock(EEDMUtils.generateBlock("country",new TEEDM03(),"teedm03.query"));
		outInfo.addBlock(EEDMUtils.generateBlock("company",new TEEDM01(),"teedm01.query"));
		return outInfo;
	}
	
	/**
	 * 查询方法函数
	 * 返回公司查询信息的eiinfo
	 */
	public EiInfo query(EiInfo inInfo){
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM01.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, new TEEDM01());
		EiInfo outInfo = super.query(inInfo,true);
		outInfo.addBlock(EEDMUtils.generateBlock("country",new TEEDM03(),"teedm03.query"));
		outInfo.addBlock(EEDMUtils.generateBlock("company",new TEEDM01(),"teedm01.query"));
		return outInfo;
	}
	
	/**
	 * 查询国家信息
	 * @param inInfo
	 * @return outInfo 返回国家查询信息的eiinfo
	 */
	public EiInfo queryCountry(EiInfo inInfo){
		TEEDM03 teedm03 = new TEEDM03();
		inInfo.set(INQU_COUNTRY_CODE, inInfo.get(COUNTRY_CODE));
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM03.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm03);
		EiInfo outInfo = super.query(inInfo,true);	
		EiBlockMeta meta = teedm03.eiMetadata;
		meta.getMeta(COUNTRY_CODE).setPrimaryKey(false);
		outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(meta);
		return outInfo;
	}
	
	/**
	 * 查询产品信息
	 * @param inInfo
	 * @return outInfo 返回产品查询信息的eiinfo
	 */
	public EiInfo queryProduct(EiInfo inInfo){
		inInfo.set(COMPANY_CODE, inInfo.get(PRODUCT_COMPANY_CODE));
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM04.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, new TEEDM04());
		EiInfo outInfo = super.query(inInfo,true);
		outInfo.addBlock(EEDMUtils.generateBlock("company",new TEEDM01(),"teedm01.query"));
		return outInfo;
	}
	
	/**
	 * 删除公司信息
	 * 返回删除后的公司查询信息的eiinfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm01.eiMetadata);
		inInfo.set(EiConstant.sqlName, "teedm01.delete");
		super.delete(inInfo);
		return query(inInfo);
	}	
	
	/**
	 * 删除产品信息
	 * @param inInfo
	 * @return 返回产品删除后的产品查询信息的eiinfo
	 */
	public EiInfo deleteProduct(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm04.eiMetadata);
		inInfo.set(EiConstant.sqlName, "teedm04.delete");
		super.delete(inInfo);
		return queryProduct(inInfo);
	}	

	/**
	 * 插入公司信息
	 */
	public EiInfo insert(EiInfo inInfo) {
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
		return query(inInfo);
	}	
	
	/**
	 * 插入产品信息
	 * @param inInfo
	 * @return 插入产品信息后，返回产品信息的查询信息
	 */
	public EiInfo insertProduct(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm04.eiMetadata);
		PlatMessageLogger.logMessage(EPResource.EP_1000, new String[] {
				"dd", "新增" });
		int i = 0;
		for (i = 0; i < inInfo.getBlock(EiConstant.resultBlock).getRowCount(); i++) {
			teedm04.fromMap(inInfo.getBlock(EiConstant.resultBlock).getRow(i));
			dao.update("teedm04.insert", teedm04);
		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), "新增" });
		return queryProduct(inInfo);
	}
	
	/**
	 * 更新公司信息
	 */
	public EiInfo update(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm01.eiMetadata);
		int i = 0;
		for (i = 0; i < inInfo.getBlock(EiConstant.resultBlock).getRowCount(); i++) {
			teedm01.fromMap(inInfo.getBlock(EiConstant.resultBlock).getRow(i));
			dao.update("teedm01.update", teedm01);
		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), "更新" });
		return query(inInfo);
	}	

	/**
	 * 更新产品信息
	 * @param inInfo
	 * @return 返回产品更新后的，产品查询信息
	 */
	public EiInfo updateProduct(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();
		inInfo.getBlock(EiConstant.resultBlock).setBlockMeta(teedm04.eiMetadata);
		int i = 0;
		for (i = 0; i < inInfo.getBlock(EiConstant.resultBlock).getRowCount(); i++) {
			teedm04.fromMap(inInfo.getBlock(EiConstant.resultBlock).getRow(i));
			dao.update("teedm04.update", teedm04);
		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), "更新" });
		return queryProduct(inInfo);
	}
	
	/**
	 * 更新公司信息
	 * @param inInfo
	 * @return 返回公司更新信息后的公司查询信息
	 */
	public EiInfo updateCompany(EiInfo inInfo){
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result2").setBlockMeta(teedm01.eiMetadata);
		teedm01.fromMap(inInfo.getBlock("result2").getRow(0));
		dao.update("teedm01.update", teedm01);
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(1), "更新" });
		return inInfo;		
	}
	
	/**
	 * 根据主表中的公司代号查询该公司的详细信息
	 * @param包含查询参数的EiInfo
	 * @return 返回根据公司代号查询出的公司详细信息结果集
	 */
	public EiInfo queryCompany(EiInfo inInfo) {
		
		EiInfo outInfo = new EiInfo();
		//在输出EiInfo中添加明细区对应的block块
		EiBlock eiBlock = outInfo.addBlock("result2");
		TEEDM01 teedm01 = new TEEDM01();	
		eiBlock.setBlockMeta(teedm01.eiMetadata);
		
        String companyCode = inInfo.getString("companyCode");
        HashMap map = new HashMap();
        map.put("companyCode", companyCode);
        
    	List companyList = dao.query("teedm01.query", map);
		eiBlock.setRows(companyList); //行数据
		
		return outInfo;
	}

}
