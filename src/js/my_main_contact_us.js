function S(id) { return document.getElementById(id); }

function validateForm() {
    var EM = ""; // Error Message
    if (S("FnameInput").value.length < 5) {
        EM = "First name should be at least 5 characters";
    } else if (S("LnameInput").value.length < 5) {
        EM = "Last name should be at least 5 characters";
    } else if (!S("EmailInput").value.includes("@")) {
        EM = "Email should contain the domain name (with ‘@’)"
    } else if (S("DateInput").value === "") {
        EM = "Select Date"
    } else if (S("PhoneNumberInput").value.length !== 10) {
        EM = "Phone must contain 10 digits.";
    } else if (S("MessageInput").value.length < 50) {
        EM = "Message must be of at least 50 alphabets. ";
    }

    S("ErrorDisplay").innerText = EM;

    if (EM === "") { return true; } else { return false; }
}


var form = document.getElementById("MainForm");

async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }
    var status = document.getElementById("MainFormStatus");
    var data = new FormData(event.target);

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form";
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
    });
}

form.addEventListener("submit", handleSubmit);