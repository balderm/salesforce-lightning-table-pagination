({
  // Fetch the accounts from the Apex controller
  getAccountList: function (component) {

    var pageSize = component.get('v.pageSize');
    var action = component.get('c.getAccounts');
    
    // Set up the callback
    action.setCallback(this, function(response) {

        var state = response.getState();

        if (component.isValid() && state == 'SUCCESS' ) {

          var startValue = 0;
          var endValue = pageSize-1;

          component.set('v.accountList', response.getReturnValue());
          component.set('v.totalSize', component.get('v.accountList').length);
          component.set('v.startValue', startValue);
          component.set('v.endValue', endValue);

          this.updateListTotalSize(component);
          this.movePage(component, startValue, endValue);
        }
    });
    
    $A.enqueueAction(action);
  },

  movePage: function (component, start, end) {

    var accList = component.get('v.accountList');
    var totalSize = component.get('v.totalSize')-1;
    var paginatedList = [];

    // check if end value is not bigger than the total size of the list
    if (totalSize < end) {
      end = totalSize;
    } 
    //check if starting value is not smaller than 0
    if (start < 0) {
      start = 0;
    }
    // cicle through the list and get only objects between the selected range
    for (var i = start; i <= end; i++) {
      paginatedList.push(accList[i]);
    }  
    // set the page attributes new values
    component.set('v.paginatedList', paginatedList);
    component.set('v.startValue', start);
    component.set('v.endValue', end);
    
  }, 

  updateListTotalSize: function (component) {

    var totalSize = component.get("v.totalSize");    
    var event = $A.get("e.c:ListTotalSizeUpdate");
    event.setParams({"totalSize" : totalSize});
    event.fire();
  }
})