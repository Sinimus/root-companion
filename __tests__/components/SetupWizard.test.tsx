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
  return ({ children }: { children: React.ReactNode }) => {
    return <span data-testid="link">{children}</span>;
  };
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
    // Target for 2 players is 17.
    // Also needs 2 militants? Wait, AdSet logic says "2 players: Only militant factions".
    // But SetupWizard uses standard reach calculation logic generally.
    // Let's check SetupWizard logic: 
    // "militants < 1" -> Valid = false.
    // "reach < target" -> Valid = false.
    
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
});
