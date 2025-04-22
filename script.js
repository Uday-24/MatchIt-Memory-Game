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
        newCard.dataset.index = idx;
        newCard.dataset.name = card.name;
        newCard.append(newIcon);
        cardarea.append(newCard);
    });
}

function hideUnhide(){
    document.querySelector(".game-container").classList.add("hidden");
    document.querySelector(".card-area").classList.remove("hidden");
}

function shuffleCards(cards){
    let len = cards.length;
    for(let i=len-1; i>0; i--){
        let random_idx = Math.floor(Math.random() * i + 1);
        let temp = cards[i];
        cards[i] = cards[random_idx];
        cards[random_idx] = temp;
    }
    return cards;
}

function loadData(number, data){
    let random_num = Math.floor(Math.random() * (data.length - (number-1)));
    let filtered_data = data.slice(random_num, random_num + number);
    filtered_data = filtered_data.concat(filtered_data);
    let shuffled_data = shuffleCards(filtered_data);
    createCards(shuffled_data);
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
            loadData(8, cardArray);
        }
        else if(selected_difficulty === "medium"){   
            loadData(18, cardArray);
        }
        else if(selected_difficulty === "hard"){
            loadData(32, cardArray);
        }
        else if(selected_difficulty === "extreme"){
            let random_num = Math.floor(Math.random() * 30);
            let repeated_cards = cardArray.slice(random_num, random_num + 10);
            let total_cards = cardArray.concat(repeated_cards);
            loadData(50, total_cards);
        }
    }
});

let click_counter = 0;
let clicked_index = -1;
let first_card = "";
let second_card = "";
let matched_cards = [];
card_area.addEventListener("click", (event)=>{
    if(event.target.dataset.name !== undefined && clicked_index !== event.target.dataset.index && !matched_cards.includes(event.target.dataset.name)){
        click_counter++;
        if(click_counter === 1){
            first_card = event.target;
            first_card.style.border = "5px solid purple";
            clicked_index = event.target.dataset.index;
            console.log(first_card);
        }
        else if(click_counter === 2){
            second_card = event.target;
            second_card.style.border = "5px solid purple";
            if(first_card.dataset.name === second_card.dataset.name){
                matched_cards.push(first_card.dataset.name);
                first_card.style.border = "5px solid orange";
                second_card.style.border = "5px solid orange";
            }else{
                first_card.style.border = "none";
                second_card.style.border = "none";
            }
            click_counter = 0;
        }
        console.log("click");
    }
});