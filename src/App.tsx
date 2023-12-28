import DOMPurify from "dompurify";
import { useState } from "react";
import Markdown from "react-markdown";

const INITIAL_MD: string = `\
# Heading 1

## Heading 2

[A Markdown link](https://www.markdownguide.org/)

Here is some inline \`code\`.

\`\`\`typescript
enum Option {
  A,
  B,
}
\`\`\`

> To create a blockquote, add a \`>\` in front of a paragraph.

- List item A
- List item B

![Markdown Logo](https://www.markdownguide.org/assets/images/markdown-mark-white.svg)

Here is some **bold text**.
`;

export default function App() {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MD);

  const onChangeEditor = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    setMarkdown(e.currentTarget.value);
  };

  return (
    <main className="flex h-screen min-h-screen w-full flex-col justify-center bg-slate-900 px-8 pb-8 pt-14">
      <div className="flex min-h-[80lvh] w-full grow-0 flex-col justify-center gap-2 lg:grid lg:grid-cols-2">
        <div className="w-full border border-slate-400 text-red-500">
          {/*User Story #1: I can see a textarea element with a corresponding id="editor".*/}
          <textarea
            className="min-h-full w-full bg-slate-900 p-4"
            id="editor"
            onChange={onChangeEditor}
            value={markdown}
          />
        </div>
        <div className="prose h-full min-w-full overflow-y-auto border border-slate-400 text-lime-300 prose-headings:text-lime-300 prose-a:text-teal-300 prose-a:underline prose-blockquote:text-lime-300 prose-strong:text-lime-300 prose-code:text-slate-100 prose-pre:text-slate-100">
          {/* User Story #2: I can see an element with a corresponding id="preview". */}
          <div className="w-full p-4" id="preview">
            {/*User Story #3: When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea.*/}
            <Markdown className="">{DOMPurify.sanitize(markdown)}</Markdown>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full text-center text-sm text-slate-100 underline visited:text-slate-100">
        <a
          href="https://github.com/ge3224/random-quote-machine-fcc"
          target="_blank"
        >
          Source Code on Github
        </a>
      </div>
    </main>
  );
}
