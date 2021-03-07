sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";
	new ComponentContainer({
		name: "mystore",
		settings : {
			id : "Agenda"
		},
		async: true
	}).placeAt("content");
});