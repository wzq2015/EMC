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
public class TEE503 extends DaoEPBase{
	public EiBlockMeta getContinentBlockMeta(){
		EiBlockMeta metadata = new EiBlockMeta();
		EiColumn eiColumn = new EiColumn( "continenet_cname" );
		eiColumn.setDescName( "洲中文名称" );
		metadata.addMeta( eiColumn );
		eiColumn = new EiColumn( "continenet_ename" );
		eiColumn.setDescName( "洲英文名称" );
		metadata.addMeta( eiColumn );
		return metadata;
	}
	
	public EiBlockMeta getCountryBlockMeta(){
		EiBlockMeta metadata = new EiBlockMeta();
		
		EiColumn eiColumn = new EiColumn( "country_cname" );
		eiColumn.setDescName( "国家中文名称" );
		metadata.addMeta( eiColumn );
		
		eiColumn = new EiColumn( "country_ename" );
		eiColumn.setDescName( "国家英文名称" );
		metadata.addMeta( eiColumn );
		
		eiColumn = new EiColumn( "continenet_cname" );
		eiColumn.setDescName( "洲中文名称" );
		metadata.addMeta( eiColumn );
		
		return metadata;
	}	
	
	public EiBlockMeta getCityBlockMeta(){
		EiBlockMeta metadata = new EiBlockMeta();
		
		EiColumn eiColumn = new EiColumn( "city_cname" );
		eiColumn.setDescName( "城市中文名" );
		metadata.addMeta( eiColumn );
		
		eiColumn = new EiColumn("city_ename");
		eiColumn.setDescName( "城市英文名" );
		metadata.addMeta( eiColumn );
		
		eiColumn = new EiColumn( "country_cname" );
		eiColumn.setDescName( "国家中文名称" );
		metadata.addMeta( eiColumn );

		return metadata;
		
	}
	
	public List getContinentList(){
		List list = new ArrayList();
		Map row = new HashMap();
		row.put( "continenet_ename", "Asia" );
		row.put( "continenet_cname", "亚洲" );
		list.add(row);
		
		row = new HashMap();
		row.put( "continenet_ename", "North American" );
		row.put( "continenet_cname", "北美洲" );
		list.add(row);
		
		row = new HashMap();
		row.put( "continenet_ename", "Europe" );
		row.put( "continenet_cname", "欧洲" );
		list.add(row);
		
		return list;
	}
	public List getCountryList(){
		List list = new ArrayList();
		Map row = new HashMap();
		row.put( "continenet_cname", "亚洲" );
		row.put( "country_ename", "China" );
		row.put( "country_cname", "中国" );
		list.add(row);
		
		row = new HashMap();
		row.put( "continenet_cname", "亚洲" );
		row.put( "country_ename", "Japan" );
		row.put( "country_cname", "日本" );
		list.add(row);
		
		row = new HashMap();
		row.put( "continenet_cname", "亚洲" );
		row.put( "country_ename", "Korea" );
		row.put( "country_cname", "韩国" );
		list.add(row);
		
		
		row = new HashMap();
		row.put( "continenet_cname", "北美洲" );
		row.put( "country_ename", "USA" );
		row.put( "country_cname", "美国" );
		list.add(row);
		
		row = new HashMap();
		row.put( "continenet_cname", "欧洲" );
		row.put( "country_ename", "Germany" );
		row.put( "country_cname", "德国" );
		list.add(row);
		
		return list;
	}
	
	public List getCityList(){
		List list = new ArrayList();
		Map row = new HashMap();
		row.put( "country_cname", "中国" );
		row.put( "city_ename", "Shanhai" );
		row.put( "city_cname", "上海" );
		list.add(row);
		
		row = new HashMap();
		row.put( "country_cname", "中国" );
		row.put( "city_ename", "Beijing" );
		row.put( "city_cname", "北京" );
		list.add(row);
		
		row = new HashMap();
		row.put( "country_cname", "中国" );
		row.put( "city_ename", "WuHan" );
		row.put( "city_cname", "武汉" );
		list.add(row);
		
		row = new HashMap();
		row.put( "country_cname", "韩国" );
		row.put( "city_ename", "Seoul" );
		row.put( "city_cname", "首尔" );
		list.add(row);
		
		row = new HashMap();
		row.put( "country_cname", "日本" );
		row.put( "city_ename", "Tokyo" );
		row.put( "city_cname", "东京" );
		list.add(row);
		
		row = new HashMap();
		row.put( "country_cname", "日本" );
		row.put( "city_ename", "Osaka" );
		row.put( "city_cname", "大坂" );
		list.add(row);
		
		row = new HashMap();
		row.put( "country_cname", "美国" );
		row.put( "city_ename", "Washington" );
		row.put( "city_cname", "华盛顿" );
		list.add(row);
		
		
		row = new HashMap();
		row.put( "country_cname", "德国" );
		row.put( "city_ename", "Berlin" );
		row.put( "city_cname", "柏林" );
		list.add(row);
		
		return list;
	}	
	
	
}
