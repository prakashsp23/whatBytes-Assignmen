'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center">
      <Button 
        variant="default"
        className="bg-[#132277] hover:bg-blue-700 text-white dark:bg-[#202969] dark:hover:bg-[#223399]"
        onClick={() => router.push('/skill-test')}
      >
        Go to Skill Test
      </Button>
    </div>
  );
}