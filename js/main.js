let dificulty;
let baseArray = [1,2,3,4,5,6,7,8,9];
let gameArray;
let userArray = [];
let contor;
const btns = document.querySelectorAll('[data-dificulty]');

(function preloadImages(){
    for(i=0;i<baseArray.length;i++){
        image = new Image()
        image.src = `assets/${i}.jpg`;
    }
} )();

btns.forEach(el => el.addEventListener('click', event => { //dificulty setter
    dificulty = event.target.getAttribute('data-dificulty');
    console.log("Dificulty selected: ",dificulty);
    resetDeck(dificulty);    
}));

function shuffleArray(array) { //randomizes array
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function resetDeck(dificulty){ //reset deck
    userArray = []; //reset array
    scroll(0,0); //reset mobile view to top
    document.getElementById("playTitle").innerText = "Play again";
    gameArray = baseArray.slice(0,dificulty); //set deck size
    gameArray = gameArray.concat(gameArray); //duble items
    shuffleArray(gameArray); //suffle items
    console.log(gameArray)
    contor = 0;
    paintDeck();
}
function paintDeck(){ //paint the resetted deck
    let fragment = document.createDocumentFragment();
    fragment = ""; //some stupid fix
    for(i=0;i<gameArray.length;i++){
        let card = document.createDocumentFragment();
        card = `<div class="container-game-card" data-id="${gameArray[i]}" data-order="${i}">
                </div>
                `;
        fragment = card + fragment;
    }
    console.log(fragment);
    document.querySelector(".container-game").innerHTML = fragment;

    const cardClicked = document.querySelectorAll('.container-game-card'); 
    cardClicked.forEach(el => el.addEventListener('click', event => {  //add click events for the generated cards
        const id = event.target.getAttribute('data-id');
        console.log("Clicked on card:",id); 
        checkClicked(id,el);
    }));
}

function checkClicked(id,element){ //paint the card and check logic
    element.style.background = `url("assets/${id}.jpg") center center / cover no-repeat`;
    let alreadyFound = 0;
    for(i=0;i<userArray.length;i++)
        if(userArray[i][1]==("[data-order=\""+ element.getAttribute("data-order")+ "\"]"))
            alreadyFound =1;
    if(!alreadyFound){

        var audio = new Audio('assets/click.mp3');
        audio.play();

        userArray.push([id,("[data-order=\""+ element.getAttribute("data-order")+ "\"]")]);
        if(userArray.length>2){ //daca avem doua carti
            if(userArray.length % 2 == 1){ //daca este a 3-a
                const length = userArray.length;
                if(userArray[length-3][0]!=userArray[length-2][0]){ // intoarce cartile 
                    document.querySelector(userArray[length-3][1]).style.background =  `url("assets/0.jpg") center center / cover no-repeat`;
                    document.querySelector(userArray[length-2][1]).style.background =  `url("assets/0.jpg") center center / cover no-repeat`;
                    userArray.splice(length-3,2);
                }
            }
        }
        contor++ ;
    }
    
    if(userArray.length == gameArray.length){
        var audio = new Audio('assets/win.mp3');
        audio.play();
        setTimeout( ()=>{
                
                alert("Felicitari! Ai terminat in "+contor+" incercari!");
            },300);
    }
}

