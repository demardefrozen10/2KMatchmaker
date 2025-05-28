import useFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";
import PublicCardPost from "@/my-components/PublicCardPost";
import { CardProps } from "@/my-components/CardPost";
import { Slider } from "@/components/ui/slider"

interface FilterParams {
    gameMode?: string;
    platform?: string;
    playersNeeded?: string;
    minWinPercentage?: number;
  }

export default function PostPortal() {
    const [isLoading, setIsLoading] = useState(true);
        const [posts, setPosts] = useState<CardProps[]>([]);
        const [minWinPercentage, setMinWinPercentage] = useState(33);
        const [gameMode, setGameMode] = useState("");
        const [platform, setPlatform] = useState("");
        const [playersNeeded, setplayersNeeded] = useState("");


    const fetchAllPosts = (filters?: FilterParams) => {
        const {get} = useFetch("https://localhost:7170/api/SquadPost/");
        try {
        const queryParams = new URLSearchParams();
        if (filters?.gameMode) queryParams.append("gameMode", filters.gameMode);
        if (filters?.platform) queryParams.append("platform", filters.platform);
        if (filters?.minWinPercentage) queryParams.append("minWinPercentage", filters.minWinPercentage.toString());
        const queryString = queryParams.toString();
        const endpoint = queryString ? `?${queryString}` : "";
          get(`${endpoint}`).then((data: CardProps[]) => {
          setPosts(data);
          setIsLoading(false);
        })
      }
      catch (error) {
        console.log("error!");
      }
    };


    useEffect(() => {
        fetchAllPosts();
    }, []); 

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Squad Browser</h1>
                <p className="text-gray-600">Find players that match your playstyle</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Game Mode
                        </label>
                        <select className="w-full p-2 border rounded-md" onChange={(e) => setGameMode(e.target.value)}>
                            <option value="">All Modes</option>
                            <option value="Rec">Rec</option>
                            <option value="Park">Park</option>
                            <option value="Pro-Am">Pro-Am</option>
                            <option value="Ante-Up">Ante-Up</option>
                            <option value="Theater">Theater</option>
                            <option value="MyTeam Co-Op">MyTeam Co-Op</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Platform
                        </label>
                        <select className="w-full p-2 border rounded-md" onChange={(e) => setPlatform(e.target.value)}>
                            <option value="">All Platforms</option>
                            <option value="PS5">PS5</option>
                            <option value="Xbox">Xbox Series X/S</option>
                            <option value="PC">PC</option>
                            <option value="PS4">PS4</option>
                            <option value="Xbox One">Xbox One</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Build
                        </label>
                        <select className="w-full p-2 border rounded-md" onChange={(e) => setplayersNeeded(e.target.value)}>
                            <option value="">Players Needed</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Min. Win Percentage {minWinPercentage}%
                        </label>
                        <Slider defaultValue={[33]} max={100} step={1} onValueChange={(value) => setMinWinPercentage(value[0])}/>
                    </div>

                    <button onClick={() => fetchAllPosts({gameMode, platform, playersNeeded, minWinPercentage})} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Apply Filters
                    </button>
                </div>

                <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                    {isLoading ? 
    <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading posts...</p>
    </div>
    : posts.length === 0 ?
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No posts found.</p>
        </div>
        :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <PublicCardPost
                key={post.postId}
                gameMode={post.gameMode}
                platform={post.platform}
                winPercentage={post.winPercentage}
                message={post.message}
                gamertag2K={post.gamertag2K}
                postId={post.postId}
                datePosted={post.datePosted}
                playersNeeded={post.playersNeeded}
                />
            ))}
        </div>
}
                    </div>
                </div>
            </div>
        </div>
    );
};