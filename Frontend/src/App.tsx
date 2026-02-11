import { Route, Routes } from "react-router-dom";

import MainLayout from "./Components/Layout";
import IntroPage from "./Pages/Intro";
import { Signup, Login } from "./Pages/Students/Auth";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<IntroPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>

        </>
    )
}
export default App;