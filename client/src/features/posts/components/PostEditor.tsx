import { Block } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import React, { useState } from "react";

function PostEditor() {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        content: "Your title goes here",
      },
      {
        type: "paragraph",
        content: "Enter new content of the blog by appending and adding new blocks to this post.",
      },
    ],
  });

  const [blocks, setBlocks] = useState<Block[]>([]);

  return (
    <BlockNoteView
      className="mt-10"
      onChange={() => {
        setBlocks(editor.document);
      }}
      editor={editor}
      theme={"light"}
    />
  );
}

export default PostEditor;
