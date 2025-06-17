import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // ✅ 删除指定模块
  app.delete("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const status = modulesDao.deleteModule(moduleId);
    res.sendStatus(status);
  });

  // ✅ 更新指定模块
  app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = modulesDao.updateModule(moduleId, moduleUpdates);
    res.sendStatus(status);
  });
}
