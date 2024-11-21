import { useLoaderData } from "react-router-dom";
import { User } from "../features/auth/types/User";
import { useGetPostsQuery } from "../features/posts/api/postsApiSlice";

function ProfilePage() {
  const user = useLoaderData() as User;

  const { data, isLoading } = useGetPostsQuery();

  console.log(data);

  return <div>ProfilePage of {user.username}</div>;
}

export default ProfilePage;
