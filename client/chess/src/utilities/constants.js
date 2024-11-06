   import queen from '../assets/white_queen.svg';
        import rook from '../assets/white_rock.svg';
        import bishop from '../assets/white_bishop.svg';
        import knight from '../assets/white_knight.svg';

        import b_queen from '../assets/black_queen.svg';
        import b_rook from '../assets/black_rock.svg';
        import b_bishop from '../assets/black_bishop.svg';
        import b_knight from '../assets/black_knight.svg';

        export const itemDataWhite = [
                { name: 'queen', src: queen,value:9 },
                { name: 'rook', src: rook,value:5 },
                { name: 'bishop', src: bishop ,value:3},
                { name: 'knight', src: knight,value: 3}
        ];

        export const itemDataBlack = [
                { name: 'queen', src: b_queen ,value:9},
                { name: 'rook', src: b_rook ,value:5},
                { name: 'bishop', src: b_bishop ,value:3},
                { name: 'knight', src: b_knight ,value:3}
        ];