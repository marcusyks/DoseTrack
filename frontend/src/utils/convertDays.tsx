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
import { Badge } from "flowbite-react";

export const ConvertDays = (props: number) => {
    const daysOfWeek = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const digits = props.toString().split('').map(Number);
    const result = digits.map((digit: number) => daysOfWeek[digit]);
    const buttons =result.map((element: string) => {
        return(
            <Badge key={element} size="m" className="p-2 m-1 rounded" color="info" >{element}</Badge >
        )
    })
    return <div className="flex ">{buttons}</div>
}

export default ConvertDays