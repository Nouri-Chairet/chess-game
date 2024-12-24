import axios from 'axios';

const fetchNextMove = async (fen) => {
    try {
        console.log('im fetching next move');
        console.log(fen)
        const response = await axios.get('https://stockfish.online/api/s/v2.php', {
            params: {
                 fen:fen,
                 depth:15
            }});
        if (response.data.success){

            return response.data.bestmove;
        }
        else{
            throw new Error('Failed to fetch next move');
        }
    } catch (error) {
        console.error('Error fetching next move:', error);
        throw error;
    }
};

export default fetchNextMove;