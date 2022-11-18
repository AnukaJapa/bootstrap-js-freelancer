//^ ESERICZIO 
//quando l’utente fa click sul bottone “send” del form, il sito vi calcoli l’ammontare del vostro lavoro per le ore di lavoro richieste dall’utente.

//~ Il prezzo orario per una commissione varia in questo modo:
//~Se la commissione riguarda lo sviluppo backend il prezzo orario è di 20.50 € l’ora
//~Se la commissione riguarda lo sviluppo frontend il prezzo orario è di 15.30 € l’ora
//~Se la commissione riguarda l’analisi progettuale di un progetto il prezzo orario è di 33.60 € l'ora

//~ Se poi l’utente inserisce un codice promozionale tra i seguenti YHDNU32, JANJC63, PWKCN25, SJDPO96, POCIE24, fate in modo che l’utente abbia diritto ad uno sconto del 25% sul prezzo finale.
// Se il codice inserito non è valido, informate l’utente che il codice è sbagliato e calcolate il prezzo finale senza applicare sconti.
// Mostrare il risultato del calcolo del prezzo finale in una “forma umana” in un apposito tag HTML appena sotto il bottone send.


// CONSIDERAZIONI FINALI e BONUS:
// Mentre come bonus javascript dovete far diventare il codice sconto inserito di colore rosso, qualora quello inserito non sia valido.
// Inoltre se il codice fornito è valido, eliminare quel codice dall’elenco dei codici sconto disponibili, il codice sconto non sarà più usabile.

// Super Bonus: Creare una struttura dati adeguata per contenere tutte le informazioni relative ai progetti presenti nella sezione “Portfolio”. Rimuovere quindi le card dal markup nel file html e stamparle in pagina dinamicamente tramite l’utilizzo di JavaScript.

const codiciPromozionali = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"]

function calcola(event){
    event.preventDefault();
    let notificaAlUtente = document.getElementById("notificaAlUtente");

    let tipoDiLavoro = document.getElementById("typeOfWorkInput").value;
    let hoursRequested = document.getElementById("hoursInput").value;
    let codicePUtente = document.getElementById("discountCodeInput").value;
    console.log(codicePUtente);

    let prezzoSenzaSconto;
    let prezzoFinale;

// prezzo senza sconto a secondo di tipo di lavoro
switch(tipoDiLavoro){
    case 1:
prezzoSenzaSconto = hoursRequested * 20.50;
    break;
    case 2:
prezzoSenzaSconto = hoursRequested * 15.30; 
    break;
    case 3:
prezzoSenzaSconto = hoursRequested * 33.60; 
}
//verifica se codice promozionale inserito dall'utente sia giusto e calcola il prezzo in conseguenza
if(verificaCodicePromozionale(codicePUtente,codiciPromozionali)){
prezzoFinale = prezzoSenzaSconto - (prezzoSenzaSconto*25/100);
notificaAlUtente.textContent = `il prezzo con lo sconto è: ${prezzoFinale}`

} else {
prezzoFinale = prezzoSenzaSconto;
notificaAlUtente.innerHTML = `il tuo codice è sbagliato! <br>
il prezzo senza sconto è: ${prezzoFinale}`
}

}

function verificaCodicePromozionale(codice,codProAutorizzati){
    for(let x of codProAutorizzati){
        if(x == codice){
            return true 
        }
    }

    return false
}