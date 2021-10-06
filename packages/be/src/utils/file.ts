import fsPromises from 'fs/promises';

export const remove = async (path: string) => {
  try {
    return fsPromises.unlink(path);
  } catch (_) {}
};

export const removeAll = async (paths: string[]) => {
  return Promise.allSettled(paths.map((path) => remove(path)));
};
