import {
  MdOutlineShortText,
  MdArrowDropDownCircle,
  MdOutlineDateRange,
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
];
