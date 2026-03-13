# **App Name**: BevPulse Dashboard

## Core Features:

- Product Data Table: Display carbonated beverage product data, including Plant, LINE, Package, Category, Product, and configurable Priority fields in a tabular format.
- Data Export: Enable users to export the currently displayed product data table into a CSV format.
- Threshold Configuration: Provide editable input fields for defining Risk and Reward bounds (X, Y, Z for Risk; A, B, C for Reward). Adjustments dynamically impact product priority calculations.
- Interactive Slicers: Allow users to filter data using dedicated sections for Geography (Plant, LINE), Product (Package Category, Product), and Priority.
- Risk/Reward Scatter Plot: Visualize product data points on a dynamic scatter plot, showing Risk vs. Reward based on selected filters and threshold configurations.
- Aggregate Metrics Display: Show 'Count of Items' and 'Scaled Profit' in summary tables, dynamically updating based on current data filters and threshold categories.

## Style Guidelines:

- Dark scheme for a focused, professional data analysis environment. Primary color: A deep azure blue (#298CA3) to highlight interactive elements and key data points. Background color: A very dark desaturated blue-grey (#181B1C) to maintain visual hierarchy. Accent color: A vibrant aqua green (#4AD3B9) for high-contrast alerts and calls to action.
- Body and headline font: 'Inter' (sans-serif) for its modern, clean, and highly readable characteristics, suitable for detailed data displays and clear labeling.
- Use minimal, outline-style icons for filter and sort actions, emphasizing clarity and quick comprehension without visual clutter.
- Implement a structured, grid-based layout to organize distinct information sections (Thresholds, Slicers, Metrics, Graph, Table) logically, optimizing for quick scanning and hierarchical content presentation.
- Subtle, smooth transitions for data filtering, plot updates, and table re-renders to provide clear visual feedback without distracting from data analysis.