
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Package2 } from 'lucide-react';
import { ProductWithPriority } from '@/lib/types';
import { convertToCSV, downloadCSV } from '@/lib/data-utils';

interface ProductTableProps {
  data: ProductWithPriority[];
}

export function ProductTable({ data }: ProductTableProps) {
  const handleExport = () => {
    const csv = convertToCSV(data);
    downloadCSV(csv, `BevPulse_Export_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-primary/10 mb-2">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Package2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Product Catalog</CardTitle>
            <p className="text-xs text-muted-foreground">{data.length} products total</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExport}
          className="gap-2 text-xs border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-all"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </Button>
      </CardHeader>
      <CardContent className="p-0 max-h-[500px] overflow-auto">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="text-xs font-bold uppercase py-3">Plant</TableHead>
              <TableHead className="text-xs font-bold uppercase py-3">Line</TableHead>
              <TableHead className="text-xs font-bold uppercase py-3">Package</TableHead>
              <TableHead className="text-xs font-bold uppercase py-3">Category</TableHead>
              <TableHead className="text-xs font-bold uppercase py-3">Product</TableHead>
              <TableHead className="text-xs font-bold uppercase py-3 text-center">Priority</TableHead>
              <TableHead className="text-xs font-bold uppercase py-3 text-right">Scaled Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="hover:bg-primary/5 transition-colors group">
                <TableCell className="text-xs py-2">{item.plant}</TableCell>
                <TableCell className="text-xs py-2">{item.line}</TableCell>
                <TableCell className="text-xs py-2 text-muted-foreground">{item.package}</TableCell>
                <TableCell className="text-xs py-2 font-medium">{item.category}</TableCell>
                <TableCell className="text-xs py-2 font-bold group-hover:text-primary transition-colors">{item.product}</TableCell>
                <TableCell className="text-xs py-2 text-center">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    item.priority.startsWith('A') ? 'bg-accent/20 text-accent border border-accent/30' : 
                    item.priority.startsWith('B') ? 'bg-primary/20 text-primary border border-primary/30' : 
                    'bg-muted text-muted-foreground border border-muted-foreground/30'
                  }`}>
                    {item.priority}
                  </span>
                </TableCell>
                <TableCell className="text-xs py-2 text-right tabular-nums font-mono">
                  ${item.scaledProfit.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
