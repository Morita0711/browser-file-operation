/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// @license © 2020 Google LLC. Licensed under the Apache License, Version 2.0.

const getFileWithHandle = async (handle) => {
  const file = await handle.getFile();
  file.handle = handle;
  return file;
};

/**
 * Opens a file from disk using the (legacy) Native File System API.
 * @type { typeof import("../../index").fileOpen }
 */
export default async (options = {}) => {
  const handleOrHandles = await window.chooseFileSystemEntries({
    accepts: [
      {
        description: options.description || '',
        mimeTypes: options.mimeTypes || ['*/*'],
        extensions: options.extensions || [''],
      },
    ],
    multiple: options.multiple || false,
  });
  if (options.multiple) {
    return Promise.all(handleOrHandles.map(getFileWithHandle));
  }
  return getFileWithHandle(handleOrHandles);
};
