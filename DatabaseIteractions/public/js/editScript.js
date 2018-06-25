/*
**  eleyf
**  3/15/18
**  cs290 w2018
**  HW Assignment - DB Interactions and UI
*/

// Edit exercise button
document.getElementById("editExerciseSubmitId").addEventListener("click", function (event) {

    if (document.getElementById("editExerciseNameId").value == ""){
        alert("Exercise name is required to edit the row.");
    }else{
        var req = new XMLHttpRequest();
        var payload = {id: null, exerciseName: null, reps: null, weight: null, date: null, lbs: null};
        payload.id = document.getElementById("ID").value;
        payload.exerciseName = document.getElementById("editExerciseNameId").value;
        payload.reps = document.getElementById("editRepsId").value;
        payload.weight = document.getElementById("editWeightId").value;
        payload.date = document.getElementById("editDateId").value;
        payload.lbs = document.getElementById("editLbsId").value;
        req.open("POST", "/update", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                window.location.href = "/";
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(JSON.stringify(payload));
    }
    event.preventDefault();
})







