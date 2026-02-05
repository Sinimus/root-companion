import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BattleWizard } from '@/components/BattleWizard';

// Mock Lucide icons to avoid rendering issues
jest.mock('lucide-react', () => ({
  Swords: () => <div data-testid="icon-swords" />,
  Dices: () => <div data-testid="icon-dices" />,
  AlertCircle: () => <div data-testid="icon-alert" />,
  ShieldAlert: () => <div data-testid="icon-shield-alert" />,
  Info: () => <div data-testid="icon-info" />,
  Shield: () => <div data-testid="icon-shield" />,
  Skull: () => <div data-testid="icon-skull" />,
  Flame: () => <div data-testid="icon-flame" />,
  Crown: () => <div data-testid="icon-crown" />,
}));

describe('BattleWizard Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupBattle = async (attackerId: string, defenderId: string, d1Val: number, d2Val: number) => {
    // Mock random for dice rolls (0-3)
    // Values passed should be 0, 1, 2, or 3
    // Math.floor(val * 4) -> 0..3. So input 0.99 -> 3. 0.0 -> 0.
    // We need to return values such that Math.floor(x * 4) equals desired value.
    // val / 4 + 0.1 works.
    
    const rand1 = (d1Val + 0.1) / 4;
    const rand2 = (d2Val + 0.1) / 4;
    
    jest.spyOn(Math, 'random')
      .mockReturnValueOnce(rand1)
      .mockReturnValueOnce(rand2);

    render(<BattleWizard defaultAttackerId={attackerId} onClose={mockOnClose} />);
    
    // Change defender if needed (default is usually valid but good to be explicit)
    // Note: The select logic might be tricky to target by label, so we rely on defaults or test IDs if added.
    // For this test suite, we will rely on default props or changing selects.
    
    // Since selects are simple, let's find them by display value or label if possible.
    // The component has "Attacker" and "Defender" labels.
    
    const defenderSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(defenderSelect, { target: { value: defenderId } });

    const fightButton = screen.getByText('FIGHT');
    await act(async () => {
        fireEvent.click(fightButton);
    });
  };

  it('calculates standard battle correctly (Attacker High)', async () => {
    // Cats (Attacker) vs Eyrie (Defender)
    // Roll 3, 1 -> Attacker 3, Defender 1
    await setupBattle('marquise', 'eyrie', 3, 1);
    
    const results = screen.getAllByText(/[0-9]+/); // Should find numbers in result boxes
    // We expect 3 and 1. The result boxes display these large numbers.
    // Checking specific structure:
    const attackerScore = screen.getByText('3', { selector: '.text-5xl' });
    const defenderScore = screen.getByText('1', { selector: '.text-5xl' });
    
    expect(attackerScore).toBeInTheDocument();
    expect(defenderScore).toBeInTheDocument();
  });

  it('applies Guerrilla War (Alliance Defender takes higher)', async () => {
    // Cats vs Alliance
    // Roll 3, 0 -> Standard: 3/0. Guerrilla: Attacker 0, Defender 3.
    await setupBattle('marquise', 'alliance', 3, 0);

    // Attacker gets lower (0), Defender gets higher (3)
    const scores = screen.getAllByText(/[0-9]+/, { selector: '.text-5xl' });
    expect(scores[0]).toHaveTextContent('0'); // Attacker box is first in DOM
    expect(scores[1]).toHaveTextContent('3'); // Defender box
    
    expect(screen.getByText(/Guerrilla War/)).toBeInTheDocument();
  });

  it('applies Defenseless bonus', async () => {
    // Cats vs Eyrie. Roll 1, 1 -> 1/1.
    // +1 Defenseless -> Attacker 2.
    
    // Setup first
    render(<BattleWizard defaultAttackerId="marquise" onClose={mockOnClose} />);
    
    // Click Defenseless checkbox
    const defenselessCheckbox = screen.getByLabelText(/Defenseless/); // Find by text inside label
    fireEvent.click(defenselessCheckbox);

    // Mock roll 1, 1
    jest.spyOn(Math, 'random').mockReturnValue(0.3); // 0.3 * 4 = 1.2 -> 1
    
    const fightButton = screen.getByText('FIGHT');
    fireEvent.click(fightButton);

    const scores = screen.getAllByText(/[0-9]+/, { selector: '.text-5xl' });
    expect(scores[0]).toHaveTextContent('2'); // 1 rolled + 1 bonus
    expect(screen.getByText(/Defenseless: \+1 Attacker Hit/)).toBeInTheDocument();
  });

  it('caps Vagabond hits based on swords', async () => {
    // Vagabond vs Cats. Roll 3, 0.
    // Default swords = 3. Let's reduce swords to 1.
    
    render(<BattleWizard defaultAttackerId="vagabond_1" onClose={mockOnClose} />);
    
    // Find sword controls
    // It's under "Undamaged Swords:"
    const minusBtn = screen.getByText('-');
    fireEvent.click(minusBtn); // 3 -> 2
    fireEvent.click(minusBtn); // 2 -> 1

    // Mock roll 3, 0
    jest.spyOn(Math, 'random')
        .mockReturnValueOnce(0.9) // 3
        .mockReturnValueOnce(0.1); // 0

    fireEvent.click(screen.getByText('FIGHT'));

    const scores = screen.getAllByText(/[0-9]+/, { selector: '.text-5xl' });
    expect(scores[0]).toHaveTextContent('1'); // Capped at 1 sword
    expect(screen.getByText(/Hits limited by number of swords/)).toBeInTheDocument();
  });

  it('correctly calculates Armorers (Defender takes 0 hits)', async () => {
    // Cats (Attacker) vs Eyrie. Roll 3, 0.
    // Armorers active -> Attacker hits should become 0.
    
    render(<BattleWizard defaultAttackerId="marquise" onClose={mockOnClose} />);
    
    // Open Advanced Cards
    fireEvent.click(screen.getByText('Advanced Cards'));
    // Activate Armorers
    fireEvent.click(screen.getByLabelText(/Armorers/));

    jest.spyOn(Math, 'random').mockReturnValueOnce(0.9).mockReturnValueOnce(0.1); // 3, 0
    fireEvent.click(screen.getByText('FIGHT'));

    const scores = screen.getAllByText(/[0-9]+/, { selector: '.text-5xl' });
    expect(scores[0]).toHaveTextContent('0'); // Attacker hit reduced to 0
    expect(screen.getByText(/Defender ignores ALL rolled hits taken/)).toBeInTheDocument();
  });

  it('correctly calculates Ambush (+2 Defender Hits)', async () => {
     render(<BattleWizard defaultAttackerId="marquise" onClose={mockOnClose} />);
     
     // Activate Ambush
     fireEvent.click(screen.getByLabelText(/Ambush!/));
     
     // Roll 1, 1
     jest.spyOn(Math, 'random').mockReturnValue(0.3); // 1
     fireEvent.click(screen.getByText('FIGHT'));
     
     const scores = screen.getAllByText(/[0-9]+/, { selector: '.text-5xl' });
     expect(scores[1]).toHaveTextContent('3'); // 1 rolled + 2 ambush
  });
});
