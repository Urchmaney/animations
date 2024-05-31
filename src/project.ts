import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import motor from './scenes/motor?scene';
import introduction from './scenes/introduction?scene';
import linkedlist from './scenes/linkedlist?scene';
import school from './scenes/school?scene';
import conclusion from './scenes/conclusion?scene';
import audio from './audio/listAudio.mp3'

export default makeProject({
  scenes: [introduction, linkedlist, school,conclusion],
  audio: audio
});
