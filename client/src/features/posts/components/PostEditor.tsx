import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import ButtonComponent from "../../../components/ui/Button";
import Spinner from "../../../components/ui/Spinner";
import { useUpdatePostMutation } from "../api/postsApiSlice";
import { Post } from "../types/Post";

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

  const [blocks, setBlocks] = useState<Block[]>([]);

  async function updatePostContent(): Promise<void> {
    if (blocks.length === 0) {
      toast.error("Add some content in order to proceed");
      return;
    }

    try {
      await updatePostMutation({ id: post._id, content: JSON.stringify(blocks) }).unwrap();
      setStep("2");
      toast.success("Post content updated.");
    } catch (error) {
      toast.error("Failed to update post");
    }
  }

  return (
    <>
      <ButtonComponent
        disabled={isLoading}
        className="fixed flex items-center gap-4 px-6 py-3 text-base -translate-x-1/2 group hover:bg-zinc-800 bg-zinc-900 bottom-24 right-10"
        onClick={updatePostContent}
      >
        {isLoading ? (
          <div className="flex items-center gap-x-2">
            <span>Saving</span>
            <Spinner />
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <span>Save and continue</span>
            <ArrowRightIcon className="w-4 h-4 text-white transition duration-200 group-hover:translate-x-1" />
          </div>
        )}
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
