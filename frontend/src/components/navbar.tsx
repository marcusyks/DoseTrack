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
import FetchUserData from '../auth/fetchUserData';
import LogoutButton from '../auth/logoutButton';
import { Link } from 'react-router-dom';

export const NavBar = () =>{
    const user = FetchUserData()

    function checkActive(s: string) {
      const currentPath = window.location.pathname;
      if(s === currentPath){
        return true;
      }
      return false;
    }

    return (
    <Navbar fluid rounded className='bg-blue-200 sticky top-0 right-0 left-0 z-10'>
      <Link to='/'>
        <Navbar.Brand>
            <object data={Logo} type="image/png" className="h-8" aria-label="DoseTrack Logo"/>
        </Navbar.Brand>
      </Link>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar className="mr-4" alt="User settings" img={user?.picture} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.name}</span>
            <span className="block truncate text-sm font-medium">{user?.email}</span>
          </Dropdown.Header>
          <Link to="/settings">
            <Dropdown.Item>Settings</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          {<LogoutButton/>}
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className='md:-ml-20'>
      <Link to="/">
        <Navbar.Link className="text-xl" active={checkActive('/')}>
          Dashboard
        </Navbar.Link>
      </Link>
      <Link to="/createplan">
        <Navbar.Link className="text-xl" active={checkActive('/createplan')}>
          Plan
        </Navbar.Link>
      </Link>
      <Link to="/plans">
        <Navbar.Link className="text-xl" active={checkActive('/plans')}>
          Manage
        </Navbar.Link>
      </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar