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
import { Button, Card, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react";
import { useAuth0 } from "@auth0/auth0-react";
import CustomAlert from "../utils/alert";
import CustomToast from "../utils/toast";
import FetchData from "../api/plans/fetchData";
import Plan from "../objects/Plan";
import DeleteData from "../api/plans/deleteData";

//TODO: add phone number verification

const Settings = () => {
    const {user, getAccessTokenSilently} = useAuth0();

    const [nickname, setNickname] = useState<string>('')
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
                setNickname(user_metadata.nickname)
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
                nickname: nickname,
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

        } catch (error) {
            console.log(error);
            setAlertColor('failure')
            setAlertString('Something happened! Try again..')
        }
    }

    return(
        <div className="flex-col h-full">
            <form onSubmit={event => HandleSubmit(event)} className='flex-center w-screen mt-8'>
                {CustomToast(toastColor, toastString)}
                <Card className="flex flex-col gap-4 m-16">
                    <div className="text-2xl md:text-3xl font-bold">Settings</div>
                    <div className="w-80">
                        <Label className="font-bold">Nickname</Label>
                        <TextInput type="text" value={nickname} onChange={event => setNickname(event.target.value)}  ></TextInput>
                    </div>
                    <div className="flex-center gap-2 mt-4">
                        <Button type="submit">Save</Button>
                    </div>
                    {CustomAlert(alertString, alertColor)}
                </Card>
            </form>
        </div>
    )
}

export default Settings