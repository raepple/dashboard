jQuery.sap.require("dashboard.Commons");

sap.ui.controller("dashboard.Thermostats", {

	onInit : function() {
		console.debug("Thermostats controller init called");
	},
	
	updateTiles: function() {
		console.debug("Thermostats controller updateTiles called");
        
        // get current state of thermostat items
        for (var itemID in thermostatsItems) {
            if (thermostatsItems.hasOwnProperty(itemID)) {     
                var state = parseInt(dashboard.Commons.getState(itemID));
                sap.ui.getCore().byId("idSlider" + itemID).setValue(state);
                sap.ui.getCore().byId("idTemperature" + itemID).setText(state.toString() + " \u2103");
                console.debug("Set slider " + "idSlider" + itemID + " to value " + state);
            }
        };                
	},
    
    setTemperature: function(itemID, value) {
        console.debug("Set item " + itemID + " to value " + value.toString());
        dashboard.Commons.sendCommand(itemID, value.toString());
    }
});