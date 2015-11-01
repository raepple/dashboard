sap.ui.jsview("dashboard.App", {

	getControllerName : function() {
		return "dashboard.App";
	},
	
	createContent : function(oController) {
		// to avoid scrollbars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
			
		var oApp = new sap.m.App("dashboardApp", {
            backgroundColor: "black",
            pages : [
				sap.ui.jsview("Home", "dashboard.Home")
			],			
			initialPage : "Home"
		});
				
		return oApp;
	}
});