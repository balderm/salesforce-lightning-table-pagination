({
	handleUpdateTotalSize : function(component, event, helper) {
		var totalSize = event.getParam("totalSize");
		component.set("v.totalSize", totalSize);
	}
})