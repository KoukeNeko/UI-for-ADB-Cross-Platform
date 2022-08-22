import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MenuListButton(props) {

    const [isSelected, setIsSelected] = React.useState(props.onMuse === props.name)

    React.useEffect(() => {
        setIsSelected(props.onMuse === props.name)
    },[props.onMuse])
    
    return (
        <div style={{
            flexDirection: 'row',
            display: 'flex',
            width: '100%',
            height: '50px',
            width: '200px',
            transition: "all 0.3s ease",
            backgroundColor: props.isSelected ? "#805e73" : isSelected ?  "#4e4d5c" : 'unset' 
        }}
        >
            <div style={{
                display: 'flex',
                height: '50px',
                width: '50px',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <i class={props.icon}></i>
            </div>
            <div style={{
                marginLeft: '0.5em',
                opacity: props.isMenuOpen ? 1 : 0,
                transition: "all 0.5s ease",
                width: '150px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                fontWeight: isSelected ? 'bold' : 'unset',
            }}>
                <div>{props.name}</div>
            </div>
        </div>
    )
}
