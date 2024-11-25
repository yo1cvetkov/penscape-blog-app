import { useState } from "react";
import { Field } from "@headlessui/react";
import CardWrapper from "../components/ui/CardWrapper";
import FormInput from "../components/ui/FormInput";
import FormLabel from "../components/ui/FormLabel";
import { useGetCategoriesQuery } from "../features/categories/api/categoryApiSlice";
import { Category } from "../features/categories/types/Category";
import CategoryCombobox from "../features/posts/components/CategoryCombobox";
import Button from "../components/ui/Button";
import { useCreateDraftPostMutation } from "../features/posts/api/postsApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
  const { data: categories, isLoading: isLoadingCategories, isError: isCategoriesError } = useGetCategoriesQuery();
  const [createDraftPostMutation, { isLoading, isError, error }] = useCreateDraftPostMutation();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [postTitle, setPostTitle] = useState<string>("");

  const navigate = useNavigate();

  const submitDraft = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const draftPost = await createDraftPostMutation({ categoryId: selectedCategory?._id!, title: postTitle }).unwrap();

      navigate(draftPost._id, { viewTransition: true });
    } catch (error) {
      toast.error("Failed to create");

      console.log(error);
    }
  };

  return (
    <section className="w-full py-6 mx-auto">
      <div className="max-w-lg pt-32 mx-auto space-y-8">
        <h1 className="w-full mx-auto text-4xl font-bold">Create new post</h1>
        {isLoadingCategories ? (
          <div> Loading...</div>
        ) : (
          <CardWrapper className="mx-auto">
            <form onSubmit={submitDraft} className="space-y-4">
              <Field as="div">
                <FormLabel>Post title</FormLabel>
                <FormInput value={postTitle} onChange={(event) => setPostTitle(event.target.value)} />
              </Field>
              <CategoryCombobox categories={categories as Category[]} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

              <div className="flex items-center justify-end">
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </CardWrapper>
        )}
      </div>
    </section>
  );
}

export default CreatePostPage;
