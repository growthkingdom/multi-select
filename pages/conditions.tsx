import { MultiSelect } from '../components/multi_select';

export default function Conditions(): JSX.Element {
  return <MultiSelect uri='https://api.whitelabelmd.com/drugbank/conditions.php?q=' />;
}
