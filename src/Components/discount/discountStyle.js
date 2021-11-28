import styled from 'styled-components';


export const Cell = styled.div`
    background-color: #FEF5DA;
    padding: 20px;
    height: 65px;
    text-align: center;
    width: 212px;
    margin-top: 10px;
    
`
export const Title = styled.div`
    background-color: orange;
    font-weight: bold;
    padding: 10px;
    height: 60px;
    text-align: center;
`
export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`

export const Container = styled.div`
    position: relative;
    display: grid;
    grid-gap: 10px 0px;
    grid-template-columns: auto;
    background-color: #C4EBD8;
    width: 1080px;
    height: 600px;
    margin: auto;
    margin-top: 20px;
    padding: 8px 10px;
    align-content: baseline;
`