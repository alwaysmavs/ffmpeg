import type { VocanaSDK } from "@vocana/sdk";
import ffmpeg from "fluent-ffmpeg";

type Context = VocanaSDK<Inputs, Outputs>;
type Inputs = Readonly<{ 
  video_source: string,
  video_file: string,
  audio_file: string,
 }>;
type Outputs = Readonly<{
  video_address: string,
  audio_adrress: string,
}>;

export default async function(inputs: Inputs, context: Context) {
 
  console.log(inputs.video_source);
  const save_address = `${inputs.video_file}/test.mov`;
  ffmpeg(inputs.video_source).noAudio().on('error', () => {
    console.log("ffmpeg error")
    context.done();
  }).on("end", () => {
    context.done();
  }).save(save_address);
  void context.output(save_address, "video_address", true);
};