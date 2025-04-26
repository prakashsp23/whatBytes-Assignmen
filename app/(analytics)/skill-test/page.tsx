'use client';

import React from "react";
import HtmlCard from "../../../components/skill-test/htmlcard";
import { QuickStatsCard } from "../../../components/skill-test/QuickStatsCard";
import ComparisonGraph from "../../../components/skill-test/graphCard";
import QuestionAnalysisCard from "../../../components/skill-test/questionAnalysis";
import RecentTests from "@/components/skill-test/RecentTests";
import { SkillTestProvider } from "@/contexts/SkillTestContext";

const SkillTestPage = () => {
  return (
    <SkillTestProvider>
      <div className="container mx-auto p-6 space-y-6">
        {/* Top section with HTML card */}
        <h1>Skill Test</h1>
        {/* Middle section with stats and graph */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <HtmlCard />
            {/* Quick Stats */}
            <QuickStatsCard />
            {/* Comparison Graph */}
            <ComparisonGraph />
          </div>

          {/* Right section */}
          <div className="space-y-6">
            {/* Syllabus Analysis */}
            <RecentTests />
            {/* Question Analysis */}
            <QuestionAnalysisCard />
          </div>
        </div>
      </div>
    </SkillTestProvider>
  );
};

export default SkillTestPage;
