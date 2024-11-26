function playAudio(audioFile) {
    // alert(audioFile)
    var audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = "../quotes/" + audioFile + '.mp3'; // 假设音频文件放在 source/quotes/audio 文件夹中
    audioPlayer.play();
}
