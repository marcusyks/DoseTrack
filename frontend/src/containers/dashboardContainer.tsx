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
import { ErrorBoundary } from "react-error-boundary"
import DashboardPage from "../components/dashboard"
import CustomFooter from "../components/footer"
import NavBar from "../components/navbar"
import ErrorPage from "../components/errorPage"
import FetchUserData from "../auth/fetchUserData"
import {useNavigate } from "react-router-dom"

export const DashboardContainer = () =>{
    const isAuthenticated = FetchUserData();
    const navigate = useNavigate();

    if (!isAuthenticated){
        navigate('/login');
    }
    return(
        <ErrorBoundary fallback={<ErrorPage/>}>
            <NavBar/>
            <DashboardPage/>
            <CustomFooter/>
        </ErrorBoundary>
    );
}