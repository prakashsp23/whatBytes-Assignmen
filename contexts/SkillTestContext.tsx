'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { skillTestScoresSchema, SkillTestScores } from '@/schemas/skillTest';

interface SkillTestContextType {
    rank: number;
    percentile: number;
    correctAnswers: number;
    totalQuestions: number;
    updateScores: (scores: SkillTestScores) => void;
}

const SkillTestContext = createContext<SkillTestContextType | undefined>(undefined);

export function SkillTestProvider({ children }: { children: ReactNode }) {
    const [rank, setRank] = useState(1);
    const [percentile, setPercentile] = useState(30);
    const [correctAnswers, setCorrectAnswers] = useState(10);
    const [totalQuestions] = useState(15);

    // Load saved values from localStorage after component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedRank = localStorage.getItem('skillTestRank');
            const savedPercentile = localStorage.getItem('skillTestPercentile');
            const savedCorrectAnswers = localStorage.getItem('skillTestCorrectAnswers');

            if (savedRank) setRank(parseInt(savedRank));
            if (savedPercentile) setPercentile(parseInt(savedPercentile));
            if (savedCorrectAnswers) setCorrectAnswers(parseInt(savedCorrectAnswers));
        }
    }, []);

    const updateScores = (scores: SkillTestScores) => {
        try {
            // Validate the scores using Zod
            const validatedScores = skillTestScoresSchema.parse(scores);

            setRank(validatedScores.rank);
            setPercentile(validatedScores.percentile);
            setCorrectAnswers(validatedScores.currentScore);

            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('skillTestRank', validatedScores.rank.toString());
                localStorage.setItem('skillTestPercentile', validatedScores.percentile.toString());
                localStorage.setItem('skillTestCorrectAnswers', validatedScores.currentScore.toString());
            }
        } catch (error) {
            console.error('Invalid scores:', error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <SkillTestContext.Provider value={{ rank, percentile, correctAnswers, totalQuestions, updateScores }}>
            {children}
        </SkillTestContext.Provider>
    );
}

export function useSkillTest() {
    const context = useContext(SkillTestContext);
    if (context === undefined) {
        throw new Error('useSkillTest must be used within a SkillTestProvider');
    }
    return context;
} 