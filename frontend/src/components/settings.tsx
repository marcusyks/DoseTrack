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

import { FormEvent, useEffect, useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useAuth0 } from "@auth0/auth0-react";
import CustomAlert from "../utils/alert";
import CustomToast from "../utils/toast";

//TODO: add phone number verification

const Settings = () => {
    const {user, getAccessTokenSilently} = useAuth0();

    const [nickname, setNickname] = useState<string | undefined>(user?.given_name)
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(user?.phone_number)
    const [alertColor, setAlertColor] = useState('');
    const [alertString, setAlertString] = useState('');
    const [toastColor, setToastColor] = useState('');
    const [toastString, setToastString] = useState('');

    useEffect(()=>{
        async function fetchData(){
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
                    }
                })
                const {user_metadata} = await resp.json()
                setNickname(user_metadata.given_name)
                setPhoneNumber(user_metadata.phone_number)
            }
            catch(error){
                console.error("Unable to fetch data: ",error)
            }
        }
        // Only fetch data if userID changes
        if (user?.sub) {
            fetchData();
        }
    },[user?.sub])

    const HandleSubmit = async(e: FormEvent) =>{
        e.preventDefault()
        //Checks
        const data = JSON.stringify({
            user_metadata:{
                given_name: nickname,
                phone_number: phoneNumber
            }
        })

        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `${process.env.REACT_APP_AUTH_CLIENT_API}/`,
                    scope: "update:current_user_metadata",
                },
            });
            await fetch(`${process.env.REACT_APP_AUTH_CLIENT_API}/users/${user?.sub}`, {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'content-type': 'application/json',
                },
                body: data,
            })

            setAlertColor('')
            setAlertString('')
            setToastColor('success');
            setToastString("Successfully updated")
            setTimeout(()=>{
                window.location.replace("/")
              },2000)
        } catch (error) {
            console.log(error);
            setAlertColor('failure')
            setAlertString('Something happened! Try again..')
        }
    }

    return(
        <div className="flex-col">
            <form onSubmit={event => HandleSubmit(event)} className='flex-center w-screen mt-8'>
                {CustomToast(toastColor, toastString)}
                <Card className="flex flex-col gap-4 m-16">
                    <div className="text-2xl md:text-3xl font-bold">Settings</div>
                    <div className="w-80">
                        <Label className="font-bold">Nickname</Label>
                        <TextInput type="text" value={nickname} onChange={event => setNickname(event.target.value)}  ></TextInput>
                    </div>
                    <Label className="font-bold">Phone Number</Label>
                    <div className="flex items-center">
                        <button id="dropdown-phone-button" data-dropdown-toggle="dropdown-phone" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                        +65
                        </button>
                        <div className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
                            </ul>
                        </div>
                        <div className="relative w-full ">
                            <input type="text" id="phone-input" aria-describedby="helper-text-explanation" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" pattern="[0-9]{4} [0-9]{4}" placeholder="9876 5432" onChange={event => setPhoneNumber(event.target.value)} />
                        </div>
                    </div>
                    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">We will send you an SMS with a verification code.</p>
                    <button className="text-white w-full bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send verification code</button>
                    <div className="flex-center mt-20">
                        <Button type="submit">Save</Button>
                    </div>
                    {CustomAlert(alertString, alertColor)}
                </Card>
            </form>
        </div>
    )
}

export default Settings