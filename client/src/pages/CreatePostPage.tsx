import CardWrapper from "../components/ui/CardWrapper";
import { useGetCategoriesQuery } from "../features/categories/api/categoryApiSlice";
import TitleAndCategoryForm from "../features/posts/components/TitleAndCategoryForm";

function CreatePostPage() {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

  return (
    <section className="w-full py-6 mx-auto">
      <div className="max-w-lg pt-32 mx-auto space-y-4">
        <h1 className="w-full mx-auto text-4xl font-bold">Create new post</h1>
        <p className="text-sm text-gray-700">Add title and category for your new post. This post isn't published yet.</p>
        {isLoadingCategories ? (
          <TitleAndCategoryForm.Skeleton />
        ) : (
          <CardWrapper className="mx-auto">
            <TitleAndCategoryForm categories={categories} />
          </CardWrapper>
        )}
      </div>
    </section>
  );
}

export default CreatePostPage;
