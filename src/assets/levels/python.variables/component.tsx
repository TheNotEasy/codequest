// Переменные - это коробки, в которые можно положить некую информацию.

// В Python, их можно создать, написав:
// ```python
// имя_переменной = значение
// ```
// Имя переменной не должна начинаться с числа, а также не должна иметь в себе специальные символы, кроме `_` (нижнего подчеркивания).

// В них можно положить числа. Например:
// ```python
// дней_в_году = 365
// дней_в_весокосном_году = 366
// ```

// Попробуй создать переменную с твоим возрастом с именем `мой_возраст`.

import pyChecker from "./checker0.py?raw";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";

const firstCode = `\
имя_переменной = значение
`;

const secondCode = `\
число = 123
текст = "значение в кавычках"
`;

SyntaxHighlighter.registerLanguage("python", python);

export interface LevelState {
  step: number;
  my_age: number;
  my_name: string;
}

export function Component({ state }: { state: LevelState }) {
  return (
    <>
      <p>
        Переменные - это коробки, которым можно присвоить какие-нибудь значения.
      </p>
      <div className="flex flex-col gap-2">
        <p>В Python, их можно создать, написав:</p>
        <SyntaxHighlighter language="python" style={vs2015}>
          {firstCode}
        </SyntaxHighlighter>
      </div>
      <p>
        Имя переменной не должна начинаться с цифры, а также не должна иметь в
        себе специальные символы, кроме{" "}
        <span className="bg-zinc-700 p-0.5 px-1 rounded-sm">_</span> (нижнего
        подчеркивания).
      </p>
      <div className="flex flex-col gap-2">
        <p>
          Им можно присвоить число и текст, важно, чтобы текст был в кавычках
        </p>
        <SyntaxHighlighter language="python" style={vs2015}>
          {secondCode}
        </SyntaxHighlighter>
      </div>
      <p>
        Попробуй создать переменную с твоим возрастом с именем "
        <span className="bg-zinc-700 p-0.5 px-1 rounded-sm">мой_возраст</span>"
        и с твоим именем в "
        <span className="bg-zinc-700 p-0.5 px-1 rounded-sm">мое_имя</span>", а
        затем <span className="underline">запусти код</span>, после посмотри на
        вывод и ошибки программы
      </p>
    </>
  );
}

export function newState(): LevelState {
  return {
    step: 0,
    my_age: 0,
    my_name: "",
  };
}

export function injectChecker(state: LevelState, code: string): string {
  console.log(code + "\n" + pyChecker);
  return code + "\n" + pyChecker;
}

export function check(state: LevelState, chkbuf: string): boolean {
  const objs = JSON.parse(chkbuf) as [{ my_age: number; my_name: string }] | [];
  if (objs.length === 0) return false;
  state.my_age = objs[0].my_age;
  state.my_name = objs[0].my_name;
  state.step++;

  return true;
}
