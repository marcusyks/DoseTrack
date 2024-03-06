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
// type CardProps = {
//     width: number,
//     height: number,
// }
import { Link } from "react-router-dom"
import { Button } from 'flowbite-react';

type ButtonProps = {
    title: string
    dest: string
}

export const CustomButton = (props:ButtonProps) => {
    return(
        <div className="flex-center">
            <Link to={props.dest}>
                <Button pill >
                    {props.title}
                </Button>
            </Link>
        </div>
    )
}

export default CustomButton
