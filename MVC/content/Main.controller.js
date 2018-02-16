sap.ui.controller("content.Main", { 
    onInit: function() {
        },
onExit: function() {
// this function is called when the view is destroyed.
// Used for clean-up activities
},
onAfterRendering: function() {
// this function is called when the view has been rendered.
// Used for post-rendering manipulation of the HTML code
},
onBeforeRendering: function() {
// this function is called before the view is re-rendered // (not before first rendering)
},
changeText : function(onkeydown) {
// get the button control from the event
var oDropdownBox = onkeydown.getSource();
// change the button's text
oDropdownBox.setText("Christmas");
// change the button's text

}
});