'use strict';



// element toggle function
const elementToggleFunc = function(elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function() {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function() {

        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

        testimonialsModalFunc();

    });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function() { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

// Apply filter based on URL fragment (hash)
const applyFilterFromHash = function() {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, '')).toLowerCase();
    const selectedValue = hash && hash !== '' ? hash : 'all';

    // update select display
    // try to find a button with matching text to preserve casing
    let matchedBtn = null;
    for (let i = 0; i < filterBtn.length; i++) {
        if (filterBtn[i].innerText.trim().toLowerCase() === selectedValue) {
            matchedBtn = filterBtn[i];
            break;
        }
    }

    if (matchedBtn) {
        selectValue.innerText = matchedBtn.innerText;
    } else {
        // fallback: capitalize first letter
        selectValue.innerText = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
    }

    // run filter and update active button state
    filterFunc(selectedValue);

    // update active classes on buttons
    if (matchedBtn) {
        // remove active from previous
        for (let i = 0; i < filterBtn.length; i++) {
            filterBtn[i].classList.remove('active');
        }
        matchedBtn.classList.add('active');
        lastClickedBtn = matchedBtn;
    } else {
        // if no match, clear active except 'All' if present
        for (let i = 0; i < filterBtn.length; i++) {
            if (filterBtn[i].innerText.trim().toLowerCase() === 'all') {
                filterBtn[i].classList.add('active');
                lastClickedBtn = filterBtn[i];
            } else {
                filterBtn[i].classList.remove('active');
            }
        }
    }
};

// handle hash changes (back/forward/shareable URLs)
window.addEventListener('hashchange', applyFilterFromHash);

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function(selectedValue) {

    for (let i = 0; i < filterItems.length; i++) {
        const dataCat = filterItems[i].dataset.category ? filterItems[i].dataset.category.toLowerCase() : "";
        const categories = dataCat.split(" ");

        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (
            dataCat === selectedValue ||
            categories.includes(selectedValue)
        ) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function() {

        let selectedValue = this.innerText.toLowerCase();
        // update the URL hash which triggers applyFilterFromHash via hashchange
        // encode to handle spaces/special chars
        window.location.hash = encodeURIComponent(selectedValue);

    });

}

// Apply filter once on load (respect any existing hash)
applyFilterFromHash();



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function() {

        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }

    });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function() {

        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
                pages[i].classList.add("active");
                navigationLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove("active");
                navigationLinks[i].classList.remove("active");
            }
        }

    });
}