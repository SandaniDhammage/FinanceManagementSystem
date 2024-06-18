import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function UpdateForm({incomeData, setEditItemId}) {
    const{successMessage, setSuccessMessage, updateIncome }=useGlobalContext()
    
    const [updatedIncomeData, setUpdatedIncomeData] = useState({
      title: '',
      amount: '',
      date: new Date(),
      category: '',
      description: ''
    });
  
    const [errors, setErrors] = useState({});
    useEffect(() => {
      if (incomeData) {
        setUpdatedIncomeData({
          title: incomeData.title,
          amount: incomeData.amount,
          date: new Date(incomeData.date), 
          category: incomeData.category,
          description: incomeData.description
        });
      }
    }, [incomeData]);

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

      setUpdatedIncomeData({ ...updatedIncomeData, [name]: value });
      setErrors({ ...errors, [name]: errorMessage });
  };

    const handleSubmit =  async (e)=> {
      e.preventDefault()
      const hasErrors = Object.values(errors).some(err => err !== '');
      if (hasErrors) return;
        
        try {
            await updateIncome(incomeData._id, updatedIncomeData);
            setUpdatedIncomeData({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            });
            setEditItemId(null);
            setSuccessMessage('Income Updated Successfully!');
        } catch (error) {
            console.error('Error updating income:', error.message);
            setSuccessMessage(null);
        }
    };

      /*updateIncome(incomeData._id, updatedIncomeData)
      setUpdatedIncomeData({
          title: '',
          amount: '',
          date: '',
          category: '',
          description: '',
      })
      setEditItemId(null)
  }

  useEffect(() => {
    if (successMessage) {
        const timer = setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [successMessage, setSuccessMessage]);*/

  return (
    <FormWrapper>
    <FormStyled onSubmit={handleSubmit}>
    <div className="error-message">
                    {errors.title && <p className="error">{errors.title}</p>}
                    {errors.amount && <p className="error">{errors.amount}</p>}
                    {errors.date && <p className="error">{errors.date}</p>}
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
      <div className="input-control">
        <input
          type="text"
          value={updatedIncomeData.title}
          name={'title'}
          placeholder="Income Title"
          onChange={handleInput('title')}
        />
      </div>

      <div className="input-control">
        <input
          value={updatedIncomeData.amount}
          type="text"
          name={'amount'}
          placeholder={' Amount'}
          onChange={handleInput('amount')}
        />
      </div>

      <div className="input-control">
        <DatePicker
          id='date'
          placeholderText='Date'
          selected={updatedIncomeData.date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setUpdatedIncomeData({ ...updatedIncomeData, date })}
        />
      </div>

      <div className="selects input-control">
        <select  name="category" id="category" value={updatedIncomeData.category} onChange={handleInput('category')}>
          <option value="" disabled>Select Option</option>
          <option value="investments">Investments</option>
          <option value="stocks">Sales</option>
          <option value="bank">Rental</option>
          <option value="youtube">Social Media</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-control">
        <textarea
          name="description"
          value={updatedIncomeData.description}
          placeholder='Add A Reference'
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput('description')}
        ></textarea>
      </div>

      <div className="submit-btn">
        <Button
          name={'Update Income'}
          icon={plus}
          bPad={'.8rem 1.6rem'}
          bRad={'30px'}
          bg={'purple'}
          color={'#fff'}
        />
      </div>
     
    </FormStyled>
    </FormWrapper>
  );
}
const FormWrapper = styled.div`
    background-color: #FCF6F9; /* Add white background color here */
    width: 150%; /* Adjust width as needed */
    margin: 0 auto; /* Center the form horizontally */
    padding: 2rem;
`;

const FormStyled=styled.form`
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
        width:100%;
        
    }
}

.selects{
    display: flex;
    
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

export default UpdateForm;
