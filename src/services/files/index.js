function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = evt => {
      resolve(evt.target.result);
    };

    try {
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
}

export default {
  async load(file) {
    try {
      const content = await readFile(file);
      const re = /data:([a-zA-Z]+\/[a-zA-Z]+)?;base64,(.+)/;
      const matches = re.exec(content);
      const filetype = matches[1];
      const data = matches[2];
      return { filetype, data };
    } catch (error) {
      return { error };
    }
  },
};
