import styled from 'styled-components';

export const Window = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;

`

export const Content = styled.div`
    position: relative;
    padding: 32px;
    width: 650px;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    font-size: 20px;
`

export const ClosedBtn = styled.button`
    margin-top: 15px;
    width: 80px;
    height: 40px;
    background-color: #ffdd00;
    border: none;
    margin-left: 40px;
`
