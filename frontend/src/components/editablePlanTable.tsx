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
import { Button, Table, Modal, Label, TextInput, Checkbox, Radio, Badge, Card} from 'flowbite-react';
import { useState } from 'react';
import FetchUserData from '../auth/fetchUserData';
import UpdateData from '../api/plans/updateData';
import CustomAlert from '../utils/alert';
import DeleteData from '../api/plans/deleteData';
import CustomToast from '../utils/toast';
import Medicine from '../objects/Medicine';
import { HiOutlineX } from 'react-icons/hi';


type PlanTableProps = {
    plans: Plan[],
}

export const EditablePlanTable = (props: PlanTableProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [medicineNames, setMedicineNames] = useState<Medicine[]>([]);
  const [medicineName, setMedicineName] = useState("");
  const [noOfPill, setNoOfPill] = useState<number>(0);
  const [pills , setPills] = useState<number[]>([]);
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
    setMedicineNames(element.medicineNames);
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
      setTimeout(()=>{
        window.location.reload();
      },2000)
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
        medicineNames: medicineNames.map(element =>({
          medicineName: element.medicineName,
          noOfPills: element.noOfPills,
        })),
        frequency: parseInt(finalDaysOfWeek),
        userID: user?.sub,
        modeOfContact: modeOfContact,
    });

    try{
        UpdateData(data,'plans',elementID);
        setOpenModal(false);
        setToastString('Updated successfully')
        setToastType('success')
        setTimeout(()=>{
          window.location.reload();
        },2000)
    }
    catch(error){
        setOpenModal(false);
        setToastString(`Error:${error}`)
        setToastType('failure')
    }
  }

  const handleBadgeDelete = (name: string) => {
    const updatedMedicineNames = medicineNames.filter((medicine) => medicine.medicineName !== name);
    setMedicineNames(updatedMedicineNames);
  }

  const handleKeyPress = () => {
    if (noOfPill > 0 && medicineName !== "") {
      // Prevent adding empty medicine names
      if (medicineName.trim() !== '') {
        setMedicineNames([...medicineNames, {medicineName: medicineName, noOfPills: noOfPill}]);
        setMedicineName('');
      }
      if (noOfPill !== null){
        setPills([...pills, noOfPill]);
        setNoOfPill(0);
      }
    }
    else{
        setAlertColor('failure')
        setAlertString('Please enter a valid medicine name/no of pills')
        console.log(alertColor,alertString)
    }
  };

  return (
    <div className="overflow-x-auto">
      {CustomToast(toastType,toastString)}
        {props.plans.length === 0 ? <div className="flex-center p-4 border-2">Your storage is looking kinda empty...</div> :
        <Table className="border-2 overflow-y-auto max-w-200">
        <Table.Head className="border-2">
          <Table.HeadCell className="border-r-2 p-1">Plan Name</Table.HeadCell>
          <Table.HeadCell className="border-r-2 p-1">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
          <Table.Body className="divide-y">
            {props.plans.map(element =>(
              <Table.Row key={element.id} className="bg-white dark:border-gray-700 dark:bg-gray-900">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white border-r-2">
                  {element.planName}
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => setData(element)} className="font-medium text-white">
                      View More
                  </Button>
                  <Modal show={openModal} onClose={() => setOpenModal(false)} className='flex-center w-screen h-screen m-6 overflow-y-hidden md:w-full h-full m-0'>
                    <Modal.Header>Edit Plan</Modal.Header>
                    <Modal.Body>
                      <Card>
                        <div className='p-4'>
                            <div className="block">
                            <Label htmlFor="medicine_names" value="Medicines" className='font-bold'/>
                            </div>
                            <div className='flex flex-wrap gap-2 my-2'>
                            {medicineNames.map((element) => (
                                <Badge key={element.medicineName} className="p-1">
                                    <div className='inline-block mr-1'>{element.medicineName}</div>
                                    <div className="inline-block mr-1">{element.noOfPills}</div>
                                    <HiOutlineX className='inline-block' onClick={()=>handleBadgeDelete(element.medicineName)}/>
                                </Badge>
                              ))}
                            </div>
                            <TextInput id="medicine_names" type="text" placeholder="Add medicine" value={medicineName} onChange={event => setMedicineName(event.target.value)} />
                        </div>
                        <div className='p-4'>
                            <div className="mb-4 block">
                            <Label htmlFor="no_of_pills" value="No Of Pills" className='font-bold'/>
                            </div>
                            <TextInput id="no_of_pills" type="number" value={noOfPill} onChange={event => setNoOfPill(parseInt(event.target.value))} required />
                        </div>
                        <Button className="w-20 mt-4" onClick={()=>handleKeyPress()}>Add</Button>
                        {CustomAlert(alertString,alertColor)}
                        </Card>
                        <div className='p-4'>
                            <div className="mb-4 block">
                            <Label htmlFor="day_of_week" value="Days Of Week" className='font-bold'/>
                            </div>
                            <div className='flex gap-2 my-3 block flex-wrap'>
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
                        <div className="flex gap-2 block flex-col md:flex-row p-4">
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
            </Table.Row>))}
          </Table.Body>
      </Table>}
    </div>
  );
}

export default EditablePlanTable
