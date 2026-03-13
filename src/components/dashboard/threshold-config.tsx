
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Thresholds } from '@/lib/types';

interface ThresholdConfigProps {
  thresholds: Thresholds;
  setThresholds: (t: Thresholds) => void;
}

export function ThresholdConfig({ thresholds, setThresholds }: ThresholdConfigProps) {
  const handleChange = (field: keyof Thresholds, value: string) => {
    const numValue = parseFloat(value) || 0;
    setThresholds({ ...thresholds, [field]: numValue });
  };

  return (
    <Card className="h-full bg-card/50 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Threshold Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="text-xs font-bold text-accent uppercase">Reward Thresholds</div>
          <div className="grid gap-2">
            <Label htmlFor="rewardA" className="text-xs">Level A (Reward &ge;)</Label>
            <Input
              id="rewardA"
              type="number"
              value={thresholds.rewardA}
              onChange={(e) => handleChange('rewardA', e.target.value)}
              className="h-8 text-xs bg-background/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rewardB" className="text-xs">Level B (Reward &ge;)</Label>
            <Input
              id="rewardB"
              type="number"
              value={thresholds.rewardB}
              onChange={(e) => handleChange('rewardB', e.target.value)}
              className="h-8 text-xs bg-background/50"
            />
          </div>
          <div className="text-[10px] text-muted-foreground italic">C is default fallback</div>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-bold text-primary uppercase">Risk Thresholds</div>
          <div className="grid gap-2">
            <Label htmlFor="riskX" className="text-xs">Level X (Risk &le;)</Label>
            <Input
              id="riskX"
              type="number"
              value={thresholds.riskX}
              onChange={(e) => handleChange('riskX', e.target.value)}
              className="h-8 text-xs bg-background/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="riskY" className="text-xs">Level Y (Risk &le;)</Label>
            <Input
              id="riskY"
              type="number"
              value={thresholds.riskY}
              onChange={(e) => handleChange('riskY', e.target.value)}
              className="h-8 text-xs bg-background/50"
            />
          </div>
          <div className="text-[10px] text-muted-foreground italic">Z is default fallback</div>
        </div>
      </CardContent>
    </Card>
  );
}
