import { ScaleType } from '@swimlane/ngx-charts';

// Define a proper type for the color sets
interface ColorSet {
  name: string;
  domain: string[];
}

// Define a record to properly type the color schemes
export const COLOR_SETS: Record<string, ColorSet> = {
  'vivid': {
    name: 'vivid',
    domain: [
      '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a',
      '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
    ]
  },
  'natural': {
    name: 'natural',
    domain: [
      '#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6',
      '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3'
    ]
  },
  'cool': {
    name: 'cool',
    domain: [
      '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded',
      '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
    ]
  },
  'fire': {
    name: 'fire',
    domain: [
      '#ff3d00', '#ff6e40', '#ff9e80', '#ff5722', '#e64a19',
      '#f57c00', '#fb8c00', '#ff9800', '#ffb74d', '#ffcc80'
    ]
  },
  'nightLights': {
    name: 'nightLights',
    domain: [
      '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1',
      '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff'
    ]
  },
  'rich': {
    name: 'rich',
    domain: [
      '#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8A2BE2',
      '#1E88E5', '#D81B60', '#FFC107', '#00897B', '#7CB342'
    ]
  }
};

// Cache for color schemes to avoid recreation
const colorSchemeCache: Record<string, any> = {};

// The default color scheme to use if the requested one doesn't exist
const DEFAULT_COLOR_SCHEME = 'rich';

export function getColorScheme(name: string) {
  // Check cache first
  if (colorSchemeCache[name]) {
    return colorSchemeCache[name];
  }
  
  // Get the color set by name or use default
  const colorSet = COLOR_SETS[name] || COLOR_SETS[DEFAULT_COLOR_SCHEME];
  
  // Create a new object and cache it
  const scheme = {
    name: colorSet.name,
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [...colorSet.domain]
  };
  
  // Cache the result
  colorSchemeCache[name] = scheme;
  
  return scheme;
} 