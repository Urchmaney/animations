import intro from "./intro?scene";
import blazer from "./blazer?scene";
import setup from "./setup?scene";
import browser from "./browser?scene";
import conclusion from "../../linked-list-project/scenes/conclusion?scene"
import audio from "./audio/blazerAudio.mp3"
import scenes from "../../africa_path/scenes";

export default {
    scenes: [intro, blazer, setup, browser, conclusion],
    audio,
    name: "Blazer Introduction"
};