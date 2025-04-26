"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { BarChart3 } from "lucide-react"
import { useSkillTest } from "@/contexts/SkillTestContext"

// Sample data for the bell curve distribution
const generateBellCurveData = (userPercentile: number) => {
  const data = []
  for (let i = 0; i <= 100; i += 5) {
    let value
    if (i < 25) {
      value = Math.exp(-0.5 * Math.pow((i - 25) / 15, 2)) * 10
    } else if (i < 50) {
      value = Math.exp(-0.5 * Math.pow((i - 50) / 15, 2)) * 30
    } else {
      value = Math.exp(-0.5 * Math.pow((i - 50) / 25, 2)) * 30
    }

    // Add a spike at 90%
    if (i === 90) {
      value = 15
    }

    data.push({
      percentile: i,
      value: value,
      isUserPercentile: i === userPercentile,
      isHighlighted: i === 90,
    })
  }
  return data
}

export default function ComparisonGraph() {
  const { percentile } = useSkillTest()
  const data = generateBellCurveData(percentile)
  const averagePercentile = 72

  return (
    <Card className="w-full max-w-3xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-bold">Comparison Graph</h2>
            <p className="text-muted-foreground mt-2">
              <span>
                <strong className="text-black/80 dark:text-white/80">You scored {percentile}% percentile</strong> which is lower than
                the
              </span>
              <br />
              <span>average percentile {averagePercentile}% of all the engineers who took this assessment</span>
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-full p-3">
            <BarChart3 className="h-5 w-5 text-red-500" />
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="percentile" domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickLine={false} />
              <YAxis hide={true} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length && payload[0].payload.percentile === 90) {
                    return (
                      <div className="bg-white/80 dark:bg-black/80 border-muted-foreground border-2 rounded-md p-3 shadow-sm">
                        <p className="font-bold text-muted-foreground">90</p>
                        <p className="text-blue-500">numberOfStudent : 4</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props

                  if (payload.isHighlighted) {
                    return <circle cx={cx} cy={cy} r={6} fill="#6366f1" stroke="none" />
                  }

                  return <circle cx={cx} cy={cy} r={3} fill="#8884d8" stroke="none" />
                }}
              />
              <ReferenceLine
                x={percentile}
                stroke="#888"
                strokeDasharray="3 3"
                label={{
                  value: "your percentile",
                  position: "insideBottomLeft",
                  offset: 10,
                  fill: "#888",
                  fontSize: 12,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
