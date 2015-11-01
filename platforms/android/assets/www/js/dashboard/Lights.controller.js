jQuery.sap.require("dashboard.Commons");

sap.ui.controller("dashboard.Lights", {

	onInit : function() {
		console.debug("Lights controller init called");
	},
	
    updateTiles: function() {
		console.debug("Lights controller updateTiles called");
        
        // get current state of light items
        for (var itemID in lightItems) {
            if (lightItems.hasOwnProperty(itemID)) {     
                var state = dashboard.Commons.getState(itemID);
                if (state == "ON") {
                    sap.ui.getCore().byId("idIcon" + itemID).setColor("#ffff00");
                } else {
                    sap.ui.getCore().byId("idIcon" + itemID).setColor("#ffffff");
                }
            }
        };        
	},
    
    switchLights: function(itemID) {
        // get current state
        var state = dashboard.Commons.getState(itemID);
        if (state == "ON") {
            // turn light off
            sap.ui.getCore().byId("idIcon" + itemID).setColor("#ffffff");
            dashboard.Commons.sendCommand(itemID, "OFF");
        } else {
            sap.ui.getCore().byId("idIcon" + itemID).setColor("#ffff00");
            dashboard.Commons.sendCommand(itemID, "ON");
        }
    }
});