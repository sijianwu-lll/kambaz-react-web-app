import LessonControlButtons from "./LessonControlButtons";
import { BsPlus } from "react-icons/bs";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <BsPlus className="fs-4 me-2" />
      <LessonControlButtons />
    </div>
  );
}
