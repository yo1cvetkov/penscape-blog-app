import { useLoaderData } from "react-router-dom";
import { User } from "../features/auth/types/User";

function HomePage() {
  const user = useLoaderData() as User;

  return (
    <div>
      HomePage
      <p>{user.username} is logged in</p>
    </div>
  );
}

export default HomePage;
