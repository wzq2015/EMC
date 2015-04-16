/**
 *
 */
package com.baosight.iplat4j.ee.dm.service;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.common.ee.domain.TEEDM02;
import com.baosight.iplat4j.common.ee.domain.TEEDM03;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.dm.domain.EEDM01;
import com.baosight.iplat4j.ee.dm.utils.EEDMUtils;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author ranyunqian
 *
 */
public class ServiceEEDM04 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM04.class);


	public EiInfo initLoad(EiInfo inInfo) {

		EEDM01 eedm01 = new EEDM01();
		EiInfo outInfo = super.initLoad(inInfo, eedm01);

		//为查询条件和Grid中的级联下拉框准备数据
		outInfo.addBlock(EEDMUtils.generateBlock("continent",new TEEDM02(),"teedm02.query"));
		outInfo.addBlock(EEDMUtils.generateBlock("country",new TEEDM03(),"teedm03.query"));

		EiBlock block = outInfo.getBlock("inqu_status");

		if(block == null) {
			block = new EiBlock("inqu_status");

			block.setCell(0, "companyAddr", "1,2,3");
		}

		outInfo.addBlock(block);

		return outInfo;
	}

	public EiInfo query(EiInfo inInfo) {

		EEDM01 eedm01 = new EEDM01();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM01.unitQuery");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, eedm01);

		EiInfo outInfo = super.query(inInfo, true);
		outInfo.addBlock(EEDMUtils.generateBlock("continent",new TEEDM02(),"teedm02.query"));
	    outInfo.addBlock(EEDMUtils.generateBlock("country",new TEEDM03(),"teedm03.query"));

		return outInfo;
	}


	public EiInfo update(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		super.update(inInfo, "teedm01.update");
		return query(inInfo);
	}

	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
	/*	TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		int i = 0;
        //要添加的数据存储在"result"Block块中
		EiBlock eiBlock = inInfo.getBlock("result");
		int rowcount = eiBlock.getRowCount();

		for (i = 0; i < rowcount; i++) {
			teedm01.fromMap(eiBlock.getRow(i));
           //逐条记录添加
			dao.update("teedm01.insert", teedm01);
		}

		inInfo.setMsgByKey(EPResource.EP_1000, new String[]{String.valueOf(i),"插入"});
   */
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		super.insert(inInfo, "teedm01.insert");
		return query(inInfo);
	}

	/**
	 * 根据洲代号查询该洲下的所有国家记录
	 *
	 */
	public EiInfo getCoutryOfContinent(EiInfo inInfo) {

		EiInfo outInfo = new EiInfo();
        String continentCode = inInfo.getString("continentCode");
        HashMap map = new HashMap();
        map.put("continentCode", continentCode);

    	List countryList = dao.query("EEDM03.queryByContinent", map);
		outInfo.addBlock("country").setRows(countryList); //列信息
		outInfo.getBlock("country").setBlockMeta(new TEEDM03().eiMetadata);  //行信息,ajax调用必须手动设置元数据

		return outInfo;
	}

	/**
	 * 根据主表中的公司代号查询该公司的详细信息
	 * @param包含查询参数的EiInfo
	 * @return 返回根据公司代号查询出的公司详细信息结果集
	 */
	public EiInfo getDetailOfCompany(EiInfo inInfo) {

		EiInfo outInfo = new EiInfo();

		//把查询结果存放在"detail"块中
		EiBlock eiBlock = outInfo.addBlock("detail");
		TEEDM01 teedm01 = new TEEDM01();
		eiBlock.setBlockMeta(teedm01.eiMetadata); //ajax调用必须设置block块的元数据

        String companyCode = inInfo.getString("companyCode");
        HashMap map = new HashMap();
        map.put("companyCode", companyCode);

    	List companyList = dao.query("teedm01.query", map);
		eiBlock.setRows(companyList); //结果数据

		return outInfo;
	}
}
