 function dragStart(ev) {
            ev.dataTransfer.effectAllowed='move';
            ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
            ev.dataTransfer.setDragImage(ev.target,0,0);
            return true;
         }

 function dragEnter(ev) {
            ev.preventDefault();
            return true;
         }

 function dragOver(ev) {
            ev.preventDefault();
            return false;
         }

 var dynamicId = 0;
 var left=0;
 var right= 0;
 function dragDrop(ev) {
            var src = ev.dataTransfer.getData("Text");
            var nodeCopy = document.getElementById(src).cloneNode(true);
            dynamicId++;
            nodeCopy.id = dynamicId;
            ev.target.appendChild(nodeCopy);
            left = ev.offsetX + "px";
            right = ev.offsetY+"px";
            $("#" + dynamicId).css("position","absolute");
            $("#" + dynamicId).css("left",left);
            $("#" + dynamicId).css("top",right);
            $("#" + dynamicId).removeProp("draggable");
            ev.stopPropagation();
            $(".annotate").show();
            return false;
         }
 $( document ).ready(function() {
 $(".annotate").hide();
});

var jsonObj = [];
function createJSON() {
        $('#'+dynamicId).each(function() {
        var lable = $(".lable").val();
        var palceholder = $(".placeholder").val();
        var description = $(".descrptn").val();
        var selectedType =  $(".dropdown-type :selected").text();
        var selectedDefault = $(".dropdown-default :selected").text();
        var sampleData = $(".sampledata").val();
        var mandatoryCheck = $(".mancheck").is(':checked');
        var item = {}
        item ["myId"] = dynamicId;
        item ["xPos"] = left;
        item ["yPos"] = right;
        item ["lable"] =lable;
        item ["palceholder"] = palceholder;
        item ["description"] = description;
        item ["selectedType"] = selectedType;
        item ["selectedDefault"] = selectedDefault;
        item ["mandatoryCheck"] = mandatoryCheck;
        item ["sampleData"] = sampleData;

        alert("mandatory check :"+ mandatoryCheck);
        jsonObj.push(item);
    });

    console.log(jsonObj);
}
function getItems(){
for(var i in jsonObj){
var data = $('#'+jsonObj[i].myId).replaceWith('<h4 id='+jsonObj[i].myId+'>'+jsonObj[i].sampleData+'</h4>');
$('#'+jsonObj[i].myId).css("position","absolute");
$('#'+jsonObj[i].myId).css("left",jsonObj[i].xPos);
$('#'+jsonObj[i].myId).css("top",jsonObj[i].yPos);
$('#'+jsonObj[i].myId).css("color", "orange");
}
}


