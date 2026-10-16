import React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { Tooltip } from '@/components/Tooltip';

// jsdom's PointerEvent may ignore the pointerType init property, so force it on the event.
// React derives onPointerEnter/Leave from pointerover/pointerout.
const firePointerEvent = (
  el: Element,
  eventName: 'pointerOver' | 'pointerOut',
  pointerType: string,
) => {
  const event = createEvent[eventName](el, { pointerType });
  Object.defineProperty(event, 'pointerType', { value: pointerType });
  fireEvent(el, event);
};

describe('Tooltip Component', () => {
  const getTrigger = () => screen.getByRole('button', { name: 'More information' });

  it('is not visible initially', () => {
    render(<Tooltip text="Some help" />);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens on click and closes on a second click', () => {
    render(<Tooltip text="Some help" />);
    const trigger = getTrigger();

    fireEvent.click(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens on focus and closes on blur', () => {
    render(<Tooltip text="Some help" />);
    const trigger = getTrigger();

    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.blur(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('closes on Escape', () => {
    render(<Tooltip text="Some help" />);
    fireEvent.click(getTrigger());
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('closes on a pointerdown outside but not inside', () => {
    render(<Tooltip text="Some help" />);
    const trigger = getTrigger();

    fireEvent.click(trigger);
    fireEvent.pointerDown(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens on mouse pointerenter and closes on pointerleave', () => {
    render(<Tooltip text="Some help" />);
    const trigger = getTrigger();

    firePointerEvent(trigger, 'pointerOver', 'mouse');
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    firePointerEvent(trigger, 'pointerOut', 'mouse');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not open on a touch pointerenter', () => {
    render(<Tooltip text="Some help" />);
    const trigger = getTrigger();

    firePointerEvent(trigger, 'pointerOver', 'touch');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('points aria-describedby at the tooltip id while open', () => {
    render(<Tooltip text="Some help" />);
    const trigger = getTrigger();

    expect(trigger).not.toHaveAttribute('aria-describedby');

    fireEvent.click(trigger);
    const tooltip = screen.getByRole('tooltip');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });
});
