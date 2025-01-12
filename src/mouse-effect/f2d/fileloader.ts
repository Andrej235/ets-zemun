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
      let name = names[i];
      let url = path + "/" + name;
      let file = {
        name: name,
        url: url,
      };
      this.queue.push(file);
    }
  }
  // Load all files currently in the queue, calls onDone when all files
  // has been downloaded.
  run(onDone: (files: Record<string, string>) => void) {
    let files: Record<string, string> = {};
    let filesRemaining = this.queue.length;

    let fileLoaded = function (file: File) {
      if (file.text === undefined) return;

      files[file.name] = file.text;
      filesRemaining--;
      if (filesRemaining === 0) {
        onDone(files);
      }
    };

    let loadFile = function (file: File) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (request.status === 200) {
          file.text = request.responseText;
        }
        fileLoaded(file);
      };
      request.open("GET", file.url, true);
      request.send();
    };

    for (let i = 0; i < this.queue.length; i++) {
      loadFile(this.queue[i]);
    }
    this.queue = [];
  }
}
