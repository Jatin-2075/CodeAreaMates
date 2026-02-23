import { Route, Routes } from "react-router-dom";

import IntroPage from "./Pages/Auth/Intro";
import { Signup, Login } from "./Pages/Auth/Auth";

import MainLayout from "./Components/Layout";
import { Explore } from "./Pages/Core/Events";
import { Profile } from "./Pages/Core/Profile";
import PastEvents from "./Pages/Core/Past_Events";
import Mates from "./Pages/Core/Mates";
import Settings from "./Pages/Core/Settings";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<IntroPage/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

                <Route element={<MainLayout/>}>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/past-events" element={<PastEvents/>}/>
                    <Route path="/mates" element={<Mates/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Route>

            </Routes>
        </>
    )
}
export default App;