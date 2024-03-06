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
import { Table } from 'flowbite-react';

type PlanTableProps = {
    plans: Plan[],
}

export const PlanTable = (props: PlanTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border-2">
        <Table.Head className="border-2">
          <Table.HeadCell className="border-r-2">Medicine Name</Table.HeadCell>
          <Table.HeadCell className="border-r-2">No of Pills</Table.HeadCell>
          <Table.HeadCell className="border-r-2">Frequency</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {props.plans.map(element =>(
            <Table.Row key={element.id} className="bg-white dark:border-gray-700 dark:bg-gray-900">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white border-r-2">
                {element.medicineName}
              </Table.Cell>
              <Table.Cell className="border-r-2">{element.noOfPills}</Table.Cell>
              <Table.Cell>{element.frequency}</Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default PlanTable