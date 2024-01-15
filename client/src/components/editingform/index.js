import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { MdDeleteForever } from "react-icons/md";
import { BsPlusSquareFill } from "react-icons/bs";

const EditingForm = ({ save, close, idx, data }) => {
  const [optionList, setOptionList] = useState([]);
  const [label, setLabel] = useState();
  const [newOptionLabel, setNewOptionLabel] = useState("New Option");
  const [newOptionValue, setNewOptionValue] = useState(optionList.length + 1);

  const [dataUpdated, setDataUpdated] = useState(data);
  console.log(dataUpdated);

  const handleAddOptions = () => {
    const newOption = {
      label: newOptionLabel,
      value: newOptionValue,
    };

    if (!dataUpdated.data.options || dataUpdated.data.options.length === 0) {
      setDataUpdated({
        ...dataUpdated,
        data: {
          ...dataUpdated.data,
          options: [newOption],
        },
      });
    } else {
      setOptionList((prevOptions) => [...prevOptions, newOption]);

      setDataUpdated({
        ...dataUpdated,
        data: {
          ...dataUpdated.data,
          options: [...dataUpdated.data.options, newOption],
        },
      });
    }

    // Set nilai default untuk opsi berikutnya
    setNewOptionLabel(`New Option `);
    setNewOptionValue("value");
  };

  const handleDeleteOptions = (idx) => {
    setDataUpdated((prevData) => {
      const updatedOptions = prevData.data.options.filter(
        (_, index) => index !== idx
      );
      return {
        ...prevData,
        data: {
          ...prevData.data,
          options: updatedOptions,
        },
      };
    });
  };

  const handleOptionLabelChange = (e, idx) => {
    const updatedOptions = [...dataUpdated.data.options];
    updatedOptions[idx].label = e.target.value;
    setDataUpdated({
      ...dataUpdated,
      data: {
        ...dataUpdated.data,
        options: updatedOptions,
      },
    });
  };

  const handleOptionValueChange = (e, idx) => {
    const updatedOptions = [...dataUpdated.data.options];
    updatedOptions[idx].value = e.target.value;
    setDataUpdated({
      ...dataUpdated,
      data: {
        ...dataUpdated.data,
        options: updatedOptions,
      },
    });
  };

  const handleChangeLabel = (e) => {
    setDataUpdated({
      ...dataUpdated,
      data: {
        ...dataUpdated.data,
        label: e.target.value,
      },
    });
  };

  const handleChangeRequire = () => {
    setDataUpdated({
      ...dataUpdated,
      required: !dataUpdated.required,
    });
  };

  return (
    <div className="bg-white p-2 text-navy-700 dark:bg-navy-800 dark:text-white">
      <div className="flex items-center gap-2">
        <span className="inline px-2">Wajib diisi?</span>
        <Checkbox
          onChange={handleChangeRequire}
          checked={dataUpdated.required}
          color="green"
          extra="inline"
        />
      </div>
      <InputField
        onChange={(e) => handleChangeLabel(e)}
        label="Judul"
        placeholder="masukan judul field"
      />
      {dataUpdated.type === "DropDownSelect" && (
        <div className="mx-2 mt-4 border border-gray-500 py-4">
          <p className="mb-2 text-center text-base font-semibold">
            Pilihan Jawaban
          </p>
          {dataUpdated.data.options?.map((e, i) => {
            const genap = i % 2 === 0;
            return (
              <div
                key={i}
                className={`${
                  genap ? "bg-gray-50 dark:bg-navy-700" : ""
                } mt-2 grid grid-cols-12 items-center justify-center  md:gap-8 py-2 px-4`}
              >
                <div className="col-span-12 md:col-span-5">
                  <InputField
                    label={`label ${i + 1}`}
                    placeholder="masukan pilihan"
                    value={e.label}
                    onChange={(e) => handleOptionLabelChange(e, i)}
                  />
                </div>
                <div className="col-span-12 md:col-span-5">
                  <InputField
                    label={`value ${i + 1}`}
                    placeholder="masukan value"
                    value={e.value}
                    onChange={(e) => handleOptionValueChange(e, i)}
                  />
                </div>
                <div className="col-span-12  mb-2 self-end md:col-span-2">
                  <button
                    onClick={() => handleDeleteOptions(i)}
                    className="linear mt-2 w-fit rounded-sm bg-red-600 px-2 py-[4px] text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-800"
                  >
                    Hapus Opsi
                  </button>
                </div>
              </div>
            );
          })}
          <button
            onClick={handleAddOptions}
            className="mx-auto mt-4 flex rounded-lg border border-gray-700 p-2 text-center dark:border-white"
          >
            <span>
              Tambah Pilihan <BsPlusSquareFill className="inline" />
            </span>
          </button>
        </div>
      )}

      <div className="mx-auto flex items-center justify-center gap-2 px-8 ">
        <button
          onClick={close}
          className="linear mt-2 w-full rounded-xl  border py-[8px] text-base  font-medium transition duration-200"
        >
          Batal
        </button>
        <button
          onClick={() => {
            save(dataUpdated, idx);
            close();
          }}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[8px]  text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default EditingForm;
