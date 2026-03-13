
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
  'AX': '#22c55e', // Verde (Alta Recompensa, Bajo Riesgo)
  'AY': '#84cc16', 
  'AZ': '#fbbf24', 
  'BX': '#3b82f6', // Azul
  'BY': '#6366f1', 
  'BZ': '#a855f7', 
  'CX': '#ef4444', // Rojo (Baja Recompensa)
  'CY': '#f97316', 
  'CZ': '#78716c', 
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
            <span>Risk: {p.risk}%</span>
            <span>Reward: {p.reward}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card/50 border-primary/20 h-[600px]">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground text-center">
          Risk vs Reward Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-full pb-16 pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="risk" 
              domain={[0, 100]} 
              stroke="#888" 
              fontSize={10} 
              tickFormatter={(v) => `${v}%`}
            >
              <Label value="Risk" position="insideBottom" offset={-10} fill="#aaa" fontSize={12} fontWeight="bold" />
            </XAxis>
            <YAxis 
              type="number" 
              dataKey="y" 
              name="reward" 
              domain={[0, 100]} 
              stroke="#888" 
              fontSize={10}
              tickFormatter={(v) => `${v}%`}
            >
              <Label value="Reward" angle={-90} position="insideLeft" offset={0} fill="#aaa" fontSize={12} fontWeight="bold" />
            </YAxis>
            <ZAxis type="number" dataKey="z" range={[50, 50]} />
            
            <ReferenceLine x={thresholds.riskX} stroke="#666" strokeDasharray="5 5" />
            <ReferenceLine x={thresholds.riskY} stroke="#666" strokeDasharray="5 5" />
            <ReferenceLine y={thresholds.rewardA} stroke="#666" strokeDasharray="5 5" />
            <ReferenceLine y={thresholds.rewardB} stroke="#666" strokeDasharray="5 5" />

            <Tooltip content={<CustomTooltip />} />
            <Scatter name="Products" data={chartData}>
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
