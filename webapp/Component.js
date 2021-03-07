sap.ui.define([
    "sap/ui/core/UIComponent","sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], function (UIComponent,JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("mystore.Component", {
        metadata : {
           "rootView": {
              "viewName": "mystore.view.App",
              "type": "XML",
              "async": true,
              "id": "app"
           }
        },
        
       init : function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            var oData = {
               recipient : {
                  name : "Agenda"
               }
            };
            var oModel = new JSONModel(oData);
            //setar omodel na tela
            this.setModel(oModel);

            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName: "mystore.i18n.i18n",
                supportedLocales: [""],
                fallbackLocale: ""
            });
            this.setModel(i18nModel, "i18n");
       }
    });
 });