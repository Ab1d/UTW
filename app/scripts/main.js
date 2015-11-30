$( document ).ready(function() {
 $(".annotate").hide();
});
function dragStart(ev) {
  ev.dataTransfer.effectAllowed='move';
  ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
  ev.dataTransfer.setDragImage(ev.target,0,0);
  if(ev.target.getAttribute('id')=="drag2" || ev.target.getAttribute('id')=="drag3"){
    $('.ph, .dc, .type, .default').hide();
  }else {
    $('.ph, .dc, .type, .default').show();
  }
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
    item ["myId"] = $(this).attr("id");
    item ["xPos"] = left;
    item ["yPos"] = right;
    item ["lable"] =lable;
    item ["palceholder"] = palceholder;
    item ["description"] = description;
    item ["selectedType"] = selectedType;
    item ["selectedDefault"] = selectedDefault;
    item ["mandatoryCheck"] = mandatoryCheck;
    item ["sampleData"] = sampleData;
    alert("saved");
    console.log("mandatory check :"+ mandatoryCheck);
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
    $('#'+jsonObj[i].myId).css("margin","0 auto");
    $('#'+jsonObj[i].myId).css("border","solid 1px orange");
  }
}
function editItem(){
  for(var i in jsonObj){
    item["lable"] =  $(".lable").val(jsonObj[i].lable);
    item["placeholder"] =  $(".placeholder").val(jsonObj[i].placeholder);
    item["description"] = $(".descrptn").val(jsonObj[i].descrptn);
    item["selectedType"] =  $(".dropdown-type :selected").text(jsonObj[i].selectedType);
    item["selectedDefault"] =  $(".dropdown-default :selected").text(jsonObj[i].selectedDefault);
    item["sampleData"]  $(".sampledata").val(jsonObj[i].sampleData);
    jsonObj.push(item);
    alert("successfully updated !!");
  }
}
function deleteForm(){
 for(var i in jsonObj){
  delete jsonObj[i];
}
alert("deleted successfully !!");
console.log(jsonObj);
}
function generateHtml(){
  for(var i in jsonObj){
    $('#htmlform').html('<lable>'+jsonObj[i].lable+'</lable>'+
      '<input value='jsonObj[i].sampleData'/>');
  }
}
