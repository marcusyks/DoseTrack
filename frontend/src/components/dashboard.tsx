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

const dashboardOptions: Content[] = [
    {title:"Plans",content:"Update your plans",buttonLink:"Update"},
    {title:"Settings",content:"Edit your profile",buttonLink:"Edit"},
    {title:"Track",content:"Track your intake",buttonLink:"Check"}
]

export const DashboardPage = () => {
    const [plans,setPlans] = useState<Plan[]>([])
    const userID = FetchUserData()?.sub;

    useEffect(()=>{
        async function fetchDataFromAPI(){
            try{
                const result : Plan[] = await FetchData('plans',userID)
                setPlans(result)
            }catch(error){
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
                    {Profile()}
                </div>
                <div>
                    <div className="text-left md:pl-28 pl-10 text-2xl">Statistics</div>
                    <GridStats plans={plans}/>
                </div>
                <div className="pt-8">
                    <div className="text-left pl-28 pb-4 text-2xl">Configurations</div>
                    <GridConfig content={dashboardOptions}/>
                </div>
            </div>
    );
}

export default DashboardPage