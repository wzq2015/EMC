package com.baosight.iplat4j.ee.service;

import java.math.BigDecimal;

import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.IbatisCrudService;

public class ServiceEE05 extends IbatisCrudService {

	public EiInfo query(EiInfo inInfo) {
		EiInfo out = super.query( inInfo );
		return out;
	}
	
	public EiInfo insert(EiInfo inInfo) {
		EiInfo afterInsert = super.insert(inInfo);
		EiInfo out = this.query(inInfo);
		out.setStatus(afterInsert.getStatus());
		out.setMsg(afterInsert.getMsg());
		return out;
	}

	public EiInfo delete(EiInfo inInfo) {
		EiInfo afterDelete = super.delete(inInfo);
		EiInfo out = this.query(inInfo);
		out.setStatus(afterDelete.getStatus());
		out.setMsg(afterDelete.getMsg());
		return out;
	}

	public EiInfo update(EiInfo inInfo) {
		EiInfo afterUpdate = super.update(inInfo);
		EiInfo out = this.query(inInfo);
		out.setStatus(afterUpdate.getStatus());
		out.setMsg(afterUpdate.getMsg());
		return out;
	}

	public String getSqlMapCategory() {
		return "EE05";
	}

	public EiBlockMeta initMetaData() {
		EiBlockMeta eiMetadata = new EiBlockMeta();
		EiColumn eiColumn = new EiColumn("ContractID");
		eiColumn.setDescName("合同号");
		eiColumn.setType(EiConstant.COLUMN_TYPE_NUMBER);
		eiColumn.setMaxLength(20);
		eiColumn.setNullable(false);
		eiColumn.setPrimaryKey(true);
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("Product");
		eiColumn.setDescName("产品");
		eiColumn.setMaxLength(20);
		eiColumn.setNullable(true);
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("Spec");
		eiColumn.setDescName("规格");
		eiColumn.setMaxLength(20);
		eiColumn.setNullable(true);
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("Company");
		eiColumn.setDescName("公司");
		eiColumn.setMaxLength(20);
		eiColumn.setNullable(true);
		eiMetadata.addMeta(eiColumn);

		eiColumn = new EiColumn("Amount");
		eiColumn.setDescName("金额");
		eiColumn.setType(EiConstant.COLUMN_TYPE_NUMBER);
		eiColumn.setMaxLength(20);
		eiColumn.setNullable(true);
		eiMetadata.addMeta(eiColumn);

		return eiMetadata;
	}

}
