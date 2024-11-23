import React, { useState } from "react";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Block } from "@blocknote/core";
import AnotherEditor from "../features/posts/components/AnotherEditor";
import { Button } from "@headlessui/react";

function CreatePostPage() {
  const editor = useCreateBlockNote();

  const [blocks, setBlocks] = useState<Block[]>([]);

  console.log(blocks);

  return (
    <div>
      CreatePostPage
      <BlockNoteView
        onChange={() => {
          setBlocks(editor.document);
        }}
        editor={editor}
        theme={"light"}
      />
      <Button
        onClick={() => {
          localStorage.setItem("editor", JSON.stringify(blocks));
        }}
      >
        Save
      </Button>
      {blocks.length > 0 && <AnotherEditor />}
    </div>
  );
}

export default CreatePostPage;
