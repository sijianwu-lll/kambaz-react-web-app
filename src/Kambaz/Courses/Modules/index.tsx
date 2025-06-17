import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
  setModules,
} from "./reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");

  const modules = useSelector((state: any) => state.modulesReducer.modules)
    .filter((m: any) => m.course === cid);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchModules = async () => {
      if (!cid) return;
      const serverModules = await coursesClient.findModulesForCourse(cid);
      dispatch(setModules(serverModules));
    };
    fetchModules();
  }, [cid]);

  const createModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    const newModule = { name: moduleName };
    const created = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(created));
    setModuleName("");
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    const updated = { ...module, editing: false };
    await modulesClient.updateModule(updated);          // ✅ 调用后端更新
    dispatch(updateModule(updated));                    // ✅ 同步 Redux 状态
  };

  return (
    <div>
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={createModuleForCourse}
        />
      )}

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between text-white align-items-center">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {isFaculty && module.editing && (
                  <FormControl
                    className="w-75 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule(module);   // ✅ 触发保存
                      }
                    }}
                  />
                )}
              </span>
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={removeModule}
                  editModule={(id) => dispatch(editModule(id))}
                />
              )}
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between"
                  >
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
