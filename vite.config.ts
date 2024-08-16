import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  assetsInclude: ['**/*.mov'],
  plugins: [
    motionCanvas({
        project: "./src/**/*_project.ts"
      }
    ),
    ffmpeg(),
  ],
});
