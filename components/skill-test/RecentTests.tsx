import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress, ProgressColor } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const syllabusData = [
  {
    id: 'html-tools',
    title: 'HTML Tools, Forms, History',
    percentage: 80,
    color: 'blue',
    textColor: 'text-blue-500'
  },
  {
    id: 'tags',
    title: 'Tags & References in HTML',
    percentage: 60,
    color: 'orange',
    textColor: 'text-orange-500'
  },
  {
    id: 'tables',
    title: 'Tables & References in HTML',
    percentage: 24,
    color: 'red',
    textColor: 'text-red-500'
  },
  {
    id: 'css',
    title: 'Tables & CSS Basics',
    percentage: 96,
    color: 'green',
    textColor: 'text-green-500'
  }
];

export default function RecentTests() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Syllabus Wise Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {syllabusData.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                {item.title}
              </div>
              <div className="flex items-center gap-2">
                <Progress
                  value={item.percentage}
                  className={cn("h-2")}
                  color={item.color as ProgressColor}
                />
                <span className={cn("text-sm font-bold", item.textColor)}>
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}