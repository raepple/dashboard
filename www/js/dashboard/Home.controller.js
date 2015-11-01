jQuery.sap.require("dashboard.Commons");

sap.ui.controller("dashboard.Home", {

	onInit : function() {
		console.debug("Home controller init called");
        var oTrigger = new sap.ui.core.IntervalTrigger();
        oTrigger.setInterval(1800000);
        oTrigger.addListener(this.updateTemperature);
	},
	
	updateTiles: function() {
		console.debug("Home controller updateTiles called");
        // nothing to do!
	},
    
    updateTemperature: function() {
        console.debug("updateTemperature called");
        var outdoorTemperature = dashboard.Commons.getState("outdoor_temperature");
        var temperature = sap.ui.getCore().byId("weatherTemperature");
        temperature.setText(outdoorTemperature + " \u2103");
    },
	
	manageBlinds: function() {
		console.debug("Home controller manageBlinds called");
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "Blinds",
			data : {}
		});
	},
    
    manageLights: function() {
        console.debug("Home controller manageLights called");
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "Lights",
			data : {}
		});
    },
    
    manageThermostats: function() {
        console.debug("Home controller manageThermostats called");
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "Thermostats",
			data : {}
		});
    },
    
    manageGarage: function() {
        console.debug("Home controller manageThermostats called");
        sap.ui.getCore().byId("idIconGarage").setColor("#ffff00");
        dashboard.Commons.sendCommand("Garage_Gate", "ON");
        setTimeout(function(){ sap.ui.getCore().byId("idIconGarage").setColor("#ffffff"); }, 1000);
    }
});