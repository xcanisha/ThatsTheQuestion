var xhr = new XMLHttpRequest();
var raw;
var hoofdvraag;
var hoofdvraagAntwoord;
var deelvragen;
var i = 1;
var anagram;
var splitted;

//Verbinding met API maken
xhr.open('GET', 'https://opentdb.com/api.php?amount=50&type=multiple');

//Bij het inladen van de pagina wordt de data geparsed en de hoofdvraag bepaald.
xhr.onload = function (){
 raw = xhr.response;
 parsed = JSON.parse(raw);
 deelvragen = parsed.results;

 hoofdvraag = deelvragen[0].question;
 hoofdvraagAntwoord = deelvragen[0].correct_answer;
 splitted = hoofdvraag.split('');

//Hoofdvraag en antwoord worden op de goede plek ingevuld
 document.getElementById("hoofdvraag").innerHTML = hoofdvraag;
 document.getElementById("antwoord_hoofdvraag").innerHTML = hoofdvraagAntwoord;

};
xhr.send();

//Functie om de deelvragen te laten zien
function clicked(){
  var randomGetal = Math.round(Math.random()* splitted.length);
  var extraLetter = splitted[randomGetal];
  var toAnagram;
  toAnagram = deelvragen[i].correct_answer + extraLetter;
  anagram = shuffleAnagram(toAnagram);
  document.getElementById("deelvraag").innerHTML = deelvragen[i].question;
  document.getElementById("antwoord_deelvraag").innerHTML = anagram;
    console.log('Vraag ' + i + ': ' + deelvragen[i].question);
    console.log('Antwoord: ' + deelvragen[i].correct_answer);
    console.log(toAnagram);

    i++;
}

//Functie om het antwoord van de deelvraag (+ extra letter) om te zetten in een anagram
function shuffleAnagram(s) {
  var arr = s.split(''); // Convert String to array.
  arr.sort(function() {
  return 0.5 - Math.random();
  });
  s = arr.join(''); // Convert Array to string.
  return s; // Return shuffled string.
}

//Functie om de volume knop aan te passen
function changeVolumeState() {
  var volumeButton = document.getElementById('volume-btn');
  volumeButton.src = (/volume-on/.test(volumeButton.src))? 'images/volume-off.png' : 'images/volume-on.png';
  volumeButton.alt = (/Volume: On/.test(volumeButton.alt))? 'Volume: Off' : 'Volume: On';
}
