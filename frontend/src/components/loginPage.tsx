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

import { Card, TextInput } from "flowbite-react"
import Logo from "../icons/logo512.png"
import CustomButton from "../utils/button";

export const LoginPage = () => {
    return(
        <div className="flex-center h-screen -mb-24">
            <Card className="md:scale-100 scale-75">
                <object className="md:scale-75 scale-50" type="image/png" aria-label="DoseTrack Logo" data={Logo}></object>
                <div className="px-12">
                    <span>Email:</span>
                    <TextInput placeholder="Your email..." type="email"></TextInput>
                </div>
                <div  className="px-12 mb-6">
                    <span>Password:</span>
                    <TextInput placeholder="Your password..." type="password"></TextInput>
                </div>
                <CustomButton title="Login" dest="/"/>
            </Card>
        </div>
    );
}

export default LoginPage