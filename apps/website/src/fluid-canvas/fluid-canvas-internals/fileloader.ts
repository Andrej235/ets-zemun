// Loads arbitrary number of files in a batch and gives a callback when every
// file has been loaded with its response text.
// Construct a file loader with a suffix path that is prepended to all
// names.
export type File = {
  name: string;
  url: string;
  text?: string;
};

export type Files = Record<string, string>;

export default class FileLoader {
  path: string;
  queue: File[];
  currentRun: Promise<Files> | null = null;

  constructor(path: string, names: string[]) {
    this.path = path;
    this.queue = [];
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const url = path + "/" + name;
      const file = {
        name: name,
        url: url,
      };
      this.queue.push(file);
    }
  }

  // Load all files currently in the queue, calls onDone when all files
  // has been downloaded.
  run(): Promise<Files> {
    this.currentRun ??= this.loadAllFromQueue();
    return this.currentRun;
  }

  private async loadAllFromQueue() {
    const files: Files = {};

    async function loadFile(file: File) {
      const response = await fetch(file.url);
      if (!response.ok) return;

      file.text = await response.text();
      files[file.name] = file.text;
    }

    const promises = [];
    for (let i = 0; i < this.queue.length; i++)
      promises.push(loadFile(this.queue[i]));

    this.queue = [];
    await Promise.all(promises);
    return files;
  }
}
