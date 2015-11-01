jQuery.sap.require("dashboard.Commons");

sap.ui.controller("dashboard.Blinds", {

	onInit : function() {
		console.debug("Blinds controller init called");
	},
	
	updateTiles: function() {
		console.debug("Blinds controller updateTiles called");
        
        // get current state of blind items
        for (var itemID in blindItems) {
            if (blindItems.hasOwnProperty(itemID)) {     
                var state = dashboard.Commons.getState(itemID);
                sap.ui.getCore().byId("idSlider" + itemID).setValue(parseFloat(state));
                console.debug("Set slider " + "idSlider" + itemID + " to value " + state);
            }
        };                
	},
    
    switchBlind: function(itemID) {
        // get current state
        var state = dashboard.Commons.getState(itemID);
        if (state == "0") {
            // open blind
            sap.ui.getCore().byId("idSlider" + itemID).setValue(parseFloat("0"));
            dashboard.Commons.sendCommand(itemID, "UP");
        } else {
            // close blind
            sap.ui.getCore().byId("idSlider" + itemID).setValue(parseFloat("100"));
            dashboard.Commons.sendCommand(itemID, "DOWN");
        }
    },
    
    setBlind: function(itemID, value) {
        console.debug("Set item " + itemID + " to value " + value.toString());
        dashboard.Commons.sendCommand(itemID, value.toString());
    }
});