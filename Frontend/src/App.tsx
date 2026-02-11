import { Route, Routes } from "react-router-dom";

import MainLayout from "./Components/Layout";
import IntroPage from "./Pages/Auth/Intro";
import { Signup, Login } from "./Pages/Auth/Auth";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<IntroPage/>}/>

                {/*student auth and student path*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

            </Routes>

        </>
    )
}
export default App;