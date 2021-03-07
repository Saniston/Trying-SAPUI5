sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
 ], function (Controller,MessageToast,JSONModel) {
    "use strict";
    return Controller.extend("mystore.controller.App", {
        //método que imprime na tela a mensagem do botao
        onShowHello : function (){
           // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("Hello ", [sRecipient]);
            // mostra no balão o que foi inserido
            MessageToast.show(sMsg);
        },
        //método de gravar dados do contato
        onSaveContact : function (){
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var entity = this.onFields();
            var validating = true;
            if(entity.Name == "")
                validating = false;
            if(entity.Address == "")
                validating = false;
            if(entity.Phone == "")
                validating = false;
            if(entity.Email == "")
                validating = false;
            if(validating){
                MessageToast.show("Salvo com sucesso!");
                var sMsg = oBundle.getText("insertedContact", [entity.Name,entity.Email, entity.Address, entity.Phone]);
                var concat = this.byId("Screen").getValue();
                this.byId("Screen").setValue(concat+sMsg+"\n");
                //this.onSubmit(entity);
                this.onRequestGet();
            }else{
                MessageToast.show("Falha ao salvar!");
            }
            return entity;
        },
        onSubmit : function (entt){
            $.ajax({
                url: "http://localhost:59888/v1/add",
                method: "POST",
                data: entt,
                dataType: "json"
            }).success((data)=>{
                //let oJsonResult = new Object({ CountBillOfExchange: data.length, BillOfExchanges: data });
                //view.setModel(new JSONModel(oJsonResult));
                //busyIndicatorMessage.close();
                console.log(data);
            }).error((error) => 
            {
                //MessageBox.error(error.responseText);
                //busyIndicatorMessage.close();
                console.log(error);
            });
        },
        onRequestGet : function () {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            $.ajax({
                method: "GET",
                dataType: "json",
                url: "http://localhost:59888/v1",
                success: function(){
                    this.byId("Screen").setValue(concat+sMsg+"\n");
                }
            });
            
        },
        onFields : function (){
            var name = this.byId("Name").getValue();
            var email = this.byId("Email").getValue();
            var phone = this.byId("Phone").getValue();
            var address = this.byId("Address").getValue();
            //validação
            var entityC = {Name:name, Email:email, Address:address,Phone:phone};
            return entityC;
        },
        //limpar campos
        onClearFields : function(){
            this.byId("Name").setValue("");
            this.byId("Email").setValue("");
            this.byId("Phone").setValue("");
            this.byId("Address").setValue("");
            this.byId("Screen").setValue("");
        }
        
     });
 });