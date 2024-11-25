import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import React, { useState } from "react";
import { Post } from "../types/Post";
import ButtonComponent from "../../../components/ui/Button";
import { useUpdatePostMutation } from "../api/postsApiSlice";
import toast from "react-hot-toast";

function PostEditor({ post }: { post: Post }) {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        content: post.title,
      },
      {
        type: "paragraph",
        content: "Enter new content of the blog by appending and adding new blocks to this post.",
      },
    ],
  });

  const [updatePostMutation, { isLoading }] = useUpdatePostMutation();

  const [blocks, setBlocks] = useState<Block[]>([]);

  return (
    <>
      <ButtonComponent
        className="block"
        onClick={async () => {
          console.log("clicked");
          try {
            await updatePostMutation({ id: post._id, content: JSON.stringify(blocks) }).unwrap();
          } catch (error) {
            toast.error("Post failed to update");
          }
        }}
      >
        Edit post
      </ButtonComponent>
      <BlockNoteView
        className="mt-10"
        onChange={() => {
          setBlocks(editor.document);
        }}
        editor={editor}
        theme={"light"}
      />
    </>
  );
}

export default PostEditor;
