/*
**  eleyf
**  3/15/18
**  cs290 w2018
**  HW Assignment - DB Interactions and UI
*/

//Create initial table body on load
document.addEventListener("DOMContentLoaded", function(){
    createTableBody();
});

// Delete row function
function deleteRow(actionDataCell){
	var currentRow = actionDataCell.parentNode.parentNode;
	var currentId = currentRow.firstChild.innerHTML

    var req = new XMLHttpRequest();
    var payload = {rowId: null};
    payload.rowId = currentId;
    req.open("POST", "/delete", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            createTableBody();
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Edit row function
function editRow(actionDataCell){
	var currentRow = actionDataCell.parentNode.parentNode;
	var currentId = currentRow.firstChild.innerHTML

	window.location.href = "/edit?id=" + currentId;
}

// Create table function
function createTableBody(){
    var req = new XMLHttpRequest();
    req.open("GET", "/table-data", true);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var tableBody = document.getElementById("tableBodyId");

            //clear table body
            while(tableBody.hasChildNodes()){
            	tableBody.removeChild(tableBody.childNodes[0]);
            }

            //create new table body
            for (i in response) {
        	    var dataRow = document.createElement("tr");

	    			var idCell = document.createElement("td");
					idCell.textContent = response[i].id;
	    			idCell.setAttribute("class", "hiddenId");
					dataRow.appendChild(idCell);

	    			var nameCell = document.createElement("td");
					nameCell.textContent = response[i].name;
					dataRow.appendChild(nameCell);

	    			var repsCell = document.createElement("td");
					repsCell.textContent = response[i].reps;
					dataRow.appendChild(repsCell);

	    			var weightCell = document.createElement("td");
					weightCell.textContent = response[i].weight;
					dataRow.appendChild(weightCell);

	    			var dateCell = document.createElement("td");
					dateCell.textContent = response[i].date;
					dataRow.appendChild(dateCell);

	    			var unitCell = document.createElement("td");
	    			if (response[i].lbs == 0){
	    				unitCell.textContent = "Lbs";
	    			}else{
	    				unitCell.textContent = "Kg";
	    			}
					dataRow.appendChild(unitCell);

	    			var actionCell = document.createElement("td");

						// edit button in action cell
						var editButton = document.createElement("INPUT");
						editButton.setAttribute("type", "button");
		    			editButton.setAttribute("value", "Edit");
		    			editButton.setAttribute("class", "btn btn-info");
		    			editButton.setAttribute("style", "margin-right: 15px");

		    			editButton.onclick = function() {editRow(this)};
						actionCell.appendChild(editButton);

		    			// delete button in action cell
						var deleteButton = document.createElement("INPUT");
						deleteButton.setAttribute("type", "button");
		    			deleteButton.setAttribute("value", "Delete");
		    			deleteButton.setAttribute("class", "btn btn-danger");
		    			deleteButton.onclick = function() {deleteRow(this)};
						actionCell.appendChild(deleteButton);



					dataRow.appendChild(actionCell);

				tableBody.appendChild(dataRow);		
    		}
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
}

// Insert new exercise button
document.getElementById("newExerciseSubmitId").addEventListener("click", function (event) {

	if (document.getElementById("exerciseNameId").value == ""){
		alert("Exercise name is required to add to table.");
	}else{
	    var req = new XMLHttpRequest();
	    var payload = {exerciseName: null, reps: null, weight: null, date: null, lbs: null};
	    payload.exerciseName = document.getElementById("exerciseNameId").value;
	    payload.reps = document.getElementById("repsId").value;
	    payload.weight = document.getElementById("weightId").value;
	    payload.date = document.getElementById("dateId").value;
	    payload.lbs = document.getElementById("lbsId").value;
	    req.open("POST", "/insert", true);
	    req.setRequestHeader("Content-Type", "application/json");
	    req.addEventListener('load', function () {
	        if (req.status >= 200 && req.status < 400) {
	            createTableBody();
	        } else {
	            console.log("Error in network request: " + req.statusText);
	        }
	    });
	    req.send(JSON.stringify(payload));
	}
    event.preventDefault();
})







