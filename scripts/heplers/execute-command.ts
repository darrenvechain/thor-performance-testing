import { exec } from "child_process";

const executeCommand = async (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command);

    const handleExit = (code: number | null) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command ${command} exited with code ${code}`));
      }
    };

    const handleError = (error: Error) => {
      console.error(error);
      reject(error);
    };

    const handleStdout = (data: Buffer) => {
      console.log(data.toString());
    };

    const handleStderr = (data: Buffer) => {
      console.error(data.toString());
    };

    childProcess.on("close", handleExit);
    childProcess.on("exit", handleExit);
    childProcess.on("error", handleError);
    childProcess.stdout?.on("data", handleStdout);
    childProcess.stderr?.on("data", handleStderr);

    // Remove event listeners when the child process disconnects
    childProcess.on("disconnect", () => {
      childProcess.removeListener("close", handleExit);
      childProcess.removeListener("exit", handleExit);
      childProcess.removeListener("error", handleError);
      childProcess.stdout?.removeListener("data", handleStdout);
      childProcess.stderr?.removeListener("data", handleStderr);
    });
  });
};

export { executeCommand };
