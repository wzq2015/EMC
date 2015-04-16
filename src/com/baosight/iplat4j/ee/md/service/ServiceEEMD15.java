package com.baosight.iplat4j.ee.md.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.core.sqldao.NamedSqlDao;
import com.baosight.iplat4j.ed.md.domain.EDMD00;
import com.baosight.iplat4j.ed.util.CodesetBiz;
import com.baosight.iplat4j.ee.md.domain.EEMD15;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEEMD15 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEMD15.class);

	/**
	 * 页面初始化
	 * 
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = super.initLoad(inInfo, "eemd15_result", new EEMD15());

		outInfo.addBlock(getCodeOfrepType());
		return outInfo;
	}

	public EiInfo insertQueryServiceConfig(EiInfo info) {
		String queryServiceConfig = "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"
				+ "gq/BAxWy/myVoH8BOlRste4fAAA=";
		EDMD00 edmd00 = new EDMD00();
		edmd00.setObjectName("EEMD15.query");
		edmd00.setObjectConfig(queryServiceConfig);
		edmd00.setObjectType("TYP_SDAO");
		this.dao.insert("EDMD00.insert", edmd00);
		return info;
	}

	public EiInfo insertInsertServiceConfig(EiInfo info) {
		String insertServiceConfig = "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";
		EDMD00 edmd00 = new EDMD00();
		edmd00.setObjectName("EEMD15.insert");
		edmd00.setObjectConfig(insertServiceConfig);
		edmd00.setObjectType("TYP_SDAO");
		this.dao.insert("EDMD00.insert", edmd00);
		return info;
	}

	public EiInfo insertUpdateServiceConfig(EiInfo info) {
		String updateServiceConfig = "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"
				+ "gq/BAxWy/myVoH8BOlRste4fAAA=";
		EDMD00 edmd00 = new EDMD00();
		edmd00.setObjectName("EEMD15.update");
		edmd00.setObjectConfig(updateServiceConfig);
		edmd00.setObjectType("TYP_SDAO");
		this.dao.insert("EDMD00.insert", edmd00);
		return info;
	}

	public EiInfo insertDeleteServiceConfig(EiInfo info) {
		String deleteServiceConfig = "H4sIAAAAAAAAAL1Za2gcVRS+s8lmX0kbU9FaLFb6oD66m0qLYo12k920WzebJUnVFmW92bnZnXR2"
				+ "ZnrnbjJbqKIgFgTBf/pDCkVBoVCsCIIgVX8UBMEHCL4QxEdRFPpHREU8dx6b3ZlMTOJMl+zsnfv6"
				+ "zj3nfOeee3P+VxTVKdpeVRvpWazqUq3O0pImY7ZvPl1VKUkTKZ2XCsqc+s3p2n0XX2wNR1CsgPp0"
				+ "hllTL6K+WVmtntAZ2licxws402SSnJnA2oEiiotEr5ZwgzA0ZDXKWKllphmVlBq0J0TCsCRP6LWT"
				+ "6AkUKaKeRrvYB8UHSct+61VgFrNsULTDX9ZRrJPJ2XlSZSO7fhrZ/NXIrggSYDhmjPLhgqHBYq/j"
				+ "sqS5oOnDWK+DsNHYl+99cMPjn/SgyDhKyioWx3GVqbSAEqxOiV5XZdHQHjiI+Kd/MQ7PQfhGGYof"
				+ "1QlVzDVGsdiQFIZiULMgVaGmL5+byA0PQwHa66rI0EBTEzEj006PpNVgKcndmLInslrtyQwugs4X"
				+ "E11OnuicRGRRX1FLpkVHudlOD5bOXN1d2x/hSk6YlpwAmzB0exGGZ5zhGXt4hg/PECljD+d9wY69"
				+ "VF0EBxjscICipLMDBpeyx0dWZICQu1cjJEc5+2zj4TduGn0zgnqKKGYKWhAd5+BuZpejoCmsW6Y2"
				+ "0TX+HOJWv3HJ6kVJOUFE2/b7LpUeHZQv/QWechylcLVKdH2SioQaywueYPCHZ2XTLDDvzv9Yw5gq"
				+ "NxvKle8fO/TzOH4tgrYUUMo0UpEoNVYHKtUJHwq+1sCGU5kAV7LKx1FcacoyRzyOkhqVGpi2gBpQ"
				+ "TwkWVUVuwYx6FcvEGRBbkHQJ+hdQdFESWR30gmWppthKsgxdcihVREnuduMqbWBm1/SLZA43ZfYQ"
				+ "lptOrzad7feUKOmw2tZMS3Oq+ogoAW0cnDlzSkacigFYBZHLVNUIZV5ug5iU1IjhSKWrTWp5v9OV"
				+ "LUFtWoAlcbnzlKoU5mxobeGdpg7JBhb4SrqgbQdBro/Q8cNQr0zmmAZEbcFnT6OxRwQWQ72wDdoY"
				+ "MUzM7ZrpZjdr0FEY06wqGGO6SVaWsG665NYVsXiPW8yx2/jjVo5hztSBsNP62dGGSJieZHpiMAi7"
				+ "l0fgmgwI4Q43wkYTwaJJgCtJu3H6bRyFEYUFBLLXo642hwNC2OdFcCJDQAh3exA0SqoQQVQlIIR7"
				+ "uxEMBGFz01I4zlKKW3zHMJ76dOtLl/HLPUgooF5dOkUMjh1d7IVn0mcjSXQKbHJzyQbmq9u/YIdm"
				+ "tKmzgtipTGtk29k5kTsDPbjPkUcOFSujlWy5XDzm8iYrHnTwHSpYJzshUZiZOjo9UynkDL918OqD"
				+ "zNLoqP2bgyxAoyrPaJw4OG43HeYi8sIRl2y8ruiYocQl4YUy9CpPTR7Jj81UStmJ/FrFiFGiOfF0"
				+ "/SLEp/Llysyx8prhU/NGTcaaBpud6BahtDYt8F5ml3UYI1mFPZeRHHz/nyJSY1P57Ey+koOHYUB2"
				+ "B1km7LemOJv8UybesNmk0SnNfNni6RUDEezEMa8EF06fdEeJlJW6BonxtA/GWIAYz7gx7BQ8B8lN"
				+ "QBBnfCAC3ESfc0MMWBAFRWuyvBQQyvNulA0WymSTBQnzgmd74IURPsWKkT/WpVng0HS+COGty6Rm"
				+ "WO/iAz9J5Sdye/d7lgMZnQTn3G63g+4/nn31yoVzbh27e9uTR082CW1xSsdrVG1qldnW6kn9ih+p"
				+ "412HjmDU/rrHTQPPV8+Hnq9euEbZ5MXQ8+K3Qk8l3w49lXwn9FTyXd9YgaxYAcSLLtYJJatn3fvd"
				+ "rNts9toG340hsO5y+Kz7MHTWfRQ6Gz6+Rrz+zI0T5zcEmKk0IIDPPTt1VVVEiQEl+DVUQChfeHbq"
				+ "Nop5hRMQzNf+iwnQ9t+6UYa6FzMu41pAUN+5oa5vQ9lHuwDBfnCDDbrBAgK6EvpW8kvoW8lvoW8l"
				+ "V323ksgyaWf3ruC6cOi8Nii5WQEZZIlfhMrLGNy6OGjHHHgd8XDX6tMdNhjqyZZyq7jq6Dw3+3g3"
				+ "zD/svQnxv/lY8Zqj63S9LHM5nOGnWl79u32o/sM5VP/Z1iB/+9ux5T9cW1AQkF0jRCy18GKvNYnQ"
				+ "t3Tbw1/jHJ0XknZ7v/fALmywz+nCYMe1DX8fMmXnqb3K/0GwltRe2OGX2ieCTzKE20JPMoQ7w04y"
				+ "hMy1SQGEuzwpgA5MDG4/E/aHnS0J94Qd8IUDYQd84f6wA76QXec9wzpumLvD7vpvmduuyCPb9Nha"
				+ "gq/BAxWy/myVoH8BOlRste4fAAA=";
		EDMD00 edmd00 = new EDMD00();
		edmd00.setObjectName("EEMD15.delete");
		edmd00.setObjectConfig(deleteServiceConfig);
		edmd00.setObjectType("TYP_SDAO");
		this.dao.insert("EDMD00.insert", edmd00);
		return info;
	}

	public EiInfo deleteQueryServiceConfig(EiInfo info) {
		EDMD00 bean = new EDMD00();
		bean.setObjectName("EEMD15.query");
		bean.setObjectType("TYP_SDAO");
		this.dao.delete("EDMD00.delete", bean);
		return info;
	}

	public EiInfo deleteInsertServiceConfig(EiInfo info) {
		EDMD00 bean = new EDMD00();
		bean.setObjectName("EEMD15.insert");
		bean.setObjectType("TYP_SDAO");
		this.dao.delete("EDMD00.delete", bean);
		return info;
	}

	public EiInfo deleteUpdateServiceConfig(EiInfo info) {
		EDMD00 bean = new EDMD00();
		bean.setObjectName("EEMD15.update");
		bean.setObjectType("TYP_SDAO");
		this.dao.delete("EDMD00.delete", bean);
		return info;
	}

	public EiInfo deleteDeleteServiceConfig(EiInfo info) {
		EDMD00 bean = new EDMD00();
		bean.setObjectName("EEMD15.delete");
		bean.setObjectType("TYP_SDAO");
		this.dao.delete("EDMD00.delete", bean);
		return info;
	}

	/**
	 * delete
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		// super.delete(inInfo, "EEMD15.delete", null, false, "eemd15_result" );
		// super.delete(inInfo, "EEMD15.delete", null, false, "eemd15_result",
		// true);
		super.delete(inInfo, "EEMD15.delete", "eemd15_result", true);
		EiInfo outInfo = super.query(inInfo, "EEMD15.query", new EEMD15(),
				false, null, "eemd15_inqu_status", "eemd15_result",
				"eemd15_result");
		return outInfo;
	}

	public EiInfo deleteNotUseDynaimciService(EiInfo inInfo) {
		return super.delete(inInfo, "EEMD15.delete", null, false,
				"eemd15_result");
	}

	/**
	 * insert
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		// super.insert(inInfo, "EEMD15.insert", null, false, "eemd15_result" );
		// super.insert(inInfo, "EEMD15.insert", null, false, "eemd15_result",
		// true);

		super.insert(inInfo, "EEMD15.insert", "eemd15_result", true);
		EiInfo outInfo = super.query(inInfo, "EEMD15.query", new EEMD15(),
				false, null, "eemd15_inqu_status", "eemd15_result",
				"eemd15_result");
		return outInfo;
	}

	public EiInfo insertNotUseDynamicService(EiInfo inInfo) {
		return super.insert(inInfo, "EEMD15.insert", null, false,
				"eemd15_result");
	}

	/**
	 * query
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		// EiInfo outInfo = super.query(inInfo, "EEMD15.query", new EEMD15(),
		// false, null, "eemd15_inqu_status", "eemd15_result", "eemd15_result",
		// null);
		// EiInfo outInfo = super.query(inInfo, "EEMD15.query", new EEMD15(),
		// null, "eemd15_inqu_status", "eemd15_result", "eemd15_result");
		EiInfo outInfo = super.query(inInfo, "EEMD15.query", new EEMD15(),
				null, "eemd15_inqu_status", "eemd15_result", "eemd15_result",
				true);
		return outInfo;
	}

	/**
	 * update
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		long start = System.currentTimeMillis();
		// super.update(inInfo, "EEMD15.update", null, false, "eemd15_result" );
		// super.update(inInfo, "EEMD15.update", null, false, "eemd15_result",
		// true);
		inInfo = super.update(inInfo, "EEMD15.update", "eemd15_result", true);
		EiInfo outInfo = super.query(inInfo, "EEMD15.query", new EEMD15(),
				null, "eemd15_inqu_status", "eemd15_result", "eemd15_result",
				true);
		long end = System.currentTimeMillis();

		System.out.println(end - start);
		return outInfo;
	}

	/**
	 * 返回小代码名称为 "N04011" 的EiBlock
	 * 
	 * @return EiBlock
	 */
	private EiBlock getCodeOfrepType() {
		EiBlock block = new EiBlock("N04011(%2-%1)");

		CodesetBiz codeBiz = (CodesetBiz) SpringApplicationContext
				.getBean("codesetBiz");
		List list = codeBiz.getCodeSet("N04011", "");

		String displayFormat = "%2-%1".replace("%1", "%1$2s").replace("%2",
				"%2$2s");

		List codeSetList = new ArrayList();
		for (int i = 0; i < list.size(); i++) {
			HashMap map = (HashMap) list.get(i);
			String label = map.get("label").toString();
			String value = map.get("value").toString();

			HashMap codeSetMap = new HashMap();
			codeSetMap.put("value", value);
			codeSetMap.put("label", String.format(displayFormat, value, label));
			codeSetList.add(codeSetMap);
		}

		EiColumn eiColumn = new EiColumn("label");
		eiColumn.setType("C");
		block.addMeta(eiColumn);

		eiColumn = new EiColumn("value");
		eiColumn.setType("C");
		block.addMeta(eiColumn);

		block.setRows(codeSetList);
		return block;
	}

	public EiInfo testTran(EiInfo inInfo) {
		EiInfo outInfo = new EiInfo();
		outInfo.setStatus(-1);
		String sql = "DELETE FROM JXGL_B_APPLY t WHERE 1=1 AND t.JXGLAPPLY_ID = 120018";
		NamedSqlDao sqlDao = (NamedSqlDao) SpringApplicationContext
				.getBean("namedSqlDao");
		sqlDao.executeSql(sql);
		sql = "Update JXGL_B_APPLY t set t.print_times = 201 where t.JXGLAPPLY_ID = 120018";

		int count = sqlDao.executeSql(sql);
		System.out.println(count);
		return outInfo;
	}

}
