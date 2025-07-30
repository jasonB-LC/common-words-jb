export const saveNewDeck = async deck => {
    try {
        await fetch('http://localhost:8080/decks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(deck),
        });
    } catch (error) {
        console.error(error.message);
    }
    refetch();
};