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
import GridStats from "./gridStats";
import { useState, useEffect } from "react";
import FetchUserData from "../auth/fetchUserData";
import FetchData from "../api/plans/fetchData";
import Plan from "../objects/Plan";

export const UpdatePlanPage = () => {
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
        <div className="h-screen flex justify-center">
            <div className="box-margin w-screen">
                <GridStats plans={plans}/>
            </div>
        </div>
    );
}

export default UpdatePlanPage;