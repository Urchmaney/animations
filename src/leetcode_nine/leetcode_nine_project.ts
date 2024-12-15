import { makeProject } from "@motion-canvas/core";
import scenes from "./scenes";
import matchingAudio from "./assets/matching_audio.mp3"

export default makeProject({
    scenes,
    audio: matchingAudio
})