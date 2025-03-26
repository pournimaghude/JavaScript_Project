// ---- fetching users data ---- 

let fetchData = async () => {
    let d = await window.fetch(`http://localhost:3000/User`);
    let fd = await d.json();
    let tbody = document.querySelector("tbody");
    fd.forEach((v, i) => {
        let { id, username, name, phone, email } = v;
        tbody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${username}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>
                    <button onclick="getData(event, ${id})">Read</button>
                    <button onclick="updateData(${id})">Update</button>
                    <button onclick="deleteData(${id})">Delete</button>
                </td>
            </tr>
        `;
    });
};
fetchData();

////---- display and hide Add users form ----

let d1 = document.querySelector(".form-container-add");
let s1 = document.querySelector(".add-user");
let closeBtn = document.querySelector(".fa-x");

s1.addEventListener("click", (e) => (d1.style.display = "block"));

closeBtn.addEventListener("click", (e) => (d1.style.display = "none"));



// ------- Add the user data into the table--------

let addUserForm = document.querySelector(".add-user-data");
addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(addUserForm));
    try {
        await window.fetch(`http://localhost:3000/User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        window.location.reload();
    } catch (error) {
        console.log("err");
    }
});

// --------Read the Data ------------

var displayData = document.querySelector(".display-data");

let getData = async (e, id) => {
    try {
        let d = await fetch(`http://localhost:3000/User/${id}`);
        let { id: uid, username, name, email, phone } = await d.json();
        displayData.innerHTML = `
        <i class="fa-solid fa-x"></i>
        <div class="sub-display">
        <h1>USER DETALS</h1>
        <h2>id: ${id}</h2>
        <h2>name: ${name}</h2>
        <p>username: ${username}</p>
        <p>email : ${email}</p>
        <p>phone : ${phone}</p>
        </div>
        `;
    } catch (error) {
        console.log("error");
    }
};

// show and hide he update form: 

let containerUpdate = document.querySelector(".form-container-update");
let closeBtn2 = document.querySelector(".close-btn");

let updateForm = document.querySelector("#update-form");

let updateName = document.querySelector("#update-name");
let updateUsername = document.querySelector("#update-username");
let updateEmail = document.querySelector("#update-email");
let updatePhone = document.querySelector("#update-phone");

let updateData = async (id) => {
    try {
        containerUpdate.style.display = "block";
        let data = await fetch(`http://localhost:3000/User/${id}`);
        let { name, id: uid, email, phone, username } = await data.json();
        updateName.value = name;
        updateEmail.value = email;
        updatePhone.value = phone;
        updateUsername.value = username;

        updateForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            let FormDataValue = Object.fromEntries(new FormData(updateForm));
            try {
                await window.fetch(`http://localhost:3000/User/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(FormDataValue),
                });
                window.location.reload();
            } catch (error) {
                console.log("error");
            }
        });
    } catch (error) {
        console.log("error");
    }
};
closeBtn2.addEventListener("click", async (e) => {
    containerUpdate.style.display = "none;"
});

// deleteData:

let deleteData = async (id) => {

    let confirmMessage = window.confirm("Are you sure? Do You want to delete?");
    if (confirmMessage) {
        await window.fetch(`http://localhost:3000/User/${id}`, {
            method: "DELETE",
        });
        window.location.reload();
    }
};

