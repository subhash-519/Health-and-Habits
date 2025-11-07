export function initProfile() {
  let profileDb = JSON.parse(localStorage.getItem("profileDb"));
  if (profileDb) {
    const profileName = document.getElementById("profileName");

    const firstName = profileDb.firstName;
    const lastName = profileDb.lastName;

    const Name = firstName + " " + lastName;
    profileName.textContent = Name;

    const avtar = document.getElementById("avtar");
    const avtarName = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    avtar.textContent = avtarName;

    const profilemail = document.getElementById("profilemail");
    profilemail.textContent = profileDb.email;

    const Fname = document.getElementById("Fname");
    Fname.textContent = firstName;

    const Lname = document.getElementById("Lname");
    Lname.textContent = lastName;

    const aboutText = document.getElementById("aboutText");
    aboutText.textContent = profileDb.bio;

    const dob = document.getElementById("dob");
    dob.textContent = profileDb.dob;

    const gender = document.getElementById("gender");
    gender.textContent = profileDb.gender;

    const mainMail = document.getElementById("mainMail");
    mainMail.textContent = profileDb.email;

    const contactNo = document.getElementById("contactNo");
    contactNo.textContent = profileDb.contact;
  }

const allEditBtn = document.querySelectorAll(".edit-btn");

allEditBtn.forEach((editBtn) => {
  editBtn.addEventListener("click", () => {
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    sidebarLinks.forEach((link) => link.classList.remove("active"));
    const settingsLink = document.querySelector('.sidebar a[data-page="settings"]');
    if (settingsLink) settingsLink.classList.add("active");
    if (typeof loadPage === "function") {
      loadPage("settings");
    } else {
      window.location.href = "settings.html";
    }
  });
});

}
