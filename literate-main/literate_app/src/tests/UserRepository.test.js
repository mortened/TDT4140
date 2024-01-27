import { getUsername, myFavourites } from '../controllers/UserRepository';


describe("getUsername", () => {
    const users = [
      { id: 1, username: "JohnDoe", favourites: ["book1", "book2", "book3"] },
      { id: 2, username: "JaneSmith", favourites: ["book1", "book4", "book5"] },
      { id: 3, username: "BobJohnson" },
    ];
  
    it("returns the username for a given user ID", () => {
      const userID = 1;
      const expectedUsername = "JohnDoe";
      expect(getUsername(userID, users)).toEqual(<>{expectedUsername}</>);
    });
  
    it("returns 'Anonym' if no user is found for a given user ID", () => {
      const userID = 4;
      const expectedUsername = "Anonym";
      expect(getUsername(userID, users)).toEqual(expectedUsername);
    });



    it("returns the favourites array for a given user ID", () => {
        const userID = 1;
        const expectedFavourites = ["book1", "book2", "book3"];
        expect(myFavourites(userID, users)).toEqual(expectedFavourites);
      });
    
      it("returns an empty array if no favourites array is found for a given user ID", () => {
        const userID = 3;
        const expectedFavourites = [];
        expect(myFavourites(userID, users)).toEqual(expectedFavourites);
      });
    
      it("returns an empty array if the user ID is not found", () => {
        const userID = 4;
        const expectedFavourites = [];
        expect(myFavourites(userID, users)).toEqual(expectedFavourites);
      });


  });