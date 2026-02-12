import { Route, Routes } from "react-router-dom";

import IntroPage from "./Pages/Auth/Intro";
import { Signup, Login } from "./Pages/Auth/Auth";

import MainLayout from "./Components/Layout";
import { Explore } from "./Pages/Events";
import { Profile } from "./Pages/Constant/constant";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<IntroPage/>}/>

                {/*student auth and student path*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

                <Route element={<MainLayout/>}>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>

            </Routes>

        </>
    )
}
export default App;