import { useParams } from "react-router";
import Editor, { useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { pyrightProvider, runPythonCode } from "../utils/python";
import { ArrowUpIcon, LoaderCircleIcon, PlayIcon } from "lucide-react";
import * as React from "react";
import { loadModule } from "../hooks/useModule";
import { cn } from "../utils/cn";
import { getLevel, Level, LevelId, useLevel } from "../hooks/useLevel";

type OutputFrameProps = React.ComponentProps<"div"> & {
  title: string;
  content: string;
  preClassName?: string;
};

function OutputFrame({
  className,
  content,
  title,
  preClassName,
  ...props
}: OutputFrameProps) {
  return (
    <div
      className={cn("w-full shrink p-3 flex flex-col gap-2 h-full", className)}
      {...props}
    >
      <h1>{title}:</h1>
      <div className="h-1 bg-zinc-600"></div>
      <pre
        className={cn(
          "overflow-scroll h-full max-w-full min-h-0 select-text",
          preClassName
        )}
      >
        {content}
      </pre>
    </div>
  );
}

export const Component = React.memo(() => {
  const editorRef = React.useRef<editor.IStandaloneCodeEditor>(null);
  const beginAnchorRef = React.useRef<HTMLDivElement>(null);

  const { id } = useParams();
  if (!id) throw Error("id is null");
  const module = React.use(loadModule(id));
  const monaco = useMonaco();

  const [stdout, setStdout] = React.useState("");
  const [stderr, setStderr] = React.useState("");

  const [currentLevel, setCurrentLevel] = React.useState(0);
  const level = useLevel(module.levels[currentLevel]);
  const [levelState, setLevelState] =
    React.useState<
      typeof level extends Level<infer R> | null ? R | null : never
    >(null);

  React.useEffect(() => {
    if (!level) return;
    setLevelState(level.newState());
  }, [level]);
  const [running, setRunning] = React.useState(false);

  if (!monaco)
    return (
      <div className="m-auto animate-pulse">Загрузка monaco редактора...</div>
    );

  async function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    if (pyrightProvider) await pyrightProvider.setupDiagnostics(editor as any);
  }

  const options = {
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
  } satisfies editor.IStandaloneEditorConstructionOptions;

  return (
    <div className="flex flex-col w-full h-full">
      <header className="w-full p-4 bg-zinc-800 h-min">
        <div className="container flex justify-between">
          <div className="flex flex-col">
            <h1>{module.name}</h1>
            <h2 className="text-zinc-400">Задание 1/{module.levels.length}</h2>
          </div>
        </div>
      </header>
      <div className="w-full h-full flex min-h-0">
        <div className="flex-1 w-0 max-w-xl min-w-xl bg-[#1D1D1D] border-r-1 border-black select-none">
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
        <div className="flex flex-col flex-1">
          <div className="flex h-full p-5 flex-col gap-7 overflow-scroll relative">
            {!level ? (
              <p className="m-auto animate-pulse">Загрузка текста...</p>
            ) : (
              <>
                <div
                  id="start"
                  className="absolute top-0"
                  ref={beginAnchorRef}
                ></div>
                {level && levelState && <level.Component state={levelState} />}
                <div className="min-h-full flex items-end justify-center">
                  <button
                    className="flex gap-2 text-zinc-400 cursor-pointer"
                    onClick={() =>
                      beginAnchorRef.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    <ArrowUpIcon />
                    <p>Вернуться наверх</p>
                    <ArrowUpIcon />
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="flex w-full h-full max-h-[40%] bg-zinc-800 border-t-1 border-black">
            <OutputFrame
              title="Вывод (stdout)"
              content={stdout}
              preClassName="text-blue-300"
            ></OutputFrame>
            <div className="w-0.5 h-full bg-zinc-700"></div>
            <OutputFrame
              title="Ошибки (stderr)"
              content={stderr}
              preClassName="text-red-300"
            ></OutputFrame>
          </div>
        </div>
      </div>
      <button
        className="
          flex absolute
          bg-blue-500 bottom-6 left-6
          rounded-full cursor-pointer disabled:cursor-not-allowed
          hover:bg-blue-400
          transition-all p-5
          rounded-full disabled:bg-gray-500
        "
        disabled={running}
        onClick={async () => {
          if (!editorRef.current || !level || !levelState) return;

          setRunning(true);
          setStdout("");
          setStderr("");
          try {
            const [output, error, chkbuf] = await runPythonCode(
              level.injectChecker(levelState, editorRef.current.getValue())
            );
            setStdout(output);
            setStderr(error);
            level.check(levelState, chkbuf);
            setLevelState(levelState);
          } finally {
            setRunning(false);
          }
        }}
      >
        {!running ? (
          <PlayIcon className="m-auto z-2" />
        ) : (
          <LoaderCircleIcon className="m-auto z-2 animate-spin" />
        )}
      </button>
    </div>
  );
});

// export async function loader() {
//   console.log("loading Gameplay...");
//   return {};
// }

export default Component;
