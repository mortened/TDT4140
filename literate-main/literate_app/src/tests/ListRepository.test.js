import { getListByID, getListName} from '../controllers/ListRepository';
import { render } from '@testing-library/react';

describe('getListByID', () => {
  const lists = [
    { id: 1, Name: 'List 1' },
    { id: 2, Name: 'List 2' },
    { id: 3, Name: 'List 3' },
  ];

  // Should return the list name when given a valid list ID
  it('should return the name of the list with the matching ID', () => {
    const listID = 2;
    const expectedName = 'List 2';

    const actualName = getListByID(listID, lists);

    expect(actualName).toEqual(<>{expectedName}</>);
  });

  //Should return an empty fragment when given an invalid list ID
  it('should return an empty fragment when an invalid list ID is provided', () => {
    const listID = 4;

    const actualName = getListByID(listID, lists);

    expect(actualName).toEqual(<></>);
  });



  it('should return the name of the list with the matching ID', () => {
    const listID = 2;
    const expectedName = 'List 2';

    const { container } = render(getListName(listID, lists));

    expect(container.textContent).toEqual(expectedName);
  });

 /*  it('should return an error message if the list is not found', () => {
    const listID = 4;
    const expectedMessage = undefined;

    const consoleSpy = jest.spyOn(console, 'log');

    getListName(listID, lists);

    expect(consoleSpy).toHaveBeenCalledWith(listID);
    expect(consoleSpy).toHaveLastReturnedWith(expectedMessage);

    consoleSpy.mockRestore();
  }); */

});