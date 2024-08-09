import { useState } from "react"

const baseUrl = 'http://localhost:3030/jsonstore';

const initialValues = {
  search : '',
  criteria : ''
}

export default function Search(){
    const [values, setValues] = useState(initialValues);

    const changeValues = (e) => {
      setValues(oldValues => ({
        ...oldValues,
        [e.target.name] : e.target.value
      }))
    }

    const onSearch = async (e) => {
      e.preventDefault();

      const params = new URLSearchParams({
        where: `${values.criteria}="${values.search}"`
      })

      console.log(`${baseUrl}/users?${params.toString()}`);
      const req = await fetch(`${baseUrl}/users?${params.toString()}`);
      const res = await req.json();
      console.log(res);
    }

    return (
       
        <form className="search-form" onSubmit={onSearch}>
          <h2>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
              className="svg-inline--fa fa-user SearchBar_icon__cXpTg" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path fill="currentColor"
                d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z">
              </path>
            </svg>
            <span>Users</span>
          </h2>
          <div className="search-input-container">
            <input type="text" placeholder="Please, select the search criteria" name="search" value={values.search} onChange={changeValues}/>
            {/* <!-- Show the clear button only if input field length !== 0 --> */}
            <button className="btn close-btn">
              <i className="fa-solid fa-xmark"></i>
            </button>
  
            <button className="btn" title="Please, select the search criteria">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
  
          <div className="filter">
            <span>Search Criteria:</span>
            <select name="criteria" className="criteria" value={values.criteria} onChange={changeValues}>
              <option value="notSelected">Not selected</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
        </form>
    )
}