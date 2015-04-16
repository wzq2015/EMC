/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import java.util.Date;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.Tee16;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author wangyuqiu
 *
 */
public class ServiceEEDM20 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM20.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		Tee16 Tee16 = new Tee16();
		EiInfo outInfo = super.initLoad(inInfo, Tee16);
		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		Date date = new Date();
		long start = date.getTime();
		
		Tee16 Tee16 = new Tee16();
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM16.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, Tee16);

		EiInfo outInfo = super.query(inInfo, true);
		outInfo.set(EiConstant.EF_FORM_ENAME, "EDFA00");
		System.out.println("test++++++++++++++++++++++");

		long end = new Date().getTime();
		System.out.println("#############"+(end-start));
		Tee16 sumParam = new Tee16();
		sumParam.setDouble1(new Double("111111.1111"));
		sumParam.setDouble2(new Double("222222.2222"));
		sumParam.setDouble3(new Double("333333.3333"));
		sumParam.setDouble4(new Double("444444.4444"));
		sumParam.setDouble5(new Double("555555.5555"));
		outInfo.getBlock(EiConstant.resultBlock).set(EiConstant.COLUMN_TOTAL_SUM, sumParam.toMap());
		return outInfo;
	}
	
	/**
	 * 删除
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		Tee16 Tee16 = new Tee16();
		inInfo.getBlock("result").setBlockMeta(Tee16.eiMetadata);

		super.delete(inInfo);
		return query(inInfo); //删除记录后重新查询并刷新页面
	}

	/**
	 * 修改
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		Tee16 Tee16 = new Tee16();
		inInfo.getBlock("result").setBlockMeta(Tee16.eiMetadata);

		super.update(inInfo);
		return query(inInfo);
	}

	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		
		
		Tee16 Tee16 = new Tee16();
		//dao.insert("EEDM01.insertTest", Tee16);
		inInfo.getBlock("result").setBlockMeta(Tee16.eiMetadata);

		super.insert(inInfo);
		return query(inInfo);
	}

}
