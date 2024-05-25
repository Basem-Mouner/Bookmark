//=====================================================
//======================CRUDS SYSTEM===================
//================CREATE READ UPDATE DELETE SEARCH=====
//=====================BOOKMARKERS=====================
//====================Assignment[3]====================

{


    var form = document.forms[0];
    var resetButtom = document.querySelector('.reset_button');
    //*********************************************************/
    //select inputs
    var siteName = document.getElementById('SiteName');
    var siteURL = document.getElementById('SiteURL');
    var search_Site = document.getElementById('SearchSite');
    //select element to do some action and events
    var layoutAlert = document.querySelector('.alert-layout');
    var close_icon = document.querySelector('#CLOSE');
    var card = document.querySelector('.card-alert');
    //*********************************************************/

    // productContainer:Array to put anew item added inside it 
    var siteContainer;
    // THIS GLOBAL VAR TO catch idex in product contanier array when do ubdate  and make update at the same index 
    var currentIndex;

    //****************REFRESH CHEACK IF Sites CONTANIER ONTAIN Sites OR NOT*************** 
    //AT REFRESH THE GLOBAL Sites CONTANIER WILL LOADED SO MUST CHECK ON IT 
    if (localStorage.getItem('Bookmark_site') !== null) {
        siteContainer = JSON.parse(localStorage.getItem('Bookmark_site'));
        displaysites(siteContainer);
    } else {
        siteContainer = [];
    }
    //****************REFRESH CHEACK IF Sites CONTANIER ONTAIN Sites OR NOT*************** 

    // ===========================ADD NEW Sites==========================
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addSite();
    });

    function addSite() {

        var newSite = {
                name: siteName.value,
                link: siteURL.value,
            }
            //if{} to checkif inputs valid  but else{} if inputs in-valid
        if (validateInputs(siteName) & validateInputs(siteURL)) {
            //if{} at normal add Sites put else{} when do ubdate operation
            if (document.getElementById('addBtn').innerHTML === 'Submit') {
                siteContainer.push(newSite);
            } else {
                siteContainer.splice(currentIndex, 1, newSite)
                document.getElementById('addBtn').innerHTML = 'Submit';
            }

            console.log('new opject is : ');
            console.log(newSite);
            console.log('Array SitesContainer now  is :');
            console.log(siteContainer);

            //set add effect in local storage
            localStorage.setItem('Bookmark_site', JSON.stringify(siteContainer));
            clearForm();
            //display on document array of Sites contanier which contain objects
            displaysites(siteContainer);


        } else {
            //first display alert 
            layoutAlert.classList.replace('d-none', 'd-flex');
            //secound i can change to d none again py pressing in 3 ways  Esc or x  or body only
            close_icon.addEventListener('click', function(event_handler) {

                layoutAlert.classList.replace('d-flex', 'd-none');
            });
            card.addEventListener('click', function(e_handler) {
                e_handler.stopPropagation();

            });
            layoutAlert.addEventListener('click', function(event) {

                layoutAlert.classList.replace('d-flex', 'd-none');
            });

            document.addEventListener('keydown', function(event_handler) {

                if (event_handler.key == 'Escape')
                    layoutAlert.classList.replace('d-flex', 'd-none');
            });

        }
        siteName.classList.remove('is-valid');
        siteURL.classList.remove('is-valid');

    }
    // ===========================ADD NEW Sites===========================

    // ===========================CLEAR  reset===========================
    resetButtom.addEventListener('click', clearForm);

    function clearForm() {
        siteName.value = null;
        siteURL.value = null;
        siteName.classList.remove('is-valid', 'is-invalid');
        siteURL.classList.remove('is-valid', 'is-invalid');
        siteName.nextElementSibling.classList.replace('d-block', 'd-none');
        siteURL.nextElementSibling.classList.replace('d-block', 'd-none');
        document.getElementById('addBtn').innerHTML = 'Submit';
    }
    // ===========================CLEAR===========================

    // ===========================DISPLAY NEW Sites===========================
    function displaysites(Array) {
        var box_contanier = '';

        for (var i = 0; i < Array.length; i++) {

            box_contanier += `
            <tr>
            <td>${i+1}</td>
            <td>${Array[i].name}</td>
            <td>
                <a href="${Array[i].link}" target="blank"><button class="btn btn-success rounded-3" ><i class="fa-solid fa-eye me-2"></i>Visit</button></a>
            </td>
            <td>
                <button class="btn btn-danger rounded-3" onclick="deletesite(${i})"><i class="fa-solid fa-trash-can me-2"></i> Delete</button></td>
            <td>
                <button class="btn btn-info rounded-3 text-center" onclick="updatesite(${i})"><i class="fa-solid fa-wrench "></i></button></td>
         </tr>
            `
        }
        document.getElementById('demo').innerHTML = box_contanier;
    }
    // ===========================DISPLAY NEW Sites==========================

    // ===========================DELETE Item=========================================
    function deletesite(index) {
        siteContainer.splice(index, 1);
        // ===========================DELETE EFFECT ON DOCUMENT DISPLAY=================
        displaysites(siteContainer);
        // ===========================DELETE EFFECT ON LOCAL STORAGE==to make effect at refresh=======================================
        localStorage.setItem('Bookmark_site', JSON.stringify(siteContainer));
        //-----------------
        clearForm();
        document.getElementById('addBtn').innerHTML = 'Submit';

        //--------------------
    }
    // ===========================DELETE Item=========================================

    // ===========================UPDATE DATA Item========================================
    function updatesite(index) {
        currentIndex = index;

        siteName.value = siteContainer[index].name;
        siteURL.value = siteContainer[index].link;
        validateInputs(siteName);
        validateInputs(siteURL);

        document.getElementById('addBtn').innerHTML = 'Update';
    }
    // ===========================UPDATE DATAItem=========================================


    // ===========================SEARCH DATA Item========================================

    search_Site.addEventListener('keyup', function(e) {
        var loadedSearchChar = search_Site.value;
        searchsite(loadedSearchChar)
    });

    function searchsite(term) {

        var searchBackupArray = [];
        for (var i = 0; i < siteContainer.length; i++) {
            if (siteContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
                searchBackupArray.push(siteContainer[i]);
                displaysites(searchBackupArray);
            }
        }
    }
    // ===========================SEARCH DATAItem=========================================

    // ===========================validation DATA input====================================

    siteName.addEventListener('blur', function(eHandler) {
        validateInputs(eHandler.currentTarget);

    });
    siteURL.addEventListener('keyup', function(eHandler) {
        validateInputs(eHandler.currentTarget);

    });

    function validateInputs(element) {

        var regex = {
            SiteName: /^([0-9]|[A-Z]|[a-z]|[-_]){3,}$/gm,
            SiteURL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm,
        };
        if (regex[element.id].test(element.value)) {

            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            element.nextElementSibling.classList.replace('d-block', 'd-none');
            return true;
        } else {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
            element.nextElementSibling.classList.replace('d-none', 'd-block');

            return false;
        }



    }
    // ==========================End validation DATA input=======================================

}