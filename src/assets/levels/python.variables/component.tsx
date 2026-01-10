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

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";

const firstCode = `\
имя_переменной = значение
`;

SyntaxHighlighter.registerLanguage("python", python);

export default function Variables() {
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
        Имя переменной не должна начинаться с числа, а также не должна иметь в
        себе специальные символы, кроме{" "}
        <span className="bg-zinc-700 p-0.5 px-1 rounded-sm">_</span> (нижнего
        подчеркивания).
      </p>
      <p>
        Попробуй создать переменную с твоим возрастом с именем "
        <span className="bg-zinc-700 p-0.5 px-1 rounded-sm">мой_возраст</span>
        ", а затем запусти код.
      </p>
      <p className="mx-auto animate-pulse">Ожидание запуска кода...</p>
    </>
  );
}
