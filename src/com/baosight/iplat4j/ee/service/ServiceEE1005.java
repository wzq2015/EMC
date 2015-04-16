/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.domain.TEE1005;
import com.baosight.iplat4j.ep.ServiceEPBase;

/**
 * @author wuyicang
 * 
 */
public class ServiceEE1005 extends ServiceEPBase
{
	private List records;

	private EiBlockMeta record_meta;

	private TEE1005 bean = new TEE1005();

	public EiInfo initLoad( EiInfo inInfo )
	{
		initMetadata();
		initData();
		return query( inInfo );
	}

	public EiInfo query( EiInfo inInfo )
	{
		EiInfo outInfo = new EiInfo();

		EiBlock block = outInfo.addBlock( "result" );
		block.setBlockMeta( record_meta );
		block.setRows( records );

		block = outInfo.addBlock( "continent" );
		block.setBlockMeta( bean.getContinentBlockMeta() );
		block.setRows( bean.getContinentList() );

		block = outInfo.addBlock( "country" );
		block.setBlockMeta( bean.getCountryBlockMeta() );
		block.setRows( new ArrayList() );

		block = outInfo.addBlock( "city" );
		block.setBlockMeta( bean.getCityBlockMeta() );
		block.setRows( new ArrayList() );
		
		block = outInfo.addBlock( "all_countries" );
		block.setBlockMeta( bean.getCountryBlockMeta() );
		block.setRows( bean.getCountryList() );

		block = outInfo.addBlock( "all_cities" );
		block.setBlockMeta( bean.getCityBlockMeta() );
		block.setRows( bean.getCityList() );

		return outInfo;
	}

	public EiInfo loadCountry( EiInfo inInfo )
	{
		String continent_name = inInfo.getCellStr( "inqu_data", 0, "continent_name" );
		List country_list = bean.getCountryList();
		List return_list = new ArrayList();
		for( int i = 0; i < country_list.size(); i++ )
		{
			Map row = ( Map )country_list.get( i );
			if( row.get( "continent_name" ).equals( continent_name ) )
			{
				return_list.add( row );
			}
		}

		EiInfo outInfo = new EiInfo();

		EiBlock block = outInfo.addBlock( "country" );
		block.setBlockMeta( bean.getCountryBlockMeta() );
		block.setRows( return_list );
		
		return outInfo;
	}
	
	public EiInfo loadCity( EiInfo inInfo )
	{
		String country_name = inInfo.getCellStr( "inqu_data", 0, "country_name" );
		List country_list = bean.getCityList();
		List return_list = new ArrayList();
		for( int i = 0; i < country_list.size(); i++ )
		{
			Map row = ( Map )country_list.get( i );
			if( row.get( "country_name" ).equals( country_name ) )
			{
				return_list.add( row );
			}
		}

		EiInfo outInfo = new EiInfo();

		EiBlock block = outInfo.addBlock( "city" );
		block.setBlockMeta( bean.getCityBlockMeta() );
		block.setRows( return_list );
		
		return outInfo;
	}

	private void initMetadata()
	{
		record_meta = new EiBlockMeta();

		EiColumn eiColumn = new EiColumn( "team_name" );
		eiColumn.setDescName( "球队名称" );
		eiColumn.setPrimaryKey( true );
		record_meta.addMeta( eiColumn );

		eiColumn = new EiColumn( "continent_name" );
		eiColumn.setDescName( "所在洲" );
		record_meta.addMeta( eiColumn );

		eiColumn = new EiColumn( "country_name" );
		eiColumn.setDescName( "所在国家" );
		record_meta.addMeta( eiColumn );

		eiColumn = new EiColumn( "city_ename" );
		eiColumn.setDescName( "所在城市英文名" );
		record_meta.addMeta( eiColumn );

		eiColumn = new EiColumn( "city_cname" );
		eiColumn.setDescName( "所在城市中文名" );
		record_meta.addMeta( eiColumn );
	}

	private void initData()
	{
		records = new ArrayList();

		Map row = new HashMap();
		row.put( "team_name", "上海申花" );
		row.put( "continent_name", "Asia" );
		row.put( "country_name", "China" );
		row.put( "city_ename", "Shanghai" );
		row.put( "city_cname", "上海" );
		records.add( row );

		row = new HashMap();
		row.put( "team_name", "国际米兰" );
		row.put( "continent_name", "Europe" );
		row.put( "country_name", "Italy" );
		row.put( "city_ename", "Milan" );
		row.put( "city_cname", "米兰" );
		records.add( row );

		row = new HashMap();
		row.put( "team_name", "切尔西" );
		row.put( "continent_name", "Europe" );
		row.put( "country_name", "England" );
		row.put( "city_ename", "London" );
		row.put( "city_cname", "伦敦" );
		records.add( row );

		row = new HashMap();
		row.put( "team_name", "芝加哥公牛" );
		row.put( "continent_name", "North American" );
		row.put( "country_name", "USA" );
		row.put( "city_ename", "Chicago" );
		row.put( "city_cname", "芝加哥" );
		records.add( row );
	}

}
