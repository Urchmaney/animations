
import introduction from './introduction?scene';
import sites from './sites?scene';
import conclusion from './conclusion?scene';
import pageIntro from './pageIntro?scene';
import audio from './audio/listAudio.mp3';
import { makeProject } from '@motion-canvas/core';

import scenes from './scenes';

export default makeProject({
    scenes,
    audio: audio,
    name: "Linked List"
});