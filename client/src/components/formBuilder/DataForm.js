import {
  MdOutlineShortText,
  MdArrowDropDownCircle,
  MdOutlineDateRange,
  MdRadioButtonChecked,
} from "react-icons/md";

const size = 14;
export const dataForm = [
  {
    title: "Jawaban Singkat",
    value: "TextField",
    icon: <MdOutlineShortText size={size} />,
  },
  {
    title: "Pilihan Dropdown",
    value: "DropDownSelect",
    icon: <MdArrowDropDownCircle size={size} />,
  },
  {
    title: "Pilihan Tanggal",
    value: "DatePicker",
    icon: <MdOutlineDateRange size={size} />,
  },
  {
    title: "Pilihan Ganda",
    value: "RadioMultiple",
    icon: <MdRadioButtonChecked size={size} />,
  },
];
