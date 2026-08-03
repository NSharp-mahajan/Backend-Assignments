var form = document.getElementById("feedbackForm");

var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var courseInput = document.getElementById("course");
var feedbackInput = document.getElementById("feedback");

var deleteBtn = document.getElementById("deleteBtn");

var storedData = document.getElementById("storedData");
var sessionUser = document.getElementById("sessionUser");

function displayData(){

    var data = localStorage.getItem("student");

    if(data==null){

        storedData.innerHTML="No feedback stored.";
    }

    else{

        var student = JSON.parse(data);

        storedData.innerHTML=
        "<p><b>Name:</b> "+student.name+"</p>"+
        "<p><b>Email:</b> "+student.email+"</p>"+
        "<p><b>Course:</b> "+student.course+"</p>"+
        "<p><b>Feedback:</b> "+student.feedback+"</p>";
    }

    var user=sessionStorage.getItem("currentUser");

    if(user==null){

        sessionUser.innerHTML="";
    }

    else{

        sessionUser.innerHTML="Current Session User: "+user;
    }

}

displayData();

nameInput.addEventListener("input",function(){

    document.getElementById("nameError").innerHTML="";
});

emailInput.addEventListener("input",function(){

    document.getElementById("emailError").innerHTML="";
});

courseInput.addEventListener("change",function(){

    document.getElementById("courseError").innerHTML="";
});

feedbackInput.addEventListener("input",function(){

    document.getElementById("feedbackError").innerHTML="";
});

// ---------- Submit ----------

form.addEventListener("submit",function(event){

    event.preventDefault();

    document.getElementById("nameError").innerHTML="";
    document.getElementById("emailError").innerHTML="";
    document.getElementById("courseError").innerHTML="";
    document.getElementById("feedbackError").innerHTML="";

    var name=nameInput.value.trim();
    var email=emailInput.value.trim();
    var course=courseInput.value;
    var feedback=feedbackInput.value.trim();

    var valid=true;

    if(name==""){

        document.getElementById("nameError").innerHTML="Name is required";
        valid=false;
    }

    if(email==""){

        document.getElementById("emailError").innerHTML="Email is required";
        valid=false;
    }

    else{

        var pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!pattern.test(email)){

            document.getElementById("emailError").innerHTML="Invalid Email";
            valid=false;
        }

    }
    if(course==""){

        document.getElementById("courseError").innerHTML="Select Course";
        valid=false;
    }
    if(feedback==""){

        document.getElementById("feedbackError").innerHTML="Feedback is required";
        valid=false;
    }

    if(valid){
        var student={
            name:name,
            email:email,
            course:course,
            feedback:feedback
        };
        localStorage.setItem("student",JSON.stringify(student));
        sessionStorage.setItem("currentUser",name);
        displayData();
        form.reset();

    }

});
deleteBtn.addEventListener("click",function(){

    localStorage.removeItem("student");

    sessionStorage.removeItem("currentUser");

    displayData();

});