sap.ui.controller("demofileupload.FileUpload", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }
          doFileUpload : function(oEvent)
          {
                    var url = "../Services/BatchFileUpload.xsjs";
                    var fileLoader = sap.ui.getCore().byId("FileLoader");
                      var fileName = fileLoader.getValue();
                      if (fileName == "" )
                        {
                                jQuery.sap.require("sap.ui.commons.MessageBox");
                                sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
                      }
                      else
                      {
                          url = url+"?file_name="+fileName;
                          fileLoader.setUploadUrl(url);
                          fileLoader.upload();
                      }
          },
          doFileLoadComplete : function(oEvent)
          {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    var sResponse = oEvent.getParameter("response");
                    sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
                    sap.ui.getCore().byId("BatchTable").getModel().refresh();
          },
          doFileUpload2 : function(oEvent)
          {
                    var fileLoader = sap.ui.getCore().byId("FileLoader");
                    var fileName = fileLoader.getValue();
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                      if (fileName == "" )
                        {
                                sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
                      }
                      else
                      {
                                var uploadUrl = "../Services/BatchFileUpload.xsjs?file_name="+fileName;
                                var formEle = jQuery.sap.domById("FileLoader");
                          var form = $(formEle).find("form")[0] ;
                                var fd = new FormData(form);  
                                $.ajax({
                                          url: uploadUrl,
                                          type: "GET",
                                          beforeSend: function(xhr)
                                          {
                                                    xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                                          },
                                          success: function(data, textStatus, XMLHttpRequest) {
                                                    var token = XMLHttpRequest.getResponseHeader('X-CSRF-Token');
                                                    $.ajax({
                                                              url: uploadUrl,
                                                              type: "POST",
                                                              processData :false ,
                                                                contentType: false ,
                                                                data:fd,
                                                              beforeSend: function(xhr)
                                                              {
                                                                        xhr.setRequestHeader("X-CSRF-Token", token);
                                                              },
                                                              success: function(data, textStatus, XMLHttpRequest)
                                                              {
                                                                        var resptext = XMLHttpRequest.responseText;
                                                                        jQuery.sap.require("sap.ui.commons.MessageBox");
                                                                        sap.ui.commons.MessageBox.show(resptext, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
                                                                        sap.ui.getCore().byId("BatchTable").getModel().refresh();
                                                              },
                                                              error: function(data, textStatus, XMLHttpRequest)
                                                              {
                                                                        sap.ui.commons.MessageBox.show("File could not be uploaded.", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
                                                              }
                                                    });
                                          }} ) ;
                      }
          }
});
