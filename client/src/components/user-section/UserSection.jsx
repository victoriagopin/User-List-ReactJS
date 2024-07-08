import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import UserList from "./user-list/UserList";
import UserAdd from "./user-list/user-add/UserAdd";
import UserDetails from "./user-details/UserDetails";

const baseUrl = 'http://localhost:3030/jsonstore';

export default function UserSection(){
    const [users, setUsers] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUserDetails, setShpwUserDetails] = useState(null);

    useEffect(() => {
      (async function getUsers(){
        try{
        const response = await fetch(`${baseUrl}/users`);
        const result = await response.json();
        const usersResult = Object.values(result)

        setUsers(usersResult);
        } catch (err){
          console.error(err.message);
        }
      })();
    }, []);

    const addUserClickHandler = () => {
        setShowAddUser(true);
    }

    const addUserCloseHandler = () => {
      setShowAddUser(false);
    }

    const addUserSaveHandler = async (e) => {
      e.preventDefault();
      
      const formData = new FormData(e.currentTarget)

      const userData ={ 
        ...Object.fromEntries(formData),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(`${baseUrl}/users`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } ,
          body: JSON.stringify(userData)
      });

      const createdUser= await response.json();
      
      setUsers(oldUsers => [...oldUsers, createdUser]);

      setShowAddUser(false);
    };
  
    const userDetailsClickHandler = (user) => {
      setShpwUserDetails(user)
    }

    return (
        <section className="card users-container">
        <Search/>
      
       {showAddUser && (
          <UserAdd 
            onClose={addUserCloseHandler}
            onSave={addUserSaveHandler}
          />
       )}

       {showUserDetails && (
          <UserDetails 
            user={showUserDetails}
            onClose={() => setShpwUserDetails(null)}
          />
        )}

        <UserList 
          users={users}
          onUserDetailsClick={userDetailsClickHandler}
        />
  
        <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>
  
        <Pagination />
      </section>
    )
}