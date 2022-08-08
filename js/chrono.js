// Declaration variables

let startTime = 0;
let start = 0;
let end = 0;
let diff = 0;
let timerID = 0;

// Corps du chrono

function chrono() {
  end = new Date();
  diff = end - start;
  // temps écoulé depuis start
  diff = new Date(diff);
  // new Date indiqué sur temps écoulé depuis start
  let msec = diff.getMilliseconds();
  let sec = diff.getSeconds();
  let min = diff.getMinutes();
  let hr = diff.getHours() - 1;
  // Sinon démarre avec 1 heure d'avance
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (msec < 10) {
    msec = "00" + msec;
  } else if (msec < 100) {
    msec = "0" + msec;
  }
  // 23-34 : ajoute un 0 pour tout nombre strictement inférieur a 10
  // Possibilité de || (a, b) pour (msec < 10) et (msec < 100) conditions
  document.getElementById("chronotime").value =
    hr + ":" + min + ":" + sec + ":" + msec;
  // Met a jour la value du form (html)
  timerID = setTimeout("chrono()", 10);
}

// Fonction Start Chrono

function chronoStart() {
  document.chronoForm.startstop.value = "stop";
  document.chronoForm.startstop.classList.remove("btn-primary");
  document.chronoForm.startstop.classList.add("btn-danger");
  // onClick start : start deviens stop
  document.chronoForm.startstop.onclick = chronoStop;
  // onClick stop : appeler fonction chronoStop
  document.chronoForm.reset.onclick = chronoReset;
  // onClick reset : appeler fonciton chronoReset
  start = new Date();
  chrono();
}

// Fonction continue pour le chrono

function chronoContinue() {
  document.chronoForm.startstop.value = "stop";
  document.chronoForm.startstop.classList.remove("btn-primary");
  document.chronoForm.startstop.classList.add("btn-danger");
  // "stop" doit être affiché tant que le chrono tourne
  document.chronoForm.startstop.onclick = chronoStop;
  // onClick = fonction stop donc document.chronoForm.startstop.value = "start"
  document.chronoForm.reset.onclick = chronoReset;
  start = new Date() - diff;
  // Sinon reset a 0
  start = new Date(start);
  // start mis a jour avec date(start)
  chrono();
}

// Fonction stop chrono

function chronoStop() {
  document.chronoForm.startstop.value = "continue";
  document.chronoForm.startstop.classList.remove("btn-danger");
  document.chronoForm.startstop.classList.add("btn-primary");
  // onClick : changer value stop to start
  document.chronoForm.startstop.onclick = chronoContinue;
  // onClick : appeler fonction Continue
  document.chronoForm.reset.onclick = chronoStopReset;
  // onClick : appeler fonction StopReset
  clearTimeout(timerID);
}

// Fonction reset chrono

function chronoReset() {
  document.getElementById("chronotime").value = "0:00:00:000";
  // reset valeur chronotime donc 0
  start = new Date();
  // redemarre le compte

  // chronoReset quand chrono tourne
}

// Fonction reset sur stop chrono

function chronoStopReset() {
  document.getElementById("chronotime").value = "0:00:00:000";
  document.chronoForm.startstop.onclick = chronoStart;

  // chronoReset quand chronoStop
}
