function addBorder(buttons, selected) {
    buttons.forEach((elem) => {
        if (elem.id === selected) {
            elem.classList.add("selected");
        } else {
            elem.classList.remove("selected");
        }
    });
}

function createCards(cards) {
    let cardarea = document.querySelector('.card-area');
    cards.forEach((card, idx) => {
        // <div class="card" data-card>
        //         <div class="card-inner">
        //             <div class="card-front">
        //                 <i class="fa-solid fa-video"></i>
        //             </div>
        //             <div class="card-back">
        //                 <i class="fa-solid fa-video"></i>
        //             </div>
        //         </div>
        //     </div>

        let card_div = document.createElement("div");
        let inner_card_div = document.createElement("div");
        let card_front_div = document.createElement("div");
        let card_back_div = document.createElement("div");
        let newIcon = document.createElement("i");

        card_div.classList.add("card");
        inner_card_div.classList.add("card-inner");
        card_front_div.classList.add("card-front");
        card_back_div.classList.add("card-back");
        newIcon.className = card.icon;

        card_front_div.dataset.index = idx;
        card_front_div.dataset.name = card.name;

        card_back_div.append(newIcon);
        inner_card_div.append(card_front_div);
        inner_card_div.append(card_back_div);
        card_div.append(inner_card_div);
        cardarea.append(card_div);

        // let newCard = document.createElement("div");
        // let newIcon = document.createElement("i");
        // newCard.classList.add("card");
        // newCard.dataset.name = card.name;
        // newCard.dataset.index = idx;
        // newIcon.classList.name = card.icon;
        // newCard.append(newIcon);
        // cardarea.append(newCard);
    });
}

function hideUnhide() {
    document.querySelector(".game-container").classList.add("hidden");
    document.querySelector(".card-area").classList.remove("hidden");
}

function shuffleCards(cards) {
    let len = cards.length;
    for (let i = len - 1; i > 0; i--) {
        let random_idx = Math.floor(Math.random() * i + 1);
        let temp = cards[i];
        cards[i] = cards[random_idx];
        cards[random_idx] = temp;
    }
    return cards;
}

function loadData(number, data) {
    let random_num = Math.floor(Math.random() * (data.length - (number - 1)));
    let filtered_data = data.slice(random_num, random_num + number);
    filtered_data = filtered_data.concat(filtered_data);
    let shuffled_data = shuffleCards(filtered_data);
    createCards(shuffled_data);
}

function playingGame(pairs) {
    let click_counter = 0;
    let clicked_index = -1;
    let first_card = "";
    let first_card_parent = "";
    let second_card = "";
    let second_card_parent = "";
    let matched_cards = [];
    card_area.addEventListener("mousedown", (event) => {
        if (event.target.dataset.name !== undefined && clicked_index !== event.target.dataset.index && !matched_cards.includes(event.target.dataset.name)) {
            click_counter++;
            if (click_counter === 1) {
                first_card = event.target;
                first_card_parent = event.target.closest('.card');
                clicked_index = event.target.dataset.index;
                first_card_parent.classList.toggle("flipped");
            }
            else if (click_counter === 2) {
                second_card = event.target;
                second_card_parent = event.target.closest('.card');
                second_card_parent.classList.toggle("flipped");

                setTimeout(() => {
                    if (first_card.dataset.name === second_card.dataset.name) {
                        matched_cards.push(first_card.dataset.name);
                        first_card.classList.add("matched");
                        second_card.classList.add("matched");
                    }

                    second_card_parent.classList.toggle("flipped");
                    first_card_parent.classList.toggle("flipped");
                    clicked_index = -1;
                    click_counter = 0;

                    if(pairs === matched_cards.length){
                        alert("You won");
                    }
                }, 500);
            } else {
                click_counter = 0;
                clicked_index = -1;
            }
        }
    });
}


const game_mode = document.querySelector('.game-mode-buttons');
const difficulty = document.querySelector(".difficulty-buttons");
const available_modes = ["basic", "timer", "1v1"];
const available_difficulties = ["easy", "medium", "hard", "extreme"];
const play_button = document.querySelector("#play-button");
const card_area = document.querySelector(".card-area");

let selected_mode = "basic";
let selected_difficulty = "easy";

game_mode.addEventListener('click', (event) => {
    let game_mode_buttons = document.querySelectorAll(".game-mode-buttons button");
    selected_mode = event.target.id;
    if (available_modes.includes(selected_mode)) {
        addBorder(game_mode_buttons, selected_mode);
    }
});

difficulty.addEventListener("click", (event) => {
    let difficulty_buttons = document.querySelectorAll(".difficulty-buttons button");
    selected_difficulty = event.target.id;
    if (available_difficulties.includes(selected_difficulty)) {
        addBorder(difficulty_buttons, selected_difficulty);
    }
});

play_button.addEventListener("click", (event) => {
    hideUnhide();
    if (selected_mode === "basic") {
        card_area.classList.add(selected_difficulty);
        if (selected_difficulty === "easy") {
            loadData(8, cardArray);
            playingGame(8);
        }
        else if (selected_difficulty === "medium") {
            loadData(18, cardArray);
            playingGame(18);
        }
        else if (selected_difficulty === "hard") {
            loadData(32, cardArray);
        }
        else if (selected_difficulty === "extreme") {
            let random_num = Math.floor(Math.random() * 30);
            let repeated_cards = cardArray.slice(random_num, random_num + 10);
            let total_cards = cardArray.concat(repeated_cards);
            loadData(50, total_cards);
        }
    }
});