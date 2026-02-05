export const LAW_EVENT_NAME = 'root:open-law';

export function openLaw(ruleId?: string) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent(LAW_EVENT_NAME, { detail: { ruleId } });
    window.dispatchEvent(event);
  }
}
