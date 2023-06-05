function ToolBar({ editor }) {
  if (!editor) {
    return null;
  }
  return (
    <div className="toolbar">
      <button
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold ") ? "is-active " : ""}>
        <i className="ri-bold"></i>
      </button>
      <button
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active " : ""}>
        <i className="ri-italic"></i>
      </button>
      <button
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active " : ""}>
        <i className="ri-strikethrough-2"></i>
      </button>
      <button
        title="Code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active " : ""}>
        <i className="ri-code-s-slash-line"></i>
      </button>
      <button
        title="Clear Format"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <i className="ri-format-clear"></i>
      </button>
      <button
        title="Text"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active " : ""}>
        <i className="ri-text"></i>
      </button>
      <button
        title="H1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "is-active " : ""
        }>
        <i className="ri-h-1"></i>
      </button>
      <button
        title="H2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "is-active " : ""
        }>
        <i className="ri-h-2"></i>
      </button>
      <button
        title="H3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "is-active " : ""
        }>
        <i className="ri-h-3"></i>
      </button>
      <button
        title="H4"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 }) ? "is-active " : ""
        }>
        <i className="ri-h-4"></i>
      </button>
      <button
        title="H5"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 }) ? "is-active " : ""
        }>
        <i className="ri-h-5"></i>
      </button>
      <button
        title="H6"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 }) ? "is-active " : ""
        }>
        <i className="ri-h-6"></i>
      </button>
      <br />
      <button
        title="Bulleted List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active " : ""}>
        <i className="ri-list-unordered"></i>
      </button>
      <button
        title="Numbered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active " : ""}>
        <i className="ri-list-ordered"></i>
      </button>
      <button
        title="Code Block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active " : ""}>
        <i className="ri-code-box-line"></i>
      </button>
      <button
        title="Block Quote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active " : ""}>
        <i className="ri-quote-text"></i>
      </button>
      <button
        title="Horizontal Rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <i className="ri-separator"></i>
      </button>
      <button
        title="Line Break"
        onClick={() => editor.chain().focus().setHardBreak().run()}>
        <i className="ri-page-separator"></i>
      </button>
      <button
        title="Align Left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active " : ""}>
        <i className="ri-align-left"></i>
      </button>
      <button
        title="Align Center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? "is-active " : ""
        }>
        <i className="ri-align-center"></i>
      </button>
      <button
        title="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active " : ""}>
        <i className="ri-align-right"></i>
      </button>
      <button
        title="Align Justify"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" }) ? "is-active " : ""
        }>
        <i className="ri-align-justify"></i>
      </button>
      <button
        title="Clear All Formatting"
        onClick={() => editor.chain().focus().clearNodes().run()}>
        <i className="ri-close-circle-line"></i>
      </button>
      <br />
      <button
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}>
        <i className="ri-arrow-go-back-line"></i>
      </button>
      <button
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}>
        <i className="ri-arrow-go-forward-line"></i>
      </button>
    </div>
  );
}

export default ToolBar;
