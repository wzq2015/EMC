package com.baosight.iplat4j.ee.md.service;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ed.domain.Tedcm01;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ed.md.service.ServiceEDMD05;
import com.baosight.iplat4j.ed.util.CodesetBiz;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEEMD18 extends ServiceEPBase {
	private static final Logger logger = Logger.getLogger(ServiceEDMD05.class);

	private CodesetBiz codeBiz = (CodesetBiz) SpringApplicationContext
			.getBean("codesetBiz");

	/**
	 * 页面初始化，返回组织好的层级小代码
	 * 
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		String codeset = inInfo.getString("codeset");

		// 需要解码
		String condition = inInfo.getString("condition");

		if (condition == null || "".equals(condition.trim())) {
			condition = "";
		} else {
			condition = URLDecoder.decode(condition);
		}

		// 配置了小代码
		if (codeset != null && !"".equals(codeset.trim())) {
			String valueName = inInfo.getString("valueMemberPath");
			String labelName = inInfo.getString("displayMemberPath");

			EiInfo out = new EiInfo();

			// 获取小代码的名称
			Map param = new HashMap();
			param.put("codesetCode", codeset);
			List ret = this.dao.query("EDCM00.queryName", param);
			String nameLabel = "名称";
			String nameValue = "编码";
			if (!ret.isEmpty()) {
				String codesetName = (String) ((Map) ret.get(0))
						.get("codesetName");
				nameLabel = codesetName + "名称";
				nameValue = codesetName + "编码";
			}

			EiBlock block = out.addBlock("result");
			out.addBlock(block);

			EiColumn eiColumn = new EiColumn(valueName);
			eiColumn.setType("C");
			eiColumn.setCname(nameValue);
			// eiColumn.setWidth(80);
			// eiColumn.setFieldLength(80);
			block.addMeta(eiColumn);

			eiColumn = new EiColumn(labelName);
			eiColumn.setType("C");
			eiColumn.setCname(nameLabel);
			// eiColumn.setWidth(140);
			// eiColumn.setFieldLength(140);
			block.addMeta(eiColumn);

			EiBlock codeBlock = codeBiz.getCodeDefineEiBlock(codeset,
					condition, "result");

			for (Iterator it = codeBlock.getRows().iterator(); it.hasNext();) {
				Tedcm01 bean = new Tedcm01();
				bean.fromMap((Map) it.next());
				Map row = new HashMap();
				row.put(valueName, bean.getItemCode());
				row.put(labelName, bean.getItemCname());
				block.addRow(row);
			}
			return out;
		}

		String bindingService = inInfo.getString("bindingService");
		EiInfo info = new EiInfo();
		if (bindingService != null && !"".equals(bindingService.trim())) {
			String[] tokens = bindingService.split("\\.");
			if (tokens.length >= 2) {

				info.set(EiConstant.serviceName, tokens[0]);
				info.set(EiConstant.methodName, "initLoad");

				return SoaManager.invoke(info);
			}
		}

		return info;
	}
}
