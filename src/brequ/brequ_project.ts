import { makeProject } from "@motion-canvas/core";
import scenes from "./scenes";
import audio from "./audio/audio.mp3";
import '../global.css';

export default makeProject({
    audio,
    scenes
})