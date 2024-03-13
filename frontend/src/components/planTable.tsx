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
import { Badge, Table } from 'flowbite-react';
import ConvertDays from '../utils/convertDays';

type PlanTableProps = {
    plans: Plan[],
}

export const PlanTable = (props: PlanTableProps) => {
  return (
    <div className="overflow-x-auto">
      {props.plans.length === 0 ? <div className="flex-center p-4 border-2">Your storage is looking kinda empty...</div> :
        <Table className='border-2'>
          <Table.Head>
            <Table.HeadCell className='border-2'>Plan name</Table.HeadCell>
            <Table.HeadCell className='border-2'>Medicines</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {props.plans.map(element =>(
              <Table.Row key={element.id} className="border-b-2 bg-white dark:border-gray-700 dark:bg-gray-900">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white border-r-2">
                  {element.planName}
                </Table.Cell>
                <Table.Cell className='flex flex-col md:flex gap-2 max-w-100'>
                  {element.medicineNames.map(
                    medicine => (
                      <Badge className="p-2 flex-center w-20" key={medicine.medicineName}>{medicine.medicineName}</Badge>
                    )
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>}
    </div>
  );
}

export default PlanTable