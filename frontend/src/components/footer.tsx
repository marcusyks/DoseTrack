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

import { Footer } from 'flowbite-react';

export const CustomFooter = () => {
  return (
    <Footer container className='relative bottom-0 mt-20 p-4'>
      <Footer.Copyright by="DoseTrack™" year={2024} className='flex-center'/>
      <Footer.LinkGroup className='flex-center p-2'>
        <Footer.Link href="/about">About</Footer.Link>
        <Footer.Link href="/privacy">Privacy Policy</Footer.Link>
        <Footer.Link href="/contact">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default CustomFooter