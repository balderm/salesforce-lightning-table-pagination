({
	doInit : function(component, event, helper) {
		// Fetch data from the Apex Controller
		helper.getAccountList(component);
	},
	
	firstPage : function (component, event, helper) {

		var start = 0;
		var pageSize = component.get('v.pageSize');

		helper.movePage(component, start, pageSize-1);
	}, 

	previousPage : function (component, event, helper) {

		var start = component.get('v.startValue');
		var pageSize = component.get('v.pageSize');

		helper.movePage(component, start - pageSize, start -1);
	}, 

	nextPage : function (component, event, helper) {

		var end = component.get('v.endValue');
		var pageSize = component.get('v.pageSize');

		helper.movePage(component, end + 1, end + pageSize);
	}, 

	lastPage : function (component, event, helper) {

		var pageSize = component.get('v.pageSize');
		var totalSize = component.get('v.totalSize');

		var numPages = Math.floor(totalSize / pageSize);
		var squareNumRecords = pageSize * numPages;
		var diffNumRecords = totalSize - squareNumRecords;

		helper.movePage(component, totalSize - diffNumRecords, totalSize - 1);
	}, 

	changePageSize : function (component, event, helper) {

		var pageSize = 5;
		var start = component.get('v.startValue');

		var selectPageSize = event.getSource(); // getting component names

		if (selectPageSize == undefined) {
			console.log("Can't find selectPageSize component.");
		} else {
			pageSize = parseInt(selectPageSize.get("v.value"));
		}

		component.set('v.pageSize', pageSize);

		helper.movePage(component, start, start + (pageSize - 1));
	},

	// test method, apparently this kind of redirect works only in Salesforce1
	navigateToAccount : function(component, event, helper) {

	   	var accId = event.currentTarget.name;

	   	// works only in Salesforce1
	   	var sObectEvent = $A.get("e.force:navigateToSObject");
	    	sObectEvent.setParams({"recordId": accId,
	    						   "slideDevName": "detail"});

		sObectEvent.fire(); 
	},

	deleteAccount : function(component, event, helper) {
		//TODO delete still not working 
		console.log("inside delete function");
		// Get value from hidden field
		var accountName = event.target.getElementsByClassName("account-name")[0].value;
		
		confirm("Delete the " + accountName + " account?");
	}
})