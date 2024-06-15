import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

const InputNumber = ({
  min = 1,
  max = 99,
  defaultValue = 1,
  onChange,
  label,
  desc,
  className,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    const newValue = value - 1;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    const newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const renderLabel = () => {
    return (
      <div className="flex flex-col">
        <span className="font-medium text-neutral-200">{label}</span>
        {desc && (
          <span className="text-xs text-neutral-400 font-normal">{desc}</span>
        )}
      </div>
    );
  };

  return (
    <div className={` flex items-center justify-between space-x-5 `}>
      {label && renderLabel()}
      <div className=" flex items-center justify-between w-[104px] sm:w-28">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400  bg-white  focus:outline-none hover:border-neutral-700 "
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <span className="select-none block flex-1 text-center leading-none">
          {value}
        </span>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400  bg-white focus:outline-none hover:border-neutral-700 "
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InputNumber;
