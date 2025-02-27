import { makeProject } from "@motion-canvas/core";
import scenes from "./scenes";
import audio from "./assets/audio2.mp3";
import matchingAudio from "./assets/matching_audio.mp3"

export default makeProject({
    scenes,
    audio: audio
})