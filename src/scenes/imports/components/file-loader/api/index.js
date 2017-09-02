import { toastr } from 'react-redux-toastr';

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      resolve(evt.target.result);
    };

    try {
      reader.readAsText(file);
    } catch (error) {
      toastr.error('Error reading file', `Error: ${error.json.error}`);
      reject(error);
    }
  });
}

export default {
  async loadFile(file) {
    try {
      const content = await readFile(file);
      return { content };
    } catch (error) {
      return { error };
    }
  },
};
