import React,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { useReactToPrint } from 'react-to-print';


function Profits() {
    const {
        totalIncome,
        totalExpenses,
        totalCharityExpenses,
        totalSupplierPayments,
        totalSalesIncome,
        getExpenses,
        expenses,
        error,
        calculateTotalCharityExpenses 
      } = useGlobalContext();

      const [taxRate, setTaxRate] = useState();
      const [tax, setTax] = useState(0);

      const componentsRef = useRef();
     

      useEffect(() => {
        getExpenses();
      }, []);// Fetch expenses when the component mounts

      useEffect(() => {
        calculateTax(); // Calculate tax whenever taxRate changes
    }, [taxRate, totalCharityExpenses]); // Include totalCharityExpenses in the dependency array

    
      // Calculate gross profit
      const grossProfit = totalSalesIncome - totalSupplierPayments;
    
     
    
      // Calculate tax
      const calculateTax = () => {
        console.log('Calculating tax...');
        let taxableIncome = totalIncome() - totalCharityExpenses; // Using totalCharityExpenses
        console.log('Taxable Income:', taxableIncome);
        let taxAmount = 0;

        if (taxRate && !isNaN(taxRate)) {
          console.log('Tax Rate:', taxRate);
          let rateWithoutPercentage = parseFloat(taxRate);
  
          // If taxRate includes '%', convert it to decimal
          if (taxRate.endsWith('%')) {
              rateWithoutPercentage = rateWithoutPercentage / 100;
          }
  
          taxAmount = ((taxableIncome * rateWithoutPercentage)/12)*3;
      }

        console.log('Tax Amount:', taxAmount);
        setTax(taxAmount);
    };
      const handleTaxRateChange = (event) => {
        let inputTaxRate = event.target.value;
        // Allow numeric input, decimal point, and percent sign
        if (/^[0-9.%]*$/.test(inputTaxRate)) {
         
          setTaxRate(inputTaxRate === '' ? '' : inputTaxRate);
          console.log('Tax Rate:', inputTaxRate);
          calculateTax();
        }
      };
      const handlePrint = useReactToPrint({
        content: () => componentsRef.current,
        documentTitle: "Tax Report",
        onAfterPrint: () => alert("Report successfully downloaded")
    });

    const netProfit = totalIncome() - totalExpenses();
  return (
    <ProfitsStyled>
           
        <ProfitArea>
        <TaxHeading >Net Profit</TaxHeading>
        <TotalIncomeArea>Total Income: Rs.{totalIncome()}</TotalIncomeArea>
        <TotalIncomeArea>Total Expenses: Rs.{totalExpenses()}</TotalIncomeArea>
        
        <RedSquarek>Net Profit: Rs.{netProfit}</RedSquarek>
      </ProfitArea>
      <ProfitArea>
        <TaxHeading>Gross Profit</TaxHeading>
        <TotalIncomeArea>Total SalesIncome: Rs.{totalSalesIncome}</TotalIncomeArea>
        <TotalIncomeArea>Total Supplier Payment: Rs.{totalSupplierPayments}</TotalIncomeArea>
      
        <RedSquares>Gross Profit: Rs.{grossProfit}</RedSquares>
        
       
      </ProfitArea>
      <ProfitArea ref={componentsRef}>
        <TaxHeading>Tax Calculation</TaxHeading>
        <TotalIncomeArea>Taxable Income: Rs.{totalIncome() - totalCharityExpenses}</TotalIncomeArea>
        <TaxRateInput>Tax Rate: <InputField type="text" value={taxRate} onChange={handleTaxRateChange} /></TaxRateInput>
        <TaxValueContainer>
        <RedSquare>Tax: Rs.{tax}</RedSquare>
        
        </TaxValueContainer>
        <GenerateReportButton onClick={handlePrint}>Generate Tax Report</GenerateReportButton>
        </ProfitArea>
        
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ProfitsStyled>
  );
}


const ProfitsStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ProfitArea = styled.div`
  width:30%;
  margin: 20px;
  padding: 150px;
  border: 4px solid #ccc;
 
  margin-top:250px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  position: relative;
  background-color: #FCF6F9;

`;
const TaxHeading = styled.h2`
    margin-bottom: 20px;
    font-size: 30px;
    white-space: nowrap;
`;

const TotalIncomeArea = styled.div`
    margin-bottom: 10px;
    font-size: 23px;
    white-space: nowrap;
`;


const TaxRateInput = styled.div`
    margin-bottom: 10px;
    font-size: 23px;
`;
const TaxValueContainer = styled.div`
    position: relative;
`;
const RedSquarek = styled.div`
position: absolute;

bottom: 120px;
right: 120px;

width: auto;
height: 40px;
background-color: red;
display: flex;
justify-content: center;
align-items: center;
font-size: 23px;
font-weight: bold;
padding: 0 10px;
white-space: nowrap;

`;

const RedSquares = styled.div`
position: absolute;

bottom: 120px;
right: 120px;

width: auto;
height: 40px;
background-color: red;
display: flex;
justify-content: center;
align-items: center;
font-size: 23px;
font-weight: bold;
padding: 0 10px;
white-space: nowrap;

`;

const RedSquare = styled.div`
position: absolute;

bottom: -50px;
right: -80px;


width: auto;
height: 40px;
background-color: red;
display: flex;
justify-content: center;
align-items: center;
font-size: 23px;
font-weight: bold;
padding: 0 10px;
white-space: nowrap;

`;


const InputField = styled.input`
    width: 100%; /* Set the width to fill the container */
    padding: 5px; /* Add some padding */
    font-size: 16px; /* Set the font size */
`;

const GenerateReportButton = styled.button` 
    background-color: purple;
    color: white;
    margin-top: 80px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 8px;
    cursor: pointer;
`;


const ErrorMessage = styled.div`
  color: red;
`;


export default Profits