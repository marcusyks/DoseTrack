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

export const DeleteData = async (type: string, id: number) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${type}/${id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Data deleted successfully');
        } else {
          console.error('Failed to delete data');
        }
      } catch (error) {
        console.error('Error:', error);
    }
}

export default DeleteData