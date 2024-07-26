import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import motor from './scenes/motor?scene';
import introduction from './scenes/introduction?scene';
import linkedlist from './scenes/linkedlist?scene';
import school from './scenes/school?scene';
import conclusion from './scenes/conclusion?scene';
import pageIntro from './scenes/pageIntro?scene';
import ptry from './scenes/try?scene';




export default makeProject({
    scenes: [
        introduction, school, conclusion
    ],
    name: "Test Scenes"
});
