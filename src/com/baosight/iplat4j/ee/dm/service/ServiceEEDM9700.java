/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import java.util.*;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.*;
import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.common.ee.domain.TEEDM04;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ee.dm.domain.EEDM97;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author yangfujun
 * edite by wangyuqiu 2008-7-22
 */
public class ServiceEEDM9700 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM97.class);

	/**
	 * 页面初始化
	 * @param EiInfo 包含初始化参数
	 * @return EiInfo 包含Product及Company的元数据信息
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EEDM97 eedm97 = new EEDM97();
		EiInfo outInfo = super.initLoad(inInfo, eedm97);

		outInfo.addBlock( getInitQueryBlock());
		outInfo.addBlock(getCompanyBlock());
		
		logger.info("当前登录用户为：" + UserSession.getLoginName());
		
		return outInfo;
	}
	
	/**
	 * 根据EiInfo包含的查询参数查询Product记录
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EEDM97 eedm97 = new EEDM97();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM97.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, eedm97);
		EiInfo outInfo = super.query(inInfo, true);
		outInfo.addBlock(getCompanyBlock());

		return outInfo;
	}
	
	/**
	 * 得到包含Company记录的Block
	 * @return 包含Company记录的Block
	 */
	protected EiBlock getCompanyBlock() {
		// 复用用ServiceEEDM01.query
		EiInfo info = new EiInfo();
		info.set(EiConstant.serviceName, "EEDM01");
		info.set(EiConstant.methodName, "query");
		EiInfo outInfo = SoaManager.call(info);
		
		// 将BlockId="result"改为"company"
		EiBlock block = outInfo.getBlock("result");
		block.getBlockMeta().setBlockId("company");
		return block;
	}
	
	protected EiBlock getInitQueryBlock() {
		EiBlock block = new EiBlock("inqu_status");
		
		EiBlockMeta eiMetadata = new  EiBlockMeta();
		EiColumn eiColumn = null;
		eiColumn = new EiColumn("companyCode");
		eiColumn.setPrimaryKey(true);
		eiColumn.setFieldLength(255);	
		eiColumn.setDescName("公司代号");
		eiMetadata.addMeta(eiColumn);
		
		eiColumn = new EiColumn("companyName");
		eiColumn.setFieldLength(255);	
		eiColumn.setDescName("公司名称");
		eiMetadata.addMeta(eiColumn);
		
		block.addBlockMeta(eiMetadata);
		Map row = new HashMap();
		row.put("companyCode","B00001");
		row.put("companyName","宝钢分公司");
		block.addRow(row);
		
		return block;
	}
	
	/**
	 * 取得公司信息的eiinfo
	 * @param inInfo
	 * @return
	 */
	public EiInfo getCompany(EiInfo inInfo) {
		inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm01.query");
		
		
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, new TEEDM01());
		inInfo.setMethodParam(MethodParamConstants.outDataBlock, "company");
		inInfo.setMethodParam(MethodParamConstants.inDataBlock, "company");
		return super.query(inInfo, true);
	}
	
	public EiInfo queryCompany(EiInfo inInfo) {
	
		inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm01.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, new TEEDM01());
		inInfo.setMethodParam(MethodParamConstants.queryBlock,"inqu_block");
		inInfo.setMethodParam(MethodParamConstants.outDataBlock, "company");
		inInfo.setMethodParam(MethodParamConstants.inDataBlock, "company");
		
		return super.query(inInfo, true);
	}

		
	/**
	 * 添加EiInfo中包含的新记录
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();

		inInfo.set(EiConstant.sqlName, "teedm04.insert");
		inInfo.getBlock("result").setBlockMeta(teedm04.eiMetadata);
		inInfo.addBlock(getCompanyBlock());
		super.insert(inInfo);
		
		return query(inInfo);
	}

	/**
	 * 修改EiInfo中指定的记录
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();
		
		inInfo.set(EiConstant.sqlName, "teedm04.update");
		inInfo.getBlock("result").setBlockMeta(teedm04.eiMetadata);

		super.update(inInfo);
		
		return query(inInfo);
	}

	/**
	 * 删除EiInfo中指定的记录
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		TEEDM04 teedm04 = new TEEDM04();
		
		inInfo.set(EiConstant.sqlName, "teedm04.delete");
		inInfo.getBlock("result").setBlockMeta(teedm04.eiMetadata);

		super.delete(inInfo);
		
		return query(inInfo); 
	}

}
