// Copyright 2024 marcu
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { ErrorBoundary } from "react-error-boundary";
import NavBar from "../components/navbar";
import CustomFooter from "../components/footer";
import ErrorPage from "../components/errorPage";
import PlanPage from "../components/planPage";
import { useAuth0 } from "@auth0/auth0-react";
import LoginContainer from "./loginContainer";
import CustomSpinner from "../components/spinner";
import { useEffect, useState } from "react";

export const PlanContainer = () =>{
    const {isAuthenticated} = useAuth0();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // After 2000 milliseconds, set loading to false
        }, 1000);

        return () => clearTimeout(timer); // Cleanup function to clear the timer
    }, []);

    return(
        <ErrorBoundary fallback={<ErrorPage/>}>
            {loading ? <CustomSpinner/> : (isAuthenticated ? (
                <div className="h-screen font-xl sm:font-3xl">
                    <NavBar/>
                    <PlanPage/>
                    <CustomFooter/>
                </div>
            ):<LoginContainer/>)}
        </ErrorBoundary>
    );
}

export default PlanContainer;