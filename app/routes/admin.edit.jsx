import EditorLexical from "./components/Lexical/EditorLexical";
import SlateStyles from "../styles/slate.css";
import { Suspense } from "react";

export default function AdminEdit() {
  return (
    <div className="text-editor">
      <Suspense fallback={null}>
        <EditorLexical />
      </Suspense>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: SlateStyles }];
}
