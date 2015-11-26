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

 function get_pos(ev){
           pos = [ev.pageX, ev.pageY];
           // console.log(pos[0]+"px");
}

            var dynamicId = 0;
 function dragDrop(ev) {
            var src = ev.dataTransfer.getData("Text");
            var nodeCopy = document.getElementById(src).cloneNode(true);
            dynamicId++;
            nodeCopy.id = dynamicId;
            ev.target.appendChild(nodeCopy);
            var left = ev.offsetX + "px";
            var right = ev.offsetY+"px";
            $("#" + dynamicId).css("position","absolute");
            $("#" + dynamicId).css("left",left);
            $("#" + dynamicId).css("top",right);
            ev.stopPropagation();
            $(".annotate").show();
            return false;
         }
 $( document ).ready(function() {
 $(".annotate").hide();
});

var pos;
var jsonObj = [];
function createJSON() {
   var jsonObj = [];
    $('#drag1').each(function() {

        var lable = $(".lable").val();
        var palceholder = $(".placeholder").val();
        var description = $(".descrptn").val();
        var selectedType =  $(".dropdown-type :selected").text();
        var selectedDefault = $(".dropdown-default :selected").text();
        var sampleData = $(".sampledata").val();
        var mandatoryCheck = $(".mancheck").is(':checked');
        var item = {}
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


