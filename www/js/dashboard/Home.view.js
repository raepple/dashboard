jQuery.sap.require("sap.ui.core.IconPool");
jQuery.sap.require("sap.ui.core.IntervalTrigger");
jQuery.sap.require("dashboard.Commons");

sap.ui.jsview("dashboard.Home", {

	getControllerName: function() {
		return "dashboard.Home";
	},
    
    temperatureListener: function(oController) {
        oController.updateTemperature();
        console.debug("temperatureListener called");
    },

	createContent: function(oController) {
		
		sap.ui.core.IconPool.addIcon("icon-blind2", "dashboard", "dashboard", "0047", true);
		sap.ui.core.IconPool.addIcon("icon-bulp", "dashboard", "dashboard", "0044", true);
        sap.ui.core.IconPool.addIcon("icon-thermostat", "dashboard", "dashboard", "0049", true);
		sap.ui.core.IconPool.addIcon("icon-cloud", "dashboard", "dashboard", "0042", true);        
		sap.ui.core.IconPool.addIcon("icon-garage", "dashboard", "dashboard", "004C", true);  
        sap.ui.core.IconPool.addIcon("icon-back", "dashboard", "dashboard", "004D", true);
		       
		var oContentBlinds = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[						
						new sap.ui.core.Icon({  
							src : sap.ui.core.IconPool.getIconURI("icon-blind2","dashboard"),
							color : "#ffffff",
							size : "100px"
						}),
                        new sap.m.Text({
                            text : "Jalousinen"
                        }).addStyleClass('tileTitleXLarge')
					]
				})
			]
		});
		
		var oContentLights = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[                        
						new sap.ui.core.Icon({  
							src : sap.ui.core.IconPool.getIconURI("icon-bulp","dashboard"),
							color : "#ffffff",
                            size : "100px"
						}),
                        new sap.m.Text({
                            text : "Licht"
                        }).addStyleClass('tileTitleXLarge')
					]
				})
			]
		});
        
        var oContentWeather = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[                        
						new sap.ui.core.Icon({  
							src : sap.ui.core.IconPool.getIconURI("icon-cloud","dashboard"),
							color : "#ffffff",
                            size : "100px"
						}),
                        new sap.m.Text("weatherTemperature").addStyleClass('tileTitleXLarge')
					]
				})
			]
		});
        
        var oContentThermostats = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[                        
						new sap.ui.core.Icon({  
							src : sap.ui.core.IconPool.getIconURI("icon-thermostat","dashboard"),
							color : "#ffffff",
                            size : "100px"
						}),
                        new sap.m.Text({
                            text : "Heizung"
                        }).addStyleClass('tileTitleXLarge')
					]
				})
			]
		});
        
        var oContentGarage = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[                        
						new sap.ui.core.Icon("idIconGarage", {  
							src : sap.ui.core.IconPool.getIconURI("icon-garage","dashboard"),
							color : "#ffffff",
                            size : "100px"
						}),
                        new sap.m.Text({
                            text : "Garage"
                        }).addStyleClass('tileTitleXLarge')
					]
				})
			]
		});
			
		var oTileBlinds = new sap.m.CustomTile({
			removable: true,
			content: oContentBlinds,
			press: function() {
		    	  oController.manageBlinds();
		    }
		}).addStyleClass('tile');
		
		var oTileLights = new sap.m.CustomTile({
			removable: true,
			content: oContentLights,
            press: function() {
		    	  oController.manageLights();
		    }
		}).addStyleClass('tile');
        
        var oTileWeather = new sap.m.CustomTile({
			removable: true,
			content: oContentWeather
		}).addStyleClass('tile');
        
        var oTileThermostats = new sap.m.CustomTile({
			removable: true,
			content: oContentThermostats,
            press: function() {
		    	  oController.manageThermostats();
		    }
		}).addStyleClass('tile');
        
        var oTileGarage = new sap.m.CustomTile({
			removable: true,
			content: oContentGarage,
            press: function() {
		    	  oController.manageGarage();
		    }
		}).addStyleClass('tile');
		
		var oPage = new sap.m.Page("idHomePage", {
			showNavButton: false,
			showHeader: false,
            showSubHeader: false,
            showFooter: false,
			enableScrolling: false,
			content : [ 				           
					new sap.m.TileContainer("idHomeTC", {
						height: "100%",
						width : "100%",
						editable : false, 
						visible: true,
						tiles: [ oTileBlinds, oTileLights, oTileWeather, oTileThermostats, oTileGarage ]
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