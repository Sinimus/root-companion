import { searchLaw } from '@/components/LawViewer';
import { LAW_FULL } from '@/data/law_full';

const ids = (query: string) => searchLaw(LAW_FULL, query).map(r => r.id);

describe('searchLaw', () => {
  it('finds a rule and its sub-rules by number', () => {
    expect(ids('8.4.1')).toEqual(['8.4.1', '8.4.1.I', '8.4.1.II', '8.4.1.III']);
  });

  it('does not match a longer chapter number', () => {
    expect(ids('6.5.1')).toEqual(['6.5.1']);
    expect(ids('7.4.1')).not.toContain('17.4.1');
  });

  it('finds everything beneath a subsection', () => {
    expect(ids('9.5')).toEqual(expect.arrayContaining(['9.5', '9.5.1', '9.5.8', '9.5.9']));
    expect(ids('9.5')).not.toContain('9.6.1');
  });

  it('accepts a list of rule numbers', () => {
    expect(ids('9.5.2, 9.5.6')).toEqual(['9.5.2', '9.5.6']);
  });

  it('includes lettered sub-rules of a roman sub-rule', () => {
    expect(ids('9.2.9.III')).toEqual(['9.2.9.III', '9.2.9.IIIa', '9.2.9.IIIb', '9.2.9.IIIc', '9.2.9.IIId']);
  });

  it('falls back to text search', () => {
    expect(ids('guerrilla war')).toContain('8.2.2');
  });
});
