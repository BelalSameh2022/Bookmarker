let siteName = document.getElementById("bookmarkName");
let siteURL = document.getElementById("bookmarkURL");
let submitBtn = document.getElementById("submitBtn");
let searchInput = document.getElementById("searchInput");
let tableContent = document.getElementById("tableContent");
let updateBtns;
let visitBtns;
let deleteBtns;
let closeBtn = document.getElementById("closeBtn");
let boxModal = document.querySelector(".box-info");
let bookmarks = [];
let websiteIndex = 0;

if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    for (let i = 0; i < bookmarks.length; i++) {
        displayBookmark(i);
    }
}

// =====> Display function

function displayBookmark(indexOfWebsite) {
    let bookmark =
        `<tr>
            <td>${indexOfWebsite + 1}</td>
            <td>${bookmarks[indexOfWebsite].siteName}</td> 
            <td>
            <button class="btn btn-update" data-index="${indexOfWebsite}">
            <i class="fa-solid fa-pen-to-square pe-2"></i>Update
            </button>
            </td>             
            <td>
            <button class="btn btn-visit" data-index="${indexOfWebsite}">
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
            </td>
            <td>
            <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
            </td>
        </tr>`;
    tableContent.innerHTML += bookmark;


    // =====> Adding click event to all update buttons every time a new bookmark being added

    updateBtns = document.querySelectorAll(".btn-update");
    if (updateBtns) {
        for (let i = 0; i < updateBtns.length; i++) {
            updateBtns[i].addEventListener("click", function (e) {
                updateBookmark(e);
            });
        }
    }

    // =====> Adding click event to all visit buttons every time a new bookmark being added

    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
        for (let i = 0; i < visitBtns.length; i++) {
            visitBtns[i].addEventListener("click", function (e) {
                visitWebsite(e);
            });
        }
    }

    // =====> Adding click event to all delete buttons every time a new bookmark being added

    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", function (e) {
                deleteBookmark(e);
            });
        }
    }
}


// =====> Search function 

function search(searchValue) {
    let temp = '';
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].siteName.toLowerCase().includes(searchValue)) {
            temp += `<tr>
                        <td>${i + 1}</td>
                        <td>${bookmarks[i].siteName}</td>
                        <td>
                        <button class="btn btn-update" data-index="${i}">
                        <i class="fa-solid fa-pen-to-square pe-2"></i>Update
                        </button>
                        </td>             
                        <td>
                        <button class="btn btn-visit" data-index="${i}">
                            <i class="fa-solid fa-eye pe-2"></i>Visit
                        </button>
                        </td>
                        <td> 
                        <button class="btn btn-delete pe-2" data-index="${i}">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                        </button>
                        </td>
                    </tr>`;
        }
    }
    tableContent.innerHTML = temp;

    // =====> Adding Click Event to All update buttons every time a new bookmark being added

    updateBtns = document.querySelectorAll(".btn-update");
    if (updateBtns) {
        for (let i = 0; i < updateBtns.length; i++) {
            updateBtns[i].addEventListener("click", function (e) {
                updateBookmark(e);
            });
        }
    }

    // =====> Adding Click Event to All delete buttons every time a new bookmark being added

    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", function (e) {
                deleteBookmark(e);
            });
        }
    }

    // =====> Adding Click Event to All visit buttons every time a new bookmark being added

    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
        for (let i = 0; i < visitBtns.length; i++) {
            visitBtns[i].addEventListener("click", function (e) {
                visitWebsite(e);
            });
        }
    }
}

searchInput.addEventListener("input", function (e) {
    search(e.target.value);
})

// =====> Clear input function

function clearInput() {
    siteName.value = "";
    siteURL.value = "";
}

// =====> Capitalize function 

function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

// =====> Submit function

function submition() {
    if (
        siteName.classList.contains("is-valid") &&
        siteURL.classList.contains("is-valid")
    ) {
        let bookmark = {
            siteName: capitalize(siteName.value),
            siteURL: siteURL.value,
        };
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
        displayBookmark(bookmarks.length - 1);
        clearInput();
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
    } else {
        boxModal.classList.remove("d-none");
    }
}

submitBtn.addEventListener("click", function () {
    if (submitBtn.innerHTML == "Submit") {
        submition();
    } else {
        update(websiteIndex);
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        if (submitBtn.innerHTML == "Submit") {
            submition();
        } else {
            update(websiteIndex);
        }
    }
});

// =====> Update Function

function update(index) {
    if (siteName.classList.contains("is-valid") &&
        siteURL.classList.contains("is-valid")) {

        let updatedBookmark = {
            siteName: capitalize(siteName.value),
            siteURL: siteURL.value
        };

        tableContent.innerHTML = "";
        bookmarks.splice(index, 1, updatedBookmark);
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
        console.log(bookmarks);
        for (let i = 0; i < bookmarks.length; i++) {
            displayBookmark(i);
        }
        clearInput();
        submitBtn.innerHTML = "Submit";
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
    } else {
        boxModal.classList.remove("d-none");
    }
}

function updateBookmark(e) {
    websiteIndex = e.target.dataset.index;
    console.log(websiteIndex);
    siteName.value = bookmarks[websiteIndex].siteName;
    siteURL.value = bookmarks[websiteIndex].siteURL;
    submitBtn.innerHTML = "Update";
    siteName.classList.add("is-valid");
    siteURL.classList.add("is-valid");
}


// =====> Visit Function

function visitWebsite(e) {
    let websiteIndex = e.target.dataset.index;
    let httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
        open(bookmarks[websiteIndex].siteURL);
    } else {
        open(`https://${bookmarks[websiteIndex].siteURL}`);
    }
}

// =====> Delete Function

function deleteBookmark(e) {
    tableContent.innerHTML = "";
    let deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (let k = 0; k < bookmarks.length; k++) {
        displayBookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}


// =====> Validation

let nameRegex = /^\w{3,}(\s+\w+)*$/;
let urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
    validate(siteURL, urlRegex);
});

function validate(element, regex) {
    let testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

// =====> Close modal function

function closeModal() {
    boxModal.classList.add("d-none");
}

// 3 ways to close modal => close button -  Escape key - clicking outside the modal

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
    }
});

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("box-info")) {
        closeModal();
    }
});