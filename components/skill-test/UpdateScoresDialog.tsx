'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useSkillTest } from '@/contexts/SkillTestContext';
import { z } from 'zod';

interface UpdateScoresDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (scores: { rank: number; percentile: number; currentScore: number }) => void;
}

export function UpdateScoresDialog({ open, onOpenChange, onSave }: UpdateScoresDialogProps) {
    const { rank, percentile, correctAnswers, totalQuestions } = useSkillTest();
    const [scores, setScores] = useState<{
        rank: number | undefined;
        percentile: number | undefined;
        currentScore: number | undefined;
    }>({
        rank: rank,
        percentile: percentile,
        currentScore: correctAnswers
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validationSchema = z.object({
        rank: z.number().min(1, "Rank must be at least 1"),
        percentile: z.number().min(0, "Percentile must be at least 0").max(100, "Percentile cannot exceed 100"),
        currentScore: z.number().min(0, "Score must be at least 0").max(15, "Score cannot exceed 15")
    });

    useEffect(() => {
        setScores({
            rank: rank,
            percentile: percentile,
            currentScore: correctAnswers
        });
    }, [rank, percentile, correctAnswers]);

    const handleInputChange = (field: string, value: string) => {
        const numValue = value === '' ? undefined : parseInt(value);
        setScores(prev => ({ ...prev, [field]: numValue }));

        try {
            validationSchema.parse({ ...scores, [field]: numValue ?? 0 });
            setErrors(prev => ({ ...prev, [field]: '' }));
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldError = error.errors.find(err => err.path[0] === field);
                if (fieldError) {
                    setErrors(prev => ({ ...prev, [field]: fieldError.message }));
                }
            }
        }
    };

    const handleSave = () => {
        try {
            const validScores = {
                rank: scores.rank ?? 0,
                percentile: scores.percentile ?? 0,
                currentScore: scores.currentScore ?? 0
            };
            validationSchema.parse(validScores);
            onSave(validScores);
            onOpenChange(false);
            setErrors({});
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach(err => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as string] = err.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-[95vw] sm:w-full">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Update scores</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {['rank', 'percentile', 'currentScore'].map((field, index) => (
                        <div key={field} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 w-full">
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <div className="flex items-center bg-[#132277] justify-center w-6 h-6 rounded-full dark:bg-[#3b82f6] text-primary-foreground flex-shrink-0">
                                    {index + 1}
                                </div>
                                <label htmlFor={field} className="text-sm font-medium">
                                    {field === 'rank' && 'Update your Rank'}
                                    {field === 'percentile' && 'Update your Percentile'}
                                    {field === 'currentScore' && `Update your Current Score (out of ${totalQuestions})`}
                                </label>
                            </div>
                            <div className="w-full sm:w-auto">
                                <Input
                                    id={field}
                                    type="number"
                                    value={scores[field as keyof typeof scores]?.toString() || ''}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    className={`mt-1 w-full ${errors[field] ? 'border-red-500' : ''}`}
                                />
                                {errors[field] && (
                                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between lg:justify-end">
                    <Button onClick={handleSave} className="w-full sm:w-auto px-8 flex items-center text-white bg-[#132277] dark:bg-[#3b82f6] hover:bg-[#1a2b8f] dark:hover:bg-[#223399] order-1 sm:order-2">
                        Save <span className='ml-1'>
                            <ArrowRight size={15} />
                        </span>
                    </Button>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto order-2 sm:order-1">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}