import { createService } from "actions"
import { useState } from "react"
import withAuthorization from "components/hoc/withAuthorization"
import { Navigate } from "react-router-dom"

const CreateServices = ({auth}) => {
    const [redirection, setRedirection] = useState(false)
    const [form, setForm] = useState({
      category: 'mathematics',
      title: '',
      description: '',
      image: '',
      price: null
    })

    const handleChange = e => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const handleSubmit = () => {
        const {user} = auth
        createService(form, user.uid)
        .then(() => setRedirection(true))
        .catch(() => alert('error'))
    }

    if (redirection) { return <Navigate to="/" />}
    return (
        <div>
            <form className="flex flex-col w-1/3 mx-auto p-8 border-2">
                <label>Category</label>
                <select name="category" onChange={handleChange}>
                    <option value="mathematics">Mathematic</option>
                    <option value="programing">Programing</option>
                </select>
                <label>Title</label>
                  <input 
                     name="title"
                     type="text" 
                     onChange={handleChange}
                     className="border">
                   </input>
                <label>Description</label>
                  <textarea 
                     name="description"
                     onChange={handleChange}
                     className="border">
                  </textarea>
                <label>Image Url</label>
                  <input 
                     name="image"
                     onChange={handleChange}
                     className="border">
                   </input>
                <label>Price per hour</label>
                  <input 
                     name="price"
                     type="number" 
                     onChange={handleChange}
                     className="border">
                  </input>
                <button 
                     onClick={handleSubmit}
                     type="button" 
                     className="border-2 mt-5">Create</button>
            </form>
        </div>
    )
}

export default withAuthorization(CreateServices)