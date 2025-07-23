import { z } from "zod";

export const notificationSchema = z.object({
    message: z
        .string()
        .min(1, "Message is required.")
        .max(500, "Message must be at most 500 characters."),

    author: z.object({
        name: z
            .string()
            .min(1, "Author name is required.")
            .max(100, "Author name must be at most 100 characters."),

        avatar_url: z
            .url("Invalid avatar URL.")
            .max(300, "Avatar URL must be at most 300 characters.")
            .optional()
            .or(z.literal("")),
    }),
});

export type NotificationInput = z.infer<typeof notificationSchema>;
