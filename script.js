function addBorder(buttons, selected){
    buttons.forEach((elem)=>{
        if(elem.id === selected){
            elem.classList.add("selected");
        }else{
            elem.classList.remove("selected");
        }
    });
}

function createCards(cards){
    let cardarea = document.querySelector('.card-area');
    cards.forEach((card, idx)=>{
        let newCard = document.createElement("div");
        let newIcon = document.createElement("i");
        newIcon.className = card.icon
        newCard.classList.add("card");
        newCard.append(newIcon);
        cardarea.append(newCard);
    });
}

function hideUnhide(){
    document.querySelector(".game-container").classList.add("hidden");
    document.querySelector(".card-area").classList.remove("hidden");
}

function getData(number, data){
    let random_num = Math.floor(Math.random() * 28);
    let filtered_data = data.slice(random_num, random_num + number);
    return filtered_data;
}

const game_mode = document.querySelector('.game-mode-buttons');
const difficulty = document.querySelector(".difficulty-buttons");
const available_modes = ["basic", "timer", "1v1"];
const available_difficulties = ["easy", "medium", "hard", "extreme"];
const play_button = document.querySelector("#play-button");
const card_area = document.querySelector(".card-area");

let selected_mode = "basic";
let selected_difficulty = "easy";

game_mode.addEventListener('click', (event)=>{
    let game_mode_buttons = document.querySelectorAll(".game-mode-buttons button");
    selected_mode = event.target.id;
    if(available_modes.includes(selected_mode)){
        addBorder(game_mode_buttons, selected_mode);
    }
});

difficulty.addEventListener("click", (event)=>{
    let difficulty_buttons = document.querySelectorAll(".difficulty-buttons button");
    selected_difficulty = event.target.id;
    if(available_difficulties.includes(selected_difficulty)){
        addBorder(difficulty_buttons, selected_difficulty);
    }
});

play_button.addEventListener("click", (event)=>{
    hideUnhide();
    if(selected_mode === "basic"){
        card_area.classList.add(selected_difficulty);
        if(selected_difficulty === "easy"){
            let data = getData(8, cardArray);
            data = data.concat(data);
            createCards(data);
        }
        else if(selected_difficulty === "medium"){   
            createCards(36);
        }
        else if(selected_difficulty === "hard"){
            createCards(64);
        }
        else if(selected_difficulty === "extreme"){
            createCards(100);
        }
    }
});