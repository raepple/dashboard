jQuery.sap.declare("dashboard.Commons");

var lightItems = new Object();

lightItems['GardenLights'] = { title: "Garten" };
lightItems['SocketB'] = { title: "Sofa" };
lightItems['SocketC'] = { title: "Anbau" };
lightItems['SocketD'] = { title: "Esszimmer" };
lightItems['SocketE'] = { title: "Fernseher" };
lightItems['SocketF'] = { title: "Kids" };

var blindItems = new Object();

blindItems['Rollershutter_Bedroom'] = { title: "Schlafzimmer" };
blindItems['Rollershutter_HomeOffice'] = { title: "Home Office" };
blindItems['Rollershutter_Closet'] = { title: "Kleiderschrank" };
blindItems['Rollershutter_Terrace'] = { title: "Terrasse" };
blindItems['Rollershutter_LivingRoom'] = { title: "Wohnzimmer" };

var thermostatsItems = new Object();
thermostatsItems['Thermostat_Livingroom_Target'] = { title: "Wohnzimmer" };
thermostatsItems['Thermostat_Kitchen_Target'] = { title: "Küche" };
thermostatsItems['Thermostat_Bath_Target'] = { title: "Bad" };

dashboard.Commons = {

    make_base_auth : function (user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    },
    
    thermostatsTile : function(itemID, title, oController) {
        var oTileThermostatContent = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[
                        new sap.m.Text("idTemperature" + itemID).addStyleClass('tileData'),
                        new sap.m.Slider("idSlider" + itemID, {
                            min: 15,
                            max: 30,
                            width: "125px",
                            change: function() {
                                var value = sap.ui.getCore().byId("idSlider" + itemID).getValue();
                                oController.setTemperature(itemID, value);
                            },
                            liveChange: function() {
                                var value = sap.ui.getCore().byId("idSlider" + itemID).getValue();
                                sap.ui.getCore().byId("idTemperature" + itemID).setText(value + " \u2103");
                            }
                        }),
                        new sap.m.Text({
                            text : title
                        }).addStyleClass('tileTitleLarge')
					]
				})
			]
		});
        
        var oTileThermostat = new sap.m.CustomTile({
			removable: true,
			content: oTileThermostatContent
		}).addStyleClass('tile');
        
        return oTileThermostat;
    },
    
    blindsTile : function(itemID, title, oController) {
        var oTileBlindContent = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[
						new sap.ui.core.Icon("idIcon" + itemID,{  
							src : sap.ui.core.IconPool.getIconURI("icon-blind2","dashboard"),
							color : "#ffffff",
                            size : "50px"
						}),                    
                        new sap.m.Slider("idSlider" + itemID, {
                            width: "125px",
                            change: function() {
                                var value = sap.ui.getCore().byId("idSlider" + itemID).getValue();
                                oController.setBlind(itemID, value);
                            }
                        }),
                        new sap.m.Text({
                            text : title
                        }).addStyleClass('tileTitleLarge')
					]
				})
			]
		});
        
        var oTileBlind = new sap.m.CustomTile({
			removable: true,
			content: oTileBlindContent,
			press: function() {
		    	oController.switchBlind(itemID);
		    }
		}).addStyleClass('tile');
        
        return oTileBlind;
    },
    
    lightsTile : function(itemID, title, oController) {
        var oTileLightContent = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[                        
						new sap.ui.core.Icon("idIcon" + itemID,{  
							src : sap.ui.core.IconPool.getIconURI("icon-bulp","dashboard"),
							color : "#ffffff",
                            size : "100px"
						}),
                        new sap.m.Text({
                            text : title
                        }).addStyleClass('tileTitleXLarge')
					]
				})
			]
		});
        
        var oTileLight = new sap.m.CustomTile({
			removable: true,
			content: oTileLightContent,
			press: function() {
		    	oController.switchLights(itemID);
		    }
		}).addStyleClass('tile');
        
        return oTileLight;
    },
    
    backTile : function()
    {
        var oTileBackContent = new sap.ui.layout.Grid({
			content: [
				new sap.m.VBox({
					width: "100%",
					height: "100%",
					items:[                        
						new sap.ui.core.Icon({  
							src : sap.ui.core.IconPool.getIconURI("icon-back","dashboard"),
							color : "#ffffff",
                            size : "100px"                            
						})
					]
				})
			]
		});
        
        var oTileBack = new sap.m.CustomTile({
			removable: true,
			content: oTileBackContent,
			press: function() {
		    	var bus = sap.ui.getCore().getEventBus();
                bus.publish("nav", "back");
		    }
		}).addStyleClass('tile');
        
        return oTileBack;
    },
    
    getState : function (itemID)
    {
        var sUrl = "http://192.168.1.61:8080/rest/items/" + itemID + "/state";
        var result = "";
        var _this = this;
        
        jQuery.ajax({
            type       : "GET",
            url        : sUrl,
            async      : false,
            success    : function (data) {
                result = data;
            },
            failure    : function(jqXHR, textStatus ) {
                console.error( "Failure: " + textStatus );
            },
            beforeSend : function (xhr){ 
                xhr.setRequestHeader('Authorization', _this.make_base_auth("raepple", "martin57")); 
            }
        });

        return result;
    },
    
    setState : function ( itemID, newState )
    {
        var sUrl = "http://192.168.1.61:8080/rest/items/" + itemID + "/state";
        var _this = this;
        
        var request = jQuery.ajax
        ({
            type       : "PUT",
            url        : sUrl,
            data       : newState,
            beforeSend: function (xhr){ 
                xhr.setRequestHeader('Authorization', _this.make_base_auth("raepple", "martin57")); 
            },
            headers    : { "Content-Type": "text/plain" }
        });

        request.done( function(data) 
        { 
            console.debug( "Success" );
        });

        request.fail( function(jqXHR, textStatus ) 
        { 
            console.error( "Failure: " + textStatus );
        });
    },
    
    sendCommand: function ( itemID, command )
    {
        var sUrl = "http://192.168.1.61:8080/rest/items/" + itemID;
        var _this = this;
        
        var request = jQuery.ajax
        ({
            type       : "POST",
            url        : sUrl,
            data       : command,
            beforeSend: function (xhr){ 
                xhr.setRequestHeader('Authorization', _this.make_base_auth("raepple", "martin57")); 
            },
            headers    : { 'Content-Type': 'text/plain' }
        });

        request.done( function(data) 
        { 
            console.debug( "Success: Status=" + data );
        });

        request.fail( function(jqXHR, textStatus ) 
        { 
            console.error( "Failure: " + textStatus );
        });
    }
};