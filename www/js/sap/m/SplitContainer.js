/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/theming/Parameters','sap/m/semantic/SemanticPage'],function(q,l,C,I,P,S){"use strict";var a=C.extend("sap.m.SplitContainer",{metadata:{library:"sap.m",properties:{defaultTransitionNameDetail:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameMaster:{type:"string",group:"Appearance",defaultValue:"slide"},mode:{type:"sap.m.SplitAppMode",group:"Appearance",defaultValue:sap.m.SplitAppMode.ShowHideMode},masterButtonText:{type:"string",group:"Appearance",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},backgroundRepeat:{type:"boolean",group:"Appearance",defaultValue:false},backgroundOpacity:{type:"float",group:"Appearance",defaultValue:1}},aggregations:{masterPages:{type:"sap.ui.core.Control",multiple:true,singularName:"masterPage"},detailPages:{type:"sap.ui.core.Control",multiple:true,singularName:"detailPage"},_navMaster:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_navDetail:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_navPopover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},associations:{initialDetail:{type:"sap.ui.core.Control",multiple:false},initialMaster:{type:"sap.ui.core.Control",multiple:false}},events:{masterNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterMasterNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},masterButton:{},beforeMasterOpen:{},afterMasterOpen:{},beforeMasterClose:{},afterMasterClose:{},detailNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterDetailNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}}}}});a.prototype.init=function(){var t=this;this._isMie9=false;if(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10){this._isMie9=true;}this.oCore=sap.ui.getCore();this._aMasterPages=[];this._aDetailPages=[];if(!sap.ui.Device.system.phone){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oMasterNav=new sap.m.NavContainer(this.getId()+"-Master",{width:"",navigate:function(e){t._handleNavigationEvent(e,false,true);},afterNavigate:function(e){t._handleNavigationEvent(e,true,true);}});this._oDetailNav=new sap.m.NavContainer(this.getId()+"-Detail",{width:"",navigate:function(e){t._handleNavigationEvent(e,false,false);},afterNavigate:function(e){t._handleNavigationEvent(e,true,false);}});this.setAggregation("_navMaster",this._oMasterNav,true);this.setAggregation("_navDetail",this._oDetailNav,true);this._createShowMasterButton();this._oPopOver=new sap.m.Popover(this.getId()+"-Popover",{placement:sap.m.PlacementType.Bottom,showHeader:false,contentWidth:"320px",contentHeight:"600px",beforeOpen:function(){t.fireBeforeMasterOpen();},beforeClose:function(){t.fireBeforeMasterClose();},afterOpen:function(){t.fireAfterMasterOpen();t._bMasterisOpen=true;},afterClose:function(){t._afterHideMasterAnimation();}}).addStyleClass("sapMSplitContainerPopover");this.setAggregation("_navPopover",this._oPopOver,true);}else{this._oMasterNav=this._oDetailNav=new sap.m.NavContainer();this.setAggregation("_navMaster",this._oMasterNav,true);}this._oldIsLandscape=sap.ui.Device.orientation.landscape;this._bMasterisOpen=false;var t=this;var p=function(r,n,s){return function(c,A,b){r.apply(t[n],arguments);if(A==="pages"&&q.inArray(c,t[s])!==-1){t._removePageFromArray(t[s],c);}};};var m=this._oMasterNav._removeChild;this._oMasterNav._removeChild=p(m,"_oMasterNav","_aMasterPages");if(this._oDetailNav){var d=this._oDetailNav._removeChild;this._oDetailNav._removeChild=p(d,"_oDetailNav","_aDetailPages");}};a.prototype.onBeforeRendering=function(){if(this._fnResize){sap.ui.Device.resize.detachHandler(this._fnResize);}if(this._bMasterisOpen&&(this._portraitHide()||this._hideMode())){this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");this._bMasterisOpen=false;}};a.prototype.exit=function(){if(this._fnResize){sap.ui.Device.resize.detachHandler(this._fnResize);}delete this._aMasterPages;delete this._aDetailPages;if(this._oShowMasterBtn){this._oShowMasterBtn.destroy();this._oShowMasterBtn=null;}};a.prototype.onAfterRendering=function(){if(!sap.ui.Device.system.phone){if(this._oPopOver&&this._oPopOver.isOpen()){this._oPopOver.close();}}if(!this._fnResize){this._fnResize=q.proxy(this._handleResize,this);}sap.ui.Device.resize.attachHandler(this._fnResize);if(sap.ui.Device.os.windows&&sap.ui.Device.browser.internet_explorer){this._oMasterNav.$().append('<iframe class="sapMSplitContainerMasterBlindLayer" src="about:blank"></iframe>');}};a.prototype.ontouchstart=function(e){if(!sap.ui.Device.system.phone){if(e.originalEvent&&e.originalEvent._sapui_handledByControl){this._bIgnoreSwipe=true;}else{this._bIgnoreSwipe=false;}}};a.prototype.onswiperight=function(e){if((sap.ui.Device.system.tablet||(sap.ui.Device.os.windows&&sap.ui.Device.os.version>=8))&&(this._portraitHide()||this._hideMode())&&!this._bIgnoreSwipe){if(!this._bDetailNavButton){this.showMaster();}}};a.prototype.ontap=function(e){if(sap.ui.Device.system.phone){return;}var i=true;if(q(e.target).closest(".sapMSplitContainerDetail").length>0){i=false;}if(((!this._oldIsLandscape&&this.getMode()=="ShowHideMode")||this.getMode()=="HideMode")&&!i&&!q.sap.containsOrEquals(this._oShowMasterBtn.getDomRef(),e.target)){this.hideMaster();}};a.prototype.onswipeleft=function(e){if((sap.ui.Device.system.tablet||(sap.ui.Device.os.windows&&sap.ui.Device.os.version>=8))&&(this._portraitHide()||this._hideMode())&&!this._bIgnoreSwipe){this.hideMaster();}};a.prototype._onMasterButtonTap=function(e){if(sap.ui.Device.system.phone){return;}if(!this._oldIsLandscape){if(this.getMode()=="PopoverMode"){if(!this._oPopOver.isOpen()){this._oPopOver.openBy(this._oShowMasterBtn,true);}else{this._oPopOver.close();}}else{this.showMaster();}}else{if(this.getMode()==="HideMode"){this.showMaster();}}};a.prototype.to=function(p,t,d,T){if(this._oMasterNav.getPage(p)){this._oMasterNav.to(p,t,d,T);}else{this._oDetailNav.to(p,t,d,T);}};a.prototype.backToPage=function(p,b,t){if(this._oMasterNav.getPage(p)){this._oMasterNav.backToPage(p,b,t);}else{this._oDetailNav.backToPage(p,b,t);}};a.prototype.insertPreviousPage=function(p,t,d){if(this._oMasterNav.getPage(p)){this._oMasterNav.insertPreviousPage(p,t,d);}else{this._oDetailNav.insertPreviousPage(p,t,d);}return this;};a.prototype.toMaster=function(p,t,d,T){this._oMasterNav.to(p,t,d,T);};a.prototype.backMaster=function(b,t){this._oMasterNav.back(b,t);};a.prototype.backMasterToPage=function(p,b,t){this._oMasterNav.backToPage(p,b,t);};a.prototype.toDetail=function(p,t,d,T){this._oDetailNav.to(p,t,d,T);};a.prototype.backDetail=function(b,t){this._oDetailNav.back(b,t);};a.prototype.backDetailToPage=function(p,b,t){this._oDetailNav.backToPage(p,b,t);};a.prototype.backToTopMaster=function(b,t){this._oMasterNav.backToTop(b,t);};a.prototype.backToTopDetail=function(b,t){this._oDetailNav.backToTop(b,t);};a.prototype.addMasterPage=function(p){if(this._hasPageInArray(this._aMasterPages,p)){return;}if(this._oMasterNav===this._oDetailNav&&q.inArray(p,this._oDetailNav.getPages())!==-1){this._removePageFromArray(this._aDetailPages,p);}this._oMasterNav.addPage(p);this._aMasterPages.push(p);return this;};a.prototype.addDetailPage=function(p){var t=this,r=this._getRealPage(p);if(this._hasPageInArray(this._aDetailPages,p)){return;}p.addDelegate({onBeforeShow:function(){if(r){if(!sap.ui.Device.system.phone){if(t._needShowMasterButton()){t._setMasterButton(r);}}}}});if(r){r.addDelegate({onBeforeRendering:function(){if(!sap.ui.Device.system.phone&&(t._oDetailNav.getCurrentPage()===r)){if(!r.getShowNavButton()&&t._needShowMasterButton()){t._setMasterButton(r,true);}else{t._removeMasterButton(r);}}}});if(!sap.ui.Device.system.phone){if(!r._setCustomHeaderInSC){r._setCustomHeaderInSC=r.setCustomHeader;}r.setCustomHeader=function(h){this._setCustomHeaderInSC.apply(this,arguments);if(h&&t._needShowMasterButton()){t._setMasterButton(r);}return this;};if(!r._setShowNavButtonInSC){r._setShowNavButtonInSC=r.setShowNavButton;}r.setShowNavButton=function(s){this._setShowNavButtonInSC.apply(this,arguments);if(!s&&t._needShowMasterButton()){t._setMasterButton(r);}else{t._removeMasterButton(r,true);}return this;};}}if(this._oMasterNav===this._oDetailNav&&q.inArray(p,this._oMasterNav.getPages())!==-1){this._removePageFromArray(this._aMasterPages,p);}this._oDetailNav.addPage(p);this._aDetailPages.push(p);return this;};a.prototype.getMasterPages=function(){return this._aMasterPages;};a.prototype.getDetailPages=function(){return this._aDetailPages;};a.prototype.indexOfMasterPage=function(p){return this._indexOfMasterPage(p);};a.prototype.indexOfDetailPage=function(p){return this._indexOfDetailPage(p);};a.prototype.insertMasterPage=function(p,i,s){return this._insertPage(this._aMasterPages,"masterPages",p,i,s);};a.prototype.removeMasterPage=function(p,s){return this._removePage(this._aMasterPages,"masterPages",p,s);};a.prototype.removeAllMasterPages=function(s){this._aMasterPages=[];return this.removeAllAggregation("masterPages",s);};a.prototype.insertDetailPage=function(p,i,s){return this._insertPage(this._aDetailPages,"detailPages",p,i,s);};a.prototype._restoreMethodsInPage=function(p){if(sap.ui.Device.system.phone){return;}var r=this._getRealPage(p);if(r){if(r._setCustomHeaderInSC){r.setCustomHeader=r._setCustomHeaderInSC;delete r._setCustomHeaderInSC;}if(r._setShowNavButtonInSC){r.setShowNavButton=r._setShowNavButtonInSC;delete r._setShowNavButtonInSC;}}};a.prototype.removeDetailPage=function(p,s){this._restoreMethodsInPage(p);return this._removePage(this._aDetailPages,"detailPages",p,s);};a.prototype.removeAllDetailPages=function(s){var p=this.getDetailPages();for(var i=0;i<p.length;i++){this._restoreMethodsInPage(p[i]);}this._aDetailPages=[];return this.removeAllAggregation("detailPages",s);};a.prototype.addPage=function(p,m){if(m){return this.addMasterPage(p);}else{return this.addDetailPage(p);}};a.prototype.showMaster=function(){var _=this._oMasterNav.$(),t=this,A=q.proxy(this._afterShowMasterAnimation,this),b=this._getRealPage(this._oDetailNav.getCurrentPage());function c(){this._oPopOver.detachAfterOpen(c,this);this._bMasterOpening=false;this._bMasterisOpen=true;this.fireAfterMasterOpen();}if(this._portraitPopover()){if(!this._oPopOver.isOpen()){this._oPopOver.attachAfterOpen(c,this);this.fireBeforeMasterOpen();this._oPopOver.openBy(this._oShowMasterBtn,true);this._bMasterOpening=true;}}else{if((this._portraitHide()||this._hideMode())&&(!this._bMasterisOpen||this._bMasterClosing)){if(this._isMie9){this._oMasterNav.$().css("width","320px");_.animate({left:"+=320"},{duration:300,complete:A});this._bMasterisOpen=true;t._bMasterOpening=false;this._removeMasterButton(b);}else{_.bind("webkitTransitionEnd transitionend",A);}this.fireBeforeMasterOpen();this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",true);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",false);this._bMasterOpening=true;t._removeMasterButton(b);if(sap.ui.Device.browser.webkit){var m=this._oMasterNav;window.setTimeout(function(){m.$().css("box-shadow","none");window.setTimeout(function(){m.$().css("box-shadow","");},50);},0);}}}return this;};a.prototype.hideMaster=function(){var _=this._oMasterNav.$(),A=q.proxy(this._afterHideMasterAnimation,this);if(this._portraitPopover()){if(this._oPopOver.isOpen()){this._oPopOver.close();this._bMasterClosing=true;}}else{if((this._portraitHide()||this._hideMode())&&this._bMasterisOpen){if(this._isMie9){_.animate({left:"-=320"},{duration:300,complete:A});}else{_.bind("webkitTransitionEnd transitionend",A);}this.fireBeforeMasterClose();this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",false);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",true);this._bMasterClosing=true;}}return this;};a.prototype._afterShowMasterAnimation=function(){if(this._portraitHide()||this._hideMode()){if(!this._isMie9){var m=this._oMasterNav.$();m.unbind("webkitTransitionEnd transitionend",this._afterShowMasterAnimation);}this._bMasterOpening=false;this._bMasterisOpen=true;this.fireAfterMasterOpen();}};a.prototype._afterHideMasterAnimation=function(){if(this._portraitHide()||this._hideMode()){if(!this._isMie9){var m=this._oMasterNav.$();m.unbind("webkitTransitionEnd transitionend",this._afterHideMasterAnimation);}}var c=this._getRealPage(this._oDetailNav.getCurrentPage());this._setMasterButton(c);this._bMasterClosing=false;this._bMasterisOpen=false;if(q.sap.containsOrEquals(this._oMasterNav.getDomRef(),document.activeElement)){document.activeElement.blur();}this.fireAfterMasterClose();};a.prototype.getCurrentMasterPage=function(){return this._oMasterNav.getCurrentPage();};a.prototype.getCurrentDetailPage=function(){return this._oDetailNav.getCurrentPage();};a.prototype.getCurrentPage=function(m){if(m){return this.getCurrentMasterPage();}else{return this.getCurrentDetailPage();}};a.prototype.getPreviousPage=function(m){if(m){return this._oMasterNav.getPreviousPage();}else{return this._oDetailNav.getPreviousPage();}};a.prototype.getMasterPage=function(p){return this._oMasterNav.getPage(p);};a.prototype.getDetailPage=function(p){return this._oDetailNav.getPage(p);};a.prototype.getPage=function(p,m){if(m){return this.getMasterPage(p);}else{return this.getDetailPage(p);}};a.prototype.isMasterShown=function(){if(sap.ui.Device.system.phone){var c=this._oMasterNav.getCurrentPage();return this._indexOfMasterPage(c)!==-1;}else{var m=this.getMode();switch(m){case sap.m.SplitAppMode.StretchCompressMode:return true;case sap.m.SplitAppMode.HideMode:return this._bMasterisOpen;case sap.m.SplitAppMode.PopoverMode:case sap.m.SplitAppMode.ShowHideMode:return sap.ui.Device.orientation.landscape||this._bMasterisOpen;default:return false;}}};a.prototype.setInitialMaster=function(p){this._oMasterNav.setInitialPage(p);this.setAssociation('initialMaster',p,true);return this;};a.prototype.setInitialDetail=function(p){if(!sap.ui.Device.system.phone){this._oDetailNav.setInitialPage(p);}this.setAssociation('initialDetail',p,true);return this;};a.prototype.setDefaultTransitionNameDetail=function(t){this.setProperty("defaultTransitionNameDetail",t,true);this._oDetailNav.setDefaultTransitionName(t);return this;};a.prototype.setDefaultTransitionNameMaster=function(t){this.setProperty("defaultTransitionNameMaster",t,true);this._oMasterNav.setDefaultTransitionName(t);return this;};a.prototype.setMasterButtonText=function(t){if(!sap.ui.Device.system.phone){if(!t){t=this._rb.getText("SplitContainer_NAVBUTTON_TEXT");}this._oShowMasterBtn.setText(t);}this.setProperty("masterButtonText",t,true);return this;};a.prototype.setMode=function(m){var o=this.getMode();if(o===m){return;}this.setProperty("mode",m,true);if(!sap.ui.Device.system.phone&&this.getDomRef()){if(o==="HideMode"&&this._oldIsLandscape){this._removeMasterButton(this._oDetailNav.getCurrentPage());if(this._isMie9){this._oMasterNav.$().css({left:0,width:""});}}if(m!=="PopoverMode"&&this._oPopOver.getContent().length>0){this._updateMasterPosition("landscape");}else if(m=="PopoverMode"){if(!this._oldIsLandscape){if(this._oPopOver.getContent().length===0){this._updateMasterPosition("popover");}this._setMasterButton(this._oDetailNav.getCurrentPage());}this.toggleStyleClass("sapMSplitContainerShowHide",false);this.toggleStyleClass("sapMSplitContainerStretchCompress",false);this.toggleStyleClass("sapMSplitContainerHideMode",false);this.toggleStyleClass("sapMSplitContainerPopover",true);}if(m=="StretchCompressMode"){this.toggleStyleClass("sapMSplitContainerShowHide",false);this.toggleStyleClass("sapMSplitContainerPopover",false);this.toggleStyleClass("sapMSplitContainerHideMode",false);this.toggleStyleClass("sapMSplitContainerStretchCompress",true);this._removeMasterButton(this._oDetailNav.getCurrentPage());}if(m=="ShowHideMode"){this.toggleStyleClass("sapMSplitContainerPopover",false);this.toggleStyleClass("sapMSplitContainerStretchCompress",false);this.toggleStyleClass("sapMSplitContainerHideMode",false);this.toggleStyleClass("sapMSplitContainerShowHide",true);if(!sap.ui.Device.orientation.landscape){this._setMasterButton(this._oDetailNav.getCurrentPage());}}if(m==="HideMode"){this.toggleStyleClass("sapMSplitContainerPopover",false);this.toggleStyleClass("sapMSplitContainerStretchCompress",false);this.toggleStyleClass("sapMSplitContainerShowHide",false);this.toggleStyleClass("sapMSplitContainerHideMode",true);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",false);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",true);this._bMasterisOpen=false;this._setMasterButton(this._oDetailNav.getCurrentPage());if(this._isMie9){this._oMasterNav.$().css({left:"",width:"auto"});}}}return this;};a.prototype.setBackgroundOpacity=function(o){if(o>1||o<0){q.sap.log.warning("Invalid value "+o+" for SplitContainer.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this;}this.$("BG").css("opacity",o);return this.setProperty("backgroundOpacity",o,true);};a.prototype._indexOfMasterPage=function(p){return q.inArray(p,this._aMasterPages);};a.prototype._indexOfDetailPage=function(p){return q.inArray(p,this._aDetailPages);};a.prototype._insertPage=function(p,A,o,b,s){this.insertAggregation(A,o,b,s);var i;if(b<0){i=0;}else if(b>p.length){i=p.length;}else{i=b;}var O=q.inArray(o,p);p.splice(i,0,o);if(O!=-1){this._removePageFromArray(p,o);}return this;};a.prototype._removePage=function(p,A,o,s){var r=this.removeAggregation(A,o,s);if(r){this._removePageFromArray(p,r);}return r;};a.prototype._removePageFromArray=function(p,o){var i=q.inArray(o,p);if(i!=-1){p.splice(i,1);if(p===this._aDetailPages){this._restoreMethodsInPage(o);}}};a.prototype._handleNavigationEvent=function(e,A,m){var E=(A?"After":"")+(m?"Master":"Detail")+"Navigate",c;E=E.charAt(0).toLowerCase()+E.slice(1);c=this.fireEvent(E,e.mParameters,true);if(!c){e.preventDefault();}};a.prototype._handleResize=function(){var i=sap.ui.Device.orientation.landscape,_=this._oDetailNav.getCurrentPage(),m=this.getMode();if(this._oldIsLandscape!==i){this._oldIsLandscape=i;if(!sap.ui.Device.system.phone){this.toggleStyleClass("sapMSplitContainerPortrait",!i);if(m==="HideMode"){return;}if(m==="ShowHideMode"){if(i){this.fireBeforeMasterOpen();}else{this.fireBeforeMasterClose();}}if(this._isMie9){if(i){this._oMasterNav.$().css({left:0,width:""});}else{if(m==="ShowHideMode"||m==="PopoverMode"){this._oMasterNav.$().css({left:-320,width:"auto"});}}}if(m==="ShowHideMode"||m==="PopoverMode"){this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterVisible",i);this._oMasterNav.toggleStyleClass("sapMSplitContainerMasterHidden",!i);}if(m==="ShowHideMode"){if(i){this._bMasterisOpen=true;this.fireAfterMasterOpen();}else{this._bMasterisOpen=false;this.fireAfterMasterClose();}}if(m=="PopoverMode"){if(this._oPopOver.isOpen()){this._oPopOver.attachAfterClose(this._handlePopClose,this);this._oPopOver.close();}else{this._handlePopClose();}}_=this._getRealPage(_);if(!this._oldIsLandscape&&m!="StretchCompressMode"){this._setMasterButton(_);}else{this._removeMasterButton(_);}}if(this._onOrientationChange){this._onOrientationChange();}}};a.prototype._handlePopClose=function(e){this._oPopOver.detachAfterClose(this._handlePopClose,this);if(this._oldIsLandscape){this._updateMasterPosition("landscape");}else{this._updateMasterPosition("popover");}};a.prototype._getRealPage=function(p){var r=p,c;while(r){if(r instanceof sap.m.Page){return r;}if(r instanceof sap.m.MessagePage){return r;}if(r instanceof S){return r;}if(r instanceof sap.ui.core.mvc.View){c=r.getContent();if(c.length===1){r=c[0];continue;}}else if(r instanceof sap.m.NavContainer){r=r.getCurrentPage();continue;}r=null;}return r;};a.prototype._updateMasterPosition=function(p){var t=this;if(p=="popover"){this.removeAggregation("_navMaster",this._oMasterNav,true);this._oMasterNav.$().remove();this._oPopOver.addContent(this._oMasterNav);this._bMasterisOpen=false;}if(p=="landscape"){var r=function(){t._oPopOver.removeAggregation("content",t._oMasterNav,false);t.setAggregation("_navMaster",t._oMasterNav,true);var $=t.$();if($[0]){var b=sap.ui.getCore().createRenderManager();b.renderControl(t._oMasterNav.addStyleClass("sapMSplitContainerMaster"));b.flush($[0],false,1);b.destroy();}};if(this._oPopOver.isOpen()){var A=function(){this._oPopOver.detachAfterClose(A,this);this._bMasterisOpen=false;r();};this._oPopOver.attachAfterClose(A,this);this._oPopOver.close();}else{r();}}};a.prototype._portraitHide=function(){if(!this._oldIsLandscape&&!sap.ui.Device.system.phone&&this.getMode()==="ShowHideMode"){return true;}else{return false;}};a.prototype._portraitPopover=function(){if(!this._oldIsLandscape&&!sap.ui.Device.system.phone&&this.getMode()==="PopoverMode"){return true;}else{return false;}};a.prototype._hideMode=function(){return this.getMode()==="HideMode"&&!sap.ui.Device.system.phone;};a.prototype._needShowMasterButton=function(){return(this._portraitHide()||this._hideMode()||this._portraitPopover())&&(!this._bMasterisOpen||this._bMasterClosing);};a.prototype._createShowMasterButton=function(){if(this._oShowMasterBtn&&!this._oShowMasterBtn.bIsDestroyed){return;}this._oShowMasterBtn=new sap.m.Button(this.getId()+"-MasterBtn",{icon:I.getIconURI("menu2"),type:sap.m.ButtonType.Default,press:q.proxy(this._onMasterButtonTap,this)}).addStyleClass("sapMSplitContainerMasterBtn");};a.prototype._setMasterButton=function(p,c,s){if(!p){return;}if(typeof c==='boolean'){s=c;c=undefined;}p=this._getRealPage(p);var h=a._getHeaderButtonAggregation(p),H=h.sAggregationName,b=h.aAggregationContent;for(var i=0;i<b.length;i++){if(b[i]instanceof sap.m.Button&&b[i].getVisible()&&(b[i].getType()==sap.m.ButtonType.Back||(b[i].getType()==sap.m.ButtonType.Up&&b[i]!==this._oShowMasterBtn))){this._bDetailNavButton=true;return;}}this._bDetailNavButton=false;var o=p._getAnyHeader();var d=false;for(var i=0;i<b.length;i++){if(b[i]===this._oShowMasterBtn){d=true;}}if(!d){this._createShowMasterButton();this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");if(o){o.insertAggregation(H,this._oShowMasterBtn,0,s);}}else{if(this._isMie9){this._oShowMasterBtn.$().fadeIn();}this._oShowMasterBtn.$().parent().toggleClass("sapMSplitContainerMasterBtnHide",false);this._oShowMasterBtn.removeStyleClass("sapMSplitContainerMasterBtnHidden");this._oShowMasterBtn.$().parent().toggleClass("sapMSplitContainerMasterBtnShow",true);}if(c){c(p);}this.fireMasterButton({show:true});};a._getHeaderButtonAggregation=function(p){var h=p._getAnyHeader(),A,s;if(h.getContentLeft){A=h.getContentLeft();s="contentLeft";}if(h.getContent){A=h.getContent();s="content";}return{aAggregationContent:A,sAggregationName:s};};a.prototype._removeMasterButton=function(p,c,n){if(!p){return;}var t=this,h=this._oShowMasterBtn.$().is(":hidden"),H;if(typeof c==="boolean"){n=c;c=undefined;}if(!h&&!n){p=this._getRealPage(p);H=p._getAnyHeader();if(H){var b=a._getHeaderButtonAggregation(p).aAggregationContent;for(var i=0;i<b.length;i++){if(b[i]===this._oShowMasterBtn){if(this._isMie9){this._oShowMasterBtn.$().fadeOut();if(c){c(p);}}this._oShowMasterBtn.$().parent().toggleClass("sapMSplitContainerMasterBtnShow",false);this._oShowMasterBtn.$().parent().toggleClass("sapMSplitContainerMasterBtnHide",true);this._oShowMasterBtn.$().parent().bind("webkitAnimationEnd animationend",function(){q(this).unbind("webkitAnimationEnd animationend");t._oShowMasterBtn.addStyleClass("sapMSplitContainerMasterBtnHidden");if(c){c(p);}});return;}}}this.fireMasterButton({show:false});}else{this._oShowMasterBtn.addStyleClass("sapMSplitContainerMasterBtnHidden");if(c){c(p);}if(!h){this.fireMasterButton({show:false});}}};a.prototype._callMethodInManagedObject=function(f,A){var b=Array.prototype.slice.call(arguments);if(A==="masterPages"){if(f==="indexOfAggregation"){return this._indexOfMasterPage.apply(this,b.slice(2));}else{return this._callNavContainerMethod(f,this._oMasterNav,b);}}else if(A==="detailPages"){if(f==="indexOfAggregation"){return this._indexOfDetailPage.apply(this,b.slice(2));}else{return this._callNavContainerMethod(f,this._oDetailNav,b);}}else{return sap.ui.base.ManagedObject.prototype[f].apply(this,b.slice(1));}};a.prototype._callNavContainerMethod=function(f,n,A){A[1]="pages";A=A.slice(1);var r=a._mFunctionMapping[f];if(r){A.shift();f=r;}return n[f].apply(n,A);};a.prototype.validateAggregation=function(A,o,m){return this._callMethodInManagedObject("validateAggregation",A,o,m);};a.prototype.setAggregation=function(A,o,s){this._callMethodInManagedObject("setAggregation",A,o,s);return this;};a.prototype.getAggregation=function(A,d){return this._callMethodInManagedObject("getAggregation",A,d);};a.prototype.indexOfAggregation=function(A,o){return this._callMethodInManagedObject("indexOfAggregation",A,o);};a.prototype.insertAggregation=function(A,o,i,s){this._callMethodInManagedObject("insertAggregation",A,o,i,s);return this;};a.prototype.addAggregation=function(A,o,s){this._callMethodInManagedObject("addAggregation",A,o,s);return this;};a.prototype.removeAggregation=function(A,o,s){return this._callMethodInManagedObject("removeAggregation",A,o,s);};a.prototype.removeAllAggregation=function(A,s){return this._callMethodInManagedObject("removeAllAggregation",A,s);};a.prototype.destroyAggregation=function(A,s){this._callMethodInManagedObject("destroyAggregation",A,s);return this;};a._mFunctionMapping={"getAggregation":"getPage","addAggregation":"addPage","insertAggregation":"insertPage","removeAggregation":"removePage","removeAllAggregation":"removeAllPages"};a.prototype._hasPageInArray=function(b,p){var f=false;b.forEach(function(A){if(p===A){f=true;}});return f;};return a;},true);
