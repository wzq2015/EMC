/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author ranyunqian
 *
 */
public class ServiceEEDM08 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM01.class);
	
	private final String COMPANY_RESULT_BLOCK_ID = "company_detail";

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();
		EiInfo outInfo = super.initLoad(inInfo, teedm01);
		
		//获取明细区中国家名称下拉框的值
		List countryList = dao.query("teedm03.query", null);
		outInfo.addBlock("country").setRows(countryList);
		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM01.queryByName");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm01);

		EiInfo outInfo = super.query(inInfo, true);
		
       //获取明细区中国家名称下拉框的值
		List countryList = dao.query("teedm03.query", null);
		outInfo.addBlock("country").setRows(countryList);
		return outInfo;
	}
	
	/**
	 * 删除
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		super.delete(inInfo, "teedm01.delete");
		return query(inInfo); //删除记录后重新查询并刷新页面
	}

	/**
	 * 修改
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */

	
	public EiInfo update(EiInfo inInfo){

		TEEDM01 teedm01 = new TEEDM01();
		EiBlock eiBlock = inInfo.getBlock(COMPANY_RESULT_BLOCK_ID);
		eiBlock.setBlockMeta(teedm01.eiMetadata);
		
		super.update(inInfo, "teedm01.update", COMPANY_RESULT_BLOCK_ID);
		return query(inInfo);		
	}


	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();
		EiBlock eiBlock = inInfo.getBlock(COMPANY_RESULT_BLOCK_ID);
		eiBlock.setBlockMeta(teedm01.eiMetadata);
		
		super.update(inInfo, "teedm01.insert", COMPANY_RESULT_BLOCK_ID);
		return query(inInfo);	
	}

	/**
	 * 根据主表中的公司代号查询该公司的详细信息
	 * @param包含查询参数的EiInfo
	 * @return 返回根据公司代号查询出的公司详细信息结果集
	 */
	public EiInfo getDetailOfCompany(EiInfo inInfo) {
	
		EiInfo outInfo = new EiInfo();
		//在输出EiInfo中添加明细区对应的block块
		EiBlock eiBlock = outInfo.addBlock(COMPANY_RESULT_BLOCK_ID);
		TEEDM01 teedm01 = new TEEDM01();	
		eiBlock.setBlockMeta(teedm01.eiMetadata);
		
        String companyCode = inInfo.getString("companyCode");
        HashMap map = new HashMap();
        map.put("companyCode", companyCode);
        
    	List companyList = dao.query("teedm01.query", map);
		eiBlock.setRows(companyList); //行数据
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {String.valueOf(1), "查询明细" });
		
		return outInfo;
	}
	
  
  }
