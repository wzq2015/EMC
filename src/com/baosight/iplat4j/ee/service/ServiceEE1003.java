/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.domain.TEE10;
import com.baosight.iplat4j.ep.ServiceEPBase;

/**
 * @author wuyicang
 * 
 */
public class ServiceEE1003 extends ServiceEPBase
{
	public EiInfo load( EiInfo info )
	{
		TEE10 ee10 = new TEE10();

		EiInfo outInfo = new EiInfo();

		List list = null;
		Map param = new HashMap();
		try
		{
			try
			{
				EiBlock eiBlock = info.getBlock( "inqu_data" );
				if ( eiBlock != null )
				{
					param = eiBlock.getRow( 0 );
				}
			}
			catch( Exception ex )
			{
				ex.printStackTrace();
			}

			list = dao.query( "EE10.load", param );
		}
		catch( Exception e )
		{
			outInfo.setMsg( e.getMessage() + "\n" );
			outInfo.setStatus( -1 );
			e.printStackTrace();
		}
		
		if( list == null || list.size() <=0 )
		{
			outInfo.setMsg( "找不到对应的记录\n" );
			outInfo.setStatus( -1 );
			outInfo.setMsgKey( "10000" );
		}

		outInfo.setAttr( info.getAttr() );
		outInfo.addBlock( "result" );
		outInfo.getBlock( "result" ).setBlockMeta( ee10.eiMetadata );
		outInfo.getBlock( "result" ).setRows( list );
		if( outInfo.getStatus() >=0 )
		{
			outInfo.setMsg( "查询成功\n" );
		}
		
		return outInfo;
	}
	
	
}
