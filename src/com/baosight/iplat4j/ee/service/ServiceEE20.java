package com.baosight.iplat4j.ee.service;

import java.util.List;

import org.apache.commons.lang.exception.ExceptionUtils;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.dao.Dao;
import com.baosight.iplat4j.ee.domain.TOPA006;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEE20 extends ServiceEPBase {

	public EiInfo initLoad(EiInfo inInfo) {
		return query(inInfo);

	}

	public EiInfo query(EiInfo inInfo) {
		TOPA006 topa006 = new TOPA006();  

		EiInfo outInfo = new EiInfo();

		Dao tt = this.getDao();
		List aa = null;
		try {
			java.util.Map param = new java.util.HashMap();
			try {
				EiBlock eiBlock = inInfo.getBlock("inqu_status");
				if (eiBlock != null) {
					param = eiBlock.getRow(0);
				}
			} catch (Exception ex) {
				//nothing : null
				System.out.println(ex);
			}
			
			int offset = 0;
			int limit = 10;
			String orderBy = null;

			try {
				EiBlock eiBlock = inInfo.getBlock("r");
				if (eiBlock != null) {
					offset = eiBlock.getInt("offset");
				}
			} catch (Exception ex) {
				System.out.println(ex);
			}

			try {
				EiBlock eiBlock = inInfo.getBlock("r");
				if (eiBlock != null) {
					limit = eiBlock.getInt("limit");
				}
			} catch (Exception ex) {
				System.out.println(ex);
			}

			try {
				EiBlock eiBlock = inInfo.getBlock("r");
				if (eiBlock != null) {
					orderBy = eiBlock.getString("orderBy");
				}
			} catch (Exception ex) {
				orderBy = null;
			}
			if (orderBy != null)
				param.put("orderBy", orderBy);

			aa = tt.query("EE20.query", param, offset, limit);

		} catch (Exception e) {
			outInfo.setStatus(-1);
			
			outInfo.setMsg("查询失败，原因[" + ExceptionUtils.getRootCauseMessage(e) + "]");
			outInfo.setDetailMsg(e.getCause().toString());
		}


		outInfo.setBlock(inInfo.getBlock("inqu_status"));
		//added by zhong at 200701310818
		//copy property from ininfo to outinfo
		outInfo.setAttr(inInfo.getAttr());

		outInfo.addBlock("r");
		//added by zhong at 200701310818
		//copy property from ininfo to outinfo
		try {
			outInfo.getBlock("r").setAttr(inInfo.getBlock("r").getAttr());
		} catch (Exception ex) {
			//null pointer
		}

		outInfo.getBlock("r").setBlockMeta(topa006.eiMetadata);
		outInfo.getBlock("r").setRows(aa);

		outInfo.setMsg("查询成功");
		return outInfo;
	}

}
