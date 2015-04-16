/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ed.fa.util.DynamicQueryAdapter;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author ranyunqian
 *
 */
public class ServiceEEDM0101 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM0101.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();
		EiInfo outInfo = super.initLoad(inInfo, teedm01);
		outInfo.set("dyTableName", "TEEDM01");
		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();
		
		/*
		 * 以下这段逻辑为了处理动态查询
		 * 如果可行，将来纳入基类统一处理
		 */
		
		String dyQueryFlag = inInfo.getString("dyQueryFlag");
		if (!StringUtils.isEmpty(dyQueryFlag)) {
			inInfo.set("inqu_status-0-dyQueryFlag", dyQueryFlag);
			DynamicQueryAdapter adapter = new DynamicQueryAdapter();

			checkIsHistoryMarkQuery(inInfo);

			adapter.setQueryString(inInfo.getString("dyQueryString"));
			adapter.setOrderString(inInfo.getString("dyOrderString"));

			try {
				inInfo.set("result-orderBy", adapter.getDynamicOrder());
				inInfo.set("inqu_status-0-dyQueryString", adapter
						.getDynamicSQL());
			} catch (Exception e) {
				logger.error(e);
				// nothing to do
			}
		}

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM0101.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm01);

		EiInfo outInfo = super.query(inInfo, true);

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

		inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm01.delete");
		super.delete(inInfo,true);
		return query(inInfo); //删除记录后重新查询并刷新页面
	}

	/**
	 * 修改
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm01.update");
		super.update(inInfo,true);
		return query(inInfo);
	}

	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm01.insert");
		super.insert(inInfo,true);
		return query(inInfo);
	}

	private void checkIsHistoryMarkQuery(EiInfo inInfo) 
	{
		String dyMQueryFlag = inInfo.getString("dyMQueryFlag");
		if (StringUtils.isEmpty(dyMQueryFlag)) //如果非书签查询，返回
			return;
		String dyMarkId = inInfo.getString( "dyMarkId" );
		
		Map queryMap = new HashMap();
		queryMap.put( "markId", dyMarkId );
		
		if( dyMarkId != null && !"".equals( dyMarkId ) )
		{
			List records = dao.query("EDFA83.query", queryMap );
			if( records.size() > 0 )
			{
				Map record = ( Map )records.get( 0 );
				
				inInfo.set("dyQueryString", record.get( "queryString" ));
				inInfo.set("dyOrderString", record.get( "orderString" ));
				//inInfo.set( "dyBeanClass", record.get( "beanClass" ));
				//inInfo.set( "dyTableName", record.get( "tableName" ));
			}
		}
		
	}

}
