import installation_scenes from "./scenes";
import course_map_scenes from "./course_map_scenes";
import audio from "./audio/blazerAudio.mp3"
import { makeProject } from "@motion-canvas/core";
import queries_scenes from "./queries_scenes";

import { Code, LezerHighlighter } from '@motion-canvas/2d';
import { parser } from "@lezer/python";
import intro_scenes from "./intro_scenes";
Code.defaultHighlighter = new LezerHighlighter(parser)

export default makeProject(intro_scenes);