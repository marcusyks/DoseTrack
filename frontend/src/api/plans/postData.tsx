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

export const PostData = async (data: string, type: string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${type}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        });

        if (response.ok) {
          console.log('Data uploaded successfully');
        } else {
          console.log('Failed to create data');
        }
      } catch (error) {
        console.log('Error:');
    }
}

export default PostData