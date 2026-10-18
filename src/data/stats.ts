/** value is numeric for animated counters. placeholder values always carry an on-screen label.
 * Members are derived from the published roster. Never remove placeholder labels before confirming. */
import { publishedMembers } from './team';
export const stats = [
  {
    label: 'Students. One team.',
    value: publishedMembers.length,
    suffix: '',
    note: 'Current published roster',
    placeholder: false,
  },
  {
    label: 'Hours at the workbench',
    value: 120,
    suffix: '+',
    note: 'Illustrative · actual total to be confirmed',
    placeholder: true,
  }, // TODO: confirm.
  {
    label: 'Build iterations',
    value: 3,
    suffix: '',
    note: 'Illustrative · actual total to be confirmed',
    placeholder: true,
  }, // TODO: confirm.
  {
    label: 'Students reached',
    value: 100,
    suffix: '+',
    note: 'Illustrative · actual total to be confirmed',
    placeholder: true,
  }, // TODO: confirm.
];
