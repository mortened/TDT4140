import { getAuthorByID } from '../controllers/AuthorRepository';

describe('getAuthorByID', () => {
    const authors = [
      { id: 1, Name: "J.K. Rowling" },
      { id: 2, Name: "Stephen King" },
      { id: 3, Name: "Agatha Christie" },
      { id: 4, Name: "Unknown Author" },
    ];
  
    it('should return the author name for a given author ID', () => {
      expect(getAuthorByID(1, authors)).toEqual(<>J.K. Rowling</>);
      expect(getAuthorByID(2, authors)).toEqual(<>Stephen King</>);
    });
  
    it('should return "Unknown author" if the author ID is not found in the authors list', () => {
      expect(getAuthorByID(5, authors)).toEqual(<>Unknown author</>);
    });
  });
