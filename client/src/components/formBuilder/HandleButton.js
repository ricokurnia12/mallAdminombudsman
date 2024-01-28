export const handleAddQuestion = (
  type,
  listQuestions,
  setListQuestions,
  groupIndex
) => {
  // Create a deep copy of the state
  const newListQuestions = { ...listQuestions };

  // Tambahkan data baru ke dalam array yang sudah ada
  switch (type) {
    case "DropDownSelect":
      newListQuestions.detailed[groupIndex].question.push({
        type: "DropDownSelect",
        required: false,
        data: {
          label: `Pertanyaan ${
            newListQuestions.detailed[groupIndex].question.length + 1
          }`,
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
      });
      break;

    case "TextField":
      newListQuestions.detailed[groupIndex].question.push({
        type: "TextField",
        required: true,
        data: {
          label: `Pertanyaan ${
            newListQuestions.detailed[groupIndex].question.length + 1
          }`,
        },
      });
      break;

    case "DatePicker":
      newListQuestions.detailed[groupIndex].question?.push({
        type: "DatePicker",
        required: true,
        data: {
          label: `Pertanyaan ${
            newListQuestions.detailed[groupIndex].question.length + 1
          }`,
        },
      });
      break;

    case "RadioMultiple":
      newListQuestions.detailed[groupIndex].question?.push({
        type: "RadioMultiple",
        required: false,
        data: {
          label: `Pertanyaan ${
            newListQuestions.detailed[groupIndex].question?.length + 1
          }`,
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
      });
      break;

    default:
      break;
  }

  // Update the state with the new listQuestions
  setListQuestions(newListQuestions);
};
