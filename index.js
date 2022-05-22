var all_needs = ["Gluten free", "Lactose free", "Corn free", "Egg free", "Fish free", "Mollusc free", "Nuts free", "Peanuts free", "Shellfish free", "Soy free", "Vegan"].sort()
function loadLocalStorage() {
    var final;
    var top = []
    var bottom = []
    var div = document.getElementById("needs")
    if (typeof (localStorage.needs) == "undefined") {
        final = all_needs
    }
    else {
        var checked = JSON.parse(localStorage.needs).sort()

        for (var i = 0; i < all_needs.length; i++) {
            if (checked.includes(all_needs[i])) {
                top.push(all_needs[i])
            }
            else {
                bottom.push(all_needs[i])
            }
        }
        top.sort()
        bottom.sort()
        final = top.concat(bottom)
    }
    for (var i = 0; i < final.length; i++) {
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")

        var col = document.createElement('div')
        col.classList.add("col-12")
        col.classList.add("py-2")
        col.classList.add("display-6")

        var input = document.createElement('input')
        input.classList.add("form-check-input")
        input.classList.add("mt-1")
        input.onclick = function () {
            document.getElementById("saveButton").classList.remove("disabled");
        }
        input.type = "checkbox"
        input.name = final[i]
        input.id = final[i]
        if (i < top.length) {
            input.checked = true
        }

        var label = document.createElement('label')
        label.classList.add("mx-3")
        label.setAttribute("for", final[i])
        label.innerHTML = final[i]

        col.appendChild(input)
        col.appendChild(label)

        row.appendChild(col)

        div.appendChild(row)
    }

}

function uncheckAll() {
    var div = document.getElementById("needs").getElementsByTagName("input")
    for (var i = 0; i < div.length; i++) {
        div[i].checked = false;
    }
}

function getLocalStorage() {
    var div = document.getElementById("needs")

    if (typeof (localStorage.needs) == "undefined") {
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


    if (checked.length == 0) {
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

    for (var i = 0; i < checked.length; i++) {
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")

        var col_img = document.createElement("div")
        col_img.classList.add("col-4")
        var img = document.createElement("img")
        img.classList.add("m-auto")
        img.classList.add("d-block")
        img.classList.add("mw-100")
        img.src = "icons/" + checked[i] + ".png"
        col_img.appendChild(img)

        var col_text = document.createElement('div')
        col_text.classList.add("col-8")
        col_text.classList.add("py-4")
        col_text.classList.add("display-6")
        col_text.classList.add("mb-1")
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
        }
    }
    localStorage.needs = JSON.stringify(checked)
}


var videoElement = document.querySelector('video');

function openCamera() {
    document.getElementById("video").removeAttribute("hidden");
    document.getElementById('faq').style.visibility = ""
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
    setTimeout(resultScan, timeout);
}


function handleError(error) {
    console.error('Error: ', error);
}

var Flora;
var FloraIng;
var Rana;
var RanaIng;
var Unk;
var timeout = 1000;

function createModals() {
    Flora = new bootstrap.Modal(document.getElementById('flora'))
    FloraIng = new bootstrap.Modal(document.getElementById('floraIngredientsModal'));
    Rana = new bootstrap.Modal(document.getElementById('tortellini'));
    RanaIng = new bootstrap.Modal(document.getElementById('tortelliniIngredientsModal'));
    Unk = new bootstrap.Modal(document.getElementById('unknown'));
}

function resultScan() {
    videoElement.pause()
    Flora.show()
}

function showIngredientsFlora() {
    Flora.hide()
    FloraIng.show()
}

function secondScan() {
    Flora.hide()
    FloraIng.hide()
    videoElement.play()
    setTimeout(function () {
        videoElement.pause()
        Rana.show()
    }, timeout)
}
function showIngredientsTortellini() {
    Rana.hide()
    RanaIng.show()
}

function thirdScan() {
    Rana.hide()
    RanaIng.hide()
    videoElement.play()
    setTimeout(function () {
        videoElement.pause()
        Unk.show()
    }, timeout)
}

function lastScan() {
    Unk.hide()
    videoElement.play()
}

function modalLegend() {

    var Legend = new bootstrap.Modal(document.getElementById('leg'))
    Legend.show()
}

var globalLocation;
function activatePopover(location) {
    globalLocation = location
    var selector = "#" + location
    var pop = bootstrap.Popover.getInstance(selector)
    if (location == "edit") {
        pop.setContent({
            '.popover-body': 'Tap here to edit you dietary needs. They will be used to check the products you scan and to filter restaurants menus'
        })
    }
    else if (location == "pop") {
        pop.setContent({
            '.popover-body': 'Put the barcode of the product inside this frame'
        })
    }
    else if (location == "searchrest") {
        pop.setContent({
            '.popover-body': 'Tap here to search for a restaurant based on the chosen filters and view its filtered menu according to your dietary needs'
        })
    }

    pop.show()
    setTimeout(function () {
        document.body.addEventListener("click", disablePopover)
    }, 50)
}

function disablePopover() {
    var selector = "#" + globalLocation
    var pop = bootstrap.Popover.getInstance(selector)
    pop.hide()
    setTimeout(function () {
        document.body.removeEventListener("click", disablePopover)
    }, 50)
}