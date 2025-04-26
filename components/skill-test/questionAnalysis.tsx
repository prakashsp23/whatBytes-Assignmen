"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useSkillTest } from "@/contexts/SkillTestContext"

export default function QuestionAnalysisCard() {
  const [progress, setProgress] = useState(0)
  const { correctAnswers, totalQuestions } = useSkillTest()
  const percentage = (correctAnswers / totalQuestions) * 100

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <Card className="w-full max-w-md  shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Question Analysis</h2>
          <span className="text-blue-600 font-bold">
            {correctAnswers}/{totalQuestions}
          </span>
        </div>

        <p className="text-muted-foreground text-md mb-8">
         <span className="font-bold text-black/80 dark:text-white/80"> You scored {correctAnswers} question correct out of {totalQuestions}.</span>
          {correctAnswers < totalQuestions && " However it still needs some improvements"}
        </p>

        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            {/* Circular progress chart */}
            <div className="absolute inset-0">
              <CircularProgressChart value={percentage} />
            </div>

            {/* Target icon in the center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-red-600"></div>
                </div>
                <div className="absolute w-1 h-4 bg-teal-500 translate-x-4 -translate-y-2 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Custom circular progress chart component
function CircularProgressChart({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 45 // 45 is the radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="#EBF2FE" strokeWidth="10" />

      {/* Progress circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  )
}
