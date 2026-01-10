import { Link, useParams } from "react-router";
import Editor, { useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { pyrightProvider } from "../utils/python";
import { ArrowUpIcon, PlayIcon } from "lucide-react";
import Variables from "../assets/levels/python.variables/component";
import * as React from "react";

export const Component = React.memo(() => {
  const beginAnchorRef = React.useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const monaco = useMonaco();

  if (!monaco)
    return (
      <div className="m-auto animate-pulse">Загрузка monaco редактора...</div>
    );

  async function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
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
    unicodeHighlight: {
      allowedLocales: {
        ru: true,
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="w-full p-4 bg-zinc-800 h-min">
        <div className="container flex justify-between">
          <div className="flex flex-col">
            <h1>Введение в Python {id}</h1>
            <h2 className="text-zinc-400">Задание 4/10</h2>
          </div>
        </div>
      </header>
      <div className="w-full h-full flex min-h-0">
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
        </div>
        <div className="flex h-full flex-1 p-5 flex-col gap-7 overflow-scroll relative">
          <div id="start" className="absolute top-0" ref={beginAnchorRef}></div>
          <Variables />
          <div className="min-h-full flex items-end justify-center">
            <button
              className="flex gap-2 text-zinc-400 cursor-pointer"
              onClick={() =>
                beginAnchorRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <ArrowUpIcon />
              <p>Вернуться наверх</p>
              <ArrowUpIcon />
            </button>
          </div>
        </div>
      </div>
      <button
        className="
              flex absolute aspect-square
              before:content-[''] before:inline-block
              before:w-full before:h-full before:absolute 
              before:bg-blue-500 bottom-6 left-6
              rounded-full cursor-pointer
              hover:before:bg-blue-400 active:before:scale-105
              before:transition-all p-5 before:z-1 before:top-0 before:left-0
              before:rounded-full
            "
      >
        <PlayIcon className="m-auto z-2" />
      </button>
    </div>
  );
});

// export async function loader() {
//   console.log("loading Gameplay...");
//   return {};
// }
