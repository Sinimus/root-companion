import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { GlobalTools } from '@/components/GlobalTools';
import { LAW_EVENT_NAME } from '@/utils/events';

jest.mock('@/components/LawViewerModal', () => ({
  LawViewerModal: ({ initialQuery }: { initialQuery?: string }) => (
    <div data-testid="law-modal">law:{initialQuery}</div>
  ),
}));
jest.mock('@/components/GlossaryModal', () => ({
  GlossaryModal: () => <div data-testid="glossary-modal" />,
}));
jest.mock('@/components/BattleWizard', () => ({
  BattleWizard: () => <div data-testid="battle-modal" />,
}));

describe('GlobalTools', () => {
  it('renders no modal until a tool is opened', () => {
    render(<GlobalTools />);
    expect(screen.queryByTestId('law-modal')).toBeNull();
    expect(screen.queryByTestId('glossary-modal')).toBeNull();
    expect(screen.queryByTestId('battle-modal')).toBeNull();
  });

  it('gives the icon-only tool buttons accessible names', () => {
    render(<GlobalTools />);
    expect(screen.getByRole('button', { name: 'The Law of Root' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Glossary Reference' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Quick Battle' })).toBeTruthy();
  });

  it('loads the glossary modal on demand', async () => {
    render(<GlobalTools />);
    fireEvent.click(screen.getByRole('button', { name: 'Glossary Reference' }));
    expect(await screen.findByTestId('glossary-modal')).toBeTruthy();
  });

  it('opens the Law modal with the rule id from the law event', async () => {
    render(<GlobalTools />);
    act(() => {
      window.dispatchEvent(new CustomEvent(LAW_EVENT_NAME, { detail: { ruleId: '4.3.5' } }));
    });
    expect((await screen.findByTestId('law-modal')).textContent).toBe('law:4.3.5');
  });
});
