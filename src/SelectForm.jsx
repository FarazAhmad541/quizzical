import Select from "react-select";
import { Categories, NumeberOfQuestions, Difficulty } from "./FormData";
import { useContext } from "react";
import { Context } from "./Context";

//Component to render the dropdown Select options
export default function SelectForm() {

    const {formData, setFormData} = useContext(Context)

    //checks for changes in the "Select" from and sets the form data in the state of "Context" file
    function handleChange(event) {
        const { name, value } = event
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <>
            <Select
                name="category"
                className='dropdown'
                placeholder="Select Category"
                defaultValue={formData.category}
                onChange={handleChange}
                options={Categories()}
            />
            <Select
                name="noOfQuestions"
                className='dropdown'
                placeholder="Number Of Questions"
                defaultValue={formData.noOfQuestion}
                onChange={handleChange}
                options={NumeberOfQuestions()}
            />
            <Select
                name="difficulty"
                className='dropdown'
                placeholder="Difficulty"
                defaultValue={formData.difficulty}
                onChange={handleChange}
                options={Difficulty()}
            />
        </>
    )
}
