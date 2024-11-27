import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/posts/api/postsApiSlice";
import PostViewer from "../features/posts/components/PostViewer";
import CategoryBadge from "../features/categories/components/CategoryBadge";
import PublishButton from "../features/posts/components/PublishButton";

function PublishPostIdPage() {
  const params = useParams();

  const { data, isLoading } = useGetPostQuery({ id: params.id as string });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative">
      <h1 className="pt-8 text-4xl font-bold text-zinc-800">{data?.title}</h1>
      <CategoryBadge categoryId={data?.categoryId as string} />
      <div>
        {data?.tags?.map((tag, idx) => (
          <div key={idx}>{tag}</div>
        ))}
      </div>
      <PostViewer post={data} />
      <PublishButton id={params.id as string} />
    </div>
  );
}

export default PublishPostIdPage;
