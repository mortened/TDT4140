import { getBookData, getBookByID, getBookTitle } from '../controllers/BookRepository';

describe('getBookByID', () => {
    const books = [
      { id: 1, Title: 'Book 1' },
      { id: 2, Title: 'Book 2' },
      { id: 3, Title: 'Book 3' },
    ];
  
    //returnerer korrekt bookobjekt når bookID er gyldig.
    //forventet bookobjekt er definert og sammenlignet til faktisk 
    //bookobjekt returnert av funksjonen ved å bruke Jest's "toEqual" matcher.
    it('should return the book with the matching ID', () => {
      const bookID = 2;
      const expectedBook = { id: 2, Title: 'Book 2' };
  
      const actualBook = getBookByID(bookID, books);
  
      expect(actualBook).toEqual(expectedBook);
    });
  
    //sjekker at getBookByID returnerer udefinert når gitt en ugydlig bookID.
    it('should return undefined if the book is not found', () => {
      const bookID = 4;
  
      const actualBook = getBookByID(bookID, books);
  
      expect(actualBook).toBeUndefined();
    });

    //sjekker om getTitle returnerer riktig tittel.
    it('should return the correct book title when a valid book ID is provided', () => {
        expect(getBookTitle(1, books)).toEqual('Book 1');
        expect(getBookTitle(2, books)).toEqual('Book 2');
        expect(getBookTitle(3, books)).toEqual('Book 3');
      });
    
    //sjekker om getBookTitle returnerer tom streng når invalid BookID er gitt.
    it('should return an empty string when an invalid book ID is provided', () => {
        expect(getBookTitle(4, books)).toEqual('');
        expect(getBookTitle(null, books)).toEqual('');
        expect(getBookTitle(undefined, books)).toEqual('');
      });

  
  });
  