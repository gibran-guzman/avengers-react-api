import { Button } from '../../../components/ui/Button';
import { SelectField } from '../../../components/ui/SelectField';
import { TextField } from '../../../components/ui/TextField';

interface AvengersToolbarProps {
  search: string;
  team: string;
  status: string;
  onSearchChange: (value: string) => void;
  onTeamChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export function AvengersToolbar({
  search,
  team,
  status,
  onSearchChange,
  onTeamChange,
  onStatusChange,
  onReset,
}: AvengersToolbarProps) {
  return (
    <section className="toolbar" aria-label="Search and filter Avengers">
      <div className="toolbar__grid">
        <TextField
          label="Search"
          name="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, alias, or role"
        />
        <SelectField label="Team" name="team" value={team} onChange={(event) => onTeamChange(event.target.value)}>
          <option value="all">All teams</option>
          <option value="Avengers">Avengers</option>
          <option value="X-Men">X-Men</option>
          <option value="Guardians">Guardians</option>
          <option value="Fantastic Four">Fantastic Four</option>
          <option value="Solo">Solo</option>
        </SelectField>
        <SelectField
          label="Status"
          name="status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="all">All status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </SelectField>
      </div>
      <div>
        <Button type="button" variant="secondary" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </section>
  );
}
