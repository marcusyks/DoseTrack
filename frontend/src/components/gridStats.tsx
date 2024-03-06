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
import { Card } from "flowbite-react";
import PlanTable from "./planTable";

type GridStatsProps = {
    plans: Plan[],
}

export const GridStats = (props: GridStatsProps) =>{
    return(
        <div className="grid grid-col-1 md:grid-cols-3 md:px-28 rounded px-10 gap-8 my-4">
            <Card className="col-span-1 md:col-span-3">
                <span className="text-2xl flex-center">Current Plans</span>
                <PlanTable plans={props.plans}></PlanTable>
            </Card>
        </div>
    )
}

export default GridStats