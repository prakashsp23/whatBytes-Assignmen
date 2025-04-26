'use client'

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateScoresDialog } from "./UpdateScoresDialog";
import { useState } from "react";
import Image from "next/image";
import { useSkillTest } from "@/contexts/SkillTestContext";

export default function HtmlCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateScores } = useSkillTest();

  const handleUpdateScores = (scores: { rank: number; percentile: number; currentScore: number }) => {
    updateScores(scores);
  };

  return (
    <div className="flex justify-bewteen items-center w-full">
      <Card className="overflow-hidden transition-all hover:shadow-md w-full ">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <Image src="/html5.svg" alt="HTML5" width={48} height={48} />
            </div>
            <div className="flex-grow">
              <CardTitle className="text-lg font-bold">Hyper Text Markup Language</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1 text-md text-muted-foreground">
                Questions: 8 | Duration: 15 mins | Submitted on 5 June 2021
              </CardDescription>
            </div>
            <Button
              variant="default"
              className="bg-[#132277] hover:bg-blue-700 text-white dark:bg-[#3b82f6] dark:hover:bg-[#223399]"
              onClick={() => setDialogOpen(true)}
            >
              Update
            </Button>
          </div>
        </CardHeader>
      </Card>
      <UpdateScoresDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleUpdateScores}
      />
    </div>
  );
}