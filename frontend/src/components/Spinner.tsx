import React from 'react';
import './Spinner.css';

interface SpinnerProps {
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
    return <div className={`spinner ${className || ''}`} />;
};

export default Spinner;