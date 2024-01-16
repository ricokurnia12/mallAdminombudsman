import { useState } from "react";
import InputField from "components/fields/InputField";
import { BsPlusSquareFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import MultiSelect from "components/multiSelect";

import { dataForm } from "./DataForm";
import EditingForm from "components/editingform";
import QuestionList from "./QuestionList";
const FormBuilder = () => {
  const [listQuestions, setListQuestions] = useState([
    {
      type: "TextField",
      required: true,
      data: {
        label: "Pertanyaan 1",
      },
    },
    {
      type: "TextField",
      required: true,
      data: {
        label: "Pertanyaan 2",
      },
    },
    {
      type: "DropDownSelect",
      required: false,
      data: {
        label: "Pertanyaan 3",
        options: [
          {
            label: "Pilihan 1",
            value: 1,
          },
          {
            label: "Pilihan 2",
            value: 2,
          },
        ],
      },
    },
  ]);

  const [openEdit, setOpenEdit] = useState();

  const onDragStart = (event, componentType) => {
    event.dataTransfer.setData("componentType", componentType);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData("componentType");

    // Tambahkan data baru ke dalam array yang sudah ada
    switch (componentType) {
      case "DropDownSelect":
        setListQuestions([
          ...listQuestions,
          {
            type: "DropDownSelect",
            required: false,
            data: {
              label: `Pertanyaan ${listQuestions.length + 1}`,
              options: [
                {
                  label: "Pilihan 1",
                  value: 1,
                },
                {
                  label: "Pilihan 2",
                  value: 2,
                },
              ],
            },
          },
        ]);

        break;

      case "TextField":
        setListQuestions([
          ...listQuestions,
          {
            type: "TextField",
            required: true,
            data: {
              label: `Pertanyaan ${listQuestions.length + 1}`,
            },
          },
        ]);

        break;
      case "DatePicker":
        setListQuestions([
          ...listQuestions,
          {
            type: "DatePicker",
            required: true,
            data: {
              label: `Pertanyaan ${listQuestions.length + 1}`,
            },
          },
        ]);
        break;
      case "RadioMultiple":
        setListQuestions([
          ...listQuestions,
          {
            type: "RadioMultiple",
            required: false,
            data: {
              label: `Pertanyaan ${listQuestions.length + 1}`,
              options: [
                {
                  label: "Pilihan 1",
                  value: 1,
                },
                {
                  label: "Pilihan 2",
                  value: 2,
                },
              ],
            },
          },
        ]);

        break;
      default:
    }

    // setListQuestions([
    //   ...listQuestions,
    //   { type: componentType, label: "Default Label" },
    // ]);

    console.log("Component dropped:", componentType);
  };

  const onDragStartIdx = (event, index) => {
    event.dataTransfer.setData("dragIndex", index.toString());
  };

  const onDragOverIdx = (event, index) => {
    event.preventDefault();
  };

  const onDropIdx = (event, dropIndex) => {
    event.preventDefault();
    const dragIndex = event.dataTransfer.getData("dragIndex");
    const newList = Array.from(listQuestions);

    const draggedItem = newList[dragIndex];
    newList.splice(dragIndex, 1);
    newList.splice(dropIndex, 0, draggedItem);

    setListQuestions(newList);
  };

  const removeField = (index) => {
    const updatedList = listQuestions.filter((_, i) => i !== index);
    setListQuestions(updatedList);
  };

  const handleUpdateListQuestion = (data, index) => {
    console.log(data);
    // Buat salinan array
    const updatedList = [...listQuestions];

    // Edit data pada indeks tertentu
    updatedList[index] = data;
    setListQuestions(updatedList);
  };

  const handleOpenEdit = (i) => {
    setOpenEdit(i);
  };

  const handleCloseEdit = () => setOpenEdit();

  // Tetapkan salinan yang telah diubah kembali ke state

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="border-2 border-gray-100 text-navy-700 dark:text-white">
        {dataForm.map((el, i) => {
          return (
            <div
              key={i}
              className="mb-[2px] flex w-full items-center justify-center gap-4 rounded-md bg-white p-2 shadow-md dark:bg-navy-700"
              draggable="true"
              onDragStart={(e) => onDragStart(e, el.value)}
            >
              <p className="inline text-base font-semibold">{el.title} </p>
              {el.icon}
            </div>
          );
        })}
      </div>
      <div className="col-span-1 flex h-fit w-full flex-col gap-2 xl:col-span-1 2xl:col-span-2">
        {" "}
        <QuestionList
          onDragStartIdx={onDragStartIdx}
          onDragOverIdx={onDragOverIdx}
          onDropIdx={onDropIdx}
          openEdit={handleOpenEdit}
          closeEdit={handleCloseEdit}
          idxIsOpen={openEdit}
          handleRemove={removeField}
          handleUpdateListQuestion={handleUpdateListQuestion}
          questions={listQuestions}
        />
        <div
          className="mt-2 flex h-8 w-full items-center justify-center rounded-md border border-gray-300 bg-gray-100 shadow-md "
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <BsPlusSquareFill />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
