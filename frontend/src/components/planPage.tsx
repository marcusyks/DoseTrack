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
import { Button, Label, TextInput, Radio, Checkbox} from 'flowbite-react';
import { FormEvent, useState } from 'react';
import PostData from '../api/plans/postData';
import FetchUserData from '../auth/fetchUserData';
import CustomAlert from '../utils/alert';

export const PlanPage = () => {
    const [medicineName, setMedicineName] = useState('');
    const [noOfPills, setNoOfPills] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
    const [modeOfContact, setModeOfContact] = useState('');
    const [alertString, setAlertString] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const user = FetchUserData();

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
        const data = JSON.stringify({
            medicineName: medicineName,
            noOfPills: parseInt(noOfPills),
            frequency: parseInt(finalDaysOfWeek),
            userID: user?.sub,
            modeOfContact: modeOfContact,
        });
        try{
            PostData(data,'plans')
            setAlertColor('success')
            setAlertString(`Successfully uploaded data`)
        }
        catch(error){
            setAlertColor('failure')
            setAlertString(`Error: ${error}`)
        }
    }

    return (
        <div className='flex-center flex-col h-5/6'>
            <div className='flex-center w-screen'>
                <form className="flex flex-col gap-4 w-auto p-4" onSubmit={handleSubmit}>
                    {CustomAlert(alertString,alertColor)}
                    <h1 className='text-4xl font-bold'>Create Plan</h1>
                    <div className='w-80'>
                        <div className="mb-4 block">
                        <Label htmlFor="medicine_name" value="Medicine" className='font-bold'/>
                        </div>
                        <TextInput id="medicine_name" type="text" value={medicineName} onChange={event => setMedicineName(event.target.value)} required />
                    </div>
                    <div className='w-80'>
                        <div className="mb-4 block">
                        <Label htmlFor="no_of_pills" value="No Of Pills" className='font-bold'/>
                        </div>
                        <TextInput id="no_of_pills" type="number" value={noOfPills} onChange={event => setNoOfPills(event.target.value)} required />
                    </div>
                    <div className='my-4'>
                        <div className="mb-4 block">
                        <Label htmlFor="day_of_week" value="Days Of Week" className='font-bold'/>
                        </div>
                        <div className='flex gap-2 my-3 block flex-col md:flex-row md:items-center'>
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
                    <div className="flex gap-2 block mt-2 flex-col md:flex-row">
                        <fieldset>
                            <legend>Choose your mode of contact:</legend>
                            <div>
                                <Radio id="telegram" name="modeOfContact" className='mr-2' value="telegram" onChange={event => setModeOfContact(event.target.value)} />
                                <Label htmlFor="telegram">Telegram</Label>
                            </div>
                            <div>
                                <Radio id="whatsapp" name="modeOfContact" className='mr-2' value="whatsapp" onChange={event => setModeOfContact(event.target.value)} />
                                <Label htmlFor="whatsapp">Whatsapp</Label>
                            </div>
                        </fieldset>
                    </div>
                    <Button className="w-20 mt-4" type="submit">Upload</Button>
                </form>
            </div>
        </div>
      );
}

export default PlanPage