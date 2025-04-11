import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";
import useFetch from "../Hooks/useFetch";
import CardPost from "@/my-components/CardPost";
import { Button } from "@/components/ui/button";
import { CardProps } from "../my-components/CardPost";

const authenticateUser = async (token: string) => {
    const { post } = useFetch("https://localhost:7170/api/user/");
    try {
      const data = await post("validateToken", { token });
      return data.result;
    } catch (error) {
      return null; 
    }
};



export const fetchUserPosts = ({setPosts, setIsLoading} : {setPosts: (posts: CardProps[]) => void, setIsLoading: (isLoading: boolean) => void}) => {
    const {get} = useFetch("https://localhost:7170/api/SquadPost/");
    const username = localStorage.getItem("username")!;
    try {
      get(username).then((data: CardProps[]) => {
      setPosts(data);
      setIsLoading(false);
    })
  }
  catch (error) {
    console.log("error!");
  }
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [posts, setPosts] = useState<CardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (token) {
        authenticateUser(token).then((result) => {
          if (result) {
            setUser(result);
            fetchUserPosts({ setPosts, setIsLoading });
          } else {
            navigate("/");
          }
        });
      } else {
        navigate("/");
      }
    }, []);
  
    const handleCreateNewPost = () => {
      navigate("/createpost");
    };
  
    const handleRefreshPosts = () => {
      fetchUserPosts({ setPosts, setIsLoading });
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            {user ? `Welcome back, ${user.username}` : "Dashboard"}
          </h1>
          {posts.length === 0 ? <p>Your posts will be shown here when you make one</p> : <p>Here are your current posts</p>}
          </div>
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleCreateNewPost}>
              <PlusIcon className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>
          <div className="bg-gray-50 rounded-lg p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                You haven't created posts yet.
              </p>
              <Button onClick={handleCreateNewPost}>Create Your First Post</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <CardPost
                  key={post.postId}
                  gameMode={post.gameMode}
                  platform={post.platform}
                  winPercentage={post.winPercentage}
                  message={post.message}
                  gamertag2K={post.gamertag2K}
                  postId={post.postId}
                  handleRefreshPosts={() => handleRefreshPosts()}
                  createdAt={post.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }