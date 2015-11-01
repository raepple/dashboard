/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/unified/library'],function(q,C,L,l){"use strict";var H=C.extend("sap.ui.unified.calendar.Header",{metadata:{library:"sap.ui.unified",properties:{textButton1:{type:"string",group:"Misc"},ariaLabelButton1:{type:"string",group:"Misc"},textButton2:{type:"string",group:"Misc"},ariaLabelButton2:{type:"string",group:"Misc"},enabledPrevious:{type:"boolean",group:"Misc",defaultValue:true},enabledNext:{type:"boolean",group:"Misc",defaultValue:true}},events:{pressPrevious:{},pressNext:{},pressButton1:{},pressButton2:{}}}});(function(){H.prototype.onAfterRendering=function(){};H.prototype.setTextButton1=function(t){this.setProperty("textButton1",t,true);if(this.getDomRef()){this.$("B1").text(t);}};H.prototype.setAriaLabelButton1=function(t){this.setProperty("ariaLabelButton1",t,true);if(this.getDomRef()){if(t){this.$("B1").attr("aria-label",t);}else{this.$("B1").removeAttr("aria-label");}}};H.prototype.setTextButton2=function(t){this.setProperty("textButton2",t,true);if(this.getDomRef()){this.$("B2").text(t);}};H.prototype.setAriaLabelButton2=function(t){this.setProperty("ariaLabelButton2",t,true);if(this.getDomRef()){if(t){this.$("B2").attr("aria-label",t);}else{this.$("B2").removeAttr("aria-label");}}};H.prototype.setEnabledPrevious=function(e){this.setProperty("enabledPrevious",e,true);if(this.getDomRef()){if(e){this.$("prev").toggleClass("sapUiCalDsbl",false).removeAttr("disabled");}else{this.$("prev").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled");}}};H.prototype.setEnabledNext=function(e){this.setProperty("enabledNext",e,true);if(this.getDomRef()){if(e){this.$("next").toggleClass("sapUiCalDsbl",false).removeAttr("disabled");}else{this.$("next").toggleClass("sapUiCalDsbl",true).attr("disabled","disabled");}}};H.prototype.onclick=function(e){if(e.isMarked("delayedMouseEvent")){return;}if(q.sap.containsOrEquals(this.getDomRef("prev"),e.target)&&this.getEnabledPrevious()){this.firePressPrevious();}else if(q.sap.containsOrEquals(this.getDomRef("next"),e.target)&&this.getEnabledNext()){this.firePressNext();}else if(e.target.id==this.getId()+"-B1"){this.firePressButton1();}else if(e.target.id==this.getId()+"-B2"){this.firePressButton2();}};H.prototype.onsapnext=function(e){e.preventDefault();};}());return H;},true);
