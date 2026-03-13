
"use client";

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProductWithPriority, Thresholds } from '@/lib/types';

interface ScatterPlotProps {
  data: ProductWithPriority[];
  thresholds: Thresholds;
}

export function ScatterPlot({ data, thresholds }: ScatterPlotProps) {
  // Define zones for coloring or labeling if needed
  const chartData = data.map(item => ({
    ...item,
    name: item.product,
    x: item.risk,
    y: item.reward,
    z: 10
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-2xl text-xs space-y-1">
          <p className="font-bold text-primary">{p.product}</p>
          <p className="text-muted-foreground">{p.category} | {p.package}</p>
          <div className="flex justify-between gap-4 pt-1 border-t border-border mt-1">
            <span>Priority: <span className="font-bold text-accent">{p.priority}</span></span>
            <span>Profit: <span className="font-bold">${p.scaledProfit.toLocaleString()}</span></span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Risk: {p.risk}</span>
            <span>Reward: {p.reward}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card/50 border-primary/20 h-[450px]">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex justify-between">
          Risk vs Reward Matrix
          <div className="flex gap-4 text-[10px] normal-case font-normal">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Products</div>
            <div className="flex items-center gap-1"><div className="w-4 h-[1px] bg-primary/30" /> Thresholds</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full pb-10">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2e30" />
            <XAxis type="number" dataKey="x" name="risk" unit="" domain={[0, 100]} stroke="#666" fontSize={10}>
              <Label value="Risk (Lower is better)" position="insideBottom" offset={-10} fill="#888" fontSize={10} />
            </XAxis>
            <YAxis type="number" dataKey="y" name="reward" unit="" domain={[0, 100]} stroke="#666" fontSize={10}>
              <Label value="Reward (Higher is better)" angle={-90} position="insideLeft" offset={0} fill="#888" fontSize={10} />
            </YAxis>
            <ZAxis type="number" dataKey="z" range={[50, 400]} />
            
            {/* Reference Lines for Thresholds */}
            <ReferenceLine x={thresholds.riskX} stroke="#298CA3" strokeDasharray="5 5" strokeWidth={1} label={{ value: 'X Limit', position: 'top', fill: '#298CA3', fontSize: 10 }} />
            <ReferenceLine x={thresholds.riskY} stroke="#298CA3" strokeDasharray="5 5" strokeWidth={1} label={{ value: 'Y Limit', position: 'top', fill: '#298CA3', fontSize: 10 }} />
            <ReferenceLine y={thresholds.rewardA} stroke="#4AD3B9" strokeDasharray="5 5" strokeWidth={1} label={{ value: 'A Level', position: 'right', fill: '#4AD3B9', fontSize: 10 }} />
            <ReferenceLine y={thresholds.rewardB} stroke="#4AD3B9" strokeDasharray="5 5" strokeWidth={1} label={{ value: 'B Level', position: 'right', fill: '#4AD3B9', fontSize: 10 }} />

            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              name="Products" 
              data={chartData} 
              fill="#298CA3" 
              stroke="#4AD3B9" 
              strokeWidth={1}
              animationDuration={500}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
