import { useCreateBlockNote } from "@blocknote/react";
import React from "react";
import { Post } from "../types/Post";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";

function PostViewer({ post }: { post?: Post }) {
  // console.log(post?.content);

  // console.log(post?.content);

  const editor = BlockNoteEditor.create({ initialContent: JSON.parse(post?.content) });
  return <BlockNoteView className="mt-10" editable={false} editor={editor} theme={"light"} />;
}

export default PostViewer;
