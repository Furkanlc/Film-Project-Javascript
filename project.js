const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


//UI Objesini Başlatma

const uı = new UI();

//Storage Objesi Üret
const storage = new Storage();

//TÜM EVENTLERİ YÜKLEME

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFfromStorage();
        uı.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilms);
}

clear.addEventListener("click", clearAllFilms);

function addFilm(e) {


    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        //Hata Mesajı
        uı.displayMessage("Tüm Alanları Doldurun...", "danger");
    }
    else {
        //yeni film
        const newFilm = new Film(title, director, url);
        uı.addFilmToUI(newFilm);//Arayüze fil ekleme 

        storage.addFilmToStorage(newFilm);//storege film eklem
        uı.displayMessage("Film Başarı ile eklendi")
    }

    uı.clearInputs(titleElement, urlElement, directorElement);

    e.preventDefault();
}

function deleteFilms(e) {
    if (e.target.id === "delete-film") {
        uı.deleteFilmFromUı(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        uı.displayMessage("Silme İşlemi Başarılı..", "success");



    }
}

function clearAllFilms() {

    if (confirm("Emin misiniz ?")) {
        uı.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }

}
