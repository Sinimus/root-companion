import React from 'react';
import { render, screen } from '@testing-library/react';
import { MapVisualizer } from '@/components/MapVisualizer';
import { MAPS } from '@/data/maps';
import { Suit } from '@/types/engine';

describe('MapVisualizer', () => {
  Object.values(MAPS).forEach((map) => {
    it(`renders ${map.name} with 12 clearings, 4 corners, its ruins and an accessible name`, () => {
      const { container } = render(<MapVisualizer mapId={map.id} />);

      expect(container.querySelectorAll('[data-clearing]')).toHaveLength(12);
      expect(container.querySelectorAll('[data-corner="true"]')).toHaveLength(4);
      expect(container.querySelectorAll('[data-ruin="true"]')).toHaveLength(
        map.clearings.filter((c) => c.hasRuin).length,
      );

      const svg = container.querySelector('svg[role="img"]');
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute('aria-label')).toContain(map.name);
    });

    it(`shows the map-specific legend keys only where they belong (${map.name})`, () => {
      render(<MapVisualizer mapId={map.id} />);

      expect(screen.queryByText('Closed path') !== null).toBe(map.id === 'mountain');
      expect(screen.queryByText('Pass') !== null).toBe(map.id === 'mountain');
      expect(screen.queryByText('Ferry start') !== null).toBe(map.id === 'lake');
    });
  });

  it('lists the dealt suit markers per suit in the legend', () => {
    const suitMapping: Record<number, Suit> = {
      1: 'fox',
      5: 'fox',
      9: 'fox',
      2: 'rabbit',
      6: 'rabbit',
      10: 'rabbit',
      3: 'mouse',
      7: 'mouse',
      11: 'mouse',
      4: 'bird',
      8: 'bird',
      12: 'bird',
    };
    render(<MapVisualizer mapId="winter" suitMapping={suitMapping} />);

    expect(screen.getByText('Fox: 1, 5, 9')).toBeInTheDocument();
    expect(screen.getByText('Rabbit: 2, 6, 10')).toBeInTheDocument();
    expect(screen.getByText('Mouse: 3, 7, 11')).toBeInTheDocument();
    expect(screen.getByText('Bird: 4, 8, 12')).toBeInTheDocument();
  });
});
