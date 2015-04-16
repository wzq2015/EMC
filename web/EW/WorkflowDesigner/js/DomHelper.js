if (typeof Node == "undefined") {
	Node = {
		ELEMENT_NODE:1,
		ATTRIBUTE_NODE:2,
		TEXT_NODE:3,
		CDATA_SECTION_NODE:4,
		ENTITY_REFERENCE_NODE:5,
		ENTITY_NODE:6,
		PROCESSING_INSTRUCTION_NODE:7,
		COMMENT_NODE:8,
		DOCUMENT_NODE:9,
		DOCUMENT_TYPE_NODE:10,
		DOCUMENT_FRAGMENT_NODE:11,
		NOTATION_NODE:12
	};
}

DomHelper = {
	XMLDOC : document.implementation.createDocument ?
			 document.implementation.createDocument('', '', null) :
			 new ActiveXObject("Microsoft.XMLDOM"),
	
	createElement : function(name) {
		return this.XMLDOC.createElement(name);
	},
			 
	getChild : function(element, childName, createIfNotFound) {
		var children = element.childNodes;
		for (var i=0; i<children.length; i++) {
			if (children[i].nodeName == childName)
				return children[i];
		}
		if (createIfNotFound) {
			var child = this.XMLDOC.createElement(childName);
			element.appendChild(child);
			return child;
		}
		return null;
	},
	
	parseXml : function (xml) {
		var xmlDoc = null;
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(xml, "text/xml");
		}
		else { // Internet Explorer
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(xml); 
		}
		return xmlDoc;
	},
	
	hasChildElement : function(element) {
		var children = element.childNodes;
		for (var i=0; i<children.length; i++)
			if (children[i].nodeType == Node.ELEMENT_NODE)
				return true;
		return false;
	},
	
	clear : function(element) {
		for (var i=element.childNodes.length - 1; i>=0; i--)
			element.removeChild(element.childNodes[i]);
	}
};

