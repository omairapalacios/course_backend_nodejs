module.exports = {
  getInfo: async (req, res) => {
    const argument = process.argv;
    const namePlataform = process.platform;
    const versionNode = process.version;
    const memoryReserve = process.memoryUsage();
    const pathExe = process.execPath;
    const processId = process.pid;
    const fileProyect = process.env.PWD;

    const info = {
      argument,
      namePlataform,
      versionNode,
      memoryReserve,
      pathExe,
      processId,
      fileProyect,
    };
    res.json(info);
  },
};
