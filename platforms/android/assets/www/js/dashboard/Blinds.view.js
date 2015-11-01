jQuery.sap.require("dashboard.Commons");

sap.ui.jsview("dashboard.Blinds", {

	getControllerName: function() {
		return "dashboard.Blinds";
	},

	createContent: function(oController) {
		
        var blindTiles = [];
        
        // add back tile on first position
        blindTiles.push(dashboard.Commons.backTile());
        
        for (var id in blindItems) {
            if (blindItems.hasOwnProperty(id)) {    
                var newBlindTile = dashboard.Commons.blindsTile(id, blindItems[id].title, oController);
                blindTiles.push(newBlindTile);
            }
        };   
        
		var oPage = new sap.m.Page("idBlindsPage", {        
			showNavButton: false,
			showHeader: false,
            showSubHeader: false,
            showFooter: false,
            enableScrolling: true,
			content : [ 				           
					new sap.m.TileContainer("idBlindsTC", {
						height: "100%",
						width : "100%",
						editable : false, 
						visible: true,
						tiles: blindTiles
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