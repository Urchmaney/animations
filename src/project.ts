import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import motor from './scenes/motor?scene';
import introduction from './linked_list_scenes/introduction?scene';
import linkedlist from './scenes/linkedlist?scene';
import school from './scenes/school?scene';
import conclusion from './scenes/conclusion?scene';
import pageIntro from './linked_list_scenes/pageIntro?scene';
import ptry from './scenes/try?scene';
import audio from './audio/listAudio.mp3'

export default makeProject({
  scenes: [pageIntro, introduction, school,conclusion],
  audio: audio
});
