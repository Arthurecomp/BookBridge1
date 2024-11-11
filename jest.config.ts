import type { Config } from "jest";

const config: Config = {
  verbose: true, // Exibe informações detalhadas no terminal durante os testes
  preset: "ts-jest", // Usando o preset ts-jest para suportar TypeScript
  testEnvironment: "node", // Ambiente de teste para Node.js
  transform: {
    "^.+\\.ts$": "ts-jest", // Transforma arquivos .ts usando ts-jest
  },
  moduleFileExtensions: ["ts", "js"], // Extensões de arquivos que o Jest deve entender
};

export default config;
