jQuery.sap.require("dashboard.Commons");

sap.ui.jsview("dashboard.Thermostats", {

	getControllerName: function() {
		return "dashboard.Thermostats";
	},

	createContent: function(oController) {
		
        var thermostatsTiles = [];
        
        // add back tile on first position
        thermostatsTiles.push(dashboard.Commons.backTile());
        
        for (var id in thermostatsItems) {
            if (thermostatsItems.hasOwnProperty(id)) {    
                var newThermostatTile = dashboard.Commons.thermostatsTile(id, thermostatsItems[id].title, oController);
                thermostatsTiles.push(newThermostatTile);
            }
        };   
        
		var oPage = new sap.m.Page("idThermostatsPage", {        
			showNavButton: false,
			showHeader: false,
            showSubHeader: false,
            showFooter: false,
            enableScrolling: true,
			content : [ 				           
					new sap.m.TileContainer("idThermostatsTC", {
						height: "100%",
						width : "100%",
						editable : false, 
						visible: true,
						tiles: thermostatsTiles
					})
			]
		}).addStyleClass('page');
        
		this.addEventDelegate({
			onBeforeShow: function(evt) {
				oController.updateTiles();
			}
		}, this);
		
		return oPage;
	}
});