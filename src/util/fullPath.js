import config from "../../config/default";

export default (path) => {
  return path ? `${config.basePath.ui}${path}` : config.basePath.ui;
};
