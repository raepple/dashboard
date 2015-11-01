jQuery.sap.require("dashboard.Commons");

sap.ui.jsview("dashboard.Lights", {

	getControllerName: function() {
		return "dashboard.Lights";
	},

	createContent: function(oController) {
        
        var lightTiles = [];
        
        // add back tile on first position
        lightTiles.push(dashboard.Commons.backTile());
        
        for (var id in lightItems) {
            if (lightItems.hasOwnProperty(id)) {    
                var newLightTile = dashboard.Commons.lightsTile(id, lightItems[id].title, oController);
                lightTiles.push(newLightTile);
            }
        };   
        
		var oPage = new sap.m.Page("idLightsPage", {        
			showNavButton: false,
			showHeader: false,
            showSubHeader: false,
            showFooter: false,
            enableScrolling: true,
			content : [ 				           
					new sap.m.TileContainer("idLightsTC", {
						height: "100%",
						width : "100%",
						editable : false, 
						visible: true,
						tiles: lightTiles
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