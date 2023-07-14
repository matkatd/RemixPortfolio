import { useCallback, useEffect, useRef } from "react";
import {
  isRouteErrorResponse,
  useFetcher,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import { action } from "../admin.new";
import { useFetcherWithPromise } from "../../hooks/useFetcherWithPromise";

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-boundary">
        <h2>Oopsie on toolbar</h2>
        <p>
          Status: {error.status}: {error.statusText}
        </p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = "Unknown Error";
  return (
    <div className="error-boundary">
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}

function ToolBar({ editor }) {
  const fetcher = useFetcherWithPromise();
  const showButton = useRef(null);
  const showImageButton = useRef(null);
  const linkDialog = useRef(null);
  const imgDialog = useRef(null);
  const hrefEl = useRef(null);
  const srcEl = useRef(null);
  const altEl = useRef(null);
  const confirmBtn = useRef(null);
  const confirmBtnImg = useRef(null);
  const removeBtn = useRef(null);

  function handleLinkShowButton() {
    let previousUrl = editor.getAttributes("link").href;
    if (previousUrl === undefined) {
      previousUrl = "";
    }
    hrefEl.current.value = previousUrl;
    linkDialog.current.showModal();
  }

  function handleLinkTextInput() {
    confirmBtn.current.value = hrefEl.current.value;
  }

  function handleRemoveLink() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    linkDialog.current.returnValue = "";
    linkDialog.current.close(linkDialog.current.returnValue);
  }

  function handleCloseLinkForm() {
    if (linkDialog.current.returnValue === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else if (linkDialog.current.returnValue === "cancel") {
      return;
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkDialog.current.returnValue })
        .run();
    }
  }

  function handleSubmitLink(event) {
    event.preventDefault();
    linkDialog.current.close(hrefEl.current.value); // Have to send the select box value here.
  }

  function handleImgShowButton() {
    imgDialog.current.showModal();
  }

  function handleCloseImgForm() {
    if (imgDialog.current.returnValue === "cancel") {
      return;
    } else {
      editor
        .chain()
        .focus()
        .setImage({
          src: srcEl.current.returnValue,
          alt: altEl.current.returnValue,
        })
        .run();
    }
  }

  async function handleSubmitImg(event) {
    event.preventDefault(); // We don't want to submit this fake form

    const data = await fetcher.submit(event.target.form, {
      method: "post",
      action: "/admin/upload",
      encType: "multipart/form-data",
    });

    console.log("toolbar-upload-data" + data);
    srcEl.current.returnValue = data.src;
    altEl.current.returnValue = data.alt;
    setTimeout(() => {
      imgDialog.current.close();
    }, 1000);
    // Have to send the select box value here.
  }

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

      <dialog
        id="linkInput"
        className="inputDialog"
        ref={linkDialog}
        onClose={handleCloseLinkForm}>
        <form className="get-link-url">
          <button id="cancel" value="cancel" formMethod="dialog">
            Cancel
          </button>
          <label htmlFor="href">Enter URL for Link</label>
          <input
            type="text"
            id="href"
            name="href"
            ref={hrefEl}
            onChange={handleLinkTextInput}></input>
          <div className="dialog-buttons">
            <button
              id="remove"
              className="remove-button"
              value="remove"
              formMethod="dialog"
              ref={removeBtn}
              onClick={handleRemoveLink}>
              Remove Link
            </button>
            <button
              id="confirmBtn"
              className="confirm-button"
              value="default"
              ref={confirmBtn}
              onClick={handleSubmitLink}>
              Confirm
            </button>
          </div>
        </form>
      </dialog>
      <button
        id="showDialog"
        title="Link"
        className={editor.isActive("link") ? "is-active " : ""}
        ref={showButton}
        onClick={handleLinkShowButton}>
        <i className="ri-link"></i>
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

      <dialog
        id="imageInput"
        className="inputDialog"
        ref={imgDialog}
        onClose={handleCloseImgForm}>
        <fetcher.Form
          className="get-image"
          encType="multipart/form-data"
          method="post"
          action="/admin/upload">
          <button
            id="cancelImg"
            value="cancel"
            className="cancel-button"
            formMethod="dialog">
            Cancel
          </button>
          <label htmlFor="src">Upload image</label>
          <input
            type="file"
            accept="image/*"
            className="image-upload"
            id="src"
            name="src"
            ref={srcEl}
            // onChange={handleImgSrcInput}
          />
          <br />
          <label htmlFor="alt">Image Alt Text</label>
          <input
            type="text"
            id="alt"
            name="alt"
            ref={altEl}
            // onChange={handleImgAltInput}
          />
          <div className="dialog-buttons">
            <button
              id="confirmImg"
              className="confirm-button"
              value="default"
              ref={confirmBtnImg}
              onClick={handleSubmitImg}
              type="submit">
              Confirm
            </button>
          </div>
        </fetcher.Form>
      </dialog>
      <button
        id="showImgDialog"
        title="Insert Image"
        onClick={handleImgShowButton}
        ref={showImageButton}>
        <i className="ri-image-add-line"></i>
      </button>

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
