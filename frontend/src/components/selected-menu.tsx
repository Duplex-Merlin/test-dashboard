import { Option, Select } from "@material-tailwind/react";

export interface IOptions {
  value: string;
  label: string;
}

interface ISelectProps {
  options: IOptions[];
  label: string;
  value: (value: string) => void;
}

export function SelectedMenu({ options, label, value }: ISelectProps) {
  return (
    <div className="w-full">
      <Select placeholder={""} onChange={(item) => value(item!)} label={label}>
        {options.map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>
    </div>
  );
}
