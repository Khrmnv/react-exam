import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Welcome = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/home'); // Переход на главную страницу
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Добро пожаловать в мое портфолио!</h1>
      <p>Нажмите кнопку ниже, чтобы перейти на главную страницу.</p>
      <Button type="primary" onClick={handleButtonClick}>
        Перейти на главную
      </Button>
    </div>
  );
};

export default Welcome;