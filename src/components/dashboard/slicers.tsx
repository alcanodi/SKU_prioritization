
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface SlicerProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  onClear: () => void;
}

export function Slicer({ title, options, selected, onToggle, onClear }: SlicerProps) {
  return (
    <Card className="bg-card/30 border-primary/10">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Filter className="w-3 h-3" /> {title}
        </CardTitle>
        {selected.length > 0 && (
          <button onClick={onClear} className="text-[10px] text-primary hover:underline transition-all">
            Clear
          </button>
        )}
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <Badge
            key={option}
            variant={selected.includes(option) ? 'default' : 'outline'}
            className={`cursor-pointer text-[10px] transition-all hover:scale-105 ${
              selected.includes(option) 
                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                : 'bg-transparent text-muted-foreground border-muted-foreground/30 hover:border-primary/50'
            }`}
            onClick={() => onToggle(option)}
          >
            {option}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
