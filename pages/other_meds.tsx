import { MultiSelect } from '../components/multi_select';

export default function OtherMeds(): JSX.Element {
  return <MultiSelect uri='https://api.whitelabelmd.com/drugbank/other_meds.php?q=' />;
}
