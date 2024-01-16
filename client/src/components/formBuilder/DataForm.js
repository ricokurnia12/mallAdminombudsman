import {
  MdOutlineShortText,
  MdArrowDropDownCircle,
  MdOutlineDateRange,
  MdRadioButtonChecked,
} from "react-icons/md";

export const dataForm = [
  {
    title: "Jawaban Singkat",
    value: "TextField",
    icon: <MdOutlineShortText size={24} />,
  },
  {
    title: "Pilihan Dropdown",
    value: "DropDownSelect",
    icon: <MdArrowDropDownCircle size={24} />,
  },
  {
    title: "Pilihan Tanggal",
    value: "DatePicker",
    icon: <MdOutlineDateRange size={24} />,
  },
  {
    title: "Pilihan Ganda",
    value: "RadioMultiple",
    icon: <MdRadioButtonChecked size={24} />,
  },
];
