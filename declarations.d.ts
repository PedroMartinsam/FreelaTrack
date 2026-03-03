// Augment missing types for victory-native
// victory-native doesn't ship its own declarations for common components.
// Re-export from the `victory` package which already has types.

declare module 'victory-native' {
  import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryPie,
    VictoryBar,
    VictoryAxis,
    VictoryThemeDefinition,
    VictoryCommonProps,
  } from 'victory';
  export {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryPie,
    VictoryBar,
    VictoryAxis,
    VictoryThemeDefinition,
    VictoryCommonProps,
  };
  // add any other exports as needed
}

// extend the original victory types so JSX children are allowed on charts
declare module 'victory' {
  interface VictoryChartProps {
    children?: React.ReactNode;
  }
}
