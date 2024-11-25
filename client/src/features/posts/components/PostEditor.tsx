import { Block, BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { SetStateAction, useState } from "react";
import { Post } from "../types/Post";
import ButtonComponent from "../../../components/ui/Button";
import { useUpdatePostMutation } from "../api/postsApiSlice";
import toast from "react-hot-toast";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Spinner from "../../../components/ui/Spinner";

function PostEditor({ post, setStep }: { post: Post; setStep: React.Dispatch<SetStateAction<"1" | "2">> }) {
  const editor = useCreateBlockNote({
    initialContent: post.content
      ? JSON.parse(post?.content)
      : [
          {
            type: "heading",
            content: post.title,
          },
          {
            type: "paragraph",
            content: "Enter content of your post. Start writing now...",
          },
        ],
  });

  const [updatePostMutation, { isLoading }] = useUpdatePostMutation();

  const [blocks, setBlocks] = useState<Block[]>((JSON.parse(post.content) as Block[]) || []);

  return (
    <>
      <ButtonComponent
        disabled={isLoading}
        className="fixed flex items-center gap-4 px-6 py-3 text-base -translate-x-1/2 group hover:bg-zinc-800 bg-zinc-900 bottom-24 right-10"
        onClick={async () => {
          try {
            if (blocks.length > 0) {
              await updatePostMutation({ id: post._id, content: JSON.stringify(blocks) }).unwrap();
              setStep("2");
            } else {
              toast.error("Blocks are empty");
            }
          } catch (error) {
            toast.error("Post failed to update");
          }
        }}
      >
        {isLoading ? "Saving..." : "Save and continue"}
        {isLoading ? <Spinner /> : <ArrowRightIcon className="w-4 h-4 text-white transition duration-200 group-hover:translate-x-1" />}
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
