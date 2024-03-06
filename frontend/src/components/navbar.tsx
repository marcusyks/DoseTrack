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

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Logo from '../icons/logo512.png'


export const NavBar = () =>{
    return (
    <Navbar fluid rounded className='bg-blue-200'>
      <Navbar.Brand>
        <object data={Logo} type="image/png" className=" h-6 sm:h-9" aria-label="DoseTrack Logo"></object>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar className="mr-4" alt="User settings" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className='md:-ml-20'>
        <Navbar.Link className="text-xl" href="/" active>
          Dashboard
        </Navbar.Link>
        <Navbar.Link className="text-xl" href="/plan">Plan</Navbar.Link>
        <Navbar.Link className="text-xl" href="/track">Track</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar