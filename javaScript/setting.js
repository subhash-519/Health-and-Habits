export function initSetting() {


    function show() {
        let profileDb = JSON.parse(localStorage.getItem("profileDb"));
        if (profileDb) {
            const firstName = document.getElementById("firstName");
            const lastName = document.getElementById("lastName");
            const dob = document.getElementById("dobDate");
            const gender = document.getElementById("inpGender");
            const email = document.getElementById("email");
            const bio = document.getElementById("bioDetail");
            const contact = document.getElementById("contactNo");

            firstName.value = profileDb.firstName;
            lastName.value = profileDb.lastName;
            dob.value = profileDb.dob;
            gender.value = profileDb.gender;
            email.value = profileDb.email;
            bio.value = profileDb.bio;
            contact.value = profileDb.contact;

            console.log("if");
        }
        else {
            const firstName = document.getElementById("firstName");
            const lastName = document.getElementById("lastName");
            const dob = document.getElementById("dobDate");
            const gender = document.getElementById("inpGender");
            const email = document.getElementById("email");
            const bio = document.getElementById("bioDetail");
            const contact = document.getElementById("contactNo");
            firstName.value = "";
            lastName.value = "";
            dob.value = "";
            gender.value = "Male";
            email.value = "";
            bio.value = "";
            contact.value = "";
            console.log("else ");
        }
    }
    show();

    console.log("show call hua");
    const profileForm = document.querySelector(".form");
    const cancelBtn = document.querySelector("#btn-cancel");

    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const profileData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            dob: document.getElementById("dobDate").value,
            gender: document.getElementById("inpGender").value,
            email: document.getElementById("email").value,
            bio: document.getElementById("bioDetail").value,
            contact: document.getElementById("contactNo").value
        };
        localStorage.setItem("profileDb", JSON.stringify(profileData));
        const greeting = document.getElementById("greeting");
        greeting.textContent = "Welcome " + document.getElementById("firstName").value + " "+document.getElementById("lastName").value +" .";
        alert("succsfully SAVED");
        alert("succsfully SAVED");
    });



    cancelBtn.addEventListener("click", () => {
        show();
    });


}