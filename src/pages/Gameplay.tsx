import { useParams } from "react-router";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useRef } from "react";
import type { editor } from "monaco-editor";
import { pyrightProvider } from "../utils/python";
import Button from "../components/button";
import { ArrowRightIcon } from "lucide-react";

export default function Gameplay() {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const { id } = useParams();
  const monaco = useMonaco();

  if (!monaco)
    return (
      <div className="m-auto animate-pulse">Загрузка monaco редактора...</div>
    );

  async function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    if (pyrightProvider) await pyrightProvider.setupDiagnostics(editor as any);
  }

  const options: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    language: "python",
    fontSize: 16,
    scrollbar: {
      vertical: "hidden",
    },
    smoothScrolling: true,
    automaticLayout: true,
    inlineSuggest: {
      enabled: true,
    },
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="w-full p-4 bg-zinc-800">
        <div className="container flex justify-between">
          <div className="flex flex-col">
            <h1>Введение в Python</h1>
            <h2 className="text-zinc-400">Задание 4/10</h2>
          </div>
        </div>
      </header>
      <div className="w-full h-full flex">
        <div className="flex-1 w-0 max-w-xl bg-[#1D1D1D]">
          <Editor
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={options}
            language="python"
            loading={
              <div className="m-auto animate-pulse">Загрузка редактора...</div>
            }
          />
          {/* <Editor></Editor> */}
        </div>
        <div className="flex-1 p-5">
          <div className="flex flex-col gap-10">
            <p>
              Напишите функцию с именем{" "}
              <span className="bg-zinc-800 p-1">func</span>, которая принимает
              два числа, и возвращает их сумму
            </p>
            <Button>
              Далее <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
