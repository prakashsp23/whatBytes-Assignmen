import { z } from 'zod';

export const skillTestScoresSchema = z.object({
    rank: z.number().int().positive(),
    percentile: z.number().int().min(0).max(100),
    currentScore: z.number().int().min(0).max(15)
});

export type SkillTestScores = z.infer<typeof skillTestScoresSchema>; 