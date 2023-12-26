import { marked } from "marked";
import { useEffect, useState } from "react";

export default function App() {
  const [markdown, setMarkdown] = useState<string>("");
  const [html, setHTML] = useState<string>("");

  const onChangeEditor = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    setMarkdown(e.currentTarget.value);
  };

  // User Story #4: When I enter GitHub flavored markdown into the #editor element, the text is 
  // rendered as HTML in the #preview element as I type (HINT: You don't need to parse Markdown 
  // yourself - you can import the Marked library for this: https://cdnjs.com/libraries/marked).
  useEffect(() => {
    (async () => {
      try {
        const result = await marked.parse(markdown);
        setHTML(result);
      } catch (error) {
        console.error("Error:", (error as Error).message);
      }
    })();
  }, [markdown]);

  return (
    <main className="flex min-h-screen w-full flex-col justify-center gap-2 bg-slate-900 px-8 pb-8 pt-14 lg:grid lg:grid-cols-2">
      <div className="w-full border border-slate-400 text-red-500">
        {/*User Story #1: I can see a textarea element with a corresponding id="editor".*/}
        <textarea
          className="min-h-full w-full bg-slate-900 p-4"
          id="editor"
          onChange={onChangeEditor}
          value={markdown}
        />
      </div>
      <div className="w-full border border-slate-400 text-lime-500">
        {/* User Story #2: I can see an element with a corresponding id="preview". */}
        <div className="min-h-full w-full p-4" id="preview">
          {/*User Story #3: When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea.*/}
          {html}
        </div>
      </div>
    </main>
  );
}
