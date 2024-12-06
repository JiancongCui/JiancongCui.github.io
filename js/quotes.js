// function playAudio(audioFile) {
//     // alert(audioFile)
//     var audioPlayer = document.getElementById("audio-player");
//     audioPlayer.src = "../quotes/" + audioFile + '.mp3'; // 假设音频文件放在 source/quotes/audio 文件夹中
//     audioPlayer.play();
// }


(function() {

    const quotes = [
        { 
            time: "2024-12-06",
            from: "Lorena Kirchhoffer & Markus Büttner ← Fools Garden",
            content: "Lemon Tree~ I wonder how, I wonder why, Yesterday you told me 'bout the blue, blue sky, And all that I can see is just a yellow lemon tree, I'm turnin' my head up and down, I'm turnin', turnin', turnin', turnin', turnin' around, And all that I can see is just a yellow lemon tree~",
            md5: "a2ab49843caa819573678b0eca2641c4",
        },
        { 
            time: "2024-12-03",
            from: "Peter Dinklage ← Samuel Beckett",
            content: "Ever tried Ever failed No matter Try again Fail again Fail better. The world is yours. Treat everyone kindly and light up the night. Please don't ever stop.",
            md5: "29128f76ff53ae190a7a76cee3654d01",
        },
        { 
            time: "2024-05-18",
            from: "Declaration of Independence",
            content: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
            md5: "85e1187eab57b877a7f1584724dca1f8a",
        },
        { 
            time: "2024-03-09",
            from: "Modern Family",
            content: "We are from different worlds, yet we somehow fit together. Love is what binds us, through fair or stormy weather.",
            md5: "12af8297a6f5cf0fbba6917ba203efc5",
        }
    ]

    const quotesContainer = document.getElementById("quotes-container");
    let currentAudio = null;

    // Generate music divs dynamically
    quotes.forEach((quote, index) => {
        const quoteCard = document.createElement("div");
        quoteCard.className = "quote-card";
        quoteCard.dataset.index = index;

        const quoteContent = document.createElement("div");
        quoteContent.className = "quote-content";
        quoteContent.textContent = quote.content;
        quoteContent.dataset.index = index;

        const quoteInfo = document.createElement("div");
        quoteInfo.className = "quote-info";
        quoteInfo.textContent = `${quote.from} @ ${quote.time}`;
        quoteInfo.dataset.index = index;

        quoteCard.appendChild(quoteContent);
        quoteCard.appendChild(quoteInfo);
        quotesContainer.appendChild(quoteCard);
    });

    // Add click event listener to the music container
    quotesContainer.addEventListener("click", (event) => {
        const clickedDiv = event.target;

        // Ensure a music item is clicked
        if (!["quote-card", "quote-content", "quote-info"].some(cls => clickedDiv.classList.contains(cls))) {
            return;
        }

        const index = clickedDiv.dataset.index;
        const quoteCards = quotesContainer.querySelectorAll(".quote-card");
        const curQuoteCard = quoteCards[index]
        const quote = quotes[index];

        // Stop the current playing audio if any
        if (currentAudio) {
            currentAudio.audio.pause();
            currentAudio.audio.currentTime = 0;
            currentAudio.curQuoteCard.classList.remove("playing");

            // If the same div is clicked, stop playback
            if (currentAudio.curQuoteCard === curQuoteCard) {
                currentAudio = null;
                return;
            }
        }

        // Play the selected track
        const audio = new Audio("../quotes/" + quote.md5 + '.mp3');
        audio.play();
        curQuoteCard.classList.add("playing");

            // Handle when the audio finishes playing
        audio.addEventListener("ended", () => {
            curQuoteCard.classList.remove("playing");
            currentAudio = null;
        });

        // Save the currently playing track
        currentAudio = { audio, curQuoteCard };
    });
})();
