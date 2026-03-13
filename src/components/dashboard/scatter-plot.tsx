
"use client";

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProductWithPriority, Thresholds } from '@/lib/types';

interface ScatterPlotProps {
  data: ProductWithPriority[];
  thresholds: Thresholds;
}

const PRIORITY_COLORS: Record<string, string> = {
  'AX': '#10b981', // Emerald 500
  'AY': '#059669', // Emerald 600
  'AZ': '#047857', // Emerald 700
  'BX': '#f59e0b', // Amber 500
  'BY': '#d97706', // Amber 600
  'BZ': '#b45309', // Amber 700
  'CX': '#ef4444', // Red 500
  'CY': '#dc2626', // Red 600
  'CZ': '#b91c1c', // Red 700
};

export function ScatterPlot({ data, thresholds }: ScatterPlotProps) {
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
            <span>Priority: <span className="font-bold" style={{ color: PRIORITY_COLORS[p.priority] }}>{p.priority}</span></span>
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
    <Card className="bg-card/50 border-primary/20 h-[500px]">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
          Risk vs Reward Matrix (Color coded by Priority)
          <div className="flex flex-wrap gap-2 text-[8px] normal-case font-normal max-w-[400px] justify-end">
            {Object.entries(PRIORITY_COLORS).map(([p, color]) => (
              <div key={p} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} /> {p}
              </div>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full pb-14">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2e30" />
            <XAxis type="number" dataKey="x" name="risk" unit="" domain={[0, 100]} stroke="#666" fontSize={10}>
              <Label value="Risk (Lower is better)" position="insideBottom" offset={-10} fill="#888" fontSize={10} />
            </XAxis>
            <YAxis type="number" dataKey="y" name="reward" unit="" domain={[0, 100]} stroke="#666" fontSize={10}>
              <Label value="Reward (Higher is better)" angle={-90} position="insideLeft" offset={0} fill="#888" fontSize={10} />
            </YAxis>
            <ZAxis type="number" dataKey="z" range={[40, 40]} />
            
            <ReferenceLine x={thresholds.riskX} stroke="#298CA3" strokeDasharray="5 5" strokeWidth={1} />
            <ReferenceLine x={thresholds.riskY} stroke="#298CA3" strokeDasharray="5 5" strokeWidth={1} />
            <ReferenceLine y={thresholds.rewardA} stroke="#4AD3B9" strokeDasharray="5 5" strokeWidth={1} />
            <ReferenceLine y={thresholds.rewardB} stroke="#4AD3B9" strokeDasharray="5 5" strokeWidth={1} />

            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              name="Products" 
              data={chartData} 
              animationDuration={500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.priority] || '#888'} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
