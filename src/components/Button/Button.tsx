import './Button.css';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled: boolean;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            className='btn'
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
