import React, {createContext, useContext,useState,useEffect } from "react"
import axios from 'axios'



const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext=createContext()

export const GlobalProvider=({children})=>{

    const [incomes, setIncomes] = useState([])
    const [incomesById, setIncomesById] = useState(null)
    const [expenses, setExpenses] = useState([])
    const [expensesById, setExpensesById] = useState(null)
    const [error, setError] = useState(null)
    const [totalCharityExpenses, setTotalCharityExpenses] = useState(0);
    const [totalSupplierPayments, setTotalSupplierPayments] = useState(0);
    const [totalSalesIncome, setTotalSalesIncome] = useState(0);
    const [successMessage, setSuccessMessage] = useState(null);
    
    useEffect(() => {
        getIncomes();
        getExpenses();
        
    }, []);
    

    const addIncome = async (income) => {
        try{
        const response = await axios.post(`${BASE_URL}add-income`, income)
       
        
        }
        
            catch(err) {
                setError(err.response.data.message)
            }
        getIncomes()
    }

    const getIncomes=async()=>{
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
        calculateTotalSalesIncome(response.data);
    }
    //new
    const getIncomeById = async (id) => {
        try {
          const response = await axios.get(`${BASE_URL}get-income-byId/${id}`);
          setIncomesById(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
      };


    // Function to update income
    const updateIncome = async (id, updatedData) => {
        try {
            await axios.put(`${BASE_URL}update-income/${id}`, updatedData);
            getIncomes();
        } catch (error) {
            setError(error.response.data.message);
        }
    }


    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
        
    }

    const totalIncome=()=>{
        let totalIncome=0;
        incomes.forEach((income)=>{
            totalIncome = totalIncome+income.amount
        })
        return totalIncome;
    }
    

    const addExpense = async (income) => {
        try{
        const response = await axios.post(`${BASE_URL}add-expense`, income)
       
        
        
    }
            catch(err) {
                setError(err.response.data.message)
            }
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
        calculateTotalCharityExpenses(response.data);
        calculateTotalSupplierPayments(response.data);
    }
   //new
    const getExpensesById = async (id) => {
        try {
          const response = await axios.get(`${BASE_URL}get-expenses-byId/${id}`);
          setExpensesById(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const updateExpenses = async (id, updatedData) => {
        try {
            await axios.put(`${BASE_URL}update-expense/${id}`, updatedData);
            
            getExpenses();
        } catch (error) {
            setError(error.response.data.message);
        }
    }


    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory=()=>{
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 5)

    }
    const calculateTotalCharityExpenses = (expensesData) => {
        let totalCharity = 0;
        expensesData.forEach((expense) => {
            if (expense.category === 'Charity') {
                totalCharity += expense.amount;
            }
        });
        setTotalCharityExpenses(totalCharity);
    }

    const calculateTotalSupplierPayments = (expensesData) => {
        let totalSupplierPayments = 0;
        expensesData.forEach((expense) => {
            if (expense.category === 'Supplier payment') {
                totalSupplierPayments += expense.amount;
            }
        });
        setTotalSupplierPayments(totalSupplierPayments);
    }

    const calculateTotalSalesIncome = (incomesData) => {
        let totalSales = 0;
        incomesData.forEach((income) => {
            if (income.category === 'Sales') {
                totalSales += income.amount;
            }
        });
        setTotalSalesIncome(totalSales);
    }


    
    
    return(
        <GlobalContext.Provider value={{addIncome,getIncomes,getIncomeById,incomes,incomesById,deleteIncome,updateIncome, totalIncome,addExpense,getExpenses,getExpensesById, totalCharityExpenses,expenses,expensesById,deleteExpense,updateExpenses,totalExpenses,totalBalance,transactionHistory,totalSupplierPayments,totalSalesIncome,error, setError,successMessage, setSuccessMessage}}>
            {children}
            
            
        </GlobalContext.Provider>
    )
}


export const useGlobalContext=()=>{
    return useContext(GlobalContext)
}