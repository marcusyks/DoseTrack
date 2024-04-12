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

import User from "../../objects/User";

export const CheckTeleHandleExists = async (type: string, username: string) => {
    try {
        // Get all users that have started telegram bot
        const response = await fetch(`${process.env.REACT_APP_API_URL}${type}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        const filteredData = responseData.filter((item: User) => item.telegramHandle === username);
        return filteredData;
      } catch (error) {
        console.error('Error:', error);
    }
}

export default CheckTeleHandleExists