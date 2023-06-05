// import EditorLexical from "./components/Lexical/EditorLexical";
import styles from "react-quill/dist/quill.snow.css";
import { Suspense, lazy } from "react";
// import QuillEditor from "./components/QuillEditor";
const QuillEditor = lazy(() => import("./components/QuillEditor"));

export default function AdminEdit() {
  return (
    <div className="text-editor">
      <Suspense fallback={null}>
        <QuillEditor />
      </Suspense>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
