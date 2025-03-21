# Data Visualization Dashboard

An interactive data visualization dashboard built with Angular, NgRx for state management, and ngx-charts for visualizations.

![Dashboard Screenshot](screenshot.png)

## Features

- **Dynamic Chart Loading**: Different visualization components (bar charts, line graphs, pie charts, etc.) are loaded dynamically based on user selection.
- **State Management**: NgRx is used to manage application state, including data selections, current visualizations, and applied filters.
- **Responsive Design**: The dashboard is fully responsive and provides a seamless experience across different devices.
- **Customizable**: Users can select which data metrics to display and customize the color scheme.

## Technology Stack

- **Angular**: Frontend framework
- **NgRx**: State management
- **Angular Material**: UI components
- **ngx-charts**: Chart visualizations
- **RxJS**: Reactive programming

## Installation and Setup

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/data-visualization-dashboard.git
   cd data-visualization-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Navigate to `http://localhost:4200/` in your browser.
src/
├── app/
│   ├── core/                 # Core module (services, models, store)
│   │   ├── models/           # Data models
│   │   ├── services/         # API services
│   │   └── store/            # NgRx store
│   │       ├── actions/
│   │       ├── effects/
│   │       ├── reducers/
│   │       └── selectors/
│   ├── features/             # Feature modules
│   │   └── dashboard/        # Dashboard feature
│   │       └── components/   # Chart components
│   └── shared/               # Shared module
├── assets/                   # Static assets
│   └── data/                 # Mock data
└── styles/                   # Global styles
```

## Design Choices

### State Management with NgRx

NgRx was chosen for state management to handle:
- Tracking selected metrics
- Managing data loading states
- Persisting visualization preferences

### Dynamic Component Loading

The application uses a component-based architecture to dynamically load chart types:
- Each chart type is encapsulated in its own component
- A dynamic chart component serves as a wrapper, rendering the appropriate chart based on data type

### Responsive Design

The dashboard is built with a responsive approach:
- Flexible layout using Flexbox
- Breakpoints for different screen sizes
- Charts that resize based on available space

## Available Charts

- Bar Charts: For comparing values across categories
- Line Charts: For showing trends over time
- Pie Charts: For showing proportions of a whole
- Gauge Charts: For displaying performance metrics
- Advanced Pie Charts: For more detailed proportion views

## Running Tests

Run the following command to execute unit tests:

```bash
npm test
```
***Screenshots are kept in the screenshot folder in the public global folder.
