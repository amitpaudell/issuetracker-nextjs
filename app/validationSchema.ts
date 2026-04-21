import { z } from 'zod';
export const createIssueSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Must be at least 3 characters long',
    })
    .max(255),
  description: z
    .string({
      error: 'Must be at least 3 characters long',
    })
    .min(3, {
      message: 'Must be at least 3 characters long',
    })
    .max(255),
});
