import { MultiSelect } from '../components/multi_select';

export default function Allergies(): JSX.Element {
  return <MultiSelect uri='https://api.whitelabelmd.com/drugbank/allergies.php?q=' />;
}
