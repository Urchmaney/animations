import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas({ 
      project: [
        // './src/test-scenes/project.ts',
        // './src/blazer-project/project.ts',
         './src/linked-list-project/project.ts'
      ] }),
    ffmpeg(),
  ],
});
