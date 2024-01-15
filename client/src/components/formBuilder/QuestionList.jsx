import React from "react";
import EditingForm from "components/editingform";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import MultiSelect from "components/multiSelect";
import InputField from "components/fields/InputField";
const QuestionList = ({
  questions,
  onDragStartIdx,
  onDragOverIdx,
  onDropIdx,
  openEdit,
  idxIsOpen,
  closeEdit,
  handleRemove,
  handleUpdateListQuestion,
}) => {
  const Container = ({ i, children }) => {
    return (
      <div
        key={i}
        className="w-full rounded-md border border-gray-300 bg-gray-100 p-1 shadow-md dark:bg-navy-800  "
        draggable="true"
        onDragStart={(e) => onDragStartIdx(e, i)}
        onDragOver={(e) => onDragOverIdx(e, i)}
        onDrop={(e) => onDropIdx(e, i)}
      >
        <div className="flex items-center justify-end gap-2 text-navy-700 dark:text-white">
          <FaRegEdit
            className="cursor-pointer "
            onClick={() => openEdit(i)}
            size={24}
          />
          <MdDeleteForever onClick={() => handleRemove(i)} size={26} />
        </div>
        {children}
      </div>
    );
  };
  return (
    <>
      {questions.map((el, i) => {
        switch (el.type) {
          case "TextField":
            return (
              <Container key={i} i={i}>
                <InputField
                  required={el.required}
                  extra=""
                  label={el?.data?.label}
                  placeholder="jawaban"
                  id="email"
                  type="text"
                  key={i}
                />
                {idxIsOpen === i && (
                  <EditingForm
                    data={el}
                    idx={i}
                    save={handleUpdateListQuestion}
                    close={() => openEdit()}
                  />
                )}
              </Container>
            );

          case "DropDownSelect":
            return (
              <Container key={i} i={i}>
                <MultiSelect
                  required={el.required}
                  openEdit={openEdit === i}
                  closeEdit={() => openEdit()}
                  label={el?.data?.label}
                  placeholder="Pilih "
                  id="email"
                  type="text"
                  data={el}
                  idx={i}
                  //   save={handleUpdateListQuestion}
                />
                {idxIsOpen === i && (
                  <EditingForm
                    data={el}
                    idx={i}
                    save={handleUpdateListQuestion}
                    close={() => openEdit()}
                  />
                )}
              </Container>
            );
          case "DatePicker":
            return (
              <Container key={i} i={i}>
                <input type="datetime-local" />
              </Container>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default QuestionList;
