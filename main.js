//^ ESERICZIO 
//quando l’utente fa click sul bottone “send” del form, il sito vi calcoli l’ammontare del vostro lavoro per le ore di lavoro richieste dall’utente.

//~ Il prezzo orario per una commissione varia in questo modo:
//~Se la commissione riguarda lo sviluppo backend il prezzo orario è di 20.50 € l’ora
//~Se la commissione riguarda lo sviluppo frontend il prezzo orario è di 15.30 € l’ora
//~Se la commissione riguarda l’analisi progettuale di un progetto il prezzo orario è di 33.60 € l'ora

//~ Se poi l’utente inserisce un codice promozionale tra i seguenti YHDNU32, JANJC63, PWKCN25, SJDPO96, POCIE24, fate in modo che l’utente abbia diritto ad uno sconto del 25% sul prezzo finale.
//~ Se il codice inserito non è valido, informate l’utente che il codice è sbagliato e calcolate il prezzo finale senza applicare sconti.
// ~Mostrare il risultato del calcolo del prezzo finale in una “forma umana” in un apposito tag HTML appena sotto il bottone send.


//~ CONSIDERAZIONI FINALI e BONUS:
//~ Mentre come bonus javascript dovete far diventare il codice sconto inserito di colore rosso, qualora quello inserito non sia valido.
//~ Inoltre se il codice fornito è valido, eliminare quel codice dall’elenco dei codici sconto disponibili, il codice sconto non sarà più usabile.

// Super Bonus: Creare una struttura dati adeguata per contenere tutte le informazioni relative ai progetti presenti nella sezione “Portfolio”. Rimuovere quindi le card dal markup nel file html e stamparle in pagina dinamicamente tramite l’utilizzo di JavaScript.
const codiciPromozionali = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

const portfolio = [
    {
        img :"images/portfolio/cabin.png",
        titolo:"Cabin Website",
    },
    {
        img :"images/portfolio/cake.png",
        titolo:"Cake Website",
    },
    {
        img :"images/portfolio/circus.png",
        titolo:"Circus Website",
    },
    {
        img :"images/portfolio/game.png",
        titolo:"Game Website",
    },
    {
        img :"images/portfolio/safe.png",
        titolo:"Safe Website",
    },
    {
        img :"images/portfolio/submarine.png",
        titolo:"Submarine Website",
    }
]


function calcola(event){
    event.preventDefault();
    rimuoviRosso();
    let notificaAlUtente = document.getElementById("notificaAlUtente");

    let tipoDiLavoro = document.getElementById("typeOfWorkInput").value;
    let hoursRequested = document.getElementById("hoursInput").value;
    let codicePUtente = document.getElementById("discountCodeInput").value;

    let prezzoSenzaSconto;
    let prezzoFinale;

// prezzo senza sconto a secondo di tipo di lavoro
switch(tipoDiLavoro){
    case "1":
prezzoSenzaSconto = hoursRequested * 20.50;
    break;
    case "2":
prezzoSenzaSconto = hoursRequested * 15.30; 
    break;
    case "3":
prezzoSenzaSconto = hoursRequested * 33.60; 
}

//verifica se codice promozionale inserito dall'utente sia giusto e calcola il prezzo in conseguenza
if(verificaCodicePromozionale(codicePUtente,codiciPromozionali)){
prezzoFinale = prezzoSenzaSconto - (prezzoSenzaSconto*25/100);
notificaAlUtente.textContent = `il prezzo con lo sconto è: ${prezzoFinale}`

//~parte Bonus
cancellaCodicePromozionaleDallArray(codicePUtente,codiciPromozionali);
console.log(codiciPromozionali);

} else if(codicePUtente.trim() =="") {
//se l'utente non ha inserito il codice
prezzoFinale = prezzoSenzaSconto;
notificaAlUtente.innerHTML = `
il prezzo senza sconto è: ${prezzoFinale}`
} else {
//se il codice è inserito ma è errato 
prezzoFinale = prezzoSenzaSconto;
notificaAlUtente.innerHTML = `il tuo codice promozionale è sbagliato!
il prezzo senza sconto è: ${prezzoFinale}`
diventaRosso();
}
}

function rimuoviRosso(){
let codicePUtenteDOM = document.getElementById("discountCodeInput");
codicePUtenteDOM.classList.remove("text-danger"); 
codicePUtenteDOM.classList.remove("border-danger");
 
}
function diventaRosso(){
let codicePUtenteDOM = document.getElementById("discountCodeInput");
codicePUtenteDOM.classList.add("text-danger");
//oppure codicePUtenteDOM.style.color="red";
codicePUtenteDOM.classList.add("border-danger");


}

function verificaCodicePromozionale(codice,codProAutorizzati){
    for(let x of codProAutorizzati){
        if(x == codice){
            return true 
        }
    }

    return false
}

function cancellaCodicePromozionaleDallArray(codice, codProAutorizzati){
let index = codProAutorizzati.indexOf(codice);
codProAutorizzati.splice(index,1)
}


//~superbonus
stamparePortfolio(portfolio);

function stamparePortfolio(array){
    //creare div contenitori e row dentro
let bigDiv = document.getElementById("bigDiv");
bigDiv.classList.add("text-center");
bigDiv.classList.add("container-fluid");

let heading = document.createElement("h2");
heading.textContent ="PORTFOGLIO";
heading.classList.add("p-3");

let row = document.createElement("div");
row.classList.add("row");
row.classList.add("row-cols-1");
row.classList.add("row-cols-md-2");
row.classList.add("row-cols-lg-3");
row.classList.add("row-cols-xl-3");
row.classList.add("row-cols-xxl-3");
row.classList.add("g-4");
row.classList.add("justify-content-center");



bigDiv.appendChild(heading);
bigDiv.appendChild(row);


for(let element of array){
    console.log(element);

row.innerHTML += `
<div class="col p-0">
    <div class="card" style="width: 26rem;">
                <img src="${element.img}" class="card-img-top" alt="${element.titolo}">
                <div class="card-body">
                  <h5 class="card-title">${element.titolo}</h5>
                  <a href="#" class="btn btn-info me-1">Preview</a>
                  <a href="#" class="btn btn-outline-info">Visit Website</a>
                </div>
              </div>
</div>
`

}
}

