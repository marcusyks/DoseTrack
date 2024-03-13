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
import GridConfig from "./gridConfig";
import Content from "../objects/gridContent";
import GridStats from "./gridStats";
import Plan from "../objects/Plan";
import FetchData from "../api/plans/fetchData";
import { useEffect, useState } from "react";
import Profile from "../auth/profile";
import FetchUserData from "../auth/fetchUserData";
import { useAuth0 } from "@auth0/auth0-react";

const dashboardOptions: Content[] = [
    {title:"Plans",content:"Manage your plans",buttonLink:"Manage"},
    {title:"Settings",content:"Edit your profile",buttonLink:"Edit"},
]

export const DashboardPage = () => {
    const [plans,setPlans] = useState<Plan[]>([])
    const userID = FetchUserData()?.sub;
    const [nickname,setNickname] = useState("")
    const {user, getAccessTokenSilently} = useAuth0();

    useEffect(()=>{
        async function fetchDataFromAPI(){
            try{
                //Get user_metadata if any
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `${process.env.REACT_APP_AUTH_CLIENT_API}/`,
                        scope: "read:current_user",
                    },
                });
                const resp = await fetch(`${process.env.REACT_APP_AUTH_CLIENT_API}/users/${user?.sub}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                })
                const {user_metadata} = await resp.json()
                setNickname(user_metadata.given_name)

                //Get plans of user
                const result : Plan[] = await FetchData('plans',userID)
                setPlans(result)
            }
            catch(error){
                console.error("Unable to fetch data: ",error)
            }
        }
        // Only fetch data if userID changes
        if (userID) {
            fetchDataFromAPI();
        }
      },[userID])

    return(
            <div>
                <div className='section'>
                    {Profile(nickname)}
                </div>
                <div>
                    <div className="text-left box-margin text-2xl sm:text-3xl">Statistics</div>
                    <GridStats plans={plans}/>
                </div>
                <div className="pt-8">
                    <div className="text-left box-margin text-2xl sm:text-3xl">Configurations</div>
                    <GridConfig content={dashboardOptions}/>
                </div>
            </div>
    );
}

export default DashboardPage