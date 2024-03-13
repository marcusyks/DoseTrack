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

import { Toast } from "flowbite-react";

function CustomToast(type: string, content: string){
    if(type==='success'){
        return(
            <Toast className="bg-green-100 fixed left-0 top-0 z-20">
                <div className="ml-3 text-sm font-normal">{content}</div>
                <Toast.Toggle />
            </Toast>
        );
    }
    else if(type==='failure'){
        return(
            <Toast className="bg-red-100 fixed left-0 top-0 z-20">
                <div className="ml-3 text-sm font-normal">{content}</div>
                <Toast.Toggle />
            </Toast>
        );
    }
}

export default CustomToast