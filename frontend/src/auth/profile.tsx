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
import { useAuth0 } from "@auth0/auth0-react";

const Profile = (given_name: string) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (given_name === ""){
    const nickname = given_name;
  }else{
    const nickname = user?.given_name;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="text-center text-2xl sm:text-3xl">
        Welcome,  {given_name}
      </div>
    )
  );
};

export default Profile;