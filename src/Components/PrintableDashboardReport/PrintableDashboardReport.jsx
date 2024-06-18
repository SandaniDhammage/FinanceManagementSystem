import React from 'react';
import styled from 'styled-components';
import Chart from '../Chart/Chart';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';

import candCloud from '../../img/candCloud.png'; // Import your logo image

const PrintableDashboardReport = React.forwardRef((props, ref) => {
  const { totalExpenses, totalIncome, totalBalance, incomes, expenses } = useGlobalContext();

  return (
    <PrintableReport ref={ref}>
      <InnerLayout>
        <LogoHeader>
          <img src={candCloud} alt="Logo" />
          <h2>Candy Cloud Financial Report</h2>
        </LogoHeader>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>Rs.{totalIncome()}</p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>Rs.{totalExpenses()}</p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>Rs.{totalBalance()}</p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">Min<span>Income</span>Max</h2>
            <div className="salary-item">
              <p>Rs.{Math.min(...incomes.map(item => item.amount))}</p>
              <p>Rs.{Math.max(...incomes.map(item => item.amount))}</p>
            </div>
            <h2 className="salary-title">Min <span>Expense</span>Max</h2>
            <div className="salary-item">
              <p>Rs.{Math.min(...expenses.map(item => item.amount))}</p>
              <p>Rs.{Math.max(...expenses.map(item => item.amount))}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </PrintableReport>
  );
});

const PrintableReport = styled.div`
.generate-report {
  background-color: purple; /* Purple background */
  color: white; /* White text color */
  font-size: 1.2rem; /* Larger font size */
  font-weight: 700;
  padding: 1rem 2rem; /* Larger button size */
  border: none; /* Remove border */
  border-radius: 8px; /* Add border radius */
  cursor: pointer; /* Add cursor pointer */
  margin-top:5rem;
  margin-left:85rem;
  
}

.stats-con{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  .chart-con{
      grid-column: 1 / 4;
      height: 250px;
      .amount-con{
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          margin-top: 2rem;
          .income, .expense{
              grid-column: span 2;
          }
          .income, .expense, .balance{
              margin-top: 4rem;
              background: #FCF6F9;
              border: 2px solid #FFFFFF;
              box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
              border-radius: 20px;
              padding: 1rem;
              p{
                  font-size: 2.5rem;
                  font-weight: 700;
              }
          }

          .balance{
              margin-top: 1rem;
              grid-column: 2 / 4;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              p{
                  color: purple;
                  opacity: 0.6;
                  font-size: 3.5rem;
              }
          }
      }
  }

  .history-con{
      grid-column: 4 / -1;
      h2{
          margin: 1rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
      .salary-title{
          margin-bottom: 2rem;
          font-size: 1.2rem;
          span{
              font-size: 1.8rem;
          }
      }
      .salary-item{
          background: #FCF6F9;
          border: 2px solid #FFFFFF;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          padding: 2rem;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p{
              font-weight: 600;
              font-size: 1.6rem;
          }
      }
  }
}

`;

const LogoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    width: 100px;
    margin-right: 20px;
  }
  h2 {
    margin: 0;
  }
`;

export default PrintableDashboardReport;
