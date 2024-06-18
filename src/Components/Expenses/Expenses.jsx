import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import UpdateExpences from './UpdateExpences';

function Expenses() {
  const {addIncome,expenses,getExpenses,deleteExpense,totalExpenses,getExpensesById,expensesById}=useGlobalContext()
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  useEffect(()=>{
    getExpenses()

  },[])
  useEffect(() => {
    const filteredItems = expenses.filter(expense =>
      expense.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExpenses(filteredItems);
    setNoResults(filteredItems.length === 0);
  }, [searchQuery, expenses]);

  const handleSearch = () => {
    // This function is triggered when the search button is clicked
    // You don't need to use fetchHandler here, as you're filtering locally
    // The useEffect already updates the filteredExpenses state based on searchQuery
  };
  const handleEditItem = async(id) => {
    setEditItemId(id);
    await getExpensesById(id);
    console.log("Editing item with id:", id);
  };
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">Total Expense: <span>Rs.{totalExpenses()}</span></h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="income-content">
        <div className="form-container">
        {editItemId !== null ? (<UpdateExpences expenseData={expensesById} setEditItemId={setEditItemId} />): (<ExpenseForm/>)}
        </div>
        <div className="incomes">
        {filteredExpenses.map(expense => (
              <IncomeItem
                key={expense._id}
                id={expense._id}
                title={expense.title}
                description={expense.description}
                amount={expense.amount}
                date={expense.date}
                type={expense.type}
                category={expense.category}
                indicatorColor="var(--color-green)"
                deleteItem={deleteExpense}
                getItemById={handleEditItem}
              />
            ))}
        </div>
        </div>
        
      </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
display: flex;
overflow: auto;
.total-income{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: .5rem;
    span{
        font-size: 2rem;
        font-weight: 800;
        color: purple;
    }
}
.search-bar {
  margin-bottom: 1rem;
  margin-right: 25rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  input[type="text"] {
    width: 250px; /* Adjust the width as needed */
    padding: 0.6rem;
    border: 1px solid #FF6289;
    border-radius: 4px;
    margin-right: 0.5rem;
    font-size: 1.2rem;
    transition: border-color 0.3s ease-in-out;
    &:focus {
      outline: none;
      border-color: #A9A9A9;
    }
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    background-color: purple;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: green;
    }
  }
}
.incomes {
  flex: 1;
  margin-left: 1rem; /* Adjust the left margin as needed */
}
.form-container {
  flex: -10; /* Adjust the flex property as needed */
}

.income-content{
    display: flex;
    gap: 15rem;
    .incomes{
        flex: 1;
    }
}

`;

export default Expenses