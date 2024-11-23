import { Block, BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import React from "react";

function AnotherEditor() {
  const blocks = JSON.parse(localStorage.getItem("editor")!);

  const editor = useCreateBlockNote({
    initialContent: blocks,
  });

  return (
    <div>
      AnotherEditor
      <BlockNoteView theme={"light"} editor={editor} editable={false} />
    </div>
  );
}

export default AnotherEditor;
