function loadLocalStorage(){
    if(typeof(localStorage.needs) == "undefined"){
        return
    }
    var checked = JSON.parse(localStorage.needs).sort().reverse()
    // console.log(checked)
    var div = document.getElementById("needs")
    var children = div.children
   var top = []
    console.log(div)
    for(var i = children.length-1; i > 0; i--){
        console.log(children[i])
        if(checked.includes(children[i].firstElementChild.firstElementChild.name)){
            children[i].firstElementChild.firstElementChild.checked = true;
            var removed = div.removeChild(children[i])
            top.push(removed)
            div.insertBefore(removed, div.firstChild)
            console.log(removed)
        }
    }
    console.log(top)
}

function uncheckAll(){
    var div = document.getElementById("needs").getElementsByTagName("input")
    for(var i = 0; i<div.length; i++){
        div[i].checked = false;
    }
}

function getLocalStorage(){
    var div = document.getElementById("needs")

    if(typeof(localStorage.needs) == "undefined"){
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")
        
        var col_text = document.createElement('div')
        col_text.classList.add("col-12")
        col_text.classList.add("py-4")
        col_text.classList.add("display-4")
        col_text.classList.add("text-center")
        col_text.classList.add("text-muted")
        col_text.innerHTML = "Add your needs"

        row.appendChild(col_text)
        div.appendChild(row)

        document.getElementById("edit").innerHTML = "Add your needs"
        return
    }

    var checked = JSON.parse(localStorage.needs)


    if(checked.length == 0){
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")
        
        var col_text = document.createElement('div')
        col_text.classList.add("col-12")
        col_text.classList.add("py-4")
        col_text.classList.add("display-4")
        col_text.classList.add("text-center")
        col_text.classList.add("text-muted")
        col_text.innerHTML = "Add your needs"

        row.appendChild(col_text)
        div.appendChild(row)

        document.getElementById("edit").innerHTML = "Add your needs"
        return
    }

    for(var i=0; i<checked.length; i++){
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")

        var col_img = document.createElement("div")
        col_img.classList.add("col-4")
        var img = document.createElement("img")
        img.classList.add("m-auto")
        img.classList.add("d-block")
        img.classList.add("mw-100")
        img.src= "icons/"+ checked[i] + ".png"
        col_img.appendChild(img)

        var col_text = document.createElement('div')
        col_text.classList.add("col-8")
        col_text.classList.add("py-4")
        col_text.classList.add("display-4")
        col_text.innerHTML = checked[i]

        row.appendChild(col_img)
        row.appendChild(col_text)

        div.appendChild(row)
    }
}

function saveLocalStorage() {
    var div = document.getElementById("needs").getElementsByTagName("input")
    var checked = [];
    for (var i = 0; i < div.length; i++) {
        if (div[i].checked) {
            checked.push(div[i].name)
            // console.log(div[i].name)
        }
    }
    localStorage.needs = JSON.stringify(checked)
    // console.log(checked)
}


function activateSave(){
    document.getElementById("saveButton").classList.remove("disabled");
}




var videoElement = document.querySelector('video');

function openCamera(){
    document.getElementById("video").removeAttribute("hidden");
    getStream();
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const constraints = {
    video: {
        facingMode: "environment"
    }
  };
  return navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  document.getElementById("divBtnScan").remove();
  var x = document.getElementById("divScanBox");
  x.style.display = "block"
  videoElement.srcObject = stream;
  setTimeout(resultScan, 3000);
}


function handleError(error) {
  console.error('Error: ', error);
}


function resultScan(){
    var myModal = new bootstrap.Modal(document.getElementById('myModal'))
    myModal.show()
}