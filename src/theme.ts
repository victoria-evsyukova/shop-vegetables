import { createTheme } from "@mantine/core";

export const theme = createTheme({

  primaryColor: 'green',
  colors: {
    green: [
      '#f0f9f4',
      '#e1f2e9',
      '#c4e4d3',
      '#a3d5bb',
      '#88c8a6',
      '#76bf99',
      '#6bbb92',
      '#58a47d',
      '#4d9370',
      '#3d805f'
    ],
  },

  fontFamily: 'Inter, sans-serif',
  
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },

  components: {
    Card: {
      styles: {
        root: {
          width: 302,
          height: 414,
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: 16,
          boxSizing: 'border-box'
        }
      }
    },
  }

});