import React from 'react'
import styled from 'styled-components';
import {  calender, card, circle,  comment, dollar,  freelance,  money, piggy, stocks,  trash,  users, yt,expenses, edit } from '../../utils/Icons';
import Button from '../Button/Button';
import { dateFormat } from '../../utils/dateFormat';


function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    getItemById,
    indicatorColor,
    type
}) {

    const categoryIcon=()=>{
        switch(category){
            case 'Investments':
                return stocks;
            case 'Sales':
                return users;
            case 'Rental':
                return card;
            case 'Social Media':
                return yt;
            case 'Other':
                return piggy;
            default:
                return ''
        }
    }
    const expenseCatIcon = () => {
        switch (category) {
            case 'Employee Salary':
                return money;
            case 'Supplier payment':
                return expenses;
            case 'Tax':
                return dollar;
            case 'Charity':
                return users;
            case 'Travelling':
                return freelance;
            case 'Other':
                return circle;
            default:
                return ''
        }
    }
    const handleDelete = async () => {
        // Show confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this?');
    
        // Delete income if user confirms
        if (isConfirmed) {
            try {
                // Call the deleteItem function
                await deleteItem(id);
                // Display alert message after successful deletion
                //alert('Income deleted successfully!');
            } catch (error) {
                // Handle error if deletion fails
                console.error('Error deleting income:', error);
                // Display error message if deletion fails
                //alert('Failed to delete income. Please try again.');
            }
        }
    };
    
  return (
    <IncomeItemStyled indicator={indicatorColor} >
        <div className='icon'>
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}

        </div>
        <div className='content'>
            <h5>{title}</h5>
            <div className="inner-content">
                <div className="text">
                    <p>Rs.{amount}</p>
                    <p>{calender}{dateFormat(date)}</p>
                    <p>
                        {comment}
                        {description}
                    </p>
                </div>
                <div className="btn-con">
                <Button
                       
                       icon={edit}
                       bPad={'1rem'}
                       bRad={'50%'}
                       bg={'var(--primary-color'}
                       color={'#fff'}
                       iColor={'#fff'}
                       hColor={'var(--color-green)'}
                       onClick={()=>getItemById(id)}
                       
                      
                    />

                    <Button
                       
                       icon={trash}
                       bPad={'1rem'}
                       bRad={'50%'}
                       bg={'var(--primary-color'}
                       color={'#fff'}
                       iColor={'#fff'}
                       hColor={'var(--color-green)'}
                       onClick={handleDelete}
                       
                      
                    />

                </div>
            </div>

        </div>
    </IncomeItemStyled>
  )
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 3.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }
        .btn-con{
            display: flex;
            gap: 1rem; 
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                    font-size: 1.2rem;
                }
            }
        }
    }
`;

export default IncomeItem