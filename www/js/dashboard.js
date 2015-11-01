jQuery.sap.require("dashboard.Commons");

var app = {
		
    // Application Constructor
    initialize: function() {
    	console.log("Initialize App");
        this.bindEvents();
    },
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady(), false);
        document.addEventListener('batterystatus', this.onBatteryStatus(), false);
    },
    
    // deviceready Event Handler
    //
    onDeviceReady: function() {
    	console.log("Device ready");
		// define View and place it onto the HTML page
		sap.ui.jsview("App", "dashboard.App").placeAt("content");
		// all other initialization will be done by the App controller
    },
    
    onBatteryStatus: function(info) {
        console.log("Battery Level: " + info.level);
        if (parseInt(info.level) < 30) {
            dashboard.Commons.sendCommand("Dashboard_LowBattery", "ON");
            setTimeout(function(){ dashboard.Commons.sendCommand("Dashboard_LowBattery", "OFF"); }, 1000);
        }
    }
};