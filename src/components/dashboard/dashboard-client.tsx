
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_DATA, enrichWithPriority } from '@/lib/data-utils';
import { Thresholds, ProductData } from '@/lib/types';
import { Slicer } from './slicers';
import { ThresholdConfig } from './threshold-config';
import { MetricsGrid } from './metrics-grid';
import { ScatterPlot } from './scatter-plot';
import { ProductTable } from './product-table';
import { LayoutDashboard, Database, Activity, Map } from 'lucide-react';

export default function DashboardClient() {
  // Inicializamos con un array vacío para evitar discrepancias de hidratación entre servidor y cliente
  const [data, setData] = useState<ProductData[]>([]);
  
  const [thresholds, setThresholds] = useState<Thresholds>({
    rewardA: 80,
    rewardB: 50,
    riskX: 20,
    riskY: 50,
  });

  const [filters, setFilters] = useState({
    plants: [] as string[],
    lines: [] as string[],
    packages: [] as string[],
    categories: [] as string[],
    priorities: [] as string[],
  });

  // Cargamos los datos aleatorios solo después del montaje en el cliente
  useEffect(() => {
    setData(MOCK_DATA);
  }, []);

  const uniqueValues = useMemo(() => ({
    plants: Array.from(new Set(data.map(d => d.plant))).sort(),
    lines: Array.from(new Set(data.map(d => d.line))).sort(),
    packages: Array.from(new Set(data.map(d => d.package))).sort(),
    categories: Array.from(new Set(data.map(d => d.category))).sort(),
    priorities: ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ'],
  }), [data]);

  const enrichedData = useMemo(() => 
    enrichWithPriority(data, thresholds), 
  [data, thresholds]);

  const filteredData = useMemo(() => {
    return enrichedData.filter(item => {
      const matchPlant = filters.plants.length === 0 || filters.plants.includes(item.plant);
      const matchLine = filters.lines.length === 0 || filters.lines.includes(item.line);
      const matchPackage = filters.packages.length === 0 || filters.packages.includes(item.package);
      const matchCategory = filters.categories.length === 0 || filters.categories.includes(item.category);
      const matchPriority = filters.priorities.length === 0 || filters.priorities.includes(item.priority);
      return matchPlant && matchLine && matchPackage && matchCategory && matchPriority;
    });
  }, [enrichedData, filters]);

  const toggleFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(v => v !== value) 
        : [...prev[key], value]
    }));
  };

  const clearFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: [] }));
  };

  const totalProfit = useMemo(() => 
    filteredData.reduce((acc, curr) => acc + curr.scaledProfit, 0),
  [filteredData]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-6 gap-6 max-w-[1600px] mx-auto overflow-x-hidden">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-primary/20 pb-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-xl border border-primary/30">
            <LayoutDashboard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">SKU Prioritization Dashboard</h1>
            <p className="text-sm text-muted-foreground font-medium">Carbonated Beverage Product Analysis Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-6 bg-card/30 px-6 py-2 rounded-full border border-primary/10">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Total Products</span>
            <span className="text-lg font-bold text-primary">{filteredData.length}</span>
          </div>
          <div className="w-[1px] h-8 bg-primary/20" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Total Profit</span>
            <span className="text-lg font-bold text-accent">
              ${(totalProfit / 1000000).toFixed(2)}M
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Slicers and Thresholds */}
        <aside className="lg:col-span-3 flex flex-col gap-6 h-full">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Map className="w-4 h-4" /> Geography Filters
            </div>
            <Slicer 
              title="Plant" 
              options={uniqueValues.plants} 
              selected={filters.plants} 
              onToggle={(v) => toggleFilter('plants', v)} 
              onClear={() => clearFilter('plants')} 
            />
            <Slicer 
              title="Line" 
              options={uniqueValues.lines} 
              selected={filters.lines} 
              onToggle={(v) => toggleFilter('lines', v)} 
              onClear={() => clearFilter('lines')} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Database className="w-4 h-4" /> Product Details
            </div>
            <Slicer 
              title="Package" 
              options={uniqueValues.packages} 
              selected={filters.packages} 
              onToggle={(v) => toggleFilter('packages', v)} 
              onClear={() => clearFilter('packages')} 
            />
            <Slicer 
              title="Category" 
              options={uniqueValues.categories} 
              selected={filters.categories} 
              onToggle={(v) => toggleFilter('categories', v)} 
              onClear={() => clearFilter('categories')} 
            />
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Activity className="w-4 h-4" /> Priority Selection
            </div>
            <Slicer 
              title="Priority Zone" 
              options={uniqueValues.priorities} 
              selected={filters.priorities} 
              onToggle={(v) => toggleFilter('priorities', v)} 
              onClear={() => clearFilter('priorities')} 
            />
          </div>

          <ThresholdConfig thresholds={thresholds} setThresholds={setThresholds} />
        </aside>

        {/* Right Column: Visualization and Table */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          <MetricsGrid data={filteredData} />
          
          <div className="grid grid-cols-1 gap-6">
            <ScatterPlot data={filteredData} thresholds={thresholds} />
          </div>

          <ProductTable data={filteredData} />
        </main>
      </div>
    </div>
  );
}
