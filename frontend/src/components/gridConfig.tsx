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
import Content from "../objects/gridContent";
import CustomButton from "../utils/button"
import { Card } from "flowbite-react";

type GridConfigProps = {
    content: Content[],
}

export const GridConfig = (props: GridConfigProps) =>{
    const items = props.content.map((map)=>
        <Card key={map.title}>
            <h1 className="text-2xl flex-center">{map.title}</h1>
            <h1 className="text-base my-4 flex-center">{map.content}</h1>
            <CustomButton title={map.buttonLink} dest={map.title.toLowerCase()}/>
        </Card>
    );

    return(
        <div className="grid md:grid-cols-3 rounded px-28 gap-8">
            {items}
        </div>
    )
}

export default GridConfig