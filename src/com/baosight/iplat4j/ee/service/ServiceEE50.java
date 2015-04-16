/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.dao.Dao;
import com.baosight.iplat4j.ep.ServiceEPBase;


public class ServiceEE50 extends ServiceEPBase
{
	public EiInfo initLoad( EiInfo inInfo )
	{
		EiInfo outInfo = query(inInfo);
		return outInfo;
	}
	
	public EiInfo query( EiInfo inInfo )
	{
		StringBuffer buffer = new StringBuffer();
		buffer.append( inInfo.getMsg() == null? "" : inInfo.getMsg() );

		EiInfo outInfo = new EiInfo();

		Dao tt = this.getDao();
		List aa = null;
		Map param = new HashMap();
		try {
		aa = tt.query( "EE50.query", param);
		}
		catch( Exception e )
		{
			buffer.append( e.getMessage() + "\n" );
			e.printStackTrace();
		}
		outInfo.addBlock( "r" );
		outInfo.getBlock( "r" ).setRows( aa );
		outInfo.addBlock("result").addBlockMeta(getMeta());
		outInfo.getBlock("result").setRows(aa);
		buffer.append( "查询成功\n" );
		outInfo.setMsg( buffer.toString() );
		return outInfo;
	}
	
	private EiBlockMeta getMeta(){
		EiBlockMeta meta = new EiBlockMeta("result");
		EiColumn column = new EiColumn("id");
		column.setDescName("序号");
		meta.addMeta(column);
		
		column = new EiColumn("name");
		column.setDescName("文件名");
		meta.addMeta(column);
		
		return meta;
		
		
	}

}
