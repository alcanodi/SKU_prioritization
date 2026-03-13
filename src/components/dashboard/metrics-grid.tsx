
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductWithPriority } from '@/lib/types';

interface MetricsGridProps {
  data: ProductWithPriority[];
}

export function MetricsGrid({ data }: MetricsGridProps) {
  const priorities: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
  const risks: ('X' | 'Y' | 'Z')[] = ['X', 'Y', 'Z'];

  const getMetric = (reward: string, risk: string) => {
    const filtered = data.filter(d => d.priority === `${reward}${risk}`);
    const count = filtered.length;
    const profit = filtered.reduce((acc, curr) => acc + curr.scaledProfit, 0);
    return { count, profit };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-card/50 border-primary/20 overflow-hidden">
        <CardHeader className="py-3 bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-sm font-medium">Count of Items by Priority</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                {risks.map(r => <TableHead key={r} className="text-center font-bold text-primary">{r}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {priorities.map(p => (
                <TableRow key={p}>
                  <TableCell className="font-bold text-accent">{p}</TableCell>
                  {risks.map(r => (
                    <TableCell key={r} className="text-center">
                      {getMetric(p, r).count}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-primary/20 overflow-hidden">
        <CardHeader className="py-3 bg-accent/5 border-b border-accent/10">
          <CardTitle className="text-sm font-medium">Scaled Profit by Priority ($)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                {risks.map(r => <TableHead key={r} className="text-center font-bold text-primary">{r}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {priorities.map(p => (
                <TableRow key={p}>
                  <TableCell className="font-bold text-accent">{p}</TableCell>
                  {risks.map(r => (
                    <TableCell key={r} className="text-center tabular-nums">
                      {(getMetric(p, r).profit / 1000).toFixed(1)}k
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
