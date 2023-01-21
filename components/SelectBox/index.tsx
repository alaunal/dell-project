import React from "react";
import { map } from "lodash";

const SelectBox = ({
  isLoading = false,
  data,
  placeholder = "Select",
  ...rest
}: any) => {
  return (
    <select
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      {...rest}
    >
      {isLoading ? (
        <option value="">Please wait ...</option>
      ) : (
        <>
          <option value="" key="Placeholder">
            {placeholder}
          </option>
          {map(data, (item: string, index: number) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default SelectBox;
