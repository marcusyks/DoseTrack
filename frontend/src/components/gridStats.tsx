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
import Plan from "../objects/Plan";
import { Card, Button } from "flowbite-react";
import PlanTable from "./planTable";
import EditablePlanTable from "./editablePlanTable";
import { Link } from "react-router-dom";

type GridStatsProps = {
    plans: Plan[],
}

export const GridStats = (props: GridStatsProps) =>{
    // if type is typeof EditablePlanTable
    if (window.location.pathname === '/plans'){
        return(
            <div className="md:px-28 rounded px-4 gap-8 my-4">
                <Card className="">
                    <span className="text-3xl">Your Plans</span>
                    <EditablePlanTable plans={props.plans}></EditablePlanTable>
                    <Button className="bg-blue-200 text-black"><Link to="/createplan">Create New Plan</Link></Button>
                </Card>
            </div>
        )
    }
    // if type is typeof PlanTable
    else{
        return(
            <div>
                <Card className="box-margin">
                    <span className="text-2xl flex-center">Current Plans</span>
                    <PlanTable plans={props.plans}></PlanTable>
                </Card>
            </div>
        )
    }
}

export default GridStats