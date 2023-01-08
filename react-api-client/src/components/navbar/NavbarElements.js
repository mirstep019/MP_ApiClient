import styled from 'styled-components'
import {NavLink as Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
    position: fixed;
    z-index: ${(p) => p.theme.zIndexNavbar};
    top: 0;
    left: 0;
    display: flex;
    align-items: space-between;
    justify-content: center;
    flex-direction: row;
    height: 6rem;
    padding: 0 ${(p) => p.theme.lenMd1};
    width: 100vw;
    background: #5c16c4;	
    transition: background 0.45s;


    @media screen and (max-width: 768px){
        flex-direction: column;
        display: flex;
        align-content: center;
        align-items: center;
        height: 7rem;
    }
    
`
export const NavLink = styled(Link)`
    color: #C0C0C0;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 2rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #fff;
        font-weight: 600;
    }
    

`

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;
    
    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right:0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 768px){
        padding-bottom: 0.7rem;
    }

`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;

    
`

export const NavBtnLink = styled(Link)`
    border-radius: 5px;
    background: none;
    padding: 7px 15px;
    margin: 0 2rem;
    color: #33ff57;
    border: 2px solid #33ff57;
    outline: none;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    text-decoration: none;
    font-weight: 600;
    font-size: 17px;

    &:hover {
        transition: all 0.25s ease-in-out;
        background: #33ff57;
        border: 2px solid #33ff57;
        color: #000;
    }
`