import React, { useState } from "react";
import EditingForm from "components/editingform";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import MultiSelect from "components/multiSelect";
import InputField from "components/fields/InputField";
import DatePicker from "components/date";
import Radio from "components/radio";
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
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };
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
                <DatePicker
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
          case "RadioMultiple":
            return (
              <Container key={i} i={i}>
                <label
                  className={`ml-3 text-sm font-bold text-navy-700 dark:text-white`}
                >
                  {el?.data?.label}
                  {el.required && <sup>*</sup>}
                </label>
                <div className="flex flex-wrap gap-4">
                  {el.data.options.map((option, index) => (
                    <Radio
                      key={index}
                      label={option.label}
                      value={option.value}
                      checked={selectedOption === option.value}
                      onChange={() => handleRadioChange(option.value)}
                    />
                  ))}
                </div>
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
          default:
            return null;
        }
      })}
    </>
  );
};

export default QuestionList;
