import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SetupWizard } from '@/components/SetupWizard';
import { FACTIONS_DATA } from '@/data/factions';

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  CheckCircle2: () => <div data-testid="icon-check" />,
  Users: () => <div data-testid="icon-users" />,
  ShieldAlert: () => <div data-testid="icon-alert" />,
}));

// Mock Link since we are not in a router context
jest.mock('next/link', () => {
  const MockLink = ({ children }: { children: React.ReactNode }) => {
    return <span data-testid="link">{children}</span>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('SetupWizard Component', () => {
  beforeEach(() => {
    // Clear any mocks/storage if needed
  });

  it('renders correctly with default state (4 players)', () => {
    render(<SetupWizard />);
    expect(screen.getByText('Game Setup')).toBeInTheDocument();
    // Default 4 players
    expect(screen.getByRole('combobox')).toHaveValue('4');
  });

  it('validates setup correctly (2 players, needs militants)', () => {
    render(<SetupWizard />);

    // Change to 2 players
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });

    // Select 1 Militant (Marquise) and 1 Insurgent (Alliance)
    // Marquise Reach 10, Alliance Reach 3. Total 13.
    // 13 is below the 17+ minimum for any mix (Law 5.2).

    // Click Marquise
    fireEvent.click(screen.getByText('Marquise de Cat'));
    // Click Alliance
    fireEvent.click(screen.getByText('Woodland Alliance'));

    // Expect Invalid due to Low Reach (13 < 17)
    expect(screen.getByText(/Low Reach/)).toBeInTheDocument();
    expect(screen.getByText('Invalid Setup')).toBeInTheDocument();
  });

  it('shows valid setup when conditions met', () => {
    render(<SetupWizard />);

    // Default 4 players. Target Reach 21.
    // Select:
    // 1. Marquise (10, Militant)
    // 2. Eyrie (7, Militant)
    // 3. Duchy (8, Militant)
    // 4. Alliance (3, Insurgent)
    // Total: 28. Militants: 3. Valid.

    fireEvent.click(screen.getByText('Marquise de Cat'));
    fireEvent.click(screen.getByText('Eyrie Dynasties'));
    fireEvent.click(screen.getByText('Underground Duchy'));
    fireEvent.click(screen.getByText('Woodland Alliance'));

    expect(screen.queryByText(/Low Reach/)).not.toBeInTheDocument();
    expect(screen.getByText('Ready to Start')).toBeInTheDocument();

    // Check if Start Game button appeared
    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('detects too many factions selected', () => {
    render(<SetupWizard />);
    // 4 players
    fireEvent.click(screen.getByText('Marquise de Cat'));
    fireEvent.click(screen.getByText('Eyrie Dynasties'));
    fireEvent.click(screen.getByText('Underground Duchy'));
    fireEvent.click(screen.getByText('Woodland Alliance'));
    fireEvent.click(screen.getByText('Lizard Cult')); // 5th faction

    expect(screen.getByText(/Too many factions/)).toBeInTheDocument();
  });

  it('allows 17+ Reach below the recommendation with a warning (Law 5.2)', () => {
    render(<SetupWizard />);

    // Default 4 players, recommended Reach 21. Select:
    // 1. Eyrie Dynasties (7, Militant)
    // 2. Underground Duchy (8, Militant)
    // 3. Corvid Conspiracy (3, Insurgent)
    // 4. Lizard Cult (2, Insurgent)
    // Total: 20. Valid (17+ minimum), but below the recommended 21+.
    fireEvent.click(screen.getByText('Eyrie Dynasties'));
    fireEvent.click(screen.getByText('Underground Duchy'));
    fireEvent.click(screen.getByText('Corvid Conspiracy'));
    fireEvent.click(screen.getByText('Lizard Cult'));

    expect(screen.getByText('Ready to Start')).toBeInTheDocument();
    expect(screen.getByText(/Below the recommended 21\+/)).toBeInTheDocument();
    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('starts with the select at the playerCount prop', () => {
    render(<SetupWizard playerCount={5} />);
    expect(screen.getByRole('combobox')).toHaveValue('5');
  });
});
