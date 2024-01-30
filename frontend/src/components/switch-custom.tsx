import { Switch } from "@material-tailwind/react";
interface SwitchCustomProps {
  isActive: boolean;
  onSwitch: () => void;
}

export function SwitchCustom({ isActive, onSwitch }: SwitchCustomProps) {
  return (
    <Switch
      id="custom-switch-component"
      ripple={isActive}
      className="h-full w-full checked:bg-light-blue-700"
      containerProps={{
        className: "w-11 h-6",
      }}
      circleProps={{
        className: "before:hidden left-0.5 border-none",
      }}
      crossOrigin={""}
      onClick={onSwitch}
    />
  );
}
