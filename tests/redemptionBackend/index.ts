import { startApp } from "./src/app";

(async () => {
  try {
    console.log("Hello World!");
    startApp();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
