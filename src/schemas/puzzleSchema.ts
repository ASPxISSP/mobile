import { TypeOf, z } from 'zod';

export const solutionSchema = z.object({
    solution: z.string().min(1, 'Solution is required')
});

export type SolutionSchema = TypeOf<typeof solutionSchema>;
