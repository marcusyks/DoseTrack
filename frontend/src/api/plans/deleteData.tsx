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
      const csrftoken = getCookie('csrftoken'); // Retrieve CSRF token from cookies
      if (!csrftoken) {
        console.error('CSRF token is missing');
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}${type}/${id}/`, {
        method: 'DELETE',
        credentials: 'include', // Include credentials (cookies) in the request
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken, // Include CSRF token in the request headers
        },
      });

      if (response.ok) {
        console.log('Data deleted successfully');
      } else {
        console.log('Failed to delete data');
      }
    } catch (error) {
      console.error('Error:', error);
  }
}

// Function to retrieve CSRF token from cookies
function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Search for CSRF token cookie
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}