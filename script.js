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
        inner_card_div.append(newIcon); //For testing purpose
        inner_card_div.append(card_front_div);
        inner_card_div.append(card_back_div);
        card_div.append(inner_card_div);
        cardarea.append(card_div);
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

function loadData(difficulty_, data) {
    let number = 8;
    switch (difficulty_) {
        case "medium": number = 18;
            break;
        case "hard": number = 32;
            break;
        case "extreme": number = 50;
            break;
        default: number = 8;
    }
    let random_num = Math.floor(Math.random() * (data.length - (number - 1)));
    let filtered_data = data.slice(random_num, random_num + number);
    filtered_data = filtered_data.concat(filtered_data);
    let shuffled_data = shuffleCards(filtered_data);
    createCards(shuffled_data);
}

function addRemoveClasses(elements, cls, task) {
    elements.forEach((elem) => {
        task === "add" ? elem.classList.add(cls) : elem.classList.remove(cls);
    });
}

function showScreen(title, message) {
    card_area.classList.add("hidden");
    document.querySelector("#win-screen").classList.remove("hidden");
    document.querySelector(".win-message h1").innerText = title;
}

function resetGame() {
    card_area.innerHTML = "";
    card_area.className = "card-area hidden";
    document.querySelector("#win-screen").classList.add("hidden");
    document.querySelector(".timer").classList.add("hidden");
    document.querySelector(".game-container").classList.remove("hidden");
}

function resetTurn(){

}

function playingGame(difficulty_, game_mode = "basic", time = 30) {

    switch (difficulty_) {
        case "easy": pairs = 8, time = 30;
            break;
        case "medium": pairs = 18, time = 120; 
            break;
        case "hard": pairs = 32, time = 240;
            break;
        case "extreme": pairs = 50, time = 360;
            break;
        default: pairs = 8, time = 30;
    }
    

    if (game_mode === "timer") {
        document.querySelector(".timer").classList.remove("hidden");
    }

    const timerInterval = setInterval(() => {
        if (game_mode === "timer") {
            timer_elem.innerText = time;
            time--;
        }
        if (time < 0) {
            click_counter = 0;
            clicked_index = -1;
            selected_cards = [];
            parent_cards = [];
            matched_cards = [];
            clearInterval(timerInterval);
            showScreen("😝 You Loose! 😝", "");
            return;
        }
    }, 1000);
}


const game_mode = document.querySelector('.game-mode-buttons');
const difficulty = document.querySelector(".difficulty-buttons");
const available_modes = ["basic", "timer", "1v1"];
const available_difficulties = ["easy", "medium", "hard", "extreme"];
const play_button = document.querySelector("#play-button");
const card_area = document.querySelector(".card-area");
const home_button = document.querySelector("#home-button");


let selected_mode = "basic";
let selected_difficulty = "easy";
let total_cards = cardArray;

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
    if (selected_difficulty === "extreme") {
        let random_num = Math.floor(Math.random() * 30);
        let repeated_cards = cardArray.slice(random_num, random_num + 10);
        total_cards = cardArray.concat(repeated_cards);
    }
});

let timer_elem = document.querySelector("#time");
let timerInterval;
let click_counter = 0;
let clicked_index = -1;
let selected_cards = [];
let parent_cards = [];
let matched_cards = [];
let pairs;

play_button.addEventListener("click", (event) => {
    hideUnhide();
    card_area.classList.add(selected_difficulty);
    loadData(selected_difficulty, total_cards);
    playingGame(selected_difficulty, selected_mode);
});

home_button.addEventListener('click', () => {
    resetGame();
});

card_area.addEventListener("mousedown", (event) => {
        
    if (event.target.dataset.name !== undefined && clicked_index !== event.target.dataset.index && !matched_cards.includes(event.target.dataset.index) && click_counter < 2) {
        console.log(pairs);
        click_counter++;
        parent_cards.push(event.target.closest('.card'));
        addRemoveClasses(parent_cards, "flipped", "add");

        selected_cards.push(event.target);

        if (click_counter === 1) {
            clicked_index = event.target.dataset.index;
        }
        else if (click_counter === 2) {
            setTimeout(() => {
                if (selected_cards[0].dataset.name === selected_cards[1].dataset.name) {
                    matched_cards.push(selected_cards[0].dataset.index);
                    matched_cards.push(selected_cards[1].dataset.index);
                    addRemoveClasses(selected_cards, "matched", "add");
                }

                addRemoveClasses(parent_cards, "flipped", "remove");
                resetTurn();

                if (pairs * 2 === matched_cards.length) {
                    matched_cards = [];
                    clearInterval(timerInterval);
                    let win_title = "🎉 You Win! 🎉";
                    let win_message = "";
                    showScreen(win_title, win_message);
                    return;
                }
            }, 500);

        } else {
            resetTurn();
        }
    }
});