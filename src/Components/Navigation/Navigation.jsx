import React, { useState } from "react";
import styled from "styled-components";
import profile from '../../img/profile.png'
import candCloud from '../../img/candCloud.png'
import { menuItems } from '../../utils/menuItems'
import { signout } from "../../utils/Icons";


function Navigation({active,setActive}){
    
    return(
        
        
        <NavStyled>
           <img
                src={candCloud} 
                alt="" 
                className="candCloud"
                style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "125px",
                    width: "150px",
                    height: "150px",
                    zIndex: "1"
                }}

                 
            />
            <div className="user-con">
            <img src={profile} alt="" />
            <div className="text">
                    <h2>Saman</h2>
                    <p>The Financial Manager </p>
                </div>
                </div>
                <ul className="menu-items">
                    {menuItems.map((item)=>{
                        return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    })}

                </ul>
                <div className="bottom-nav">
                    <li>
                        {signout} Sign Out
                    </li>
                </div>
        </NavStyled>
        
    )
}



const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    
    .user-con{
        height: 500px;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 220px;
        font-size: 1.8rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
            margin-top: -600px;
            }
            
            
            .text {
                margin-top: -600px; 
            }
            h2{
                color: rgba(34, 34, 96, 1);
            }
            p{
                color: rgba(34, 34, 96, .6);
            }
            font-size: 1.2rem; 
        }
        .menu-items{
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-top: -80px;
            
           
            li{
                display: grid;
                grid-template-columns: 40px auto;
                align-items: center;
                margin: 3rem 0;
                font-weight: 500;
                cursor: pointer;
                transition: all .4s ease-in-out;
                color: rgba(34, 34, 96, .6);
                padding-left: 1rem;
                position: relative;
                font-size:1.5rem;
                i{
                    color: rgba(34, 34, 96, 0.6);
                    
                    transition: all .4s ease-in-out;
                    margin-top: -800px;

                    
                }
                span{
                    
                    margin-top: -800px;
                }
                
            }
        }

        .active{
            color: rgba(34, 34, 96, 1) !important ;
            i{
                color: rgba(34, 34, 96, 1) !important ;
            }
            &::before{
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                background: #222260;
                border-radius: 0 10px 10px 0;
            }
        }
     
    
`;




export default Navigation