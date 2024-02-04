import { Option, Select } from "@material-tailwind/react";

export interface IOptions {
  value: string;
  label: string;
}

interface ISelectProps {
  options: IOptions[];

  value: (value: string) => void;
}

export function SelectedMenu({ options, value }: ISelectProps) {
  return (
    <div className="w-full">
      <Select
        placeholder={""}
        onChange={(item) => value(item!)}
        label="Select Role"
      >
        {options.map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>
    </div>
  );
}
