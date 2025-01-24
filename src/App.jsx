import {Header} from "./components/Header.jsx";
import PostsGrid from "./components/PostsGrid.jsx";

function App() {
    return (
        <>
            <Header/>
            <div className="mt-4 mb-20">
                <PostsGrid />
            </div>
        </>
    )
}

export default App
