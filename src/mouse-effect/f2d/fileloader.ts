// Loads arbitrary number of files in a batch and gives a callback when every
// file has been loaded with its response text.
// Construct a file loader with a suffix path that is prepended to all
// names.
type File = {
  name: string;
  url: string;
  text?: string;
};

export default class FileLoader {
  path: string;
  queue: File[];

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
  run(onDone: (files: Record<string, string>) => void) {
    const files: Record<string, string> = {};
    let filesRemaining = this.queue.length;

    const fileLoaded = function (file: File) {
      if (file.text === undefined) return;

      files[file.name] = file.text;
      filesRemaining--;
      if (filesRemaining === 0) {
        onDone(files);
      }
    };

    const loadFile = async function (file: File) {
      const response = await fetch(file.url);
      if (response.ok) file.text = await response.text();

      fileLoaded(file);
    };

    for (let i = 0; i < this.queue.length; i++) {
      loadFile(this.queue[i]);
    }
    this.queue = [];
  }
}

