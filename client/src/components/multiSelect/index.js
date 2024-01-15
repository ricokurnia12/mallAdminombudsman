import React from "react";
// import ModalMulti from "./Modals/ModalMulti";

const MultiSelect = ({
  label,
  id,
  extra,
  placeholder,

  required,
  data,

  disabled,
  // Tambahkan properti options untuk menerima array dari item-item yang ingin ditampilkan
}) => {
  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className="mb-2 ml-1.5 block text-sm font-bold text-navy-700 dark:text-white"
      >
        {label} {required && <sup>*</sup>}
      </label>
      <select
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
      >
        <option selected>{placeholder}</option>
        {data.data.options?.map((option, index) => (
          <option className="text-navy-700" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* <ModalMulti /> */}
    </div>
  );
};

export default MultiSelect;
