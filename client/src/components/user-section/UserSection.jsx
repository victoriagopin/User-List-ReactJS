import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import UserList from "./user-list/UserList";


export default function UserSection(props){
    return (
        <section className="card users-container">
        <Search/>
  
        <UserList />
  
        {/* <!-- New user button  --> */}
        <button className="btn-add btn">Add new user</button>
  
        <Pagination />
      </section>
    )
}