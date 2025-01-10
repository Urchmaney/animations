import installation_scenes from "./scenes";
import course_map_scenes from "./course_map_scenes";
import audio from "./audio/blazerAudio.mp3"
import { makeProject } from "@motion-canvas/core";

import { Code, LezerHighlighter } from '@motion-canvas/2d';
import { parser } from "@lezer/python";
Code.defaultHighlighter = new LezerHighlighter(parser)

export default makeProject(course_map_scenes);