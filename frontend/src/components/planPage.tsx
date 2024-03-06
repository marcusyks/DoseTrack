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
import { Button, Label, TextInput, Card, Radio, Checkbox} from 'flowbite-react';

export const PlanPage = () => {
    return (
        <div className='flex-center m-20'>
            <Card className='flex-center h-1/2'>
                <form className="flex flex-col gap-4 w-auto p-4">
                    <h1 className='text-4xl font-bold'>Create Plan</h1>
                    <div className='w-80'>
                        <div className="mb-4 block">
                        <Label htmlFor="medicine_name" value="Medicine" className='font-bold'/>
                        </div>
                        <TextInput id="medicine_name" type="text" required />
                    </div>
                    <div className='w-80'>
                        <div className="mb-4 block">
                        <Label htmlFor="no_of_pills" value="No Of Pills" className='font-bold'/>
                        </div>
                        <TextInput id="no_of_pills" type="number" required />
                    </div>
                    <div className='my-4'>
                        <div className="mb-4 block">
                        <Label htmlFor="day_of_week" value="Days Of Week" className='font-bold'/>
                        </div>
                        <div className='flex gap-2 my-3 block flex-col md:flex-row md:items-center'>
                            <div>
                                <Checkbox id="monday" className='mr-2'/>
                                <Label htmlFor="monday">Monday</Label>
                            </div>
                            <div>
                                <Checkbox id="tuesday" className='mr-2'/>
                                <Label htmlFor="tuesday">Tuesday</Label>
                            </div>
                            <div>
                                <Checkbox id="wednesday" className='mr-2'/>
                                <Label htmlFor="wednesday">Wednesday</Label>
                            </div>
                            <div>
                                <Checkbox id="thursday" className='mr-2'/>
                                <Label htmlFor="thursday">Thursday</Label>
                            </div>
                            <div>
                                <Checkbox id="friday" className='mr-2'/>
                                <Label htmlFor="friday">Friday</Label>
                            </div>
                            <div>
                                <Checkbox id="saturday" className='mr-2'/>
                                <Label htmlFor="saturday">Saturday</Label>
                            </div>
                            <div>
                                <Checkbox id="sunday" className='mr-2'/>
                                <Label htmlFor="sunday">Sunday</Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 block mt-2 flex-col md:flex-row">
                        <Label htmlFor="remind_me" value="Remind me on:" className='font-bold'/>
                        <div>
                            <Radio id="telegram" className='mr-2'/>
                            <Label htmlFor="telegram">Telegram</Label>
                        </div>
                        <div>
                            <Radio id="whatsapp" className='mr-2'/>
                            <Label htmlFor="whatsapp">Whatsapp</Label>
                        </div>
                    </div>
                    <Button className="w-20 mt-4" type="submit">Upload</Button>
                </form>
            </Card>
        </div>
      );
}

export default PlanPage