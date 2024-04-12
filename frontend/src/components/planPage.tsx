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
import { Button, Label, TextInput, Radio, Checkbox, Badge, Card} from 'flowbite-react';
import { FormEvent, useState } from 'react';
import PostData from '../api/plans/postData';
import { HiOutlineX } from 'react-icons/hi'
import CustomToast from '../utils/toast';
import CustomAlert from '../utils/alert';
import Medicine from '../objects/Medicine';
import DeleteData from '../api/plans/deleteData';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CheckTeleHandleExists from '../api/users/checkTeleHandleExists';
import User from '../objects/User';
//Set metadata for telegram id

export const PlanPage = () => {
    const [planName, setPlanName] = useState('')
    const [medicineName, setMedicineName] = useState('');
    const [medicineNames, setMedicineNames] = useState<Medicine[]>([]);
    const [noOfPill, setNoOfPill] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
    const [modeOfContact, setModeOfContact] = useState('');
    const [alertString, setAlertString] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [toastColor, setToastColor] = useState('');
    const [toastString, setToastString] = useState('');
    const [telegramHandle, setTelegramHandle] = useState<string>('')
    const [newTelegramHandle, setNewTelegramHandle] = useState<string>('')

    const [userExists, setUserExists] = useState<string>('')
    const [nickname, setNickname] = useState<string>('')

    const {user, getAccessTokenSilently} = useAuth0();

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
                const {user_metadata} = await resp.json();
                if (user_metadata.telegramHandle){
                    setTelegramHandle(user_metadata.telegramHandle)
                }
                if (user_metadata.nickname){
                    setNickname(user_metadata.nickname)
                }
            }
            catch(error){
                console.error("Unable to fetch data: ",error)
            }
        }
        // Only fetch data if userID changes
        if (user?.sub) {
            fetchData();
        }
    },[user?.sub, getAccessTokenSilently])

    function addDaysOfWeek(e: string){
        // if e already inside, remove it
        if(daysOfWeek.includes(e)){
            const index = daysOfWeek.indexOf(e);
            daysOfWeek.splice(index,1);
        }
        // else add it
        else{
            setDaysOfWeek([...daysOfWeek, e]);
        }
    }

    const handleKeyPress = () => {
        if (noOfPill !== undefined && parseInt(noOfPill) > 0 && medicineName !== "" && time !== undefined) {
          // Prevent adding empty medicine names
          if (medicineName.trim() !== '') {
            setMedicineNames([...medicineNames, {id: -1, date_created: new Date().toISOString() ,time: time, medicineName: medicineName, noOfPills: parseInt(noOfPill)}]);
            setMedicineName('');
            setNoOfPill('');
            setTime("");
          }
        }
        else{
            setAlertColor('failure')
            setAlertString('Please enter a valid medicine name/no of pills')
        }
      };

    async function updateMetadata(){
        try{
            //Get user_metadata if any
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `${process.env.REACT_APP_AUTH_CLIENT_API}/`,
                    scope: "update:current_user",
                },
            });
            const data = JSON.stringify({
                user_metadata:{
                    nickname: nickname,
                    telegramHandle: newTelegramHandle,
                }
            })
            await fetch(`${process.env.REACT_APP_AUTH_CLIENT_API}/users/${user?.sub}`, {
                method: "PATCH",
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'content-type': 'application/json'
                },
                body: data,
            })
        }
        catch(error){
            console.error("Unable to fetch data: ",error)
        }
    }

    const handleDelete = (name: string, id: number) => {
        //Only delete data from database if its added before
        if(id !== -1){
            DeleteData('medicines',id)
        }
        const updatedMedicineNames = medicineNames.filter((medicine) => medicine.medicineName !== name);
        setMedicineNames(updatedMedicineNames);
    }

    async function checkUser(type: string, id : string){
        const user : User = await CheckTeleHandleExists(type,id);
        setUserExists(user.telegramHandle);
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        // Rearranging of daysOfWeek
        daysOfWeek.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
        const finalDaysOfWeek = daysOfWeek.join("");
        if(finalDaysOfWeek.length === 0){
            setAlertColor('failure')
            setAlertString(`Choose at least one day of the week`)
            return
        }
        if(modeOfContact.length === 0){
            setAlertColor('failure')
            setAlertString(`Choose one mode of contact`)
            return
        }
        if(medicineNames.length === 0){
            setAlertColor('failure')
            setAlertString(`Please add medicine/no of pills`)
            return
        }

        // Does not have telegram handle and did not put new one
        if (telegramHandle === "" && newTelegramHandle === ""){
            setAlertColor('failure')
            setAlertString(`You did not add a telegram handle`)
            return
        }

        // If user inputted and user does not exist
        checkUser("users",newTelegramHandle)
        if ((userExists === undefined || "") && newTelegramHandle !== ""){
            setAlertColor('failure')
            setAlertString(`You have not started the telegram bot with @${newTelegramHandle}!`)
            return
        }

        //Update auth side as well ONLY if first time
        if(telegramHandle === ""){
            updateMetadata();
        } else{
            setNewTelegramHandle(telegramHandle); //if subsequent, use old telegram id
        }

        const data = JSON.stringify({
            medicineNames: medicineNames.map((element,index) =>({
                medicineName: element.medicineName,
                noOfPills: element.noOfPills,
                time: element.time,
            })),
            frequency: parseInt(finalDaysOfWeek),
            userID: user?.sub,
            modeOfContact: modeOfContact,
            planName: planName,
            telegramHandle: newTelegramHandle,
        });

        try{
            PostData(data,'plans')
            setAlertColor('')
            setAlertString('')
            setToastColor('success');
            setToastString("Successfully updated")
        }
        catch(error){
            setAlertColor('failure')
            setAlertString(`Error: ${error}`)
        }
    }

    return (
        <div className='flex-center flex-col'>
            <div className='flex-center w-screen mt-8'>
                <form className="flex flex-col gap-4 m-14" onSubmit={handleSubmit}>
                    {CustomToast(toastColor, toastString)}
                    <h1 className='text-4xl font-bold p-2'>Create Plan</h1>
                    <div className='p-2'>
                        <div className="mb-4 block">
                        <Label htmlFor="plan_name" value="Plan Name" className='font-bold'/>
                        </div>
                        <TextInput id="plan_name" type="text" value={planName} onChange={event => setPlanName(event.target.value)} required />
                    </div>
                    <Card>
                        <div>
                            <div className="block">
                            <Label htmlFor="medicine_names" value="Medicine" className='font-bold'/>
                            </div>
                            <div className='flex flex-wrap gap-2 my-2'>
                            {medicineNames.map(element => (
                                <Badge key={element.id} className="p-1 grid">
                                    <div className='h-full'>
                                        <HiOutlineX className="scale-125"onClick={()=>handleDelete(element.medicineName, element.id)}/>
                                    </div>
                                    <div className='inline-block p-1'>
                                        <div className='mr-1'>{element.medicineName}</div>
                                        <div className="mr-1">{element.noOfPills}</div>
                                        <div className="mr-1">{element.time}</div>
                                    </div>
                                </Badge>
                                ))}
                            </div>
                            <TextInput id="medicine_names" type="text" value={medicineName} onChange={event => setMedicineName(event.target.value)}/>
                        </div>
                        <div>
                            <div className="mb-4 block">
                            <Label htmlFor="no_of_pills" value="No Of Pills/Spoons" className='font-bold'/>
                            </div>
                            <TextInput id="no_of_pills" type="number" value={noOfPill} onChange={event => setNoOfPill(event.target.value)}/>
                        </div>
                        <div>
                            <div className="mb-4 block">
                            <Label htmlFor="time" value="Time" className='font-bold'/>
                            </div>
                            <TextInput id="time" type="time" value={time} onChange={event => setTime(event.target.value)}/>
                        </div>
                        <Button className="w-20 mt-4" onClick={()=>handleKeyPress()}>Add</Button>
                    </Card>
                    <div className='my-4 p-2'>
                        <div className="mb-4 block">
                        <Label htmlFor="day_of_week" value="Days Of Week" className='font-bold'/>
                        </div>
                        <div className='flex gap-2 my-3 block flex-wrap'>
                            <div>
                                <Checkbox id="monday" className='mr-2' value="1" onChange={event => addDaysOfWeek(event.target.value)}/>
                                <Label htmlFor="monday">Monday</Label>
                            </div>
                            <div>
                                <Checkbox id="tuesday" className='mr-2' value="2" onChange={event => addDaysOfWeek(event.target.value)}/>
                                <Label htmlFor="tuesday">Tuesday</Label>
                            </div>
                            <div>
                                <Checkbox id="wednesday" className='mr-2' value="3" onChange={event => addDaysOfWeek(event.target.value)}/>
                                <Label htmlFor="wednesday">Wednesday</Label>
                            </div>
                            <div>
                                <Checkbox id="thursday" className='mr-2' value="4" onChange={event => addDaysOfWeek(event.target.value)}/>
                                <Label htmlFor="thursday">Thursday</Label>
                            </div>
                            <div>
                                <Checkbox id="friday" className='mr-2' value="5" onChange={event => addDaysOfWeek(event.target.value)}/>
                                <Label htmlFor="friday">Friday</Label>
                            </div>
                            <div>
                                <Checkbox id="saturday" className='mr-2' value="6" onChange={event => addDaysOfWeek(event.target.value)}/>
                                <Label htmlFor="saturday">Saturday</Label>
                            </div>
                            <div>
                                <Checkbox id="sunday" className='mr-2' value="7" onChange={event => addDaysOfWeek(event.target.value)}/>
                                <Label htmlFor="sunday">Sunday</Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 block mt-2 flex-col md:flex-row p-2">
                        <fieldset>
                            <legend>Choose your mode of contact:</legend>
                            <div>
                                <Radio id="telegram" name="modeOfContact" className='mr-2' value="telegram" onChange={event => setModeOfContact(event.target.value)} />
                                <Label htmlFor="telegram">Telegram</Label>
                                {modeOfContact ?
                                    (<div>
                                        {telegramHandle ? (<div><div className='p-2 rounded bg-gray-100'>{telegramHandle}</div><div className='text-s mt-2 text-red-400'>Remember to start the DoseTrack bot on Telegram first!</div></div>) :
                                        (<div className="w-80 mt-4">
                                            <Label className="font-bold">Add Telegram Handle</Label>
                                            <TextInput type="text" value={newTelegramHandle} placeholder="user123" onChange={event => setNewTelegramHandle(event.target.value)} required></TextInput>
                                            <div className='text-s mt-2 text-red-400'>Remember to start the DoseTrack bot on Telegram first!</div>
                                        </div>)}
                                    </div>):
                                    (<div></div>)
                                }
                            </div>
                            <div>
                                <Radio id="whatsapp" name="modeOfContact" className='mr-2' value="whatsapp" onChange={event => setModeOfContact(event.target.value)} />
                                <Label htmlFor="whatsapp">Whatsapp</Label>
                            </div>
                        </fieldset>
                    </div>
                    {CustomAlert(alertString,alertColor)}
                    <Button className="w-20 mt-4 ml-4" type="submit">Upload</Button>
                </form>
            </div>
        </div>
      );
}

export default PlanPage