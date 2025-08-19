import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Box, Paper } from '@mui/material';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Initialize mermaid only once
    if (!isInitialized.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit',
        fontSize: 14,
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis',
        },
        sequence: {
          useMaxWidth: true,
          wrap: true,
        },
        gantt: {
          useMaxWidth: true,
        },
        journey: {
          useMaxWidth: true,
        },
        class: {
          useMaxWidth: true,
        },
        state: {
          useMaxWidth: true,
        },
        er: {
          useMaxWidth: true,
        },
      });
      isInitialized.current = true;
    }

    const renderChart = async () => {
      // Ensure the element exists before proceeding
      if (!elementRef.current) {
        console.warn('MermaidDiagram: Element ref is null, skipping render');
        return;
      }

      // Clear any existing content
      elementRef.current.innerHTML = '';

      // Validate chart content
      if (!chart || chart.trim() === '') {
        return;
      }

      // Generate a new unique ID for each render
      const uniqueId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      try {
        // Render the mermaid chart
        const { svg } = await mermaid.render(uniqueId, chart);

        // Double-check the element still exists after async operation
        if (!elementRef.current) {
          console.warn('MermaidDiagram: Element ref became null during render');
          return;
        }

        elementRef.current.innerHTML = svg;

        // Make the SVG responsive
        const svgElement = elementRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.width = '100%';
          svgElement.style.height = 'auto';
          svgElement.style.maxWidth = '100%';
        }
      } catch (error) {
        console.error('Error rendering Mermaid chart:', error);
      }
    };

    // Add a small delay to ensure the component is fully mounted
    const timeoutId = setTimeout(renderChart, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [chart]);
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        my: 2,
        overflow: 'auto',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        '& svg': {
          display: 'block',
          margin: '0 auto',
        },
        width: '100%',
      }}
    >
      <Box
        ref={elementRef}
        sx={{
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .mermaid': {
            width: '100%',
          },
        }}
      />
    </Paper>
  );
};

export default MermaidDiagram;
