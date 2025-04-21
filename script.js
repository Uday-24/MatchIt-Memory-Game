const cardData = [
    {
        name: "home",
        tag: `<i class="fa-solid fa-house"></i>`
    },
]

const gameMode = document.querySelector(".game-mode");
const difficulty = document.querySelector(".difficulty");
const playButton = document.querySelector("#play-button");

let selectedGameMode = "basic"
let selectedDifficulty = "";

gameMode.addEventListener("click", (event)=>{
    selectedGameMode = event.target.id;
    if(selectedGameMode === ""){
        selectedGameMode = "basic";
    }
});

difficulty.addEventListener("click", (event)=>{
    selectedDifficulty = event.target.id;
    if(selectedDifficulty === ""){
        selectedDifficulty = "easy";
    }
})

playButton.addEventListener("click", (event)=>{
    console.log(selectedGameMode, selectedDifficulty);
});