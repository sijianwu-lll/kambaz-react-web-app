import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import * as db from "../../Database";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules.filter((m) => m.course === cid);

  return (
    <div>
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module) => (
          <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between text-white">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                {module.name}
              </span>
              <ModuleControlButtons />
            </div>

            {/* 渲染 lessons（如果有） */}
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson) => (
                  <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1 d-flex justify-content-between">
                    <span>
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </span>
                    <LessonControlButtons />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
