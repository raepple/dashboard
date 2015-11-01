jQuery.sap.require("sap.ui.core.IconPool");

sap.ui.controller("dashboard.App", {
	
	onInit: function() {		
		console.debug("Dashboard app controller init called");
		
		// remember the App Control
		this.app = sap.ui.getCore().byId("dashboardApp");
		
		// set dashboard app data model
		var oModel = new sap.ui.model.json.JSONModel();  		 
		this.app.setModel(oModel);
			
		// set i18 model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messagebundle.properties"
		});
		this.app.setModel(i18nModel, "i18n");
				
		// subscribe to event bus
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navToHandler, this);
		bus.subscribe("nav", "back", this.navBackHandler, this);
	},

	navToHandler : function(channelId, eventId, data) {		
		if (data && data.id) {
			// lazy load view
			if (this.app.getPage(data.id) === null) {
				console.debug("now loading page '" + data.id + "'");
				this.app.addPage(sap.ui.jsview(data.id, "dashboard." + data.id));
			}
			// navigate to given page (include bindingContext etc.)
			this.app.to(data.id, data.data);
		} else {
			console.error("nav-to event cannot be processed. Invalid data: " + data);
		}
	},
	
	navBackHandler : function() {
		this.app.back();
	}
});