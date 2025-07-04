import { z } from "zod";

const MAX_FILE_SIZE = 10485760; // 10MB in bytes
const ACCEPTED_FILE_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/mp3",
  "audio/x-wav",
];

export const audioFileFormSchema = z.object({
  audioFile: z
    .instanceof(FileList)
    .refine((files) => files?.length == 1, "Audio file is required.")
    .refine(
      (files) => {
        const file = files.item(0);
        return file && file.size <= MAX_FILE_SIZE;
      },
      {
        message: "Max file size is 10MB.",
      },
    )
    .refine(
      (files) => {
        const file = files.item(0);
        return file && ACCEPTED_FILE_TYPES.includes(file.type);
      },
      {
        message: "Only MP3 and WAV files are accepted.",
      },
    ),
});
