'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useSkillTest } from '@/contexts/SkillTestContext';

export function QuickStatsCard() {
    const { rank, percentile, correctAnswers, totalQuestions } = useSkillTest();

    return (
        <Card className="w-full">
            <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Quick Statistics</h3>
                <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-around">
                    <div className="flex flex-row sm:flex-col md:flex-row items-center gap-2 w-full sm:w-auto justify-between sm:justify-start mb-4 sm:mb-0">
                        <span className="text-yellow-500 bg-gray-100 dark:bg-gray-900 p-2 rounded-full text-2xl">🏆</span>
                        <div className="sm:text-center md:text-left">
                            <div className="text-xl font-semibold text-right sm:text-center md:text-left">{rank}</div>
                            <div className="text-sm text-muted-foreground">YOUR RANK</div>
                        </div>
                    </div>

                    <div className="hidden sm:block mx-6 h-12 w-px bg-gray-200" />

                    <div className="flex flex-row sm:flex-col md:flex-row items-center gap-2 w-full sm:w-auto justify-between sm:justify-start mb-4 sm:mb-0">
                        <span className="text-gray-400 bg-gray-100 dark:bg-gray-900 p-2 rounded-full text-2xl">📑</span>
                        <div className="sm:text-center md:text-left">
                            <div className="text-xl font-semibold text-right sm:text-center md:text-left">{percentile}%</div>
                            <div className="text-sm text-muted-foreground">PERCENTILE</div>
                        </div>
                    </div>

                    <div className="hidden sm:block mx-6 h-12 w-px bg-gray-200" />

                    <div className="flex flex-row sm:flex-col md:flex-row items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                        <span className="text-green-500 bg-gray-100 dark:bg-gray-900 p-2 rounded-full text-2xl">✅</span>
                        <div className="sm:text-center md:text-left">
                            <div className="text-xl font-semibold text-right sm:text-center md:text-left">{correctAnswers}/{totalQuestions}</div>
                            <div className="text-sm text-muted-foreground">CORRECT ANSWERS</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 