/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var P={};P.render=function(r,c){var w=c.getPercentValue(),W=c.getWidth(),h=c.getHeight(),t=c.getDisplayValue(),s=c.getShowValue(),S=c.getState(),T=c.getTextDirection().toLowerCase(),C=c.getId();r.write("<div");r.writeControlData(c);r.addClass("sapMPI");r.addStyle("width",W);if(w>50){r.addClass("sapMPIValueGreaterHalf");}if(h){r.addStyle("height",h);}if(c.getEnabled()){r.writeAttribute('tabIndex','-1');}else{r.addClass("sapMPIBarDisabled");}r.writeClasses();r.writeStyles();r.writeAccessibilityState(c,{role:"progressbar",valuemin:0,valuenow:w,valuemax:100,valuetext:c._getAriaValueText({sText:t,fPercent:w})});r.write(">");r.write("<div");r.addClass("sapMPIBar");switch(S){case sap.ui.core.ValueState.Warning:r.addClass("sapMPIBarCritical");break;case sap.ui.core.ValueState.Error:r.addClass("sapMPIBarNegative");break;case sap.ui.core.ValueState.Success:r.addClass("sapMPIBarPositive");break;default:r.addClass("sapMPIBarNeutral");break;}r.writeClasses();r.writeAttribute("id",C+"-bar");r.writeAttribute("style","width:"+w+"%");r.write(">");P._renderDisplayText(r,T,"Left",C);if(s){r.writeEscaped(t);}r.write("</span>");r.write("</div>");P._renderDisplayText(r,T,"Right",C);if(s){r.writeEscaped(t);}r.write("</span>");r.write("</div>");};P._renderDisplayText=function(r,t,T,c){r.write("<span class='sapMPIText sapMPIText"+T+"' id='"+c+"-text"+T+"'");if(t!=="inherit"){r.writeAttribute("dir",t);}r.write('>');};return P;},true);
