import { height } from '@mui/system';
import React from 'react';

const PromotionChoices = ({ itemData, piece, onPromotion ,reverse}) => {

  const styles = {
    container: {
      width:'70px',
      height:'280px',
      display: 'flex',
      flexDirection:( reverse?'column-reverse':'column'),  // Changed to vertical
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgray', // White background
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Stronger shadow
      zIndex: 99,  // High z-index to ensure it's above other elements
      position: 'absolute',
      top: reverse ?'-308%':'0',  // Centered vertically
    },
  
    piece: {
      cursor: 'pointer',
      textAlign: 'center',
      marginBottom: '0px', 
      height:"70px"
    },
    image: {
      width: '70px',
      height: '65px',
      marginBottom: '0px', // Space between image and name
    },
    pieceName: {
      margin:'0px',
      fontWeight: 'bold',
      color: '#333',  // Darker text for visibility
    },
  };
  return (
    <div style={styles.container}>
        {itemData.map((item) => (
          <div 
            className='hoveredPiece'
            key={item.name} 
            onClick={() => onPromotion(item, piece)} 
            style={styles.piece}>
            <img 
              src={item.src} 
              alt={item.name} 
              style={styles.image} />
          </div>
        ))}
    </div>
  );
};

export default PromotionChoices;

