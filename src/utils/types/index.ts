import { z } from "zod";

interface TodoDetailsProps {
  id: string;
  title: string;
  description: string;
  type: string;
}
const formSchema = z.object({
  title: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: "Title should not be empty",
    })
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), {
      message: "Title should only contain alphabets and spaces",
    }),
  description: z.string().refine((val) => val.trim().length >= 25, {
    message: "Description should be at least 25 characters long",
  }),
  type: z.string().optional(),
});

const allType = ["To Do", "Doing", "Done"];

export { type TodoDetailsProps, formSchema, allType };
