var sounds = {};

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}

function addCard(id) {
    document.getElementById('card-container').insertAdjacentHTML('beforeend', `
    <div id="card_${id}" class="card">
        <div id="subcard_${id}" class="subcard" style="background-color: rgb(220, 220, 220)">
            <img id="cardicon_${id}" class="card-image" src="./assets/empty.png" alt="">
        </div>
        <div class="subcard-title">
            <div id="progress_${id}" class="progress-bar"></div>
            <h1 id="title_${id}" class="card-text" onclick='document.getElementById("input_${id}").click()'>none</h1>
            <input id="input_${id}" type="file">
        </div>
    </div>
    `)

    document.getElementById(`input_${id}`).addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = (e) => {
            const base64Data = e.target.result;
            sounds[id] = base64Data;
        };
      
        reader.readAsDataURL(file);


        document.getElementById(`title_${id}`).textContent = file.name;
        document.getElementById(`cardicon_${id}`).src = "./assets/soundicon.png";
        document.getElementById(`subcard_${id}`).style.backgroundColor = "rgb(230, 100, 100)";

        document.getElementById(`subcard_${id}`).onclick = function() {
            var audio = new Audio(sounds[id]);
            audio.loop = true;
            audio.play();

            audio.addEventListener("timeupdate", () => {
                let progress = audio.currentTime;

                document.getElementById(`progress_${id}`).style.width = `${percentage(progress, audio.duration)}%`;
            });
        };
      });
}

for (var i = 0; i < 25; i++) {
    addCard(i)
}