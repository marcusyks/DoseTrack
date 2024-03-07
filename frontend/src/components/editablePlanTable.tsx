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
import Plan from '../objects/Plan';
import { Button, Table, Modal, Label, TextInput, Checkbox, Radio} from 'flowbite-react';
import ConvertDays from '../utils/convertDays';
import { useState } from 'react';
import FetchUserData from '../auth/fetchUserData';
import UpdateData from '../api/plans/updateData';
import CustomAlert from '../utils/alert';
import DeleteData from '../api/plans/deleteData';
import CustomToast from '../utils/toast';
import FetchData from '../api/plans/fetchData';


type PlanTableProps = {
    plans: Plan[],
}

export const EditablePlanTable = (props: PlanTableProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [noOfPills, setNoOfPills] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [modeOfContact, setModeOfContact] = useState('');
  const [elementID, setElementID] = useState(0);

  const [checkboxes, setCheckboxes] = useState<boolean[]>([]);
  const [contact, setContact] = useState<boolean>()
  const [alertString, setAlertString] = useState('');
  const [alertColor, setAlertColor] = useState('');
  const [toastString, setToastString] = useState('');
  const [toastType, setToastType] = useState('');
  const user = FetchUserData();


  function addDaysOfWeek(e: string){
    // if e already inside, remove it
    if(daysOfWeek.includes(e)){
        const index = daysOfWeek.indexOf(e);
        daysOfWeek.splice(index,1);

        const newCheckboxes = [...checkboxes];
        newCheckboxes[parseInt(e)-1] = false;
        setCheckboxes(newCheckboxes);
    }
    // else add it
    else{
        setDaysOfWeek([...daysOfWeek, e]);
        const newCheckboxes = [...checkboxes];
        newCheckboxes[parseInt(e)-1] = true;
        setCheckboxes(newCheckboxes);
    }
  }

  function setData(element: Plan){
    const days = element.frequency.toString().split('')
    var checks : boolean[] = [false,false,false,false,false,false,false]
    for (let index = 0; index < 7; index++) {
      if (days.includes((index+1).toString())){
        checks[index] = true;
      }else{
        checks[index] = false;
      }
    }
    setOpenModal(true);
    setMedicineName(element.medicineName);
    setNoOfPills(element.noOfPills);
    setDaysOfWeek(days);
    setCheckboxes(checks);
    setContact(element.modeOfContact==="telegram"?true:false)
    setModeOfContact(element.modeOfContact);
    setElementID(element.id);
  }

  function handleDelete(){
    try{
      DeleteData('plans',elementID);
      setOpenModal(false);
      setToastString('Deleted successfully')
      setToastType('success')
    }
    catch(error){
        setOpenModal(false);
        setToastString(`Error:${error}`)
        setToastType('failure')
    }
  }

  function handleUpdate(){
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
        noOfPills: noOfPills,
        frequency: parseInt(finalDaysOfWeek),
        userID: user?.sub,
        modeOfContact: modeOfContact,
    });

    try{
        UpdateData(data,'plans',elementID);
        setOpenModal(false);
        setToastString('Updated successfully')
        setToastType('success')
    }
    catch(error){
        setOpenModal(false);
        setToastString(`Error:${error}`)
        setToastType('failure')
    }
  }

  return (
    <div className="overflow-x-auto">
      {CustomToast(toastType,toastString)}
      <Table className="border-2 overflow-y-auto">
        <Table.Head className="border-2">
          <Table.HeadCell className="border-r-2">Medicine Name</Table.HeadCell>
          <Table.HeadCell className="border-r-2">No of Pills</Table.HeadCell>
          <Table.HeadCell className="border-r-2">Frequency</Table.HeadCell>
          <Table.HeadCell className="border-r-2">Mode Of Contact</Table.HeadCell>
          <Table.HeadCell className="border-r-2">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {props.plans.map(element =>(
            <Table.Row key={element.id} className="bg-white dark:border-gray-700 dark:bg-gray-900">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white border-r-2">
                {element.medicineName}
              </Table.Cell>
              <Table.Cell className="border-r-2">{element.noOfPills}</Table.Cell>
              <Table.Cell className="border-r-2">{ConvertDays(element.frequency)}</Table.Cell>
              <Table.Cell className="border-r-2">{element.modeOfContact.toUpperCase()}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => setData(element)} className="font-medium text-white">
                    Edit
                </Button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header>Edit Plan</Modal.Header>
                  <Modal.Body>
                      <div className='w-80'>
                          <div className="mb-4 block">
                          <Label htmlFor="medicine_name" value="Medicine" className='font-bold'/>
                          </div>
                          <TextInput id="medicine_name" type="text" value={medicineName} onChange={event => setMedicineName(event.target.value)} required />
                      </div>
                      <div className='w-80 mt-6'>
                          <div className="mb-4 block">
                          <Label htmlFor="no_of_pills" value="No Of Pills" className='font-bold'/>
                          </div>
                          <TextInput id="no_of_pills" type="number" value={noOfPills} onChange={event => setNoOfPills(parseInt(event.target.value))} required />
                      </div>
                      <div className='my-6'>
                          <div className="mb-4 block">
                          <Label htmlFor="day_of_week" value="Days Of Week" className='font-bold'/>
                          </div>
                          <div className='flex gap-2 my-3 block flex-col md:flex-row md:items-center'>
                              <div>
                                  <Checkbox id="monday" className='mr-2' value="1" onChange={event => addDaysOfWeek(event.target.value)} checked={checkboxes[0]}/>
                                  <Label htmlFor="monday">Monday</Label>
                              </div>
                              <div>
                                  <Checkbox id="tuesday" className='mr-2' value="2" onChange={event => addDaysOfWeek(event.target.value)} checked={checkboxes[1]}/>
                                  <Label htmlFor="tuesday">Tuesday</Label>
                              </div>
                              <div>
                                  <Checkbox id="wednesday" className='mr-2' value="3" onChange={event => addDaysOfWeek(event.target.value)} checked={checkboxes[2]}/>
                                  <Label htmlFor="wednesday">Wednesday</Label>
                              </div>
                              <div>
                                  <Checkbox id="thursday" className='mr-2' value="4" onChange={event => addDaysOfWeek(event.target.value)} checked={checkboxes[3]}/>
                                  <Label htmlFor="thursday">Thursday</Label>
                              </div>
                              <div>
                                  <Checkbox id="friday" className='mr-2' value="5" onChange={event => addDaysOfWeek(event.target.value)} checked={checkboxes[4]}/>
                                  <Label htmlFor="friday">Friday</Label>
                              </div>
                              <div>
                                  <Checkbox id="saturday" className='mr-2' value="6" onChange={event => addDaysOfWeek(event.target.value)} checked={checkboxes[5]}/>
                                  <Label htmlFor="saturday">Saturday</Label>
                              </div>
                              <div>
                                  <Checkbox id="sunday" className='mr-2' value="7" onChange={event => addDaysOfWeek(event.target.value)} checked={checkboxes[6]}/>
                                  <Label htmlFor="sunday">Sunday</Label>
                              </div>
                          </div>
                      </div>
                      <div className="flex gap-2 block mt-12 flex-col md:flex-row">
                          <fieldset>
                              <legend>Choose your mode of contact:</legend>
                              <div>
                                  <Radio id="telegram" name="modeOfContact" className='mr-2' value="telegram" onChange={event => {setModeOfContact(event.target.value);setContact(true)}} checked={contact}/>
                                  <Label htmlFor="telegram">Telegram</Label>
                              </div>
                              <div>
                                  <Radio id="whatsapp" name="modeOfContact" className='mr-2' value="whatsapp" onChange={event => {setModeOfContact(event.target.value);setContact(false)}} checked={!contact}/>
                                  <Label htmlFor="whatsapp">Whatsapp</Label>
                              </div>
                          </fieldset>
                      </div>
                  </Modal.Body>
                  {CustomAlert(alertString,alertColor)}
                  <Modal.Footer className='flex place-content-between'>
                    <Button color="gray" onClick={() => {handleUpdate()}}>
                      Update
                    </Button>
                    <Button color="red" onClick={() => {handleDelete()}}>
                      Delete
                    </Button>
                  </Modal.Footer>
              </Modal>
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default EditablePlanTable
