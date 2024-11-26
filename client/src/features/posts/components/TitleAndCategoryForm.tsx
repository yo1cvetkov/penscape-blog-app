import { Field } from "@headlessui/react";
import FormLabel from "../../../components/ui/FormLabel";
import FormInput from "../../../components/ui/FormInput";
import CategoryCombobox from "./CategoryCombobox";
import Button from "../../../components/ui/Button";
import { useCreateDraftPostMutation } from "../api/postsApiSlice";
import { useState } from "react";
import { Category } from "../../categories/types/Category";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../../components/ui/Spinner";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import FormInputError from "../../../components/ui/FormInputError";
import FormError from "../../../components/ui/FormError";
import CardWrapper from "../../../components/ui/CardWrapper";
import Skeleton from "../../../components/ui/Skeleton";

function TitleAndCategoryForm({ categories }: { categories?: Category[] }) {
  const [createDraftPostMutation, { isLoading: isCreatingDraftPost, isError, error }] = useCreateDraftPostMutation();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postTitleError, setPostTitleError] = useState<string>();
  const [selectedCategoryError, setSelectedCategoryError] = useState<string>();

  const navigate = useNavigate();

  const submitDraft = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postTitle) {
      setPostTitleError("Post title is required.");
      return;
    }

    if (!selectedCategory) {
      setSelectedCategoryError("Category is required.");
      return;
    }

    try {
      const draftPost = await createDraftPostMutation({ categoryId: selectedCategory?._id!, title: postTitle }).unwrap();

      navigate(draftPost._id, { viewTransition: true });
    } catch (error) {
      toast.error("Failed to create.");
    } finally {
      setPostTitleError(undefined);
      setSelectedCategoryError(undefined);
    }
  };

  return (
    <form onSubmit={submitDraft} className="space-y-2">
      <Field as="div">
        <FormLabel>Post title</FormLabel>
        <FormInput
          hasErrors={!!postTitleError}
          value={postTitle}
          onChange={(event) => {
            setPostTitle(event.target.value);
            setPostTitleError(undefined);
          }}
        />
        <FormInputError>{postTitleError}</FormInputError>
      </Field>
      <CategoryCombobox
        hasErrors={!!selectedCategoryError}
        errorMessage={selectedCategoryError}
        categories={categories as Category[]}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedCategoryError={setSelectedCategoryError}
      />

      <div className="flex items-center justify-end">
        <Button
          type="submit"
          disabled={isCreatingDraftPost}
          className="fixed flex items-center gap-4 px-6 py-3 text-base -translate-x-1/2 group hover:bg-zinc-800 bg-zinc-900 bottom-24 right-10"
        >
          {isCreatingDraftPost ? (
            <div className="flex items-center gap-x-4">
              <span>Submitting</span>
              <Spinner />
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <span>Save and continue</span>
              <ArrowRightIcon className="transition duration-200 size-4 group-hover:translate-x-2" />
            </div>
          )}
        </Button>
      </div>
      {isError ? <FormError error={error} /> : null}
    </form>
  );
}

TitleAndCategoryForm.Skeleton = function TitleAndCategoryFormSkeleton() {
  return (
    <CardWrapper>
      <div className="w-24">
        <Skeleton />
      </div>
      <Skeleton className="h-8" />
      <div className="w-24 mt-8">
        <Skeleton />
      </div>
      <Skeleton className="h-8" />
    </CardWrapper>
  );
};

export default TitleAndCategoryForm;
