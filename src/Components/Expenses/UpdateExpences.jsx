import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function UpdateExpences({expenseData,setEditItemId}) {
    console.log('expenseData', expenseData)
    const { error, setError,updateExpenses} = useGlobalContext()

    const [updateExpenseData, setupdateExpenseData] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(()=>{
        if(expenseData){
            setupdateExpenseData({
                title: expenseData.title,
                amount: expenseData.amount,
                date: expenseData.date,
                category: expenseData.category,
                description: expenseData.description,
            })
        }
    },[expenseData])


    const handleInput = name => e => {
        const { value } = e.target;
        let errorMessage = '';

        switch (name) {
            case 'title':
                const titleRegex = /^[a-zA-Z\s]*$/;
                errorMessage = !titleRegex.test(value) ? 'Title cannot contain symbols or numbers!' : '';
                break;
            case 'amount':
                errorMessage = isNaN(value) ? 'Amount should be a number!' : parseFloat(value) <= 0 ? 'Amount must be a positive number!' : '';
                break;
            case 'description':
                const descriptionRegex = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
                errorMessage = !descriptionRegex.test(value) ? 'Description cannot start with symbols or numbers!' : '';
                break;
            case 'date':
                const selectedDate = new Date(value);
                const currentDate = new Date();
                errorMessage = (
                    selectedDate.getFullYear() !== currentDate.getFullYear() ||
                    selectedDate.getMonth() !== currentDate.getMonth() ||
                    selectedDate.getDate() !== currentDate.getDate()
                ) ? 'Selected date must be the current date!' : '';
                break;
            default:
                break;
        }

        setupdateExpenseData({ ...updateExpenseData, [name]: value });
        setErrors({ ...errors, [name]: errorMessage });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const hasErrors = Object.values(errors).some(err => err !== '');
        if (hasErrors) return;

        try {
            await updateExpenses(expenseData._id, updateExpenseData);
            setSuccessMessage('Expense successfully updated');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            setupdateExpenseData({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            });
            setEditItemId(null);
        } catch (error) {
            console.error('Error updating expenses:', error.message);
            setError(error.message);
        }
    };

    return (
        <FormWrapper>
        <ExpenseFormStyled onSubmit={handleSubmit}>
        <div className="error-message">
                    {errors.title && <p className="error">{errors.title}</p>}
                    {errors.amount && <p className="error">{errors.amount}</p>}
                    {errors.date && <p className="error">{errors.date}</p>}
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                {successMessage && <p className="success">{successMessage}</p>}
            
            <div className="input-control">
                <input 
                    type="text" 
                    value={updateExpenseData.title}
                    name={'title'} 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    value={updateExpenseData.amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={updateExpenseData.date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {setupdateExpenseData({...setupdateExpenseData, date: date})}}
                />
            </div>
            <div className="selects input-control">
                <select required value={updateExpenseData.category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="education">Employee Salary</option>
                    <option value="groceries">Supplier payment</option>
                    <option value="health">Tax</option>
                    <option value="subscriptions">Charity</option> 
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={updateExpenseData.description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Update Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg='purple'
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
        </FormWrapper>
    )
}
const FormWrapper = styled.div`
    background-color: #FCF6F9; /* Add white background color here */
    width: 150%; /* Adjust width as needed */
    margin: 0 auto; /* Center the form horizontally */
    padding: 2rem;
`;

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: 1.2rem;
        outline: none;
        border: none;
        padding: 0.8rem;
        border-radius: 5px;
        border: 2px solid black;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            font-size: 1.2rem;
            font-weight: 500;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;
export default UpdateExpences