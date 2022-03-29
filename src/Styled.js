import styled from "styled-components";
import theme from "./theme";

const Navbar = styled.div`
  width: 100%;
  height: 75px;
  position: fixed;
  top: 0;
  z-index: 999;
  background: white;
  border-bottom: 1px solid rgba(44, 44, 44, 0.233);
  box-shadow: 0px 2px 3px rgba(44, 44, 44, 0.137);
`;

const Container = styled.div`
  background: "black";
`;

const FilterBtn = styled.button`
  margin-top: 80px;
  padding: 20px;
`;

const FixBtn = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 60px;
  height: 60px;
  border-radius: 70%;
  background: ${theme.colors.mainColor};
  cursor: pointer;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 60px;
  transition: 1s;

  &:hover {
    transform: rotate(270deg);
    background: ${theme.colors.checkColor};
    color: white;
  }
`;

const CardWrap = styled.div`
  margin-top: 80px;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;

  ${theme.responsive.twice} {
    width: 799px;
  }
  ${theme.responsive.triple} {
    width: 1399px;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  padding: 20px;

  font-size: ${theme.fontSizes.md};
  background: ${(props) =>
    props.knew ? theme.colors.checkColor : theme.colors.mainColor};
  color: ${(props) => (props.knew ? "#fff" : "#000")};

  h3 {
    font-size: ${theme.fontSizes.xl};
    font-weight: 600;
  }
  p {
    padding: 5px;
    font-size: 14px;
  }
  .description_wrap {
    font-weight: 600;
    height: 60px;
  }
  .exam_wrap {
    margin: -10px 0;
  }

  .BsCheckLg,
  .BsPencilSquare,
  .BsFillTrashFill {
    position: absolute;
  }

  .BsCheckLg {
    right: 80px;
  }

  .BsPencilSquare {
    right: 50px;
  }

  .BsFillTrashFill {
    right: 20px;
  }

  ${theme.responsive.twice} {
    width: calc((100% - 20px) / 2);
  }
  ${theme.responsive.triple} {
    width: calc((100% - 40px) / 3);
  }
`;

const InputWrap = styled.div`
  padding: 30px;
  // border: 2px solid black;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  button {
    width: calc(100% / 3);
    height: 50px;
    border: none;
    background-color: ${theme.colors.mainColor};
    border-radius: 10px;
    font-size: ${theme.fontSizes.md};
    font-weight: 600;
    transition: 0.2s;
    cursor: pointer;
  }

  button:hover {
    transform: scale(1.05);
  }
`;

export { Container, Navbar, FilterBtn, FixBtn, CardWrap, Card, InputWrap };
