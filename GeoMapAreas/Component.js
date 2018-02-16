jQuery.sap.declare("sap.ui.vbm.sample.AnalyticMapCharts.Component");

sap.ui.core.UIComponent.extend("sap.ui.vbm.sample.AnalyticMapCharts.Component", {

	metadata : {
		rootView : "content.V",
		dependencies : {
			libs : [
				"sap.m"
			]
		},
		config : {
			sample : {
                stretch : true,
				files : [
					"V.view.xml",
					"C.controller.js",
					"Data.json"
				]
			}
		}
	}
});