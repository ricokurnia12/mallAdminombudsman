import { useState } from "react";
// import InputField from "components/fields/InputField";
import { BsPlusSquareFill } from "react-icons/bs";
// import { MdDeleteForever } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import MultiSelect from "components/multiSelect";

import { dataForm } from "./DataForm";
// import EditingForm from "components/editingform";
import QuestionList from "./QuestionList";
import { handleAddQuestion } from "./HandleButton";
const FormBuilder = () => {
  const [openEdit, setOpenEdit] = useState();
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  const [idxGrouped, setIndexGoruped] = useState();
  const [listQuestions, setListQuestions] = useState({
    title: "judul form",
    description:
      "Curabitur a malesuada dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam ac egestas augue, sed aliquet eros. Sed vestibulum sapien tempus ex elementum imperdiet. Morbi interdum mollis tellus ac laoreet. Ut nec enim non nisl blandit aliquam. Pellentesque ut tempus turpis, ac euismod sapien. Etiam imperdiet auctor luctus.",
    detailed: [
      {
        groupName: "bagian 1",
        question: [
          {
            type: "TextField",
            required: true,
            data: {
              label: "Pertanyaan 1",
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
        ],
      },
      {
        groupName: "bagian 2",
        question: [
          {
            type: "TextField",
            required: true,
            data: {
              label: "Pertanyaan 1",
            },
          },
        ],
      },
    ],
  });

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

  const removeField = (index, idxGrouped) => {
    // Create a deep copy of the state
    const updatedList = { ...listQuestions };

    // Filter out the question to remove
    updatedList.detailed[idxGrouped].question = updatedList.detailed[
      idxGrouped
    ].question.filter((_, i) => i !== index);

    // Update the state with the updated listQuestions
    setListQuestions(updatedList);
  };

  const handleUpdateListQuestion = (data, groupIndex, questionIndex) => {
    console.log(data, groupIndex, questionIndex);
    // Buat salinan objek
    const updatedList = { ...listQuestions };
    console.log(updatedList);

    // Edit data pada indeks tertentu
    updatedList.detailed[groupIndex].question[questionIndex] = data;

    // Update state dengan listQuestions yang sudah dimodifikasi
    setListQuestions(updatedList);
  };

  const handleOpenEdit = (i) => {
    setOpenEdit(i);
  };

  const handleCloseEdit = () => setOpenEdit();
  console.log(idxGrouped);

  return (
    <div className="mt-3 flex h-full flex-col items-center justify-center  gap-5 ">
      <div className="w-full max-w-4xl  border bg-white p-2 shadow-sm">
        <h1 className="text-center text-2xl font-semibold">
          {listQuestions.title}
        </h1>
        <p>{listQuestions.description}</p>
      </div>
      {listQuestions.detailed.map((e, i) => {
        return (
          <div
            key={i}
            className="w-full max-w-4xl  border bg-white p-2 shadow-sm"
          >
            {e.groupName}
            <QuestionList
              onDragStartIdx={onDragStartIdx}
              onDragOverIdx={onDragOverIdx}
              onDropIdx={onDropIdx}
              openEdit={handleOpenEdit}
              closeEdit={handleCloseEdit}
              idxIsOpen={openEdit}
              idxGroupedEdit={() => setIndexGoruped(i)}
              isOpenEdit={i === idxGrouped}
              idxGroupedUpdate={idxGrouped}
              handleRemove={removeField}
              idxGrouped={i}
              handleUpdateListQuestion={handleUpdateListQuestion}
              questions={e.question}
            />
            <div className="mt-2 flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white py-8 shadow-md ">
              <div>
                <div
                  onClick={() => setAddQuestionOpen(!addQuestionOpen)}
                  className="flex cursor-pointer items-center justify-center rounded-sm p-2 hover:bg-gray-300"
                >
                  {" "}
                  <BsPlusSquareFill className="me-2" /> Tambah Pertanyaan
                </div>
                <div className=" flex gap-1 text-navy-700 dark:text-white">
                  {addQuestionOpen &&
                    dataForm.map((el, idx) => {
                      return (
                        <div
                          key={idx}
                          className="mb-[2px] flex w-full items-center justify-center gap-4 rounded-md border border-gray-700 bg-white p-1 dark:bg-navy-700"
                          draggable="true"
                          onClick={() => {
                            console.log(el.value);
                            handleAddQuestion(
                              el.value,
                              listQuestions,
                              setListQuestions,
                              i
                            );
                          }}
                        >
                          <p className="inline text-xs font-semibold">
                            {el.title}{" "}
                          </p>
                          {el.icon}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* <div className="col-span-12">
        <pre>{JSON.stringify(listQuestions, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default FormBuilder;
