
"use client";

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProductWithPriority, Thresholds } from '@/lib/types';

interface ScatterPlotProps {
  data: ProductWithPriority[];
  thresholds: Thresholds;
}

// Colores basados en la imagen de referencia (Rojos, Naranjas, Púrpuras)
const PRIORITY_COLORS: Record<string, string> = {
  'AX': '#660000', // Marrón oscuro/Rojo (Alta Recompensa, Bajo Riesgo)
  'AY': '#aa0000', // Rojo medio
  'AZ': '#ee0000', // Rojo brillante
  'BX': '#994400', // Naranja oscuro/Bronce (Media Recompensa)
  'BY': '#ff7700', // Naranja
  'BZ': '#ffbb88', // Naranja claro/Durazno
  'CX': '#440044', // Púrpura oscuro (Baja Recompensa)
  'CY': '#aa00aa', // Magenta
  'CZ': '#ee88ee', // Rosa claro/Violeta
};

export function ScatterPlot({ data, thresholds }: ScatterPlotProps) {
  const chartData = data.map(item => ({
    ...item,
    name: item.product,
    x: item.risk,
    y: item.reward,
    z: 15 // Puntos ligeramente más grandes como en la imagen
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
    <Card className="bg-card/50 border-primary/20 h-[600px] relative overflow-hidden">
      {/* Leyenda estilo cuadro superior izquierda */}
      <div className="absolute top-4 left-24 z-20 bg-background/90 border-2 border-foreground p-3 rounded-sm shadow-md grid grid-cols-2 gap-x-6 gap-y-1">
        {Object.entries(PRIORITY_COLORS).map(([p, color]) => (
          <div key={p} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-bold text-foreground">{p}</span>
          </div>
        ))}
      </div>

      <CardHeader className="pb-0 pt-6">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground text-center">
          Risk vs Reward Analysis (Scatter Distribution)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-full pb-16 pt-10">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="1 1" stroke="#333" />
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
            <ZAxis type="number" dataKey="z" range={[30, 30]} />
            
            {/* Líneas de umbral sutiles */}
            <ReferenceLine x={thresholds.riskX} stroke="#555" strokeDasharray="3 3" />
            <ReferenceLine x={thresholds.riskY} stroke="#555" strokeDasharray="3 3" />
            <ReferenceLine y={thresholds.rewardA} stroke="#555" strokeDasharray="3 3" />
            <ReferenceLine y={thresholds.rewardB} stroke="#555" strokeDasharray="3 3" />

            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              name="Products" 
              data={chartData} 
              isAnimationActive={true}
              animationDuration={1000}
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
