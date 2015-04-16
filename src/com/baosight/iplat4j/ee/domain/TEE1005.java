/**
 * 
 */
package com.baosight.iplat4j.ee.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;

/**
 * @author wangyuqiu
 * 
 */
public class TEE1005 extends DaoEPBase
{
	public EiBlockMeta getContinentBlockMeta()
	{
		EiBlockMeta metadata = new EiBlockMeta();
		EiColumn eiColumn = new EiColumn( "continent_cname" );
		eiColumn.setDescName( "洲中文名称" );
		metadata.addMeta( eiColumn );
		
		eiColumn = new EiColumn( "continent_ename" );
		eiColumn.setDescName( "洲英文名称" );
		metadata.addMeta( eiColumn );
		return metadata;
	}

	public EiBlockMeta getCountryBlockMeta()
	{
		EiBlockMeta metadata = new EiBlockMeta();

		EiColumn eiColumn = new EiColumn( "country_cname" );
		eiColumn.setDescName( "国家中文名称" );
		metadata.addMeta( eiColumn );

		eiColumn = new EiColumn( "country_ename" );
		eiColumn.setDescName( "国家英文名称" );
		metadata.addMeta( eiColumn );

		eiColumn = new EiColumn( "continent_cname" );
		eiColumn.setDescName( "洲名称" );
		metadata.addMeta( eiColumn );

		return metadata;
	}

	public EiBlockMeta getCityBlockMeta()
	{
		EiBlockMeta metadata = new EiBlockMeta();

		EiColumn eiColumn = new EiColumn( "city_cname" );
		eiColumn.setDescName( "城市中文名" );
		metadata.addMeta( eiColumn );

		eiColumn = new EiColumn( "city_ename" );
		eiColumn.setDescName( "城市英文名" );
		metadata.addMeta( eiColumn );

		eiColumn = new EiColumn( "country_name" );
		eiColumn.setDescName( "国家名称" );
		metadata.addMeta( eiColumn );

		return metadata;

	}

	public List getContinentList()
	{
		List list = new ArrayList();
		Map row = new HashMap();
		row.put( "continent_ename", "Asia" );
		row.put( "continent_cname", "亚洲" );
		list.add( row );

		row = new HashMap();
		row.put( "continent_ename", "North American" );
		row.put( "continent_cname", "北美洲" );
		list.add( row );

		row = new HashMap();
		row.put( "continent_ename", "Europe" );
		row.put( "continent_cname", "欧洲" );
		list.add( row );

		return list;
	}

	public List getCountryList()
	{
		List list = new ArrayList();
		Map row = new HashMap();
		row.put( "continent_name", "Asia" );
		row.put( "country_ename", "China" );
		row.put( "country_cname", "中国" );
		list.add( row );

		row = new HashMap();
		row.put( "continent_name", "Asia" );
		row.put( "country_ename", "Japan" );
		row.put( "country_cname", "日本" );
		list.add( row );

		row = new HashMap();
		row.put( "continent_name", "Asia" );
		row.put( "country_ename", "Korea" );
		row.put( "country_cname", "韩国" );
		list.add( row );

		row = new HashMap();
		row.put( "continent_name", "North American" );
		row.put( "country_ename", "USA" );
		row.put( "country_cname", "美国" );
		list.add( row );

		row = new HashMap();
		row.put( "continent_name", "Europe" );
		row.put( "country_ename", "Italy" );
		row.put( "country_cname", "意大利" );
		list.add( row );
		
		row = new HashMap();
		row.put( "continent_name", "Europe" );
		row.put( "country_ename", "England" );
		row.put( "country_cname", "英格兰" );
		list.add( row );

		return list;
	}

	public List getCityList()
	{
		List list = new ArrayList();
		Map row = new HashMap();
		row.put( "country_name", "China" );
		row.put( "city_ename", "Shanhai" );
		row.put( "city_cname", "上海" );
		list.add( row );

		row = new HashMap();
		row.put( "country_name", "China" );
		row.put( "city_ename", "Beijing" );
		row.put( "city_cname", "北京" );
		list.add( row );

		row = new HashMap();
		row.put( "country_name", "China" );
		row.put( "city_ename", "WuHan" );
		row.put( "city_cname", "武汉" );
		list.add( row );

		row = new HashMap();
		row.put( "country_name", "Korea" );
		row.put( "city_ename", "Seoul" );
		row.put( "city_cname", "首尔" );
		list.add( row );

		row = new HashMap();
		row.put( "country_name", "Japan" );
		row.put( "city_ename", "Tokyo" );
		row.put( "city_cname", "东京" );
		list.add( row );

		row = new HashMap();
		row.put( "country_name", "Japan" );
		row.put( "city_ename", "Osaka" );
		row.put( "city_cname", "大坂" );
		list.add( row );

		row = new HashMap();
		row.put( "country_name", "USA" );
		row.put( "city_ename", "Washington" );
		row.put( "city_cname", "华盛顿" );
		list.add( row );
		
		row = new HashMap();
		row.put( "country_name", "USA" );
		row.put( "city_ename", "Chicago" );
		row.put( "city_cname", "芝加哥" );
		list.add( row );

		row = new HashMap();
		row.put( "country_name", "Italy" );
		row.put( "city_ename", "Milan" );
		row.put( "city_cname", "米兰" );
		list.add( row );
		
		row = new HashMap();
		row.put( "country_name", "Italy" );
		row.put( "city_ename", "Roma" );
		row.put( "city_cname", "罗马" );
		list.add( row );
		
		row = new HashMap();
		row.put( "country_name", "England" );
		row.put( "city_ename", "London" );
		row.put( "city_cname", "伦敦" );
		list.add( row );
		
		row = new HashMap();
		row.put( "country_name", "England" );
		row.put( "city_ename", "Liverpool" );
		row.put( "city_cname", "利物浦" );
		list.add( row );
		
		row = new HashMap();
		row.put( "country_name", "England" );
		row.put( "city_ename", "NewCastle" );
		row.put( "city_cname", "纽卡斯尔" );
		list.add( row );

		return list;
	}

}
